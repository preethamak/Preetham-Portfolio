import { createContext, useContext, useState } from 'react';

interface TerminalContextType {
  isTerminalOpen: boolean;
  setIsTerminalOpen: (open: boolean) => void;
  navigateToSection: (section: string) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const navigateToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL hash
      window.history.pushState(null, '', `#${section}`);
    }
  };

  return (
    <TerminalContext.Provider value={{
      isTerminalOpen,
      setIsTerminalOpen,
      navigateToSection
    }}>
      {children}
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
};