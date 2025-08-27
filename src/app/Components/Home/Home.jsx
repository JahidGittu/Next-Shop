// src/app/components/home.home.jsx // landing page // home page

"use client";
import React from "react";
import Hero from "./HomeComponents/Hero";
import FeaturedProducts from "./HomeComponents/FeaturedProducts";
import Categories from "./HomeComponents/Categories";
import Features from "./HomeComponents/Features";
import Testimonials from "./HomeComponents/Testimonials";
import Newsletter from "./HomeComponents/Newsletter";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
