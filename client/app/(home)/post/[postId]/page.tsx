"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  Search,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";

import TweetCard from "@/src/components/User/Post/TweetCard";
import Avatar from "@/src/components/homePage/Avatar/Avatar";
import GuestGateModal from "@/src/components/auth/GuestGateModal";
import CommentItem from "@/src/components/User/Post/CommentItem/CommentItem";

import {
  useGetPost,
  useHandleLike,
  useGetComments,
  useAddComment,
} from "@/src/hooks/post/postHooks";

import { tokenStore } from "@/src/lib/auth/tokenStore";
import PostPageSkeleton from "@/src/components/Loaders/PostPageSkeleton";
import PostDetailLayout from "@/src/components/User/Post/PostDetail/PostDetailLayout";

interface JwtPayload {
  userId: string;
  exp?: number;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const router = useRouter();

  const {
    data: post,
    isLoading,
    isError,
  } = useGetPost(postId);

  const { data: comments } = useGetComments(postId);

  console.log("post",post)

  const { mutate: handleLike } = useHandleLike();

  const {
    mutate: addComment,
    isPending: isPosting,
  } = useAddComment();


  const [currentUserId, setCurrentUserId] = useState("");

  const [showGate, setShowGate] = useState(false);

  const [gateAction, setGateAction] = useState<
    "like" | "comment" | "post" | "connect"
  >("comment");

  const [commentText, setCommentText] = useState("");

  const composerRef =
    useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    const token = tokenStore.get();

    if (!token) return;

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      setCurrentUserId(decoded.userId ?? "");
    } catch {
      tokenStore.set(null);
    }
  }, []);

  const requireAuth = (
    action: typeof gateAction,
  ) => {
    if (tokenStore.get()) return true;

    setGateAction(action);
    setShowGate(true);

    return false;
  };


  const onLike = (id: string) => {
    if (!requireAuth("like")) return;

    handleLike(id);
  };


  const onJumpToComposer = () => {
    if (!requireAuth("comment")) return;

    composerRef.current?.focus();
  };


  const onSubmitComment = () => {
    if (!commentText.trim()) return;

    if (!requireAuth("comment")) return;

    addComment({
      postId,
      content: commentText.trim(),
    });

    setCommentText("");
  };

  if (isLoading) {
    return <PostPageSkeleton />;
  }

  if (isError || !post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-text-muted">
        <div className="text-center">
          <p className="text-sm">
            Post not found.
          </p>

          <button
            onClick={() => router.back()}
            className="ui-button-secondary mt-4 px-4 py-2 text-sm"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-text-primary">

      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="relative mx-auto flex h-16 w-full max-w-[1360px] items-center justify-between px-4 lg:px-6">

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-secondary transition hover:bg-surface-2 hover:text-text-primary">
            <ArrowLeft size={18} />
            <span className="hidden sm:block">
              Back to feed
            </span>
          </button>

          <div
            className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight text-text-primary">
            TechLinked
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-1">

            <button
              className="rounded-xl p-2.5 text-text-secondary transition hover:bg-surface-hover hover:text-text-primary">
              <Search size={19} />
            </button>

            <button
              className="rounded-xl p-2.5 text-text-secondary transition hover:bg-surface-hover hover:text-text-primary">
              <Bell size={19} />
            </button>

            <div className="ml-1">
              <Avatar initials="AG" />
            </div>

          </div>
        </div>
      </header>

      <PostDetailLayout
        post={post}
        comments={comments}
        currentUserId={currentUserId}
        commentText={commentText}
        setCommentText={setCommentText}
        composerRef={composerRef}
        isPosting={isPosting}
        onLike={onLike}
        onComment={onJumpToComposer}
        onSubmitComment={onSubmitComment}
        onViewProfile={() =>
          router.push(`/profile/${post.user.id}`)
        }
      />

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay">

          <GuestGateModal
            isOpen={showGate}
            onClose={() => setShowGate(false)}
            action={gateAction}
          />

        </div>
      )}
    </main>
  );
}

