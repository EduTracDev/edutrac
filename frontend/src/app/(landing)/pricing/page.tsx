import { Metadata } from "next";
import Box from "@mui/material/Box/Box";
import PricingGrids from "@/modules/landing/components/PricingComponents/PricingGrids";
import PlanComparison from "@/modules/landing/components/PricingComponents/PlanComparison";
import Footer from "@/modules/landing/components/Footer/Footer";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import FAQ from "@/modules/landing/components/Faq/Faq";
import { LandingRoutes } from "@/routes/landing.routes";

export const metadata: Metadata = {
  title: "Pricing | EduTrac – Simple, Straightforward Pricing",
  description:
    "Choose a pricing plan tailored to your business—and boost your profits. Save up to 15% by choosing the premium options.",
  openGraph: {
    title: "EduTrac Pricing – Plans Built for Every Institution",
    description: "Scale your school with our flexible tiers from Free to Premium options.",
  },
};

export default function PricingPage() {
  const content = {
    featuresReason: [
      {
        title: "Flexible Billing",
        description: "Pay monthly or save with annual billing options.",
        iconBg: "bg-blue-50 text-blue-500",
      },
      {
        title: "Student Management",
        description: "Managing a multi-campus network, our plans scale with you",
        iconBg: "bg-orange-50 text-orange-500",
      },
      {
        title: "Hassle-Free Transactions",
        description: "Simple, transparent, and profitable.",
        iconBg: "bg-green-50 text-green-500",
      },
    ],
    comparison: {
      title: "Compare Features",
      subtitle: "Detailed breakdown to help you choose the right fit.",
      categories: [
        {
          name: "Core Features",
          features: [
            { name: "Student Management", basic: true, pro: true, ultra: true },
            { name: "Attendance", basic: true, pro: true, ultra: true },
            { name: "Exam Management", basic: false, pro: true, ultra: true },
            { name: "Custom Domain", basic: false, pro: false, ultra: true },
          ],
        },
        {
          name: "Support",
          features: [
            { name: "Help Center", basic: true, pro: true, ultra: true },
            { name: "Response Time", basic: "48h", pro: "12h", ultra: "Instant" },
          ],
        },
      ],
    },
    faq: [
      {
        question: "What is EduTrac?",
        answer: "EduTrac is a comprehensive Learning Management System (LMS) designed to streamline school operations.",
      },
    ],
    freeTrial: {
      title: "Ready to Simplify Your School Management?",
      description: "Join thousands of schools already benefiting from EduTrac's powerful features.",
      buttonText: "Start Free Trial",
      buttonLink: LandingRoutes.plan ?? "/plan",
    },
  };

  return (
    <Box>
      <Navbar buttonText="Get Started" buttonLink={LandingRoutes.plan} />
      <PricingGrids
        badge="Save up to 15% by Choosing the premium"
        title="Simple, straightforward pricing"
        subtitle="Choose a pricing plan tailored to your business—and boost your profits"
        reasons={content.featuresReason}
      />
      <PlanComparison {...content.comparison} />
      <FAQ items={content.faq} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
    </Box>
  );
}