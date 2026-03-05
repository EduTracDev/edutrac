import { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthRoutes } from "@/routes/auth.routes";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import Hero from "@/modules/landing/components/Hero/Hero";
import CoreValue from "@/modules/landing/components/CoreValue/CoreValue";
import Testimonial from "@/modules/landing/components/Testimonial/Testimonial";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import Footer from "@/modules/landing/components/Footer/Footer";
import BackToTop from "./BackToTop";

export const metadata: Metadata = {
  title: "EduTrac",
  description:
    "EduTrac is a comprehensive learning management system designed to revolutionize education through technology.",
};

export default function HomePage() {
  const content = {
    hero: {
      title: "Revolutionizing Learning Management",
      description:
        "EduTrac was born from a vision to revolutionize education through technology.We understand the challenges schools face in managing operations, engaging students, and empowering educators. Our mission is to provide a comprehensive, user-friendly platform that streamlines school management, enhances communication, and fosters a collaborative learning environment. With EduTrac, we aim to transform the educational experience for administrators, teachers, students, and parents alike.",
      buttonText: "Get Started",
      buttonLink: AuthRoutes.register,
    },
    navigation: {
      buttonText: "Sign Up",
      buttonLink: AuthRoutes.register,
    },
    // If CoreValue or Testimonial need dynamic data, add them here:
    freeTrial: {
      title: "Ready to transform your school?",
      buttonText: "Start Free Trial",
    },
  };

  return (
    <Box component="main">
      <Navbar
        buttonText={content.navigation.buttonText}
        buttonLink={content.navigation.buttonLink}
      />
      <Hero {...content.hero} />
      <CoreValue />
      <Testimonial />

      {/* Example of passing props to another section */}
      {/* <FreeTrial
        title={content.freeTrial.title}
        buttonText={content.freeTrial.buttonText}
      /> */}

      <Footer />
      <BackToTop />
    </Box>
  );
}
