/*
 * data.js — the prototype's fake "brain".
 *
 * just a hard-coded list of question/answer entries.
 *
 * Categories: "location", "deadline", "faq".
 *   - "location" answers get a stubbed "View on map" button.
 *   - "deadline" answers get a stubbed "Remind me" button.
 */

const CAMPUS_DATA = [
//locations
  {
    category: "location",
    keywords: ["tutoring center", "tutoring", "tutor", "study help"],
    answer:
      "The Tutoring Center is in Room 120, Library Building. Drop-in hours are Mon–Fri, 9am–6pm.",
  },
  {
    category: "location",
    keywords: ["financial aid office", "financial aid", "scholarship office"],
    answer:
      "The Financial Aid Office is in Room 205, Admin Building. Walk-ins are welcome Mon–Thu, 10am–4pm.",
  },
  {
    category: "location",
    keywords: ["registrar", "transcripts office", "enrollment office"],
    answer:
      "The Registrar's Office is in Room 110, Admin Building. Go here for transcripts and enrollment verification.",
  },
  {
    category: "location",
    keywords: ["cs department", "computer science", "comp sci", "cs office"],
    answer:
      "The Computer Science Department is on the 3rd floor of the Science Building, Room 300.",
  },
  {
    category: "location",
    keywords: ["library", "books", "study space"],
    answer:
      "The Library is the Library Building on the main quad. It's open Mon–Fri 8am–10pm and weekends 10am–6pm.",
  },
  {
    category: "location",
    keywords: ["student id office", "id office", "id card", "get my id", "campus card"],
    answer:
      "The Student ID Office is in Room 100, Admin Building (inside Student Services).",
  },

  //deadlines
  {
    category: "deadline",
    keywords: ["last day to drop", "drop a class", "drop deadline", "withdraw"],
    answer:
      "The last day to drop a class without a 'W' is September 18, 2026.",
  },
  {
    category: "deadline",
    keywords: ["tuition", "tuition due", "pay tuition", "tuition deadline", "bill due"],
    answer:
      "Fall 2026 tuition is due August 25, 2026. Payment plans are available through the Bursar.",
  },
  {
    category: "deadline",
    keywords: ["registration opens", "register for classes", "registration", "sign up for classes"],
    answer:
      "Registration for Spring 2027 opens November 2, 2026. Your registration time appears in the student portal.",
  },
  {
    category: "deadline",
    keywords: ["fafsa", "fafsa deadline", "financial aid deadline", "aid application"],
    answer:
      "The FAFSA priority deadline for the 2026–2027 aid year is March 2, 2026.",
  },

  //FAQs/procedures
  {
    category: "faq",
    keywords: ["how do i get a student id", "get a student id", "new id", "how to get id", "student id"],
    answer:
      "To get a student ID: bring a government photo ID to the Student ID Office (Room 100, Admin Building). Your first card is free; replacements are $15.",
  },
  {
    category: "faq",
    keywords: ["declare a major", "declare major", "change my major", "choose a major"],
    answer:
      "To declare a major: complete the Declaration of Major form in the student portal, get your advisor's signature, and submit it to the Registrar (Room 110, Admin Building).",
  },
  {
    category: "faq",
    keywords: ["contact an advisor", "contact my advisor", "academic advisor", "advising", "meet with advisor"],
    answer:
      "To contact an advisor: open the student portal → Advising → 'Book Appointment', or email your assigned advisor (listed on your portal dashboard).",
  },
//general
  {
    category: "general",
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon"],
    answer:
      "Hi! I'm the Campus Assistant. Ask me about campus locations, deadlines, or how-to questions like getting a student ID.",
  },
  {
    category: "general",
    keywords: ["thank you", "thanks", "thx", "appreciate"],
    answer: "You're welcome! Anything else you'd like to know about campus?",
  },
  {
    category: "general",
    keywords: ["help", "what can you do", "what can i ask"],
    answer:
      "You can ask me where things are (e.g. the tutoring center), about deadlines (e.g. when tuition is due), or how to do things (e.g. how to declare a major).",
  },
];

// no keywords match
const FALLBACK_ANSWER =
  "I'm not sure about that yet. Try asking at the Student Services desk (Room 100, Admin Building).";
