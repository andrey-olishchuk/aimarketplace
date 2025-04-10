// Types

export interface StatCard {
  title: string;
  value: string;
  description?: string;
  iconPath: string;
  iconBg: string;
  iconColor: string;
}

export interface DataSource {
  id: number;
  name: string;
  connectedTime: string;
  size: string;
  status: 'Active' | 'Inactive';
  iconPath: string;
  iconBg: string;
  iconColor: string;
}

export interface Tag {
  name: string;
  bgColor: string;
  textColor: string;
}

export interface CompatibilitySource {
  name: string;
  bgColor: string;
  textColor: string;
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  fullDescription?: string;
  type: 'free' | 'premium';
  tags: Tag[];
  iconPath: string;
  iconBg: string;
  iconColor: string;
  avatarUrl: string;  // URL to synthetic human avatar image
  compatibleWith: string;
  capabilities: string[];
  sampleOutputDescriptions: string[];
  compatibilitySources: CompatibilitySource[];
}

// Mock data for hired agents 
export const hiredAgents: Agent[] = [
  {
    id: 1,
    name: "Device Reporter",
    description: "Creates comprehensive reports about device state, anomalies, and predictions based on sensor data for proactive maintenance.",
    fullDescription: "Creates comprehensive reports about device state, anomalies, and predictions based on sensor data. The Device Reporter agent automatically monitors connected devices, analyzes performance patterns, and generates detailed reports highlighting potential issues and maintenance recommendations. It's perfect for operations teams, maintenance staff, and IoT device managers who need to stay ahead of equipment failures.",
    type: "free",
    tags: [
      { name: "Device Monitoring", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "Predictive Maintenance", bgColor: "bg-green-100", textColor: "text-green-800" }
    ],
    iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    avatarUrl: "https://ui-avatars.com/api/?name=Device+Reporter&background=0D8ABC&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Automatic sensor data monitoring and analysis",
      "Anomaly detection for device operations",
      "Performance trend reporting",
      "Predictive maintenance recommendations",
      "Device health scoring and status summaries",
      "Comparative analysis across device fleets",
      "Scheduled reporting with customizable frequency"
    ],
    sampleOutputDescriptions: [
      "Device health report with highlighted maintenance needs",
      "Anomaly detection showing potential device failures"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" }
    ]
  },
  {
    id: 2,
    name: "Data Q&A",
    description: "Ask questions about your data in plain English and get instant answers. Perfect for non-technical team members.",
    fullDescription: "Ask questions about your data in plain English and get instant answers. The Data Q&A agent translates your natural language questions into the appropriate queries, retrieves the relevant data, and presents the answers in an easy-to-understand format. This agent bridges the gap between your data and team members who may not have technical expertise.",
    type: "free",
    tags: [
      { name: "Natural Language", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
      { name: "Basic Insights", bgColor: "bg-blue-100", textColor: "text-blue-800" }
    ],
    iconPath: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    avatarUrl: "https://ui-avatars.com/api/?name=Data+Q%26A&background=EAB308&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Natural language processing for data questions",
      "Simple query generation for all connected data sources",
      "Basic visualization of query results",
      "Explanations of data findings",
      "Question refinement suggestions",
      "Data source recommendations for specific questions"
    ],
    sampleOutputDescriptions: [
      "Response to natural language query with supporting data",
      "Simple visualization of query results with explanation"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
      { name: "Redis Cloud", bgColor: "bg-red-100", textColor: "text-red-800" }
    ]
  }
];

// Mock data for stats cards
export const stats: StatCard[] = [];

// Mock data for data sources
export const dataSources: DataSource[] = [
  {
    id: 1,
    name: "InfluxDB Cloud: Bucket TeleCANesis",
    connectedTime: "2 months ago",
    size: "450 GB",
    status: "Active",
    iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    iconBg: "bg-blue-100",
    iconColor: "text-primary"
  },
  {
    id: 2,
    name: "PostgreSQL 10.10.1.1: Database TeleCANesis",
    connectedTime: "1 month ago",
    size: "320 GB",
    status: "Inactive",
    iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600"
  }
];

