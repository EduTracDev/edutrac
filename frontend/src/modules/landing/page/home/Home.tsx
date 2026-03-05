"use client";

import React from "react";
import { Box } from "@mui/material";
// Component Imports
import Navbar from "../../components/Navbar/Navbar"; // Ensure this matches your export (default vs named)
import Hero from "../../components/Hero/Hero";
import CoreValue from "../../components/CoreValue/CoreValue";
import Testimonial from "../../components/Testimonial/Testimonial";
import FreeTrial from "../../components/FreeTrial/FreeTrial";
import Footer from "../../components/Footer/Footer";

interface HomeProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function Home({
  title,
  description,
  buttonText,
  buttonLink,
}: HomeProps) {
  return (
    <Box component="main" className="relative">
      <Navbar buttonText={buttonText} buttonLink={buttonLink} />
      <Hero
        title={title}
        description={description}
        buttonText={buttonText}
        buttonLink={buttonLink}
      />
      <CoreValue />
      <Testimonial />
      <FreeTrial />
      <Footer />
    </Box>
  );
}
