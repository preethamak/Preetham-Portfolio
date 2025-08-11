import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useComments } from '@/hooks/useComments';

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
  const [theme, setTheme] = useState<'matrix' | 'cyber' | 'classic' | 'hacker' | 'neon'>('matrix');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('admin-auth') === '1');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragData = useRef<{ offsetX: number; offsetY: number } | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getComments, deleteComment, clearComments } = useComments();

  // Apply default site theme on mount if set
  useEffect(() => {
    const def = localStorage.getItem('default-theme');
    if (def) {
      const root = document.documentElement;
      root.classList.remove('light', 'dark', 'hacker', 'neon', 'cosmic');
      root.classList.add(def);
    }
  }, []);

  // Persist admin session
  useEffect(() => {
    localStorage.setItem('admin-auth', isAdmin ? '1' : '0');
  }, [isAdmin]);

  const commands = {
    '/help': () => [
      'Available commands:',
      '/about           - Navigate to about section',
      '/skills          - Navigate to skills section', 
      '/projects        - Navigate to projects section',
      '/contact         - Navigate to contact section',
      '/clear           - Clear terminal',
      '/themes          - Show available website themes',
      '/theme <name>    - Switch website theme',
      '/mode <name>     - Switch terminal mode',
      '/matrix          - Matrix rain effect',
      '/social          - Show social links commands',
      '/github          - Open GitHub profile',
      '/linkedin        - Open LinkedIn profile',
      '/email           - Open Gmail compose',
      '/comment         - Add a new comment',
      '/comments        - View comments gallery (if any)',
      '/deletecomment <id> - Delete comment by id',
      '/clearcomments   - Remove all comments',
      '/ascii           - Show AK ASCII art',
      '/guess [n]       - Start/guess number game',
    ],
    '/about': () => { onNavigate('about'); return ['Navigating to About section...']; },
    '/skills': () => { onNavigate('skills'); return ['Navigating to Skills section...']; },
    '/projects': () => { onNavigate('projects'); return ['Navigating to Projects section...']; },
    '/contact': () => { onNavigate('contact'); return ['Navigating to Contact section...']; },
    '/clear': () => { setHistory([]); return []; },
    '/themes': () => [
      'Available website themes:',
      ' - dark (default hacker dark)',
      ' - light (premium light)',
      ' - hacker (green/black hacker vibe)',
      ' - neon (purple/blue neon)'
    ],
    '/theme': (args?: string) => {
      const newTheme = args?.toLowerCase();
      const validThemes = ['dark', 'light', 'hacker', 'neon'];
      if (!newTheme) {
        const current = ['light','hacker','neon'].find(c => document.documentElement.classList.contains(c)) || 'dark';
        return [`Current website theme: ${current}`, 'Usage: /theme [dark|light|hacker|neon]'];
      }
      if (validThemes.includes(newTheme)) {
        const root = document.documentElement;
        root.classList.remove('light', 'dark', 'hacker', 'neon');
        root.classList.add(newTheme);
        return [`Website theme changed to: ${newTheme}`];
      }
      return [`Invalid theme: ${newTheme}`, 'Available themes: dark, light, hacker, neon'];
    },
    '/mode': (args?: string) => {
      const newMode = (args || '').toLowerCase();
      const modes: Array<'matrix' | 'cyber' | 'classic' | 'hacker' | 'neon'> = ['matrix', 'cyber', 'classic', 'hacker', 'neon'];
      if (!newMode) {
        return [`Current terminal mode: ${theme}`, 'Usage: /mode [matrix|cyber|classic|hacker|neon]'];
      }
      if (modes.includes(newMode as any)) {
        setTheme(newMode as any);
        return [`Terminal mode switched to: ${newMode}`];
      }
      return [`Invalid mode: ${newMode}`, 'Available modes: matrix, cyber, classic, hacker, neon'];
    },
    '/matrix': () => {
      document.body.classList.add('matrix-effect');
      setTimeout(() => document.body.classList.remove('matrix-effect'), 3000);
      return ['Matrix rain effect activated...', 'Wake up, Neo...'];
    },
    '/social': () => [
      'Social links (use commands to open):',
      ' - /email    → Gmail compose',
      ' - /github   → GitHub profile',
      ' - /linkedin → LinkedIn profile'
    ],
    '/github': () => { window.open('https://github.com/preethamak', '_blank'); return ['Opening GitHub...']; },
    '/linkedin': () => { window.open('https://www.linkedin.com/in/preetham-a-k-18b97931b/', '_blank'); return ['Opening LinkedIn...']; },
    '/email': () => { window.open('https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com', '_blank'); return ['Opening Gmail compose...']; },
    '/comment': () => { setShowCommentDialog(true); return ['Opening comment form...']; },
    '/comments': () => {
      const count = getComments().length;
      if (count > 0) { onNavigate('comments'); return [`Opening comments gallery... (${count} comment${count>1?'s':''})`]; }
      return ['No comments yet. Use /comment to add one.'];
    },
    '/deletecomment': (args?: string) => {
      const id = (args || '').trim();
      if (!id) return ['Usage: /deletecomment <id>'];
      deleteComment(id);
      return [`Deleted comment ${id}`];
    },
    '/clearcomments': () => { clearComments(); return ['All comments cleared.']; },
    '/ascii': () => [
      '    █████╗ ██╗  ██╗',
      '   ██╔══██╗██║ ██╔╝',
      '   ███████║█████╔╝ ',
      '   ██╔══██║██╔═██╗ ',
      '   ██║  ██║██║  ██╗',
      '   ╚═╝  ╚═╝╚═╝  ╚═╝',
      '          AK'
    ],
    '/whoami': () => [
      'User: Preetham AK',
      'Role: Blockchain Developer & AI Engineer',
      'Location: Bangalore, India',
      'Education: B.Tech in AI & ML at REVA University',
      'Passion: Blockchain & Decentralized Systems'
    ],
    '/pwd': () => { const currentSection = window.location.hash || '/home'; return [`Current section: ${currentSection}`]; },
    '/ls': () => [ 'Available sections:', 'hero/', 'about/', 'skills/', 'projects/', 'contact/' ],
    '/guess': (args?: string) => {
      const val = (args || '').trim();
      if (!val) {
        guessSecret.current = Math.floor(Math.random() * 100) + 1;
        return ['Guess game started! I\'m thinking of a number between 1 and 100.', 'Use /guess <n> to guess.'];
      }
      const n = Number(val);
      if (!guessSecret.current) return ['Start a game first: /guess'];
      if (Number.isNaN(n) || n < 1 || n > 100) return ['Please provide a number between 1 and 100.'];
      if (n === guessSecret.current) { guessSecret.current = null; return ['Correct! 🎉 Game over.']; }
      return [n < (guessSecret.current as number) ? 'Higher ⬆️' : 'Lower ⬇️'];
    },
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
    classic: 'bg-amber-900 text-amber-300 border-amber-500',
    hacker: 'bg-black text-emerald-400 border-emerald-500',
    neon: 'bg-zinc-900 text-fuchsia-400 border-fuchsia-500'
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-green-400 p-4 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-xl hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400/70"
        title="Open Terminal"
      >
        <TerminalIcon className="w-8 h-8" />
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
          <div className="relative border-t border-current p-2">
            {/* Suggestions (overlay, does not shift input) */}
            {suggestions.length > 0 && currentInput && (
              <div className="absolute -top-5 left-2 right-2 text-xs opacity-60 pointer-events-none">
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
      <CommentDialog open={showCommentDialog} onOpenChange={setShowCommentDialog} onSubmitted={(id)=>{
          setHistory(prev=>[...prev,{input:'/comment',output:[`Comment saved with id: ${id}`],timestamp:new Date()}]);
        }} />
    </div>
  );
};

export default Terminal;