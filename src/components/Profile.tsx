import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  MapPin, 
  Smartphone, 
  Award, 
  Calendar,
  Settings,
  Shield,
  Zap,
  Globe,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { currentUser, impactStories } from '@/data/mockData';

const Profile = () => {
  const userTypeLabels = {
    urban: 'Urban Professional',
    rural: 'Rural Community Member',
    emergency: 'Emergency Response Worker'
  };

  const deviceMetrics = [
    { label: 'Total Contribution Time', value: `${Math.floor(currentUser.totalContributionMinutes / 60)} hours`, icon: Clock },
    { label: 'Tasks Completed', value: currentUser.tasksCompleted.toString(), icon: Target },
    { label: 'CO₂ Impact', value: `${currentUser.co2Saved} kg saved`, icon: Globe },
    { label: 'Tokens Earned', value: currentUser.totalTokens.toLocaleString(), icon: Zap }
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-eco">
        <CardContent className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-eco-gradient rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {currentUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-1">{currentUser.name}</h1>
              <p className="text-muted-foreground mb-2">{currentUser.email}</p>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {userTypeLabels[currentUser.userType]}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {currentUser.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Smartphone className="h-3 w-3" />
                  {currentUser.deviceType}
                </Badge>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.sustainabilityScore}</div>
                  <div className="text-xs text-muted-foreground">Sustainability Score</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentUser.badges.length}</div>
                  <div className="text-xs text-muted-foreground">Badges Earned</div>
                </div>
                <Separator orientation="vertical" className="h-8" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">#{Math.floor(Math.random() * 500) + 1}</div>
                  <div className="text-xs text-muted-foreground">Global Rank</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Metrics */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>Contribution Metrics</span>
            </CardTitle>
            <CardDescription>Your device's impact on climate action</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deviceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-soft/50 p-2 rounded-lg">
                    <metric.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className="font-semibold text-primary">{metric.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <span>Device Settings</span>
            </CardTitle>
            <CardDescription>Configure your contribution preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-contribute when charging</label>
                <p className="text-xs text-muted-foreground">Run tasks automatically during charging</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Priority task type</label>
                <p className="text-xs text-muted-foreground">Climate simulations preferred</p>
              </div>
              <Button variant="eco-ghost" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Battery threshold</label>
                <p className="text-xs text-muted-foreground">Minimum 80% to start tasks</p>
              </div>
              <Button variant="eco-ghost" size="sm">Adjust</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Privacy mode</label>
                <p className="text-xs text-muted-foreground">Zero-knowledge encryption enabled</p>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs text-primary font-medium">Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Collection */}
      <Card className="border-0 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Badge Collection</span>
          </CardTitle>
          <CardDescription>Achievements unlocked through your contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentUser.badges.map((badge) => (
              <div key={badge.id} className="bg-primary-soft/30 rounded-xl p-4 text-center border">
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{badge.unlockedAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            {/* Next Badge to Unlock */}
            <div className="bg-muted/30 rounded-xl p-4 text-center border-2 border-dashed border-muted">
              <div className="text-3xl mb-2 opacity-50">🏆</div>
              <h4 className="font-semibold text-sm mb-1 text-muted-foreground">Climate Champion</h4>
              <p className="text-xs text-muted-foreground mb-2">Complete 27 more climate tasks</p>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: '73%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impact History */}
      <Card className="border-0 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Impact History</span>
          </CardTitle>
          <CardDescription>Stories of real-world change enabled by your contributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {impactStories.map((story) => (
            <div key={story.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {story.type}
                </Badge>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{story.location}</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>{story.date.toLocaleDateString()}</span>
                </div>
              </div>
              <h4 className="font-semibold mb-2">{story.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
              <div className="bg-primary-soft/20 rounded-lg p-3">
                <p className="text-sm text-primary font-medium">
                  <span className="opacity-75">Your contribution:</span> {story.userContribution}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;