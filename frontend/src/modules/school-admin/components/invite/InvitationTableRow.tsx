"use client";

import { useState } from "react";
import {
  MoreHorizontal,
  Send,
  Clock3,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { Invitation } from "@/modules/types/dashboard";

interface Props {
  invitation: Invitation;
  onResendInvite: (id: string) => void;
  isResending?: boolean;
}

const statusConfig = {
  Pending: {
    icon: Clock3,
    className: "text-amber-600 bg-amber-50 border-amber-100",
  },
  Accepted: {
    icon: CheckCircle2,
    className: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  Expired: {
    icon: AlertCircle,
    className: "text-red-600 bg-red-50 border-red-100",
  },
  Cancelled: {
    icon: XCircle,
    className: "text-slate-500 bg-slate-50 border-slate-200",
  },
};

export const InvitationTableRow = ({
  invitation,
  onResendInvite,
  isResending = false,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const StatusIcon = statusConfig[invitation.status].icon;

  const canResend =
    invitation.status === "Pending" || invitation.status === "Expired";

  const initials = invitation.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <tr className="hover:bg-slate-50 transition border-b border-slate-50">
      {/* Invitee */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-2xl bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0">
            <span className="text-sm uppercase tracking-wider">{initials}</span>
          </div>

          <div className="whitespace-nowrap">
            <p className="text-sm font-bold text-slate-800">
              {invitation.fullName}
            </p>

            <p className="text-[11px] text-slate-400 font-medium">
              ID: {invitation.id}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <p className="text-sm font-semibold text-slate-600 whitespace-nowrap">
          {invitation.email}
        </p>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span className="text-[11px] text-[#923CF9] font-black uppercase tracking-tight">
          {invitation.role}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider w-fit ${
            statusConfig[invitation.status].className
          }`}
        >
          <StatusIcon size={12} />
          {invitation.status}
        </div>
      </td>

      {/* Invited */}
      <td className="px-6 py-4">
        <p className="text-xs font-semibold text-slate-600 whitespace-nowrap">
          {invitation.invitedAt}
        </p>
      </td>

      {/* Expires */}
      <td className="px-6 py-4">
        <p className="text-xs font-semibold text-slate-600 whitespace-nowrap">
          {invitation.expiresAt}
        </p>
      </td>

      {/* Actions */}
      <td className="relative px-6 py-4 text-right">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#923CF9] transition-colors"
          aria-label={`Actions for ${invitation.fullName}`}
        >
          <MoreHorizontal size={18} />
        </button>
        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-6 top-14 z-50 w-48 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {canResend ? (
              <button
                type="button"
                onClick={() => onResendInvite(invitation.id)}
                disabled={isResending}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isResending ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw size={15} />
                    Resend Invitation
                  </>
                )}
              </button>
            ) : (
              <p className="px-4 py-2.5 text-xs font-medium text-slate-400">
                No actions available
              </p>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};
