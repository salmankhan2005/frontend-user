import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GlowCard } from '@/components/GlowCard';
import { 
  User, Settings, Bell, Crown, HelpCircle, 
  LogOut, Share2, ChevronRight, BarChart3, CreditCard, MessageSquare, Mail, AlertTriangle 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const More = () => {
  const { isAuthenticated, isGuest, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const menuItems = [
    { icon: User, label: 'Profile', path: '/profile', auth: true },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', auth: true },
    { icon: CreditCard, label: 'Billing & Subscription', path: '/billing', auth: true },
    { icon: Mail, label: 'Email Settings', path: '/email-settings', auth: false },
    { icon: AlertTriangle, label: 'Support Notifications', path: '/admin-notifications', auth: false },
    { icon: Settings, label: 'Settings', path: '/settings', auth: false },
    { icon: Bell, label: 'Notifications', path: '/notifications', auth: false },
    { icon: Crown, label: 'Go Premium', path: '/premium', auth: false, highlight: true },
    { icon: HelpCircle, label: 'Help & QA', path: '/help', auth: false },
    { icon: MessageSquare, label: 'Enhanced Support', path: '/support', auth: false },
  ];

  const professionalItems = [
    { icon: Share2, label: 'Meal Sharing', path: '/meal-sharing' },
    { icon: User, label: 'Client View', path: '/client-view' },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-24">
      <Header 
        title="More" 
        showNotifications={false} 
        showProfile={false}
        showBackButton={true}
        onBackClick={() => navigate(-1)}
      />
      
      <main className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 max-w-4xl mx-auto">
        {/* User Card */}
        <GlowCard className="p-6 mb-6 glass-panel animate-fade-in bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg">
                {isGuest ? 'Guest User' : isAuthenticated ? 'John Doe' : 'Welcome'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isGuest ? 'Using guest mode' : isAuthenticated ? 'john@example.com' : 'Sign in to continue'}
              </p>
            </div>
            {!isAuthenticated && !isGuest && (
              <Link to="/auth">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </GlowCard>

        {/* Main Menu */}
        <div className="space-y-4 mb-6">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            if (item.auth && !isAuthenticated) return null;
            
            return (
              <Link to={item.path} key={item.label}>
                <GlowCard className={`p-4 hover:bg-muted/50 transition-all duration-300 animate-fade-up hover:scale-[1.02] ${
                  item.highlight ? 'bg-gradient-to-r from-secondary/10 to-primary/10 border-primary/30 shadow-md' : 'bg-gradient-to-r from-card to-card/80'
                }`} style={{ animationDelay: `${idx * 0.05}s` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-medium ${item.highlight ? 'text-primary' : ''}`}>
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </GlowCard>
              </Link>
            );
          })}
        </div>

        {/* Professional Features (only for authenticated users) */}
        {isAuthenticated && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-2">
              PROFESSIONAL
            </h3>
            <div className="space-y-2">
              {professionalItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link to={item.path} key={item.label}>
                    <GlowCard className="p-4 hover:bg-muted/50 transition-all duration-300 animate-fade-up hover:scale-[1.02] bg-gradient-to-r from-card to-card/80"
                          style={{ animationDelay: `${idx * 0.05}s` }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </GlowCard>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Logout Button */}
        {(isAuthenticated || isGuest) && (
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="w-full gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            {isGuest ? 'Exit Guest Mode' : 'Sign Out'}
          </Button>
        )}

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          FreshPlate v1.0.0
        </p>
      </main>

      <BottomNav />
    </div>
  );
};
