"use client";
import {
  FaFacebookF,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaPhone,
  FaTiktok,
} from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { useContactForm } from "@/utils/hooks/useContactForm";
import Link from "next/link";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    onSubmit,
  } = useContactForm();

  return (
    <main className="min-h-screen bg-white pt-32 pb-16 lg:pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            We are here to help. Reach out to us for any inquiries or support.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form Side */}
          <section
            className="flex-[1.5] bg-white p-8 md:p-12 rounded-[40px] border border-gray-100 shadow-sm"
            aria-labelledby="form-title"
          >
            {" "}
            <h2 id="form-title" className="text-2xl font-bold mb-2">
              Email Us
            </h2>
            <p className="text-gray-400 mb-8">Fill the form below</p>{" "}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-bold text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    id="firstName"
                    placeholder="Enter your First Name"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-bold text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    id="lastName"
                    placeholder="Enter your Last Name"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-bold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="phoneNumber"
                  className="text-sm font-bold text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="schoolName"
                  className="text-sm font-bold text-gray-700"
                >
                  School Name
                </label>
                <input
                  {...register("schoolName")}
                  id="schoolName"
                  placeholder="Enter school name"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none"
                />
                {errors.schoolName && (
                  <span className="text-red-500 text-xs">
                    {errors.schoolName.message}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-sm font-bold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  placeholder="Describe your inquiry"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#923CF9] outline-none resize-none"
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-[#923CF9] text-white rounded-2xl font-black"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </section>
          {/* Contact Details Side */}
          <aside className="flex-1 space-y-12 lg:pt-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#923CF9]/10 rounded-2xl text-[#923CF9]">
                  <MdOutlineMail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-500">support@edutrac.app</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-[#923CF9]/10 rounded-2xl text-[#923CF9]">
                  <FaPhone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-500">+234 (0) 803-385-6126</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Follow Our Socials</h3>
              <div className="flex gap-1">
                <Link
                  href="#"
                  aria-label="Facebook"
                  className="p-4 border border-gray-100 rounded-2xl hover:bg-[#923CF9] hover:text-white transition-all"
                >
                  <FaFacebookF size={20} />
                </Link>
                <Link
                  href="#"
                  aria-label="Instagram"
                  className="p-4 border border-gray-100 rounded-2xl hover:bg-[#923CF9] hover:text-white transition-all"
                >
                  <FaInstagram size={20} />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="p-4 border border-gray-100 rounded-2xl hover:bg-[#923CF9] hover:text-white transition-all"
                >
                  <FaXTwitter size={20} />
                </Link>
                <Link
                  href="#"
                  aria-label="Twitter"
                  className="p-4 border border-gray-100 rounded-2xl hover:bg-[#923CF9] hover:text-white transition-all"
                >
                  <FaLinkedin size={20} />
                </Link>
                <Link
                  href="#"
                  aria-label="TikTok"
                  className="p-4 border border-gray-100 rounded-2xl hover:bg-[#923CF9] hover:text-white transition-all"
                >
                  <FaTiktok size={20} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
