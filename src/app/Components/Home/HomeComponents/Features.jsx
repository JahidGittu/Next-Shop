import { Card } from "../../../Components/ui/card";
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Headphones,
  Award,
  CreditCard
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Secure Shopping",
      description:
        "Your data is protected with bank-level security and SSL encryption",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Free shipping on orders over $50 with same-day delivery available",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free returns with full money-back guarantee",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service to help with any questions",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including buy now, pay later",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "All products undergo strict quality control and testing",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">AppCraft</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing the best shopping experience with these
            key features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group transition-all duration-300 shadow-md hover:shadow-xl border-none"
              >
                <div className="p-6 text-center bg-base-300 rounded-xl">
                  <div className="w-12 h-12 p-3 mx-auto mb-4 bg-violet-400/20 group-hoverbg-violet-400/40  rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent
                      className="h-8 w-8"
                      style={{ fill: "url(#gradient)" }}
                    />
                    <svg width="0" height="0">
                      <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#9333ea" />
                      </linearGradient>
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
