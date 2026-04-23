# 🗳️ ELECTRA — Product Design Requirements (PDR)
**Challenge 2 | Virtual PromptWars | Submission**
**Version:** 1.0 | **Date:** April 2026

---

## 1. PRODUCT OVERVIEW

### 1.1 Product Name
**ELECTRA** — *Your Election Intelligence Companion*

### 1.2 Tagline
*"From Ballot to Victory — Understand Every Step."*

### 1.3 One-Liner
ELECTRA is a conversational AI assistant that guides citizens through the complete election lifecycle — from voter registration to results — using dynamic timelines, smart Q&A, Google Calendar integration, and real-time reminders.

### 1.4 Why ELECTRA Wins This Challenge
Most election tools are static FAQ pages. ELECTRA is:
- **Conversational & context-aware** — adapts answers based on which country/state the user selects
- **Google-native** — uses Google Calendar, Google Maps (polling booths), Google Sheets (data), and Gemini AI
- **Visually timeline-driven** — turns the abstract election process into a living, interactive journey
- **Accessible** — works for first-time voters, students, journalists, and researchers

---

## 2. PROBLEM STATEMENT (RESTATED)

Citizens, especially first-time voters, struggle to:
1. Understand the **sequence** of election steps (nomination → campaigning → voting → results)
2. Know **what applies to them** (eligibility, deadlines, booth location)
3. **Remember key dates** without needing to search multiple government websites
4. Get **quick, plain-language answers** to election law questions

ELECTRA solves all four problems in one place.

---

## 3. TARGET USERS

| Persona | Pain Point | ELECTRA Solves |
|---|---|---|
| First-time voter (18–22) | "When do I register? Where do I vote?" | Step-by-step guided flow + Maps |
| Student / researcher | "How does the ECI nomination process work?" | Deep-dive Q&A + Timeline |
| Journalist / activist | "What are the key dates for 2024 Lok Sabha?" | Dynamic timeline + Calendar export |
| NRI / diaspora voter | "Can I vote from abroad? How?" | Context-aware FAQ + eligibility checker |

---

## 4. CORE FEATURES

### F1 — Interactive Election Timeline
- Visual horizontal/vertical timeline of the entire election cycle
- Stages: Announcement → MCC Activation → Nomination → Scrutiny → Withdrawal → Campaign → Polling → Counting → Results
- Each stage is **clickable** → expands with details, rules, deadlines
- Color-coded by phase (pre-election / election day / post-election)

### F2 — Conversational AI Assistant (Gemini-powered)
- Natural language Q&A: "Who is eligible to vote in India?"
- Context retention across conversation turns
- Smart follow-up suggestions after each answer
- Fallback to authoritative sources (ECI website, government portals)

### F3 — Google Calendar Integration
- Users can add election dates to their Google Calendar with one click
- Auto-generates event reminders for: Registration deadline, Voting day, Results day
- Syncs with Google Calendar API

### F4 — State/Country Selector
- User selects their country → state/region
- All timelines, dates, and answers become geo-specific
- India focus: Lok Sabha, Vidhan Sabha, Municipal elections
- Extensible to US, UK, EU elections

### F5 — Eligibility Checker
- Simple form: Age, Citizenship, Residency
- Output: "You ARE eligible. Here's how to register →"
- Links to official voter registration portals

### F6 — Polling Booth Locator (Google Maps)
- Enter address → shows nearest polling booth on embedded Google Map
- Uses Google Maps JavaScript API + Places API

### F7 — Election Glossary (Smart Definitions)
- Hover over any term (e.g., "MCC", "EVM", "NOTA") → instant definition tooltip
- Powered by a curated glossary + AI fallback

### F8 — News & Updates Feed
- Google News RSS or Custom Search API integration
- Shows latest election-related news filtered by selected region
- Labeled: "ECI Official" vs "News"

---

## 5. USER FLOWS

### Flow A: First-Time Visitor
```
Land on ELECTRA → See animated hero with "What do you want to know?" →
Select: "I'm a first-time voter" → Guided 5-step wizard →
Eligibility check → Registration link → Timeline view → Calendar sync → Done
```

### Flow B: Research Mode
```
Land on ELECTRA → Click "Explore Timeline" →
Select election type (Lok Sabha / State) → Interactive timeline loads →
Click on "Nomination Phase" → Read details → Ask follow-up in chat →
Export to Google Sheets
```

### Flow C: Quick Question
```
Land on ELECTRA → Type "What is Model Code of Conduct?" →
AI answers with definition + timeline position highlighted →
Suggested next: "When does MCC get activated?" →
User clicks → Calendar reminder set
```

---

## 6. GOOGLE SERVICES INTEGRATION

| Service | Use Case |
|---|---|
| **Gemini API** | Core conversational AI, Q&A, context awareness |
| **Google Calendar API** | Add election dates to user's calendar |
| **Google Maps JavaScript API** | Polling booth locator |
| **Google Places API** | Address autocomplete for booth finder |
| **Google Custom Search API** | Election news feed |
| **Google Sheets API** | Export timelines / data for researchers |
| **Google OAuth 2.0** | Secure login for Calendar/Sheets sync |
| **Firebase** | User session, preferences, saved timelines |

---

## 7. DESIGN PRINCIPLES

1. **Clarity over cleverness** — every interaction must be immediately understandable
2. **Progressive disclosure** — show summary first, detail on demand
3. **Mobile-first** — 70%+ of India's internet users are on mobile
4. **Accessible** — WCAG 2.1 AA, screen reader support, high contrast mode
5. **Trust signals** — always cite official sources (ECI, government portals)

---

## 8. SUCCESS METRICS

| Metric | Target |
|---|---|
| Time to first useful answer | < 10 seconds |
| Task completion rate (find voting date) | > 85% |
| Calendar sync adoption | > 40% of sessions |
| User satisfaction score | > 4.2 / 5 |
| Mobile usability score | > 90 (Lighthouse) |

---

## 9. OUT OF SCOPE (v1)

- Real-time voting/counting feeds (requires official API access)
- Multi-language support (planned v2 — Hindi, Tamil, Telugu)
- Candidate comparison tool (v2)
- Voting simulation / civic education games (v3)

---

## 10. ASSUMPTIONS & CONSTRAINTS

- Primary focus: Indian elections (ECI framework)
- Data: Using publicly available ECI data + Gemini for reasoning
- Timeline: Must be demo-ready in competition window
- No backend required for MVP — all client-side + APIs

---

*Document prepared for PromptWars Challenge 2 submission*
