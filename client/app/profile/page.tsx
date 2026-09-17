"use client";
import GuestGateModal from "@/src/components/auth/GuestGateModal";
import ActivityCard from "@/src/components/homePage/ActivityCard/ActivityCard";
import Avatar from "@/src/components/homePage/Avatar/Avatar";
import ComposerButton from "@/src/components/homePage/ComposerButton/ComposerButton";
import ExploreItem from "@/src/components/homePage/ExploreItem/ExploreItem";
import OpportunityCard from "@/src/components/homePage/OpportunityCard/OpportunityCard";
import PostCard from "@/src/components/homePage/PostCard/PostCard";
import SectionHeader from "@/src/components/homePage/SectionHeader/SectionHeader";
import TweetCard from "@/src/components/User/Post/TweetCard";
import { useGetPosts, useHandleLike } from "@/src/hooks/post/postHooks";
import { tokenStore } from "@/src/lib/auth/tokenStore";
import { jwtDecode } from "jwt-decode";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CircleCheck,
  Flame,
  Image as ImageIcon,
  Plus,
  Trophy,
  Users,
  Video,
  Vote,
} from "lucide-react";
import { useEffect, useState } from "react";


const user = {
  name: "Ananya Deshmukh",
  username: "@ananya.deshmukh",
  initials: "AD",
  tagline: "Open to front office & guest relations roles",
  connections: 428,
  endorsements: 96,
};

const skills = [
  "Front Office",
  "F&B Service",
  "Housekeeping",
  "Guest Relations",
  "Opera PMS",
];

const communities = [
  {
    name: "Front Office Professionals",
    members: "214 members",
    icon: Building2,
  },
  {
    name: "Culinary Arts Circle",
    members: "89 members",
    icon: Users,
  },
];

const stories = [
  {
    name: "Your Story",
    initials: "AD",
    own: true,
  },
  {
    name: "Mudreh",
    initials: "MK",
  },
  {
    name: "Rohan",
    initials: "RM",
  },
  {
    name: "Priya",
    initials: "PN",
  },
  {
    name: "IHM Pune",
    initials: "IP",
  },
];

// const posts = [
//   {
//     initials: "MK",
//     name: "Mudreh Kumbirai",
//     username: "@mudreh.k",
//     time: "1h",
//     verified: true,
//     text: "Sharing my latest revenue management case study — exploring how hotels can improve ADR without compromising guest satisfaction.",
//     image:
//       "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
//     likes: 58,
//     comments: 12,
//   },
//   {
//     initials: "RM",
//     name: "Rohan Mehta",
//     username: "@rohan.mehta",
//     time: "3h",
//     verified: false,
//     text: "Completed my front office rotation this week. Worked extensively with Opera PMS and guest-relations operations. Now actively looking for placement opportunities.",
//     image: null,
//     likes: 24,
//     comments: 5,
//     opportunity: "Open to opportunities",
//   },
//   {
//     initials: "PC",
//     name: "IHM Pune Placement Cell",
//     username: "@ihmpune",
//     time: "5h",
//     verified: true,
//     text: "Regal Grand Pune is hiring Front Office Trainees. Students with strong communication skills and guest-facing experience are encouraged to apply.",
//     image:
//       "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
//     likes: 76,
//     comments: 18,
//     opportunity: "Hiring",
//   },
// ];

const opportunities = [
  {
    type: "INTERNSHIP",
    title: "Front Office Trainee",
    company: "Regal Grand Pune",
    location: "Pune",
    meta: "3 months",
  },
  {
    type: "FULL-TIME",
    title: "F&B Associate",
    company: "Sahara Business Hotel",
    location: "Mumbai",
    meta: "Entry level",
  },
];

const activities = [
  {
    icon: Trophy,
    title: "Inter-College Culinary Challenge",
    organizer: "IHM Pune",
    info: "24 participants · Applications open",
    deadline: "28 Sep",
  },
  {
    icon: Flame,
    title: "Hospitality Innovation Challenge",
    organizer: "Hotel Leaders Network",
    info: "Team challenge · Open now",
    deadline: "04 Oct",
  },
];

