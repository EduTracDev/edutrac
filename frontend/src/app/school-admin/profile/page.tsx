import { ProfileForm } from "@/modules/school-admin/components/profile/ProfileForm";
import { ProfileHeader } from "@/modules/school-admin/components/profile/ProfileHeader";
import { SecuritySettings } from "@/modules/school-admin/components/profile/SecuritySettings";
import AdminLayout from "@/modules/school-admin/layout/AdminLayout";

export default function Page() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <ProfileHeader
          name="Adewale Johnson"
          email="a.johnson@greentreeschool.edu"
          role="Chief Administrator"
        />
        <ProfileForm />
        <SecuritySettings />
      </div>
    </AdminLayout>
  );
}
