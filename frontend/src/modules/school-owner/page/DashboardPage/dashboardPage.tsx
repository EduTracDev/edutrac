import React from "react";
import { Button } from "@/modules/shared/component/Button";
// import ArrowLeftIcon from "@/modules/shared/assets/svgs/chevronBack.svg";


interface DashboardPageProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function DashboardPage({
  title,
  description,
  buttonText,
  buttonLink,
}: DashboardPageProps) {
  return <div>DashboardPage <p className="text-neutral-900 text-[#7F7F7F]">
    
    {/* <ArrowLeftIcon /> */}
    </p> </div>;
}
