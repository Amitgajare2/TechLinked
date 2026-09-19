"use client";
import GuestGateModal from "@/src/components/auth/GuestGateModal";
import NavBar from "@/src/components/Common/NavBar";
import ActivityCard from "@/src/components/homePage/ActivityCard/ActivityCard";
import Avatar from "@/src/components/homePage/Avatar/Avatar";
import ComposerButton from "@/src/components/homePage/ComposerButton/ComposerButton";
import ExploreItem from "@/src/components/homePage/ExploreItem/ExploreItem";
import OpportunityCard from "@/src/components/homePage/OpportunityCard/OpportunityCard";
import PostCard from "@/src/components/homePage/PostCard/PostCard";
import SectionHeader from "@/src/components/homePage/SectionHeader/SectionHeader";
import HomePageLayout from "@/src/components/User/Homepage/HomePageLayout";
import TweetCard from "@/src/components/User/Post/TweetCard";
import { useGetPosts, useHandleLike } from "@/src/hooks/post/postHooks";
import { tokenStore } from "@/src/lib/auth/tokenStore";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
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

  const {mutate:handlelike,isPending:ispendingLike} = useHandleLike();
const { data: posts, isLoading, isError } = useGetPosts()
const [currentUserId, setCurrentUserId] = useState("");
 const [showGate, setShowGate] = useState(false);
 const [gateAction, setGateAction] = useState<"like" | "comment" | "post" | "connect">("post");
 const router = useRouter();


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

  const handleCreatePostClick = () => {
    if (!tokenStore.get()) {
      setGateAction("post")
      setShowGate(true)
      return
    }
    // setShowCreatePost(true)
  }

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

  const handleCommentClick = (postId: string) => {
  if (!tokenStore.get()) {
    setGateAction("comment");
    setShowGate(true);
    return;
  }
  router.push(`/post/${postId}`);
};

console.log("posts",posts)

  return (
    <main className="min-h-screen bg-background text-text-primary">
      {/* DESKTOP */}
      
      <HomePageLayout
      activities={activities}
      communities={communities}
      opportunities={opportunities}
      skills={skills}
      stories={stories}
      user={user}
      posts={posts}
      formatTime={formatTime}
      currentUserId={currentUserId}
      handleLike={handleLike}
      handleCommentClick={handleCommentClick}
      />

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
