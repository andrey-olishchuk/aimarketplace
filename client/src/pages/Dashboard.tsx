import Navbar from "@/components/layout/Navbar";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DataSourcesSection from "@/components/dashboard/DataSourcesSection";
import FreeAgentsSection from "@/components/agents/FreeAgentsSection";
import PremiumAgentsSection from "@/components/agents/PremiumAgentsSection";
import { stats, dataSources, freeAgents, premiumAgents } from "@/data/mockData";
import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <StatsOverview stats={stats} />
          <DataSourcesSection dataSources={dataSources} />
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">AI Data Agents Marketplace</h2>
              <div className="relative">
                <div className="flex items-center border border-gray-300 rounded-md p-2">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    className="ml-2 block w-full text-sm border-0 focus:outline-none" 
                    placeholder="Search agents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <FreeAgentsSection agents={filteredFreeAgents} />
            <PremiumAgentsSection agents={filteredPremiumAgents} />
          </div>
        </div>
      </main>
    </div>
  );
}
