export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type TicketCategory =
  | "Billing"
  | "Technical Bug"
  | "Account Access"
  | "Feature Request";

export interface TicketMessage {
  id: string;
  senderName: string;
  senderRole: "School Admin" | "Super Admin" | "Support Agent";
  message: string;
  timestamp: string;
  isInternalNote?: boolean;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  schoolName: string;
  schoolId: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
  messages: TicketMessage[];
}

export const MOCK_TICKETS: SupportTicket[] = [
  {
    id: "tick_1",
    ticketNumber: "ED-1042",
    schoolName: "Greenwood High",
    schoolId: "sch_1",
    subject: "Unable to process payment for annual subscription renewal",
    category: "Billing",
    priority: "High",
    status: "Open",
    createdAt: "Aug 18, 2026, 10:15 AM",
    updatedAt: "Aug 18, 2026, 10:15 AM",
    messages: [
      {
        id: "msg_1",
        senderName: "David Miller (School Admin)",
        senderRole: "School Admin",
        message:
          "We attempted to renew our Professional Plan using our corporate card, but the platform throws a gateway timeout error.",
        timestamp: "Aug 18, 2026, 10:15 AM",
      },
    ],
  },
  {
    id: "tick_2",
    ticketNumber: "ED-1039",
    schoolName: "St. Jude Grammar",
    schoolId: "sch_2",
    subject: "Report card export failing for Senior Secondary 3",
    category: "Technical Bug",
    priority: "Urgent",
    status: "In Progress",
    assignedAgent: "Alex Rivera",
    createdAt: "Aug 17, 2026, 02:30 PM",
    updatedAt: "Aug 18, 2026, 09:00 AM",
    messages: [
      {
        id: "msg_2",
        senderName: "Sister Clara",
        senderRole: "School Admin",
        message:
          "When generating PDF grade sheets for class SS3, the system gets stuck at 90% and times out.",
        timestamp: "Aug 17, 2026, 02:30 PM",
      },
      {
        id: "msg_3",
        senderName: "Alex Rivera",
        senderRole: "Super Admin",
        message:
          "We're inspecting the PDF rendering service queue. It appears to be affected by memory limits on high-volume exports.",
        timestamp: "Aug 18, 2026, 09:00 AM",
      },
    ],
  },
  {
    id: "tick_3",
    ticketNumber: "ED-1025",
    schoolName: "Apex International",
    schoolId: "sch_3",
    subject: "Requesting custom domain binding for apex.edu",
    category: "Feature Request",
    priority: "Low",
    status: "Resolved",
    assignedAgent: "Sarah Chen",
    createdAt: "Aug 12, 2026, 11:00 AM",
    updatedAt: "Aug 14, 2026, 04:45 PM",
    messages: [
      {
        id: "msg_4",
        senderName: "Marcus Vance",
        senderRole: "School Admin",
        message:
          "We have configured CNAME records pointing to EduTrac. Can you finalize SSL provisioning?",
        timestamp: "Aug 12, 2026, 11:00 AM",
      },
      {
        id: "msg_5",
        senderName: "Sarah Chen",
        senderRole: "Support Agent",
        message:
          "DNS verification succeeded. SSL certificate has been issued and domain apex.edu is active.",
        timestamp: "Aug 14, 2026, 04:45 PM",
      },
    ],
  },
];
