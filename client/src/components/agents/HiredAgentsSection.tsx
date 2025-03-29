import { Agent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "wouter";

interface HiredAgentsSectionProps {
  agents: Agent[];
}

export default function HiredAgentsSection({ agents }: HiredAgentsSectionProps) {
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
                className="bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
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
                      {/* Agent avatar */}
                      <div className="relative">
                        <Avatar className="h-16 w-16 rounded-full mr-4 flex-shrink-0 border-2 border-white shadow-md">
                          <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                          <AvatarFallback className={agent.iconBg}>
                            {agent.name.split(' ').map(word => word[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                        <div className="flex items-center mt-1">
                          <Badge 
                            variant="outline" 
                            className={`${agent.type === 'premium' 
                              ? 'bg-amber-100 text-amber-800 border-amber-200' 
                              : 'bg-blue-100 text-blue-800 border-blue-200'}`}
                          >
                            {agent.type === 'premium' ? 'Premium' : 'Free'}
                          </Badge>
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
                    
                    <p className="text-sm text-gray-600 mt-4">{agent.description}</p>
                    
                    <div className="flex justify-end mt-4">
                      <Link href={`/agent/${agent.id}`}>
                        <Button variant="default" size="sm" className="text-sm px-4 py-1 h-auto">
                          Details
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