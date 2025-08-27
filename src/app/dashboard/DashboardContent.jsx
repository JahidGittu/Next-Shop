// src/app/dashboard/dashboardcontent.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/AuthContext/AuthContext";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Label } from "../Components/ui/label";
import { Textarea } from "../Components/ui/textarea";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/ui/select";
import { Plus, Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import ProductCard from "../Components/Home/HomeComponents/ProductCard";

export default function DashboardContent() {
  const { user, loading: userLoading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image_url: "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!userLoading && !user) {
      router.replace("/login");
    }
  }, [user, userLoading, router]);

  // Fetch user's products
  const {
    data: userProducts = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      try {
        const res = await fetch(`/api/products?user_id=${user.id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to fetch products");
        }
        const data = await res.json();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        // console.error("Error fetching products:", err);
        return [];
      }
    },
    enabled: !!user?.id,
  });

  // Add / Update product
  const saveProductMutation = useMutation({
    mutationFn: async (productData) => {
      if (!user?.id) throw new Error("User not authenticated");

      const method = productData._id ? "PUT" : "POST";
      const url = `/api/products`;

      const body = {
        ...productData,
        user_id: user.id,
        publisher_name: user.name,
        publisher_email: user.email,
        publisher_photo: user.user_metadata?.avatar_url || "",
        price: parseFloat(productData.price),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save product");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: editingProduct
          ? "Product updated successfully"
          : "Product added successfully",
      });
      queryClient.invalidateQueries(["products", user?.id]);
      setIsAddingProduct(false);
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image_url: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete product
  const deleteProductMutation = useMutation({
    mutationFn: async (_id) => {
      const res = await fetch(`/api/products?id=${_id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete product");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Product deleted" });
      queryClient.invalidateQueries(["products", user?.id]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    saveProductMutation.mutate({
      ...formData,
      price: parseFloat(formData.price),
      _id: editingProduct?._id,
      image_url:
        formData.image_url ||
        `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center`,
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddingProduct(true);
  };

  const handleDelete = (_id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(_id);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  if (userLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back,{" "}
              <span className="gradient-text">
                {user.name || user.email?.split("@")[0]}
              </span>
            </h1>
            <p className="text-muted-foreground">
              Manage your products and track your performance
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddingProduct(true)}
              variant="hero"
              className="mt-4 sm:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              {editingProduct ? "Edit Product" : "Add Product"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="mt-4 sm:mt-0"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-none p-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xl font-medium">Total Products</h3>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <div>
              <div className="text-2xl font-bold">{userProducts.length}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </div>
          </Card>

          <Card className="border-none p-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xl font-medium">Total Value</h3>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <div>
              <div className="text-2xl font-bold">
                $
                {userProducts
                  .reduce((sum, p) => sum + p.price, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Combined product value
              </p>
            </div>
          </Card>

          <Card className="border-none p-4 bg-gradient-to-r from-pink-400 via-rose-500 to-red-600 text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xl font-medium">Avg. Price</h3>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <div>
              <div className="text-2xl font-bold">
                $
                {userProducts.length
                  ? Math.round(
                      userProducts.reduce((sum, p) => sum + p.price, 0) /
                        userProducts.length
                    )
                  : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Average product price
              </p>
            </div>
          </Card>

          <Card className="border-none p-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-xl font-medium">Categories</h3>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <div>
              <div className="text-2xl font-bold">
                {new Set(userProducts.map((p) => p.category)).size}
              </div>
              <p className="text-xs text-muted-foreground">
                Different categories
              </p>
            </div>
          </Card>
        </div>

        {/* Add / Edit Product Form */}
        {isAddingProduct && (
          <Card className="mb-8 p-10 bg-base-300 text-base-content">
            <CardHeader>
              <CardTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </CardTitle>
              <CardDescription>
                Fill in the details to {editingProduct ? "update" : "add"} a
                product
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="home">Home & Garden</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="hero"
                  disabled={saveProductMutation.isPending}
                >
                  {saveProductMutation.isPending
                    ? editingProduct
                      ? "Updating..."
                      : "Adding..."
                    : editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingProduct(false);
                    setEditingProduct(null);
                    setFormData({
                      name: "",
                      description: "",
                      price: "",
                      category: "",
                      image_url: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Your Products */}
        <Card className="bg-gradient-hero border-none p-4">
          <CardHeader >
            <CardTitle className="flex justify-center w-full">Your Products</CardTitle>
          </CardHeader>

          <div>
            {productsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted aspect-square rounded-lg mb-4"></div>
                    <div className="bg-muted h-4 rounded mb-2"></div>
                    <div className="bg-muted h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : userProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-semibold mb-2">No products yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start building your catalog by adding your first product
                </p>
                <Button
                  onClick={() => setIsAddingProduct(true)}
                  variant="hero"
                  className="shadow-md "
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Product
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {userProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={() => handleEdit(product)}
                    onDelete={() => handleDelete(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
