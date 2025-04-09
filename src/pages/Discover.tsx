
import React, { useState } from 'react';
import Header from '@/components/Header';
import OfferCard, { Offer } from '@/components/offers/OfferCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Search, SlidersHorizontal, XCircle } from 'lucide-react';
import LocationMap from '@/components/map/LocationMap';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data
const sampleOffers: Offer[] = [
  {
    id: '1',
    title: '25% Off All Desserts',
    description: 'Enjoy 25% off all desserts on our menu. Valid for dine-in customers only.',
    businessName: 'Sweet Treats Bakery',
    startDate: new Date('2025-04-10T10:00:00'),
    endDate: new Date('2025-04-15T23:59:59'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA',
      distance: '0.8 km'
    },
    maxRedemptions: 50,
    currentRedemptions: 12,
    rangeInKm: 5
  },
  {
    id: '2',
    title: 'Buy One Coffee, Get One Free',
    description: 'Purchase any coffee and receive a second one of equal or lesser value for free. Limited time offer!',
    businessName: 'Beantown Coffee',
    startDate: new Date('2025-04-08T08:00:00'),
    endDate: new Date('2025-04-09T20:00:00'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '456 Elm St, San Francisco, CA',
      distance: '1.2 km'
    },
    maxRedemptions: 30,
    currentRedemptions: 27,
    rangeInKm: 3
  },
  {
    id: '3',
    title: '10% Off First Purchase',
    description: 'New customers get 10% off their first purchase. Show this offer at checkout.',
    businessName: 'City Fashion Boutique',
    startDate: new Date('2025-04-01T00:00:00'),
    endDate: new Date('2025-05-01T23:59:59'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '789 Oak St, San Francisco, CA',
      distance: '1.5 km'
    },
    maxRedemptions: 100,
    currentRedemptions: 45,
    rangeInKm: 10
  },
  {
    id: '4',
    title: '50% Off Second Item',
    description: 'Buy one item at full price and get 50% off a second item of equal or lesser value.',
    businessName: 'Sports Outlet',
    startDate: new Date('2025-04-05T09:00:00'),
    endDate: new Date('2025-04-20T21:00:00'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '101 Pine St, San Francisco, CA',
      distance: '2.3 km'
    },
    maxRedemptions: 75,
    currentRedemptions: 18,
    rangeInKm: 7
  },
  {
    id: '5',
    title: 'Free Dessert with Dinner',
    description: 'Get a complimentary dessert with any dinner entrée. Valid for dine-in only.',
    businessName: 'Riverside Restaurant',
    startDate: new Date('2025-04-07T17:00:00'),
    endDate: new Date('2025-04-14T23:00:00'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '222 River Rd, San Francisco, CA',
      distance: '3.1 km'
    },
    maxRedemptions: 60,
    currentRedemptions: 29,
    rangeInKm: 8
  }
];

const Discover = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [locationEnabled, setLocationEnabled] = useState<boolean | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState('');
  
  const handleLocationRequest = () => {
    // In a real app, this would request actual geolocation
    toast({
      title: "Location Services Enabled",
      description: "Your location is now being used to find nearby deals.",
    });
    setLocationEnabled(true);
  };
  
  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDistance('');
  };
  
  const filteredOffers = sampleOffers.filter(offer => {
    if (searchQuery && !offer.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !offer.businessName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedDistance) {
      const distanceKm = parseFloat(offer.location.distance?.split(' ')[0] || '0');
      const maxDistance = parseInt(selectedDistance);
      if (distanceKm > maxDistance) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Discover Nearby Deals</h1>
          <p className="text-muted-foreground">Find exclusive offers from local businesses around you</p>
        </div>
        
        {locationEnabled === null && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="rounded-full p-3 bg-deal-light mb-4">
                  <MapPin className="h-6 w-6 text-deal-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Enable Location Services</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  To discover deals near you, we need your location. This helps us show you the most relevant offers.
                </p>
                <Button onClick={handleLocationRequest}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Enable Location
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {locationEnabled && (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-grow">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search offers or businesses..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                className={filterOpen ? 'bg-muted' : ''}
                onClick={handleFilterToggle}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            
            {filterOpen && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-end gap-4">
                    <div className="min-w-[200px] flex-grow">
                      <label className="text-sm font-medium mb-1 block">Distance</label>
                      <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any distance</SelectItem>
                          <SelectItem value="1">Within 1 km</SelectItem>
                          <SelectItem value="2">Within 2 km</SelectItem>
                          <SelectItem value="5">Within 5 km</SelectItem>
                          <SelectItem value="10">Within 10 km</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <XCircle className="h-4 w-4 mr-1" />
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOffers.map((offer) => (
                    <OfferCard key={offer.id} offer={offer} />
                  ))}
                </div>
                
                {filteredOffers.length === 0 && (
                  <div className="text-center py-12 bg-gray-100 rounded-lg">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Offers Found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search query.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="order-first lg:order-last">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Deals Near You</CardTitle>
                    <CardDescription>
                      Your current location
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LocationMap className="h-64 md:h-80" />
                    <div className="mt-4 text-sm">
                      <p className="text-muted-foreground mb-2">
                        Showing deals within:
                      </p>
                      <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any distance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Any distance</SelectItem>
                          <SelectItem value="1">1 kilometer</SelectItem>
                          <SelectItem value="2">2 kilometers</SelectItem>
                          <SelectItem value="5">5 kilometers</SelectItem>
                          <SelectItem value="10">10 kilometers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Discover;
