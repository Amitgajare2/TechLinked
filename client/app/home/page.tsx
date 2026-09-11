"use client"
import { useRouter } from "next/navigation"
import { useLogout } from "@/src/hooks/auth/authHooks"


export default function HomePage() {
  const router = useRouter()
  const {mutate:logout,isPending:logoutPending} = useLogout();

 const logoutUser = ()=>{
  logout();
 }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl font-semibold">Hello</p>
      <button
        onClick={logoutUser}
        disabled={logoutPending}
        className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {logoutPending ? "Logging out…" : "Logout"}
      </button>
    </div>
  )
}
