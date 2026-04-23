// src/data/glossary.js

export const GLOSSARY = {
  'MCC': {
    term: 'Model Code of Conduct',
    definition: 'A set of guidelines issued by the Election Commission of India for political parties and candidates during elections. It comes into force from the date of announcement of elections and remains in force till the completion of the election process.',
    relatedStage: 'mcc'
  },
  'EVM': {
    term: 'Electronic Voting Machine',
    definition: 'A portable electronic device used for recording votes in Indian elections. It consists of two units — Control Unit and Ballot Unit — and is designed to be tamper-proof.',
    relatedStage: 'polling'
  },
  'VVPAT': {
    term: 'Voter Verifiable Paper Audit Trail',
    definition: 'A method that provides feedback to voters by displaying a slip with the name and symbol of the candidate they voted for. The slip is visible for 7 seconds before being cut and dropped into a sealed box.',
    relatedStage: 'polling'
  },
  'NOTA': {
    term: 'None of the Above',
    definition: 'An option on the EVM ballot that allows voters to officially cast their vote for no candidate. It was introduced by the Supreme Court of India in 2013 for all elections.',
    relatedStage: 'polling'
  },
  'ECI': {
    term: 'Election Commission of India',
    definition: 'An autonomous constitutional authority responsible for administering Union and State election processes in India. It was established on 25 January 1950.',
    relatedStage: 'announcement'
  },
  'Lok Sabha': {
    term: 'Lok Sabha (House of the People)',
    definition: 'The lower house of India\'s bicameral Parliament. It has a maximum of 552 members who are directly elected by the people of India. Members serve 5-year terms.',
    relatedStage: null
  },
  'Vidhan Sabha': {
    term: 'Vidhan Sabha (State Legislative Assembly)',
    definition: 'The lower house of the state legislature in each state of India. Members are directly elected from territorial constituencies. The number of seats varies by state.',
    relatedStage: null
  },
  'Rajya Sabha': {
    term: 'Rajya Sabha (Council of States)',
    definition: 'The upper house of India\'s Parliament. Members are elected indirectly by state and union territory legislatures. One-third of members retire every two years.',
    relatedStage: null
  },
  'Returning Officer': {
    term: 'Returning Officer',
    definition: 'An officer appointed by the ECI to conduct elections in a constituency. They are responsible for accepting nominations, ensuring fair polling, and declaring results.',
    relatedStage: 'nomination'
  },
  'Security Deposit': {
    term: 'Security Deposit',
    definition: 'A refundable deposit that candidates must pay when filing nominations. For Lok Sabha: ₹25,000 (general) and ₹12,500 (SC/ST). Forfeited if candidate gets less than 1/6th of total votes.',
    relatedStage: 'nomination'
  },
  'Silent Period': {
    term: 'Silent Period / Campaign Blackout',
    definition: 'A 48-hour period before polling day during which all active campaigning must stop. No rallies, media ads, or social media campaigning is allowed.',
    relatedStage: 'silent'
  },
  'Postal Ballot': {
    term: 'Postal Ballot',
    definition: 'A method by which voters can cast their vote by post instead of visiting a polling station. Available to service voters, absentee voters (senior citizens, PwD), and election duty staff.',
    relatedStage: 'counting'
  },
  'Form 2A': {
    term: 'Form 2A',
    definition: 'The nomination form that candidates must fill out to contest elections. It includes personal details, affidavit of criminal record, assets/liabilities, and educational qualifications.',
    relatedStage: 'nomination'
  },
  'Indelible Ink': {
    term: 'Indelible Ink',
    definition: 'A semi-permanent ink applied to the left index finger of voters after they have cast their vote. It prevents double voting and is manufactured by Mysore Paints & Varnish Ltd.',
    relatedStage: 'polling'
  }
};

// Get all glossary terms for tooltip matching
export const GLOSSARY_TERMS = Object.keys(GLOSSARY);

// Function to find glossary terms in text
export function findGlossaryTerms(text) {
  const found = [];
  for (const term of GLOSSARY_TERMS) {
    if (text.toLowerCase().includes(term.toLowerCase())) {
      found.push({ term, ...GLOSSARY[term] });
    }
  }
  return found;
}
