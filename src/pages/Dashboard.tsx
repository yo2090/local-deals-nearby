
import React, { useState } from 'react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlusCircle, 
  BarChart, 
  ListFilter,
  Package,
  Inbox 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateOfferForm from '@/components/offers/CreateOfferForm';
import OfferCard, { Offer } from '@/components/offers/OfferCard';

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
      address: '123 Main St, San Francisco, CA'
    },
    maxRedemptions: 50,
    currentRedemptions: 12,
    rangeInKm: 5
  },
  {
    id: '2',
    title: 'Buy One Coffee, Get One Free',
    description: 'Purchase any coffee and receive a second one of equal or lesser value for free. Limited time offer!',
    businessName: 'Sweet Treats Bakery',
    startDate: new Date('2025-04-08T08:00:00'),
    endDate: new Date('2025-04-09T20:00:00'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA'
    },
    maxRedemptions: 30,
    currentRedemptions: 27,
    rangeInKm: 3
  },
  {
    id: '3',
    title: '10% Off First Purchase',
    description: 'New customers get 10% off their first purchase. Show this offer at checkout.',
    businessName: 'Sweet Treats Bakery',
    startDate: new Date('2025-04-01T00:00:00'),
    endDate: new Date('2025-05-01T23:59:59'),
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: '123 Main St, San Francisco, CA'
    },
    maxRedemptions: 100,
    currentRedemptions: 45,
    rangeInKm: 10
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const [isCreateMode, setIsCreateMode] = useState(false);
  
  const handleCreateClick = () => {
    setIsCreateMode(true);
  };
  
  const handleBackClick = () => {
    setIsCreateMode(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Business Dashboard</h1>
            <p className="text-muted-foreground">Manage your local offers and track performance</p>
          </div>
          
          {!isCreateMode && (
            <Button onClick={handleCreateClick}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Offer
            </Button>
          )}
          
          {isCreateMode && (
            <Button variant="outline" onClick={handleBackClick}>
              Back to Dashboard
            </Button>
          )}
        </div>
        
        {isCreateMode ? (
          <Card>
            <CardHeader>
              <CardTitle>Create New Offer</CardTitle>
              <CardDescription>
                Fill in the details below to create a new local offer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CreateOfferForm />
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active Offers</TabsTrigger>
              <TabsTrigger value="expired">Expired Offers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
              
              {sampleOffers.length === 0 && (
                <div className="text-center py-16">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Active Offers</h3>
                  <p className="text-muted-foreground mb-6">
                    You don't have any active offers at the moment.
                  </p>
                  <Button onClick={handleCreateClick}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Your First Offer
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="expired">
              <div className="text-center py-16">
                <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Expired Offers</h3>
                <p className="text-muted-foreground">
                  Your expired offers will appear here.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Track the performance of your offers over time.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                    <div className="text-center">
                      <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Analytics will be available once you have active offers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
