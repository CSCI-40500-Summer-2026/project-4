/*
 * app.js — Campus Assistant (Proof-of-Concept Prototype)
 *
 * This is a skeletal "evolutionary prototype"
 */

const chatEl = document.getElementById("chat");
const formEl = document.getElementById("composer");
const inputEl = document.getElementById("input");
const chipsEl = document.getElementById("chips");
const historyListEl = document.getElementById("historyList");
const clearHistoryEl = document.getElementById("clearHistory");

let questionHistory = [];

// The fake "matching engine":
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

// render
function addMessage(text, sender, website = null) {
  const msg = document.createElement("div");
  msg.className = "msg msg--" + sender;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  msg.appendChild(bubble);
  if (website) {
    const link = document.createElement("a");
    link.className = "website-link";
    link.href = website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Visit official website";
    msg.appendChild(link);
  }
  chatEl.appendChild(msg);
  chatEl.scrollTop = chatEl.scrollHeight; // keep newest message in view
}

function saveQuestionToHistory(question) {
  if (questionHistory.includes(question)) return;

  questionHistory.unshift(question);

  if (questionHistory.length > 5) {
    questionHistory.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = "";

  if (questionHistory.length === 0) {
    const empty = document.createElement("p");
    empty.className = "history__empty";
    empty.textContent = "No questions yet.";
    historyListEl.appendChild(empty);
    return;
  }

  for (const question of questionHistory) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-btn";
    btn.textContent = question;
    btn.addEventListener("click", () => handleUserText(question));

    historyListEl.appendChild(btn);
  }
}
//conversation flow:
function handleUserText(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  addMessage(trimmed, "user");
  saveQuestionToHistory(trimmed);
  // Tiny delay so it reads like a chat reply rather than appearing instantly.
  setTimeout(() => {
    const entry = findEntry(trimmed);
    if (entry) {
      addMessage(entry.answer, "bot", actionsFor(entry.category), entry.website);
    } else {
      addMessage(FALLBACK_ANSWER, "bot");
    }
  }, 250);
}

// event
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

clearHistoryEl.addEventListener("click", () => {
  questionHistory = [];
  renderHistory();
});

// greetings
addMessage(
  "👋 Hi! I'm a Campus Assistant. Ask me about campus locations, deadlines, or how-to questions — or tap a suggestion below.",
  "bot",
);
inputEl.focus();
