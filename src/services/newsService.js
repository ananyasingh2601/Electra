// src/services/newsService.js

const CUSTOM_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';

export class NewsService {
  constructor(apiKey, searchEngineId) {
    this.apiKey = apiKey;
    this.searchEngineId = searchEngineId;
  }

  async getElectionNews(query = 'India election 2024', num = 10) {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        cx: this.searchEngineId,
        q: query,
        num: Math.min(num, 10),
        dateRestrict: 'm1', // Last month
        sort: 'date'
      });

      const response = await fetch(`${CUSTOM_SEARCH_URL}?${params}`);
      if (!response.ok) throw new Error('News fetch failed');

      const data = await response.json();
      return (data.items || []).map(item => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link,
        source: item.displayLink,
        image: item.pagemap?.cse_image?.[0]?.src || null,
        date: item.snippet?.match(/\w+ \d+, \d{4}/)?.[0] || 'Recent'
      }));
    } catch (error) {
      console.error('News service error:', error);
      return this.getFallbackNews();
    }
  }

  getFallbackNews() {
    return [
      {
        title: 'Election Commission Prepares for Upcoming State Elections',
        snippet: 'The Election Commission of India has begun preparations for upcoming state assembly elections with a focus on ensuring free and fair polls.',
        link: 'https://eci.gov.in',
        source: 'eci.gov.in',
        image: null,
        date: 'Recent',
        isOfficial: true
      },
      {
        title: 'Voter Registration Drive Launched Across India',
        snippet: 'A nationwide voter registration drive aims to increase participation among first-time voters aged 18-25.',
        link: 'https://eci.gov.in',
        source: 'eci.gov.in',
        image: null,
        date: 'Recent',
        isOfficial: true
      },
      {
        title: 'ECI Updates Guidelines for Model Code of Conduct',
        snippet: 'The Election Commission has issued updated guidelines for the Model Code of Conduct applicable to all political parties.',
        link: 'https://eci.gov.in',
        source: 'eci.gov.in',
        image: null,
        date: 'Recent',
        isOfficial: true
      },
      {
        title: 'Digital Voting Awareness Campaign Kicks Off',
        snippet: 'A new digital campaign helps first-time voters understand the voting process, from registration to polling day.',
        link: 'https://eci.gov.in',
        source: 'eci.gov.in',
        image: null,
        date: 'Recent',
        isOfficial: true
      }
    ];
  }
}
