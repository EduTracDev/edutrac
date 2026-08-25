export type AnnouncementAudienceRole =
  | "School Admins"
  | "Teachers"
  | "Parents"
  | "Students";

export interface AnnouncementFormData {
  id?: string;
  title: string;
  content: string;
  priority: "Normal" | "Important" | "Urgent";
  targetType: "All" | "Specific";
  selectedSchoolIds: string[];
  targetRoles: AnnouncementAudienceRole[];
  scheduleType: "Immediate" | "Scheduled";
  scheduledAt?: string;
  status?: "Published" | "Scheduled" | "Draft" | "Archived";
  createdAt?: string;
}

export type AnnouncementFormErrors = Partial<
  Record<keyof AnnouncementFormData, string>
>;

export function validateAnnouncementForm(
  data: AnnouncementFormData,
): AnnouncementFormErrors {
  const errors: AnnouncementFormErrors = {};

  if (!data.title.trim()) errors.title = "Announcement title is required.";
  if (!data.content.trim())
    errors.content = "Announcement content cannot be empty.";

  if (data.targetType === "Specific" && data.selectedSchoolIds.length === 0) {
    errors.selectedSchoolIds = "Select at least one target school.";
  }

  if (data.targetRoles.length === 0) {
    errors.targetRoles = "Select at least one audience group.";
  }

  if (data.scheduleType === "Scheduled") {
    if (!data.scheduledAt) {
      errors.scheduledAt = "Please set a publication date and time.";
    } else if (new Date(data.scheduledAt).getTime() <= Date.now()) {
      errors.scheduledAt = "Scheduled date must be in the future.";
    }
  }

  return errors;
}
