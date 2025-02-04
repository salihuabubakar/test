import React from "react";
import Hero from "@/components/Home/Hero";
import Features from "@/components/Home/Features";
import Pricing from "@/components/Home/Pricing";
import Testimonials from "@/components/Home/Testimonials";
import Faq from "@/components/Home/Faq";
import CTA from "@/components/Home/CTA";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;
