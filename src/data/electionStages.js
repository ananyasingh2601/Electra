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

export const PHASE_COLORS = {
  pre: { bg: 'from-indigo-500/20 to-purple-500/20', text: 'text-indigo-300', label: 'Pre-Election' },
  campaign: { bg: 'from-amber-500/20 to-orange-500/20', text: 'text-amber-300', label: 'Campaign' },
  voting: { bg: 'from-red-500/20 to-rose-500/20', text: 'text-red-300', label: 'Voting' },
  post: { bg: 'from-emerald-500/20 to-green-500/20', text: 'text-emerald-300', label: 'Post-Election' }
};
