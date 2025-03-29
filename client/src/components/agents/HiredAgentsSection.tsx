import { Agent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";
import { useState } from "react";

interface HiredAgentsSectionProps {
  agents: Agent[];
}

export default function HiredAgentsSection({ agents }: HiredAgentsSectionProps) {
  const [expandedAgentId, setExpandedAgentId] = useState<number | null>(null);
  
  if (agents.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-12">
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 shadow-md border border-indigo-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full -mr-16 -mt-16 z-0"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/40 to-indigo-100/30 rounded-full -ml-10 -mb-10 z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-6">
            <div className="bg-primary/10 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">Your Hired AI Data Agents</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent) => (
              <div 
                key={agent.id} 
                className={`
                  bg-white overflow-hidden rounded-xl transition-all duration-300 ease-in-out 
                  ${expandedAgentId === agent.id ? 'ring-2 ring-primary/50 shadow-xl' : 'shadow-md hover:shadow-lg'}
                `}
                onClick={() => setExpandedAgentId(expandedAgentId === agent.id ? null : agent.id)}
              >
                <div className="relative">
                  {/* Top colored bar - different for free vs premium */}
                  <div 
                    className={`h-2 w-full ${
                      agent.type === 'premium' 
                        ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300' 
                        : 'bg-gradient-to-r from-primary/70 via-primary to-primary/70'
                    }`} 
                  />
                  
                  <div className="p-5">
                    <div className="flex">
                      {/* Avatar with active status indicator */}
                      <div className="relative">
                        <Avatar className="h-16 w-16 rounded-full mr-4 flex-shrink-0 border-2 border-white shadow-md">
                          <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                          <AvatarFallback className={agent.iconBg}>
                            {agent.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-4 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                            <div className="flex items-center mt-1">
                              <span className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                              <span className="text-sm text-green-600 font-medium">Active</span>
                              <Badge 
                                variant="outline" 
                                className={`ml-3 ${agent.type === 'premium' 
                                  ? 'bg-amber-100 text-amber-800 border-amber-200' 
                                  : 'bg-blue-100 text-blue-800 border-blue-200'}`}
                              >
                                {agent.type === 'premium' ? 'Premium' : 'Free'}
                              </Badge>
                            </div>
                          </div>
                          
                          <Button
                            size="sm" 
                            className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                            variant="outline"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" transform={expandedAgentId === agent.id ? "rotate(45)" : ""} />
                            </svg>
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {agent.tags.map((tag, i) => (
                            <div key={i} className={`${tag.bgColor} ${tag.textColor} text-xs px-2.5 py-1 rounded-full font-medium`}>
                              {tag.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded content */}
                    <div className={`mt-4 transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedAgentId === agent.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
                      
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Capabilities:</h5>
                        <ul className="space-y-1">
                          {agent.capabilities.slice(0, 3).map((capability, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-xs text-gray-600">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className={`flex justify-end gap-2 ${expandedAgentId === agent.id ? 'mt-4' : 'mt-3'}`}>
                      <Link href={`/agent/${agent.id}`}>
                        <Button variant="outline" size="sm" className="text-sm px-3 py-1 h-auto">
                          Details
                        </Button>
                      </Link>
                      <Link href={`/chat/${agent.id}`}>
                        <Button variant="default" size="sm" className="text-sm px-3 py-1 h-auto">
                          Chat
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}