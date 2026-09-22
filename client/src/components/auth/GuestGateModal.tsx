"use client";

import { useRouter } from "next/navigation";
import { X, Heart, MessageSquarePlus, Users } from "lucide-react";

interface GuestGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  action?: "like" | "comment" | "post" | "connect";
}

const actionCopy: Record<NonNullable<GuestGateModalProps["action"]>, { icon: typeof Heart; text: string }> = {
  like: { icon: Heart, text: "like this post" },
  comment: { icon: MessageSquarePlus, text: "join the conversation" },
  post: { icon: MessageSquarePlus, text: "create your own posts" },
  connect: { icon: Users, text: "connect with tech professionals" },
};

const GuestGateModal = ({ isOpen, onClose, action = "like" }: GuestGateModalProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const { icon: ActionIcon, text } = actionCopy[action];

  const handleRedirect = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl shadow-black/20 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#4C5FFF] flex items-center justify-center mb-4">
            <ActionIcon size={26} className="text-white" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            Join TechLinked to {text}
          </h2>
          <p className="text-[13px] text-gray-500 mt-2 leading-relaxed">
            Connect with tech professionals, follow projects you care about, and be part of the conversation.
          </p>

          <div className="w-full mt-6 space-y-2.5">
            <button
              onClick={() => handleRedirect("/register")}
              className="w-full bg-[#4C5FFF] hover:bg-[#6E7CFF] text-white font-medium text-[14px] rounded-md py-2.5 transition-colors shadow-sm shadow-[#4C5FFF]/30"
            >
              Join now
            </button>
            <button
              onClick={() => handleRedirect("/login")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium text-[14px] rounded-md py-2.5 border border-gray-200 transition-colors"
            >
              Sign in
            </button>
          </div>

          <p className="text-[12px] text-gray-400 mt-5 leading-relaxed">
            By joining, you agree to TechLinked&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestGateModal;