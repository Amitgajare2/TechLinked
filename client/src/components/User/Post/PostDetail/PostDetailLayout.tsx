"use client"
import React from 'react'

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    BriefcaseBusiness,
    ChevronRight,
    Heart,
    MessageCircle,
    Send,
    Trophy,
    Users,
} from "lucide-react";

import TweetCard from "@/src/components/User/Post/TweetCard";
import Avatar from "@/src/components/homePage/Avatar/Avatar";
import CommentItem from "@/src/components/User/Post/CommentItem/CommentItem";


import { tokenStore } from "@/src/lib/auth/tokenStore";
import { RefObject, Dispatch, SetStateAction } from "react";
import ActivityRow from "@/src/components/User/Post/PostDetail/CreatorActivity";
import MiniStat from "@/src/components/User/Post/PostDetail/MiniStat";
import MetaRow from "@/src/components/User/Post/PostDetail/MetaRow";
import Stat from "@/src/components/User/Post/PostDetail/Stat";
import InfoRow from "@/src/components/User/Post/PostDetail/InfoRow";




function formatTime(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

interface PostDetailLayoutProps {
    post: any;
    comments: any[] | undefined;
    currentUserId: string;

    commentText: string;
    setCommentText: Dispatch<SetStateAction<string>>;

    composerRef: RefObject<HTMLTextAreaElement | null>;

    isPosting: boolean;

    onLike: (id: string) => void;
    onComment: () => void;
    onSubmitComment: () => void;

    onViewProfile: () => void;
}


const PostDetailLayout = ({
    post,
    comments,
    currentUserId,
    commentText,
    setCommentText,
    composerRef,
    isPosting,
    onLike,
    onComment,
    onSubmitComment,
    onViewProfile,
}: PostDetailLayoutProps) => {

    const [showGate, setShowGate] = useState(false);
    const router = useRouter();
    const [gateAction, setGateAction] = useState<"like" | "comment" | "post" | "connect">("comment");


    const requireAuth = (
        action: typeof gateAction,
    ) => {
        if (tokenStore.get()) return true;

        setGateAction(action);
        setShowGate(true);

        return false;
    };

    const onJumpToComposer = () => {
        if (!requireAuth("comment")) return;

        composerRef.current?.focus();
    };

    return (
        <div>
            <div className="mx-auto w-full max-w-[1360px] px-4 py-6 lg:px-6 lg:py-8">

                <div
                    className="
                             grid
                             grid-cols-1
                             gap-6
                             lg:grid-cols-[260px_minmax(0,680px)_320px]
                            "
                           >


                    <aside className="hidden lg:block">

                        <div className="sticky top-24 space-y-5">

                            <section className="ui-card p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    Post
                                </p>

                                <div className="mt-5 space-y-4">

                                    <InfoRow
                                        label="Published"
                                        value={formatTime(post.createdAt)}
                                    />

                                    <InfoRow
                                        label="Post ID"
                                        value={post.id}
                                    />

                                    <InfoRow
                                        label="Author"
                                        value={`${post.user.FirstName} ${post.user.LastName}`}
                                    />

                                </div>

                            </section>



                            <section className="ui-card p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    Engagement
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-3">

                                    <Stat
                                        icon={<Heart size={16} />}
                                        value={String(
                                            post.likeCount ?? 0,
                                        )}
                                        label="Likes"
                                    />

                                    <Stat
                                        icon={<MessageCircle size={16} />}
                                        value={String(
                                            post.commentCount ??
                                            comments?.length ??
                                            0,
                                        )}
                                        label="Comments"
                                    />

                                </div>
                            </section>

                            <section className="ui-card p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    Discussion
                                </p>

                                <div className="mt-4 space-y-3">

                                    <MetaRow
                                        label="Comments"
                                        value={String(
                                            comments?.length ?? 0,
                                        )}
                                    />

                                    <MetaRow
                                        label="Likes"
                                        value={String(
                                            post.likeCount ?? 0,
                                        )}
                                    />

                                </div>

                            </section>

                        </div>

                    </aside>



                    <section className="min-w-0">

                        {/* REAL TWEET CARD */}

                        <TweetCard
                            id={post.id}
                            name={`${post.user.FirstName} ${post.user.LastName}`}
                            username={post.user.FirstName.toLowerCase()}
                            avatar={post.user.profilePhoto}
                            time={formatTime(post.createdAt)}
                            content={post.caption}
                            imageUrl={post.imageUrl}
                            commentCount={
                                post.commentCount ?? 0
                            }
                            likeCount={post.likeCount}
                            currentUserId={currentUserId}
                            postUserId={post.user.id}
                            handleLike={onLike}
                            isLiked={post.isLiked}
                            handleComment={onJumpToComposer}
                        />


                        <section className="mt-6">

                            <div className="mb-4 flex items-center justify-between">

                                <div>
                                    <h2 className="text-base font-semibold text-text-primary">
                                        Discussion
                                    </h2>

                                    <p className="mt-1 text-xs text-text-muted">
                                        Join the conversation around this
                                        post.
                                    </p>
                                </div>

                                <span
                                className="
                                 rounded-full
                                 border
                                 border-border
                                 bg-surface
                                 px-3
                                 py-1.5
                                 text-xs
                                 font-medium
                                 text-text-secondary
                                "
                                >
                                    {comments?.length ?? 0} comments
                                </span>

                            </div>

                            {/* COMMENT COMPOSER */}

                            <div className="ui-card p-4">

                                <div className="flex gap-3">

                                    <div className="shrink-0">
                                        <Avatar initials="AD" />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <textarea
                                            ref={composerRef}
                                            value={commentText}
                                            onChange={(e) =>
                                                setCommentText(e.target.value)
                                            }
                                            rows={2}
                                            placeholder="Add to the discussion…"
                                              className="
                                                ui-input
                                                min-h-[60px]
                                                w-full
                                                resize-none
                                                px-4
                                                py-3
                                            "
                                        />

                                        <div className="mt-3 flex justify-end">

                                            <button
                                                onClick={onSubmitComment}
                                                disabled={
                                                    !commentText.trim() ||
                                                    isPosting
                                                }
                                         className="
                                          ui-button-primary
                                          flex
                                          items-center
                                          gap-2
                                          px-4
                                          py-2.5
                                          text-xs
                                          disabled:cursor-not-allowed
                                          disabled:opacity-40
                                          "
                                            >
                                                <Send size={14} />

                                                {isPosting
                                                    ? "Posting..."
                                                    : "Post comment"}
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* COMMENTS */}

                            <div className="mt-4 space-y-2">

                                {comments?.map((comment) => (
                                    <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}

                                {!comments?.length && (
                                    <div className="ui-card py-10 text-center">
                                        <MessageCircle
                                            size={22}
                                            className="mx-auto text-text-muted"
                                        />

                                        <p className="mt-3 text-sm font-medium text-text-secondary">
                                            No comments yet
                                        </p>

                                        <p className="mt-1 text-xs text-text-muted">
                                            Start the discussion.
                                        </p>
                                    </div>
                                )}

                            </div>

                        </section>

                    </section>

                    {/* RIGHT SIDEBAR */}

                    <aside className="hidden lg:block">

                        <div className="sticky top-24 space-y-5">
                            <section className="ui-card p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    About the author
                                </p>

                                <div className="mt-5">

                                    <div className="flex items-center gap-3">

                                        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border bg-surface-2">
                                            <img
                                                src={
                                                    post.user.profilePhoto ||
                                                    "/avatar.jpg"
                                                }
                                                alt={`${post.user.FirstName} ${post.user.LastName}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0">

                                            <h3 className="truncate text-sm font-semibold text-text-primary">
                                                {post.user.FirstName}{" "}
                                                {post.user.LastName}
                                            </h3>

                                            <p className="mt-1 truncate text-xs text-text-secondary">
                                                {post.user.bio ||
                                                    "TechLinked member"}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-3">

                                        <MiniStat
                                            value={String(
                                                post.likeCount ?? 0,
                                            )}
                                            label="Post likes"
                                        />

                                        <MiniStat
                                            value={String(
                                                post.commentCount ??
                                                comments?.length ??
                                                0,
                                            )}
                                            label="Comments"
                                        />

                                    </div>

                                    {/* PROFILE */}

                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/profile/${post.user.id}`,
                                            )
                                        }
                                     className="
                                      ui-button-primary
                                      mt-4
                                      flex
                                      w-full
                                      items-center
                                      justify-center
                                      gap-2
                                      px-4
                                      py-2.5
                                      text-sm
                                      "
                                    >
                                        View profile

                                        <ChevronRight size={15} />
                                    </button>

                                </div>

                            </section>

                            <section className="ui-card p-5">

                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                    Creator activity
                                </p>

                                <div className="mt-5 space-y-4">

                                    <ActivityRow
                                        icon={<Heart size={17} />}
                                        label="Post likes"
                                        value={String(
                                            post.likeCount ?? 0,
                                        )}
                                    />

                                    <ActivityRow
                                        icon={
                                            <MessageCircle size={17} />
                                        }
                                        label="Comments"
                                        value={String(
                                            comments?.length ?? 0,
                                        )}
                                    />

                                    <ActivityRow
                                        icon={<Users size={17} />}
                                        label="Discussion"
                                        value={
                                            comments?.length
                                                ? "Active"
                                                : "Start it"
                                        }
                                    />

                                </div>

                            </section>


                            <section className="ui-card p-5">

                                <div className="flex items-center justify-between">

                                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                        Opportunities
                                    </p>

                                    <BriefcaseBusiness
                                        size={16}
                                        className="text-text-muted"
                                    />

                                </div>

                                <div className="mt-5">

                                    <h3 className="text-sm font-semibold text-text-primary">
                                        Frontend Developer
                                    </h3>

                                    <p className="mt-1 text-xs text-text-secondary">
                                        Technology company · Pune
                                    </p>

                                    <p className="mt-3 text-xs font-semibold text-text-primary">
                                        ₹6–10 LPA
                                    </p>

                                    <button
                                    className="
                                       mt-4
                                       flex
                                      items-center
                                      gap-1
                                      text-xs
                                      font-semibold
                                      text-primary
                                      transition
                                      hover:text-primary-hover
                                      "
                                    >
                                        View opportunity
                                        <ChevronRight size={14} />
                                    </button>

                                </div>

                            </section>

                            {/* RELATED ACTIVITY */}

                            <section className="ui-card p-5">

                                <div className="flex items-center justify-between">

                                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text-muted">
                                        Related activity
                                    </p>

                                    <Trophy
                                        size={16}
                                        className="text-text-muted"
                                    />

                                </div>

                                <div className="mt-5">

                                    <h3 className="text-sm font-semibold text-text-primary">
                                        Technical Challenge
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                                        Take part in technical challenges and
                                        build your profile.
                                    </p>

                                    <div className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                                        <Users size={14} />
                                        Community activity
                                    </div>

                                    <button
                                    className="
                                      mt-4
                                      flex
                                      items-center
                                      gap-1
                                      text-xs
                                      font-semibold
                                      text-primary
                                      transition
                                      hover:text-primary-hover
                                     "
                                    >
                                        View activity
                                        <ChevronRight size={14} />
                                    </button>

                                </div>

                            </section>

                        </div>

                    </aside>

                </div>
            </div>
        </div>
    )
}

export default PostDetailLayout
