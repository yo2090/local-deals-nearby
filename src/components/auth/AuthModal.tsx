
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BusinessSignUp from './BusinessSignUp';
import CustomerSignUp from './CustomerSignUp';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: 'customer' | 'business';
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onOpenChange, type }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'business' ? 'Business Account' : 'Customer Account'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-4">
            {type === 'business' ? (
              <BusinessSignUp isSignIn />
            ) : (
              <CustomerSignUp isSignIn />
            )}
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            {type === 'business' ? (
              <BusinessSignUp isSignIn={false} />
            ) : (
              <CustomerSignUp isSignIn={false} />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
