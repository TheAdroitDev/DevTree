'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("")
  const router = useRouter()
  const createDevTree = () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <>
      <main>
        <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
          <div className="flex justify-center  flex-col ml-[10vw] gap-2">
            <p className="text-7xl font-bold text-[#d2e823]">Everything you </p>
            <p className="text-7xl font-bold text-[#d2e823]">are. in one,simple</p>
            <p className="text-7xl font-bold text-[#d2e823]"> link in bio.</p>
            <p className="text-[#d2e823] text-xl  my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>

            <div className="input flex gap-3">
              <input value={text} onChange={(e) => setText(e.target.value)} className="focus:outline outline-green-700 px-5 py-5 rounded-xl" placeholder="Enter yout Handle" type="text" />
              <button onClick={() => createDevTree()} className="bg-pink-300 rounded-full px-4 py-4 text-lg font-semibold">Claim Your DevTree</button>
            </div>
          </div>

          <div className="flex justify-center items-center flex-col mr-[10vw] ">
            <img className="mt-20" src={"/home.png"} alt={"Home-Image"} />
          </div>
        </section>
      </main>
    </>
  );
}
