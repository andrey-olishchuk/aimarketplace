import { Agent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface HiredAgentsSectionProps {
  agents: Agent[];
}

export default function HiredAgentsSection({ agents }: HiredAgentsSectionProps) {
  if (agents.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Hired AI Data Agents</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-start">
                <div className={`${agent.iconBg} rounded-md p-3 mr-4 flex-shrink-0`}>
                  <svg className={`h-6 w-6 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                    <Badge 
                      variant={agent.type === 'premium' ? 'secondary' : 'outline'} 
                      className="ml-2"
                    >
                      {agent.type === 'premium' ? 'Premium' : 'Free'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap mt-1 mb-2">
                    {agent.tags.map((tag, i) => (
                      <div key={i} className={`${tag.bgColor} ${tag.textColor} text-xs px-2 py-1 rounded mr-1 mb-1`}>
                        {tag.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{agent.description}</p>
                  <div className="flex justify-end">
                    <Link href={`/agent/${agent.id}`}>
                      <Button variant="default" className="mr-2">Ask</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}