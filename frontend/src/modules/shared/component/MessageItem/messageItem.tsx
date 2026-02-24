/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Checkbox, Chip, Avatar, Box, Typography } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";
import UserIcon from "@/modules/shared/assets/svgs/userOutline.svg";

interface MessageItemProps {
  isActive?: boolean;
  name: string;
  tag: string;
  subject?: string;
  preview: string;
  time: string;
  avatar: any;
  grade?: string;
  student?: string;
  /** Unread count from API; when > 0 shows badge with number */
  /** Client-side "marked as unread" only; applies unread styling without a number badge */
  isUnread?: boolean;
  unread?: boolean | number;
  onClick?: () => void;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export const MessageItem: FC<MessageItemProps> = ({
  name,
  tag,
  subject,
  preview,
  time,
  avatar,
  grade,
  student,
  unread,
  isUnread,
  isActive,
  onClick,
  checked,
  onCheckChange,
}) => {
  const showUnreadStyle = ((typeof unread === "number" && unread > 0) || (typeof unread === "boolean" && unread)) || isUnread;
  const showUnreadBadge = typeof unread === "number" && unread > 0;

  return (
    <>
      <div
        className={classNames(
          "flex hover:bg-gray-100 p-3   cursor-pointer",
          showUnreadStyle ? "bg-dashboard-bg" : "bg-white border-b border-border-lightGray",
        )}
        onClick={onClick}
      >
        <div className="flex items-center gap-4 flex-1">
          <Checkbox
            size="small"
            sx={{
              color: "#D0D5DD",
              "&.Mui-checked": {
                color: "#008080",
                // backgroundColor: "#008080",
                // "& .MuiSvgIcon-root": { color: "#fff" },
              },
            }}
            checked={checked ?? false}
            onChange={(e) => {
              e.stopPropagation();
              onCheckChange?.(e.target.checked);
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {/* <Avatar>{avatar}</Avatar> */}
          {avatar ? (
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-center object-cover"
            />
          ) : (
            <UserIcon className="w-10 h-10" />
          )}

          <Box className="flex flex-col flex-1">
            <Box className="flex items-center justify-between">
              <Box className="flex items-center gap-2">
                <Typography className="!text-sm !font-semibold !text-black">{name}</Typography>
                <Chip
                  label={tag}
                  className={classNames(
                    "!px-2 !text-[9px]",
                    tag === "Parent"
                      ? "!bg-[#EDFFF7] !text-success-green"
                      : tag === "Teacher"
                        ? "!bg-[#1570EF1A] !text-[#1570EF]"
                        : tag === "Admin"
                          ? "!bg-[#1570EF1A] !text-[#1570EF]"
                          : tag === "Staff"
                            ? "!bg-[#1570EF1A] !text-[#1570EF]"
                            : "!bg-[#1570EF1A] !text-[#1570EF]",
                  )}
                  size="small"
                />
              </Box>
            </Box>

            <Box className="flex items-center text-[10px] text-text-tertiary/70 gap-1">
              {student && <span>{student}</span>}
              {grade && <span>• {grade}</span>}
            </Box>
         
            <Typography className="!text-xs !text-text-tertiary/70 !font-normal truncate !max-w-lg w-full">
              {preview}
            </Typography>
          </Box>
        </div>

        <div className="flex flex-col justify-between items-end p-1 h-full gap-3">
          <Typography className="!text-[10px] !text-text-tertiary/70">{time}</Typography>
          {showUnreadBadge ? (
            <div className="bg-teal-600 text-white text-xs font-medium rounded-md w-4 h-4 flex items-center justify-center">
              {unread}
            </div>
          ) : null}
        </div>
      </div>
      {/* {!isActive && <hr className="border-[#D0D5DD]" />} */}
    </>
  );
};
