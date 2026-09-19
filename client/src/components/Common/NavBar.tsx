import Home from '@/app/page'
import { Plus, Tv } from 'lucide-react'
import React from 'react'
import { Ranking } from 'reicon-react'

const NavBar = ({handleCreatePostClick}:any) => {
  return (
    <div>
     <nav className="fixed bottom-5 left-1/2 z-40 flex h-[68px] w-[calc(100%-32px)] max-w-lg -translate-x-1/2 items-center justify-between rounded-[24px] border border-white/50 bg-white/45 px-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150">

        <button className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full bg-black text-white shadow-sm">
          <Home/>
        </button>

        <button className="flex h-11 w-11 items-center cursor-pointer justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <Ranking />
        </button>
        <button
          onClick={handleCreatePostClick}
          className="-mt-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-[5px] border-[#f7f7f8] bg-black text-2xl text-white shadow-[0_8px_25px_rgba(0,0,0,0.2)] transition hover:scale-105 active:scale-95"
        >
          <Plus/>
        </button>

        <button className="relative flex h-11 w-11 items-center cursor-pointer justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-gray-600 transition hover:bg-black/5">
          <Tv />
        </button>
        
      </nav>
    </div>
  )
}

export default NavBar;