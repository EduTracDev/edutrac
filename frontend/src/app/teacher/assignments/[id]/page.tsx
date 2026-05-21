import AssignmentSubmissions from "@/modules/teacher/components/assignments/AssignmentSubmissions";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Just pass the promise straight down
  return <AssignmentSubmissions params={params} />;
}
