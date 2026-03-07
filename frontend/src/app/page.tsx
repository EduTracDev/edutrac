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
import Role from "@/modules/landing/components/Role/role";

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
    role: [
      {
        id: "admin",
        title: "SCHOOL ADMIN",
        description:
          "Oversee daily administrative tasks, staff management, and communication.",
      },
      {
        id: "teacher",
        title: "TEACHER",
        description:
          "Create and manage courses, engage students, and track progress.",
      },
      {
        id: "student",
        title: "STUDENT",
        description:
          "Access course materials, submit assignments, and collaborate with peers.",
      },
      {
        id: "parent",
        title: "PARENT",
        description:
          "Monitor your child's academic performance and stay connected with teachers.",
      },
    ],
    navigation: {
      buttonText: "Sign Up",
      buttonLink: AuthRoutes.register,
    },

    freeTrial: {
      title: "Ready to Simplify Your Learning Management?",
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
    testimonials: [
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "CEO at ordian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Elsie Stroud",
        role: "CEO at Edwards",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "CEO at ordian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "CEO at oranun it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "CEO at ian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "CEO at ord it",
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
      <Role items={content.role} />
      <Testimonial items={content.testimonials} />
      <FAQ items={content.faq} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
