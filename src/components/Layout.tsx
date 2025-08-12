import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Leaf, BarChart3, User, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { currentUser } from '@/data/mockData';

const Layout = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: BarChart3, label: 'Dashboard' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/admin', icon: Settings, label: 'Admin' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-eco-gradient p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Green Connect</h1>
                <p className="text-xs text-muted-foreground">Decentralized Climate Action</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Contribution Status */}
              {currentUser.isIdle && currentUser.currentTask && (
                <div className="flex items-center space-x-2 bg-primary-soft/30 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-eco-pulse"></div>
                  <span className="text-sm text-primary font-medium">
                    Running {currentUser.currentTask.type} task...
                  </span>
                </div>
              )}

              {/* Token Count */}
              <div className="flex items-center space-x-1 bg-card border rounded-full px-3 py-1">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{currentUser.totalTokens.toLocaleString()}</span>
              </div>

              {/* User Avatar */}
              <div className="w-8 h-8 bg-eco-gradient rounded-full flex items-center justify-center text-primary-foreground font-medium text-sm">
                {currentUser.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-card/30 border-r border-border min-h-[calc(100vh-4rem)] p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-eco ${
                  isActive(item.to)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;