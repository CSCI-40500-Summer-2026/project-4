/*
 * app.js — Campus Assistant (evolutionary prototype)
 *
 * DOM wiring + conversation flow. The pure matching logic lives in engine.js
 * (findEntry), which is loaded before this file. Answers are still hardcoded
 * (data.js) — this demonstrates the feasibility of a future AI assistant.
 */

const chatEl = document.getElementById("chat");
const formEl = document.getElementById("composer");
const inputEl = document.getElementById("input");
const chipsEl = document.getElementById("chips");
const historyListEl = document.getElementById("historyList");
const clearHistoryEl = document.getElementById("clearHistory");

// localStorage keys. All stored data is non-identifying (question text and
// counts only) so it can live on-device without needing encryption.
const STORAGE = {
  history: "ca_history",
  feedback: "ca_feedback",
  unanswered: "ca_unanswered",
};

// Safe localStorage helpers — storage can be unavailable (private mode) or
// hold corrupt JSON, so never let it throw.
function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

// Restore history from a previous visit (finishes issue #7: view history).
let questionHistory = loadJSON(STORAGE.history, []);

// Turn any http(s) URLs in a string into real, clickable links. Builds text
// and <a> nodes (never innerHTML) so user/answer text can't inject markup.
const URL_RE = /(https?:\/\/[^\s]+)/g;
function appendLinkified(target, text) {
  let lastIndex = 0;
  for (const match of text.matchAll(URL_RE)) {
    const url = match[0];
    const start = match.index;
    if (start > lastIndex) {
      target.appendChild(document.createTextNode(text.slice(lastIndex, start)));
    }
    const link = document.createElement("a");
    link.className = "inline-link";
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = url;
    target.appendChild(link);
    lastIndex = start + url.length;
  }
  if (lastIndex < text.length) {
    target.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

// render a chat bubble. options: { website, feedback, question }
function addMessage(text, sender, options = {}) {
  const { website = null, feedback = false, question = "" } = options;

  const msg = document.createElement("div");
  msg.className = "msg msg--" + sender;

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  appendLinkified(bubble, text);
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

  if (feedback) {
    msg.appendChild(buildFeedbackRow(question));
  }

  chatEl.appendChild(msg);
  chatEl.scrollTop = chatEl.scrollHeight; // keep newest message in view
}

// 👍 / 👎 row under an answer — tracks the vision's "satisfaction" metric.
function buildFeedbackRow(question) {
  const row = document.createElement("div");
  row.className = "feedback";

  const label = document.createElement("span");
  label.className = "feedback__label";
  label.textContent = "Was this helpful?";
  row.appendChild(label);

  const makeBtn = (vote, emoji, ariaLabel) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "feedback-btn";
    btn.textContent = emoji;
    btn.setAttribute("aria-label", ariaLabel);
    btn.addEventListener("click", () => {
      recordFeedback(vote, question);
      row
        .querySelectorAll(".feedback-btn")
        .forEach((b) => (b.disabled = true));
      btn.classList.add("feedback-btn--chosen");
      label.textContent = "Thanks for your feedback!";
    });
    return btn;
  };

  row.appendChild(makeBtn("up", "👍", "Mark this answer helpful"));
  row.appendChild(makeBtn("down", "👎", "Mark this answer not helpful"));
  return row;
}

function recordFeedback(vote, question) {
  const fb = loadJSON(STORAGE.feedback, { up: 0, down: 0, log: [] });
  if (vote === "up") fb.up += 1;
  else fb.down += 1;
  fb.log.push({ question, vote, at: new Date().toISOString() });
  if (fb.log.length > 100) fb.log = fb.log.slice(-100);
  saveJSON(STORAGE.feedback, fb);
}

// Record questions we couldn't answer so the team knows what data to add next
// (supports the vision's "coverage" success criterion).
function logUnanswered(question) {
  const list = loadJSON(STORAGE.unanswered, []);
  list.push({ question, at: new Date().toISOString() });
  if (list.length > 100) list.splice(0, list.length - 100);
  saveJSON(STORAGE.unanswered, list);
}

function saveQuestionToHistory(question) {
  if (questionHistory.includes(question)) return;

  questionHistory.unshift(question);

  if (questionHistory.length > 5) {
    questionHistory.pop();
  }

  saveJSON(STORAGE.history, questionHistory);
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
      addMessage(entry.answer, "bot", {
        website: entry.website,
        feedback: true,
        question: trimmed,
      });
    } else {
      logUnanswered(trimmed);
      addMessage(FALLBACK_ANSWER, "bot", { feedback: true, question: trimmed });
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
  saveJSON(STORAGE.history, questionHistory);
  renderHistory();
});

addMessage(
  "👋 Hi! I'm a Campus Assistant. Ask me about campus locations, deadlines, or how-to questions — or tap a suggestion below.",
  "bot"
);
renderHistory(); // show any history restored from a previous visit
inputEl.focus();
