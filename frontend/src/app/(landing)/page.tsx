import Home from "@/modules/landing/page/home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edutrac – School Learning Management System",
  description: "School Learning Management System",
};

export default function HomePage() {
  return (
    <Home
      title="Edutrac"
      description="School Learning Management System"
      buttonText="Get Started"
      buttonLink="/auth/login"
    />
  );
}
