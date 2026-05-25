import { Metadata } from "next";
import Box from "@mui/material/Box/Box";
import PricingGrids from "@/modules/landing/components/PricingComponents/PricingGrids";
import PlanComparison from "@/modules/landing/components/PricingComponents/PlanComparison";
import PricingFAQ from "@/modules/landing/components/PricingComponents/PricingFAQ";
import Footer from "@/modules/landing/components/Footer/Footer";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import { AuthRoutes } from "@/routes/auth.routes";
import FinalCTA from "@/modules/landing/components/PricingComponents/FinalCTA";
import { OnboardingRoutes } from "@/routes/onboardingRoutes";

export const metadata: Metadata = {
  title: "Pricing | EduTrac – Affordable School Management Plans",
  description:
    "Transparent, yearly pricing for schools of all sizes. Choose the plan that fits your institution and start your 14-day free trial today. No hidden fees.",
  openGraph: {
    title: "EduTrac Pricing – Plans Built for Every Institution",
    description:
      "Scale your school with our flexible yearly plans. From basic tutoring centers to large multi-campus schools.",
  },
};

export default function PricingPage() {
  const content = {
    plans: [
      {
        id: "basic",
        name: "Basic",
        description:
          "Perfect for small tutoring centers and schools starting their digital journey.",
        price: "45,000",
        isPopular: true,
        buttonText: "Start for Free", // Added
        features: [
          "Up to 50 Students",
          "Attendance Tracking",
          "Basic Reporting",
          "Email Support",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        description: "Comprehensive tools for growing schools and academies.",
        price: "45,000",
        buttonText: "Get Pro Now",
        saveAmount: "Save ₦10,000 yearly",
        features: [
          "Unlimited Students",
          "Advanced Analytics",
          "Parent Portal",
          "Exam Management",
          "Priority Support",
        ],
      },

      {
        id: "ultra",
        name: "Ultra",
        description: "Tailored solutions for large multi-campus institutions.",
        price: "Custom",

        buttonText: "Contact Sales",
        features: [
          "Multi-school Management",
          "API Access",
          "Dedicated Manager",
          "Custom Branding",
          "On-site Training",
        ],
      },
    ],
    comparison: {
      title: "Compare Features",
      subtitle: "Detailed breakdown to help you choose the right fit.",
      categories: [
        {
          name: "Core Features",
          features: [
            {
              name: "Student Management",
              basic: true,
              pro: true,
              ultra: true,
            },
            { name: "Attendance", basic: true, pro: true, ultra: true },
            {
              name: "Exam Management",
              basic: false,
              pro: true,
              ultra: true,
            },
            {
              name: "Custom Domain",
              basic: false,
              pro: false,
              ultra: true,
            },
          ],
        },
        {
          name: "Support",
          features: [
            { name: "Help Center", basic: true, pro: true, ultra: true },
            {
              name: "Response Time",
              basic: "48h",
              pro: "12h",
              ultra: "Instant",
            },
          ],
        },
      ],
    },
    faq: {
      title: "Pricing FAQs",
      subtitle: "Everything you need to know about our plans and billing.",
      questions: [
        {
          question: "Can I switch plans later?",
          answer:
            "Absolutely. You can upgrade or downgrade your plan at any time. Changes are reflected in your next billing cycle.",
        },
        {
          question: "Is there a discount for large schools?",
          answer:
            "Yes! Our Enterprise plan is designed for institutions with over 1,000 students. Contact our team for custom volume pricing.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, bank transfers, and local payment gateways integrated for Nigerian institutions.",
        },
      ],
    },
    cta: {
      title: "Ready to transform your institution?",
      subtitle: "Join over 1,200 schools already growing with EduTrac.",
      buttonText: "Get Started Now",
      buttonLink: OnboardingRoutes.plan,
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
      <Navbar buttonText="Get Started" buttonLink={OnboardingRoutes.plan} />
      <PricingGrids
        badge="Pricing Plans"
        title="Simple, Transparent Pricing"
        items={content.plans}
      />
      <PlanComparison {...content.comparison} />
      <PricingFAQ {...content.faq} />
      <FinalCTA {...content.cta} />
      <FreeTrial {...content.freeTrial} />
      <Footer />
    </Box>
  );
}
