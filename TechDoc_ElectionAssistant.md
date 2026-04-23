# 🗳️ ELECTRA — Technical Documentation
**Challenge 2 | Virtual PromptWars**
**Version:** 1.0 | **Stack:** React + Vite + Gemini API + Google APIs

---

## 1. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                     ELECTRA CLIENT                      │
│                  (React + Vite SPA)                     │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │ Timeline │  │  Chat    │  │  Maps    │  │ News   │  │
│  │ Component│  │  Widget  │  │ Locator  │  │  Feed  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───┬────┘  │
│       │             │             │             │       │
│  ┌────▼─────────────▼─────────────▼─────────────▼────┐  │
│  │              API Service Layer                     │  │
│  │   (geminiService / googleCalendar / mapsService)   │  │
│  └────────────────────┬───────────────────────────────┘  │
└───────────────────────┼─────────────────────────────────┘
                        │ HTTPS
          ┌─────────────┼──────────────┐
          │             │              │
   ┌──────▼──────┐ ┌────▼────┐ ┌──────▼──────┐
   │ Gemini API  │ │ Google  │ │ Google Maps │
   │ (AI/Q&A)    │ │Calendar │ │ + Places    │
   └─────────────┘ └─────────┘ └─────────────┘
```

---

## 2. TECH STACK

| Layer | Technology | Reason |
|---|---|---|
| **Frontend Framework** | React 18 + Vite | Fast HMR, modern JSX |
| **Styling** | Tailwind CSS + custom CSS vars | Utility-first + design tokens |
| **Animation** | Framer Motion | Smooth timeline animations |
| **AI / Chat** | Google Gemini 1.5 Flash API | Fast, smart, Google-native |
| **Maps** | Google Maps JS API + Places | Polling booth locator |
| **Calendar** | Google Calendar API v3 | Date syncing |
| **Auth** | Google OAuth 2.0 (GIS) | Calendar/Sheets access |
| **News** | Google Custom Search API | Election news feed |
| **State Management** | Zustand | Lightweight, simple |
| **HTTP Client** | Native fetch / axios | API calls |
| **Build Tool** | Vite | Fast bundling |
| **Deployment** | Firebase Hosting | Google-native, free tier |

---

## 3. PROJECT STRUCTURE

```
electra/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── timeline/
│   │   │   ├── ElectionTimeline.jsx      # Main timeline component
│   │   │   ├── TimelineStage.jsx         # Individual stage card
│   │   │   ├── StageDetail.jsx           # Expanded stage detail panel
│   │   │   └── TimelineFilter.jsx        # Filter by election type
│   │   ├── chat/
│   │   │   ├── ChatWidget.jsx            # Main chat interface
│   │   │   ├── ChatMessage.jsx           # Message bubble
│   │   │   ├── SuggestionChips.jsx       # Quick reply buttons
│   │   │   └── TypingIndicator.jsx
│   │   ├── eligibility/
│   │   │   └── EligibilityChecker.jsx
│   │   ├── maps/
│   │   │   └── BoothLocator.jsx
│   │   ├── calendar/
│   │   │   └── CalendarSync.jsx
│   │   ├── news/
│   │   │   └── NewsFeed.jsx
│   │   └── ui/
│   │       ├── GlossaryTooltip.jsx
│   │       ├── CountrySelector.jsx
│   │       └── Button.jsx
│   ├── services/
│   │   ├── geminiService.js              # Gemini API wrapper
│   │   ├── calendarService.js            # Google Calendar API
│   │   ├── mapsService.js                # Google Maps
│   │   └── newsService.js                # Custom Search API
│   ├── data/
│   │   ├── electionStages.js             # Timeline stage definitions
│   │   ├── glossary.js                   # Election term definitions
│   │   └── electionDates.js              # India election calendar
│   ├── store/
│   │   └── useElectionStore.js           # Zustand global store
│   ├── hooks/
│   │   ├── useGeminiChat.js
│   │   └── useGoogleAuth.js
│   ├── utils/
│   │   └── dateUtils.js
│   ├── styles/
│   │   └── globals.css                   # Design tokens
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. CORE SERVICES

### 4.1 Gemini Service (`geminiService.js`)

