"use client";

import { useState, useEffect, useRef } from "react";
import {
  Globe, MapPin, Phone, School, ArrowRight, Plus, X,
  UploadCloud, Monitor, Tablet, Smartphone, Loader2
} from "lucide-react";
import { FileUploader } from "@/modules/shared/component/FileUploader";
import { useSchoolTheme } from "@/app/theme";
import {
  saveSchoolProfile,
  deleteSchoolProfile,
  fileToDataUrl,
  SchoolSegmentImages,
} from "@/modules/shared/lib/schoolProfileStore";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { submitOnboarding, selectOnboardingState } from "@/redux/store/slices/onboardingSlice";

const PRESET_COLORS = ["#6366F1", "#D97706", "#EC4899", "#22C55E", "#CDE484"];

const EMPTY_SEGMENT_IMAGES: SchoolSegmentImages = {
  admin: null,
  teacher: null,
  parent: null,
  student: null,
};

// Data-URL to File helper function for multi-part file conversion
const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

interface SchoolInfoFormProps {
  onSuccess: () => void;
}

export const SchoolInfoForm = ({ onSuccess }: SchoolInfoFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectOnboardingState);
  const { setSchoolTheme } = useSchoolTheme();

  // Basic Form States
  const [attachments, setAttachments] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    address: "",
    phone: "",
  });

  // Localized Multi-Step states
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>("#6366F1");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [showLogoModal, setShowLogoModal] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const [banner1File, setBanner1File] = useState<File | null>(null);
  const [banner2File, setBanner2File] = useState<File | null>(null);
  const [banner1, setBanner1] = useState<string | null>(null);
  const [banner2, setBanner2] = useState<string | null>(null);
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string | null>(null);

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [segmentImages, setSegmentImages] = useState<SchoolSegmentImages>(EMPTY_SEGMENT_IMAGES);

  const [heroTitle, setHeroTitle] = useState<string>("Streamline education from classroom to district");
  const [heroSubtitle, setHeroSubtitle] = useState<string>("Connect your entire educational community with EduTrac's all-in-one platform.");
  const [footerTitle, setFooterTitle] = useState<string>("");
  const [yourHistory, setYourHistory] = useState<string>("");
  const [yourVision, setYourVision] = useState<string>("");
  const [yourMission, setYourMission] = useState<string>("");

  const banner1Ref = useRef<HTMLInputElement>(null);
  const banner2Ref = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const adminImgRef = useRef<HTMLInputElement>(null);
  const teacherImgRef = useRef<HTMLInputElement>(null);
  const parentImgRef = useRef<HTMLInputElement>(null);
  const studentImgRef = useRef<HTMLInputElement>(null);

  const prevSlugRef = useRef<string>("");

  useEffect(() => {
    const generatedSlug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData((prev) => ({ ...prev, slug: generatedSlug }));
  }, [formData.name]);

  useEffect(() => {
    let cancelled = false;
    if (attachments[0]) {
      fileToDataUrl(attachments[0]).then((dataUrl) => {
        if (!cancelled) setLogoUrl(dataUrl);
      });
    } else if (!logoName) {
      setLogoUrl(null);
    }
    return () => {
      cancelled = true;
    };
  }, [attachments, logoName]);

  useEffect(() => {
    const slug = formData.slug || "draft";

    if (prevSlugRef.current && prevSlugRef.current !== slug) {
      deleteSchoolProfile(prevSlugRef.current);
    }
    prevSlugRef.current = slug;

    saveSchoolProfile(slug, {
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      logoUrl,
      themeColor: selectedColor,
      heroTitle,
      heroSubtitle,
      heroImageUrl,
      footerTitle,
      yourHistory,
      yourVision,
      yourMission,
      segmentImages,
    });
  }, [
    formData.slug,
    formData.name,
    formData.address,
    formData.phone,
    logoUrl,
    selectedColor,
    heroTitle,
    heroSubtitle,
    heroImageUrl,
    footerTitle,
    yourHistory,
    yourVision,
    yourMission,
    segmentImages,
  ]);

  const handleBanner1Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBanner1File(file);
    setBanner1(URL.createObjectURL(file)); 
    const dataUrl = await fileToDataUrl(file);
    setHeroImageUrl(dataUrl); 
  };

  const handleBanner2Change = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBanner2File(file);
    setBanner2(URL.createObjectURL(file));
  };

  const handleLogoModalUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachments([file]);
    const dataUrl = await fileToDataUrl(file);
    setLogoUrl(dataUrl);
    setLogoName(file.name);
    setShowLogoModal(false);
  };

  const handleSegmentImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    segment: keyof SchoolSegmentImages
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setSegmentImages((prev) => ({ ...prev, [segment]: dataUrl }));
  };

  const applyThemeColor = (color: string) => {
    setSelectedColor(color);
    setSchoolTheme({ primary: color, primaryHover: color + "CC" });
  };

  const isBasicComplete = formData.name && formData.address && formData.phone && attachments.length > 0;

  const handleActionClick = () => {
    if (!isBasicComplete) return;

    if (currentStep < 5) {
      if (currentStep === 1) {
        setCurrentStep(3);
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const galleryFiles: File[] = [];
    Object.entries(segmentImages).forEach(([key, dataUrl]) => {
      if (dataUrl) {
        galleryFiles.push(dataURLtoFile(dataUrl, `${key}-segment.png`));
      }
    });

    const payload = {
      account: {
        domain: formData.slug,
        contactPhone: formData.phone,
        contactAddress: formData.address,
      },
      website: {
        themeColor: selectedColor,
        bannerTitle: heroTitle,
        bannerDescription: heroSubtitle,
        footerTitle: footerTitle,
        history: yourHistory,
        vision: yourVision,
        mission: yourMission,
      },
      logo: attachments[0],
      primaryBanner: banner1File || undefined,
      secondaryBanner: banner2File || undefined,
      gallery: galleryFiles.length > 0 ? galleryFiles : undefined,
    };

    const resultAction = await dispatch(submitOnboarding(payload));
    if (submitOnboarding.fulfilled.match(resultAction)) {
      onSuccess();
    }
  };

  const segmentSlots: { key: keyof SchoolSegmentImages; label: string; ref: React.RefObject<HTMLInputElement | null> }[] = [
    { key: "admin", label: "School Administrator", ref: adminImgRef },
    { key: "teacher", label: "Teachers", ref: teacherImgRef },
    { key: "parent", label: "Parents", ref: parentImgRef },
    { key: "student", label: "Students", ref: studentImgRef },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 relative">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xs font-bold">
          {error}
        </div>
      )}

      {/* Logo Upload Section */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          School Logo
        </label>
        <FileUploader
          attachments={attachments}
          setAttachments={setAttachments}
          label="Drop your school logo here"
        />
      </div>

      {/* Basic Info Fields */}
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Official School Name
          </label>
          <div className="relative">
            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="text"
              value={formData.name}
              placeholder="e.g. GreenTree Academy"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>

        {/* Dynamic Slug Preview */}
        <div className="p-6 bg-slate-900 rounded-3xl text-white overflow-hidden relative">
          <Globe className="absolute -right-2 -bottom-2 text-white/5" size={80} />
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
            Your Unique Link
          </p>
          <div className="flex items-center gap-1 text-sm font-bold">
            <span className="text-slate-500">edutrac.app/</span>
            <span className="text-[var(--color-dynamic-brand)]">{formData.slug || "your-school"}</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            School Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
            <textarea
              rows={2}
              value={formData.address}
              placeholder="Full address of the main campus"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all resize-none"
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Contact Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input
              type="tel"
              value={formData.phone}
              placeholder="+234..."
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:border-[var(--color-dynamic-brand)] transition-all"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Extra Onboarding Steps */}
      {isBasicComplete && (
        <div className="border-t border-slate-100 pt-10 space-y-8">
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
            <span className="text-xs font-bold text-slate-500">Additional Setup Progress:</span>
            <span className="text-xs font-black text-[var(--color-dynamic-brand)]">
              Step {currentStep === 1 ? 1 : currentStep - 1} of 4
            </span>
          </div>

          {/* VIEW STEP 1 */}
          {currentStep === 1 && (
            <div className="w-full space-y-6 animate-in fade-in duration-200">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-6">
                <h3 className="text-xs font-bold text-center uppercase tracking-wider text-gray-500">Select your theme</h3>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => applyThemeColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-11 h-11 rounded-full transition-all ${
                        selectedColor === color ? "ring-4 ring-offset-2 ring-[#923CF9] scale-105" : "border border-black/5 hover:scale-105"
                      }`}
                    />
                  ))}
                  <button type="button" onClick={() => setShowColorPicker(true)} className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors">
                    <Plus size={18} />
                  </button>
                </div>

                <div className="space-y-4 pt-2">
                  <h3 className="text-xs font-bold text-center uppercase tracking-wider text-gray-500">Customize your profile</h3>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Primary Banner Image</label>
                    <div onClick={() => banner1Ref.current?.click()} className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[var(--color-dynamic-brand)] transition-all">
                      <span className="text-xs text-gray-400 truncate">{banner1 ? "Primary Image Loaded" : "Upload Image"}</span>
                      <UploadCloud size={14} className="text-gray-400" />
                    </div>
                    <input type="file" ref={banner1Ref} className="hidden" accept="image/*" onChange={handleBanner1Change} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Secondary Banner Image</label>
                    <div onClick={() => banner2Ref.current?.click()} className="border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[var(--color-dynamic-brand)] transition-all">
                      <span className="text-xs text-gray-400 truncate">{banner2 ? "Secondary Image Loaded" : "Upload Image"}</span>
                      <UploadCloud size={14} className="text-gray-400" />
                    </div>
                    <input type="file" ref={banner2Ref} className="hidden" accept="image/*" onChange={handleBanner2Change} />
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button type="button" onClick={() => setShowLogoModal(true)} className="text-xs font-bold text-[var(--color-dynamic-brand)] hover:underline">
                    Configure School Brand Logo Asset &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW STEP 3 */}
          {currentStep === 3 && (
            <div className="w-full text-center space-y-4 animate-in fade-in duration-200 py-6">
              <h1 className="text-2xl font-black text-[#1E1E2F] tracking-tight leading-tight">Let&apos;s create your school&apos;s landing page</h1>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                Your public landing profile displays important details, announcements, news boards, and event entries to external site visitors.
              </p>
            </div>
          )}

          {/* VIEW STEP 4 */}
          {currentStep === 4 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
              <div className="lg:col-span-5 bg-white border border-gray-100 rounded-2xl p-5 space-y-5 shadow-xs">
                <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">Homepage Editor</h2>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Banner Title</label>
                  <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)]" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Banner Subtitle Description</label>
                  <textarea rows={3} value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Footer Title</label>
                  <input type="text" value={footerTitle} onChange={(e) => setFooterTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Your History</label>
                  <input type="text" value={yourHistory} onChange={(e) => setYourHistory(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Your Vision</label>
                  <input type="text" value={yourVision} onChange={(e) => setYourVision(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)] resize-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500">Your Mission</label>
                  <input type="text" value={yourMission} onChange={(e) => setYourMission(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[var(--color-dynamic-brand)] resize-none" />
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div className="flex justify-center items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-200 w-fit mx-auto shadow-2xs">
                  {["desktop", "tablet", "mobile"].map((mode) => (
                    <button key={mode} type="button" onClick={() => setViewMode(mode as any)} className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${viewMode === mode ? "bg-gray-100 text-[#1E1E2F]" : "text-gray-400"}`}>
                      {mode === "desktop" ? <Monitor size={14} /> : mode === "tablet" ? <Tablet size={14} /> : <Smartphone size={14} />}
                    </button>
                  ))}
                </div>

                <div className="w-full flex justify-center transition-all duration-300">
                  <div className={`bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${viewMode === "desktop" ? "w-full" : viewMode === "tablet" ? "w-[400px]" : "w-[300px]"}`}>
                    <div className="bg-gray-50 border-b border-gray-100 px-4 py-2 text-[11px] font-bold text-gray-700 flex justify-between items-center">
                      <span>{logoName || "Institution Hub"}</span>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedColor }} />
                    </div>
                    <div className="p-6 text-center space-y-4">
                      <h2 className="text-lg font-black text-gray-900">{heroTitle}</h2>
                      <p className="text-[11px] text-gray-500 max-w-sm mx-auto">{heroSubtitle}</p>
                      <p className="text-[11px] text-gray-500 max-w-sm mx-auto">{footerTitle}</p>
                      <p className="text-[11px] text-gray-500 max-w-sm mx-auto">{yourHistory}</p>
                      <p className="text-[11px] text-gray-500 max-w-sm mx-auto">{yourVision}</p>
                      <p className="text-[11px] text-gray-500 max-w-sm mx-auto">{yourMission}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW STEP 5 */}
          {currentStep === 5 && (
            <div className="w-full space-y-6 animate-in fade-in duration-200">
              <div className="text-center">
                <h1 className="text-xl font-black text-[#1E1E2F] tracking-tight">Assign Segment Images</h1>
                <p className="text-xs text-gray-400 mt-1">These appear next to the matching audience section on your landing page.</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
                {segmentSlots.map(({ key, label, ref }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">{label}</label>
                    <div
                      onClick={() => ref.current?.click()}
                      className="aspect-video bg-gray-50/50 border-2 border-dashed border-gray-200 hover:border-[var(--color-dynamic-brand)] rounded-2xl overflow-hidden relative flex flex-col items-center justify-center cursor-pointer transition-all"
                    >
                      {segmentImages[key] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={segmentImages[key] as string} alt={label} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <UploadCloud size={20} className="text-gray-400 mb-1" />
                          <span className="text-[11px] font-bold text-gray-500">Upload Image</span>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={ref}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleSegmentImageChange(e, key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Primary Action Button */}
      <button
        disabled={!isBasicComplete || isLoading}
        onClick={handleActionClick}
        className="w-full py-5 bg-[var(--color-dynamic-brand)] text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-100 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-30 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>Submitting... <Loader2 size={14} className="animate-spin" /></>
        ) : currentStep < 5 ? (
          <>Next Configuration Step <ArrowRight size={14} /></>
        ) : (
          <>Continue to Preview <ArrowRight size={14} /></>
        )}
      </button>

      {/* MODAL 1: Color Picker */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs p-5 relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button type="button" onClick={() => setShowColorPicker(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={16} />
            </button>
            <div style={{ backgroundColor: selectedColor }} className="w-full h-32 rounded-2xl mb-4" />
            <input type="range" min="0" max="360" className="w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-lg appearance-none cursor-pointer mb-4" onChange={(e) => applyThemeColor(`hsl(${e.target.value}, 65%, 55%)`)} />
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Format Hex</span>
              <input type="text" value={selectedColor.toUpperCase()} onChange={(e) => applyThemeColor(e.target.value)} className="w-24 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-mono font-bold text-center text-gray-800 focus:outline-none" />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Logo Asset Upload */}
      {showLogoModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
            <button type="button" onClick={() => setShowLogoModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
            <div className="text-center my-2">
              <h3 className="text-sm font-bold text-gray-900">Upload Institution Logo</h3>
            </div>
            <div onClick={() => logoRef.current?.click()} className="border-2 border-dashed border-gray-200 hover:border-[#923CF9] rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 cursor-pointer transition-all">
              <span className="text-xs font-semibold text-[#923CF9] truncate max-w-full">
                {logoName ? `Selected: ${logoName}` : "Click here to locate asset"}
              </span>
            </div>
            <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={handleLogoModalUpload} />
          </div>
        </div>
      )}
    </div>
  );
};