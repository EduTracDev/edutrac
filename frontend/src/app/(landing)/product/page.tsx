import { Metadata } from "next";
import Box from "@mui/material/Box/Box";
import Footer from "@/modules/landing/components/Footer/Footer";
import Navbar from "@/modules/landing/components/Navbar/Navbar";
import FreeTrial from "@/modules/landing/components/FreeTrial/FreeTrial";
import { AuthRoutes } from "@/routes/auth.routes";

export const metadata: Metadata = {
  title: "Edutrac – Contact Us",
  description: "Contact us for any questions or feedback.",
};

export default function ProductPage() {
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
