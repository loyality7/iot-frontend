import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lightbulb, Wifi, WifiOff } from 'lucide-react';

const LedControl = () => {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({
    isOnline: false,
    lastSeen: null,
    ipAddress: null
  });
  const [showSetupInstructions, setShowSetupInstructions] = useState(false);

  const API_URL = 'http://YOUR_EC2_IP:3000';

  useEffect(() => {
    fetchLedStatus();
    const interval = setInterval(fetchDeviceStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchLedStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/led-status`);
      const data = await response.json();
      setIsOn(data.status);
    } catch (error) {
      console.error('Error fetching LED status:', error);
    }
  };

  const fetchDeviceStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/device-status`);
      const data = await response.json();
      setDeviceStatus(data);
    } catch (error) {
      console.error('Error fetching device status:', error);
    }
  };

  const toggleLed = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/led-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: !isOn }),
      });
      const data = await response.json();
      setIsOn(data.status);
    } catch (error) {
      console.error('Error updating LED status:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-4 w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className={isOn ? "text-yellow-400" : "text-gray-400"} />
              LED Control
            </div>
            {deviceStatus.isOnline ? (
              <Wifi className="text-green-500" />
            ) : (
              <WifiOff className="text-red-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>LED Status: {isOn ? 'ON' : 'OFF'}</span>
              <Switch
                checked={isOn}
                onCheckedChange={toggleLed}
                disabled={isLoading || !deviceStatus.isOnline}
              />
            </div>
            
            <div className="text-sm text-gray-500">
              {deviceStatus.isOnline ? (
                <p>Device online at {deviceStatus.ipAddress}</p>
              ) : (
                <Alert>
                  <AlertDescription>
                    Device offline. Check connection or configure WiFi.
                    <button 
                      className="ml-2 text-blue-500 underline"
                      onClick={() => setShowSetupInstructions(true)}
                    >
                      Show setup instructions
                    </button>
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {showSetupInstructions && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">WiFi Setup Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Power on your NodeMCU device</li>
                  <li>Connect to the "NodeMCU-LED" WiFi network from your phone/computer</li>
                  <li>A configuration page should open automatically (or visit 192.168.4.1)</li>
                  <li>Enter your WiFi credentials and the server URL: {API_URL}</li>
                  <li>Click Save and wait for the device to connect</li>
                </ol>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LedControl;
