"use client";

import React, { useEffect, useState } from "react";
import { Mail, UserPlus, Users } from "lucide-react";
import Modal from "@/modules/shared/component/Modal";
import { InvitationRole } from "@/modules/types/dashboard";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";

interface SendInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    fullName: string;
    email: string;
    role: InvitationRole;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export const SendInviteModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: SendInviteModalProps) => {
  const { modalData } = useModals();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<InvitationRole>("Parent");

  /**
   * If the modal is opened with a preselected role:
   *
   * openModal("invite", { role: "Teacher" })
   *
   * the role will automatically be selected.
   */
  useEffect(() => {
    if (
      modalData &&
      typeof modalData === "object" &&
      "role" in modalData &&
      (modalData.role === "Parent" || modalData.role === "Teacher")
    ) {
      setRole(modalData.role);
    } else {
      setRole("Parent");
    }
  }, [modalData]);

  /**
   * Reset the form whenever the modal closes.
   */
  useEffect(() => {
    if (!isOpen) {
      setFullName("");
      setEmail("");
      setRole("Parent");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      return;
    }

    await onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      role,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Invitation">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Intro */}
        <div className="rounded-2xl border border-[#923CF9]/10 bg-[#923CF9]/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#923CF9] shadow-sm">
              <UserPlus size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                Invite a new user
              </p>

              <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                Send an invitation to a parent or teacher to create their
                EduTrac account.
              </p>
            </div>
          </div>
        </div>

        {/* Full Name */}
        <div>
          <label
            htmlFor="invite-full-name"
            className="mb-2 block text-xs font-black text-slate-700"
          >
            Full Name
          </label>

          <div className="relative">
            <UserPlus
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="invite-full-name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#923CF9] focus:ring-4 focus:ring-[#923CF9]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="invite-email"
            className="mb-2 block text-xs font-black text-slate-700"
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#923CF9] focus:ring-4 focus:ring-[#923CF9]/10 disabled:cursor-not-allowed disabled:bg-slate-50"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-xs font-black text-slate-700">
            Account Type
          </label>

          <div className="grid grid-cols-2 gap-3">
            {(["Parent", "Teacher"] as InvitationRole[]).map((inviteRole) => {
              const isSelected = role === inviteRole;

              return (
                <button
                  key={inviteRole}
                  type="button"
                  onClick={() => setRole(inviteRole)}
                  disabled={isSubmitting}
                  className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-xs font-black transition-all ${
                    isSelected
                      ? "border-[#923CF9] bg-[#923CF9]/5 text-[#923CF9] shadow-sm"
                      : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <Users size={16} />
                  {inviteRole}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[11px] font-medium leading-4 text-slate-400">
            Students do not receive invitations. They access their dashboard
            through their parent&apos;s account.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-xs font-black text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || !fullName.trim() || !email.trim()}
            className="flex h-11 items-center justify-center rounded-xl bg-[#923CF9] px-6 text-xs font-black text-white shadow-sm transition hover:bg-[#8230e5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
