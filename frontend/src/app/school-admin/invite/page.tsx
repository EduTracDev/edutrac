"use client";
import { useState, useMemo } from "react";
import { useModals } from "@/modules/shared/component/ModalProvider/modalProvider";
import { invitationData } from "@/modules/constants/dashboard";
import {
  InvitationFilters,
  Invitation,
  InvitationRole,
  InvitationStatus,
} from "@/modules/types/dashboard";
import { InviteStats } from "@/modules/school-admin/components/invite/InviteStats";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";
import { SharedPagination } from "@/modules/shared/Pagination";
import { toast } from "react-hot-toast";
import { InvitationActionBar } from "@/modules/school-admin/components/invite/InvitationActionBar";
import { InvitationTable } from "@/modules/school-admin/components/invite/InvitationTable";
import { SendInviteModal } from "@/modules/school-admin/components/dashboard/modals/SendInviteModal";

export default function Page() {
  const { activeModal, closeModal } = useModals();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendingId, setResendingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [invitations, setInvitations] = useState<Invitation[]>(invitationData);
  const initialFilters: InvitationFilters = {
    role: "All",
    status: "All",
  };

  const [filters, setFilters] = useState<InvitationFilters>(initialFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredInvitations = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return invitationData.filter((invitation) => {
      const matchesSearch =
        !query ||
        invitation.fullName.toLowerCase().includes(query) ||
        invitation.email.toLowerCase().includes(query);

      const matchesRole =
        filters.role === "All" || invitation.role === filters.role;

      const matchesStatus =
        filters.status === "All" || invitation.status === filters.status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, filters, invitationData]);

  const handleFilterChange = (type: keyof InvitationFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));

    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSendInvite = async (data: {
    fullName: string;
    email: string;
    role: InvitationRole;
  }) => {
    setIsSubmitting(true);

    try {
      const newInvitation: Invitation = {
        id: `INV-${Date.now()}`,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        status: "Pending",
        invitedAt: "Sep 22, 2026",
        expiresAt: "Sep 29, 2026",
        resendCount: 0,
      };

      setInvitations((prev) => [newInvitation, ...prev]);

      toast.success(`Invitation sent to ${data.email}`);

      closeModal();
    } catch {
      toast.error("Failed to send invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendInvite = async (invitationId: string) => {
    setResendingId(invitationId);

    try {
      // TODO: Replace with your API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setInvitations((prev) =>
        prev.map((invitation) =>
          invitation.id === invitationId
            ? {
                ...invitation,
                status: "Pending",
                resendCount: invitation.resendCount + 1,
              }
            : invitation,
        ),
      );

      toast.success("Invitation resent successfully");
    } catch {
      toast.error("Failed to resend invitation");
    } finally {
      setResendingId(null);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentInvitations = filteredInvitations.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const inviteStats = useMemo(() => {
    return {
      total: filteredInvitations.length,

      accepted: filteredInvitations.filter(
        (invite) => invite.status === "Accepted",
      ).length,

      pending: filteredInvitations.filter(
        (invite) => invite.status === "Pending",
      ).length,

      expired: filteredInvitations.filter(
        (invite) => invite.status === "Expired",
      ).length,
    };
  }, [filteredInvitations]);
  return (
    <AdminLayout>
      <div className="">
        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-900">
              Invite People
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Invite parents and teachers to join your school on EduTrac.
            </p>
          </div>
        </div>
        {/* Invite Stats */}
        <InviteStats stats={inviteStats} />
        <div className=" mt-8">
          <p className="text-xs font-medium text-slate-500">
            Showing{" "}
            <span className="text-[#923CF9] font-bold">
              {filteredInvitations.length}
            </span>
            {filteredInvitations.length === 1 ? " invitation" : " invitations"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
        <div className="mt-8">
          {/* ACTION BAR */}
          <InvitationActionBar
            onSearch={setSearchQuery}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            totalResults={filteredInvitations.length}
          />
        </div>
        <div className="mt-8">
          {/* Invitation Table */}

          <InvitationTable
            invitations={currentInvitations}
            onReset={handleClearFilters}
            onResendInvite={handleResendInvite}
            resendingId={resendingId}
          />
          {/* pagination */}
          <SharedPagination
            entityName="invitation"
            totalItems={filteredInvitations.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(val) => {
              setItemsPerPage(val);
              setCurrentPage(1);
            }}
          />
          {/* Invite modal */}
          <SendInviteModal
            isOpen={activeModal === "invite"}
            onClose={closeModal}
            onSubmit={handleSendInvite}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
