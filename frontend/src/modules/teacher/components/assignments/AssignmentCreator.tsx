// @/modules/teacher/components/assignments/AssignmentCreator.tsx
"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { assignmentSchema, AssignmentFormData } from "@/utils/validation";

// Sub-components
import { CreatorHeader } from "./CreatorHeader";
import { AssignmentForm } from "./AssignmentForm";
import { AssignmentSidebar } from "./AssignmentSidebar";
import { StudentPreview } from "./StudentPreview";
import { CreatorFooter } from "./CreatorFooter";

interface AssignmentCreatorProps {
  onSave: (data: AssignmentFormData & { attachments: File[] }) => Promise<void>;
  onCancel: () => void;
  availableClasses: string[];
}

export const AssignmentCreator = ({
  onSave,
  onCancel,
  availableClasses,
}: AssignmentCreatorProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [attachments, setAttachments] = useState<File[]>([]);

  const formMethods = useForm<AssignmentFormData>({
    resolver: yupResolver(assignmentSchema),
    defaultValues: { points: 10, allowLateSubmission: false },
  });

  const formData = useWatch({ control: formMethods.control });

  const onSubmit = async (data: AssignmentFormData) => {
    setIsSaving(true);
    try {
      await onSave({ ...data, attachments });
    } catch (err) {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] border-2 border-[#923CF9]/10 shadow-2xl p-8 max-w-4xl mx-auto animate-in fade-in zoom-in duration-300">
      <CreatorHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetClass={formData.targetClass}
      />

      {activeTab === "edit" ? (
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="animate-in slide-in-from-left-4 duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <AssignmentForm
              register={formMethods.register}
              errors={formMethods.formState.errors}
              attachments={attachments}
              setAttachments={setAttachments}
            />
            <AssignmentSidebar
              register={formMethods.register}
              availableClasses={availableClasses}
            />
          </div>
        </form>
      ) : (
        <StudentPreview formData={formData} />
      )}

      <CreatorFooter
        onCancel={onCancel}
        isSaving={isSaving}
        // We pass the submit trigger manually since the button is outside the <form> tag
        onPublish={formMethods.handleSubmit(onSubmit)}
      />
    </div>
  );
};
