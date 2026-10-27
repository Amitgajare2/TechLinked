"use client";
import GuestGateModal from "@/src/components/auth/GuestGateModal";
import ComposeBox from "@/src/components/homePage/ComposeBox";
import LeftSidebar from "@/src/components/homePage/LeftSidebar";
import Navbar from "@/src/components/homePage/Navbar";
import PostCard from "@/src/components/homePage/PostCard";
import RightSidebar from "@/src/components/homePage/RightSidebar";
import WelcomeBanner from "@/src/components/homePage/WelcomeBanner";
// import HomePageLayout from "@/src/components/User/Homepage/HomePageLayout";
// import { useMe } from "@/src/hooks/auth/authHooks";
// import { useGetPosts, useHandleLike } from "@/src/hooks/post/postHooks";
// import { tokenStore } from "@/src/lib/auth/tokenStore";
// import { useQuery } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
import {
  Building2,
  Flame,
  Trophy,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";



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
  // const {mutate:handlelike,isPending:ispendingLike} = useHandleLike();
  // const { data: posts, isLoading:postLoading, isError } = useGetPosts();
  // const { data, isLoading } = useMe();

  const basePosts = useMemo(() => {
    return Array.from({ length: 60 }, (_, index) => {
      const userProfiles = [
        { first: "Ananya", last: "Deshmukh", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
        { first: "Rohan", last: "Mehta", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
        { first: "Priya", last: "Sharma", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80" },
        { first: "Vihaan", last: "Patel", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
        { first: "Mira", last: "Nair", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80" },
        { first: "Arjun", last: "Singh", photo: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80" },
        { first: "Kavya", last: "Iyer", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
        { first: "Dev", last: "Kapoor", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80" },
      ];

      const profile = userProfiles[index % userProfiles.length];
      const captions = [
        "Excited to share our new front office training initiative with hospitality students. Building stronger guest experiences through practical service learning.",
        "Our team just wrapped up a successful guest relations workshop. The energy and learning mindset in hospitality is incredible.",
        "A strong guest experience starts with empathy, service discipline, and attention to detail. Proud to be part of a team that learns every day.",
        "Hospitality is more than service. It is listening, adapting, and creating meaningful experiences for every guest who walks through the door.",
        "From check-in to check-out, small gestures shape the guest journey. This is what makes hospitality such a rewarding profession.",
        "Learning from the floor today helped me understand how much trust and professionalism are required in hotel operations.",
        "The best hospitality teams are built on teamwork, curiosity, and genuine care for every guest. That is the standard we aim for.",
        "Working with students and mentors this week reminded me how fast hospitality skills grow when people are encouraged to learn actively.",
        "Great guest service is all about consistency. Every detail matters when you want guests to feel welcomed and valued.",
        "I am proud to be in a field where people skills, operations, and service excellence all come together to create memorable stays."
      ];

      const createdAt = new Date(Date.UTC(2026, 9, 26 - index, 10, 0, 0)).toISOString();

      return {
        id: `static-post-${index + 1}`,
        caption: captions[index % captions.length],
        imageUrl: "",
        user: {
          FirstName: profile.first,
          LastName: profile.last,
          profilePhoto: profile.photo,
          id: `user-${index + 1}`,
        },
        createdAt,
        updatedAt: createdAt,
        likeCount: 30 + index * 3 + (index % 5) * 7,
        commentCount: 8 + (index % 9) * 3,
        isLiked: index % 3 === 0,
      };
    });
  }, []);

  const [visiblePosts, setVisiblePosts] = useState<typeof basePosts>(() => basePosts.slice(0, 8));
  const [currentUserId, setCurrentUserId] = useState("");
  const [showGate, setShowGate] = useState(false);
  const [gateAction, setGateAction] = useState<"like" | "comment" | "post" | "connect">("post");
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingMore || visiblePosts.length >= basePosts.length) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;
      const triggerPoint = scrollHeight - 220;

      if (currentScroll >= triggerPoint) {
        setIsLoadingMore(true);

        window.setTimeout(() => {
          setVisiblePosts((prev) => {
            const nextCount = Math.min(prev.length + 8, basePosts.length);
            return basePosts.slice(0, nextCount);
          });
          setIsLoadingMore(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [basePosts, isLoadingMore, visiblePosts.length]);

  // useEffect(() => {
  //   const token = tokenStore.get()
  //   if (!token) return 

  //   try {
  //     const decoded = jwtDecode<JwtPayload>(token)
  //     setCurrentUserId(decoded.userId ?? "")
  //   } catch {
  //     tokenStore.set(null)
  //   }
  // }, [])

  // function formatTime(iso: string) {
  //   return new Date(iso).toLocaleDateString("en-IN", {
  //     day: "numeric",
  //     month: "short",
  //     year: "numeric",
  //   })
  // }

  // const handleLike = (postId:string)=>{
  //     if (!tokenStore.get()) {
  //     setGateAction("like")
  //     setShowGate(true)
  //     return
  //   }
  //    handlelike(postId);
  // }

  // const handleCommentClick = (postId: string) => {
  // if (!tokenStore.get()) {
  //   setGateAction("comment");
  //   setShowGate(true);
  //   return;
  // }
  // router.push(`/post/${postId}`);
  // };

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* DESKTOP */}
        <div className="min-h-screen bg-page">
      <Navbar />

      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-[272px_minmax(0,1fr)_320px] lg:gap-7 lg:px-8 lg:py-8">
        <div className="order-2 lg:order-1">
          <LeftSidebar />
        </div>

        <div className="order-1 flex flex-col gap-5 sm:gap-6 lg:order-2">
          <WelcomeBanner />
          <ComposeBox />
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div ref={loadMoreRef} className="flex min-h-[40px] items-center justify-center">
            {isLoadingMore ? (
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-muted/30 border-t-ink-muted" />
                Loading more posts...
              </div>
            ) : (
              <div className="text-xs uppercase tracking-[0.2em] text-ink-muted/70">
                {visiblePosts.length >= basePosts.length ? "You’ve reached the end" : "Scroll for more"}
              </div>
            )}
          </div>
        </div>

        <div className="order-3 hidden lg:block">
          <RightSidebar />
        </div>
      </main>
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
