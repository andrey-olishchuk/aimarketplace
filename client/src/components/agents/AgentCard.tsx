import { Agent } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div key={agent.id} className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-start">
          <Avatar className="h-12 w-12 rounded-full mr-4 flex-shrink-0 border-2 border-white shadow-sm">
            <AvatarImage src={agent.avatarUrl} alt={agent.name} />
            <AvatarFallback className={agent.iconBg}>
              {getInitials(agent.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
              <Badge 
                variant={agent.type === 'premium' ? 'outline' : 'outline'} 
                className={`ml-2 ${agent.type === 'premium' ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}`}
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
                <Button variant="default">Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}