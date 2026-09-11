"use client"

import { useRef, useState } from "react"
import { useCreatePost } from "@/src/hooks/post/postHooks"

interface CreatePostModalProps {
  onClose: () => void
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [caption, setCaption] = useState("")
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutate: createPost, isPending } = useCreatePost()

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)
    if (caption.trim()) formData.append("caption", caption.trim())

    createPost(formData, { onSuccess: onClose })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">New post</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-black/5 hover:text-black transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Image picker */}
          <div
            onClick={() => inputRef.current?.click()}
            className="relative w-full h-52 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <span className="text-3xl mb-2">📷</span>
                <span className="text-sm text-gray-400">Click to add a photo</span>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          {/* Caption */}
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption… (optional)"
            rows={3}
            maxLength={500}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            type="submit"
            disabled={!file || isPending}
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Posting…" : "Share post"}
          </button>
        </form>
      </div>
    </div>
  )
}
