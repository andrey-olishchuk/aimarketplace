import { useState, useRef, useEffect } from "react";
import { Agent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatMessage {
  sender: "user" | "agent";
  content: string;
  timestamp: Date;
  hasChart?: boolean;
}

interface ChatInterfaceProps {
  agent: Agent;
  onBack: () => void;
  inline?: boolean;
}

export default function ChatInterface({ agent, onBack, inline = false }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    // Add user message
    const userMessage: ChatMessage = {
      sender: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate agent thinking and response
    setTimeout(() => {
      // Generate a response based on the agent type and capabilities
      let agentResponse: ChatMessage;
      
      if (agent.name === "Device Reporter") {
        agentResponse = {
          sender: "agent",
          content: "I've analyzed the latest sensor data from your connected devices. There appears to be an anomaly in temperature readings from Device #T-1092. The temperature has increased by 12% above normal operating parameters over the last 24 hours. Would you like me to generate a full report on this device?",
          timestamp: new Date(),
        };
      } else if (agent.name === "Data Q&A") {
        agentResponse = {
          sender: "agent",
          content: "Based on your data sources, I can see that system performance has been stable over the past week with an average response time of 230ms. There were 2 brief spikes in latency on Tuesday between 2-3pm that corresponded with scheduled backup processes. Would you like more details about specific components?",
          timestamp: new Date(),
        };
      } else if (agent.name === "AI Model Trainer") {
        agentResponse = {
          sender: "agent",
          content: "I've analyzed your dataset and built a predictive model for device failures. The model has an accuracy of 92.4% and identifies three key features as predictors: temperature variance, operation time, and voltage fluctuations. Would you like me to deploy this model for real-time predictions or would you prefer to see the detailed performance metrics first?",
          timestamp: new Date(),
          hasChart: true,
        };
      } else {
        agentResponse = {
          sender: "agent",
          content: "I've analyzed your data and found some interesting patterns. There are several correlations between system usage and performance metrics that might help optimize your operations. Would you like me to prepare a detailed report?",
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  // For inline mode within agent profile
  if (inline) {
    return (
      <div className="flex flex-col">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto max-h-96 space-y-4">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-4">Start a conversation with {agent.name}</p>
              <div className="text-left bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2 text-sm">This agent can help you:</h3>
                <ul className="space-y-2">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-md rounded-lg shadow-sm p-3",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-gray-100 text-gray-900"
                )}
              >
                <p className="text-sm">{message.content}</p>
                
                {/* Display chart placeholder if available */}
                {message.hasChart && (
                  <div className="mt-3 bg-gray-100 p-2 rounded-md">
                    <div className="h-32 flex items-center justify-center border border-dashed border-gray-300 rounded">
                      <div className="text-xs text-gray-500">
                        <svg className="h-5 w-5 mx-auto mb-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        <span>Model Accuracy Visualization</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={cn(
                  "text-xs mt-1",
                  message.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 max-w-md">
                <div className="flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">Processing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="mt-4">
          <form onSubmit={handleSendMessage} className="flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              className="ml-3"
              disabled={isProcessing || !input.trim()}
            >
              <span className="mr-1">Send</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Full-page chat view
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="mr-2 p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Button>
            <div className="flex items-center">
              <div className={`${agent.iconBg} rounded-md p-2 mr-3`}>
                <svg className={`h-5 w-5 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
                </svg>
              </div>
              <h1 className="text-lg font-semibold">{agent.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="text-center py-10">
              <div className={`${agent.iconBg} rounded-full p-3 inline-flex mx-auto mb-4`}>
                <svg className={`h-8 w-8 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
                </svg>
              </div>
              <h2 className="text-xl font-medium text-gray-900 mb-2">Welcome to {agent.name}</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">{agent.description}</p>
              <div className="text-left bg-white rounded-lg shadow p-5 max-w-lg mx-auto">
                <h3 className="font-medium text-gray-900 mb-2">This agent can help you:</h3>
                <ul className="space-y-2">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Chat messages */}
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={cn(
                "flex",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div 
                className={cn(
                  "max-w-md rounded-lg shadow-sm p-4",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-900"
                )}
              >
                <p className="text-sm">{message.content}</p>
                
                {/* Display chart placeholder if available */}
                {message.hasChart && (
                  <div className="mt-3 bg-gray-100 p-3 rounded-md">
                    <div className="h-40 flex items-center justify-center border border-dashed border-gray-300 rounded">
                      <div className="text-sm text-gray-500">
                        <svg className="h-6 w-6 mx-auto mb-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                        <span>Model Accuracy Visualization</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className={cn(
                  "text-xs mt-1",
                  message.sender === "user" ? "text-primary-foreground/70" : "text-gray-500"
                )}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Processing indicator */}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg shadow-sm p-4 max-w-md">
                <div className="flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">Processing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isProcessing}
            />
            <Button 
              type="submit" 
              className="ml-3"
              disabled={isProcessing || !input.trim()}
            >
              <span className="mr-2">Send</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}