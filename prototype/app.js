/*
 * app.js — Campus Assistant (Proof-of-Concept Prototype)
 *
 * ⚠️ THROWAWAY PROTOTYPE — INTENDED TO BE DISCARDED.
 * This is a skeletal "evolutionary prototype" in the Sommerville Ch.1 sense:
 * its only job is to demonstrate the concept and help elicit requirements.
 * It is NOT production code. There is no real AI, no backend, and no live
 * campus data — answers come from a hardcoded list in data.js matched by
 * simple keyword/substring lookup.
 */

// --- DOM references ----------------------------------------------------------
const chatEl = document.getElementById("chat");
const formEl = document.getElementById("composer");
const inputEl = document.getElementById("input");
const chipsEl = document.getElementById("chips");

// --- The fake "matching engine" ---------------------------------------------
// Lowercase the user's text, then score every entry by how many of its
// keywords appear as substrings. The highest-scoring entry wins. No match
// (score 0) means we fall back instead of inventing an answer.
function findEntry(text) {
  const q = text.toLowerCase();
  let best = null;
  let bestScore = 0;

  for (const entry of CAMPUS_DATA) {
    const score = entry.keywords.filter((kw) => q.includes(kw)).length;
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  }
  return best; // null if nothing matched
}

// --- Stubbed "future feature" buttons ---------------------------------------
// These do nothing real yet — they just show planned functionality.
function comingSoon(featureName) {
  alert(featureName + " — this feature will be available in a future version.");
}

// Returns the stub action button(s) appropriate for an answer's category.
function actionsFor(category) {
  if (category === "location") {
    return [{ label: "📍 View on map", feature: "View on map" }];
  }
  if (category === "deadline") {
    return [{ label: "⏰ Remind me", feature: "Remind me" }];
  }
  return [];
}

// --- Rendering ---------------------------------------------------------------
function addMessage(text, sender, actions = []) {
  const msg = document.createElement("div");
  msg.className = "msg msg--" + sender; // sender: "user" | "bot"

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text; // textContent = no HTML injection from user input

  msg.appendChild(bubble);

  // Attach any stubbed feature buttons under the bubble.
  if (actions.length) {
    const actionRow = document.createElement("div");
    actionRow.className = "actions";
    for (const action of actions) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "action-btn";
      btn.textContent = action.label;
      btn.title = "Coming soon";
      btn.addEventListener("click", () => comingSoon(action.feature));
      actionRow.appendChild(btn);
    }
    msg.appendChild(actionRow);
  }

  chatEl.appendChild(msg);
  chatEl.scrollTop = chatEl.scrollHeight; // keep newest message in view
}

// --- Conversation flow -------------------------------------------------------
function handleUserText(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  addMessage(trimmed, "user");

  // Tiny delay so it reads like a chat reply rather than appearing instantly.
  setTimeout(() => {
    const entry = findEntry(trimmed);
    if (entry) {
      addMessage(entry.answer, "bot", actionsFor(entry.category));
    } else {
      addMessage(FALLBACK_ANSWER, "bot");
    }
  }, 250);
}

// --- Event wiring ------------------------------------------------------------
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  handleUserText(inputEl.value);
  inputEl.value = "";
  inputEl.focus();
});

// Suggested-question chips: clicking one sends it as if typed.
chipsEl.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  handleUserText(chip.textContent);
});

// --- Greeting on load --------------------------------------------------------
addMessage(
  "👋 Hi! I'm a prototype Campus Assistant. Ask me about campus locations, deadlines, or how-to questions — or tap a suggestion below.",
  "bot"
);
inputEl.focus();