```javascript
// src/services/geminiService.js

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `You are ELECTRA, an expert election process assistant focused on Indian elections (with knowledge of global elections too). You help citizens understand:
- The complete election lifecycle (announcement to results)
- Voter eligibility and registration
- Election Commission of India (ECI) rules
- Model Code of Conduct (MCC)
- Timeline of events (nomination, scrutiny, withdrawal, polling, counting)
- Voting rights and procedures

Always be:
- Clear and jargon-free (explain terms when used)
- Factual and cite official sources when possible
- Helpful for first-time voters
- Brief in first response, offer to elaborate

When answering, if relevant, mention which STAGE of the election process this relates to (use stage names from the timeline).`;

export class GeminiService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.conversationHistory = [];
  }

  async chat(userMessage, electionContext = {}) {
    const contextString = electionContext.selectedElection 
      ? `User is asking about: ${electionContext.selectedElection}` 
      : '';

    this.conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const requestBody = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT + '\n' + contextString }]
      },
      contents: this.conversationHistory,
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    };

    const response = await fetch(
      `${GEMINI_API_URL}?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    
    const data = await response.json();
    const assistantMessage = data.candidates[0].content.parts[0].text;
    
    // Add to history for context retention
    this.conversationHistory.push({
      role: 'model',
      parts: [{ text: assistantMessage }]
    });

    // Extract suggested follow-up questions
    const suggestions = await this.getSuggestions(userMessage, assistantMessage);
    
    return { text: assistantMessage, suggestions };
  }

  async getSuggestions(question, answer) {
    // Generate 3 smart follow-up questions based on context
    const prompt = `Based on this Q&A about elections:
Q: "${question}"
A: "${answer}"

Generate exactly 3 short follow-up questions a citizen might ask next.
Return ONLY a JSON array of strings, no other text.
Example: ["What documents do I need?", "Where do I register?", "What is the deadline?"]`;

    try {
      const resp = await fetch(`${GEMINI_API_URL}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 }
        })
      });
      const data = await resp.json();
      const text = data.candidates[0].content.parts[0].text;
      return JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
      return ['How do I register to vote?', 'When is the next election?', 'What is the MCC?'];
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}
```

### 4.2 Google Calendar Service (`calendarService.js`)

```javascript
// src/services/calendarService.js

export class CalendarService {
  constructor(accessToken) {
    this.accessToken = accessToken;
    this.baseUrl = 'https://www.googleapis.com/calendar/v3';
  }

  async addElectionEvent({ title, date, description, reminderDays = 7 }) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const event = {
      summary: `🗳️ ${title}`,
      description: `${description}\n\nAdded by ELECTRA — Your Election Intelligence Companion`,
      start: { date: startDate.toISOString().split('T')[0] },
      end: { date: endDate.toISOString().split('T')[0] },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: reminderDays * 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      },
      colorId: '11' // Tomato/red for election events
    };

    const response = await fetch(
      `${this.baseUrl}/calendars/primary/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    );

    if (!response.ok) throw new Error('Failed to add calendar event');
    return await response.json();
  }

  async addAllElectionDates(dates) {
    // Batch add multiple election milestone dates
    const results = await Promise.allSettled(
      dates.map(d => this.addElectionEvent(d))
    );
    return results;
  }
}
```

### 4.3 Election Data (`electionStages.js`)

```javascript
// src/data/electionStages.js

