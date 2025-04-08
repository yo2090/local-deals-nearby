
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface CustomerSignUpProps {
  isSignIn: boolean;
}

const emailFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const phoneFormSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

const CustomerSignUp: React.FC<CustomerSignUpProps> = ({ isSignIn }) => {
  const { toast } = useToast();
  const [authMethod, setAuthMethod] = React.useState<'email' | 'phone'>('email');
  
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const phoneForm = useForm<z.infer<typeof phoneFormSchema>>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmitEmail = (data: z.infer<typeof emailFormSchema>) => {
    console.log('Email form data:', data);
    
    // For demonstration purposes only - in a real app this would connect to authentication
    toast({
      title: isSignIn ? 'Signed in successfully!' : 'Account created successfully!',
      description: `Welcome ${data.email}!`,
    });
  };

  const onSubmitPhone = (data: z.infer<typeof phoneFormSchema>) => {
    console.log('Phone form data:', data);
    
    // For demonstration purposes only - in a real app this would send verification code
    toast({
      title: 'Verification code sent',
      description: `We've sent a code to ${data.phoneNumber}`,
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue={authMethod} onValueChange={(v) => setAuthMethod(v as 'email' | 'phone')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="phone">Phone</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="mt-4">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSubmitEmail)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="youremail@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={emailForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full">
                  {isSignIn ? 'Sign In' : 'Create Account'}
                </Button>
                
                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" type="button" className="w-full">
                  Sign in with Google
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="phone" className="mt-4">
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(onSubmitPhone)} className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                Send Verification Code
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerSignUp;
