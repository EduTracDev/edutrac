import Link from "next/link";
import { LandingRoutes } from "@/routes/landing.routes";
import { Metadata } from "next";
import Box from "@mui/material/Box/Box";
import Footer from "@/modules/landing/components/Footer/Footer";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import { AuthRoutes } from "@/routes/auth.routes";

export const metadata: Metadata = {
  title: "Contact Us | EduTrac – Get in Touch with Our Team",
  description:
    "Have questions or need a demo? Reach out to the EduTrac support team. We're here to help your school transition to a smarter management system.",
  openGraph: {
    title: "Contact EduTrac Support – We're Here to Help",
    description:
      "Speak with our experts today. Whether you need technical support or a custom enterprise quote, we're just a message away.",
  },
};

export default function ContactPage() {
  const content = {
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
      <FreeTrial {...content.freeTrial} />
      <Footer />
    </Box>
  );
}
