import type { Post as ApiPost } from "@/src/API/User/Post/postAPI";
import Image from "next/image";
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  BookmarkIcon,
  MoreIcon,
} from "./icons";

export type Post = ApiPost;

export default function PostCard({ post }: { post: Post }) {
  const displayName = `${post.user.FirstName} ${post.user.LastName}`.trim();
  const avatar = post.user.profilePhoto || "/images/avatar-kundar.jpg";
  const createdAt = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="rounded-card bg-white p-4 shadow-card sm:p-5">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src={avatar}
            alt="users profile photo"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <p className="min-w-0 text-sm leading-tight">
            <span className="font-bold text-ink">{displayName}</span>{" "}
            <span className="text-ink-muted">
              @{post.user.FirstName} &middot; {createdAt}
            </span>
          </p>
        </div>

        <button
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-page"
        >
          <MoreIcon className="h-[18px] w-[18px]" />
        </button>
      </header>

      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
        {post.caption ?? ""}
      </p>

      {post.imageUrl && (
        <div className="relative mt-4 overflow-hidden rounded-xl">
          <Image
            src={post.imageUrl}
            alt="post's image"
            width={1200}
            height={680}
            className="h-auto w-full object-cover"
            sizes="(min-width: 1024px) 640px, 100vw"
          />
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <div className="flex items-center gap-5 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5">
            <HeartIcon filled className="h-[18px] w-[18px] text-rose-500" />
            <span className="font-semibold text-ink">{post.likeCount}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CommentIcon className="h-[18px] w-[18px] stroke-current" />
            <span className="font-semibold text-ink">{post.commentCount}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShareIcon className="h-[18px] w-[18px] stroke-current" />
            <span className="font-semibold text-ink">0</span>
          </span>
        </div>
        <button
          type="button"
          aria-label="Save post"
          className="text-ink-muted hover:text-ink"
        >
          <BookmarkIcon className="h-[18px] w-[18px] stroke-current" />
        </button>
      </div>
    </article>
  );
}
