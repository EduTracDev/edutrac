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
import FAQ from "@/modules/landing/components/Faq/Faq";

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

    freeTrial: {
      title: "Ready to Simplify Your School Management?",
      description:
        "Join thousands of Learning Platforms already benefiting from EduTrac's powerful features.",
      buttonText: "Start Free Trial",
    },
    faq: [
      {
        question: "What is EduTrac?",
        answer:
          "EduTrac is a comprehensive Learning Management System (LMS) designed to streamline school operations and enhance the learning experience for all stakeholders.",
      },
      {
        question: "How does the role-based system work?",
        answer:
          "Our system assigns specific permissions to different users—such as administrators, teachers, students, and parents.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Yes! We offer a 14-day free trial so you can explore all the features of EduTrac before committing to a plan.",
      },
    ],
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
      <FAQ items={content.faq} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
