/*
 * Unit tests for the matching engine (engine.js), which is DOM-free.
 * Dependency-free — uses Node's built-in test runner:
 *   node --test PrototypeExtension/docs/tests/
 */

const test = require("node:test");
const assert = require("node:assert");

const { findEntry, normalizeText } = require("../engine.js");

test("normalizeText lowercases, strips punctuation, collapses spaces", () => {
  assert.strictEqual(normalizeText("Where's the CENTER?!"), "where s the center");
  assert.strictEqual(normalizeText("  multiple   spaces  "), "multiple spaces");
});

test("matches the tutoring overview despite trailing punctuation", () => {
  const entry = findEntry("Where's the tutoring center?!");
  assert.ok(entry, "expected a match");
  assert.strictEqual(entry.category, "location");
  assert.ok(entry.answer.startsWith("Hunter College has several tutoring"));
});

test("matches the Office of Financial Aid", () => {
  const entry = findEntry("where is the financial aid office");
  assert.ok(entry);
  assert.strictEqual(entry.title, "Office of Financial Aid");
});

test("matches the Registrar via 'transcript'", () => {
  const entry = findEntry("How do I get my transcript?");
  assert.ok(entry);
  assert.strictEqual(entry.title, "Office of the Registrar");
});

test("tuition deadline maps to the deadline entry", () => {
  const entry = findEntry("When is the tuition deadline?");
  assert.ok(entry);
  assert.strictEqual(entry.category, "deadline");
});

test("student ID question maps to the FAQ entry", () => {
  const entry = findEntry("how do I get my student id");
  assert.ok(entry);
  assert.strictEqual(entry.category, "faq");
  assert.ok(/student id/i.test(entry.answer));
});

test("case and punctuation don't break matching", () => {
  assert.ok(findEntry("FINANCIAL AID???"));
  assert.ok(findEntry("tuition!!!"));
});

test("gibberish returns null so the caller shows the fallback", () => {
  assert.strictEqual(findEntry("asdfghjkl qwerty zxcvb"), null);
  assert.strictEqual(findEntry(""), null);
});
