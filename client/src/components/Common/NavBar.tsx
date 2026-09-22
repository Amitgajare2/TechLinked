// src/components/Common/NavBar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderKanban, Home, Plus, Tv } from "lucide-react";
import { Ranking } from "reicon-react";
import GuestGateModal from "@/src/components/auth/GuestGateModal";
import { tokenStore } from "@/src/lib/auth/tokenStore";

export default function NavBar({setPost}:any) {
  const pathname = usePathname();
  const router = useRouter();
  const [showGate, setShowGate] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  const handleCreatePostClick = () => {
     const token = tokenStore.get(); 
    if (!token) {
      setShowGate(true);
      return;
    }
    setPost(true);
  };

  return (
    <>
      <nav className="fixed bottom-5 left-1/2 z-40 flex h-[68px] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/50 bg-surface/45 px-5 shadow-[0_8px_40px_rgba(22,56,46,0.12)] backdrop-blur-2xl backdrop-saturate-150">
        <Link href="/" aria-label="Home" className={`flex h-11 w-11 items-center justify-center rounded-full transition ${isActive("/") ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:bg-primary-soft"}`}>
          <Home size={20} />
        </Link>

        <Link href="/leaderboard" aria-label="Leaderboard" className={`flex h-11 w-11 items-center justify-center rounded-full transition ${isActive("/leaderboard") ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:bg-primary-soft"}`}>
          <Ranking />
        </Link>

        <button
          onClick={handleCreatePostClick}
          aria-label="Create post"
          className="-mt-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-[5px] border-background bg-primary text-white shadow-[0_8px_25px_rgba(57,122,104,0.35)] transition hover:scale-105 active:scale-95"
        >
          <Plus size={24} />
        </button>

        <Link href="/projects" aria-label="Projects" className={`flex h-11 w-11 items-center justify-center rounded-full transition ${isActive("/projects") ? "bg-primary text-white shadow-sm" : "text-text-secondary hover:bg-primary-soft"}`}>
          <FolderKanban size={20} />
        </Link>

        <button aria-label="Reels" className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-text-secondary transition hover:bg-primary-soft">
          <Tv size={20} />
        </button>
      </nav>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <GuestGateModal isOpen={showGate} onClose={() => setShowGate(false)} action="post" />
        </div>
      )}
    </>
  );
}