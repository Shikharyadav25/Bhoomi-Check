import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, ScreenName, SessionState, UserMode } from '../types/models';
import { Strings } from '../i18n/strings';

interface SessionContextType {
  session: SessionState;
  currentScreen: ScreenName;
  activeKhasra: string;
  setMode: (mode: UserMode) => void;
  setLocation: (district: string, tehsil: string) => void;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  navigate: (screen: ScreenName, params?: { khasraNo?: string }) => void;
  goBack: () => void;
  t: (key: keyof typeof Strings.en) => string;
}

const defaultSession: SessionState = {
  mode: 'BUYER',
  state: 'Uttar Pradesh',
  district: 'Lucknow',
  tehsil: 'Sarojini Nagar',
  language: 'en',
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SessionState>(defaultSession);
  const [navigationStack, setNavigationStack] = useState<ScreenName[]>(['Landing']);
  const [activeKhasra, setActiveKhasra] = useState<string>('248/2');

  const currentScreen = navigationStack[navigationStack.length - 1];

  const setMode = (mode: UserMode) => {
    setSession((prev) => ({ ...prev, mode }));
  };

  const setLocation = (district: string, tehsil: string) => {
    setSession((prev) => ({ ...prev, district, tehsil }));
  };

  const setLanguage = (language: Language) => {
    setSession((prev) => ({ ...prev, language }));
  };

  const toggleLanguage = () => {
    setSession((prev) => ({
      ...prev,
      language: prev.language === 'en' ? 'hi' : 'en',
    }));
  };

  const navigate = (screen: ScreenName, params?: { khasraNo?: string }) => {
    if (params?.khasraNo) {
      setActiveKhasra(params.khasraNo);
    }
    setNavigationStack((prev) => [...prev, screen]);
  };

  const goBack = () => {
    if (navigationStack.length > 1) {
      setNavigationStack((prev) => prev.slice(0, -1));
    }
  };

  const t = (key: keyof typeof Strings.en): string => {
    const dict = Strings[session.language] || Strings.en;
    return (dict as Record<string, string>)[key] || Strings.en[key] || '';
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        currentScreen,
        activeKhasra,
        setMode,
        setLocation,
        setLanguage,
        toggleLanguage,
        navigate,
        goBack,
        t,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
