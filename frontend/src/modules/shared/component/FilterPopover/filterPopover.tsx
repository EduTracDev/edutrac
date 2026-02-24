"use client";

import { Popover, IconButton } from "@mui/material";
import React, { ReactNode } from "react";

export type FilterOption = {
  label: ReactNode;
  value: string;
};

type FilterPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  options: FilterOption[];
  onSelect: (value: string) => void;
  width?: number | string;
};

export default function FilterPopover({
  open,
  anchorEl,
  onClose,
  options,
  onSelect,
  width = 180,
}: FilterPopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      slotProps={{
        root: {
          className: "!z-[80]  rounded bg-black/20 !bg-opacity-50",
        },
        paper: {
          className: `!bg-white !p-4 !max-h-80 !rounded-md flex flex-col text-left !gap-3 !mt-2 
          !shadow-[0px_0px_40px_rgba(0,0,0,0.1)]`,
          style: { width },
        },
      }}
    >
      {options.map((opt, index) => (
        <button
          key={index}
          className="text-sm! 2xl:text-xs! p-1 flex flex-row gap-2 w-full items-center cursor-pointer"
          onClick={() => {
            onSelect?.(opt.value);
            onClose();
          }}
        >
          {opt.label}
        </button>
      ))}
    </Popover>
  );
}
