import { useState, useEffect } from 'react';

export interface DeviceStatus {
  isCharging: boolean;
  batteryLevel: number;
  isOnline: boolean;
  networkType: string;
  isIdle: boolean;
  screenTime: number;
  lastActivity: Date;
}

export const useDeviceSensors = () => {
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>({
    isCharging: false,
    batteryLevel: 0,
    isOnline: navigator.onLine,
    networkType: 'unknown',
    isIdle: false,
    screenTime: 0,
    lastActivity: new Date()
  });

  const [isSupported, setIsSupported] = useState({
    battery: 'getBattery' in navigator,
    network: 'connection' in navigator
  });

  useEffect(() => {
    let batteryUpdateInterval: NodeJS.Timeout;
    let idleCheckInterval: NodeJS.Timeout;
    let screenTimeInterval: NodeJS.Timeout;

    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBatteryInfo = () => {
          setDeviceStatus(prev => ({
            ...prev,
            isCharging: battery.charging,
            batteryLevel: Math.round(battery.level * 100)
          }));
        };

        updateBatteryInfo();
        battery.addEventListener('chargingchange', updateBatteryInfo);
        battery.addEventListener('levelchange', updateBatteryInfo);

        batteryUpdateInterval = setInterval(updateBatteryInfo, 5000);
      }).catch(() => {
        // Fallback for unsupported browsers
        setDeviceStatus(prev => ({
          ...prev,
          isCharging: Math.random() > 0.5,
          batteryLevel: Math.floor(Math.random() * 100)
        }));
      });
    } else {
      // Mock data for unsupported browsers
      batteryUpdateInterval = setInterval(() => {
        setDeviceStatus(prev => ({
          ...prev,
          isCharging: Math.random() > 0.7,
          batteryLevel: Math.max(20, Math.floor(Math.random() * 100))
        }));
      }, 10000);
    }

    // Network status
    const updateNetworkStatus = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      setDeviceStatus(prev => ({
        ...prev,
        isOnline: navigator.onLine,
        networkType: connection ? connection.effectiveType : 'unknown'
      }));
    };

    updateNetworkStatus();
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    // Idle detection
    let lastActivityTime = Date.now();
    const IDLE_THRESHOLD = 30000; // 30 seconds

    const resetActivity = () => {
      lastActivityTime = Date.now();
      setDeviceStatus(prev => ({
        ...prev,
        isIdle: false,
        lastActivity: new Date()
      }));
    };

    const checkIdle = () => {
      const now = Date.now();
      const isIdle = (now - lastActivityTime) > IDLE_THRESHOLD;
      setDeviceStatus(prev => ({
        ...prev,
        isIdle: isIdle
      }));
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, resetActivity, { passive: true });
    });

    idleCheckInterval = setInterval(checkIdle, 5000);

    // Screen time tracking
    const startTime = Date.now();
    screenTimeInterval = setInterval(() => {
      setDeviceStatus(prev => ({
        ...prev,
        screenTime: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => {
      if (batteryUpdateInterval) clearInterval(batteryUpdateInterval);
      if (idleCheckInterval) clearInterval(idleCheckInterval);
      if (screenTimeInterval) clearInterval(screenTimeInterval);
      
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
      
      events.forEach(event => {
        document.removeEventListener(event, resetActivity);
      });
    };
  }, []);

  return { deviceStatus, isSupported };
};