import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "../../data/mockData";
import { ChevronDown, ChevronUp, AlertTriangle, Check, TrendingUp, TrendingDown, BarChart, HelpCircle, Loader2 } from "lucide-react";

interface DeviceReportProps {
  agent: Agent;
}

export default function DeviceReport({ agent }: DeviceReportProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300); // 2.3 seconds of loading time
    
    return () => clearTimeout(timer);
  }, []);

  // Mock data for the device report focused on vessel motor IMU
  const reportData = {
    generatedAt: new Date().toLocaleString(),
    deviceStatus: "Healthy",
    deviceHealth: 92,
    anomaliesDetected: 2,
    predictions: [
      { metric: "Gyroscope Stability", trend: "stable", prediction: "No issues expected for the next 30 days" },
      { metric: "Motor Vibration", trend: "increasing", prediction: "May reach threshold in 14 days, consider maintenance inspection" },
    ],
    anomalies: [
      { 
        id: 1, 
        metric: "Acceleration Yaw", 
        severity: "low", 
        timestamp: "2025-03-28 14:23:47", 
        description: "Unusual pattern in yaw axis acceleration (0.42g vs avg 0.25g)",
        recommendation: "Monitor for recurrence during next operational cycle"
      },
      { 
        id: 2, 
        metric: "Motor Resonance", 
        severity: "medium", 
        timestamp: "2025-03-28 18:11:05", 
        description: "Vibration frequency 58.3Hz detected consistently for 45 minutes at full throttle",
        recommendation: "Schedule preventative maintenance to inspect motor bearings"
      }
    ],
    performanceMetrics: [
      { name: "IMU Temperature", current: 42, change: -3, status: "normal" },
      { name: "Gyro Drift", current: 0.27, change: +0.05, status: "normal", unit: "°/h" },
      { name: "Motor Vibration", current: 28, change: +5, status: "normal" },
      { name: "Propeller Balance", current: 94, change: -2, status: "normal" },
    ]
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-gray-700">Report creation in process...</p>
        <Progress value={65} className="w-64 h-2" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vessel Motor IMU Report</h2>
        <Badge variant="outline" className="text-xs">
          Generated at {reportData.generatedAt}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Motor Status</CardTitle>
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
            <CardTitle className="text-lg">IMU Metrics</CardTitle>
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
                      {metric.current}{metric.unit ? metric.unit : '%'}
                    </span>
                    <span className={`flex items-center text-xs ${
                      metric.change > 0 ? "text-red-500" : "text-green-500"
                    }`}>
                      {metric.change > 0 ? (
                        <><ChevronUp className="w-3 h-3" />{Math.abs(metric.change)}{metric.unit ? metric.unit : '%'}</>
                      ) : (
                        <><ChevronDown className="w-3 h-3" />{Math.abs(metric.change)}{metric.unit ? metric.unit : '%'}</>
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