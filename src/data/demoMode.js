// src/data/demoMode.js

const DEMO_SOURCE = 'https://eci.gov.in';

const DEMO_QA = {
  'what is the model code of conduct': {
    text: 'The **Model Code of Conduct (MCC)** is the Election Commission of India\'s rulebook for political parties, candidates, and governments during elections. It is designed to keep the contest fair and prevent the use of official power for electoral advantage.\n\nIn practice, that means no caste or religion-based appeals, no misuse of government machinery, no partisan advertising at public expense, and no fresh announcements that could influence voters.\n\n📎 Source: eci.gov.in',
    suggestions: ['When does it come into effect?', 'Can the government announce new schemes during elections?', 'What happens if the MCC is violated?'],
  },
  'when does it come into effect': {
    text: 'The MCC comes into force **immediately** when the Election Commission announces the election schedule. For the 2024 Lok Sabha election, that happened on **16 March 2024**, and the MCC applied from that moment until the results were declared on **4 June 2024**.\n\nThat timing is important: it starts on announcement day, not on polling day.\n\n📎 Source: eci.gov.in',
    suggestions: ['Can the government announce new schemes during elections?', 'How long does the MCC last?', 'What happens if the MCC is violated?'],
  },
  'can the government announce new schemes during elections': {
    text: '**No.** Once the MCC is in force, the government should avoid announcing new welfare schemes, foundation stones, grants, or other measures that could sway voters. Routine administration can continue, but anything that looks like an election-time advantage is off-limits.\n\nThe ECI\'s goal is to keep the playing field level and stop the use of public resources for campaigning.\n\n📎 Source: eci.gov.in',
    suggestions: ['What happens if the MCC is violated?', 'Is the MCC legally binding?', 'How does ECI monitor violations?'],
  },
  'what happens if the mcc is violated': {
    text: 'The ECI can respond quickly to MCC violations. Depending on the issue, it can issue a notice, seek an explanation, order the removal of offending content, transfer officials, censure a party or candidate, or refer the matter for criminal action if another law has also been broken.\n\nThe MCC itself is not a statute, but the Commission\'s constitutional authority gives it real practical force.\n\n📎 Source: eci.gov.in',
    suggestions: ['How long does the MCC last?', 'What is the Silent Period?', 'How do I report a violation?'],
  },
  'how long does the mcc last': {
    text: 'The MCC lasts from the day the election is announced until the election process is completed and results are declared. For the 2024 Lok Sabha election, that was roughly **80 days**: from **16 March 2024** to **4 June 2024**.\n\nIn multi-phase elections, the MCC stays in force across all phases until the very end, even in constituencies that have already voted.\n\n📎 Source: eci.gov.in',
    suggestions: ['What is the Silent Period?', 'How do I register to vote?', 'What is NOTA?'],
  },
};

const buildTimestamp = (minuteOffset) => new Date(Date.UTC(2024, 2, 16, 9, minuteOffset)).toISOString();

export const DEMO_ELECTION = {
  selectedCountry: 'india',
  selectedState: '',
  selectedElectionType: 'lok-sabha',
  selectedElectionLabel: 'Lok Sabha General Election 2024',
};

export const DEMO_CHAT = [
  { id: 1001, role: 'user', text: 'What is the Model Code of Conduct?', timestamp: buildTimestamp(0) },
  { id: 1002, role: 'assistant', text: DEMO_QA['what is the model code of conduct'].text, suggestions: DEMO_QA['what is the model code of conduct'].suggestions, timestamp: buildTimestamp(1) },
  { id: 1003, role: 'user', text: 'When does it come into effect?', timestamp: buildTimestamp(2) },
  { id: 1004, role: 'assistant', text: DEMO_QA['when does it come into effect'].text, suggestions: DEMO_QA['when does it come into effect'].suggestions, timestamp: buildTimestamp(3) },
  { id: 1005, role: 'user', text: 'Can the government announce new schemes during elections?', timestamp: buildTimestamp(4) },
  { id: 1006, role: 'assistant', text: DEMO_QA['can the government announce new schemes during elections'].text, suggestions: DEMO_QA['can the government announce new schemes during elections'].suggestions, timestamp: buildTimestamp(5) },
  { id: 1007, role: 'user', text: 'What happens if the MCC is violated?', timestamp: buildTimestamp(6) },
  { id: 1008, role: 'assistant', text: DEMO_QA['what happens if the mcc is violated'].text, suggestions: DEMO_QA['what happens if the mcc is violated'].suggestions, timestamp: buildTimestamp(7) },
  { id: 1009, role: 'user', text: 'How long does the MCC last?', timestamp: buildTimestamp(8) },
  { id: 1010, role: 'assistant', text: DEMO_QA['how long does the mcc last'].text, suggestions: DEMO_QA['how long does the mcc last'].suggestions, timestamp: buildTimestamp(9) },
];

