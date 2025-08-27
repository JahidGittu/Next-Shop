import {
  Card,
  CardFooter,
  CardHeader,
} from "../../../Components/ui/card";
import { Button } from "../../../Components/ui/button";
import { Badge } from "../../../Components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <Card className="bg-base-300 group transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col shadow-md hover:shadow-xl border-none">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>

      {/* Make content area flex-grow */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">4.5</span>
          </div>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p> */}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      <CardFooter className="p-4 pt-0 flex gap-2 mt-auto">
        <Link href={`/products/${product._id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button size="icon" variant="hero">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