// Mock data for free agents
export const freeAgents: Agent[] = [
  {
    id: 1,
    name: "Device Reporter",
    description: "Creates comprehensive reports about device state, anomalies, and predictions based on sensor data for proactive maintenance.",
    fullDescription: "Creates comprehensive reports about device state, anomalies, and predictions based on sensor data. The Device Reporter agent automatically monitors connected devices, analyzes performance patterns, and generates detailed reports highlighting potential issues and maintenance recommendations. It's perfect for operations teams, maintenance staff, and IoT device managers who need to stay ahead of equipment failures.",
    type: "free",
    tags: [
      { name: "Device Monitoring", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "Predictive Maintenance", bgColor: "bg-green-100", textColor: "text-green-800" }
    ],
    iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    avatarUrl: "https://ui-avatars.com/api/?name=Device+Reporter&background=0D8ABC&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Automatic sensor data monitoring and analysis",
      "Anomaly detection for device operations",
      "Performance trend reporting",
      "Predictive maintenance recommendations",
      "Device health scoring and status summaries",
      "Comparative analysis across device fleets",
      "Scheduled reporting with customizable frequency"
    ],
    sampleOutputDescriptions: [
      "Device health report with highlighted maintenance needs",
      "Anomaly detection showing potential device failures"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" }
    ]
  },
  {
    id: 2,
    name: "Data Q&A",
    description: "Ask questions about your data in plain English and get instant answers. Perfect for non-technical team members.",
    fullDescription: "Ask questions about your data in plain English and get instant answers. The Data Q&A agent translates your natural language questions into the appropriate queries, retrieves the relevant data, and presents the answers in an easy-to-understand format. This agent bridges the gap between your data and team members who may not have technical expertise.",
    type: "free",
    tags: [
      { name: "Natural Language", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
      { name: "Basic Insights", bgColor: "bg-blue-100", textColor: "text-blue-800" }
    ],
    iconPath: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    avatarUrl: "https://ui-avatars.com/api/?name=Data+Q%26A&background=EAB308&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Natural language processing for data questions",
      "Simple query generation for all connected data sources",
      "Basic visualization of query results",
      "Explanations of data findings",
      "Question refinement suggestions",
      "Data source recommendations for specific questions"
    ],
    sampleOutputDescriptions: [
      "Response to natural language query with supporting data",
      "Simple visualization of query results with explanation"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
      { name: "Redis Cloud", bgColor: "bg-red-100", textColor: "text-red-800" }
    ]
  }
];

