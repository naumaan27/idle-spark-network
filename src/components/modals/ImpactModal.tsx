import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Target, Zap, Globe } from 'lucide-react';
import { ImpactStory } from '@/types';
import { impactStories } from '@/data/mockData';

interface ImpactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImpactModal = ({ open, onOpenChange }: ImpactModalProps) => {
  const [selectedStory, setSelectedStory] = React.useState<ImpactStory | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Your Complete Impact Story</span>
          </DialogTitle>
          <DialogDescription>
            Detailed view of all the real-world changes enabled by your device contributions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Impact Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Stories Created</div>
            </div>
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">3.2TB</div>
              <div className="text-sm text-muted-foreground">Data Processed</div>
            </div>
            <div className="bg-primary-soft/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Countries Helped</div>
            </div>
          </div>

          {/* Story Categories */}
          <div className="flex space-x-2 mb-4">
            {['All', 'Healthcare', 'Climate', 'Emergency'].map((category) => (
              <Button
                key={category}
                variant="eco-ghost"
                size="sm"
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Impact Stories Grid */}
          <div className="space-y-4">
            {impactStories.map((story) => (
              <div
                key={story.id}
                className="border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors"
                onClick={() => setSelectedStory(story)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {story.type}
                    </Badge>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{story.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{story.date.toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">{story.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{story.description}</p>
                
                <div className="bg-primary-soft/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Your contribution:</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{story.userContribution}</p>
                </div>
              </div>
            ))}

            {/* Additional Mock Stories */}
            <div className="border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">climate</Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Amazon Rainforest, Brazil</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Jan 28, 2024</span>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Deforestation Monitoring Success</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your device helped process satellite imagery that detected illegal logging activity, 
                leading to intervention that saved 50 hectares of rainforest.
              </p>
              
              <div className="bg-primary-soft/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Your contribution:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Analyzed 2.1GB of satellite imagery data
                </p>
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">healthcare</Badge>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Kenya Rural Clinics</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Jan 25, 2024</span>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Malaria Detection Network</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Your compute power helped train an AI model that now detects malaria from blood samples 
                with 98.5% accuracy, enabling faster treatment in remote areas.
              </p>
              
              <div className="bg-primary-soft/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Your contribution:</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Processed 845 training samples over 6.2 hours
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="eco" className="flex-1">
              <Globe className="h-4 w-4 mr-2" />
              Share Your Impact
            </Button>
            <Button variant="eco-soft" className="flex-1">
              Download Impact Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImpactModal;