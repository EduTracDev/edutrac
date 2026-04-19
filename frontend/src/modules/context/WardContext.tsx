"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Ward } from "@/modules/types/dashboard";

interface WardContextType {
  activeWard: Ward | null;
  setActiveWardId: (id: string) => void;
  wards: Ward[];
}

const WardContext = createContext<WardContextType | undefined>(undefined);

export const WardProvider = ({
  children,
  initialWards,
}: {
  children: ReactNode;
  initialWards: Ward[];
}) => {
  const [activeWardId, setActiveWardId] = useState(initialWards[0]?.id);

  const activeWard = initialWards.find((w) => w.id === activeWardId) || null;

  return (
    <WardContext.Provider
      value={{ activeWard, setActiveWardId, wards: initialWards }}
    >
      {children}
    </WardContext.Provider>
  );
};

export const useWard = () => {
  const context = useContext(WardContext);
  if (!context) throw new Error("useWard must be used within a WardProvider");
  return context;
};