// Mock data for premium agents
export const premiumAgents: Agent[] = [
  {
    id: 4,
    name: "AI Model Trainer",
    description: "Automatically trains, evaluates, and deploys machine learning models based on your data. Handles feature engineering and hyperparameter tuning.",
    fullDescription: "Automatically trains, evaluates, and deploys machine learning models based on your data. The AI Model Trainer agent intelligently selects appropriate algorithms, performs feature engineering, and optimizes hyperparameters to create high-performing predictive models. It also provides detailed model explanations and deployment options to integrate predictions into your workflows.",
    type: "premium",
    tags: [
      { name: "Premium", bgColor: "bg-amber-100", textColor: "text-amber-800" },
      { name: "AITraining", bgColor: "bg-secondary bg-opacity-20", textColor: "text-secondary" },
      { name: "MLOps", bgColor: "bg-indigo-100", textColor: "text-indigo-800" }
    ],
    iconPath: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    iconBg: "bg-secondary",
    iconColor: "text-white",
    avatarUrl: "https://ui-avatars.com/api/?name=AI+Model+Trainer&background=6941C6&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Automated machine learning model training",
      "Intelligent feature engineering and selection",
      "Hyperparameter optimization",
      "Model evaluation and comparison",
      "Model explainability and transparency",
      "Continuous model monitoring and retraining",
      "Deployment options for real-time or batch predictions"
    ],
    sampleOutputDescriptions: [
      "Feature importance visualization for predictive model",
      "Performance metrics comparison across different algorithms"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
      { name: "Redis Cloud", bgColor: "bg-red-100", textColor: "text-red-800" }
    ]
  },
  {
    id: 5,
    name: "Anomaly Finder",
    description: "Detects and explains unusual patterns in your data with advanced anomaly detection algorithms and root cause analysis.",
    fullDescription: "Detects and explains unusual patterns in your data using advanced anomaly detection algorithms and provides detailed root cause analysis. The Anomaly Finder agent continuously monitors your time-series data, identifies outliers and anomalies using various machine learning techniques, and generates explanations for why these anomalies occurred. It's essential for proactive system monitoring, quality control, and performance optimization.",
    type: "premium",
    tags: [
      { name: "Premium", bgColor: "bg-amber-100", textColor: "text-amber-800" },
      { name: "FailureReasoning", bgColor: "bg-secondary bg-opacity-20", textColor: "text-secondary" },
      { name: "Monitoring", bgColor: "bg-red-100", textColor: "text-red-800" }
    ],
    iconPath: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    iconBg: "bg-secondary",
    iconColor: "text-white",
    avatarUrl: "https://ui-avatars.com/api/?name=Anomaly+Finder&background=DC2626&color=fff&size=256",
    compatibleWith: "time-series sources",
    capabilities: [
      "Advanced anomaly detection algorithms",
      "Real-time monitoring of data streams",
      "Root cause analysis for detected anomalies",
      "Correlation discovery across data sources",
      "Automatic threshold configuration and tuning",
      "Seasonal pattern recognition and filtering",
      "Alert generation with severity classification",
      "Historical anomaly comparison and trending"
    ],
    sampleOutputDescriptions: [
      "Anomaly detection report with root cause explanation",
      "Time-series visualization highlighting detected anomalies"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" }
    ]
  },
  {
    id: 6,
    name: "Advanced Analytics",
    description: "Comprehensive data analysis with advanced statistical methods, interactive dashboards, and custom reports. Handles complex data relationships.",
    fullDescription: "Comprehensive data analysis with advanced statistical methods, interactive dashboards, and custom reports. The Advanced Analytics agent provides deep insights into your data using sophisticated analytical techniques. It helps you discover hidden patterns, understand complex relationships, and create stunning visualizations that tell the story of your data.",
    type: "premium",
    tags: [
      { name: "Premium", bgColor: "bg-amber-100", textColor: "text-amber-800" },
      { name: "DataScience", bgColor: "bg-secondary bg-opacity-20", textColor: "text-secondary" },
      { name: "Advanced Visualization", bgColor: "bg-blue-100", textColor: "text-blue-800" }
    ],
    iconPath: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z",
    iconBg: "bg-secondary",
    iconColor: "text-white",
    avatarUrl: "https://ui-avatars.com/api/?name=Advanced+Analytics&background=1E40AF&color=fff&size=256",
    compatibleWith: "all sources",
    capabilities: [
      "Advanced statistical analysis methods",
      "Complex data relationship mapping",
      "Interactive and customizable dashboards",
      "Multidimensional data exploration",
      "Automated insight generation",
      "Customizable reporting with scheduling",
      "Data storytelling with narrative generation",
      "Export to multiple formats including PDF and PowerPoint"
    ],
    sampleOutputDescriptions: [
      "Interactive dashboard with drill-down capabilities",
      "Complex relationship graph with highlighted key insights"
    ],
    compatibilitySources: [
      { name: "InfluxDB Cloud", bgColor: "bg-blue-100", textColor: "text-blue-800" },
      { name: "PostgreSQL", bgColor: "bg-indigo-100", textColor: "text-indigo-800" },
      { name: "Redis Cloud", bgColor: "bg-red-100", textColor: "text-red-800" }
    ]
  }
];
