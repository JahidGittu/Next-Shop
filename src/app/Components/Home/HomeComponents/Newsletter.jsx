"use client"
import { useState } from "react";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Card} from "../../../Components/ui/card";
import { Mail, CheckCircle } from "lucide-react";
import { useToast } from "../../../../hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter!"
      });
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-[#134a5a] to-[#144b4b] border-0 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <div className="mb-6">
              <Mail className="h-12 w-12 mx-auto mb-4 text-white/90" />
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Stay in the Loop
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new products, 
                exclusive deals, and special offers. Join over 10,000 happy subscribers!
              </p>
            </div>

            {isSubmitted ? (
              <div className="flex flex-col items-center">
                <CheckCircle className="h-16 w-16 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-white/90">
                  You've successfully subscribed to our newsletter. 
                  Check your inbox for a confirmation email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    variant="secondary"
                    disabled={isLoading}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-white/70 text-xs mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-white/80 text-sm">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-white/80 text-sm">Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0%</div>
                <div className="text-white/80 text-sm">Spam</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}