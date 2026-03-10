import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema, ContactFormData } from "@/utils/validation";

export const useContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
