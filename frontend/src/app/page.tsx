import { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthRoutes } from "@/routes/auth.routes";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import AboutSection from "@/modules/landing/components/About/About";
import Hero from "@/modules/landing/components/Hero/Hero";
import ImpactStats from "@/modules/landing/components/ImpactStats/ImpactStats";
import Pricing from "@/modules/landing/components/Pricing/Pricing";
import Testimonial from "@/modules/landing/components/Testimonial/Testimonial";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import Footer from "@/modules/landing/components/Footer/Footer";
import BackToTop from "./BackToTop";
import FAQ from "@/modules/landing/components/Faq/Faq";
import Role from "@/modules/landing/components/Role/Role";
import about1 from "@/modules/shared/assets/images/about-1.png";
import about2 from "@/modules/shared/assets/images/about-2.png";
import about3 from "@/modules/shared/assets/images/about-3.png";
import FeatureHub from "@/modules/landing/components/Feature/FeatureHub";

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
    url: "https://edutrac-seven.vercel.app/", // Replace with your actual domain
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
      title: "Revolutionizing Learning Management Systems",
      description:
        "EduTrac was born from a vision to revolutionize education through technology.We understand the challenges schools face in managing operations, engaging students, and empowering educators. Our mission is to provide a comprehensive, user-friendly platform that streamlines school management, enhances communication, and fosters a collaborative learning environment. With EduTrac, we aim to transform the educational experience for administrators, teachers, students, and parents alike.",
      buttonText: "Get Started",
      buttonLink: AuthRoutes.register,
    },
    featureHub: {
      badge: "Core Features",
      mainTitle: "Everything you need to run your school",
      features: [
        {
          title: "Automated Fee Management",
          description:
            "Eliminate the headache of manual reconciliation. Track payments, generate receipts, and send automated reminders to parents instantly.",
          image: "/dashboard-fees.png",
          benefits: [
            "Instant payment notifications",
            "Direct bank integration",
            "Debt tracking",
          ],
          isReversed: false,
        },
        {
          title: "Smart Attendance & SMS",
          description:
            "Keep parents in the loop. Our system logs student attendance and sends an automatic SMS to guardians the moment a child is marked absent.",
          image: "/dashboard-attendance.png",
          benefits: [
            "Real-time daily logs",
            "One-click SMS alerts",
            "Monthly summary reports",
          ],
          isReversed: true,
        },
        {
          title: "Effortless Result Computation",
          description:
            "Say goodbye to calculator errors. Teachers input scores, and EduTrac automatically generates professional report cards in seconds.",
          image: "/dashboard-results.png",
          benefits: [
            "Automated GPA calculation",
            "Customizable templates",
            "Bulk result printing",
          ],
          isReversed: false,
        },
      ],
    },
    impact: {
      title: "Our Impact in Numbers",
      stats: [
        { value: "50k+", label: "Active Learners" },
        { value: "1.2k+", label: "Institutions" },
        { value: "95%", label: "Satisfaction Rate" },
        { value: "24/7", label: "Expert Support" },
      ],
    },
    about: {
      badge: "OUR STORY",
      title: "Gateway To Personal And Professional Growth",
      description: [
        "EduTrac was born from a vision to revolutionize education through technology. Founded by a team of educators and tech enthusiasts, we recognized the need for a comprehensive platform that could streamline school operations and enhance the learning experience for students and teachers alike.",
        "Our Journey began with a simple idea: to create a tool that empowers schools to achieve their full potential. Today, EduTrac stands as a testament to that vision, serving countless institutions and shaping the future of education.",
      ],
      buttonText: "Learn More",
      buttonLink: "/about",
      images: {
        teacher: about1,
        building: about2,
        students: about3,
      },
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
        description:
          "For Growing Schools: Simplify Fee Management, Track Student Progress, and Communicate Efficiently with Parents.",
        price: "8,000",
        isPopular: true,
        saveAmount: "Save ₦5,000 a year",
        features: [
          "Unlimited students",
          "School fees management",
          "Attendance management",
          "Dashboard",
          "Student progress report",
          "Communication",
          "Price reduces as students increase",
        ],
      },
      {
        id: "premium",
        name: "Premium",
        description: "Unveil new superpowers and join the Design League",
        price: "16,000",
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
      <Hero {...content.hero} />
      <FeatureHub {...content.featureHub} />
      <ImpactStats {...content.impact} />
      <AboutSection {...content.about} />
      <Role items={content.role} />
      <Testimonial items={content.testimonials} />
      <Pricing items={content.pricing} />
      <FAQ items={content.faq} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
