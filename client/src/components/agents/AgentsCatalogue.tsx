import { useState } from "react";
import { Agent } from "@/data/mockData";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AgentCard from "./AgentCard";

interface AgentsCatalogueProps {
  freeAgents: Agent[];
  premiumAgents: Agent[];
  searchQuery: string;
}

export default function AgentsCatalogue({ freeAgents, premiumAgents, searchQuery }: AgentsCatalogueProps) {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter agents based on the search query
  const filteredFreeAgents = freeAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredPremiumAgents = premiumAgents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const allAgents = [...filteredPremiumAgents, ...filteredFreeAgents];
  
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">AI Data Agents Catalogue</h3>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="free">Free Agents</TabsTrigger>
          <TabsTrigger value="premium">Premium Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {allAgents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {allAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No agents found matching your search criteria.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="free">
          {filteredFreeAgents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFreeAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No free agents found matching your search criteria.
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="premium">
          {filteredPremiumAgents.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPremiumAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              No premium agents found matching your search criteria.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}