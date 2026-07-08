# Project 4
## Product Vision

FOR university students, especially freshmen and transfer students; WHO struggle to find campus information like office locations, deadlines, and procedures that are often found online in different locations, like emails, department pages. THE campus assistant is an AI chatbot THAT delivers fast, accurate, plain-language answers from official campus data and can answer questions like “Where’s the tutoring center?” “When is the tuition deadline?”. UNLIKE university websites, weak search bars, waiting for an answer from a department, or visiting an office, OUR product gives instant, specific answers without students having to dig through multiple websites or wait for an answer from staff.  

More details on the Project: [Product Vision](./ProductVision.pdf)

## Software Product Architecture
### 1. Most Important Software Qualities
Based on the architectural influences provided, we prioritize the following characteristics for the Campus Assistant AI Chatbot:
*   **Nonfunctional Product Characteristics (High Priority - Security & Performance):** Since the chatbot deals directly with students seeking real-time answers, response latency must be minimized. Furthermore, because it handles user interaction data, securing student privacy through encrypted transport layer handling is critical.
*   **Product Lifetime & Evolvability**: University deadlines, office locations, and procedures change every academic year. The architecture must be highly modular (evolvable) so that administrators can easily update data pipelines or plug in alternative LLM APIs over time without rebuilding the system.
*   **Software Reuse:** To scale development rapidly, our architecture heavily emphasizes reusing existing components, such as open-source React UI elements for the chat widget and pre-trained language model APIs for natural language processing.

---
### 2. Number of Architectural Layers (Figure 4.10)
Our system implements a robust **4-layer architecture** adapted from the classic web application pattern to separate presentation logic, AI orchestration, and data storage cleanly:
1.  **User Interface (Presentation Layer):** A responsive web-based UI where students view and interact with the chat interface.
2.  **Application Services & AI Logic (Orchestration Layer):** Manages user session routing, processes input prompts, coordinates API calls to the language model provider, and parses the text payload.
3.  **Basic Shared Services (Integration Layer):** Contains utilities for caching frequent answers (e.g., tuition deadlines) and handling basic user authentication checks.
4.  **Database & Storage Management (Data Layer):** Handles persistent logging of conversation feedback metrics and safely indexes official unstructured campus markdown/CSV files.

---

### 3. Layered Architectural Decomposition Diagram
Below is the structural breakdown of components communicating across the layered architecture:
+-----------------------------------------------------------------------+
| 1. USER INTERFACE (Presentation)                                      |
|    [ React Chat Widget ]    [ Web Browser UI ]     [ FAQ Dashboard ]  |
+------------------------------------+----------------------------------+
                                     | (JSON / HTTP HTTPS)
                                     v
+-----------------------------------------------------------------------+
| 2. APPLICATION SERVICES (AI Orchestration)                            |
|    [ Intent Router ]    [ LLM Prompt Manager ]    [ Context Injection] |
+------------------------------------+----------------------------------+
                                     | (API Queries)
                                     v
+-----------------------------------------------------------------------+
| 3. INTEGRATION SERVICES (Shared Utilities)                           |
|    [ Response Cache ]     [ Session Handler ]     [ Logger Service ]  |
+------------------------------------+----------------------------------+
                                     | (Secure Storage Protocols)
                                     v
+-----------------------------------------------------------------------+
| 4. DATA STORAGE MANAGEMENT (Data Systems)                            |
|    [ Campus Info DB ]      [ Session Storage ]    [ Vector Index/Docs ]|
+-----------------------------------------------------------------------+

### 4. Technology Choices

*   **Database:** We utilize a lightweight, unstructured/document-based approach (or vector index pairing) to store official campus documents, office directories, and markdown files. This is chosen over rigid relational SQL tables to accommodate diverse textual formats such as blocks of text for "procedures" alongside string pairings for "office locations."
*   **Platform:** Delivered as a responsive **Web Platform** using TypeScript and React. Web deployment ensures immediate availability across both mobile phones and laptops without requiring students to download an application from an app store.
*   **Server:** Deployed completely on a public cloud ecosystem utilizing managed serverless hosting (such as Netlify or Vercel for the front-end) to allow automated scaling during high-traffic weeks (like freshman orientation week) without server maintenance overhead.
*   **Open-source:** Open-source framework components are integrated to safely build out data ingest structures. Licensing constraints are checked to ensure all third-party libraries comply with standard open development parameters.
*   **Development Tools:** Standard production builders are utilized, matching a modular stack that imposes no rigid architectural constraints on changing downstream language processing APIs down the line.
