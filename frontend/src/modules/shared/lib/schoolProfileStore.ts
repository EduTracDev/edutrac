"use client";

export interface SchoolSegmentImages {
    admin: string | null;
    teacher: string | null;
    parent: string | null;
    student: string | null;
}

export interface SchoolBrandProfile {
    slug: string;
    name: string;
    address: string;
    phone: string;
    logoUrl: string | null;
    themeColor: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImageUrl: string | null;
    segmentImages: SchoolSegmentImages;
}

const STORAGE_KEY = "edutrac:school-profiles";
const EVENT_NAME = "edutrac:school-profile-updated";
const EMPTY_SEGMENTS: SchoolSegmentImages = {
    admin: null,
    teacher: null,
    parent: null,
    student: null,
};

type ProfileMap = Record<string, SchoolBrandProfile>;

function readAll(): ProfileMap {
    if (typeof window === "undefined") return {};
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as ProfileMap) : {};
    } catch {
        return {};
    }
}

function writeAll(map: ProfileMap) {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
        // Storage full (large base64 images) - fail silently, in-memory state still works this session
    }
}

export function getSchoolProfile(slug: string): SchoolBrandProfile | null {
    return readAll()[slug] ?? null;
}

export function saveSchoolProfile(
    slug: string,
    data: Partial<Omit<SchoolBrandProfile, "slug">>
): SchoolBrandProfile {
    const all = readAll();
    const existing = all[slug];
    const defaults: Omit<SchoolBrandProfile, "slug"> = {
        name: "",
        address: "",
        phone: "",
        logoUrl: null,
        themeColor: "#6366F1",
        heroTitle: "",
        heroSubtitle: "",
        heroImageUrl: null,
        segmentImages: EMPTY_SEGMENTS,
    };

    const merged: SchoolBrandProfile = {
        ...defaults,
        ...existing,
        ...data,
        segmentImages: {
            ...(existing?.segmentImages ?? EMPTY_SEGMENTS),
            ...(data.segmentImages ?? {}),
        },
        slug,
    };

    all[slug] = merged;
    writeAll(all);

    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { slug } }));
    }

    return merged;
}

export function deleteSchoolProfile(slug: string) {
    const all = readAll();
    if (all[slug]) {
        delete all[slug];
        writeAll(all);
    }
}

export function subscribeToSchoolProfile(slug: string, callback: () => void) {
    if (typeof window === "undefined") return () => { };
    const handler = (e: Event) => {
        const custom = e as CustomEvent<{ slug: string }>;
        if (custom.detail?.slug === slug) callback();
    };
    window.addEventListener(EVENT_NAME, handler);
    window.addEventListener("storage", callback); // cross-tab updates
    return () => {
        window.removeEventListener(EVENT_NAME, handler);
        window.removeEventListener("storage", callback);
    };
}

export function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}