import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  location: z.string().min(1, "Please select a location"),
  wasteType: z.enum(["General", "Recyclable", "Hazardous", "Organic"], {
    required_error: "Please select a waste type",
  }),
  preferredDate: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const cities = [
  "Nairobi",
  "Kisumu",
  "Mombasa",
  "Harare",
  "Johannesburg",
  "Pretoria",
  "Emalahleni",
  "Secunda",
  "Rustenburg",
];

export default function BookSchedule() {
  const { isSignedIn, user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      location: "",
      wasteType: undefined,
      preferredDate: "",
    },
  });

  // Require authentication to use this page
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-6">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold mb-2">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">
            To book a waste pickup schedule, please sign in with your Clerk account.
          </p>
        </div>
        <SignInButton mode="modal">
          <Button size="lg" data-testid="button-sign-in-required">
            Sign In to Continue
          </Button>
        </SignInButton>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log("Form submitted:", data);
    
    //todo: remove mock functionality - replace with actual API call
    // Example: await apiRequest('/api/waste-pickups', { method: 'POST', body: data });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    form.reset();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Request Waste Pickup</CardTitle>
          <CardDescription>
            Schedule your waste collection service in your city. Please provide all required information to ensure timely pickup.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pickup Request Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        data-testid="input-full-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-location">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="wasteType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Waste Type *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        {["General", "Recyclable", "Hazardous", "Organic"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={type}
                              id={type}
                              data-testid={`radio-${type.toLowerCase()}`}
                            />
                            <Label htmlFor={type} className="cursor-pointer">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Pickup Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        data-testid="input-preferred-date"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred pickup date (optional)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} data-testid="button-submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How it works:</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Fill out the form above with your details</li>
            <li>Select your preferred pickup date</li>
            <li>Submit your request</li>
            <li>We'll contact you to confirm the pickup schedule</li>
            <li>Track your request status in the Dashboard</li>
          </ol>
        </CardContent>
      </Card>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent data-testid="dialog-success">
          <DialogHeader>
            <DialogTitle className="text-primary">Request Submitted Successfully!</DialogTitle>
            <DialogDescription className="pt-4 space-y-2">
              <p>Your waste pickup request has been received.</p>
              <p>Check your emails, we'll contact you soon to confirm the details.</p>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setShowSuccess(false)} data-testid="button-close-dialog">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
