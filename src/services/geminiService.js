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
