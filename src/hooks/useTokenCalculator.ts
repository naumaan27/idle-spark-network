import { useState, useEffect } from 'react';
import { useDeviceSensors } from './useDeviceSensors';

export const useTokenCalculator = () => {
  const { deviceStatus } = useDeviceSensors();
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('greenconnect-tokens');
    return saved ? parseInt(saved) : 2450;
  });
  
  const [contributionTime, setContributionTime] = useState(() => {
    const saved = localStorage.getItem('greenconnect-time');
    return saved ? parseInt(saved) : 1840;
  });

  const [co2Saved, setCo2Saved] = useState(() => {
    const saved = localStorage.getItem('greenconnect-co2');
    return saved ? parseFloat(saved) : 23.7;
  });

  const [tasksCompleted, setTasksCompleted] = useState(() => {
    const saved = localStorage.getItem('greenconnect-tasks');
    return saved ? parseInt(saved) : 156;
  });

  // Token calculation based on device status
  useEffect(() => {
    const interval = setInterval(() => {
      if (deviceStatus.isCharging && deviceStatus.isIdle && deviceStatus.batteryLevel > 20) {
        // Base rate: 1 token per minute while contributing
        const baseTokenRate = 1;
        // Bonus for higher battery levels
        const batteryBonus = deviceStatus.batteryLevel > 80 ? 0.5 : 0;
        // Network bonus
        const networkBonus = deviceStatus.isOnline ? 0.3 : 0;
        
        const tokensPerMinute = baseTokenRate + batteryBonus + networkBonus;
        
        setTokens(prev => {
          const newTokens = prev + Math.floor(tokensPerMinute);
          localStorage.setItem('greenconnect-tokens', newTokens.toString());
          return newTokens;
        });

        setContributionTime(prev => {
          const newTime = prev + 1;
          localStorage.setItem('greenconnect-time', newTime.toString());
          return newTime;
        });

        // CO2 calculation: ~0.05kg per minute of compute
        setCo2Saved(prev => {
          const newCo2 = prev + 0.05;
          localStorage.setItem('greenconnect-co2', newCo2.toFixed(1));
          return parseFloat(newCo2.toFixed(1));
        });

        // Random task completion
        if (Math.random() > 0.95) { // 5% chance per minute
          setTasksCompleted(prev => {
            const newTasks = prev + 1;
            localStorage.setItem('greenconnect-tasks', newTasks.toString());
            return newTasks;
          });
        }
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [deviceStatus]);

  const calculateSustainabilityScore = () => {
    const timeScore = Math.min((contributionTime / 2000) * 40, 40); // Max 40 points for time
    const tokenScore = Math.min((tokens / 5000) * 30, 30); // Max 30 points for tokens
    const co2Score = Math.min((co2Saved / 50) * 30, 30); // Max 30 points for CO2
    
    return Math.floor(timeScore + tokenScore + co2Score);
  };

  const redeemTokens = (amount: number) => {
    if (tokens >= amount) {
      const newTokens = tokens - amount;
      setTokens(newTokens);
      localStorage.setItem('greenconnect-tokens', newTokens.toString());
      return true;
    }
    return false;
  };

  return {
    tokens,
    contributionTime,
    co2Saved,
    tasksCompleted,
    sustainabilityScore: calculateSustainabilityScore(),
    redeemTokens,
    setTokens,
    setContributionTime,
    setCo2Saved,
    setTasksCompleted
  };
};