"use client"
import NavBar from "@/src/components/Common/NavBar";
import CreatePostModal from "@/src/components/Models/CreatePostModal";
import { useState } from "react";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [post,setPost] = useState(false);

  const closePostModal = ()=>{
    setPost(false);
  }

  return (
    <div className="min-h-screen">
      <main className="pt-[68px]">
        {children}
      </main>
      <NavBar 
      setPost={setPost}
      /> 

     {post && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black/40"
    onClick={closePostModal}
  >
      <CreatePostModal onClose={closePostModal} />
  </div>
)}
    </div>
  );
}