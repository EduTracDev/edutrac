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

export const InvitationMobileCard = ({
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
    <div className="relative bg-white border border-slate-100 rounded-2xl p-4 mb-3 shadow-sm">
      {/* Top */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-[#923CF9]/10 flex items-center justify-center text-[#923CF9] font-bold shrink-0">
          <span className="text-sm uppercase tracking-wider">{initials}</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-800 truncate">
            {invitation.fullName}
          </p>

          <p className="text-[10px] text-slate-400 font-medium">
            ID: {invitation.id}
          </p>
        </div>

        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border text-[9px] font-black uppercase tracking-wider shrink-0 ${
            statusConfig[invitation.status].className
          }`}
        >
          <StatusIcon size={10} />
          {invitation.status}
        </div>
      </div>

      {/* Information */}
      <div className="mt-4 border-t border-slate-50 pt-3 space-y-3">
        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Email
          </p>

          <p className="text-xs font-bold text-slate-700 break-all">
            {invitation.email}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Role
            </p>

            <p className="text-xs font-bold text-[#923CF9] uppercase">
              {invitation.role}
            </p>
          </div>

          <div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Invited
            </p>

            <p className="text-xs font-bold text-slate-700">
              {invitation.invitedAt}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
            Expires
          </p>

          <p className="text-xs font-bold text-slate-700">
            {invitation.expiresAt}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-end">
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 text-slate-400 hover:text-[#923CF9] transition-colors"
            aria-label={`Actions for ${invitation.fullName}`}
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 bottom-full mb-2 z-[100] w-48 bg-white rounded-2xl border border-slate-100 shadow-xl py-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              {canResend ? (
                <button
                  onClick={() => {
                    onResendInvite(invitation.id);
                    setMenuOpen(false);
                  }}
                  disabled={isResending}
                  className="w-full text-left px-4 py-2.5 text-xs font-bold text-[#923CF9] hover:bg-[#923CF9]/5 flex items-center gap-2 disabled:opacity-50"
                >
                  {" "}
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
        </div>
      </div>
    </div>
  );
};
