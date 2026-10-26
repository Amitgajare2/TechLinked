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
  Image as ImageIcon,
  Trophy,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
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

  const posts = [
    {
      id: "static-post-1",
      caption: "Excited to share our new front office training initiative with hospitality students. Building stronger guest experiences through practical service learning.",
      imageUrl: "",
      user: {
        FirstName: "Ananya",
        LastName: "Deshmukh",
        profilePhoto: "",
        id: "user-1",
      },
      createdAt: "2026-10-26T10:00:00.000Z",
      likeCount: 128,
      commentCount: 24,
      isLiked: false,
    },
    {
      id: "static-post-2",
      caption: "Our team just wrapped up a successful guest relations workshop. The energy and learning mindset in hospitality is incredible.",
      imageUrl: "",
      user: {
        FirstName: "Rohan",
        LastName: "Mehta",
        profilePhoto: "",
        id: "user-2",
      },
      createdAt: "2026-10-25T12:30:00.000Z",
      likeCount: 94,
      commentCount: 15,
      isLiked: true,
    },
  ];

  const [currentUserId, setCurrentUserId] = useState("");
  const [showGate, setShowGate] = useState(false);
  const [gateAction, setGateAction] = useState<"like" | "comment" | "post" | "connect">("post");
  const router = useRouter();

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

  console.log("posts", posts);

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
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="order-3">
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