export const DEMO_NEWS = [
  {
    title: 'ECI Issues Final Advisory on MCC Compliance Ahead of Polling Phases',
    snippet: 'The Election Commission reminded parties and officials that all welfare announcements, transfers, and public advertisements remain restricted under the Model Code of Conduct.',
    link: DEMO_SOURCE,
    source: 'eci.gov.in',
    date: '3 hours ago',
    isOfficial: true,
  },
  {
    title: 'Lok Sabha Campaign Focus Shifts to Voter Turnout in Key Urban Seats',
    snippet: 'Campaigns in several metropolitan constituencies are now centred on turnout, youth participation, and polling-day facilitation measures.',
    link: 'https://reuters.com',
    source: 'reuters.com',
    date: '6 hours ago',
    isOfficial: false,
  },
  {
    title: 'ECI Expands Voter Assistance Measures for First-Time Electors',
    snippet: 'A special enrollment and awareness drive has been launched to help young voters verify details, locate booths, and understand polling procedures.',
    link: DEMO_SOURCE,
    source: 'eci.gov.in',
    date: '1 day ago',
    isOfficial: true,
  },
  {
    title: 'Supreme Court Reaffirms ECI\'s Authority to Enforce Election Guidelines',
    snippet: 'The court noted that the Commission retains wide discretion to act when conduct during elections threatens the fairness of the process.',
    link: 'https://thehindu.com',
    source: 'thehindu.com',
    date: '1 day ago',
    isOfficial: false,
  },
  {
    title: 'Polling-Day Logistics Tightened as Phase-Wise Voting Approaches',
    snippet: 'Authorities have increased booth-level readiness, transport coordination, and voter information campaigns ahead of the next phase.',
    link: 'https://indianexpress.com',
    source: 'indianexpress.com',
    date: '2 days ago',
    isOfficial: false,
  },
  {
    title: 'Digital Voter ID and EPIC Verification Tools See Wider Adoption',
    snippet: 'Officials say digital identity tools are helping reduce friction at polling stations while keeping verification compliant with ECI rules.',
    link: DEMO_SOURCE,
    source: 'eci.gov.in',
    date: '2 days ago',
    isOfficial: true,
  },
];

export const DEMO_ELIGIBILITY = {
  step: 3,
  election: 'lok-sabha',
  age: 26,
  citizen: true,
  registered: true,
};

export const DEMO_CALENDAR_SYNC = {
  reminder: '1d',
  syncedIds: ['registration', 'nomination', 'polling', 'counting', 'results'],
};

export function getDemoChatReply(message) {
  const normalized = message.toLowerCase().replace(/[?!.:,']/g, '').replace(/\s+/g, ' ').trim();
  if (!normalized) return null;
  if (normalized in DEMO_QA) return DEMO_QA[normalized];
  if (normalized.includes('model code of conduct')) return DEMO_QA['what is the model code of conduct'];
  if (normalized.includes('come into effect')) return DEMO_QA['when does it come into effect'];
  if (normalized.includes('new schemes') || normalized.includes('announce new schemes')) return DEMO_QA['can the government announce new schemes during elections'];
  if (normalized.includes('violated')) return DEMO_QA['what happens if the mcc is violated'];
  if (normalized.includes('how long') && normalized.includes('mcc')) return DEMO_QA['how long does the mcc last'];
  return {
    text: 'I can help with the election schedule, MCC rules, voter eligibility, booth lookup, and calendar sync. Try asking about the Model Code of Conduct or the Lok Sabha 2024 timeline.\n\n📎 Source: eci.gov.in',
    suggestions: ['What is the Model Code of Conduct?', 'When does it come into effect?', 'How long does the MCC last?'],
  };
}
