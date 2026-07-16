import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const eventSchema = {
  type: "array",
  items: {
    type: "object",
    additionalProperties: false,
    required: ["title", "startTime", "endTime", "description"],
    properties: {
      title: { type: "string" },
      startTime: { type: "string", description: "ISO 8601 datetime with timezone offset" },
      endTime: { type: "string", description: "ISO 8601 datetime with timezone offset" },
      description: { type: "string" },
    },
  },
};

const allowedOrigins = new Set(["https://ben1501.github.io"]);

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS" && url.pathname === "/api/parse-schedule") {
      return corsPreflight(request);
    }

    if (request.method === "POST" && url.pathname === "/api/parse-schedule") {
      return parseSchedule(request, env);
    }

    if ((request.method === "GET" || request.method === "HEAD") && url.pathname === "/") {
      return env.ASSETS.fetch(new Request(new URL("/chaos.html", request.url), request));
    }

    return handler.fetch(request, env, ctx);
  },
};

async function parseSchedule(request: Request, env: Env): Promise<Response> {
  if (!env.OPENAI_API_KEY) {
    return json({ error: "The AI service is not configured on this site yet." }, 503, request);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json<Record<string, unknown>>();
  } catch {
    return json({ error: "The request was not valid JSON." }, 400, request);
  }

  const text = String(body.text || "").trim();
  const referenceDate = String(body.referenceDate || new Date().toISOString());
  const timeZone = String(body.timeZone || "UTC");
  if (!text) return json({ error: "No schedule text was provided." }, 400, request);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0,
      messages: [
        {
          role: "developer",
          content: [
            "You parse messy natural-language schedules into JSON only.",
            "Return only a valid JSON array without Markdown.",
            "Create one-time events only.",
            "Every item must have title, startTime, endTime, and description.",
            "Use ISO 8601 datetime strings with an explicit timezone offset.",
            "Resolve relative dates from the supplied reference date and timezone.",
            "If an end time is missing, infer a reasonable end time and mention it in the description.",
          ].join(" "),
        },
        {
          role: "user",
          content: JSON.stringify({ referenceDate, timeZone, outputSchema: eventSchema, scheduleText: text }),
        },
      ],
    }),
  });

  const payload = await response.json<Record<string, any>>().catch(() => null);
  if (!response.ok) {
    return json({ error: payload?.error?.message || "The AI request failed." }, response.status, request);
  }

  const content = payload?.choices?.[0]?.message?.content;
  if (!content) return json({ error: "The AI returned an empty response." }, 502, request);

  try {
    const cleaned = String(content).trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
    const events = JSON.parse(cleaned);
    if (!Array.isArray(events)) throw new Error("not an array");
    return json({ events }, 200, request);
  } catch {
    return json({ error: "The AI returned an invalid schedule format." }, 502, request);
  }
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("Origin");
  if (!origin || !allowedOrigins.has(origin)) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function corsPreflight(request: Request): Response {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.has(origin)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

function json(payload: unknown, status = 200, request?: Request): Response {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...(request ? corsHeaders(request) : {}),
    },
  });
}

export default worker;
