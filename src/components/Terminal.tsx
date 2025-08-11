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
      '/theme [1-4]     - Switch website theme (no arg cycles)',
      '/mode [1-5]      - Switch terminal mode (no arg cycles)',
      '/matrix          - Matrix rain effect',
      '/social          - Show social links',
      '/github          - Open GitHub profile',
      '/linkedin        - Open LinkedIn profile',
      '/gmail           - Open Gmail compose',
      '/whoami          - About me',
      '/pwd             - Current section',
      '/ls or /sl       - List sections',
      '/comment         - Jump to add comment',
      '/comments        - Open comments gallery',
      '/version         - Show site version',
      '/uptime          - Show session uptime',
      '/admin <pass>    - Enter admin mode'
    ],
    '/about': () => { onNavigate('about'); return ['Navigating to About section...']; },
    '/skills': () => { onNavigate('skills'); return ['Navigating to Skills section...']; },
    '/projects': () => { onNavigate('projects'); return ['Navigating to Projects section...']; },
    '/contact': () => { onNavigate('contact'); return ['Navigating to Contact section...']; },
    '/clear': () => { setHistory([]); return []; },
    '/admin': (args?: string) => {
      const pass = (args || '').trim();
      if (isAdmin) return ['Already in admin mode.'];
      if (pass === '2004') { setIsAdmin(true); return ['Admin access granted.']; }
      return ['Invalid password.'];
    },
    '/logout': () => { setIsAdmin(false); return ['Admin session ended.']; },
    '/control': () => isAdmin ? [
      'Developer controls:',
      '- /deletecomment <id>  - Delete specific comment',
      '- /clearcomments       - Clear all comments',
      '- /setversion <v>      - Set site version',
      '- /setdefaulttheme <n> - Set default theme (1-4)',
      '- /theme [1-4]         - Preview themes',
      '- /mode [1-5]          - Preview terminal modes'
    ] : ['Admin required. Use /admin <password>.'],
    '/version': () => [`Version: ${localStorage.getItem('site-version') || '1.0.0'}`],
    '/setversion': (args?: string) => { if (!isAdmin) return ['Admin required.']; const v=(args||'').trim(); if(!v) return ['Usage: /setversion <x.y.z>']; localStorage.setItem('site-version', v); return [`Version set to ${v}`]; },
    '/setdefaulttheme': (args?: string) => { 
      if (!isAdmin) return ['Admin required.']; 
      const input = (args||'').trim();
      const themeMap = { '1': 'dark', '2': 'light', '3': 'hacker', '4': 'cosmic' };
      const t = themeMap[input as keyof typeof themeMap] || input.toLowerCase(); 
      const valid=['dark','light','hacker','cosmic']; 
      if(!valid.includes(t)) return ['Usage: /setdefaulttheme [1-4] or [dark|light|hacker|cosmic]']; 
      localStorage.setItem('default-theme', t); 
      return [`Default theme saved: ${t}`]; 
    },
    '/uptime': () => {
      const start = sessionStorage.getItem('session-start') || Date.now().toString();
      if (!sessionStorage.getItem('session-start')) sessionStorage.setItem('session-start', start);
      const uptime = Math.floor((Date.now() - parseInt(start)) / 1000);
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = uptime % 60;
      return [`Session uptime: ${hours}h ${minutes}m ${seconds}s`];
    },
    '/theme': (args?: string) => {
      const validThemes = ['dark', 'light', 'hacker', 'cosmic'];
      const root = document.documentElement;
      if (!args) {
        const current = validThemes.find(c => root.classList.contains(c)) || 'dark';
        const next = validThemes[(validThemes.indexOf(current) + 1) % validThemes.length];
        root.classList.remove('dark','light','hacker','cosmic');
        root.classList.add(next);
        return [`Website theme changed to: ${next}`];
      }
      // Handle numeric input
      const themeMap = { '1': 'dark', '2': 'light', '3': 'hacker', '4': 'cosmic' };
      const newTheme = themeMap[args as keyof typeof themeMap] || args.toLowerCase();
      if (validThemes.includes(newTheme)) {
        root.classList.remove('dark','light','hacker','cosmic');
        root.classList.add(newTheme);
        return [`Website theme changed to: ${newTheme}`];
      }
      return [`Invalid theme: ${args}`, 'Available themes: 1(dark), 2(light), 3(hacker), 4(cosmic)'];
    },
    '/mode': (args?: string) => {
      const list: Array<'matrix' | 'cyber' | 'classic' | 'hacker' | 'neon'> = ['matrix','cyber','classic','hacker','neon'];
      if (!args) {
        const idx = list.indexOf(theme as any);
        const next = list[(idx + 1) % list.length];
        setTheme(next as any);
        return [`Terminal mode switched to: ${next}`];
      }
      // Handle numeric input
      const modeMap = { '1': 'matrix', '2': 'cyber', '3': 'classic', '4': 'hacker', '5': 'neon' };
      const newMode = modeMap[args as keyof typeof modeMap] || args.toLowerCase();
      if (list.includes(newMode as any)) {
        setTheme(newMode as any);
        return [`Terminal mode switched to: ${newMode}`];
      }
      return [`Invalid mode: ${args}`, 'Available modes: 1(matrix), 2(cyber), 3(classic), 4(hacker), 5(neon)'];
    },
    '/matrix': () => {
      document.body.classList.add('matrix-effect');
      setTimeout(() => document.body.classList.remove('matrix-effect'), 3000);
      return ['Matrix rain effect activated...', 'Wake up, Neo...'];
    },
    '/social': () => [
      'Social links:',
      ' - Email: preethamak07@gmail.com',
      ' - GitHub: https://github.com/preethamak',
      ' - LinkedIn: https://www.linkedin.com/in/preetham-a-k-18b97931b/'
    ],
    '/github': () => { window.open('https://github.com/preethamak', '_blank'); return ['Opening GitHub profile...']; },
    '/linkedin': () => { window.open('https://www.linkedin.com/in/preetham-a-k-18b97931b/', '_blank'); return ['Opening LinkedIn profile...']; },
    '/gmail': () => { window.open('https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com', '_blank'); return ['Opening Gmail compose...']; },
    '/comment': () => { onNavigate('comments'); window.dispatchEvent(new CustomEvent('focus-comment-form')); return ['Opening comment form...']; },
    '/comments': () => {
      const count = getComments().length;
      onNavigate('comments');
      return [count > 0 ? `Opening comments gallery... (${count} comment${count>1?'s':''})` : 'No comments yet. Add one below.'];
    },
    '/deletecomment': (args?: string) => {
      if (!isAdmin) return ['Admin required. Use /admin to login.'];
      const id = (args || '').trim();
      if (!id) return ['Usage: /deletecomment <id>'];
      deleteComment(id);
      return [`Deleted comment ${id}`];
    },
    '/clearcomments': () => { if (!isAdmin) return ['Admin required. Use /admin to login.']; clearComments(); return ['All comments cleared.']; },
    '/whoami': () => [
      '╔═══════════════════════════════════════╗',
      '║            PREETHAM AK                ║',
      '╠═══════════════════════════════════════╣',
      '║ Role: Smart Contract Developer &      ║',
      '║       Auditor, AI Engineer            ║',
      '║ Location: Bangalore, India            ║',
      '║ Education: B.Tech AI & ML (2024-28)  ║',
      '║ University: REVA University           ║',
      '║ CGPA: 9.2/10                         ║',
      '║ Available for: Smart contract dev,   ║',
      '║                auditing & AI projects ║',
      '╚═══════════════════════════════════════╝',
      'Building decentralized systems with secure smart contracts and AI insights.'
    ],
    '/pwd': () => { const currentSection = window.location.hash || '/home'; return [`Current section: ${currentSection}`]; },
    '/ls': () => [ 'Available sections:', 'hero/', 'about/', 'skills/', 'projects/', 'contact/', 'comments/' ],
    '/sl': () => commands['/ls'](),
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

  const handleDragStart = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragData.current = { offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top };
    const onMove = (ev: MouseEvent) => {
      if (!dragData.current) return;
      setPosition({ x: Math.max(0, ev.clientX - dragData.current.offsetX), y: Math.max(0, ev.clientY - dragData.current.offsetY) });
    };
    const onUp = () => {
      dragData.current = null;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const themeClasses = {
    matrix: 'bg-black text-emerald-400 border-emerald-500',
    cyber: 'bg-slate-900 text-cyan-400 border-cyan-500', 
    classic: 'bg-amber-900 text-amber-300 border-amber-500',
    hacker: 'bg-black text-emerald-400 border-emerald-500',
    neon: 'bg-zinc-900 text-fuchsia-400 border-fuchsia-500'
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-green-400 p-5 rounded-full border border-green-500 hover:bg-green-500 hover:text-black transition-all duration-300 shadow-xl hover:shadow-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-400/70"
        title="Open Terminal"
      >
        <TerminalIcon className="w-9 h-9" />
      </button>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "fixed z-50 transition-all duration-300 shadow-2xl",
        isMinimized 
          ? "w-80 h-12" 
          : "w-96 h-80",
        !position ? "bottom-4 right-4" : "",
        themeClasses[theme]
      )}
      style={{ 
        borderRadius: '8px',
        border: '1px solid',
        fontFamily: 'Monaco, Consolas, "Courier New", monospace',
        ...(position ? { top: position.y, left: position.x } : {})
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 border-b border-current cursor-move" onMouseDown={handleDragStart}>
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
          <div className="border-t border-current">
            {/* Suggestions row (fixed height to prevent jumping) */}
            <div className="px-2 pt-2 h-5">
              {suggestions.length > 0 && currentInput && (
                <div className="text-xs opacity-60">
                  Suggestions: {suggestions.slice(0, 3).join(', ')}
                </div>
              )}
            </div>
            {/* Input */}
            <div className="flex items-center gap-1 px-2 pb-2">
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