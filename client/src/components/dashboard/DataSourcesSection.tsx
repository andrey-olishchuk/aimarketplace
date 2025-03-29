import { DataSource } from "@/data/mockData";

interface DataSourcesSectionProps {
  dataSources: DataSource[];
}

export default function DataSourcesSection({ dataSources }: DataSourcesSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Connected Data Sources</h2>
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        {dataSources.map((source, index) => (
          <div key={index} className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className={`flex-shrink-0 h-10 w-10 ${source.iconBg} rounded-md flex items-center justify-center`}>
                <svg className={`h-6 w-6 ${source.iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={source.iconPath} />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{source.name}</h3>
                <p className="text-sm text-gray-500">Connected {source.connectedTime} • {source.size}</p>
              </div>
            </div>
            <div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${
                source.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {source.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
          <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Connect New Data Source
        </button>
      </div>
    </div>
  );
}
