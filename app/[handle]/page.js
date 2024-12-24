import clientPromise from "@/lib/mongodb"
import Link from "next/link"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const handle = (await params).handle
  const client = await clientPromise;
  const db = client.db('Devtree');
  const collection = db.collection("links");

  const item = await collection.findOne({ handle: handle })
  if(!item){
    return notFound()
  }
  const item2 = {
    "_id": {
      "$oid": "674d5f925dafea6e5a33432e"
    },
    "links": [
      {
        "link": "https://github.com/TheAdroitDev",
        "linktext": "Github"
      },
      {
        "link": "https://x.com/SV_Insights",
        "linktext": "X(Twitter)"
      },
      {
        "link": "https://theadroit.dev",
        "linktext": "Website"
      }
    ],
    "handle": "ShivamVerma",
    "picture": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOS_9Pb2C1NoHkh_U9u_0yiMmq-0DWSCOl9IUN9-_YbKEB1lrSwJ3HymwL1DnOMsDPNiE&usqp=CAU"
  }
  return (
    <>
      <div className="flex min-h-screen bg-[#9255b6] justify-center items-start py-10">
        {item && <div className="photo flex flex-col items-center justify-center gap-4">
          <img className="rounded-full" src={item.picture} alt="avatar" />
          <span className="font-bold text-white text-xl">@{item.handle}</span>
          <span className="desc w-[490px] text-center text-black font-semibold text-lg">{item.desc}</span>
          <div className="links text-black">
            {item.links.map((item, index) => {
              return <Link key={index} href={item.link}><div className="py-[10px] px-4 hover:py-4 transition-all my-4 rounded-md bg-[#f2dbff] shadow-lg font-semibold min-w-80 flex justify-center">
                {item.linktext}
              </div>
              </Link>
            })}
          </div>
        </div>}
      </div>
    </>
  )
}