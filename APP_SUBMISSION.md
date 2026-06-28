# Chaos Manager App Submission

## App Overview

Chaos Manager is a web app prototype that helps users turn messy schedule notes into a clean, structured calendar plan.

The user can paste a natural-language "brain dump" of their schedule into the app. For example, they might write about work shifts, tutoring sessions, errands, appointments, or sports practices. The app then sends that text to an OpenAI-powered parser through a local backend server.

The parser returns structured event data. The app displays those events in a readable schedule view and allows the user to export them as a downloadable `.ics` calendar file.

The main goal of the app is to reduce schedule chaos. Instead of manually creating calendar events from scattered notes, the user can paste everything into one place and quickly turn it into usable calendar entries.

## What The App Does

The app follows this workflow:

1. The user types or pastes messy schedule text into the input box.
2. The frontend sends that text to a local backend endpoint: `/api/parse-schedule`.
3. The backend securely calls the OpenAI API using an API key stored in a `.env` file.
4. OpenAI returns a JSON array of events.
5. The app displays the parsed events as schedule cards.
6. The user can edit event titles and descriptions.
7. The user can remove events or clear the schedule.
8. The user can export the final schedule as an `.ics` calendar file.

Each parsed event contains:

- `title`
- `startTime`
- `endTime`
- `description`

## Technology Used

The frontend is built with:

- HTML
- CSS
- Vanilla JavaScript

The backend is built with:

- Node.js
- The built-in Node HTTP server
- The OpenAI API

The project does not use React, Vue, Angular, or another frontend framework. The app is intentionally simple and lightweight.

The visual design uses a neo-brutalist/Bauhaus-inspired style with:

- Strong black borders
- Bold typography
- Square controls
- High-contrast colors
- A two-panel workspace layout

## Dependencies

The app depends on:

- Node.js
- A modern web browser
- An OpenAI API key
- Internet access for the backend server
- A local `.env` file for private settings

The `.env` file stores private configuration, including the OpenAI API key.

Example:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4.1-mini
PORT=3000
```

The API key is not stored in the frontend code. This is important because frontend code can be viewed by users in the browser.

## Security And Privacy

A key security decision in this app is that the OpenAI API key is never exposed in `index.html`.

The frontend only sends the user's schedule text to the local backend. The backend then sends the request to OpenAI using the private API key from the `.env` file.

This design is safer than putting the API key directly in JavaScript because browser code is visible to users.

However, there are still privacy risks. The user's schedule text may contain personal information, such as:

- Work hours
- Appointment details
- Locations
- Names of other people
- Personal plans

Because the backend sends this text to OpenAI for parsing, users should avoid entering highly sensitive information unless they understand that it is being processed by an external AI service.

## Risks And Limitations

The biggest risk is incorrect AI parsing.

The AI might misunderstand:

- Dates
- Times
- Event names
- Event durations
- Relative phrases like "tomorrow" or "next Friday"
- Vague phrases like "after school" or "around 7"

Because of this, the app displays the parsed events before export. The user can review the results and edit or remove events before downloading the calendar file.

Other limitations include:

- The current prototype only supports one-time events.
- It does not support recurring events yet.
- The app depends on the OpenAI API being available.
- If the API key is missing or invalid, parsing will not work.
- If the user gives unclear input, the AI may create incorrect events.
- The `.ics` export supports basic calendar events, but not every advanced calendar feature.
- The app currently runs locally and is not a fully deployed production web app.

## Conclusion

Chaos Manager is a functional prototype for converting messy natural-language schedule notes into structured calendar events.

It demonstrates:

- Frontend interface design
- Backend API handling
- Secure API key usage
- AI-powered text parsing
- JSON processing
- Calendar export using the `.ics` format

The app is useful because it reduces the effort of manually creating calendar events from unorganized schedule information. It also keeps the user in control by allowing them to review and edit the parsed events before exporting them.