export const ELECTION_STAGES = [
  {
    id: 'announcement',
    label: 'Election Announcement',
    icon: '📢',
    color: '#4F46E5',
    phase: 'pre',
    duration: '1 day',
    description: 'The Election Commission of India (ECI) announces the election schedule, including dates for nomination, polling, and counting.',
    keyFacts: [
      'ECI issues Schedule of Elections',
      'Model Code of Conduct (MCC) comes into effect immediately',
      'Government machinery comes under ECI control'
    ],
    officialLink: 'https://eci.gov.in',
    calendarEvent: {
      title: 'Election Announcement',
      reminderDays: 0
    }
  },
  {
    id: 'mcc',
    label: 'MCC Activation',
    icon: '⚖️',
    color: '#7C3AED',
    phase: 'pre',
    duration: 'Until results',
    description: 'Model Code of Conduct activates. Political parties and candidates must follow strict guidelines on campaign conduct, use of government resources, and media.',
    keyFacts: [
      'No new government schemes can be announced',
      'No use of government vehicles for campaigning',
      'Election rallies require prior permission'
    ]
  },
  {
    id: 'nomination',
    label: 'Filing Nominations',
    icon: '📝',
    color: '#2563EB',
    phase: 'pre',
    duration: '7–14 days',
    description: 'Candidates file their nomination papers with the Returning Officer. Requires Form 2A, affidavit of criminal record, and security deposit.',
    keyFacts: [
      'Candidate must be 25+ years (Lok Sabha/Vidhan Sabha)',
      'Security deposit: ₹25,000 for general, ₹12,500 for SC/ST',
      'Criminal background disclosure is mandatory'
    ]
  },
  {
    id: 'scrutiny',
    label: 'Scrutiny of Nominations',
    icon: '🔍',
    color: '#0891B2',
    phase: 'pre',
    duration: '1 day',
    description: 'The Returning Officer scrutinizes all nomination papers for validity. Incomplete or invalid nominations are rejected.',
    keyFacts: [
      'Candidates can be present during scrutiny',
      'Objections to nominations can be raised',
      'Defects can be corrected before final decision'
    ]
  },
  {
    id: 'withdrawal',
    label: 'Withdrawal of Candidature',
    icon: '✋',
    color: '#0D9488',
    phase: 'pre',
    duration: '1 day',
    description: 'Candidates can withdraw their nomination within the stipulated time. After this date, the list of contesting candidates is final.',
    keyFacts: [
      'Last date for withdrawal: fixed in schedule',
      'Security deposit forfeited if less than 1/6th votes received',
      'Final candidate list published after this date'
    ]
  },
  {
    id: 'campaign',
    label: 'Election Campaign',
    icon: '📣',
    color: '#D97706',
    phase: 'campaign',
    duration: '14–21 days',
    description: 'Parties and candidates campaign through rallies, door-to-door visits, media advertisements, and social media. Campaign spending limits apply.',
    keyFacts: [
      'Expense limit: ₹95 lakh per candidate (Lok Sabha)',
      'Paid news prohibited',
      'Campaign ends 48 hours before polling (Silent Period)'
    ]
  },
  {
    id: 'silent',
    label: 'Silent Period',
    icon: '🤫',
    color: '#6B7280',
    phase: 'campaign',
    duration: '48 hours',
    description: '48 hours before polling day, all active campaigning must stop. No rallies, no media ads, no social media campaigning.',
    keyFacts: [
      'Also called "campaign blackout period"',
      'Exit polls are also prohibited',
      'Violations can lead to candidate disqualification'
    ]
  },
  {
    id: 'polling',
    label: 'Polling Day',
    icon: '🗳️',
    color: '#DC2626',
    phase: 'voting',
    duration: '1 day (7am–6pm)',
    description: 'Eligible voters cast their vote using Electronic Voting Machines (EVMs) at designated polling booths. VVPAT slips are generated for verification.',
    keyFacts: [
      'Voter ID or approved ID required',
      'Indelible ink applied to left index finger',
      'NOTA (None of the Above) option available',
      'Voting hours: typically 7 AM to 6 PM'
    ]
  },
  {
    id: 'counting',
    label: 'Vote Counting',
    icon: '🔢',
    color: '#7C3AED',
    phase: 'post',
    duration: '1 day',
    description: 'Votes are counted at Counting Centres under strict ECI supervision. First Postal Ballots are counted, then EVM votes by round.',
    keyFacts: [
      'Postal ballots counted first',
      'Media can report trends (not official results)',
      'Winning candidate receives "Election Certificate"'
    ]
  },
  {
    id: 'results',
    label: 'Results & Formation',
    icon: '🏆',
    color: '#16A34A',
    phase: 'post',
    duration: '2–4 weeks',
    description: 'Official results declared. Winning candidates take oath. Government formation begins (if general election). New government sworn in.',
    keyFacts: [
      'ECI certifies election results',
      'Caretaker government until new one formed',
      'President invites majority party/coalition to form government'
    ]
  }
];

