import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";
import { freeAgents, premiumAgents } from "@/data/mockData";

export default function AgentProfile() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/agent/:id");
  const [showChat, setShowChat] = useState(false);
  
  // Parse query parameters to check if we should show chat
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('chat') === 'true') {
      setShowChat(true);
    }
  }, []);

  if (!match) return null;

  const id = parseInt(params.id);
  const agent = [...freeAgents, ...premiumAgents].find(a => a.id === id);

  if (!agent) {
    setLocation("/not-found");
    return null;
  }

  if (showChat) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <ChatInterface 
          agent={agent} 
          onBack={() => setShowChat(false)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-4">
            <button 
              onClick={() => setLocation("/")}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Marketplace
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-12 w-12 ${agent.iconBg} rounded-full flex items-center justify-center`}>
                  <svg className={`h-8 w-8 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                  <div className="flex space-x-2 mt-1">
                    {agent.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tag.bgColor} ${tag.textColor}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button 
                type="button" 
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                  agent.type === 'free' 
                    ? 'bg-primary hover:bg-blue-700 focus:ring-primary' 
                    : 'bg-secondary hover:bg-purple-700 focus:ring-secondary'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => setShowChat(true)}
              >
                {agent.type === 'free' ? 'Hire for free' : 'Hire Premium'}
              </button>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">About this agent</h3>
              <p className="text-sm text-gray-500 mb-6">{agent.fullDescription || agent.description}</p>
              
              <h4 className="text-md font-medium text-gray-900 mb-2">Capabilities:</h4>
              <ul className="list-disc pl-5 mb-6 text-sm text-gray-500 space-y-1">
                {agent.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>

              <h4 className="text-md font-medium text-gray-900 mb-4">Example outputs:</h4>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h5 className="font-medium text-gray-900 mb-2">Sample Data Analysis</h5>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="bg-white p-3 rounded shadow flex-1">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                      alt="Sample visualization" 
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-500">{agent.sampleOutputDescriptions[0]}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow flex-1">
                    <img 
                      src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                      alt="Sample correlation matrix" 
                      className="w-full h-48 object-cover rounded mb-2"
                    />
                    <p className="text-xs text-gray-500">{agent.sampleOutputDescriptions[1]}</p>
                  </div>
                </div>
              </div>

              <h4 className="text-md font-medium text-gray-900 mb-2">Compatible with:</h4>
              <div className="flex space-x-2 mb-6">
                {agent.compatibilitySources.map((source, index) => (
                  <span 
                    key={index}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${source.bgColor} ${source.textColor}`}
                  >
                    {source.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
