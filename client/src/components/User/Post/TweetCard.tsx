"use client"

import { useState } from "react"
import { useDeletePost, useUpdatePost } from "@/src/hooks/post/postHooks"
import { Star, CommentDots, Share   } from 'reicon-react';
import { env } from "process";

// const API_BASE = env.API_URL 
const API_BASE = "http://localhost:5000" //temporary 

interface TweetCardProps {
  id: string
  name: string
  username: string
  avatar: string | null
  time: string
  content: string | null
  imageUrl: string
  commentCount?: number
  /** id of the currently logged in user */
  currentUserId?: string
  postUserId?: string
}

export default function TweetCard({
  id,
  name,
  username,
  avatar,
  time,
  content,
  imageUrl,
  commentCount = 0,
  currentUserId,
  postUserId,
}: TweetCardProps) {
  const [editing, setEditing] = useState(false)
  const [caption, setCaption] = useState(content ?? "")

  const { mutate: deletePost, isPending: deleting } = useDeletePost()
  const { mutate: updatePost, isPending: updating } = useUpdatePost()

  const isOwner = currentUserId && postUserId && currentUserId === postUserId

  const handleSave = () => {
    updatePost({ id, caption }, { onSuccess: () => setEditing(false) })
  }

  const avatarSrc = avatar
    ? `${API_BASE}${avatar}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`

  const imgSrc = imageUrl.startsWith("http")
    ? imageUrl
    : `${API_BASE}${imageUrl}`

  return (
    <article className="w-full max-w-xl rounded-3xl border border-black/[0.08] bg-white p-5 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 overflow-hidden rounded-full bg-black shrink-0">
          <img src={avatarSrc} alt={name} className="h-full w-full object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-bold truncate">{name}</h3>
            <span className="text-xs text-gray-400">@{username}</span>
          </div>
          <p className="text-xs text-gray-400">{time}</p>
        </div>

        {/* Owner actions menu */}
        {isOwner && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setEditing((v) => !v)}
              className="rounded-full px-2.5 py-1 text-xs text-gray-500 hover:bg-black/5 transition"
            >
              Edit
            </button>
            <button
              onClick={() => deletePost(id)}
              disabled={deleting}
              className="rounded-full px-2.5 py-1 text-xs text-red-500 hover:bg-red-50 transition disabled:opacity-50"
            >
              {deleting ? "…" : "Delete"}
            </button>
          </div>
        )}
      </div>

      {/* Post image */}
      <div className="mt-4 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={imgSrc}
          alt="Post"
          className="w-full object-cover max-h-96"
        />
      </div>

      {/* Caption — normal or edit mode */}
      {editing ? (
        <div className="mt-3 flex flex-col gap-2">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setEditing(false); setCaption(content ?? "") }}
              className="rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:bg-black/5 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updating}
              className="rounded-lg bg-black px-3 py-1.5 text-xs text-white hover:bg-gray-800 transition disabled:opacity-50"
            >
              {updating ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      ) : (
        content && (
          <p className="mt-3 text-[15px] leading-6 whitespace-pre-line">{content}</p>
        )
      )}

      {/* Actions */}
      <div className="mt-5 flex items-center gap-6 border-t border-black/5 pt-4">
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-yellow-500 transition">
          <Star/>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition">
          <CommentDots/> <span>{commentCount}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition ml-auto">
          <Share/>
        </button>
      </div>
    </article>
  )
}
