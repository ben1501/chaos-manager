# Chaos Manager

Chaos Manager turns messy natural-language schedule notes into structured, editable calendar events for people juggling work, study, appointments, errands, and other moving parts.

## What It Does

- Parses a rough schedule “brain dump” with AI.
- Shows the result as clear event cards.
- Lets the user remove events or clear the schedule.
- Exports the reviewed schedule as an `.ics` calendar file.
- Handles empty input and parser errors with a useful on-screen message.
- Keeps the OpenAI API key on the server instead of exposing it in browser code.

## Live Link

https://chaos-manager-ben.bbking15.chatgpt.site/

This is the working public submission link. The GitHub repository is included below as the project source.

## Deployment Note

GitHub Pages was tested, but it only serves static files and cannot run the server-side `/api/parse-schedule` endpoint that keeps the OpenAI key private. The repository therefore remains available for review, while the working app is hosted through the ChatGPT site deployment above.

## How To Use It

1. Open the live link and type or paste your schedule notes.
2. Select **Parse schedule**, then review the generated events.
3. Remove anything incorrect and select **Export (.ics)** to download a calendar file.

## Known Limitations

- It supports one-time events, not recurring events.
- AI can misunderstand vague dates or times, so users should review events before export.
- Parsing requires an internet connection and depends on the hosted AI service being available.
- The `.ics` export covers basic calendar events, not every advanced calendar feature.

## Privacy

Schedule notes are sent to OpenAI through a server-side endpoint for parsing. Avoid entering highly sensitive information. The API key is stored only in the hosted environment; the real `.env` file is excluded from Git.

## Run Locally

1. Copy `.env.example` to `.env` and add an OpenAI API key.
2. Run `npm install`.
3. Run `npm run dev` for the hosted-app development setup, or `node server.mjs` for the lightweight local version.
4. Open the local URL shown in the terminal.

## Technology

- HTML, CSS, and vanilla JavaScript for the core interface
- Node.js and a Cloudflare Worker-compatible server endpoint
- OpenAI API for schedule parsing
- ChatGPT Sites with a Cloudflare Worker-compatible server endpoint

## Repository

https://github.com/ben1501/chaos-manager
