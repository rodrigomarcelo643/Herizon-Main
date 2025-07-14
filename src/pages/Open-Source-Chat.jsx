import { useState, useRef, useEffect } from "react";
import { Send, BookText, Presentation, CircleDollarSign, MapPin, AlertCircle, ChevronRight, X } from "lucide-react";
import Navbar from "../components/Navbar";

export default function OpenSourceChat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [partialResponse, setPartialResponse] = useState("");
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapConfig, setMapConfig] = useState({
    center: { lat: 10.3157, lng: 123.8854 },
    zoom: 14,
    markers: [],
    routes: [],
    streetView: false,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [mapError, setMapError] = useState(false);
  const [showMapButton, setShowMapButton] = useState(false);
  const [mapResponseData, setMapResponseData] = useState(null);
  const [isLoadingCompetitors, setIsLoadingCompetitors] = useState(false);
  const [businessType, setBusinessType] = useState("");
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const directionsRendererRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const abortControllerRef = useRef(null);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const quickActions = [
    { icon: <BookText className="h-5 w-5" />, text: "Business plan guide" },
    { icon: <Presentation className="h-5 w-5" />, text: "Pitch advice" },
    { icon: <CircleDollarSign className="h-5 w-5" />, text: "Pricing strategy" },
    { icon: <MapPin className="h-5 w-5" />, text: "Find competitors near me", isLocation: true },
  ];

  // Generate dummy competitors data
  const generateDummyCompetitors = (center, businessType) => {
    const types = {
      restaurant: ["Cafe", "Bistro", "Diner", "Pizzeria", "Steakhouse"],
      retail: ["Boutique", "Department Store", "Outlet", "Supermarket", "Mall"],
      service: ["Salon", "Spa", "Repair Shop", "Cleaning Service", "Consultancy"],
      default: ["Cafe", "Botique", "Salon", "Cafe", "Steakhouse"]
    };
    
    const businessNames = types[businessType] || types.default;
    const competitors = [];
    
    // Add user business
    competitors.push({
      name: "Your Location",
      position: center,
      address: "",
      isUserBusiness: true
    });
    
    // Add 5 dummy competitors
    for (let i = 0; i < 5; i++) {
      const offsetLat = (Math.random() * 0.02) - 0.01;
      const offsetLng = (Math.random() * 0.02) - 0.01;
      
      competitors.push({
        name: `${businessNames[i] || `Competitor ${i+1}`}`,
        position: {
          lat: center.lat + offsetLat,
          lng: center.lng + offsetLng
        },
        address: `${Math.floor(Math.random() * 1000) + 100} ${["Main", "Oak", "Pine", "Maple", "Elm"][i % 5]} St`,
        rating: (Math.random() * 2 + 3).toFixed(1),
        website: `https://${businessNames[i]?.toLowerCase() || `competitor${i+1}`}.com`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        opening_hours: ["Mon-Fri: 9AM-6PM", "Sat: 10AM-4PM", "Sun: Closed"],
        isUserBusiness: false
      });
    }
    
    return competitors;
  };

  useEffect(() => {
    if (!window.google && MAPS_API_KEY) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setMapError(true);
      document.head.appendChild(script);
    }
  }, [MAPS_API_KEY]);

  useEffect(() => {
    if (showMapModal && !mapError) {
      initMap();
    }
    return () => {
      mapInstanceRef.current = null;
    };
  }, [showMapModal, mapConfig, mapError]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLoc);
          setMapConfig(prev => ({ ...prev, center: userLoc }));
        },
        () => setMapConfig(prev => ({ ...prev, center: { lat: 10.3157, lng: 123.8854 } }))
      );
    }
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapConfig.center,
        zoom: mapConfig.zoom,
        mapTypeId: mapConfig.streetView ? 
          window.google.maps.MapTypeId.HYBRID : 
          window.google.maps.MapTypeId.ROADMAP,
      });

      mapInstanceRef.current = map;
      updateMarkers();
      updateRoutes();
    } else {
      setMapError(true);
    }
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return;

    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    mapConfig.markers.forEach(markerData => {
      if (!window.google) return;

      const marker = new window.google.maps.Marker({
        position: markerData.position,
        map: mapInstanceRef.current,
        title: markerData.name,
        icon: {
          url: markerData.isUserBusiness 
            ? "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            : "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new window.google.maps.Size(32, 32)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold">${markerData.name}</h3>
            <p class="text-sm">${markerData.address}</p>
            ${markerData.rating ? `<p class="text-sm">Rating: ${markerData.rating}/5</p>` : ''}
            ${markerData.website ? `<p class="text-sm"><a href="${markerData.website}" target="_blank" class="text-blue-500">Website</a></p>` : ''}
            ${markerData.phone ? `<p class="text-sm">Phone: ${markerData.phone}</p>` : ''}
          </div>
        `
      });

      marker.addListener("click", () => infoWindow.open(mapInstanceRef.current, marker));
      markersRef.current.push(marker);
    });
  };

  const updateRoutes = () => {
    if (!mapInstanceRef.current || mapConfig.routes.length === 0) return;

    if (!directionsRendererRef.current && window.google) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#3b82f6",
          strokeOpacity: 0.8,
          strokeWeight: 5
        }
      });
    }
    
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(mapInstanceRef.current);
      
      const directionsService = new window.google.maps.DirectionsService();
      const route = mapConfig.routes[0];

      directionsService.route({
        origin: route.origin,
        destination: route.destination,
        travelMode: window.google.maps.TravelMode[route.travelMode]
      }, (response, status) => {
        if (status === 'OK') {
          directionsRendererRef.current.setDirections(response);
        }
      });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [messages, partialResponse, inputValue]);

  const typeText = (text, onComplete) => {
    clearInterval(typingIntervalRef.current);
    let i = 0;
    setPartialResponse("");

    typingIntervalRef.current = setInterval(() => {
      if (i < text.length) {
        setPartialResponse(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingIntervalRef.current);
        onComplete();
      }
    }, 5);
  };

  const stopTyping = () => {
    clearInterval(typingIntervalRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    setIsTyping(false);
    setPartialResponse("");
  };

  const extractBusinessType = (prompt) => {
    const businessKeywords = {
      restaurant: ["restaurant", "cafe", "diner", "bistro", "eatery", "food"],
      retail: ["retail", "store", "shop", "boutique", "outlet"],
      service: ["service", "salon", "spa", "cleaning", "repair"],
      tech: ["tech", "software", "app", "development", "IT"],
    };
    
    const lowerPrompt = prompt.toLowerCase();
    for (const [type, keywords] of Object.entries(businessKeywords)) {
      if (keywords.some(keyword => lowerPrompt.includes(keyword))) return type;
    }
    return "business";
  };

  const handleLocationQuery = async (prompt) => {
    setIsLoadingCompetitors(true);
    const detectedBusinessType = extractBusinessType(prompt);
    setBusinessType(detectedBusinessType);
    
    const currentLocation = userLocation || mapConfig.center;
    let competitors;
    
    if (window.google && !mapError && mapInstanceRef.current) {
      try {
        const placesService = new window.google.maps.places.PlacesService(mapInstanceRef.current);
        const request = {
          location: currentLocation,
          radius: 1000,
          keyword: detectedBusinessType,
        };
        
        competitors = await new Promise(resolve => {
          placesService.nearbySearch(request, (results, status) => {
            resolve(status === 'OK' ? results.slice(0, 5).map(place => ({
              name: place.name,
              position: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              address: place.vicinity,
              rating: place.rating,
              isUserBusiness: false
            })) : []);
          });
        });
      } catch (error) {
        console.error("Error finding nearby places:", error);
        competitors = [];
      }
    } else {
      // Use dummy data if Google Maps not available or map is not initialized
      competitors = generateDummyCompetitors(currentLocation, detectedBusinessType);
    }
    
    // Add user's business to the map if we have location
    if (userLocation) {
      competitors.unshift({
        name: "Your Business Location",
        position: userLocation,
        address: "Your business address",
        isUserBusiness: true
      });
    }
    
    setMapConfig(prev => ({
      ...prev,
      markers: competitors,
      center: currentLocation,
      streetView: /street view|streetview/i.test(prompt.toLowerCase()),
      zoom: 14
    }));
    
    setMapResponseData({ competitors, location: currentLocation, businessType: detectedBusinessType });
    setShowMapModal(true);
    setMapError(!window.google);
    setShowMapButton(true);
    setIsLoadingCompetitors(false);
    
    let responseText = `I found ${competitors.length - 1} ${detectedBusinessType} businesses near your location:\n\n`;
    competitors.slice(1).forEach((comp, index) => {
      responseText += `${index + 1}. ${comp.name}\n`;
      responseText += `   Address: ${comp.address}\n`;
      if (comp.rating) responseText += `   Rating: ${comp.rating}/5\n`;
      responseText += `\n`;
    });
    
    responseText += `\nI've marked your business location with a green pin and competitors with red pins on the map.`;
    return responseText;
  };

  const callOpenAI = async (prompt) => {
    abortControllerRef.current = new AbortController();
    
    try {
      const isLocationQuery = /near me|location|map|where can i find|competitors|partners|nearby/i.test(prompt.toLowerCase());

      if (isLocationQuery) {
        return await handleLocationQuery(prompt);
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "system",
            content: `You are a helpful business advisor. Provide concise, professional advice about business plans, pitching, pricing, marketing, and other business topics. The user appears to be in the ${businessType || 'general'} business sector.`,
          }, {
            role: "user",
            content: prompt,
          }],
          temperature: 0.7,
          max_tokens: 500,
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error:", error);
        return `I'm having trouble processing your request. (${error.message})`;
      }
      return null;
    } finally {
      abortControllerRef.current = null;
      setIsLoadingCompetitors(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMessage = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setHasInteracted(true);
    setShowMapButton(false);

    try {
      const aiResponse = await callOpenAI(inputValue);
      if (aiResponse !== null) {
        typeText(aiResponse, () => {
          setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
          setIsTyping(false);
          setPartialResponse("");
        });
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process your request." }]);
    }
  };

  const handleQuickAction = async (action) => {
    if (isTyping) return;

    setMessages(prev => [...prev, { role: "user", content: action.text }]);
    setIsTyping(true);
    setHasInteracted(true);
    setShowMapButton(false);

    try {
      let aiResponse;
      if (action.isLocation) {
        aiResponse = await handleLocationQuery(action.text);
      } else {
        aiResponse = await callOpenAI(action.text);
      }

      if (aiResponse !== null) {
        typeText(aiResponse, () => {
          setMessages(prev => [...prev, { role: "assistant", content: aiResponse }]);
          setIsTyping(false);
          setPartialResponse("");
        });
      }
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I couldn't process your quick action." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const openMapModal = () => setShowMapModal(true);
  const closeMapModal = () => {
    setShowMapModal(false);
    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }
  };

  const getDirections = (destination) => {
    if (!userLocation) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I couldn't get your current location. Please enable location services to get directions."
      }]);
      return;
    }
    
    const newRoutes = [{
      origin: userLocation,
      destination: destination.position,
      travelMode: "DRIVING"
    }];
    
    setMapConfig(prev => ({
      ...prev,
      routes: newRoutes,
      center: {
        lat: (userLocation.lat + destination.position.lat) / 2,
        lng: (userLocation.lng + destination.position.lng) / 2
      },
      zoom: 13
    }));
    
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `I've plotted the route from your location to ${destination.name}.`
    }]);
  };

  return (
    <div className="bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] min-h-screen relative overflow-hidden">
      <Navbar />
      <div className="pt-16 pb-24 relative z-10 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 overflow-y-auto pb-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-6 space-y-4 px-2">
              {!hasInteracted && (
                <div className="flex flex-col items-center justify-center relative top-50 space-y-8">
                  <div className="text-4xl font-bold text-white tracking-wider">Herizon AI</div>
                </div>
              )}

              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-4xl rounded-2xl p-4 ${
                    msg.role === "user" ? "bg-white text-gray-800 rounded-br-none" : "bg-[#E1D7CD] text-gray-800 border border-white rounded-bl-none"
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    {index === messages.length - 1 && msg.role === "assistant" && showMapButton && (
                      <button onClick={openMapModal} className="mt-2 flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
                        <MapPin className="h-4 w-4" /> View Map Details
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#E1D7CD] text-gray-800 border border-white rounded-2xl rounded-bl-none p-4 max-w-4xl">
                    {partialResponse ? (
                      <>
                        <div className="whitespace-pre-wrap">{partialResponse}</div>
                        <button onClick={stopTyping} className="mt-2 flex items-center gap-1 text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                          <X className="h-3 w-3" /> Stop
                        </button>
                      </>
                    ) : (
                      <div className="flex space-x-2">
                        {[0, 150, 300].map(delay => (
                          <div key={delay} className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {showMapModal && (
          <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] mt-6 bg-opacity-50 flex items-center justify-center z-[900] p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold">
                  {mapResponseData?.businessType ? `${mapResponseData.businessType} Business Map` : 'Business Location Map'}
                  {mapConfig.markers.length > 1 && ` (${mapConfig.markers.length - 1} competitors)`}
                </h3>
                <button onClick={closeMapModal} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <div className="flex-1">
                {mapError ? (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Map Loading Error</h3>
                    <p className="mb-4">Showing dummy location data for demonstration purposes.</p>
                    <div ref={mapRef} className="w-full h-full bg-gray-200" />
                  </div>
                ) : isLoadingCompetitors ? (
                  <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                    <div className="flex space-x-2 mb-4">
                      {[0, 150, 300].map(delay => (
                        <div key={delay} className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                    <p>Finding competitors in your area...</p>
                  </div>
                ) : (
                  <div ref={mapRef} className="w-full h-full" style={{ minHeight: '400px' }} />
                )}
              </div>
              {mapConfig.markers.length > 0 && (
                <div className="max-h-48 overflow-y-auto border-t">
                  <div className="p-4">
                    <h4 className="font-medium mb-2">
                      {mapConfig.markers[0]?.isUserBusiness ? "Your Business and Competitors:" : "Found Businesses:"}
                    </h4>
                    <ul className="space-y-3">
                      {mapConfig.markers.map((marker, index) => (
                        <li key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">
                              {marker.isUserBusiness ? (
                                <span className="text-green-600">★ {marker.name}</span>
                              ) : marker.name}
                            </p>
                            <p className="text-sm text-gray-600">{marker.address}</p>
                            {marker.rating && <p className="text-sm">Rating: {marker.rating}/5</p>}
                          </div>
                          {!marker.isUserBusiness && (
                            <button onClick={() => getDirections(marker)} className="flex items-center text-blue-500 hover:text-blue-700 text-sm">
                              Get Directions <ChevronRight className="h-4 w-4" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="fixed bottom-8 left-0 right-0 bg-gradient-to-r from-[#817773] via-[#a59690] to-[#E1D7CD] z-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 py-8 border border-white/20 mx-2 ${!hasInteracted ? "opacity-90" : ""}`}>
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
                  onClick={() => handleQuickAction(action)}
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