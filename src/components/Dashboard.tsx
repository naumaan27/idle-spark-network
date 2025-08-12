import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Zap, 
  Clock, 
  Award, 
  TrendingUp, 
  Globe,
  Activity,
  Target,
  CheckCircle2
} from 'lucide-react';
import { useDeviceSensors } from '@/hooks/useDeviceSensors';
import { useTokenCalculator } from '@/hooks/useTokenCalculator';
import { useToast } from '@/hooks/use-toast';
import { impactStories, badges } from '@/data/mockData';
import ImpactModal from '@/components/modals/ImpactModal';
import BadgeModal from '@/components/modals/BadgeModal';
import DeviceStatusModal from '@/components/modals/DeviceStatusModal';
import heroDevices from '@/assets/hero-devices.jpg';

const Dashboard = () => {
  const { deviceStatus } = useDeviceSensors();
  const { tokens, contributionTime, co2Saved, tasksCompleted, sustainabilityScore } = useTokenCalculator();
  const { toast } = useToast();
  
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const stats = [
    {
      title: 'Sustainability Score',
      value: sustainabilityScore,
      suffix: '/100',
      icon: Leaf,
      description: 'Your environmental impact rating'
    },
    {
      title: 'Total Tokens',
      value: tokens.toLocaleString(),
      icon: Zap,
      description: 'Earned through contributions'
    },
    {
      title: 'Contribution Time',
      value: Math.floor(contributionTime / 60),
      suffix: ' hours',
      icon: Clock,
      description: 'Device compute time donated'
    },
    {
      title: 'CO₂ Saved',
      value: co2Saved,
      suffix: ' kg',
      icon: Globe,
      description: 'Environmental impact achieved'
    }
  ];

  const recentBadges = badges.slice(0, 2);

  const handleRedeemTokens = () => {
    toast({
      title: "Token Redemption",
      description: "Feature coming soon! You'll be able to redeem tokens for rewards.",
    });
  };

  const getCurrentTask = () => {
    if (deviceStatus.isCharging && deviceStatus.isIdle && deviceStatus.batteryLevel > 20) {
      const taskType = deviceStatus.batteryLevel > 80 ? 'climate' : 'healthcare';
      return {
        title: taskType === 'climate' ? 'Climate Simulation Analysis' : 'AI Health Diagnostic',
        description: taskType === 'climate' 
          ? 'Analyzing atmospheric data for carbon capture optimization'
          : 'Processing medical imaging for rural clinic diagnostics',
        progress: Math.floor(Math.random() * 40) + 40,
        estimatedMinutes: Math.floor(Math.random() * 30) + 10,
        tokensReward: Math.floor(Math.random() * 30) + 20,
        co2Impact: Math.random() * 2 + 1
      };
    }
    return null;
  };

  const currentTask = getCurrentTask();

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-eco-gradient p-8 text-primary-foreground">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroDevices})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, Arjun! 👋
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Your device is making a difference while you sleep
          </p>
          
          {currentTask ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{currentTask.title}</h3>
                <span className="text-sm opacity-75">
                  {currentTask.estimatedMinutes} min remaining
                </span>
              </div>
              <p className="text-sm opacity-90 mb-3">{currentTask.description}</p>
              <Progress value={currentTask.progress} className="h-2" />
              <div className="flex justify-between text-xs mt-2 opacity-75">
                <span>{currentTask.progress}% complete</span>
                <span>+{currentTask.tokensReward} tokens • {currentTask.co2Impact.toFixed(1)}kg CO₂</span>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>
                  {deviceStatus.isCharging 
                    ? 'Device charging - ready for next contribution' 
                    : 'Connect charger to start contributing'
                  }
                </span>
              </div>
            </div>
          )}

          <Button 
            variant="eco-soft" 
            size="lg" 
            className="bg-white/20 hover:bg-white/30"
            onClick={() => setImpactModalOpen(true)}
          >
            View Impact Details
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-eco">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-soft/50 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}{stat.suffix}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Impact Stories */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Your Impact Stories</span>
            </CardTitle>
            <CardDescription>
              Real-world changes enabled by your contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {impactStories.slice(0, 2).map((story) => (
              <div key={story.id} className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {story.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {story.date.toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-semibold text-sm">{story.title}</h4>
                <p className="text-sm text-muted-foreground">{story.description}</p>
                <p className="text-xs text-primary font-medium">
                  Your contribution: {story.userContribution}
                </p>
              </div>
            ))}
            <Button 
              variant="eco-ghost" 
              size="sm" 
              className="w-full"
              onClick={() => setImpactModalOpen(true)}
            >
              View All Impact Stories
            </Button>
          </CardContent>
        </Card>

        {/* Achievements & Progress */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Achievements</span>
            </CardTitle>
            <CardDescription>
              Badges earned through your contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {recentBadges.map((badge) => (
                <div key={badge.id} className="bg-primary-soft/30 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-medium">{badge.name}</p>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress to Climate Champion</span>
                <span className="text-sm text-muted-foreground">73%</span>
              </div>
              <Progress value={73} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Complete 27 more climate tasks to unlock this badge
              </p>
            </div>

            <Button 
              variant="eco-ghost" 
              size="sm" 
              className="w-full"
              onClick={() => setBadgeModalOpen(true)}
            >
              View All Badges
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="eco-soft" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setDeviceModalOpen(true)}
            >
              <CheckCircle2 className="h-6 w-6" />
              <span>Check Device Status</span>
              <span className="text-xs opacity-75">Optimize contribution settings</span>
            </Button>
            <Button 
              variant="eco-soft" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={handleRedeemTokens}
            >
              <Globe className="h-6 w-6" />
              <span>Redeem Tokens</span>
              <span className="text-xs opacity-75">Exchange for rewards</span>
            </Button>
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
              <Award className="h-6 w-6" />
              <span>Share Impact</span>
              <span className="text-xs opacity-75">Post your achievements</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ImpactModal open={impactModalOpen} onOpenChange={setImpactModalOpen} />
      <BadgeModal open={badgeModalOpen} onOpenChange={setBadgeModalOpen} userBadges={badges.slice(0, 3)} />
      <DeviceStatusModal open={deviceModalOpen} onOpenChange={setDeviceModalOpen} />
    </div>
  );
};

export default Dashboard;