import { Card } from "../../../Components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../Components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Customer",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face",
      content:
        "Amazing quality products and lightning-fast delivery! AppCraft has become my go-to marketplace for everything I need.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content:
        "The electronics section is incredible. Found exactly what I was looking for at unbeatable prices with excellent customer service.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Fashion Blogger",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content:
        "Love the clothing collection! Trendy styles, great quality, and the return policy is so customer-friendly. Highly recommended!",
      rating: 5,
    },
    {
      name: "David Park",
      role: "Small Business Owner",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content:
        "As a seller, the platform is intuitive and powerful. Great tools to manage my inventory and reach more customers effectively.",
      rating: 5,
    },
    {
      name: "Lisa Thompson",
      role: "Home Decorator",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content:
        "The home & garden section has everything I need for my projects. Quality products and helpful product descriptions make shopping easy.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Fitness Coach",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content:
        "Excellent sports equipment selection! Great prices, fast shipping, and products that meet professional standards. Very satisfied!",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied
            customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="!border-none hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-base-300 shadow-md hover:shadow-xl p-4 rounded-lg">
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
