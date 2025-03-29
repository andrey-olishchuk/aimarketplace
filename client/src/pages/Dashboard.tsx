import Navbar from "@/components/layout/Navbar";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DataSourcesSection from "@/components/dashboard/DataSourcesSection";
import HiredAgentsSection from "@/components/agents/HiredAgentsSection";
import AgentsCatalogue from "@/components/agents/AgentsCatalogue";
import { stats, dataSources, freeAgents, premiumAgents, hiredAgents } from "@/data/mockData";
import { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <StatsOverview stats={stats} />
          <DataSourcesSection dataSources={dataSources} />
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">AI Data Agents</h2>
              <div className="relative w-64">
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
            
            <HiredAgentsSection agents={hiredAgents} />
            <AgentsCatalogue 
              freeAgents={freeAgents} 
              premiumAgents={premiumAgents} 
              searchQuery={searchQuery} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
