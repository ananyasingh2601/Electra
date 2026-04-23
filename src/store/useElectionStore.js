// src/store/useElectionStore.js
import { create } from 'zustand';

const useElectionStore = create((set, get) => ({
  // Election selection
  selectedCountry: 'india',
  selectedState: '',
  selectedElectionType: 'lok-sabha',
  
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

  // Actions
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedElectionType: (type) => set({ selectedElectionType: type }),
  
  setActiveStage: (stage) => set({ activeStage: stage }),
  setTimelineFilter: (filter) => set({ timelineFilter: filter }),
  
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message]
  })),
  setChatOpen: (open) => set({ chatOpen: open }),
  setIsTyping: (typing) => set({ isTyping: typing }),
  clearChat: () => set({ chatMessages: [] }),
  
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveSection: (section) => set({ activeSection: section }),
}));

export default useElectionStore;
