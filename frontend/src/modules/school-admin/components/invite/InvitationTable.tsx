"use client";

import { Invitation } from "@/modules/types/dashboard";
import { EmptyState } from "@/modules/shared/EmptyState";

import { InvitationTableRow } from "./InvitationTableRow";
import { InvitationMobileCard } from "./InvitationMobileCard";

interface InvitationTableProps {
  invitations: Invitation[];
  onReset: () => void;
  onResendInvite: (id: string) => void;
  resendingId: string | null;
}

export const InvitationTable = ({
  invitations,
  onReset,
  onResendInvite,
  resendingId,
}: InvitationTableProps) => {
  if (invitations.length === 0) {
    return (
      <EmptyState
        title="No Invitations found"
        description="Try adjusting your filters or search terms."
        onReset={onReset}
        actionLabel="Send Invitation"
        onActionClick={() => {}}
      />
    );
  }

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      {/* Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Invitee
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Email
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Role
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Status
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Invited
              </th>

              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                Expires
              </th>

              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {invitations.map((invitation) => (
              <InvitationTableRow
                key={invitation.id}
                invitation={invitation}
                onResendInvite={onResendInvite}
                isResending={resendingId === invitation.id}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden p-3 space-y-3">
        {invitations.map((invitation) => (
          <InvitationMobileCard
            key={invitation.id}
            invitation={invitation}
            onResendInvite={onResendInvite}
            isResending={resendingId === invitation.id}
          />
        ))}
      </div>
    </div>
  );
};
