/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Plus,
  X,
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Layout,
  CheckCircle,
  Video,
  Users,
  UserPlus,
  Network,
  Calendar,
  Smartphone,
  Tablet,
  Monitor,
} from "lucide-react";
import { useSchoolTheme } from "@/app/theme";

const PRESET_COLORS = ["#6366F1", "#D97706", "#EC4899", "#22C55E", "#CDE484"];

export default function OnboardingComponent() {
  const { setSchoolTheme } = useSchoolTheme();

  // Step navigation wizard structural track controller indices variables state definitions
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 7;

  const [selectedColor, setSelectedColor] = useState<string>("#6366F1");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showLogoModal, setShowLogoModal] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const [banner1, setBanner1] = useState<string | null>(null);
  const [banner2, setBanner2] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);
  const [mediaImages, setMediaImages] = useState<string[]>([]);

  // Real-time landing text content modifiers fields options states tracking instances
  const [heroTitle, setHeroTitle] = useState<string>(
    "Streamline education from classroom to district",
  );
  const [heroSubtitle, setHeroSubtitle] = useState<string>(
    "Connect your entire educational community with EduTrac's all-in-one platform.",
  );

  const banner1Ref = useRef<HTMLInputElement>(null);
  const banner2Ref = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const mediaRef = useRef<HTMLInputElement>(null);

  const handleForward = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };
  const handleBackward = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setTarget: (val: string | null) => void,
    isLogo: boolean = false,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTarget(isLogo ? file.name : URL.createObjectURL(file));
      if (isLogo) setShowLogoModal(false);
    }
  };

  const applyThemeColor = (color: string) => {
    setSelectedColor(color);
    setSchoolTheme({ primary: color, primaryHover: color + "CC" });
  };

  return (
    <div className="min-h-screen bg-white text-[#1E1E2F] flex flex-col justify-between relative overflow-x-hidden">
      {/* Dynamic Upper Top Navigation Contextual Header Elements Control Panel Row */}
      <header className="w-full bg-white px-6 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-40">
        <button
          onClick={handleBackward}
          disabled={currentStep === 1}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1 disabled:opacity-20 transition-opacity"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <div className="w-48 bg-gray-100 h-1 rounded-full relative overflow-hidden">
          <div
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            className="absolute top-0 left-0 h-full bg-dynamicBrand transition-all duration-300"
          />
        </div>
        <button
          onClick={handleForward}
          disabled={currentStep === totalSteps}
          className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1 disabled:opacity-0 transition-opacity"
        >
          {currentStep === 3 ? "Skip" : "Next"} <ArrowRight size={14} />
        </button>
      </header>

      {/* Primary Wizard View Render Block Switch Controller Panels Layer */}
      <main className="w-full max-w-6xl mx-auto px-4 py-8 flex-grow flex flex-col justify-center items-center">
        {/* VIEW STEP 1: Core Institutional Details Setup Section */}
        {currentStep === 1 && (
          <div className="w-full max-w-xl space-y-6 animate-in fade-in duration-200">
            <div className="text-center">
              <h1 className="text-3xl font-black text-[#1E1E2F] tracking-tight">
                Add account details
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                We&apos;ve gotten you started
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
              <h3 className="text-xs font-bold text-center uppercase tracking-wider text-gray-500">
                Select your theme
              </h3>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => applyThemeColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-11 h-11 rounded-full transition-all ${
                      selectedColor === color
                        ? "ring-4 ring-offset-2 ring-dynamicBrand scale-105"
                        : "border border-black/5 hover:scale-105"
                    }`}
                  />
                ))}
                <button
                  onClick={() => setShowColorPicker(true)}
                  className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-center uppercase tracking-wider text-gray-500">
                  Customize your profile
                </h3>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">
                    Primary Banner Image
                  </label>
                  <div
                    onClick={() => banner1Ref.current?.click()}
                    className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xs text-gray-400 truncate">
                      {banner1 ? "Primary Image Loaded" : "Upload Image"}
                    </span>
                    <UploadCloud size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="file"
                    ref={banner1Ref}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setBanner1)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase">
                    Secondary Banner Image
                  </label>
                  <div
                    onClick={() => banner2Ref.current?.click()}
                    className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xs text-gray-400 truncate">
                      {banner2 ? "Secondary Image Loaded" : "Upload Image"}
                    </span>
                    <UploadCloud size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="file"
                    ref={banner2Ref}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setBanner2)}
                  />
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowLogoModal(true)}
                  className="text-xs font-bold text-dynamicBrand hover:underline"
                >
                  Configure School Brand Logo Asset &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW STEP 2: Structural Operation Model Choice Grid Layout */}
        {currentStep === 2 && (
          <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-200">
            <div>
              <h1 className="text-3xl font-black text-[#1E1E2F] tracking-tight">
                Setup Options
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Choose the setup options that best fit your school type.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Physical School Matrix
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: <Calendar size={18} />,
                      title: "Academic Calendar",
                      desc: "Define fields for terms, academic years, and vacation slots.",
                    },
                    {
                      icon: <Network size={18} />,
                      title: "Campus Branches",
                      desc: "Organize records smoothly across multiple territorial locations.",
                    },
                    {
                      icon: <Users size={18} />,
                      title: "Staff Directory",
                      desc: "Provision profiles for active educators and department directors.",
                    },
                    {
                      icon: <UserPlus size={18} />,
                      title: "Parent Network",
                      desc: "Invite family guardians to track pupil grades and schedules.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:border-dynamicBrand transition-all group cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-700 group-hover:bg-purple-50 group-hover:text-dynamicBrand mb-4 transition-colors">
                        {item.icon}
                      </div>
                      <h4 className="text-xs font-bold text-[#1E1E2F] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW STEP 3: Content Introduction Screen Notice Panels Panel Layout */}
        {currentStep === 3 && (
          <div className="w-full max-w-xl text-center space-y-6 animate-in fade-in duration-200">
            <h1 className="text-4xl font-black text-[#1E1E2F] tracking-tight leading-tight">
              Let&apos;s create your school&apos;s landing page
            </h1>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Your public landing profile displays important details,
              announcements, news boards, and event entries to external site
              visitors.
            </p>
            <div className="pt-2">
              <button
                onClick={handleForward}
                className="px-8 py-3 bg-dynamicBrand hover:bg-dynamicBrandHover text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Start Setup Wizard
              </button>
            </div>
          </div>
        )}

        {/* VIEW STEP 4: Split Content Engine With Real-time Device Viewport Emulation Frame */}
        {currentStep === 4 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-5 space-y-5 shadow-xs">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Homepage Editor
              </h2>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-dynamicBrand"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-500">
                  Banner Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-dynamicBrand resize-none"
                />
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex justify-center items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 w-fit mx-auto shadow-2xs">
                {["desktop", "tablet", "mobile"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${viewMode === mode ? "bg-gray-100 text-[#1E1E2F]" : "text-gray-400"}`}
                  >
                    {mode === "desktop" ? (
                      <Monitor size={14} />
                    ) : mode === "tablet" ? (
                      <Tablet size={14} />
                    ) : (
                      <Smartphone size={14} />
                    )}
                  </button>
                ))}
              </div>

              <div className="w-full flex justify-center transition-all duration-300">
                <div
                  className={`bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${viewMode === "desktop" ? "w-full" : viewMode === "tablet" ? "w-[500px]" : "w-[340px]"}`}
                >
                  <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 text-[11px] font-bold text-gray-700 flex justify-between items-center">
                    <span>{logoName || "Institution Hub"}</span>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                  <div className="p-6 text-center space-y-4">
                    <h2 className="text-xl font-black text-gray-900">
                      {heroTitle}
                    </h2>
                    <p className="text-[11px] text-gray-500 max-w-sm mx-auto">
                      {heroSubtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW STEP 5: Interactive Multimedia Attachment Handling Area */}
        {currentStep === 5 && (
          <div className="w-full max-w-xl space-y-6 animate-in fade-in duration-200">
            <div className="text-center">
              <h1 className="text-3xl font-black text-[#1E1E2F] tracking-tight">
                Add Media Gallery
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Upload viewable imagery assets of campus facilities or academic
                buildings.
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-4">
              <div
                onClick={() => mediaRef.current?.click()}
                className="border-2 border-dashed border-gray-200 hover:border-dynamicBrand rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer transition-all"
              >
                <UploadCloud size={24} className="text-gray-400 mb-2" />
                <h4 className="text-xs font-bold text-gray-700">
                  Browse Image Archives
                </h4>
              </div>
              <input
                type="file"
                ref={mediaRef}
                multiple
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArr = Array.from(e.target.files).map((f) =>
                      URL.createObjectURL(f),
                    );
                    setMediaImages((prev) => [...prev, ...filesArr]);
                  }
                }}
              />

              {mediaImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {mediaImages.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden border border-gray-200"
                    >
                      <Image
                        src={img}
                        alt="Uploaded Item"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW STEP 6: Publishing Pre-flight Checklist Stage Layout */}
        {currentStep === 6 && (
          <div className="w-full max-w-xl text-center space-y-6 animate-in fade-in duration-200">
            <div className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle size={28} />
            </div>
            <h1 className="text-2xl font-black text-[#1E1E2F] tracking-tight">
              Your configuration is locked!
            </h1>
            <p className="text-xs text-gray-400 max-w-xs mx-auto">
              Click confirm below to launch your corporate layout settings live
              into the workspace database layers.
            </p>
            <div className="pt-2">
              <button
                onClick={handleForward}
                className="px-8 py-2.5 bg-dynamicBrand hover:bg-dynamicBrandHover text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Publish Profile Content
              </button>
            </div>
          </div>
        )}

        {/* VIEW STEP 7: Completed Final Dynamic Workspace Setup Confirmation Banner Row */}
        {currentStep === 7 && (
          <div className="w-full max-w-md text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-purple-50 text-dynamicBrand flex items-center justify-center rounded-full mx-auto animate-bounce">
              <Layout size={32} />
            </div>
            <h1 className="text-2xl font-black text-[#1E1E2F] tracking-tight">
              Onboarding Complete!
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your profile configurations are saved successfully. You are now
              being forwarded straight into the core school administration
              workspace dashboard.
            </p>
          </div>
        )}
      </main>

      {/* Lower Multi-panel Visibility Controller Actions Footer Row Item Block Layout */}
      {currentStep !== 3 && currentStep !== 6 && currentStep !== 7 && (
        <footer className="w-full bg-white border-t border-gray-100 px-6 py-4 sticky bottom-0 z-40">
          <div className="w-full max-w-xl mx-auto">
            <button
              type="button"
              onClick={handleForward}
              className="w-full py-3.5 bg-dynamicBrand hover:bg-dynamicBrandHover text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-[0.99]"
            >
              Continue
            </button>
          </div>
        </footer>
      )}

      {/* POPUP OVERLAY MODAL 1: Color Spectrum Slider Engine */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs p-5 relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowColorPicker(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
            <div
              style={{ backgroundColor: selectedColor }}
              className="w-full h-32 rounded-2xl mb-4"
            />
            <input
              type="range"
              min="0"
              max="360"
              className="w-full h-2 bg-linear-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer mb-4"
              onChange={(e) =>
                applyThemeColor(`hsl(${e.target.value}, 65%, 55%)`)
              }
            />
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase">
                Format Hex
              </span>
              <input
                type="text"
                value={selectedColor.toUpperCase()}
                onChange={(e) => applyThemeColor(e.target.value)}
                className="w-24 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-mono font-bold text-center text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* POPUP OVERLAY MODAL 2: Identity Brand Logo Capture Field Wrapper Item */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>
            <div className="text-center my-2">
              <h3 className="text-sm font-bold text-gray-900">
                Upload Institution Logo
              </h3>
            </div>
            <div
              onClick={() => logoRef.current?.click()}
              className="border-2 border-dashed border-gray-200 hover:border-dynamicBrand rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer transition-all"
            >
              <span className="text-xs font-semibold text-dynamicBrand truncate max-w-full">
                {logoName
                  ? `Selected: ${logoName}`
                  : "Click here to locate asset"}
              </span>
            </div>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, setLogoName, true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
