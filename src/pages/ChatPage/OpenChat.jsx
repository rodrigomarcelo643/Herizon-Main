import { useState, useRef, useEffect } from "react";
import {
  BookText,
  Presentation,
  CircleDollarSign,
  MapPin,
  X,
  Send,
  Mic,
  MicOff,
} from "lucide-react";

import { db } from "../../../backend/config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GOOGLE_MAPS_KEY = import.meta.env.VITE_MAPS_API_KEY;

export default function OpenChat() {
  const [idea, setIdea] = useState("");
  const [plan, setPlan] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const recognitionRef = useRef(null);

  const quickActions = [
    { icon: <BookText size={20} />, text: "business plan" },
    { icon: <Presentation size={20} />, text: "Retail store pitch" },
    { icon: <CircleDollarSign size={20} />, text: "Service pricing strategy" },
    { icon: <MapPin size={20} />, text: "Find locations", isMap: true },
  ];

  // Fetch chat history on component mount
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const q = query(
          collection(db, "chatHistory"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChatHistory(history);

        // If there's history, show the latest one
        if (history.length > 0) {
          setPlan(history[0].response);
          if (history[0].mapUrl) {
            setMapUrl(history[0].mapUrl);
          }
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  const saveToFirebase = async (prompt, response, mapUrl = null) => {
    try {
      const docRef = await addDoc(collection(db, "chatHistory"), {
        prompt,
        response,
        mapUrl,
        timestamp: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const generatePlan = async (prompt) => {
    setIsLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Create a detailed business plan with sections for Executive Summary, Market Analysis, and Financial Projections.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });
      const data = await res.json();
      const generatedPlan = data.choices[0].message.content;
      setPlan(generatedPlan);

      const needsMap =
        prompt.toLowerCase().includes("location") ||
        prompt.toLowerCase().includes("map");
      let generatedMapUrl = "";

      if (needsMap) {
        generatedMapUrl = `https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_KEY}&q=${encodeURIComponent(
          prompt
        )}`;
        setMapUrl(generatedMapUrl);
        setShowMapModal(true);
      }

      // Save to Firebase
      await saveToFirebase(prompt, generatedPlan, generatedMapUrl);

      // Update chat history
      setChatHistory((prev) => [
        {
          prompt,
          response: generatedPlan,
          mapUrl: generatedMapUrl,
          timestamp: new Date(),
        },
        ...prev,
      ]);
    } catch (error) {
      setPlan("Error generating plan. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setIdea("");
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognitionRef.current = recognition;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setIdea(transcript);
        generatePlan(transcript); // Auto-submit after speech
      };
      recognition.onerror = () => setIsListening(false);

      recognition.start();
    } else {
      alert("Speech recognition not supported in your browser");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim()) generatePlan(idea);
  };

  return (
    <div className="bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] min-h-screen">
      <div className="pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-4">
          {!plan && (
            <div className="flex flex-col items-center justify-center mt-70">
              <h1 className="text-4xl font-bold text-white mb-8">Herizon AI</h1>
            </div>
          )}

          {plan && (
            <div className="bg-[#E1D7CD] text-gray-800 border border-white rounded-2xl p-4 mt-5 mb-10">
              <div className="whitespace-pre-wrap">{plan}</div>
              {mapUrl && (
                <button
                  onClick={() => setShowMapModal(true)}
                  className="mt-4 flex items-center gap-2 text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  <MapPin size={16} /> View on Map
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] p-2">
        <div className="max-w-5xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your business idea..."
              className="w-full bg-white/20 rounded-2xl py-3 pl-5 pr-20 text-white placeholder-white/70 focus:outline-none"
            />
            <div className="absolute right-2 bottom-1.5 flex gap-1">
              {isListening ? (
                <button
                  type="button"
                  onClick={stopListening}
                  className="p-2 rounded-full bg-red-500"
                >
                  <MicOff size={20} className="text-white" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startListening}
                  className="p-2 rounded-full bg-white/60 hover:bg-white/30"
                >
                  <Mic size={20} className="text-black" />
                </button>
              )}
              <button
                type="submit"
                disabled={!idea.trim() || isLoading}
                className="bg-white p-2 rounded-full disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex space-x-1">
                    {[0, 50, 100].map((delay) => (
                      <div
                        key={delay}
                        className="w-2 h-2 rounded-full bg-gray-600 animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-4 flex-wrap gap-4">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() =>
                  action.isMap
                    ? (setShowMapModal(true),
                      setMapUrl(
                        `https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_KEY}&q=${encodeURIComponent(
                          action.text
                        )}`
                      ))
                    : generatePlan(action.text)
                }
                className="flex items-center gap-2 border-2 border-white rounded-full px-6 py-3 hover:bg-white/10 text-white text-sm"
              >
                {action.icon} {action.text}
              </button>
            ))}
          </div>
        </div>
      </div>
      {showMapModal && (
        <div className="fixed inset-0 bg-black/80 mt-5 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Business Locations</h3>
              <button
                onClick={() => setShowMapModal(false)}
                className="text-gray-500"
              >
                <X size={24} />
              </button>
            </div>
            <iframe title="map" src={mapUrl} className="flex-1 rounded-b-lg" />
          </div>
        </div>
      )}
    </div>
  );
}
