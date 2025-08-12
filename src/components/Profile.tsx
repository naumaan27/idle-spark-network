import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  TrendingUp,
  Edit,
  Save
} from 'lucide-react';
import { useDeviceSensors } from '@/hooks/useDeviceSensors';
import { useTokenCalculator } from '@/hooks/useTokenCalculator';
import { useToast } from '@/hooks/use-toast';
import { badges, impactStories } from '@/data/mockData';
import ImpactModal from '@/components/modals/ImpactModal';
import BadgeModal from '@/components/modals/BadgeModal';

const Profile = () => {
  const { deviceStatus } = useDeviceSensors();
  const { tokens, contributionTime, co2Saved, tasksCompleted, sustainabilityScore } = useTokenCalculator();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [impactModalOpen, setImpactModalOpen] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    location: 'Mumbai, Maharashtra',
    deviceType: 'iPhone 15 Pro'
  });
  const userTypeLabels = {
    urban: 'Urban Professional',
    rural: 'Rural Community Member',
    emergency: 'Emergency Response Worker'
  };

  const deviceMetrics = [
    { label: 'Total Contribution Time', value: `${Math.floor(contributionTime / 60)} hours`, icon: Clock },
    { label: 'Tasks Completed', value: tasksCompleted.toString(), icon: Target },
    { label: 'CO₂ Impact', value: `${co2Saved} kg saved`, icon: Globe },
    { label: 'Tokens Earned', value: tokens.toLocaleString(), icon: Zap }
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-0 shadow-eco">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-eco-gradient rounded-full flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="device">Device</Label>
                        <Input 
                          id="device"
                          value={profileData.deviceType}
                          onChange={(e) => setProfileData({...profileData, deviceType: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="eco" size="sm" onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="eco-ghost" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold text-foreground mb-1">{profileData.name}</h1>
                    <p className="text-muted-foreground mb-2">{profileData.email}</p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Urban Professional
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {profileData.location}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        {profileData.deviceType}
                      </Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isEditing && (
              <Button variant="eco-ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
          
          {!isEditing && (
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{sustainabilityScore}</div>
                <div className="text-xs text-muted-foreground">Sustainability Score</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{badges.length}</div>
                <div className="text-xs text-muted-foreground">Badges Earned</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">#{Math.floor(Math.random() * 500) + 1}</div>
                <div className="text-xs text-muted-foreground">Global Rank</div>
              </div>
            </div>
          )}
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
                  <p className="text-xs text-muted-foreground">Minimum {deviceStatus.batteryLevel > 20 ? '20%' : '30%'} to start tasks</p>
                </div>
                <Button variant="eco-ghost" size="sm">Adjust</Button>
              </div>
            <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Privacy mode</label>
                  <p className="text-xs text-muted-foreground">Zero-knowledge encryption {deviceStatus.isOnline ? 'active' : 'offline'}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-xs text-primary font-medium">{deviceStatus.isOnline ? 'Active' : 'Offline'}</span>
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
            {badges.slice(0, 3).map((badge) => (
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
            {/* Action Buttons */}
            <div className="col-span-full">
              <Button 
                variant="eco-ghost" 
                size="sm" 
                className="w-full"
                onClick={() => setBadgeModalOpen(true)}
              >
                View All Badges & Progress
              </Button>
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

        {/* Modals */}
        <ImpactModal open={impactModalOpen} onOpenChange={setImpactModalOpen} />
        <BadgeModal open={badgeModalOpen} onOpenChange={setBadgeModalOpen} userBadges={badges.slice(0, 3)} />
      </div>
    );
  };

export default Profile;