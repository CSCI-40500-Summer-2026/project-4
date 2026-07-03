/*
 * data.js — the prototype's hard-coded "brain".
 *
 * A hand-curated list of question/answer entries grounded in real Hunter
 * College data. The matching engine (engine.js) scores an entry by how many
 * of its keywords appear in the user's question.
 *
 * Each entry has: category ("location" | "deadline" | "faq" | "general"),
 * keywords[], answer (string), and optionally website + structured contact
 * fields (title/location/phone/email). URLs in answers/fallback are linkified
 * at render time (app.js). When nothing matches, FALLBACK_ANSWER is shown.
 */

const CAMPUS_DATA = [
  {
    category: "location",
    keywords: [
      "tutoring",
      "tutoring center",
      "learning center",
      "academic support",
      "study help",
      "where can i get tutoring",
    ],
    answer:
      "Hunter College has several tutoring and academic support centers:\n\n" +
      "• Chanin Language Center (Foreign Languages)\n" +
      "• Dolciani Math Learning Center (Mathematics)\n" +
      "• Rockowitz Writing Center (Writing)\n" +
      "• Skirball Science Learning Center (Science & Technology)\n" +
      "• Sylvia E. Fishman Student Center (Academic Support & Advising)\n\n" +
      "Ask about a specific center if you'd like its location, hours, or contact information.\n\n" +
      "Looking for tutoring in a specific subject that's not listed here? Many Hunter College departments offer their own tutoring and academic support services. Check your department's website or contact the department office to learn what resources are available.",
  },

  {
    category: "location",
    keywords: [
      "chanin",
      "language center",
      "foreign language",
      "language tutoring",
      "language help",
      "spanish tutoring",
      "french tutoring",
      "chinese tutoring",
      "japanese tutoring",
    ],
    answer:
      "Chanin Language Center\n\n" +
      "Location:\nRoom 209, Hunter West Building\n\n" +
      "Phone:\n212-772-5700\n\n" +
      "Description:\nThe Chanin Language Center helps students strengthen foreign language skills through tutoring and language-learning resources.",
  },

  {
    category: "location",
    keywords: [
      "dolciani",
      "math",
      "math tutoring",
      "calculus",
      "algebra",
      "statistics",
      "math center",
    ],
    answer:
      "Dolciani Math Learning Center\n\n" +
      "Location:\nEast Building, 7th Floor Library\n\n" +
      "Phone:\n212-772-5371\n\n" +
      "Description:\nThe Dolciani Math Learning Center offers one-on-one tutoring and group workshops for mathematics courses.",
  },
  {
    category: "location",
    keywords: [
      "writing",
      "writing center",
      "essay",
      "paper",
      "english",
      "rockowitz",
      "writing tutoring",
    ],
    answer:
      "Rockowitz Writing Center\n\n" +
      "Location:\nSilverstein Student Success Center\nCooperman Library, 7th Floor, East Building\n\n" +
      "Phone:\n212-772-4212\n\n" +
      "Email:\nrwc@hunter.cuny.edu\n\n" +
      "Description:\nThe Rockowitz Writing Center provides tutoring, workshops, live video tutoring, and e-tutoring to help students improve their writing.",
  },

  {
    category: "location",
    keywords: [
      "science",
      "science tutoring",
      "biology",
      "chemistry",
      "physics",
      "skirball",
    ],
    answer:
      "Skirball Science Learning Center\n\n" +
      "Location:\nSilverstein Student Success Center\nCooperman Library, 7th Floor, East Building\n\n" +
      "Student Assistance Phone:\n212-396-6458\n\n" +
      "Director:\nChristina Medina Ramirez, PhD\n212-650-3283\ncm950@hunter.cuny.edu\n\n" +
      "Description:\nThe Skirball Science Learning Center provides academic support in the natural sciences and technology.",
  },

  {
    category: "location",
    keywords: [
      "fishman",
      "student center",
      "academic advising",
      "advisor",
      "student support",
      "success center",
    ],
    answer:
      "Sylvia E. Fishman Student Center\n\n" +
      "Location:\nRoom 417, Hunter West Building\n\n" +
      "Phone:\n212-650-3282\n\n" +
      "Email:\nstudentcenter@hunter.cuny.edu\n\n" +
      "Description:\nThe Sylvia E. Fishman Student Center is a supportive space where students can connect with peers, meet with advisors, plan events, and access presentation facilities.",
  },

  {
    category: "location",
    keywords: [
      "financial aid",
      "financial aid office",
      "fafsa",
      "tap",
      "scholarships",
      "grants",
      "student loans",
      "financial assistance",
    ],
    title: "Office of Financial Aid",
    location: "Room 241, North Building",
    phone: "(212) 772-4820",
    email: "finaid@hunter.cuny.edu",
    website:
      "https://www.hunter.cuny.edu/students/financial-aid/office-of-financial-aid/",
    answer:
      "Office of Financial Aid\n\n" +
      "📍 Location:\nRoom 241, North Building\n\n" +
      "📞 Phone:\n(212) 772-4820\n\n" +
      "✉️ Email:\nfinaid@hunter.cuny.edu\n\n" +
      "🕒 In-Person Office Hours:\n" +
      "Monday: 10:00 AM – 5:00 PM\n" +
      "Tuesday: 9:00 AM – 5:00 PM\n" +
      "Wednesday: 9:00 AM – 5:00 PM\n" +
      "Thursday: 10:00 AM – 6:30 PM\n" +
      "Friday: 9:00 AM – 2:00 PM\n\n" +
      "The Office of Financial Aid assists students with FAFSA, TAP, scholarships, grants, loans, work-study, and financial aid eligibility.\n\n" +
      "Visit the Financial Aid website for forms, deadlines, FAQs, and additional resources.",
  },

  {
    category: "location",
    keywords: [
      "registrar",
      "office of the registrar",
      "transcript",
      "transcripts",
      "registration",
      "register for classes",
      "graduation",
      "degree audit",
      "epermit",
      "enrollment verification",
      "academic records",
    ],
    title: "Office of the Registrar",
    location: "Room 217, North Building",
    phone: "(212) 772-4500",
    email: "regweb@hunter.cuny.edu",
    website:
      "https://www.hunter.cuny.edu/students/registration/office-of-the-registrar/",
    answer:
      "Office of the Registrar\n\n" +
      "📍 Location:\nRoom 217, North Building\n\n" +
      "📞 Phone:\n(212) 772-4500\n\n" +
      "✉️ General Email:\nregweb@hunter.cuny.edu\n\n" +
      "🕒 In-Person Office Hours:\n" +
      "Monday: 9:00 AM – 5:00 PM\n" +
      "Tuesday: 9:00 AM – 6:30 PM\n" +
      "Wednesday: 9:00 AM – 5:00 PM\n" +
      "Thursday: 10:00 AM – 6:30 PM\n" +
      "Friday: 9:00 AM – 2:00 PM\n\n" +
      "The Office of the Registrar assists students with course registration, academic records, transcripts, graduation, enrollment verification, degree audits, ePermits, and other registration-related services.\n\n" +
      "Visit the Office of the Registrar website for forms, academic calendars, policies, and additional services.",
  },
  {
    category: "location",
    keywords: ["cs department", "computer science", "comp sci", "cs office"],
    website: "https://www.hunter.cuny.edu/csci/",
    answer:
      "Department of Computer Science\n\n" +
      "For the department's current office location, hours, and staff, please visit the Computer Science Department website or check the Hunter College campus directory.\n\n" +
      "The department can also help with questions about CS courses, advising, and major requirements.",
  },
  {
    category: "location",
    keywords: [
      "library",
      "cooperman library",
      "leon and toby cooperman library",
      "books",
      "study",
      "study space",
      "study room",
      "quiet study",
      "research",
      "printing",
      "print",
      "computer",
      "computer lab",
      "librarian",
    ],
    title: "Leon & Toby Cooperman Library",
    location:
      "East Building, 695 Park Avenue, New York, NY 10065 (Entrance on the 3rd-floor walkway level)",
    phone: {
      circulation: "(212) 772-4166",
      reference: "(212) 772-4187",
      welcomeDesk: "(212) 396-6800",
    },
    website: "https://library.hunter.cuny.edu/leon-toby-cooperman-library",
    answer:
      "Leon & Toby Cooperman Library\n\n" +
      "📍 Location:\nEast Building (Entrance on the 3rd-floor walkway level)\n\n" +
      "📚 Services:\n" +
      "• Individual and group study rooms\n" +
      "• Books, journals, and online databases\n" +
      "• Research assistance from librarians\n" +
      "• Computer labs and internet access\n" +
      "• Printing and scanning services\n" +
      "• Accessibility resources for students\n\n" +
      "📞 Main Contacts:\n" +
      "• Circulation: (212) 772-4166\n" +
      "• Reference: (212) 772-4187\n" +
      "• Welcome Desk: (212) 396-6800\n\n" +
      "Visit the Hunter Libraries website for current hours, floor maps, study room reservations, research guides, and library services.",
  },

  {
    category: "deadline",
    keywords: [
      "deadline",
      "deadlines",
      "academic calendar",
      "calendar",
      "registration",
      "tuition",
      "drop class",
      "withdraw",
      "fafsa",
      "graduation",
    ],
    title: "Academic Calendar",
    website:
      "https://www.hunter.cuny.edu/students/registration/academic-calendar/",
    answer:
      "Important academic deadlines—including registration, add/drop, withdrawal, tuition payment, graduation filing, and semester dates—change each semester.\n\n" +
      "Please refer to the official Hunter College Academic Calendar for the most current deadlines and important dates.",
  },

  //FAQs/procedures
  {
    category: "faq",
    keywords: [
      "how do i get a student id",
      "get a student id",
      "new id",
      "how to get id",
      "student id",
    ],
    answer:
      "To get a student ID: bring a government photo ID to the Student ID Office (Room 100, Admin Building). Your first card is free; replacements are $15.",
  },
  {
    category: "faq",
    keywords: [
      "declare a major",
      "declare major",
      "change my major",
      "choose a major",
    ],
    answer:
      "To declare a major: complete the Declaration of Major form in the student portal, get your advisor's signature, and submit it to the Registrar (Room 110, Admin Building).",
  },
  {
    category: "faq",
    keywords: [
      "contact an advisor",
      "contact my advisor",
      "academic advisor",
      "advising",
      "meet with advisor",
    ],
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

const FALLBACK_ANSWER =
  "I'm sorry, I couldn't find information about that office or service.\n\n" +
  "Here are some commonly used Hunter College offices:\n\n" +
  "💰 Bursar's Office (Tuition & Billing)\n" +
  "https://www.hunter.cuny.edu/students/tuition-and-payment/office-of-the-bursar/\n\n" +
  "🎓 Office of Admissions\n" +
  "https://www.hunter.cuny.edu/students/admissions/undergraduate/contact-us/\n\n" +
  "📄 Office of the Registrar\n" +
  "https://www.hunter.cuny.edu/students/registration/office-of-the-registrar/\n\n" +
  "💵 Office of Financial Aid\n" +
  "https://www.hunter.cuny.edu/students/financial-aid/office-of-financial-aid/\n\n" +
  "🧭 Academic Advising\n" +
  "https://www.hunter.cuny.edu/students/academic-planning/office-of-advising/\n\n" +
  "💼 Career Center\n" +
  "https://www.hunter.cuny.edu/students/career-center/\n\n" +
  "♿ Office of AccessABILITY\n" +
  "https://www.hunter.cuny.edu/students/health-wellness/accessibility/\n\n" +
  "If you're still unable to find the office you're looking for, please visit the Hunter College website directory or contact the appropriate department directly.";

// Export for Node-based tests; harmless (no-op) in the browser.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CAMPUS_DATA, FALLBACK_ANSWER };
}
