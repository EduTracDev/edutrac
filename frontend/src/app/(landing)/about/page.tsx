import Link from "next/link";
import { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthRoutes } from "@/routes/auth.routes";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import AboutSection from "@/modules/landing/components/About/About";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import Testimonial from "@/modules/landing/components/Testimonial/Testimonial";
import VideoSection from "@/modules/landing/components/Video/VideoSection";
import Footer from "@/modules/landing/components/Footer/Footer";
import about1 from "@/modules/shared/assets/images/about1.png";
import dashboardMockup from "@/modules/shared/assets/images/DASHBOARD.png";
import videoThumbnail from "@/modules/shared/assets/images/video-poster.png";
import CoreValue from "@/modules/landing/components/CoreValue/CoreValue";
import TeamSection from "@/modules/landing/components/Team/Team";
import team1 from "@/modules/shared/assets/images/eniola.png";

import BackToTop from "@/app/BackToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://edutrac.com"),
  title: "About Us | EduTrac – Modernizing Education Management",
  description:
    "Discover the story behind EduTrac. We are committed to empowering educators with data-driven tools and human-centered technology to transform school administration.",
  openGraph: {
    title: "Our Mission – Why We Built EduTrac",
    description:
      "Join us on our journey to make school management seamless, equitable, and efficient for schools worldwide.",
  },
};
export default function AboutPage() {
  const content = {
    about: {
      // Section 1: Hero Block
      hero: {
        badge: "OUR STORY",
        title: "Revolutionizing Education Management",
        description: [
          "EduTrac was born from a vision to revolutionize education through technology. Founded by a team of educators and tech enthusiasts, we recognized the need for a comprehensive platform that could streamline school operations and enhance the learning experience for students and teachers alike. Our Journey began with a simple idea: to create a tool that empowers schools to achieve their full potential. Today, EduTrac stands as a testament to that vision, serving countless institutions and shaping the future of education.",
        ],
        buttonText: "Watch Our Story",
        buttonLink: "#",
        dashboardImage: dashboardMockup,
      },
      // Section 2: Personal Growth Block
      growth: {
        badge: "OUR STORY",
        title: "Gateway To Personal And Professional Growth",
        description: [
          "EduTrac was born from a vision to revolutionize education through technology. Founded by a team of educators and tech enthusiasts, we recognized the need for a comprehensive platform that could streamline school operations and enhance the learning experience for students and teachers alike. Our journey began with a simple idea: to create a tool that empowers schools to achieve their full potential. Today, EduTrac stands as a testament to that vision, serving countless institutions and shaping the future of education.",
        ],
        buttonText: "Load More",
        buttonLink: "#",
        images: {
          students: about1,
        },
      },
      // Section 3: Video Feature Block
      storyVideo: {
        badge: "TESTIMONIAL",
        title: "Watch Our Story",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        thumbnail: videoThumbnail, 
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      },
      // Section 3: Vision and Mission Block
      vision: {
        badge: "VISION AND MISSION",
        title: "Defining Our Purpose And Direction",
        physicalSchools: {
          title: "PHYSICAL SCHOOLS",
          description: "Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.",
        },
        onlineSchools: {
          title: "ONLINE SCHOOLS",
          description: "Suspendisse ultrice gravida dictum fusce placerat ultricies integer quis auctor elit sed vulputate mi sit.",
        },
        mainDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris..",
        buttonText: "Load More",
        buttonLink: "#",
      }
    },
    coreValues: {
      badge: "Core Values",
      title: "Build On Principles That Matter",
      values: [
        {
          title: "Service",
          description:
            "We exist to uplift, support, and create meaningful impact in the lives of every learner and educator.",
        },
        {
          title: "Growth",
          description:
            "We believe in continuous learning, personal development, and scalable progress.",
        },
        {
          title: "Excellence",
          description:
            "We deliver with quality, integrity, and a commitment to results.",
        },
        {
          title: "Inclusion",
          description:
            "We create solutions that are accessible, equitable, and designed for everyone.",
        },
        {
          title: "Purpose",
          description:
            "We lead with intention, driven by a deep sense of responsibility to society and future generations.",
        },
        {
          title: "Innovation",
          description:
            "We embrace curiosity and leverage cutting-edge technology to solve complex educational challenges.",
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
    team: {
      badge: "TEAM",
      title: "Meet the Team",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      members: [
        { name: "Dr. Amelia Harper", role: "CEO", image: team1 },
        { name: "Mr. Ethan Carter", role: "Head of Product", image: team1 },
        { name: "Ms. Olivia Bennett", role: "Lead Educator", image: team1 },
        { name: "Dr. Amelia Harper", role: "CEO", image: team1 },
        { name: "Mr. Ethan Carter", role: "Head of Product", image: team1 },
      ],
    },
    freeTrial: {
      title: "Ready to Simplify Your School Management?",
      description:
        "Join thousands of Schools already benefiting from EduTrac's powerful features.",
      buttonText: "Start Free Trial",
    },
  };
  return (
    <Box>
      <Navbar buttonText="Get Started" buttonLink={AuthRoutes.register} />
      <AboutSection
        hero={content.about.hero}
        growth={content.about.growth}
        vision={content.about.vision}
      />
      <CoreValue {...content.coreValues} />
      <VideoSection {...content.about.storyVideo} />
      <Testimonial items={content.testimonials} />
      <TeamSection {...content.team} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
