import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, Target, Share2 } from 'lucide-react';
import { Badge as BadgeType } from '@/types';
import { badges } from '@/data/mockData';

interface BadgeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userBadges: BadgeType[];
}

const BadgeModal = ({ open, onOpenChange, userBadges }: BadgeModalProps) => {
  const allBadges = [
    ...badges,
    {
      id: '5',
      name: 'Climate Champion',
      description: 'Contributed to 500+ climate simulations',
      icon: '🏆',
      unlockedAt: new Date('2024-03-01')
    },
    {
      id: '6',
      name: 'Data Scientist',
      description: 'Processed over 1TB of scientific data',
      icon: '🔬',
      unlockedAt: new Date('2024-03-15')
    },
    {
      id: '7',
      name: 'Network Hero',
      description: 'Maintained uptime for 72+ consecutive hours',
      icon: '⚡',
      unlockedAt: new Date('2024-04-01')
    },
    {
      id: '8',
      name: 'Global Impact',
      description: 'Contributions helped projects in 10+ countries',
      icon: '🌍',
      unlockedAt: new Date('2024-04-15')
    }
  ];

  const userBadgeIds = userBadges.map(b => b.id);
  
  const unlockedBadges = allBadges.filter(badge => userBadgeIds.includes(badge.id));
  const lockedBadges = allBadges.filter(badge => !userBadgeIds.includes(badge.id));

  const progressBadges = [
    {
      ...allBadges.find(b => b.name === 'Climate Champion')!,
      progress: 73,
      requirement: 'Complete 27 more climate tasks'
    },
    {
      ...allBadges.find(b => b.name === 'Data Scientist')!,
      progress: 45,
      requirement: 'Process 550GB more data'
    },
    {
      ...allBadges.find(b => b.name === 'Network Hero')!,
      progress: 28,
      requirement: 'Maintain uptime for 52 more hours'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-primary" />
            <span>Achievement Collection</span>
          </DialogTitle>
          <DialogDescription>
            Track your progress and unlock new badges through your contributions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Achievement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{unlockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">{lockedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Available</div>
            </div>
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">#{Math.floor(Math.random() * 500) + 1}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </div>
          </div>

          {/* Unlocked Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-primary" />
              <span>Earned Badges</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-primary-soft/30 rounded-xl p-4 text-center border-2 border-primary/20 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-eco-gradient opacity-10"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                    <div className="flex items-center justify-center space-x-1 text-xs text-primary">
                      <Calendar className="h-3 w-3" />
                      <span>{badge.unlockedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Towards Next Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>In Progress</span>
            </h3>
            <div className="space-y-4">
              {progressBadges.map((badge, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-2xl opacity-60">{badge.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {badge.progress}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Progress value={badge.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Locked Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Available Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {lockedBadges.filter(b => !progressBadges.find(p => p.id === b.id)).map((badge) => (
                <div
                  key={badge.id}
                  className="bg-muted/30 rounded-xl p-4 text-center border-2 border-dashed border-muted relative"
                >
                  <div className="text-3xl mb-2 opacity-40">{badge.icon}</div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  <div className="mt-2">
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="eco" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Achievements
            </Button>
            <Button variant="eco-soft" className="flex-1">
              View Leaderboard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeModal;