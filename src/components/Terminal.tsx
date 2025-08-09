import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
  input: string;
  output: string[];
  timestamp: Date;
}

interface TerminalProps {
  onNavigate: (section: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [theme, setTheme] = useState<'matrix' | 'cyber' | 'classic'>('matrix');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    '/help': () => [
      'Available commands:',
      '/about      - Navigate to about section',
      '/skills     - Navigate to skills section', 
      '/projects   - Navigate to projects section',
      '/contact    - Navigate to contact section',
      '/experience - Navigate to experience section',
      '/education  - Navigate to education section',
      '/clear      - Clear terminal',
      '/theme      - Switch terminal theme',
      '/matrix     - Enable matrix rain effect',
      '/whoami     - Display user info',
      '/pwd        - Show current section',
      '/ls         - List available sections'
    ],
    '/about': () => {
      onNavigate('about');
      return ['Navigating to About section...'];
    },
    '/skills': () => {
      onNavigate('skills');
      return ['Navigating to Skills section...'];
    },
    '/projects': () => {
      onNavigate('projects');
      return ['Navigating to Projects section...'];
    },
    '/contact': () => {
      onNavigate('contact');
      return ['Navigating to Contact section...'];
    },
    '/experience': () => {
      onNavigate('about');
      return ['Navigating to Experience section...'];
    },
    '/education': () => {
      onNavigate('about');
      return ['Navigating to Education section...'];
    },
    '/clear': () => {
      setHistory([]);
      return [];
    },
    '/theme': (args?: string) => {
      const newTheme = args?.toLowerCase();
      const validThemes = ['dark', 'light'];
      
      if (!newTheme) {
        const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
        return [`Current website theme: ${current}`, 'Usage: /theme [dark|light]'];
      }
      
      if (validThemes.includes(newTheme)) {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(newTheme);
        return [`Website theme changed to: ${newTheme}`];
      }
      
      return [`Invalid theme: ${newTheme}`, 'Available themes: dark, light'];
    },
    '/mode': (args?: string) => {
      const newMode = args?.toLowerCase();
      const themes: Array<'matrix' | 'cyber' | 'classic'> = ['matrix', 'cyber', 'classic'];
      
      if (!newMode) {
        return [`Current terminal mode: ${theme}`, 'Usage: /mode [matrix|cyber|classic]'];
      }
      
      if (themes.includes(newMode as any)) {
        setTheme(newMode as any);
        return [`Terminal mode switched to: ${newMode}`];
      }
      
      return [`Invalid mode: ${newMode}`, 'Available modes: matrix, cyber, classic'];
    },
    '/matrix': () => {
      // Trigger matrix effect
      document.body.classList.add('matrix-effect');
      setTimeout(() => document.body.classList.remove('matrix-effect'), 3000);
      return ['Matrix rain effect activated...', 'Wake up, Neo...'];
    },
    '/whoami': () => [
      'User: Preetham AK',
      'Role: Blockchain Developer & AI Engineer',
      'Location: Bangalore, India',
      'Education: B.Tech in AI & ML at REVA University',
      'Passion: Blockchain & Decentralized Systems'
    ],
    '/pwd': () => {
      const currentSection = window.location.hash || '/home';
      return [`Current section: ${currentSection}`];
    },
    '/ls': () => [
      'Available sections:',
      'hero/',
      'about/',
      'skills/',
      'projects/',
      'contact/'
    ]
  };

  const allCommands = Object.keys(commands);

  useEffect(() => {
    if (currentInput) {
      const filtered = allCommands.filter(cmd => 
        cmd.toLowerCase().includes(currentInput.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [currentInput]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim();
    const [commandName, ...args] = trimmedInput.split(' ');
    const command = commands[commandName as keyof typeof commands];
    
    let output: string[];
    if (command) {
      output = command(args.join(' '));
    } else if (trimmedInput === '') {
      output = [];
    } else {
      output = [
        `Command not found: ${commandName}`,
        'Type /help for available commands',
        'Did you mean one of these?',
        ...allCommands.slice(0, 3).map(cmd => `  ${cmd}`)
      ];
    }

    if (trimmedInput !== '/clear') {
      setHistory(prev => [...prev, {
        input: trimmedInput,
        output,
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = history.map(h => h.input).filter(Boolean);
      if (commands.length > 0) {
        const newIndex = historyIndex === -1 ? commands.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commands[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commands = history.map(h => h.input).filter(Boolean);
      if (historyIndex !== -1) {
        const newIndex = Math.min(commands.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commands[newIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setCurrentInput(suggestions[0]);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      setCurrentInput('');
    }
  };

  const themeClasses = {
    matrix: 'bg-black text-green-400 border-green-500',
    cyber: 'bg-slate-900 text-cyan-400 border-cyan-500', 
    classic: 'bg-amber-900 text-amber-300 border-amber-500'
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-green-400 p-3 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-green-500/50"
        title="Open Terminal"
      >
        <TerminalIcon className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed z-50 transition-all duration-300 shadow-2xl",
        isMinimized 
          ? "bottom-4 right-4 w-80 h-12" 
          : "bottom-4 right-4 w-96 h-80",
        themeClasses[theme]
      )}
      style={{ 
        borderRadius: '8px',
        border: '1px solid',
        fontFamily: 'Monaco, Consolas, "Courier New", monospace'
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-current">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-sm font-medium">preetham@portfolio:~$</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-current hover:bg-opacity-20 rounded"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-current hover:bg-opacity-20 rounded"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 p-2 overflow-y-auto text-sm space-y-1"
            style={{ height: 'calc(100% - 80px)' }}
          >
            {/* Welcome Message */}
            {history.length === 0 && (
              <div className="opacity-70">
                <div>Welcome to Preetham's Portfolio Terminal v1.0</div>
                <div>Type /help for available commands</div>
                <div className="text-xs mt-1">Tip: Use Tab for autocomplete, ↑↓ for history</div>
              </div>
            )}
            
            {/* Command History */}
            {history.map((cmd, index) => (
              <div key={index}>
                {cmd.input && (
                  <div className="flex items-center gap-1">
                    <span className="text-green-300">$</span>
                    <span>{cmd.input}</span>
                  </div>
                )}
                {cmd.output.map((line, i) => (
                  <div key={i} className="ml-2 opacity-90">{line}</div>
                ))}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-current p-2">
            {/* Suggestions */}
            {suggestions.length > 0 && currentInput && (
              <div className="text-xs opacity-60 mb-1">
                Suggestions: {suggestions.slice(0, 3).join(', ')}
              </div>
            )}
            
            {/* Input */}
            <div className="flex items-center gap-1">
              <span className="text-green-300">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-current placeholder-current placeholder-opacity-50"
                placeholder="Type a command..."
                autoComplete="off"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Terminal;