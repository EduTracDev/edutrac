import { useState, useEffect } from "react";
import { GradingOverlayDesktop } from "@/modules/teacher/components/assignments/GradingOverlayDesktop";
import { GradingOverlayMobile } from "@/modules/teacher/components/assignments/GradingOverlayMobile";

export interface GradingOverlayProps {
  studentName: string;
  submissionDate: string;
  fileName: string;
  totalPoints: number;
  onClose: () => void;
  onSave: (grade: number, feedback: string) => void;
}

export const GradingOverlay = (props: GradingOverlayProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <GradingOverlayMobile {...props} />
  ) : (
    <GradingOverlayDesktop {...props} />
  );
};
