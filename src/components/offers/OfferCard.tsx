
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Offer {
  id: string;
  title: string;
  description: string;
  businessName: string;
  startDate: Date;
  endDate: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
    distance?: string;
  };
  maxRedemptions: number;
  currentRedemptions: number;
  rangeInKm: number;
}

interface OfferCardProps {
  offer: Offer;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

const OfferCard: React.FC<OfferCardProps> = ({ 
  offer, 
  onClick,
  variant = 'default'
}) => {
  const isCompact = variant === 'compact';
  const percentageRedeemed = Math.round((offer.currentRedemptions / offer.maxRedemptions) * 100);
  const isEnding = new Date(offer.endDate).getTime() - new Date().getTime() < 86400000; // 24 hours
  const isLimited = percentageRedeemed >= 70;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
        isCompact ? "h-full" : "h-full"
      )}
      onClick={onClick}
    >
      <CardHeader className={cn(
        "p-4 pb-0",
        isCompact ? "p-3 pb-0" : ""
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={cn(
              "font-semibold text-lg line-clamp-1",
              isCompact ? "text-base" : ""
            )}>
              {offer.title}
            </h3>
            <p className="text-sm text-muted-foreground">{offer.businessName}</p>
          </div>
          
          {isEnding && (
            <Badge variant="destructive" className="ml-2 whitespace-nowrap">
              Ending Soon
            </Badge>
          )}
          
          {!isEnding && isLimited && (
            <Badge variant="secondary" className="ml-2 whitespace-nowrap">
              Going Fast
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className={cn(
        "p-4",
        isCompact ? "p-3" : ""
      )}>
        <p className={cn(
          "text-sm text-muted-foreground mb-4",
          isCompact ? "line-clamp-2 mb-2" : "line-clamp-3"
        )}>
          {offer.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            <span>{formatDate(offer.startDate)} - {formatDate(offer.endDate)}</span>
          </div>
          
          {(!isCompact || (isCompact && offer.location.distance)) && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 mr-2" />
              <span>
                {offer.location.distance ? `${offer.location.distance} away` : offer.location.address}
              </span>
            </div>
          )}
          
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5 mr-2" />
            <span>{offer.currentRedemptions} of {offer.maxRedemptions} claimed</span>
          </div>
        </div>
      </CardContent>
      
      {!isCompact && (
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" size="sm">
            View Details <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OfferCard;
