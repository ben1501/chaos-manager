import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
loadDotEnv();

const PORT = Number(process.env.PORT || 3000);
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const eventSchema = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["title", "startTime", "endTime", "description"],
    properties: {
      title: { type: "string" },
      startTime: {
        type: "string",
        description: "ISO 8601 datetime with timezone offset, for example 2026-06-28T16:00:00+03:00"
      },
      endTime: {
        type: "string",
        description: "ISO 8601 datetime with timezone offset, for example 2026-06-28T18:00:00+03:00"
      },
      description: { type: "string" }
    }
  }
};

const server = createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/parse-schedule") {
      await handleParseSchedule(req, res);
      return;
    }

    if (req.method === "GET" || req.method === "HEAD") {
      await serveStatic(req, res);
      return;
    }

    sendJson(res, 405, { error: "Method not allowed." });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Server error while handling the request." });
  }
});

server.listen(PORT, () => {
  console.log(`Chaos Manager is running at http://localhost:${PORT}`);
});

async function handleParseSchedule(req, res) {
  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 500, {
      error: "Missing OPENAI_API_KEY. Add it to a local .env file, then restart the server."
    });
    return;
  }

  const body = await readJsonBody(req);
  const text = String(body.text || "").trim();
  const referenceDate = body.referenceDate || new Date().toISOString();
  const timeZone = body.timeZone || "UTC";

  if (!text) {
    sendJson(res, 400, { error: "No schedule text was provided." });
    return;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0,
      messages: [
        {
          role: "developer",
          content: [
            "You parse messy natural-language schedules into JSON only.",
            "Return only a valid JSON array. Do not wrap it in Markdown.",
            "Create one-time events only. Do not create recurring events.",
            "Every item must have title, startTime, endTime, and description.",
            "Use ISO 8601 datetime strings with an explicit timezone offset.",
            "Resolve relative dates from the supplied reference date and timezone.",
            "If an end time is missing, infer a reasonable end time and mention that inference in description."
          ].join(" ")
        },
        {
          role: "user",
          content: JSON.stringify({
            referenceDate,
            timeZone,
            outputSchema: eventSchema,
            scheduleText: text
          })
        }
      ]
    })
  });

  const openAiPayload = await response.json().catch(() => null);

  if (!response.ok) {
    sendJson(res, response.status, {
      error: openAiPayload?.error?.message || "OpenAI request failed."
    });
    return;
  }

  const content = openAiPayload?.choices?.[0]?.message?.content;
  if (!content) {
    sendJson(res, 502, { error: "OpenAI returned an empty response." });
    return;
  }

  let events;
  try {
    events = JSON.parse(stripCodeFence(content));
  } catch {
    sendJson(res, 502, {
      error: "OpenAI returned text that was not valid JSON.",
      raw: content
    });
    return;
  }

  if (!Array.isArray(events)) {
    sendJson(res, 502, { error: "OpenAI response was valid JSON, but not an event array." });
    return;
  }

  sendJson(res, 200, { events });
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);

  if (!filePath.startsWith(root)) {
    sendText(res, 403, "Forbidden");
    return;
  }

  try {
    const data = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] || "application/octet-stream"
    });
    if (req.method === "HEAD") res.end();
    else res.end(data);
  } catch {
    sendText(res, 404, "Not found");
  }
}

async function readJsonBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
    if (raw.length > 100_000) {
      throw new Error("Request body too large.");
    }
  }
  return raw ? JSON.parse(raw) : {};
}

function sendJson(res, status, payload) {
  const data = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(data)
  });
  res.end(data);
}

function sendText(res, status, text) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(text);
}

function stripCodeFence(value) {
  return String(value)
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function loadDotEnv() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}
