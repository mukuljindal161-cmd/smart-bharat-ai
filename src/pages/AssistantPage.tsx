import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  User,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  Plus,
  MessageSquare,
  ChevronLeft,
  Sparkles,
  Settings,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

// Markdown-like text renderer
const renderMarkdown = (text: string) => {
  return text.split('\n').map((line, i) => {
    // Headers
    if (line.startsWith('### ')) {
      return (
        <h4 key={i} className="font-semibold text-base mt-3 mb-1">
          {line.slice(4)}
        </h4>
      );
    }
    if (line.startsWith('** ') && line.endsWith('**')) {
      return (
        <h3 key={i} className="font-semibold text-lg text-secondary-900 dark:text-secondary-100 mt-4 mb-2">
          {line.slice(3, -2)}
        </h3>
      );
    }
    // Bold text
    if (line.startsWith('**') && line.endsWith('**')) {
      return (
        <p key={i} className="font-semibold text-base mt-3 mb-2">
          {line.slice(2, -2)}
        </p>
      );
    }
    // Bullet points
    if (line.startsWith('• ')) {
      return (
        <li key={i} className="ml-4 text-sm list-disc">
          {renderInlineBold(line.slice(2))}
        </li>
      );
    }
    // Numbered list
    if (/^\d+\. /.test(line)) {
      return (
        <li key={i} className="ml-4 text-sm list-decimal">
          {renderInlineBold(line.replace(/^\d+\. /, ''))}
        </li>
      );
    }
    // Empty line
    if (!line.trim()) {
      return <div key={i} className="h-2" />;
    }
    // Regular paragraph
    return (
      <p key={i} className={cn('text-sm', i > 0 && 'mt-1')}>
        {renderInlineBold(line)}
      </p>
    );
  });
};

// Render inline bold text
const renderInlineBold = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex gap-1 items-center h-5">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: 'easeInOut',
        }}
        className="h-2 w-2 rounded-full bg-primary-500"
      />
    ))}
  </div>
);

// Quick suggestions
const quickSuggestions = [
  { icon: '🛂', text: 'How to apply for passport?' },
  { icon: '🌾', text: 'Tell me about PM Kisan scheme' },
  { icon: '🪪', text: 'Documents for Aadhaar update' },
  { icon: '📝', text: 'File a grievance online' },
];

export const AssistantPage: React.FC = () => {
  const {
    messages,
    isLoading,
    messagesEndRef,
    sendMessage,
    clearChat,
    copyMessage,
    regenerate,
  } = useChat();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (content: string, id: string) => {
    const success = await copyMessage(content);
    if (success) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleSuggestionClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex" role="application" aria-label="AI Assistant Chat">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0 border-r border-secondary-200 dark:border-secondary-800 bg-secondary-50 dark:bg-secondary-900/50 overflow-hidden"
          >
            <div className="w-[280px] h-full flex flex-col">
              {/* New Chat Button */}
              <div className="p-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={clearChat}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  New Chat
                </Button>
              </div>

              {/* Conversation list placeholder */}
              <div className="flex-1 overflow-y-auto px-3 py-2">
                <p className="text-xs text-secondary-500 dark:text-secondary-400 uppercase tracking-wider mb-2">
                  Current Session
                </p>
                <div className="space-y-1">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate">Smart Bharat AI</span>
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-secondary-200 dark:border-secondary-800">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                      Smart Bharat AI
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      Civic Assistant
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              ) : (
                <PanelLeft className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-secondary-900 dark:text-secondary-100">
                  AI Assistant
                </h1>
                <p className="text-xs text-secondary-500 dark:text-secondary-400">
                  Powered by Gemini
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearChat}
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto" role="log" aria-label="Chat messages" aria-live="polite">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'mb-6 flex gap-4',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div
                    className={cn(
                      'group relative max-w-[85%] rounded-2xl px-5 py-4',
                      message.role === 'user'
                        ? 'bg-primary-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 shadow-sm rounded-bl-md'
                    )}
                  >
                    <div
                      className={cn(
                        'prose prose-sm max-w-none',
                        message.role === 'user'
                          ? 'text-white'
                          : 'text-secondary-800 dark:text-secondary-200'
                      )}
                    >
                      {renderMarkdown(message.content)}
                    </div>

                    {/* Message Actions */}
                    {message.role === 'assistant' && message.id !== 'welcome' && (
                      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-secondary-200 dark:border-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopy(message.content, message.id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                          title="Copy response"
                        >
                          {copiedId === message.id ? (
                            <Check className="h-4 w-4 text-success-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={regenerate}
                          disabled={isLoading}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                          title="Regenerate response"
                        >
                          <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
                        </button>
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-xl bg-secondary-200 dark:bg-secondary-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary-600 dark:text-secondary-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 rounded-2xl rounded-bl-md px-5 py-4 shadow-sm">
                  <TypingIndicator />
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Suggestions (show only on welcome) */}
        {messages.length === 1 && !isLoading && (
          <div className="max-w-3xl mx-auto px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickSuggestions.map((suggestion, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700 text-sm text-secondary-700 dark:text-secondary-300 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all text-left"
                >
                  <span className="text-lg">{suggestion.icon}</span>
                  <span className="truncate">{suggestion.text}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-secondary-200 dark:border-secondary-800 bg-white dark:bg-secondary-900 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end gap-2 bg-secondary-50 dark:bg-secondary-800 rounded-2xl border border-secondary-200 dark:border-secondary-700 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about government services, schemes, documents..."
                aria-label="Type your message"
                rows={1}
                disabled={isLoading}
                className={cn(
                  'flex-1 px-5 py-4 bg-transparent resize-none',
                  'text-secondary-900 dark:text-secondary-100',
                  'placeholder:text-secondary-400 dark:placeholder:text-secondary-500',
                  'focus:outline-none',
                  'disabled:opacity-50'
                )}
                style={{ maxHeight: '150px' }}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className={cn(
                  'flex-shrink-0 m-2 h-10 w-10 rounded-xl flex items-center justify-center',
                  'transition-all duration-200',
                  input.trim() && !isLoading
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30'
                    : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-400 dark:text-secondary-500'
                )}
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <p className="text-xs text-center text-secondary-500 dark:text-secondary-400 mt-3">
              AI responses are for information purposes. Verify with official sources for critical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
