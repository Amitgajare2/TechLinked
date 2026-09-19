// src/components/Post/CommentItem/CommentItem.tsx
"use client";
import { Heart } from "lucide-react";
import Avatar from "@/src/components/homePage/Avatar/Avatar";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likeCount?: number;
  isLiked?: boolean;
  user: { FirstName: string; LastName: string; profilePhoto: string | null };
}

export default function CommentItem({ comment }: { comment: Comment; }) {
  const initials = `${comment.user.FirstName[0]}${comment.user.LastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex gap-3">
        <Avatar initials={initials} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-text-primary">
              {comment.user.FirstName} {comment.user.LastName}
            </span>
            <span className="text-xs text-text-subtle">
              {new Date(comment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
            </span>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-text-secondary">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}