
import React from 'react';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface LocationMapProps {
  className?: string;
  showLocationButton?: boolean;
  onLocationRequested?: () => void;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  className,
  showLocationButton = true,
  onLocationRequested
}) => {
  return (
    <div className={cn("relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden", className)}>
      {/* This is a placeholder for a real map component */}
      <div className="w-full h-full bg-deal-light/50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Map placeholder</p>
          <p className="text-xs text-muted-foreground mt-1">
            (In a real app, this would be an interactive map)
          </p>
        </div>
      </div>
      
      {showLocationButton && (
        <button 
          className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md transition-all hover:shadow-lg"
          onClick={onLocationRequested}
        >
          <MapPin className="h-5 w-5 text-deal-primary" />
        </button>
      )}
    </div>
  );
};

export default LocationMap;
