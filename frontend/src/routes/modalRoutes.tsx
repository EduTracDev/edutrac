/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ReactNode } from "react";

export interface ModalRouteProps {
  component: ReactNode;
  className?: string;
  hasCloseIcon?: boolean;
  isKeepOpen?: boolean;
  modalProps?: any;
}

export enum ModalRoute {
  announcement = "announcement",
  announcementDetail = "announcement-detail",
  scheduleTour = "schedule-tour",
  cancelTour = "cancel-tour",
  rescheduleTour = "reschedule-tour",
  recordAttendance = "record-attendance",
  invoiceReceipt = "invoice-receipt",
  parentInvoiceReceipt = "parent-invoice-receipt",
  sendInvoice = "send-invoice",
}

export const modalLayouts: { [key: string]: ModalRouteProps } = {
  // [ModalRoute.announcement]: {
  //   component: <CreateAnnouncementModal  />,
  // },
  // [ModalRoute.recordAttendance]: {
  //   component: <RecordAttendanceModal />,
  // },
};
