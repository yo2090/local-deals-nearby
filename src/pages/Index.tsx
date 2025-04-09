
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { MapPin, Store, Search, Clock, ShieldCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-deal-primary" />,
      title: 'Location-Based',
      description: 'Discover deals from businesses near your current location.'
    },
    {
      icon: <Store className="h-8 w-8 text-deal-primary" />,
      title: 'Local Businesses',
      description: 'Support small businesses in your community with exclusive offers.'
    },
    {
      icon: <Search className="h-8 w-8 text-deal-primary" />,
      title: 'Easy Discovery',
      description: 'Find deals easily with our intuitive discovery interface.'
    },
    {
      icon: <Clock className="h-8 w-8 text-deal-primary" />,
      title: 'Limited Time',
      description: 'Time-sensitive offers encourage immediate action.'
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-deal-primary" />,
      title: 'Verified Businesses',
      description: 'All businesses are verified for your peace of mind.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="deal-gradient text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                Discover Local Deals Around You
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                Connect with local businesses offering exclusive deals in your area. 
                Save money while supporting your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-deal-primary hover:bg-gray-100"
                  asChild
                >
                  <Link to="/discover">Find Nearby Deals</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link to="/dashboard">I'm a Business</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              How LocalDeals Works
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-lg transition-all hover:shadow-md"
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="bg-deal-light rounded-xl p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex-1 mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Start?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Whether you're a business looking to attract new customers or a shopper searching for great deals, 
                    LocalDeals has you covered.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild>
                      <Link to="/discover">Start Exploring</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard">Business Dashboard</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="rounded-full p-6 bg-deal-primary/10">
                    <MapPin className="h-16 w-16 text-deal-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="rounded-full p-2 bg-white">
                  <MapPin className="h-4 w-4 text-deal-primary" />
                </div>
                <span className="font-bold text-lg">LocalDeals</span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} LocalDeals. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
