/*
 * engine.js — the prototype's matching engine (no DOM dependencies).
 *
 * Kept separate from app.js so the pure matching logic can be unit-tested
 * in Node (see tests/engine.test.js) without a browser. Loaded before app.js
 * in index.html, so `findEntry` is available as a global in the browser.
 */

// In Node/test context CAMPUS_DATA isn't a browser global — load it from
// data.js and expose it on globalThis. (We avoid a top-level `var CAMPUS_DATA`
// here: in the browser it would collide with data.js's global `const` and
// throw a SyntaxError.)
if (typeof CAMPUS_DATA === "undefined" && typeof require !== "undefined") {
  globalThis.CAMPUS_DATA = require("./data.js").CAMPUS_DATA;
}

// Normalize free text so punctuation and spacing don't break matching:
// "Where's the tutoring center?!" -> "where s the tutoring center".
function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // punctuation -> space
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

// Score every entry by how many of its (normalized) keywords appear as
// substrings of the (normalized) question. Highest score wins; a score of 0
// means nothing matched, so the caller shows the fallback instead of guessing.
function findEntry(text) {
  const q = normalizeText(text);
  let best = null;
  let bestScore = 0;

  for (const entry of CAMPUS_DATA) {
    const score = entry.keywords.filter((kw) =>
      q.includes(normalizeText(kw))
    ).length;
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best; // null if nothing matched
}

// Export for Node-based tests; harmless (no-op) in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { findEntry, normalizeText };
}
