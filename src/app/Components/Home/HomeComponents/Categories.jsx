import { Button } from "../../../Components/ui/button";
import { Card } from "../../../Components/ui/card";
import {
  Smartphone,
  Shirt,
  Book,
  Home,
  Dumbbell,
  Headphones,
  Car,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

export default function Categories() {
  const categories = [
    {
      name: "Electronics",
      icon: Smartphone,
      description: "Latest gadgets and tech",
      color: "from-blue-500 to-cyan-500",
      count: "250+ items",
    },
    {
      name: "Clothing",
      icon: Shirt,
      description: "Fashion and apparel",
      color: "from-pink-500 to-rose-500",
      count: "180+ items",
    },
    {
      name: "Books",
      icon: Book,
      description: "Knowledge and entertainment",
      color: "from-green-500 to-emerald-500",
      count: "120+ items",
    },
    {
      name: "Home",
      icon: Home,
      description: "Home & garden essentials",
      color: "from-orange-500 to-amber-500",
      count: "90+ items",
    },
    {
      name: "Sports",
      icon: Dumbbell,
      description: "Fitness and outdoor gear",
      color: "from-purple-500 to-violet-500",
      count: "75+ items",
    },
    {
      name: "Audio",
      icon: Headphones,
      description: "Sound and music equipment",
      color: "from-indigo-500 to-blue-500",
      count: "60+ items",
    },
    {
      name: "Automotive",
      icon: Car,
      description: "Car accessories and parts",
      color: "from-red-500 to-pink-500",
      count: "45+ items",
    },
    {
      name: "Gaming",
      icon: Gamepad2,
      description: "Games and gaming gear",
      color: "from-teal-500 to-cyan-500",
      count: "85+ items",
    },
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Shop by <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse range of product categories to find exactly what
            you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
              >
                <Card className="!border-none hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer">
                  <div className="p-6 text-center bg-base-300 shadow-md hover:shadow-xl">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center group-hover:scale-50 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">
                      {category.description}
                    </p>
                    <p className="text-xs text-primary font-medium">
                      {category.count}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              Browse All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
