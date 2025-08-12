import React from 'react';
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
import { currentUser, impactStories } from '@/data/mockData';
import heroDevices from '@/assets/hero-devices.jpg';
import climateIcon from '@/assets/climate-icon.jpg';

const Dashboard = () => {
  const stats = [
    {
      title: 'Sustainability Score',
      value: currentUser.sustainabilityScore,
      suffix: '/100',
      icon: Leaf,
      description: 'Your environmental impact rating'
    },
    {
      title: 'Total Tokens',
      value: currentUser.totalTokens.toLocaleString(),
      icon: Zap,
      description: 'Earned through contributions'
    },
    {
      title: 'Contribution Time',
      value: Math.floor(currentUser.totalContributionMinutes / 60),
      suffix: ' hours',
      icon: Clock,
      description: 'Device compute time donated'
    },
    {
      title: 'CO₂ Saved',
      value: currentUser.co2Saved,
      suffix: ' kg',
      icon: Globe,
      description: 'Environmental impact achieved'
    }
  ];

  const recentBadges = currentUser.badges.slice(-2);

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
            Welcome back, {currentUser.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xl opacity-90 mb-6">
            Your {currentUser.deviceType} is making a difference while you sleep
          </p>
          
          {currentUser.isIdle && currentUser.currentTask ? (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{currentUser.currentTask.title}</h3>
                <span className="text-sm opacity-75">
                  {currentUser.currentTask.estimatedMinutes} min remaining
                </span>
              </div>
              <p className="text-sm opacity-90 mb-3">{currentUser.currentTask.description}</p>
              <Progress value={currentUser.currentTask.progress} className="h-2" />
              <div className="flex justify-between text-xs mt-2 opacity-75">
                <span>{currentUser.currentTask.progress}% complete</span>
                <span>+{currentUser.currentTask.tokensReward} tokens • {currentUser.currentTask.co2Impact}kg CO₂</span>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Device ready for next contribution</span>
              </div>
            </div>
          )}

          <Button variant="eco-soft" size="lg" className="bg-white/20 hover:bg-white/30">
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
            <Button variant="eco-ghost" size="sm" className="w-full">
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

            <Button variant="eco-ghost" size="sm" className="w-full">
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
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
              <CheckCircle2 className="h-6 w-6" />
              <span>Check Device Status</span>
              <span className="text-xs opacity-75">Optimize contribution settings</span>
            </Button>
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
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
    </div>
  );
};

export default Dashboard;