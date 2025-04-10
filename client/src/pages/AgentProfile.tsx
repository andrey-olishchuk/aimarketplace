import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import ChatInterface from "@/components/chat/ChatInterface";
import DeviceReport from "@/components/reports/DeviceReport";
import { freeAgents, premiumAgents, hiredAgents } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

export default function AgentProfile() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/agent/:id");
  const [showChatView, setShowChatView] = useState(false);
  const [showBillingConfirmation, setShowBillingConfirmation] = useState(false);
  
  // Parse query parameters to check if we should show chat
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('chat') === 'true') {
      setShowChatView(true);
    }
  }, []);

  if (!match) return null;

  const id = parseInt(params.id);
  // Check if this is a hired agent
  const isHired = hiredAgents.some(a => a.id === id);
  // Get agent from all possible sources
  const agent = [...freeAgents, ...premiumAgents, ...hiredAgents].find(a => a.id === id);

  if (!agent) {
    setLocation("/not-found");
    return null;
  }

  const handleHireClick = () => {
    if (agent.type === 'premium') {
      setShowBillingConfirmation(true);
    } else {
      setShowChatView(true);
    }
  };

  const confirmBilling = () => {
    setShowBillingConfirmation(false);
    setShowChatView(true);
  };

  const isDeviceReporter = agent.name === "Device Reporter";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Billing confirmation dialog */}
      <AlertDialog open={showBillingConfirmation} onOpenChange={setShowBillingConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Premium Agent Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              Your account will be billed monthly for this agent. You can unsubscribe any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBilling} className="bg-amber-600 hover:bg-amber-700">
              Confirm Subscription
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
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

          {isHired ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main content for hired agents */}
              <div className="md:col-span-2">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg h-full">
                  <div className="px-4 py-3 sm:px-6 border-b border-gray-200">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 rounded-full flex-shrink-0 border-2 border-white shadow-sm">
                        <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                        <AvatarFallback className={agent.iconBg}>
                          {agent.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {isDeviceReporter ? "Device Report" : `Chat with ${agent.name}`}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4" style={{ minHeight: "500px" }}>
                    {isDeviceReporter ? (
                      // Device Reporter only shows the report
                      <DeviceReport agent={agent} />
                    ) : (
                      // Other agents just show the chat interface
                      <ChatInterface agent={agent} onBack={() => {}} inline={true} />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Agent details - Secondary content for hired agents */}
              <div className="md:col-span-1">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">Agent Details</h3>
                    <p className="mt-1 text-sm text-gray-500">{agent.description}</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <h4 className="text-md font-medium text-gray-900 mb-2">Capabilities:</h4>
                    <ul className="list-disc pl-5 mb-4 text-sm text-gray-500 space-y-1">
                      {agent.capabilities.map((capability, index) => (
                        <li key={index}>{capability}</li>
                      ))}
                    </ul>
                    
                    <h4 className="text-md font-medium text-gray-900 mb-2">Compatible with:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.compatibilitySources.map((source, index) => (
                        <span 
                          key={index}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${source.bgColor} ${source.textColor}`}
                        >
                          {source.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Non-hired agent view
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 rounded-full flex-shrink-0 border-2 border-white shadow-sm">
                    <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                    <AvatarFallback className={agent.iconBg}>
                      {agent.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-gray-900">{agent.name}</h2>
                    <div className="flex space-x-2 mt-1">
                      {agent.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tag.name === "Premium" ? "bg-amber-100 text-amber-800" : `${tag.bgColor} ${tag.textColor}`
                            }`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button 
                  className={`${
                    agent.type === 'free' 
                      ? 'bg-primary hover:bg-blue-700 focus:ring-primary' 
                      : 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-600'
                  }`}
                  onClick={handleHireClick}
                >
                  {agent.type === 'free' ? 'Hire for free' : 'Hire Premium'}
                </Button>
              </div>
              
              {showChatView && (
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <ChatInterface agent={agent} onBack={() => setShowChatView(false)} inline={true} />
                </div>
              )}
              
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">About this agent</h3>
                <p className="text-sm text-gray-500 mb-6">{agent.fullDescription || agent.description}</p>
                
                <h4 className="text-md font-medium text-gray-900 mb-2">Capabilities:</h4>
                <ul className="list-disc pl-5 mb-6 text-sm text-gray-500 space-y-1">
                  {agent.capabilities.map((capability, index) => (
                    <li key={index}>{capability}</li>
                  ))}
                </ul>

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
          )}
        </div>
      </main>
    </div>
  );
}
