import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "../../data/mockData";
import { ChevronDown, ChevronUp, AlertTriangle, Check, TrendingUp, TrendingDown, BarChart, HelpCircle } from "lucide-react";

interface DeviceReportProps {
  agent: Agent;
}

export default function DeviceReport({ agent }: DeviceReportProps) {
  // Mock data for the device report
  const reportData = {
    generatedAt: new Date().toLocaleString(),
    deviceStatus: "Healthy",
    deviceHealth: 92,
    anomaliesDetected: 2,
    predictions: [
      { metric: "CPU Temperature", trend: "stable", prediction: "No issues expected for the next 30 days" },
      { metric: "Memory Usage", trend: "increasing", prediction: "May reach 85% in 14 days, consider optimization" },
    ],
    anomalies: [
      { 
        id: 1, 
        metric: "Disk I/O", 
        severity: "low", 
        timestamp: "2025-03-28 14:23:47", 
        description: "Unusual spike in disk write operations (234 MB/s vs avg 42 MB/s)",
        recommendation: "Monitor for recurrence, no immediate action needed"
      },
      { 
        id: 2, 
        metric: "Network", 
        severity: "medium", 
        timestamp: "2025-03-28 18:11:05", 
        description: "Sustained high outbound traffic (98% capacity for 45 minutes)",
        recommendation: "Investigate possible data exfiltration or backup processes"
      }
    ],
    performanceMetrics: [
      { name: "CPU", current: 42, change: -3, status: "normal" },
      { name: "Memory", current: 67, change: +12, status: "normal" },
      { name: "Disk", current: 78, change: +5, status: "normal" },
      { name: "Network", current: 54, change: +27, status: "warning" },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Device Daily Report</h2>
        <Badge variant="outline" className="text-xs">
          Generated at {reportData.generatedAt}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge 
                className={`px-3 py-1 ${
                  reportData.deviceStatus === "Healthy" 
                    ? "bg-green-100 text-green-800" 
                    : reportData.deviceStatus === "Warning" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                }`}
              >
                {reportData.deviceStatus === "Healthy" && <Check className="w-4 h-4 mr-1" />}
                {reportData.deviceStatus === "Warning" && <AlertTriangle className="w-4 h-4 mr-1" />}
                {reportData.deviceStatus === "Critical" && <AlertTriangle className="w-4 h-4 mr-1" />}
                {reportData.deviceStatus}
              </Badge>
              <span className="text-2xl font-bold">{reportData.deviceHealth}%</span>
            </div>
            <Progress value={reportData.deviceHealth} className="h-2 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Anomalies Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge 
                className={`px-3 py-1 ${
                  reportData.anomaliesDetected === 0 
                    ? "bg-green-100 text-green-800" 
                    : reportData.anomaliesDetected < 3 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-red-100 text-red-800"
                }`}
              >
                {reportData.anomaliesDetected === 0 && "None"}
                {reportData.anomaliesDetected > 0 && `${reportData.anomaliesDetected} Found`}
              </Badge>
              {reportData.anomaliesDetected > 0 ? (
                <AlertTriangle className="w-6 h-6 text-yellow-500" />
              ) : (
                <Check className="w-6 h-6 text-green-500" />
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {reportData.anomaliesDetected === 0 
                ? "No anomalies detected in the last 24 hours"
                : `${reportData.anomaliesDetected} anomalies detected in the last 24 hours`}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {reportData.performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">{metric.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${
                      metric.status === "normal" ? "text-green-600" : "text-yellow-600"
                    }`}>
                      {metric.current}%
                    </span>
                    <span className={`flex items-center text-xs ${
                      metric.change > 0 ? "text-red-500" : "text-green-500"
                    }`}>
                      {metric.change > 0 ? (
                        <><ChevronUp className="w-3 h-3" />{Math.abs(metric.change)}%</>
                      ) : (
                        <><ChevronDown className="w-3 h-3" />{Math.abs(metric.change)}%</>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="anomalies" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="anomalies" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detected Anomalies</CardTitle>
              <CardDescription>
                Unusual patterns detected in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reportData.anomalies.length === 0 ? (
                <div className="text-center py-6">
                  <Check className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="mt-2 text-gray-500">No anomalies detected</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reportData.anomalies.map((anomaly) => (
                    <Card key={anomaly.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{anomaly.metric}</h3>
                              <Badge className={
                                anomaly.severity === "low" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : anomaly.severity === "medium" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : "bg-red-100 text-red-800"
                              }>
                                {anomaly.severity}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{anomaly.timestamp}</p>
                          </div>
                          <AlertTriangle className={
                            anomaly.severity === "low" 
                              ? "w-5 h-5 text-blue-500" 
                              : anomaly.severity === "medium" 
                                ? "w-5 h-5 text-yellow-500" 
                                : "w-5 h-5 text-red-500"
                          } />
                        </div>
                        <p className="mt-2 text-sm">{anomaly.description}</p>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-start gap-1">
                            <HelpCircle className="w-4 h-4 text-primary mt-0.5" />
                            <p className="text-sm">{anomaly.recommendation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="predictions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Future Predictions</CardTitle>
              <CardDescription>
                Forecasted behavior based on historical trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.predictions.map((prediction, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{prediction.metric}</h3>
                          <div className="flex items-center mt-1">
                            <Badge className={
                              prediction.trend === "decreasing" 
                                ? "bg-green-100 text-green-800" 
                                : prediction.trend === "stable" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-yellow-100 text-yellow-800"
                            }>
                              {prediction.trend === "decreasing" && <TrendingDown className="w-3 h-3 mr-1" />}
                              {prediction.trend === "stable" && <BarChart className="w-3 h-3 mr-1" />}
                              {prediction.trend === "increasing" && <TrendingUp className="w-3 h-3 mr-1" />}
                              {prediction.trend}
                            </Badge>
                          </div>
                        </div>
                        {prediction.trend === "decreasing" && <TrendingDown className="w-5 h-5 text-green-500" />}
                        {prediction.trend === "stable" && <BarChart className="w-5 h-5 text-blue-500" />}
                        {prediction.trend === "increasing" && <TrendingUp className="w-5 h-5 text-yellow-500" />}
                      </div>
                      <p className="mt-2 text-sm">{prediction.prediction}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}