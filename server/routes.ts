import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for data sources
  app.get("/api/data-sources", (_req, res) => {
    res.json([
      {
        id: 1,
        name: "InfluxDB Cloud: Bucket Accelerator",
        connectedTime: "2 months ago",
        size: "450 GB",
        status: "Active",
        iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
        iconBg: "bg-blue-100",
        iconColor: "text-primary"
      },
      {
        id: 2,
        name: "MongoDB Atlas: Production",
        connectedTime: "5 months ago",
        size: "350 GB",
        status: "Active",
        iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600"
      },
      {
        id: 3,
        name: "Redis Cloud: Cache Server",
        connectedTime: "1 month ago",
        size: "50 GB",
        status: "Inactive",
        iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
        iconBg: "bg-red-100",
        iconColor: "text-red-600"
      }
    ]);
  });

  // API routes for statistics
  app.get("/api/stats", (_req, res) => {
    res.json([
      {
        title: "Connected Data Sources",
        value: "3",
        iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
        iconBg: "bg-primary",
        iconColor: "text-white"
      },
      {
        title: "Active Agents",
        value: "2",
        iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
        iconBg: "bg-green-500",
        iconColor: "text-white"
      },
      {
        title: "Data Available",
        value: "1.2 TB",
        iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        iconBg: "bg-accent",
        iconColor: "text-white"
      },
      {
        title: "Processing Time",
        value: "320 hrs",
        iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        iconBg: "bg-secondary",
        iconColor: "text-white"
      }
    ]);
  });

  // API routes for agents
  app.get("/api/agents", (_req, res) => {
    // Combining free and premium agents
    const agents = [
      // Free agents
      {
        id: 1,
        name: "Data Explorer",
        description: "Quickly explore and understand your data with automated analysis and visualizations. Best for getting started with data exploration.",
        type: "free",
        tags: [
          { name: "Data Analysis", bgColor: "bg-blue-100", textColor: "text-blue-800" },
          { name: "Visualization", bgColor: "bg-green-100", textColor: "text-green-800" }
        ],
        iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        compatibleWith: "all sources"
      },
      // More agents...
    ];
    
    res.json(agents);
  });

  // API route for a specific agent
  app.get("/api/agents/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // Mock response for a specific agent
    const agent = {
      id,
      name: "Data Explorer",
      description: "Quickly explore and understand your data with automated analysis and visualizations.",
      fullDescription: "Quickly explore and understand your data with automated analysis and visualizations. The Data Explorer agent helps you discover patterns, identify outliers, and understand distributions in your data without complex coding or query writing.",
      type: "free",
      // Other agent properties...
    };
    
    res.json(agent);
  });

  const httpServer = createServer(app);
  return httpServer;
}
