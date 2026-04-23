// src/hooks/useGoogleAuth.js
import { useState, useCallback, useEffect } from 'react';
import useElectionStore from '../store/useElectionStore';

export function useGoogleAuth() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { setUser, setAccessToken, isAuthenticated } = useElectionStore();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || clientId.includes('your_oauth')) return;

    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setIsInitialized(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId]);

  const signIn = useCallback(() => {
    if (!isInitialized || !window.google) {
      console.warn('Google Identity Services not loaded');
      return;
    }

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile',
      callback: (response) => {
        if (response.access_token) {
          setAccessToken(response.access_token);
          // Get user info
          fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${response.access_token}` }
          })
            .then(r => r.json())
            .then(user => setUser(user))
            .catch(console.error);
        }
      }
    });

    tokenClient.requestAccessToken();
  }, [isInitialized, clientId, setAccessToken, setUser]);

  const signOut = useCallback(() => {
    useElectionStore.getState().logout();
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  }, []);

  return { signIn, signOut, isInitialized, isAuthenticated };
}
