# Chaos Manager

Single-file frontend plus a tiny local Node server for the OpenAI-backed parser.

## Run Locally

1. Create a `.env` file in this folder:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4.1-mini
   PORT=3000
   ```

2. Start the app:

   ```bash
   npm start
   ```

3. Open:

   ```text
   http://localhost:3000
   ```

The API key stays on the local server. The browser only calls `/api/parse-schedule`.

## Files

- `index.html` - the web app UI and calendar export logic
- `server.mjs` - local server and OpenAI schedule parser endpoint
- `.env.example` - environment variable template
