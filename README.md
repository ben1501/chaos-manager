# Chaos Manager

Chaos Manager is a prototype scheduling web app that turns messy natural-language schedule notes into structured calendar events.

The app is built for people who manage shifting responsibilities, multiple jobs, tutoring sessions, errands, appointments, and other moving parts. Instead of manually creating calendar events one by one, the user can paste a rough "brain dump" of their week, review the parsed events, and export them as an `.ics` calendar file.

## What It Does

Chaos Manager follows a simple workflow:

1. The user pastes messy schedule text into the app.
2. The browser sends that text to a local backend endpoint.
3. The backend calls the OpenAI API to parse the text into structured JSON.
4. The app displays the parsed schedule as editable event cards.
5. The user can remove events, edit titles/descriptions, or clear the schedule.
6. The user can export the final events as a downloadable `.ics` file.
7. The `.ics` file can be imported into calendar apps.

Example input:

```text
I have English tutoring tomorrow from 16:00 to 18:00,
then a soccer field supervisor shift from 19:00 to 22:00.
```

The app asks the AI parser to return events with:

- `title`
- `startTime`
- `endTime`
- `description`

## Features

- Natural-language schedule input
- OpenAI-powered schedule parsing
- Local Node.js backend to protect the API key
- Editable parsed event cards
- Event removal and full schedule clearing
- Browser-based `.ics` calendar export
- Local timezone handling
- Neo-brutalist/Bauhaus-inspired visual design
- No frontend framework required

## Tech Stack

Frontend:

- HTML
- CSS
- Vanilla JavaScript

Backend:

- Node.js
- Built-in Node HTTP server
- OpenAI API

Project files:

- `index.html` - main web app UI, frontend logic, and `.ics` export
- `server.mjs` - local backend server and OpenAI parser endpoint
- `package.json` - start script
- `.env.example` - example environment variables
- `APP_SUBMISSION.md` - school submission writeup
- `theme pages/` - design references used for the app style

## Why There Is A Backend

The OpenAI API key should not be placed inside browser JavaScript. Anything in `index.html` can be viewed by users.

Instead, this project uses a small local Node server:

```text
Browser -> /api/parse-schedule -> Node server -> OpenAI API
```

The browser never sees the API key. The server reads it from a private `.env` file.

## Run Locally

1. Go to the project folder:

   ```bash
   cd "/Users/benbarzilay/Documents/final ai project - chaos manager"
   ```

2. Create a `.env` file in this folder:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4.1-mini
   PORT=3000
   ```

3. Start the server:

   ```bash
   node server.mjs
   ```

   Or:

   ```bash
   npm start
   ```

4. Open the app:

   ```text
   http://localhost:3000
   ```

## API Key Safety

The real `.env` file is ignored by Git and should not be pushed to GitHub.

The repository includes `.env.example` so other people can see which environment variables are required without seeing the real API key.

Ignored private/local files include:

- `.env`
- `env.rtf`
- `node_modules/`
- `.DS_Store`
- `.ics` calendar export files

## Current Limitations

This is a functional prototype, not a finished production app.

Current limitations:

- It only supports one-time events.
- It does not support recurring events yet.
- AI parsing can make mistakes with unclear dates or vague wording.
- The user should review parsed events before exporting.
- The app currently runs locally.
- The `.ics` export supports basic calendar events, not advanced calendar features.

## Risks

The main risk is incorrect AI parsing. The model may misunderstand dates, times, or event details, especially when the input is vague.

There is also a privacy consideration: schedule text may contain personal information. Since the backend sends that text to OpenAI for parsing, users should avoid entering highly sensitive information unless they understand that it is being processed by an external AI service.

## Future Improvements

Possible next steps:

- Add recurring event support
- Add event date/time editing in the UI
- Add validation warnings for unclear events
- Add a calendar grid view
- Add deployment to a hosted serverless platform
- Add user authentication and saved schedules

## Summary

Chaos Manager helps turn unorganized schedule notes into structured calendar events. It demonstrates frontend design, backend API handling, secure API key usage, AI-based text parsing, JSON processing, and `.ics` calendar export in a lightweight prototype.
