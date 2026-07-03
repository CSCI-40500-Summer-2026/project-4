## Prototype Evolution

This Prototype extension improves upon previous proof-of-concept prototype. Improvements include:

- Expanded Hunter College office and tutoring center information
- Official website links for campus resources, plus clickable links inside answers
- Previous Questions history that persists across page reloads
- 👍 / 👎 feedback on each answer (a step toward the vision's "satisfaction" metric)
- Logging of unanswered questions to reveal gaps in coverage
- Academic Calendar guidance for deadlines
- Improved fallback responses directing users to official Hunter College resources
- Punctuation- and case-tolerant keyword matching, split into a testable `engine.js` with unit tests (`tests/engine.test.js`)
- Accessibility touches: keyboard focus outlines and labelled controls

The prototype still uses keyword matching and hardcoded responses but demonstrates the feasibility of a future AI-powered campus assistant.

Run the tests with: `node --test PrototypeExtension/docs/tests/engine.test.js`
