import { useState } from "react";
import { useLocation } from "wouter";
import { Agent } from "@/data/mockData";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const [, navigate] = useLocation();
  
  const handleClick = () => {
    navigate(`/agent/${agent.id}`);
  };

  return (
    <div 
      className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center mb-4">
          <div className={`flex-shrink-0 h-12 w-12 ${agent.iconBg} rounded-full flex items-center justify-center`}>
            <svg className={`h-8 w-8 ${agent.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={agent.iconPath} />
            </svg>
          </div>
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
            <div className="flex space-x-2 mt-1">
              {agent.tags.map((tag, index) => (
                <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tag.bgColor} ${tag.textColor}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-4">{agent.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Works with {agent.compatibleWith}
          </div>
          <button 
            type="button" 
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              agent.type === 'free' 
                ? 'bg-primary hover:bg-blue-700 focus:ring-primary' 
                : 'bg-secondary hover:bg-purple-700 focus:ring-secondary'
            } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/agent/${agent.id}?chat=true`);
            }}
          >
            {agent.type === 'free' ? 'Hire for free' : 'Hire Premium'}
          </button>
        </div>
      </div>
    </div>
  );
}
