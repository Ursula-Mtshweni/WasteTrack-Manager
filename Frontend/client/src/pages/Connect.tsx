import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Globe } from "lucide-react";

export default function Connect() {
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardContent className="pt-6">
          <p className="text-lg text-foreground">
            Create an account today. Register to join WasteTrack 360 Manager and schedule waste pickup services in your city.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <p className="text-lg text-foreground">
            Need a waste vehicle live tracker? Get real-time live updates on pickup points in your city routes. Sign up today and get a free month trial!
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            For more information about waste management in your area, contact your local waste management authority or visit our website for additional resources.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Landline (General Enquiries):</p>
                <p className="text-muted-foreground">+27 21 555 4820</p>
                <p className="text-sm text-muted-foreground">Monday–Friday, 08:00–17:00</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium">Emergency Waste Hotline:</p>
                <p className="text-muted-foreground">+27 21 555 4820</p>
                <p className="text-sm text-muted-foreground">24/7</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Email:</p>
                <a href="mailto:info@wastetrack360.gov.za" className="text-primary hover:underline">
                  info@wastetrack360.gov.za
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Website:</p>
                <a href="http://www.wastetrack360.gov.za" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  www.wastetrack360.gov.za
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your feedback here..."
                className="mt-2 min-h-32"
                data-testid="textarea-feedback"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Report missed pickups or provide feedback about our service. Your feedback helps us improve our operations.
            </p>
            <Button type="submit" data-testid="button-submit-feedback">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