interface JwtPayload {
  userId: string
  exp?: number
}

export default function HomePage() {

  const {mutate:handlelike,isPending:ispendingLike} = useHandleLike();
const { data: posts, isLoading, isError } = useGetPosts()
const [currentUserId, setCurrentUserId] = useState("");
 const [showGate, setShowGate] = useState(false);
 const [gateAction, setGateAction] = useState<"like" | "comment" | "post" | "connect">("post");


useEffect(() => {
  const token = tokenStore.get()
  if (!token) return 

  try {
    const decoded = jwtDecode<JwtPayload>(token)
    setCurrentUserId(decoded.userId ?? "")
  } catch {
    tokenStore.set(null)
  }
}, []) 

function formatTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

  const handleLike = (postId:string)=>{
      if (!tokenStore.get()) {
      setGateAction("like")
      setShowGate(true)
      return
    }
     handlelike(postId);
  }

console.log(posts)

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* DESKTOP */}
      <div className="hidden md:block">
        <div className="mx-auto w-full max-w-[1800px] px-6 py-8 xl:px-10">
          <div className="grid w-full sm:grid-cols-[0%_62%_40%] lg:grid-cols-[28%_50%_20%] justify-center">

            {/* LEFT COLUMN */}
  
            <aside className="sticky top-8 h-fit pr-6">

              {/* Profile */}
              <section className="overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative h-24 overflow-hidden bg-surface-hover">
                  <div className="absolute -right-10 -top-14 h-36 w-36 rounded-full border border-primary-border" />
                  <div className="absolute -right-2 -top-7 h-24 w-24 rounded-full border border-primary-border" />

                  <div className="absolute bottom-0 left-6 translate-y-1/2">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-surface bg-surface-2 text-2xl font-semibold text-primary">
                      AD
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-14">
                  <div className="flex items-center gap-2">
                    <h1 className="text-[20px] font-semibold tracking-[-0.02em]">
                      {user.name}
                    </h1>

                    <CircleCheck
                      size={17}
                      className="fill-primary text-background"
                    />
                  </div>

                  <p className="mt-1 text-sm text-text-muted">
                    {user.username}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {user.tagline}
                  </p>

                  <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-border">
                    <div className="px-3 py-4 text-center">
                      <p className="text-lg font-semibold">
                        {user.connections}
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text-subtle">
                        Connections
                      </p>
                    </div>

                    <div className="border-l border-border px-3 py-4 text-center">
                      <p className="text-lg font-semibold">
                        {user.endorsements}
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text-subtle">
                        Endorsements
                      </p>
                    </div>
                  </div>

                  <button className="ui-button-primary mt-5 flex h-11 w-full items-center justify-center">
                    My Profile
                  </button>
                </div>
              </section>

              {/* Explore */}
              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Explore
                  </h2>
                </div>

                <div className="space-y-1">
                  <ExploreItem
                    icon={BriefcaseBusiness}
                    title="Opportunities"
                    subtitle="Jobs & internships"
                  />

                  <ExploreItem
                    icon={Trophy}
                    title="Leaderboard"
                    subtitle="See your impact rank"
                  />

                  <ExploreItem
                    icon={Building2}
                    title="Projects"
                    subtitle="Build & collaborate"
                  />

                  <ExploreItem
                    icon={CalendarDays}
                    title="Activities"
                    subtitle="Competitions & events"
                  />
                </div>
              </section>

              {/* Skills */}
              <section className="mt-7">
                <h2 className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Your Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-text-secondary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Communities */}
              <section className="mt-7">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                    Communities
                  </h2>

                  <button className="text-xs text-primary">
                    View all
                  </button>
                </div>

                <div className="space-y-2">
                  {communities.map((community) => {
                    const Icon = community.icon;

                    return (
                      <div
                        key={community.name}
                        className="rounded-xl border border-border bg-surface p-3 transition hover:border-border-hover"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2">
                            <Icon size={17} className="text-primary" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-text-primary">
                              {community.name}
                            </p>

                            <p className="mt-1 text-[11px] text-text-subtle">
                              {community.members}
                            </p>
                          </div>
                        </div>

                        <button className="mt-3 h-8 w-full rounded-lg border border-border text-[11px] font-medium text-text-secondary transition hover:border-primary-border hover:text-primary">
                          Join community
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            </aside>

            {/* CENTER COLUMN */}
  
            <main className="min-w-0 px-2">

              {/* Greeting */}
              <div className="mb-7 px-1">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
                  Hospitality community
                </p>

                <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.03em]">
                  Good morning, Ananya
                </h2>

                <p className="mt-1 text-sm text-text-muted">
                  Discover what&apos;s happening in hospitality.
                </p>
              </div>

              {/* Feed Tabs */}
              <div className="mb-4 flex items-center border-b border-border">
                <button className="relative px-4 pb-3 text-sm font-medium text-text-primary">
                  Everyone

                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-primary" />
                </button>

                <button className="px-4 pb-3 text-sm text-text-subtle transition hover:text-text-primary">
                  Following
                </button>

                <button className="px-4 pb-3 text-sm text-text-subtle transition hover:text-text-primary">
                  My College
                </button>
              </div>

              {/* Composer */}
              <section className="rounded-2xl border border-border bg-surface p-4">
                <div className="flex gap-3">
                  <Avatar initials="AD" />

                  <div className="flex-1">
                    <div className="rounded-xl border border-border bg-surface-dark px-4 py-3.5 text-sm text-text-subtle">
                      What&apos;s happening in hospitality?
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div className="flex items-center gap-1">
                    <ComposerButton icon={ImageIcon} text="Photo" />
                    <ComposerButton icon={Video} text="Video" />
                    <ComposerButton icon={Vote} text="Poll" />
                  </div>

                  <button className="ui-button-secondary flex items-center gap-2 px-3 py-2 text-xs font-medium">
                    Schedule
                    <CalendarDays size={14} />
                  </button>
                </div>
              </section>

              {/* Stories */}
              <section className="mt-5">
                <div className="mb-3 flex items-center justify-between px-1">
                  <h3 className="text-sm font-semibold">
                    Stories
                  </h3>

                  <button className="text-xs text-text-muted">
                    View all
                  </button>
                </div>

                <div className="flex gap-3 overflow-hidden">
                  {stories.map((story) => (
                    <div
                      key={story.name}
                      className="min-w-[67px] text-center"
                    >
                      <div
                        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full p-[2px] ${
                          story.own
                            ? "border border-dashed border-text-subtle"
                            : "bg-primary"
                        }`}
                      >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-surface-2 text-xs font-semibold">
                          {story.own ? (
                            <Plus size={17} className="text-primary" />
                          ) : (
                            story.initials
                          )}
                        </div>
                      </div>

                      <p className="mt-2 truncate text-[11px] text-text-muted">
                        {story.name}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Feed */}
              <section className="mt-6 space-y-4">
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
                              commentCount={post.commentCount ?? 0}
                              likeCount={post.likeCount}
                              currentUserId={currentUserId}
                              postUserId={post.user.id}
                              handleLike={handleLike}
                              isLiked={post.isLiked}
                            />
                          ))}
              </section>
            </main>

            {/* RIGHT COLUMN */}

            <aside className="sticky top-8 h-fit pl-6">

              {/* Opportunities */}
              <section>
                <SectionHeader
                  title="Opportunities"
                  subtitle="Because of your profile"
                  action="View all"
                />

                <div className="mt-3 space-y-3">
                  {opportunities.map((item) => (
                    <OpportunityCard
                      key={item.title}
                      item={item}
                    />
                  ))}
                </div>
              </section>

              {/* Progress */}
              <section className="mt-6 overflow-hidden rounded-2xl border border-primary-border bg-surface">
                <div className="border-b border-border px-5 py-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    Your Progress
                  </p>
                </div>

                <div className="p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.12em] text-text-subtle">
                        Current rank
                      </p>

                      <p className="mt-1 text-4xl font-semibold tracking-[-0.04em]">
                        #18
                      </p>
                    </div>

                    <Trophy size={25} className="text-primary" />
                  </div>

                  <div className="mt-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-2xl font-semibold">
                          482
                        </p>

                        <p className="mt-1 text-xs text-text-subtle">
                          Impact points
                        </p>
                      </div>

                      <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        ↑ 4 this week
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
                      <div className="h-full w-[72%] rounded-full bg-primary" />
                    </div>
                  </div>

                  <button className="ui-button-secondary mt-5 flex w-full items-center justify-between px-3 py-2.5 text-xs font-medium">
                    View full leaderboard
                    <ArrowRight size={14} />
                  </button>
                </div>
              </section>

              {/* Activities */}
              <section className="mt-6">
                <SectionHeader
                  title="Activities"
                  subtitle="Participate & grow"
                  action="View all"
                />

                <div className="mt-3 space-y-3">
                  {activities.map((activity) => (
                    <ActivityCard
                      key={activity.title}
                      activity={activity}
                    />
                  ))}
                </div>
              </section>

              <div className="mt-8 px-1 text-[10px] leading-5 text-text-subtle">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span>About</span>
                  <span>Privacy</span>
                  <span>Terms</span>
                  <span>Help</span>
                </div>

                <p className="mt-2">
                  © 2026 Hospitality Community
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* MOBILE */}

      <div className="block md:hidden">
        <div className="px-4 pb-8 pt-6">
          <div className="mb-7">
            <p className="text-[10px] uppercase tracking-[0.16em] text-text-subtle">
              Hospitality community
            </p>

            <h1 className="mt-2 text-2xl font-semibold">
              Good morning, Ananya
            </h1>

            <p className="mt-1 text-sm text-text-muted">
              Discover what&apos;s happening in hospitality.
            </p>
          </div>

          <section className="rounded-2xl border border-border bg-surface p-4">
            <div className="flex gap-3">
              <Avatar initials="AD" />

              <div className="flex-1 rounded-xl bg-surface-dark px-4 py-3 text-sm text-text-subtle">
                What&apos;s happening in hospitality?
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
              <ComposerButton icon={ImageIcon} text="Photo" />
              <ComposerButton icon={Video} text="Video" />
              <ComposerButton icon={Vote} text="Poll" />
            </div>
          </section>

          <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
            {stories.map((story) => (
              <div
                key={story.name}
                className="min-w-[62px] text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-surface-2 text-xs font-semibold">
                  {story.own ? (
                    <Plus size={17} className="text-primary" />
                  ) : (
                    story.initials
                  )}
                </div>

                <p className="mt-2 truncate text-[10px] text-text-muted">
                  {story.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex border-b border-border">
            <button className="border-b-2 border-primary px-3 pb-3 text-sm font-medium">
              Everyone
            </button>

            <button className="px-3 pb-3 text-sm text-text-subtle">
              Following
            </button>

            <button className="px-3 pb-3 text-sm text-text-subtle">
              College
            </button>
          </div>

          <div className="mt-4 space-y-4">
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
                         commentCount={post.commentCount ?? 0}
                         likeCount={post.likeCount}
                         currentUserId={currentUserId}
                         postUserId={post.user.id}
                         handleLike={handleLike}
                         isLiked={post.isLiked}
                       />
                     ))}
          </div>
        </div>
        
      </div>
       {
        showGate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
             <GuestGateModal
             isOpen={showGate}
             onClose={()=>{setShowGate(false)}}
             action={gateAction}
             />  
          </div>
        )
      }
    </main>
  );
}
