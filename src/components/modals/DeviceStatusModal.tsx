import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Battery, 
  Wifi, 
  Clock, 
  Activity, 
  Settings, 
  CheckCircle2,
  AlertCircle,
  Zap,
  Monitor
} from 'lucide-react';
import { useDeviceSensors } from '@/hooks/useDeviceSensors';
import { useTokenCalculator } from '@/hooks/useTokenCalculator';

interface DeviceStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeviceStatusModal = ({ open, onOpenChange }: DeviceStatusModalProps) => {
  const { deviceStatus, isSupported } = useDeviceSensors();
  const { tokens, contributionTime } = useTokenCalculator();

  const getStatusColor = (isGood: boolean) => isGood ? 'text-green-600' : 'text-orange-500';
  const getStatusIcon = (isGood: boolean) => isGood ? CheckCircle2 : AlertCircle;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const isOptimalForContribution = deviceStatus.isCharging && 
                                  deviceStatus.batteryLevel > 20 && 
                                  deviceStatus.isOnline &&
                                  deviceStatus.isIdle;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Monitor className="h-5 w-5 text-primary" />
            <span>Device Status & Optimization</span>
          </DialogTitle>
          <DialogDescription>
            Monitor your device health and contribution readiness
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Status */}
          <div className={`p-4 rounded-lg border-2 ${
            isOptimalForContribution 
              ? 'border-green-500/30 bg-green-50/50' 
              : 'border-orange-500/30 bg-orange-50/50'
          }`}>
            <div className="flex items-center space-x-3 mb-2">
              {React.createElement(
                getStatusIcon(isOptimalForContribution),
                { className: `h-5 w-5 ${getStatusColor(isOptimalForContribution)}` }
              )}
              <span className="font-semibold">
                {isOptimalForContribution ? 'Ready for Contribution' : 'Optimization Needed'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {isOptimalForContribution 
                ? 'Your device is in optimal condition to contribute to climate action tasks.'
                : 'Some conditions need attention for optimal contribution performance.'
              }
            </p>
          </div>

          {/* Current Session Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary-soft/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">{formatTime(deviceStatus.screenTime)}</div>
              <div className="text-xs text-muted-foreground">Session Time</div>
            </div>
            <div className="bg-primary-soft/20 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-primary">{Math.floor(contributionTime / 60)}h</div>
              <div className="text-xs text-muted-foreground">Total Contribution</div>
            </div>
          </div>

          {/* Device Metrics */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Device Metrics</span>
            </h3>

            {/* Battery Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Battery className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Battery Level</span>
                  {deviceStatus.isCharging && (
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Charging
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-semibold">{deviceStatus.batteryLevel}%</span>
              </div>
              <Progress value={deviceStatus.batteryLevel} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {!isSupported.battery && "Battery API not supported - showing simulated data"}
              </p>
            </div>

            {/* Network Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Network Status</span>
                </div>
                <Badge variant={deviceStatus.isOnline ? "default" : "destructive"}>
                  {deviceStatus.isOnline ? 'Online' : 'Offline'}
                </Badge>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Connection Type: {deviceStatus.networkType}</span>
                <span>Last ping: {deviceStatus.isOnline ? 'Active' : 'Failed'}</span>
              </div>
            </div>

            {/* Activity Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Activity Status</span>
                </div>
                <Badge variant={deviceStatus.isIdle ? "default" : "secondary"}>
                  {deviceStatus.isIdle ? 'Idle' : 'Active'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Last activity: {deviceStatus.lastActivity.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Contribution Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center space-x-2">
              <Settings className="h-4 w-4 text-primary" />
              <span>Contribution Settings</span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Auto-contribute when charging</label>
                  <p className="text-xs text-muted-foreground">Run tasks automatically during charging</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Battery threshold</label>
                  <p className="text-xs text-muted-foreground">Minimum 20% to start tasks</p>
                </div>
                <Button variant="eco-ghost" size="sm">Adjust</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Preferred task type</label>
                  <p className="text-xs text-muted-foreground">Currently: Climate simulations</p>
                </div>
                <Button variant="eco-ghost" size="sm">Change</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Network efficiency mode</label>
                  <p className="text-xs text-muted-foreground">Optimize for low bandwidth</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="bg-accent/50 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2">Optimization Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Keep device charging overnight for maximum contribution</li>
              <li>• Close unnecessary apps to free up compute resources</li>
              <li>• Ensure stable internet connection for best performance</li>
              <li>• Enable automatic screen lock to trigger idle mode</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="eco" className="flex-1">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Optimize Now
            </Button>
            <Button variant="eco-soft" className="flex-1">
              Run Diagnostic
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceStatusModal;