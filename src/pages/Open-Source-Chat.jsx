import { useState, useRef, useEffect } from "react";
import {
  Send,
  BookText,
  Presentation,
  CircleDollarSign,
  MapPin,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function OpenSourceChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [partialResponse, setPartialResponse] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLocation, setMapLocation] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const quickActions = [
    { icon: <BookText className="h-5 w-5" />, text: "Business plan guide" },
    { icon: <Presentation className="h-5 w-5" />, text: "Pitch advice" },
    {
      icon: <CircleDollarSign className="h-5 w-5" />,
      text: "Pricing strategy",
    },
    { icon: <MapPin className="h-5 w-5" />, text: "Find coffee shops near me" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, partialResponse]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        100
      )}px`;
    }
  }, [inputValue]);

  const typeText = (text, onComplete) => {
    let i = 0;
    setPartialResponse("");
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setPartialResponse((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        onComplete();
      }
    }, 5);
  };

  const callOpenAI = async (prompt) => {
    try {
      // Check if the prompt is location-based
      const isLocationQuery = /near me|location|map|where can i find/i.test(
        prompt.toLowerCase()
      );

      if (isLocationQuery) {
        // Extract the location type (e.g., "coffee shops" from "find coffee shops near me")
        const locationType = prompt
          .replace(/near me|location|map|where can i find/gi, "")
          .trim();

        // Generate Google Maps URL
        const mapsUrl = `https://www.google.com/maps/embed/v1/search?q=${encodeURIComponent(
          locationType
        )}&key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY`;

        setMapLocation(mapsUrl);
        setShowMapModal(true);

        return `I found some ${locationType} locations for you. Here's what I found:`;
      }

      // For regular business queries
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful business advisor. Provide concise, professional advice about business plans, pitching, pricing, marketing, and other business topics. For location queries, just acknowledge that you will show a map.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return `I'm having trouble processing your request. (${error.message})`;
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setHasInteracted(true);

    try {
      const aiResponse = await callOpenAI(inputValue);

      typeText(aiResponse, () => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: aiResponse },
        ]);
        setIsTyping(false);
        setPartialResponse("");
      });
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request. Please try again later.",
        },
      ]);
    }
  };

  const handleQuickAction = async (actionText) => {
    if (isTyping) return;

    const userMessage = { role: "user", content: actionText };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setHasInteracted(true);

    try {
      const aiResponse = await callOpenAI(actionText);

      typeText(aiResponse, () => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: aiResponse },
        ]);
        setIsTyping(false);
        setPartialResponse("");
      });
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your quick action. Please try again.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const closeMapModal = () => {
    setShowMapModal(false);
    setMapLocation("");
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
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-4xl rounded-2xl p-4 ${
                      msg.role === "user"
                        ? "bg-white text-gray-800 rounded-br-none"
                        : "bg-[#E1D7CD] text-gray-800 border border-white rounded-bl-none"
                    }`}
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
                      <div className="whitespace-pre-wrap">
                        {partialResponse}
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Map Modal */}
        {showMapModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">Location Map</h3>
                <button
                  onClick={closeMapModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1">
                <iframe
                  src={mapLocation}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Fixed Input Area at Bottom */}
        <div className="fixed bottom-8 left-0 right-0 bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 py-8 border border-white/20 mx-2 transition-all duration-300 ${
                !hasInteracted ? "opacity-90" : ""
              }`}
            >
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
                    style={{ maxHeight: "200px" }}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="absolute right-3 bottom-3 bg-white hover:bg-[#D0C4B8] text-gray-800 p-2 rounded-full disabled:opacity-50 transition-colors"
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
                  className="flex items-center gap-2 border-2 border-white rounded-full px-6 py-3 hover:bg-white/10 transition-all duration-200 text-white text-sm"
                >
                  {action.icon}
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
