// src/hooks/useGeminiChat.js
import { useState, useCallback, useRef } from 'react';
import { GeminiService } from '../services/geminiService';
import useElectionStore from '../store/useElectionStore';
import { getDemoChatReply } from '../data/demoMode';

export function useGeminiChat() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const geminiRef = useRef(null);
  
  const { addChatMessage, setIsTyping, selectedElectionType, isDemoMode } = useElectionStore();

  const getService = useCallback(() => {
    if (!geminiRef.current) {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        return null;
      }
      geminiRef.current = new GeminiService(apiKey);
    }
    return geminiRef.current;
  }, []);

  const addFallbackAnswer = useCallback((userMessage) => {
    const demoResponses = {
      default: "Welcome to ELECTRA! 🗳️ I'm your election intelligence companion. I can help you understand the Indian election process, check your voter eligibility, and learn about key election dates.\n\nTo enable live AI responses, please add your Gemini API key to the `.env.local` file.\n\nIn the meantime, explore the interactive timeline above to learn about each stage of the election process!",
      eligibility: "To vote in Indian elections, you must:\n\n1. **Be an Indian citizen**\n2. **Be 18+ years old** on the qualifying date\n3. **Be a resident** of the constituency\n4. **Not be disqualified** under any law\n\nYou can register online at https://voters.eci.gov.in or through Form 6.",
      mcc: "The **Model Code of Conduct (MCC)** is a set of guidelines issued by the Election Commission of India that comes into effect the moment elections are announced.\n\nKey rules:\n- No new government schemes or projects\n- No use of government resources for campaigning\n- No appeals to caste or religion\n- Prior permission needed for rallies",
      register: "To register as a voter in India:\n\n1. Visit **https://voters.eci.gov.in**\n2. Fill **Form 6** (new registration)\n3. Upload required documents (ID proof, address proof, photo)\n4. Submit and track your application\n\nYou can also visit your nearest voter registration center."
    };

    let responseText = demoResponses.default;
    const lowerMsg = userMessage.toLowerCase();
    if (lowerMsg.includes('eligible') || lowerMsg.includes('vote') || lowerMsg.includes('who can')) {
      responseText = demoResponses.eligibility;
    } else if (lowerMsg.includes('mcc') || lowerMsg.includes('code of conduct')) {
      responseText = demoResponses.mcc;
    } else if (lowerMsg.includes('register') || lowerMsg.includes('sign up') || lowerMsg.includes('enroll')) {
      responseText = demoResponses.register;
    }

    addChatMessage({
      id: Date.now() + 1,
      role: 'assistant',
      text: responseText,
      suggestions: ['How do I register to vote?', 'When is the next election?', 'What is the MCC?'],
      timestamp: new Date().toISOString()
    });
  }, [addChatMessage]);

  const sendMessage = useCallback(async (userMessage) => {
    setError(null);
    setIsLoading(true);
    setIsTyping(true);

    // Add user message immediately
    addChatMessage({
      id: Date.now(),
      role: 'user',
      text: userMessage,
      timestamp: new Date().toISOString()
    });

    if (isDemoMode) {
      const demoReply = getDemoChatReply(userMessage) || {
        text: "I can help with the election schedule, MCC rules, voter eligibility, booth lookup, and calendar sync. Try asking about the Model Code of Conduct or the Lok Sabha 2024 timeline.\n\n📎 Source: eci.gov.in",
        suggestions: ['What is the Model Code of Conduct?', 'When does it come into effect?', 'How long does the MCC last?'],
      };

      setTimeout(() => {
        addChatMessage({
          id: Date.now() + 1,
          role: 'assistant',
          text: demoReply.text,
          suggestions: demoReply.suggestions,
          timestamp: new Date().toISOString()
        });
        setIsLoading(false);
        setIsTyping(false);
      }, 250);
      return;
    }

    const service = getService();

    if (!service) {
      setTimeout(() => {
        addFallbackAnswer(userMessage);
        setIsLoading(false);
        setIsTyping(false);
      }, 1200);
      return;
    }

    try {
      const response = await service.chat(userMessage, {
        selectedElection: selectedElectionType
      });

      addChatMessage({
        id: Date.now() + 1,
        role: 'assistant',
        text: response.text,
        suggestions: response.suggestions,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError(err.message);
      addFallbackAnswer(userMessage);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [getService, addChatMessage, setIsTyping, selectedElectionType, isDemoMode]);

  const clearChat = useCallback(() => {
    const service = getService();
    if (service) service.clearHistory();
    useElectionStore.getState().clearChat();
  }, [getService]);

  return { sendMessage, clearChat, isLoading, error };
}
