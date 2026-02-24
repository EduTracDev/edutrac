"use client";

import React from "react";
import { Navbar } from "../../components/Navbar";
import { useState } from "react";
import { Box } from "@mui/material";

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
    <Box>
      <Navbar
        title={title}
        description={description}
        buttonText={buttonText}
        buttonLink={buttonLink}
      />
      <div>Home</div>
    </Box>
  );
}
