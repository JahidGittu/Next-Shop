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
import ProductCard from "../../../Components/Home/HomeComponents/ProductCard";
import { Skeleton } from "../../../Components/ui/skeleton";
import Link from "next/link";

export default function FeaturedProducts() {
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch("/api/products?sortBy=createdAt&limit=8"); // সর্বশেষ ৮টি প্রোডাক্ট
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏪</div>
        <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
        <p className="text-muted-foreground mb-6">
          Our featured products will be available soon. Check back later!
        </p>
      </div>
    );
  }

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
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
      </div>
    </section>
  );
}
