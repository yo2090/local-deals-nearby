
import React, { useState } from 'react';
import Header from '@/components/Header';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  PlusCircle, 
  BarChart, 
  ListFilter,
  Package,
  Inbox,
  Clock,
  MapPin,
  Tag,
  Users,
  Activity,
  TrendingUp,
  Calendar,
  Search,
  MoreVertical,
  PieChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreateOfferForm from '@/components/offers/CreateOfferForm';
import OfferCard, { Offer } from '@/components/offers/OfferCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

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

// Summary stats for dashboard
const summaryStats = {
  totalOffers: sampleOffers.length,
  totalRedemptions: sampleOffers.reduce((sum, offer) => sum + offer.currentRedemptions, 0),
  averageRedemptionRate: Math.round(
    (sampleOffers.reduce((sum, offer) => sum + (offer.currentRedemptions / offer.maxRedemptions), 0) / sampleOffers.length) * 100
  )
};

const Dashboard = () => {
  const { toast } = useToast();
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  const handleCreateClick = () => {
    setIsCreateMode(true);
  };
  
  const handleBackClick = () => {
    setIsCreateMode(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getDaysRemaining = (endDate: Date) => {
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getRedemptionPercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
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
            <Button className="bg-primary hover:bg-primary/90" onClick={handleCreateClick}>
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
          <Card className="border border-border shadow-sm">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-xl">Create New Offer</CardTitle>
              <CardDescription>
                Fill in the details below to create a new local offer.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CreateOfferForm />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total Active Offers</CardDescription>
                  <CardTitle className="text-2xl">{summaryStats.totalOffers}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{summaryStats.totalOffers} campaigns running</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Total Redemptions</CardDescription>
                  <CardTitle className="text-2xl">{summaryStats.totalRedemptions}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Across all active offers</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardDescription>Average Redemption Rate</CardDescription>
                  <CardTitle className="text-2xl">{summaryStats.averageRedemptionRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Activity className="h-4 w-4 mr-1" />
                    <span>Performance across campaigns</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="active" className="space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
                <TabsList>
                  <TabsTrigger value="active" className="text-sm">Active Offers</TabsTrigger>
                  <TabsTrigger value="expired" className="text-sm">Expired Offers</TabsTrigger>
                  <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
                </TabsList>
                
                <div className="flex items-center w-full md:w-auto gap-2">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search offers..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select defaultValue={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="ending-soon">Ending Soon</SelectItem>
                      <SelectItem value="redemptions">Most Redemptions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="active" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {sampleOffers.map((offer) => (
                    <Card key={offer.id} className="border border-border shadow-sm overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary mb-2">
                            Active
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit offer</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                End offer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardTitle className="text-lg">{offer.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {offer.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="space-y-3">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {formatDate(offer.startDate)} - {formatDate(offer.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="truncate">{offer.location.address}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Redemptions</span>
                              <span className="font-medium">
                                {offer.currentRedemptions} / {offer.maxRedemptions}
                              </span>
                            </div>
                            <Progress 
                              value={getRedemptionPercentage(offer.currentRedemptions, offer.maxRedemptions)} 
                              className="h-2"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3 flex justify-between items-center bg-muted/10">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">
                            {getDaysRemaining(offer.endDate) <= 0 
                              ? "Ended" 
                              : `${getDaysRemaining(offer.endDate)} days left`}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
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
              
              <TabsContent value="expired" className="mt-0">
                <div className="text-center py-16">
                  <Inbox className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Expired Offers</h3>
                  <p className="text-muted-foreground">
                    Your expired offers will appear here.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border border-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Redemption Trends
                      </CardTitle>
                      <CardDescription>
                        Track offer redemptions over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                        <div className="text-center">
                          <BarChart className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            Redemption trend data will appear here.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border border-border shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="h-5 w-5 mr-2" />
                        Offer Performance
                      </CardTitle>
                      <CardDescription>
                        Compare performance across different offers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center border rounded-md bg-muted/20">
                        <div className="text-center">
                          <Activity className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            Performance comparison will appear here.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
