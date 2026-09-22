"use client";

import { useRef, useState } from "react";
import { useCreatePost } from "@/src/hooks/post/postHooks";
import { Camera } from "lucide-react";
import * as yup from "yup";
import { createPostValidationSchema } from "@/src/lib/validations/createPost";

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({
  onClose,
}: CreatePostModalProps) {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending } = useCreatePost();

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    setError("");

    try {
      await createPostValidationSchema.validate(
        {
          caption,
          image: selectedFile,
        },
        {
          abortEarly: true,
        }
      );
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const previewUrl = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setPreview(previewUrl);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.errors[0]);
      }

      e.target.value = "";
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    try {
      await createPostValidationSchema.validate(
        {
          caption,
          image: file,
        },
        {
          abortEarly: true,
        }
      );

      const formData = new FormData();

      if (file) {
        formData.append("image", file);
      }

      if (caption.trim()) {
        formData.append("caption", caption.trim());
      }

      createPost(formData, {
        onSuccess: () => {
          if (preview) {
            URL.revokeObjectURL(preview);
          }

          onClose();
        },
        onError: (error: any) => {
          setError(
            error?.response?.data?.message ||
              "Failed to create post. Please try again."
          );
        },
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.errors[0]);
      }
    }
  };

  const handleClose = () => {
    if (isPending) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    onClose();
  };

  return (
    <div
      className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          New post
        </h2>

        <button
          type="button"
          onClick={handleClose}
          disabled={isPending}
          className="rounded-full p-2 text-gray-400 transition hover:bg-black/5 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          ✕
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* Image picker */}
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex h-52 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 transition hover:bg-gray-100"
        >
          {preview ? (
            <img
              src={preview}
              alt="Post preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <Camera className="mb-2 h-8 w-8 text-gray-400" />

              <span className="text-sm text-gray-400">
                Click to add a photo
              </span>

              <span className="mt-1 text-xs text-gray-300">
                Optional
              </span>
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
        <div>
          <textarea
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
              if (error) {
                setError("");
              }
            }}
            placeholder="Write a caption… (optional)"
            rows={3}
            maxLength={500}
            disabled={isPending}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <div className="mt-1 text-right text-xs text-gray-400">
            {caption.length}/500
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Posting…" : "Share post"}
        </button>
      </form>
    </div>
  );
}