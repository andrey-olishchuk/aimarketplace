import { useState, useRef, useEffect } from "react";
import { Agent } from "@/data/mockData";

interface ChatMessage {
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
}

interface ChatInterfaceProps {
  agent: Agent;
  onBack: () => void;
}

export default function ChatInterface({ agent, onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "agent",
      content: `Hello! I'm your ${agent.name} assistant. I can help you analyze and visualize your data from your connected sources. What would you like to know about your data today?`,
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputMessage.trim() === "") return;

    const userMessage: ChatMessage = {
      sender: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");

    // Simulate agent response after a delay
    setTimeout(() => {
      let agentResponse: ChatMessage;

      // Create a more detailed response if the message contains certain keywords
      if (inputMessage.toLowerCase().includes("cpu") || inputMessage.toLowerCase().includes("usage") || inputMessage.toLowerCase().includes("trend")) {
        agentResponse = {
          sender: "agent",
          content: `I've analyzed the CPU usage data from your servers over the past 24 hours. Here's what I found:

Key observations:
- Average CPU usage across all servers: 42%
- Peak usage: 78% at 3:45 PM yesterday
- Server web-03 consistently shows higher utilization
- There's a noticeable pattern of increased usage during business hours (9 AM - 5 PM)

Would you like me to analyze any specific servers in more detail or check for correlations with other metrics like memory usage or network traffic?`,
          timestamp: new Date(),
          hasChart: true,
        };
      } else {
        agentResponse = {
          sender: "agent",
          content: `I've processed your request about "${inputMessage}". Based on your connected data sources, I can see some interesting patterns. Would you like me to prepare a more detailed analysis or visualization?`,
          timestamp: new Date(),
        };
      }

      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-4">
        <button 
          onClick={onBack}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Agent Profile
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center border-b border-gray-200">
          <div className={`flex-shrink-0 h-10 w-10 ${agent.iconBg} rounded-full flex items-center justify-center`}>
            <svg className={`h-6 w-6 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
            </svg>
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-900">{agent.name}</h2>
            <p className="text-sm text-gray-500">Connected to: InfluxDB Cloud</p>
          </div>
        </div>

        <div className="px-4 py-5 sm:px-6 h-[500px] overflow-y-auto">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
              >
                {message.sender === 'agent' && (
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full ${agent.iconBg} flex items-center justify-center`}>
                      <svg className={`h-6 w-6 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
                      </svg>
                    </div>
                  </div>
                )}
                <div className={`${message.sender === 'agent' ? 'ml-3' : 'mr-3'}`}>
                  <div className={`${
                    message.sender === 'agent' 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-primary text-white'
                  } p-3 rounded-lg`}>
                    <p className="text-sm whitespace-pre-line">
                      {message.content}
                    </p>
                    {message.hasChart && (
                      <div className="bg-white p-3 rounded border border-gray-200 mt-3 mb-3">
                        <img 
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                          alt="CPU usage trend chart" 
                          className="w-full h-64 object-cover rounded mb-2"
                        />
                      </div>
                    )}
                  </div>
                  <p className={`mt-1 text-xs text-gray-500 ${message.sender === 'user' ? 'text-right' : ''}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 sm:px-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <div className="flex-grow">
              <textarea 
                rows={2} 
                className="shadow-sm block w-full focus:ring-primary focus:border-primary sm:text-sm border border-gray-300 rounded-md p-2" 
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
            <div className="flex-shrink-0">
              <button 
                type="button" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary h-full"
                onClick={handleSend}
              >
                <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