export const ELECTION_TYPES = [
  { id: 'lok-sabha', label: 'Lok Sabha (General)', frequency: 'Every 5 years', seats: 543 },
  { id: 'vidhan-sabha', label: 'Vidhan Sabha (State)', frequency: 'Every 5 years', seats: 'Varies by state' },
  { id: 'rajya-sabha', label: 'Rajya Sabha', frequency: 'Biennial (1/3rd seats)', seats: 245 },
  { id: 'municipal', label: 'Municipal / Local Body', frequency: 'Every 5 years', seats: 'Varies' },
  { id: 'by-election', label: 'By-Election', frequency: 'As needed', seats: 'Single constituency' }
];
```

---

## 5. KEY COMPONENT: ElectionTimeline.jsx

```jsx
// src/components/timeline/ElectionTimeline.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ELECTION_STAGES } from '../../data/electionStages';
import TimelineStage from './TimelineStage';
import StageDetail from './StageDetail';

export default function ElectionTimeline({ onStageSelect }) {
  const [activeStage, setActiveStage] = useState(null);
  const [filter, setFilter] = useState('all');

  const phases = ['all', 'pre', 'campaign', 'voting', 'post'];
  const filteredStages = filter === 'all' 
    ? ELECTION_STAGES 
    : ELECTION_STAGES.filter(s => s.phase === filter);

  return (
    <div className="timeline-container">
      {/* Phase filter pills */}
      <div className="phase-filters">
        {phases.map(phase => (
          <button
            key={phase}
            onClick={() => setFilter(phase)}
            className={`phase-pill ${filter === phase ? 'active' : ''}`}
          >
            {phase === 'all' ? 'All Phases' : phase.charAt(0).toUpperCase() + phase.slice(1)}
          </button>
        ))}
      </div>

      {/* Timeline track */}
      <div className="timeline-track">
        {/* Connecting line */}
        <div className="timeline-line" />
        
        {filteredStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <TimelineStage
              stage={stage}
              isActive={activeStage?.id === stage.id}
              index={index}
              onClick={() => {
                setActiveStage(activeStage?.id === stage.id ? null : stage);
                onStageSelect?.(stage);
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Stage detail panel */}
      <AnimatePresence>
        {activeStage && (
          <StageDetail
            stage={activeStage}
            onClose={() => setActiveStage(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

## 6. ENVIRONMENT VARIABLES

```env
# .env.local (never commit to git)

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Google APIs
VITE_GOOGLE_CLIENT_ID=your_oauth_client_id.apps.googleusercontent.com
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key
VITE_GOOGLE_CUSTOM_SEARCH_API_KEY=your_search_api_key
VITE_GOOGLE_CUSTOM_SEARCH_ENGINE_ID=your_search_engine_id

# Firebase (optional for deployment)
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
```

---

## 7. API KEYS SETUP (Step by Step)

### Gemini API
1. Go to: https://aistudio.google.com/app/apikey
2. Create new API key
3. Enable "Generative Language API" in Google Cloud Console

### Google Calendar API
1. Google Cloud Console → Enable "Google Calendar API"
2. Create OAuth 2.0 credentials (Web Application)
3. Add localhost:5173 to authorized origins
4. Add authorized redirect URIs

### Google Maps API
1. Google Cloud Console → Enable "Maps JavaScript API" + "Places API"
2. Create API key → Restrict to your domain

### Custom Search (News)
1. https://programmablesearchengine.google.com → Create engine
2. Set to search election/news sites
3. Get API key from Google Cloud Console

---

## 8. DEPLOYMENT

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Build the project
npm run build

# Initialize Firebase
firebase init hosting
# → Select dist as public directory
# → Configure as single-page app: yes

# Deploy
firebase deploy
```

### Environment Variables in Production
Set via Firebase Console → Project Settings → or use `.env.production`

---

## 9. PACKAGE.JSON

```json
{
  "name": "electra",
  "version": "1.0.0",
  "description": "AI-powered election process assistant",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "@react-google-maps/api": "^2.19.2"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 10. SECURITY NOTES

- Never expose API keys in client-side code for production — use a backend proxy
- For demo/competition: restrict API keys by domain in Google Cloud Console
- Gemini API key: restrict to specific APIs only
- Store sensitive tokens in httpOnly cookies (production)

---

*Technical documentation prepared for PromptWars Challenge 2 — ELECTRA v1.0*
