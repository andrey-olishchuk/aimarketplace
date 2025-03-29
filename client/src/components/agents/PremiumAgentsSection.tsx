import AgentCard from "./AgentCard";
import { Agent } from "@/data/mockData";

interface PremiumAgentsSectionProps {
  agents: Agent[];
}

export default function PremiumAgentsSection({ agents }: PremiumAgentsSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Premium AI Data Agents</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
