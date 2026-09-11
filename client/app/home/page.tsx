"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLogout } from "@/src/hooks/auth/authHooks"
import { useGetPosts } from "@/src/hooks/post/postHooks"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/src/lib/axios"
import TweetCard from "@/src/components/TweetCard"
import CreatePostModal from "@/src/components/CreatePostModal"
import { jwtDecode } from "jwt-decode"
import { Home, Plus, Ranking, Tv } from 'reicon-react';


interface JwtPayload {
  userId: string
  exp?: number
}

interface ProfileData {
  id: string
  FirstName: string
  LastName: string
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function HomePage() {
  const router = useRouter()
  const { mutate: logout, isPending: logoutPending } = useLogout()

  const [profileOpen, setProfileOpen] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("login")
    if (!token) { router.replace("/login"); return }
    try {
      const decoded = jwtDecode<JwtPayload>(token)
      setCurrentUserId(decoded.userId ?? "")
    } catch {
      router.replace("/login")
    }
  }, [router])

  // Fetch profile to get  name
  const { data: profile } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await api.get("/profile")
      return res.data.data
    },
    enabled: !!currentUserId,
    staleTime: 1000 * 60 * 5,
  })

  const displayName = profile
    ? `${profile.FirstName} ${profile.LastName}`
    : "..."

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const { data: posts, isLoading, isError } = useGetPosts()

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-black">

      {/* TOP LEFT PROFILE */}
      <div ref={profileRef} className="fixed top-5 left-5 z-50">
        <button
          onClick={() => setProfileOpen((v) => !v)}
          className="flex items-center gap-3 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl px-2.5 py-2 shadow-sm transition-all hover:bg-white"
        >
          <div className="h-9 w-9 overflow-hidden rounded-full bg-black flex items-center justify-center text-white text-sm font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="pr-2 text-sm font-semibold">{displayName}</span>
          <svg
            className={`mr-1 h-4 w-4 transition-transform ${profileOpen ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Profile dropdown */}
        {profileOpen && (
          <div className="absolute left-0 mt-2 w-48 overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-1.5 shadow-xl backdrop-blur-2xl">
            <button
              onClick={() => { setProfileOpen(false); router.push("/profile") }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition hover:bg-black/5"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6" />
              </svg>
              Profile
            </button>

            <div className="my-1 h-px bg-black/5" />

            <button
              onClick={() => logout()}
              disabled={logoutPending}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 19V5a2 2 0 00-2-2h-5" />
              </svg>
              {logoutPending ? "Logging out…" : "Logout"}
            </button>
          </div>
        )}
      </div>

      {/*  MAIN  */}
      <div className="flex min-h-screen justify-center px-5 pb-28 pt-24">
        <div className="w-full max-w-xl flex flex-col gap-5">

          {isLoading && (
            <p className="text-center text-sm text-gray-400 py-12">Loading posts…</p>
          )}

          {isError && (
            <p className="text-center text-sm text-red-400 py-12">
              Failed to load posts. Please try again.
            </p>
          )}

          {!isLoading && !isError && posts?.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-12">
              No posts yet. Be the first to post!
            </p>
          )}

          {posts?.map((post) => (
            <TweetCard
              key={post.id}
              id={post.id}
              name={`${post.user.FirstName} ${post.user.LastName}`}
              username={post.user.FirstName.toLowerCase()}
              avatar={post.user.profilePhoto}
              time={formatTime(post.createdAt)}
              content={post.caption}
              imageUrl={post.imageUrl}
              commentCount={post._count?.comments ?? 0}
              currentUserId={currentUserId}
              postUserId={post.user.id}
            />
          ))}
        </div>
      </div>

      {/*  BOTTOM NAV */}
      <nav className="fixed bottom-5 left-1/2 z-40 flex h-[68px] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/50 bg-white/45 px-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150">

        {/* Home */}
        <button className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-sm">
          <Home/>
        </button>

        {/* rank */}
        <button className="flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <Ranking />
        </button>

        {/* Create post */}
        <button
          onClick={() => setShowCreatePost(true)}
          className="-mt-8 flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-[#f7f7f8] bg-black text-2xl text-white shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition hover:scale-105 active:scale-95"
        >
          <Plus/>
        </button>

        {/* Notifications */}
        <button className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <Tv />
        </button>
        
      </nav>

      {/* Create post */}
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} />
      )}
    </main>
  )
}
