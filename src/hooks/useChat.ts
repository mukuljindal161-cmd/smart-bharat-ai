import { useState, useCallback, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessage, GeminiMessage } from '../services/geminiService';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Namaste! Welcome to **Smart Bharat AI**!

I'm your digital assistant for Indian government services. I can help you with:

• **Government Schemes** - PM Kisan, Ayushman Bharat, PM Awas Yojana
• **Documents** - Passport, PAN, Aadhaar, Driving License
• **Certificates** - Birth, Death, Caste, Income
• **Grievances** - How to file and track complaints

**Quick questions you can ask:**
• "How to apply for passport?"
• "Tell me about PM Kisan scheme"
• "Documents for Aadhaar update"
• "File a grievance online"

How can I assist you today?`,
  timestamp: new Date(),
};

export function useChat(_sessionId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom helper
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([WELCOME_MESSAGE]);
    }
  }, [messages.length]);

  // Convert messages to Gemini format
  const toGeminiMessages = useCallback((msgs: Message[]): GeminiMessage[] => {
    return msgs
      .filter(m => m.id !== 'welcome') // Exclude welcome message from history
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));
  }, []);

  // Send message
  const send = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);

    // Create user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Get conversation history (excluding current message)
      const history = toGeminiMessages(messages);

      // Send to API
      const response = await sendMessage(content.trim(), history);

      // Create assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, toGeminiMessages]);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setError(null);
  }, []);

  // Copy message
  const copyMessage = useCallback(async (content: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(content);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, []);

  // Regenerate last response
  const regenerate = useCallback(async () => {
    // Find last user message
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    // Remove last assistant message using filter
    setMessages(prev => {
      // Find the last assistant index
      let lastAssistantIndex = -1;
      for (let i = prev.length - 1; i >= 0; i--) {
        if (prev[i].role === 'assistant') {
          lastAssistantIndex = i;
          break;
        }
      }
      if (lastAssistantIndex !== -1) {
        return prev.filter((_, i) => i !== lastAssistantIndex);
      }
      return prev;
    });

    // Resend last user message
    setIsLoading(true);
    const history = toGeminiMessages(messages.slice(0, -1));

    try {
      const response = await sendMessage(lastUserMessage.content, history);
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to regenerate');
    } finally {
      setIsLoading(false);
    }
  }, [messages, toGeminiMessages]);

  return {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage: send,
    clearChat,
    copyMessage,
    regenerate,
  };
}
