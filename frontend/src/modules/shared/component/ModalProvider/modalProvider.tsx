// "use client";

// import React from "react";

// import classNames from "classnames";

// import { Modal } from "../modal";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import ClearIcon from "@/modules/shared/assets/svgs/clear-icon.svg";
// import { modalLayouts } from "@/routes/modalRoutes";

// export const ModalProvider = () => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const modalKey = searchParams.get("modal") as keyof typeof modalLayouts;

//   const onDismiss = () => {
//     if (modalLayouts?.[modalKey]?.isKeepOpen) return;
//     const params = new URLSearchParams(searchParams.toString());

//     params.delete("modal");
//     router.replace(`${pathname}?${params}`);
//   };

//   const modalProps = modalLayouts?.[modalKey]?.modalProps || {}

//   return (
//     <Modal
//       isOpen={!!(modalKey && modalLayouts[modalKey])}
//       onClose={onDismiss}
//       className={classNames("rounded-[10px] max-h-[99vh] flex flex-col")}
//       {...modalProps}
//     >
//       {modalLayouts[modalKey]?.hasCloseIcon && (
//         <ClearIcon onClick={onDismiss} className="absolute right-5 top-5" />
//       )}
//       <div className={classNames("overflow-y-auto flex-1")}>
//         {modalLayouts?.[modalKey]?.component}
//       </div>
//     </Modal>
//   );
// };
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { Teacher, Student } from "@/modules/types/dashboard";

// 1. Define the possible data shapes for modals
type ModalData =
  | Teacher
  | Student
  | { title: string; message: string; onConfirm: () => void } // For confirm-action
  | null;

type ModalType =
  | "teacher"
  | "student"
  | "parent"
  | "class"
  | "confirm-action"
  | null;

interface ModalContextType {
  activeModal: ModalType;
  modalData: ModalData;
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<ModalData>(null);

  const openModal = useCallback((type: ModalType, data: ModalData = null) => {
    setActiveModal(type);
    setModalData(data);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ activeModal, modalData, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
