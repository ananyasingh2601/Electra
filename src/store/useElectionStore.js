// src/store/useElectionStore.js
import { create } from 'zustand';
import { DEMO_CALENDAR_SYNC, DEMO_CHAT, DEMO_ELECTION, DEMO_ELIGIBILITY, DEMO_NEWS } from '../data/demoMode';

const CHAT_STORAGE_KEY = 'electra_chat_history';

function persistChat(messages) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
}

function clearChatStorage() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(CHAT_STORAGE_KEY);
}

const useElectionStore = create((set, get) => ({
  // Election selection
  selectedCountry: 'india',
  selectedState: '',
  selectedElectionType: 'lok-sabha',
  selectedElectionLabel: '',
  isDemoMode: false,
  
  // Timeline
  activeStage: null,
  timelineFilter: 'all',
  
  // Chat
  chatMessages: [],
  chatOpen: false,
  isTyping: false,
  
  // Auth
  user: null,
  accessToken: null,
  isAuthenticated: false,
  
  // UI
  sidebarOpen: false,
  activeSection: 'hero',
  demoNews: [],
  demoEligibility: null,
  demoCalendarSync: { reminder: '1d', syncedIds: [] },

  // Actions
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedElectionType: (type) => set({ selectedElectionType: type }),
  setSelectedElectionLabel: (label) => set({ selectedElectionLabel: label }),
  enableDemoMode: () => {
    set({
      isDemoMode: true,
      selectedCountry: DEMO_ELECTION.selectedCountry,
      selectedState: DEMO_ELECTION.selectedState,
      selectedElectionType: DEMO_ELECTION.selectedElectionType,
      selectedElectionLabel: DEMO_ELECTION.selectedElectionLabel,
      activeStage: null,
      timelineFilter: 'all',
      chatMessages: DEMO_CHAT,
      chatOpen: true,
      isTyping: false,
      demoNews: DEMO_NEWS,
      demoEligibility: DEMO_ELIGIBILITY,
      demoCalendarSync: DEMO_CALENDAR_SYNC,
      activeSection: 'hero',
      sidebarOpen: false,
    });
    persistChat(DEMO_CHAT);
  },
  disableDemoMode: () => {
    clearChatStorage();
    set({
      isDemoMode: false,
      selectedCountry: 'india',
      selectedState: '',
      selectedElectionType: 'lok-sabha',
      selectedElectionLabel: '',
      activeStage: null,
      timelineFilter: 'all',
      chatMessages: [],
      chatOpen: false,
      isTyping: false,
      demoNews: [],
      demoEligibility: null,
      demoCalendarSync: { reminder: '1d', syncedIds: [] },
      activeSection: 'hero',
      sidebarOpen: false,
    });
  },
  
  setActiveStage: (stage) => set({ activeStage: stage }),
  setTimelineFilter: (filter) => set({ timelineFilter: filter }),
  
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message]
  })),
  setChatOpen: (open) => set({ chatOpen: open }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  clearChat: () => {
    clearChatStorage();
    set({ chatMessages: [] });
  },
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
}));

export default useElectionStore;
