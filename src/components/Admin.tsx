import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ExportModal from '@/components/modals/ExportModal';
import { 
  BarChart3, 
  Users, 
  Activity, 
  Globe, 
  TrendingUp, 
  Download,
  Zap,
  Clock,
  Target,
  Shield,
  Network,
  Gauge
} from 'lucide-react';
import { adminStats, mockUsers } from '@/data/mockData';
import meshNetwork from '@/assets/mesh-network.jpg';

const Admin = () => {
  const { toast } = useToast();
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const overviewStats = [
    {
      title: 'Total Devices',
      value: adminStats.totalDevices.toLocaleString(),
      icon: Users,
      description: 'Registered in network'
    },
    {
      title: 'Active Now',
      value: adminStats.activeDevices.toLocaleString(),
      icon: Activity,
      description: 'Currently contributing'
    },
    {
      title: 'Compute Hours',
      value: adminStats.totalComputeHours.toLocaleString(),
      icon: Clock,
      description: 'Total processed'
    },
    {
      title: 'CO₂ Saved',
      value: `${adminStats.co2SavedTotal} tons`,
      icon: Globe,
      description: 'Environmental impact'
    }
  ];

  const performanceMetrics = [
    { label: 'Network Efficiency', value: adminStats.energyEfficiency, unit: '%' },
    { label: 'Task Completion Rate', value: 97.8, unit: '%' },
    { label: 'Average Response Time', value: 1.2, unit: 's' },
    { label: 'Uptime', value: 99.9, unit: '%' }
  ];

  const userTypeDistribution = [
    { type: 'Urban Users', count: 28567, percentage: 62.5, color: 'bg-primary' },
    { type: 'Rural Users', count: 12890, percentage: 28.2, color: 'bg-primary-glow' },
    { type: 'Emergency Workers', count: 4221, percentage: 9.3, color: 'bg-primary-soft' }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="relative rounded-2xl overflow-hidden bg-eco-gradient p-8 text-primary-foreground">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${meshNetwork})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Green Connect Admin Panel</h1>
          <p className="text-xl opacity-90 mb-6">ESG Dashboard & Network Monitoring</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Network className="h-5 w-5" />
                <span className="font-medium">Network Status</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-eco-pulse"></div>
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Security Level</span>
              </div>
              <span className="text-sm">Zero-knowledge encryption active</span>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Gauge className="h-5 w-5" />
                <span className="font-medium">Efficiency</span>
              </div>
              <span className="text-sm">{adminStats.energyEfficiency}% energy optimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-eco">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-primary-soft/50 p-3 rounded-xl">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Performance Metrics</span>
            </CardTitle>
            <CardDescription>Real-time network performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="font-semibold text-primary">{metric.value}{metric.unit}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>User Distribution</span>
            </CardTitle>
            <CardDescription>Breakdown by user type and location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userTypeDistribution.map((user, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{user.type}</span>
                  <span className="text-sm text-muted-foreground">{user.count.toLocaleString()}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`${user.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${user.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">{user.percentage}% of total users</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Sample Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>Sample User Profiles</span>
            </CardTitle>
            <CardDescription>Demo users showcasing diverse impact</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-eco-gradient rounded-full flex items-center justify-center text-sm font-medium text-primary-foreground">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.location}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {user.userType}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="text-center">
                    <div className="font-semibold text-primary">{user.totalTokens.toLocaleString()}</div>
                    <div className="text-muted-foreground">Tokens</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">{user.sustainabilityScore}</div>
                    <div className="text-muted-foreground">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary">{user.co2Saved}kg</div>
                    <div className="text-muted-foreground">CO₂ Saved</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ESG Reporting */}
        <Card className="border-0 shadow-eco">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>ESG Impact Report</span>
            </CardTitle>
            <CardDescription>Environmental, Social, Governance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary-soft/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Environmental Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>CO₂ Emissions Avoided</span>
                  <span className="font-medium">125.8 tons</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Energy Efficiency Improvement</span>
                  <span className="font-medium">23.4%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Renewable Energy Usage</span>
                  <span className="font-medium">89.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-primary-soft/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Social Impact</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Healthcare Diagnostics Enabled</span>
                  <span className="font-medium">12,456</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Emergency Alerts Processed</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Rural Communities Served</span>
                  <span className="font-medium">892</span>
                </div>
              </div>
            </div>

            <Button variant="eco" className="w-full" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Full ESG Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-eco">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Partner Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Analytics Dashboard</span>
            </Button>
            <Button 
              variant="eco-soft" 
              className="h-auto p-4 flex-col space-y-2"
              onClick={() => setExportModalOpen(true)}
            >
              <Download className="h-6 w-6" />
              <span>Export Reports</span>
            </Button>
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span>Security Audit</span>
            </Button>
            <Button variant="eco-soft" className="h-auto p-4 flex-col space-y-2">
              <Zap className="h-6 w-6" />
              <span>Token Management</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export Modal */}
      <ExportModal open={exportModalOpen} onOpenChange={setExportModalOpen} />
    </div>
  );
};

export default Admin;