// "use client"; 
// import { useQuery } from "@tanstack/react-query";
// import { Button } from "../../../Components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { supabase } from "../../../../lib/supabase";
// import ProductCard from "../../../Components/Home/HomeComponents/ProductCard";
// import { Skeleton } from "../../../Components/ui/skeleton";
// import Link from "next/link";

// export default function FeaturedProducts() {
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["featured-products"],
//     queryFn: async () => {
//       const { data } = await supabase
//         .from("products")
//         .select("*")
//         .limit(8)
//         .order("created_at", { ascending: false });
//       return data || [];
//     },
//   });

//   const ProductSkeleton = () => (
//     <div className="space-y-3">
//       <Skeleton className="aspect-square w-full" />
//       <Skeleton className="h-4 w-3/4" />
//       <Skeleton className="h-4 w-1/2" />
//       <Skeleton className="h-10 w-full" />
//     </div>
//   );

//   return (
//     <section className="py-20 bg-background">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//             <span className="gradient-text">Featured Products</span>
//           </h2>
//           <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//             Discover our most popular and trending products, carefully curated
//             for you
//           </p>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//             {Array.from({ length: 8 }).map((_, i) => (
//               <ProductSkeleton key={i} />
//             ))}
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🏪</div>
//             <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
//             <p className="text-muted-foreground mb-6">
//               Our featured products will be available soon. Check back later!
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//               {products.slice(0, 8).map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>

//             <div className="text-center">
//               <Link href="/products">
//                 <Button variant="hero" size="lg" className="group">
//                   View All Products
//                   <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//                 </Button>
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </section>
//   );
// }



"use client"; 
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../../Components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "../../../../lib/supabase";
import ProductCard from "../../../Components/Home/HomeComponents/ProductCard";
import { Skeleton } from "../../../Components/ui/skeleton";
import Link from "next/link";

// Mock data for demonstration (replace with real Supabase data later)
const mockProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description: "High-quality sound with noise cancellation",
    price: 299.99,
    image_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    category: "Electronics",
    rating: 4.8,
    created_at: "2024-01-01"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your health and fitness goals",
    price: 199.99,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    category: "Wearables",
    rating: 4.6,
    created_at: "2024-01-02"
  },
  {
    id: 3,
    name: "Organic Coffee Beans",
    description: "Premium single-origin coffee",
    price: 24.99,
    image_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
    category: "Food & Beverage",
    rating: 4.9,
    created_at: "2024-01-03"
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "Comfortable seating for long work sessions",
    price: 399.99,
    image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "Furniture",
    rating: 4.7,
    created_at: "2024-01-04"
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for your devices",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1609592133107-eac4df36cd8c?w=400",
    category: "Electronics",
    rating: 4.5,
    created_at: "2024-01-05"
  },
  {
    id: 6,
    name: "Yoga Mat Premium",
    description: "Non-slip exercise mat for yoga and fitness",
    price: 79.99,
    image_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    category: "Sports & Fitness",
    rating: 4.8,
    created_at: "2024-01-06"
  },
  {
    id: 7,
    name: "Ceramic Plant Pot Set",
    description: "Beautiful handcrafted pots for your plants",
    price: 34.99,
    image_url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    category: "Home & Garden",
    rating: 4.6,
    created_at: "2024-01-07"
  },
  {
    id: 8,
    name: "LED Desk Lamp",
    description: "Adjustable brightness with USB charging",
    price: 59.99,
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    category: "Home & Office",
    rating: 4.7,
    created_at: "2024-01-08"
  }
];

export default function FeaturedProducts() {
  // Using mock data for now - replace with real Supabase query when connected
  const products = mockProducts;
  const isLoading = false;

  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="gradient-text text-3xl sm:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our most popular and trending products, carefully curated for you
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏪</div>
            <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground mb-6">
              Our featured products will be available soon. Check back later!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link href="/products">
                <Button variant="hero" size="lg" className="group">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

