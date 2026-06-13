import { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthRoutes } from "@/routes/auth.routes";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import Hero from "@/modules/landing/components/Hero/Hero";
import Pricing from "@/modules/landing/components/Pricing/Pricing";
import Testimonial from "@/modules/landing/components/Testimonial/Testimonial";
import JoinUSUs from "@/modules/landing/components/Join/JoinUs";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import Footer from "@/modules/landing/components/Footer/Footer";
import BackToTop from "./BackToTop";
import FAQ from "@/modules/landing/components/Faq/Faq";
import FeatureHub from "@/modules/landing/components/Feature/FeatureHub";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

export const metadata: Metadata = {
  title:
    "EduTrac | All-in-One School Management System for Modern Institutions",
  description:
    "Simplify your school administration with EduTrac. From automated fee collection to student performance tracking, we provide the tools you need to run a smarter, more efficient institution.",
  keywords: [
    "school management software",
    "education ERP",
    "student information system",
    "automated school billing",
    "Nigeria education tech",
    "EduTrac school portal",
  ],
  openGraph: {
    title: "EduTrac – Transform How You Manage Your Learning Management",
    description:
      "Experience the power of data-driven education management. Join 1,200+ schools modernizing their operations with EduTrac.",
    url: "https://edutrac-seven.vercel.app/",
    siteName: "EduTrac",
    images: [
      {
        url: "/og-image.png", // Ensure you have a high-quality preview image in your public folder
        width: 1200,
        height: 630,
        alt: "EduTrac Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduTrac | Modern Learning Management System",
    description:
      "Run your learning system with precision and ease. Automated attendance, billing, and reporting in one place.",
    images: ["/og-image.png"],
  },
};

export default function HomePage() {
  const content = {
    hero: {
      badgeText: "ONE PLATFORM. EVERY MODE OF LEARNING.",
      title: "Achieving Your Dreams Through Education",
      description:
        "Unify student records, classes, communication, and reporting in one smart, easy-to-use platform—for teachers, students, parents, and admins.",
      buttonText: "Get Started",
      buttonLink: OnboardingRoutes.plan,
    },
    chooseUs: {
      badge: "WHY CHOOSE US",
      title: "Creating A Community Of Life Long Learners.",
      highlightWord: "Learners",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris..",
      imageSrc: "/community-learners.png", // Place your collaborative student group image in public assets folder
      cards: [
        {
          title: "Streamlined Operations",
          description:
            "Centralized platform for all school management tasks, reducing complexity and improving efficiency.",
        },
        {
          title: "Time-Saving Tools",
          description:
            "Automated processes and intuitive interfaces save time for administrators, teachers, and students.",
        },
        {
          title: "Enhanced Security",
          description:
            "Robust security measures protect sensitive data and ensure a safe learning environment.",
        },
        {
          title: "Improved Collaboration",
          description:
            "Facilitates seamless communication and collaboration between all stakeholders.",
        },
      ],
    },
    navigation: {
      buttonText: "Sign Up",
      buttonLink: OnboardingRoutes.plan,
    },
    joinUs: {
      topBanner: {
        title: "Small. Tailor EduTrac to Your Needs.",
        joinLink: OnboardingRoutes.plan,
        videoLink: "#",
      },
      whyChooseUs: {
        badgeText: "WHY CHOOSE US",
        title: "Creating A Community Of Life Long Learners.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris..",
        imageSrc: "/images/community-learners.jpg", // Replace with your actual project image asset path
        pillars: [
          {
            title: "Streamlined Operations",
            description: "Centralized platform for all school management tasks, reducing complexity and improving efficiency."
          },
          {
            title: "Time-Saving Tools",
            description: "Automated processes and intuitive interfaces save time for administrators, teachers, and students."
          },
          {
            title: "Enhanced Security",
            description: "Robust security measures protect sensitive data and ensure a safe learning environment."
          },
          {
            title: "Improved Collaboration",
            description: "Facilitates seamless communication and collaboration between all stakeholders."
          }
        ]
      }
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
        isActive: true,
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
        role: "Proprietor at ordian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Elsie Stroud",
        role: "Proprietor at Edwards",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "Proprietor at ordian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "Proprietor at oranun it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "Proprietor at ian it",
      },
      {
        quote:
          "Lorem ipsum dolor sit amet, elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim. Amet consectetur adipiscing",
        author: "Kathy Sullivan",
        role: "Proprietor at ord it",
      },
    ],
    pricing: [
      {
        id: "free",
        name: "Free",
        description: "Have a go and test your superpowers",
        price: "0",
        features: [
          "2 Users",
          "2 Files",
          "Public Share & Comments",
          "Chat Support",
          "New income apps",
        ],
      },
      {
        id: "basic",
        name: "Basic",
        description: "For Growing Schools: Simplify Fee Management, Track Student Progress, and Communicate Efficiently with Parents.",
        price: "8",
        isPopular: true,
        saveAmount: "Save $50 a year",
        features: [
          "Unlimited students",
          "School fees management",
          "Attendance management",
          "Dashboard",
          "Student progress report",
          "Communication",
          "Price reduces as the number of students increase",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        description: "Unveil new superpowers and join the Design League",
        price: "16",
        features: [
          "All the features of pro plan",
          "Account success Manager",
          "Single Sign-On (SSO)",
          "Co-conception program",
          "Collaboration-Soon",
        ],
      },
    ],
  };

  return (
    <Box component="main">
      <Navbar
        buttonText={content.navigation.buttonText}
        buttonLink={content.navigation.buttonLink}
      />
      <Hero {...content.hero} roles={content.role} />
      <FeatureHub />
      <JoinUSUs {...content.joinUs} />
      <Testimonial items={content.testimonials} />
      <Pricing items={content.pricing} />
      <FAQ items={content.faq} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
