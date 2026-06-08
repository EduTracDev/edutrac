"use client";
import { MdOutlineMail, MdOutlineLocationOn, MdOutlinePhone } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineHandThumbUp } from "react-icons/hi2";
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
    <main className="min-h-screen bg-[#F9FAFB] pt-32 pb-16 lg:pt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-source-sans text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-base font-poppins">
            We are here to help. Reach out to us for any inquiries or support.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Form Side */}
          <section
            className="flex-[1.4] bg-white p-8 md:p-10 rounded-lg shadow-sm"
            aria-labelledby="form-title"
          >
            <h2 id="form-title" className="text-2xl font-bold mb-1 text-[#0F172A]">
              Email Us
            </h2>
            <p className="text-gray-400 text-sm mb-8">Fill the form below</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* First & Last Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-[#0F172A]">
                    First Name
                  </label>
                  <input
                    {...register("firstName")}
                    id="firstName"
                    placeholder="Enter your First Name"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">{errors.firstName.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-[#0F172A]">
                    Last Name
                  </label>
                  <input
                    {...register("lastName")}
                    id="lastName"
                    placeholder="Enter your Last Name"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#0F172A]">
                  Email Address
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-semibold text-[#0F172A]">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  id="phoneNumber"
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs">{errors.phoneNumber.message}</span>
                )}
              </div>

              {/* School Name */}
              <div className="space-y-2">
                <label htmlFor="schoolName" className="text-sm font-semibold text-[#0F172A]">
                  School Name
                </label>
                <input
                  {...register("schoolName")}
                  id="schoolName"
                  placeholder="Enter school name"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                />
                {errors.schoolName && (
                  <span className="text-red-500 text-xs">{errors.schoolName.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-[#0F172A]">
                  Subject
                </label>
                <input
                  {...register("subject")}
                  id="subject"
                  placeholder=""
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none transition"
                />
                {errors.subject && (
                  <span className="text-red-500 text-xs">{errors.subject.message}</span>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#0F172A]">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  placeholder="Describe"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-md text-sm placeholder:text-gray-300 focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent outline-none resize-none transition"
                />
                {errors.message && (
                  <span className="text-red-500 text-xs">{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg font-bold text-base transition-colors duration-200 mt-2"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </section>

          {/* Right Side */}
          <aside className="flex-1 flex flex-col gap-6 lg:pt-2 mt-0 lg:mt-5">
            {/* Administrator Support Card */}
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-[#7C3AED] rounded-2xl flex items-center justify-center">
                <HiOutlineUser size={26} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-1">Administrator Support</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  For School administrators,{" "}
                  <Link href="#" className="text-[#7C3AED] hover:underline font-medium">
                    access our help center
                  </Link>{" "}
                  for detailed guides or speak directly to our support team
                </p>
              </div>
            </div>

            {/* See How Edutrac Works Card */}
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-[#7C3AED] rounded-2xl flex items-center justify-center">
                <img src="/icon/icon.svg" alt="hand" className="text-white w-6 h-6" />
                {/* <HiOutlineHandThumbUp size={26} className="text-white" /> */}
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#0F172A] mb-3">See How Edutrac Works</h3>
                <button className="px-5 py-2.5 border-2 border-[#7C3AED] text-[#7C3AED] rounded-lg font-semibold text-sm hover:bg-[#7C3AED] hover:text-white transition-colors duration-200">
                  Request Live Demo
                </button>
              </div>
            </div>

            {/* Office Info */}
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-15">
                <div className="flex items-start gap-3">
                  <MdOutlinePhone size={22} className="text-[#0F172A] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1">Office Numbers</h4>
                    <p className="text-gray-500 text-sm">+234(0)803-385-6126</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdOutlineLocationOn size={22} className="text-[#0F172A] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#0F172A] text-sm mb-1">Office Address</h4>
                    <p className="text-gray-500 text-sm">Chevvyway Estate, Lekki, Lagos</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}