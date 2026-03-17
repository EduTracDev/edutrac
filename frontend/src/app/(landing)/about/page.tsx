import Link from "next/link";
import { Metadata } from "next";
import { Box } from "@mui/material";
import { AuthRoutes } from "@/routes/auth.routes";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import AboutSection from "@/modules/landing/components/About/About";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import Footer from "@/modules/landing/components/Footer/Footer";
import about1 from "@/modules/shared/assets/images/about-1.png";
import about2 from "@/modules/shared/assets/images/about-2.png";
import about3 from "@/modules/shared/assets/images/about-3.png";
import MissionVision from "@/modules/landing/components/MissionVision/MissionVision";
import CoreValue from "@/modules/landing/components/CoreValue/CoreValue";
import ImpactStats from "@/modules/landing/components/ImpactStats/ImpactStats";
import TeamSection from "@/modules/landing/components/Team/Team";
import team1 from "@/modules/shared/assets/images/eniola.jpeg";
import team2 from "@/modules/shared/assets/images/eniola.jpeg";
import team3 from "@/modules/shared/assets/images/eniola.jpeg";
import partner1 from "@/modules/shared/assets/images/cresttech.png";
import partner2 from "@/modules/shared/assets/images/cresttech.png";
import partner3 from "@/modules/shared/assets/images/cresttech.png";
import TrustBar from "@/modules/landing/components/TrustBar/TrustBar";
import BackToTop from "@/app/BackToTop";

export const metadata: Metadata = {
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
      badge: "OUR STORY",
      title: "Gateway To Personal And Professional Growth",
      description: [
        "EduTrac was born from a vision to revolutionize education through technology. Founded by a team of educators and tech enthusiasts, we recognized the need for a comprehensive platform that could streamline school operations and enhance the learning experience for students and teachers alike.",
        "Our Journey began with a simple idea: to create a tool that empowers schools to achieve their full potential. Today, EduTrac stands as a testament to that vision, serving countless institutions and shaping the future of education.",
      ],
      images: {
        teacher: about1,
        building: about2,
        students: about3,
      },
    },
    missionVision: {
      mission:
        "We rise to serve, solve, and shine — for people, for growth, for good.",
      vision:
        "To become Africa’s most trusted learning companion — empowering every learner, educator, and Learning Management System to thrive through accessible, data-driven, and human-centered education solutions.",
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
    partners: {
      title: "Trusted by Leading Institutions",
      logos: [
        { name: "CrestTech Hub", image: partner1 },
        { name: "Partner Two", image: partner2 },
        { name: "Partner Three", image: partner3 },
      ],
    },
    team: {
      badge: "The Team",
      title: "Meet the Team",
      members: [
        {
          name: "Member One",
          role: "Founder & CEO",
          image: team1,
          socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            twitter: "#",
          },
        },
        {
          name: "Member Two",
          role: "Head of Product",
          image: team2,
          socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "https://www.linkedin.com/in/fatimah-adebimpe-441b10145/",
            twitter: "#",
          },
        },
        {
          name: "Member Three",
          role: "Lead Developer",
          image: team3,
          socials: {
            facebook: "#",
            instagram: "#",
            linkedin: "#",
            twitter: "#",
          },
        },
      ],
    },
    freeTrial: {
      title: "Ready to Simplify Your Learning Management?",
      description:
        "Join thousands of Learning Platforms already benefiting from EduTrac's powerful features.",
      buttonText: "Start Free Trial",
    },
  };
  return (
    <Box>
      <Navbar buttonText="Get Started" buttonLink={AuthRoutes.register} />
      <AboutSection {...content.about} />
      <ImpactStats {...content.impact} />
      <TrustBar {...content.partners} />
      <MissionVision {...content.missionVision} />
      <CoreValue {...content.coreValues} />
      <TeamSection {...content.team} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
      <BackToTop />
    </Box>
  );
}
