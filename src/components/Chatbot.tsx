import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BlockademiaLogo from './BlockademiaLogo';
import { sendAIMessage } from '../utils/ai';

function ChatBubble({ who, text }: { who: 'user' | 'bot'; text: string }) {
  return (
    <div className={`flex ${who === 'bot' ? 'justify-start' : 'justify-end'} mb-3`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-sm leading-6 ${
          who === 'bot' ? 'bg-card text-foreground rounded-bl-none' : 'bg-primary text-white rounded-br-none'
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [persona, setPersona] = useState<'friendly' | 'witty' | 'grok'>(() => {
    try {
      return (localStorage.getItem('chat-persona') as any) || 'friendly';
    } catch (e) {
      return 'friendly';
    }
  });
  const [messages, setMessages] = useState<{ who: 'user' | 'bot'; text: string }[]>([]);
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ariaLive, setAriaLive] = useState<'off' | 'polite' | 'assertive'>('polite');
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    // Show a friendly opening greeting on first open
    if (open && messages.length === 0) {
      const greeting = getPersonaGreeting(persona);
      setMessages([{ who: 'bot', text: greeting }]);
    }
  }, [messages, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => document.querySelector<HTMLInputElement>('input[aria-label="Chat message"]')?.focus(), 40);
      }
      if (e.key === '/') {
        const active = document.activeElement as HTMLElement | null;
        if (!active || active.tagName === 'BODY') {
          e.preventDefault();
          setOpen(true);
          setTimeout(() => document.querySelector<HTMLInputElement>('input[aria-label="Chat message"]')?.focus(), 40);
        }
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const sendMessage = async () => {
    if (!query.trim()) return;
    const text = query.trim();
    // Add user message
    setMessages((m) => [...m, { who: 'user', text }]);
    setQuery('');

    // Call the AI (mock or real) - friendly + slight humor
    setIsTyping(true);
    try {
      const botReply = await sendAIMessage(text);
      setMessages((m) => [...m, { who: 'bot', text: botReply }]);
    } catch (e) {
      setMessages((m) => [...m, { who: 'bot', text: "Oops — I tripped over a wire. Try again?" }]);
    } finally {
      setIsTyping(false);
    }
  };

  function getPersonaGreeting(p: 'friendly' | 'witty' | 'grok') {
    switch (p) {
      case 'witty':
        return "Hey — I'm your witty guide. Ready to turn confusion into code?"
      case 'grok':
        return "Grok mode activated: I analyze, I summarize, I occasionally drop dad jokes. How can I help?"
      default:
        return "Hi there! I'm Blockademia Bot — ask me about courses or wallets. I'm friendly and here to help 😄";
    }
  }

  const setSavedPersona = (p: 'friendly' | 'witty' | 'grok') => {
    setPersona(p);
    try {
      localStorage.setItem('chat-persona', p);
    } catch (e) {
      // ignore
    }
  };

  return (
    <>
      {/* Floating button */}
      <div 
        style={{ zIndex: 99999, position: 'fixed', bottom: '24px', right: '24px', pointerEvents: 'auto' }}
      >
        <motion.button
          aria-label="Open chat"
          aria-expanded={open}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Chat button clicked, current state:', open);
            setOpen((s) => !s);
          }}
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          style={{ pointerEvents: 'auto' }}
          className="relative w-16 h-16 rounded-full bg-accent text-black shadow-[0_0_60px_rgba(0,255,136,0.8)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_80px_rgba(0,255,136,1)] transition-all duration-300 transform-gpu border-2 border-accent/50 cursor-pointer font-bold"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2H4a2 2 0 00-2 2v16l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" fill="currentColor" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal={false}
            initial={{ opacity: 0, scale: 0.98, translateY: 12 }}
            animate={{ opacity: 1, scale: 1, translateY: 0 }}
            exit={{ opacity: 0, scale: 0.98, translateY: 12 }}
            transition={{ duration: 0.22 }}
            style={{ 
              position: 'fixed',
              right: '24px',
              bottom: '104px',
              zIndex: 99999,
              pointerEvents: 'auto'
            }}
            className="bg-card border border-border rounded-xl shadow-2xl w-[380px] max-w-[calc(100vw-4rem)] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-md overflow-hidden bg-muted flex items-center justify-center">
                <BlockademiaLogo className="w-7 h-7" />
              </div>
              <div className="flex-1 text-sm font-semibold">Blockademia Bot</div>
              <div className="flex gap-2 items-center">
                <label className="text-xs text-muted-foreground mr-2">Tone</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSavedPersona('friendly')}
                    className={`px-2 py-1 rounded-md text-xs ${persona === 'friendly' ? 'bg-primary text-black' : 'bg-muted text-muted-foreground'}`}
                  >
                    Friendly
                  </button>
                  <button
                    onClick={() => setSavedPersona('witty')}
                    className={`px-2 py-1 rounded-md text-xs ${persona === 'witty' ? 'bg-primary text-black' : 'bg-muted text-muted-foreground'}`}
                  >
                    Witty
                  </button>
                  <button
                    onClick={() => setSavedPersona('grok')}
                    className={`px-2 py-1 rounded-md text-xs ${persona === 'grok' ? 'bg-primary text-black' : 'bg-muted text-muted-foreground'}`}
                  >
                    Grok
                  </button>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground transition">
                ✕
              </button>
            </div>

            <div className="px-4 py-3 h-64 overflow-auto" ref={messagesRef} role="log" aria-live="polite">
              {messages.length === 0 && (
                <div className="text-sm text-muted-foreground">Have a question about a course, Web3, or life? Ask away — I'm friendly 😄</div>
              )}

              {messages.map((m, i) => (
                <ChatBubble key={i} who={m.who} text={m.text} />
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-muted rounded-full animate-pulse delay-75" />
                  <div className="w-3 h-3 bg-muted rounded-full animate-pulse delay-150" />
                </div>
              )}
            </div>

            <div className="px-4 py-3 border-t border-border flex gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 rounded-md bg-transparent border border-transparent focus:border-primary px-3 py-2 text-sm outline-none"
                placeholder="Ask me about courses, wallets, or who stole cookies 🍪"
                aria-label="Chat message"
              />
              <button onClick={sendMessage} className="bg-primary text-white px-4 py-2 rounded-md">Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
