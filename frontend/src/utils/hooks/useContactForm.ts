import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema, ContactFormData } from "@/utils/validation";
import toast from "react-hot-toast";

export const useContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log(data);

      toast.success("Message sent! Our team will contact you soon.");

      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return {
    ...form,
    onSubmit,
  };
};
