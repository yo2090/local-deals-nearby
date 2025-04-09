
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthModal from './auth/AuthModal';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'customer' | 'business'>('customer');

  const isActive = (path: string) => location.pathname === path;

  const openAuthModal = (type: 'customer' | 'business') => {
    setAuthType(type);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/discover', label: 'Discover Deals' },
    { path: '/dashboard', label: 'Business Dashboard' },
  ];

  return (
    <>
      <header className="bg-white shadow-sm w-full z-10 relative">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full p-2 deal-gradient text-white">
              <MapPin className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg md:text-xl text-gray-800">LocalDeals</span>
          </Link>

          {isMobile ? (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          ) : (
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(link.path) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => openAuthModal('business')}
                >
                  Business Login
                </Button>
                <Button 
                  onClick={() => openAuthModal('customer')}
                >
                  Customer Login
                </Button>
              </div>
            </nav>
          )}
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-background z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="rounded-full p-2 deal-gradient text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="font-bold text-xl text-gray-800">LocalDeals</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "py-2 text-base font-medium transition-colors hover:text-primary",
                    isActive(link.path) 
                      ? "text-primary" 
                      : "text-muted-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => openAuthModal('business')}
                >
                  Business Login
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => openAuthModal('customer')}
                >
                  Customer Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
        type={authType}
      />
    </>
  );
};

export default Header;
