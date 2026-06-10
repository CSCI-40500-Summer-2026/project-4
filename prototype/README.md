# Campus Assistant — Prototype

A single-page proof-of-concept chatbot that answers student questions about campus **locations**, **deadlines**, and **how-to / FAQ procedures** in plain language.

> ⚠️ This is a **throwaway skeletal prototype** (Sommerville Ch. 1 style). Its purpose is to demonstrate the concept and help elicit requirements — it is **not** production code and is meant to be discarded.

## How to run it

**Option A — open locally**

1. Download/clone this repo.
2. Open `prototype/index.html` in any modern web browser (double-click it).

That's it — no install, no build step, no server.

**Option B — GitHub Pages**

If Pages is enabled for this repo, visit:

```
https://<your-username>.github.io/<repo-name>/prototype/
```

_(Replace the placeholders with the actual GitHub account and repository name.)_

## What this prototype demonstrates

- A simple **chat interface**: message history, text input, and a send button.
- **Suggested-question chips** that pre-fill common questions with one tap.
- Instant **plain-language answers** for three categories of questions:
  - **Locations** — tutoring center, financial aid office, registrar, CS department, library, student ID office.
  - **Deadlines** — last day to drop, tuition due date, registration opens, FAFSA deadline.
  - **FAQs / procedures** — how to get a student ID, how to declare a major, how to contact an advisor.
- A **graceful fallback** when it doesn't understand a question (it points you to Student Services instead of guessing).
- **Stubbed future features**: a "📍 View on map" button on location answers and an "⏰ Remind me" button on deadline answers. These pop up a "coming soon" message to show planned functionality.

## What is intentionally fake / hardcoded

- **No real AI.** The "brain" is a hardcoded list of question/answer entries in [`data.js`](data.js). Matching is naive keyword/substring lookup in [`app.js`](app.js) — there is no language model, embeddings, or natural-language understanding.
- **No live campus data.** All locations, dates, and procedures are made-up sample values for the demo.
- **No backend.** Everything runs in the browser; nothing is sent anywhere and nothing is stored.
- The "View on map" and "Remind me" buttons **do nothing real** — they only show a placeholder alert.

## Known limitations / out of scope

- No real AI or natural-language understanding (exact-ish keyword matching only).
- No live or official campus data; answers can be wrong or outdated by design.
- No map view, no calendar reminders, and no actions taken on behalf of the student.
- No accounts, authentication, history, or personalization.
- Not tested across the full range of browsers/devices; desktop Chrome/Safari/Firefox are expected to work.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure: chat area, suggestion chips, input. |
| `style.css` | Minimal styling for the chat UI. |
| `app.js` | UI logic + the fake keyword "matching engine". |
| `data.js` | Hardcoded Q&A dataset (the mock "brain"). |
| `README.md` | This file. |
