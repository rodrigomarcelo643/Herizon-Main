import { useState, useRef, useEffect } from 'react';
import { Send, BookText, Presentation, CircleDollarSign } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function OpenSourceChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [partialResponse, setPartialResponse] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const quickActions = [
    { icon: <BookText className="h-5 w-5" />, text: 'Business plan guide' },
    { icon: <Presentation className="h-5 w-5" />, text: 'Pitch advice' },
    { icon: <CircleDollarSign className="h-5 w-5" />, text: 'Pricing strategy' },
    { icon: <BookText className="h-5 w-5" />, text: 'Financial basics' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, partialResponse]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [inputValue]);

  const typeText = (text, onComplete) => {
    let i = 0;
    setPartialResponse('');
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setPartialResponse(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        onComplete();
      }
    }, 5);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setHasInteracted(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      typeText(aiResponse, () => {
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        setIsTyping(false);
        setPartialResponse('');
      });
    }, 400);
  };

  const handleQuickAction = (actionText) => {
    if (isTyping) return;
    
    const userMessage = { role: 'user', content: actionText };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setHasInteracted(true);

    setTimeout(() => {
      const aiResponse = getAIResponse(actionText);
      typeText(aiResponse, () => {
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        setIsTyping(false);
        setPartialResponse('');
      });
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const getAIResponse = (question) => {
    const responses = {
      'business': `Creating a business plan involves several key sections:
      
1. **Executive Summary** - Overview of your business
2. **Company Description** - What you do and why
3. **Market Analysis** - Industry outlook and trends
4. **Organization** - Your team structure
5. **Products/Services** - What you're offering
6. **Marketing Strategy** - How you'll attract customers
7. **Financial Projections** - Revenue and expenses
8. **Funding Request** - If seeking investment

Would you like me to elaborate on any specific section?`,
      'pitch': `Crafting an effective pitch requires these elements:
      
• **Hook** - Grab attention immediately
• **Problem** - Clearly define the pain point
• **Solution** - How your product/service solves it
• **Market** - Size and opportunity
• **Business Model** - How you'll make money
• **Traction** - Current progress
• **Ask** - What you need from the audience

Would you like to practice your pitch with me?`,
      'price': `Consider these pricing strategies:
      
**Cost-Plus** - Add markup to costs  
**Value-Based** - Price according to perceived value  
**Competitive** - Match or beat competitors  
**Penetration** - Low initial price to gain market share  
**Skimming** - Start high then lower over time  

The best approach depends on your target market and product type.`,
      'financial': `Essential financial concepts for entrepreneurs:
      
• **Cash Flow** - Tracking money in/out  
• **Profit Margins** - Revenue minus costs  
• **Break-Even** - When revenue covers expenses  
• **Balance Sheet** - Assets vs liabilities  
• **Tax Planning** - Understanding obligations  

I can explain any of these in more detail if helpful.`
    };

    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('business')) return responses['business'];
    if (lowerQuestion.includes('pitch')) return responses['pitch'];
    if (lowerQuestion.includes('price')) return responses['price'];
    if (lowerQuestion.includes('financial')) return responses['financial'];
    
    return "I'm happy to help with your business questions. Could you clarify or ask about something more specific?";
  };

  return (
    <div className="bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="pt-16 pb-24 relative z-10 flex flex-col h-[calc(100vh-8rem)]">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Chat Container */}
            <div className="mt-6 space-y-4 px-2">
              {/* Initial centered content when no messages */}
              {messages.length === 0 && !hasInteracted && (
                <div className="flex flex-col items-center justify-center relative top-50 space-y-8">
                  <div className="text-4xl font-bold text-white tracking-wider">
                    Herizon AI
                  </div>
                  
                </div>
              )}
              
              {/* Chat messages */}
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-4xl rounded-2xl p-4 ${msg.role === 'user' 
                      ? 'bg-white text-gray-800 rounded-br-none' 
                      : 'bg-[#E1D7CD] text-gray-800 border border-white rounded-bl-none'}`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#E1D7CD] text-gray-800 border border-white rounded-2xl rounded-bl-none p-4 max-w-4xl">
                    {partialResponse ? (
                      <div className="whitespace-pre-wrap">{partialResponse}</div>
                    ) : (
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Fixed Input Area at Bottom */}
        <div className="fixed bottom-8 left-0 right-0 bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 py-8 border border-white/20 mx-2 transition-all duration-300 ${!hasInteracted ? 'opacity-90' : ''}`}>
              <form onSubmit={handleSendMessage}>
                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything About Business..."
                    className="w-full bg-white/20 rounded-2xl py-3 pl-5 pr-16 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#E1D7CD] resize-none overflow-y-auto"
                    rows={1}
                    style={{ maxHeight: '200px' }}
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-3 bottom-3 bg-white  hover:bg-[#D0C4B8] text-gray-800 p-2 rounded-full disabled:opacity-50 transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center mt-4 flex-wrap gap-4">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.text)}
                        className="flex items-center gap-2 border-2 border-white rounded-full px-6 py-3 hover:bg-white/10 transition-all duration-200 text-white text-lg"
                      >
                        {action.icon}
                        <span className='text-sm'>{action.text}</span>
                      </button>
                    ))}
                  </div>
          </div>
        </div>
      </div>
    </div>
  );
}