// src/data/electionDates.js

// Sample election dates for India (can be updated with real data)
export const ELECTION_DATES = {
  'lok-sabha-2024': {
    type: 'Lok Sabha General Election 2024',
    dates: [
      { title: 'Election Announcement', date: '2024-03-16', description: 'ECI announces 7-phase polling schedule' },
      { title: 'MCC Comes Into Effect', date: '2024-03-16', description: 'Model Code of Conduct activated immediately' },
      { title: 'Phase 1 - Nomination Start', date: '2024-03-20', description: 'Nominations open for Phase 1 constituencies' },
      { title: 'Phase 1 - Polling', date: '2024-04-19', description: '102 constituencies across 21 states vote' },
      { title: 'Phase 2 - Polling', date: '2024-04-26', description: '89 constituencies vote' },
      { title: 'Phase 3 - Polling', date: '2024-05-07', description: '94 constituencies vote' },
      { title: 'Phase 4 - Polling', date: '2024-05-13', description: '96 constituencies vote' },
      { title: 'Phase 5 - Polling', date: '2024-05-20', description: '49 constituencies vote' },
      { title: 'Phase 6 - Polling', date: '2024-05-25', description: '58 constituencies vote' },
      { title: 'Phase 7 - Polling', date: '2024-06-01', description: '57 constituencies vote' },
      { title: 'Vote Counting', date: '2024-06-04', description: 'All votes counted simultaneously' },
      { title: 'Results Declaration', date: '2024-06-04', description: 'Official results announced by ECI' },
    ]
  },
  'upcoming': {
    type: 'Upcoming Elections (2025-2026)',
    dates: [
      { title: 'Delhi Assembly Elections', date: '2025-02-05', description: 'Delhi Vidhan Sabha election' },
      { title: 'Bihar Assembly Elections', date: '2025-11-01', description: 'Bihar Vidhan Sabha election (tentative)' },
      { title: 'West Bengal Municipal', date: '2025-06-15', description: 'Municipal corporation elections (tentative)' },
    ]
  }
};

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi (NCT)', 'Jammu & Kashmir', 'Puducherry'
];

export const COUNTRIES = [
  { id: 'india', name: 'India', flag: '🇮🇳', states: INDIAN_STATES },
  { id: 'us', name: 'United States', flag: '🇺🇸', states: [] },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', states: [] },
];
