"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#923CF9] text-white shadow-2xl transition-all duration-300 hover:bg-[#7b2dd1] hover:-translate-y-1 active:scale-90 ${
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <ArrowUp size={24} strokeWidth={2.5} />
    </button>
  );
}
