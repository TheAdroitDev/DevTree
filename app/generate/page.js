"use client"
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Generate = () => {
    // const [link, setlink] = useState("")
    // const [linktext, setlinktext] = useState("")

    const searchParams = useSearchParams()
    const [links, setLinks] = useState([{ link: "", linktext: "" }])
    const [handle, sethandle] = useState(searchParams.get('handle'))
    const [picture, setpic] = useState("")
    const [desc, setdesc] = useState("")

    const handleChange = (index, link, linktext) => {
        setLinks((initialLinks) => {
            return initialLinks.map((item, i) => {
                if (i == index) {
                    return { link, linktext }
                }
                else {
                    return item
                }
            })
        })
    }

    const addLink = () => {
        setLinks(links.concat([{ link: "", linktext: "" }]))
    }


    const submitLinks = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "links": links,
            "handle": handle,
            "picture": picture,
            "desc":desc
        });
        console.log(raw);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const r = await fetch("http://localhost:3000/api/add", requestOptions)
        const result = await r.json()
        if (result.success) {
            toast.success('DevTree Created Successfully!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setLinks([])
            setpic("")
            sethandle("")
        }
        else {
            toast.error('This DevTree Already Exists!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='bg-purple-300 min-h-screen grid-cols-2 grid overflow-hidden '>
                <div className="col1 flex items-center justify-center flex-col">
                    <div className="input flex flex-col gap-5 my-8">
                        <div className="item">
                            <h1 className='font-bold text-4xl'>Create Your Devtree</h1>
                            <h2 className='font-semibold text-2xl mt-4 my-4'>Step 1: Claim Your Handle</h2>
                            <div className="mx-6">
                                <input value={handle || ""} onChange={e => { sethandle(e.target.value) }} className='px-7 py-2 focus:outline outline-pink-400 rounded-2xl' type="text" placeholder='Choose a Handle' />
                            </div>
                        </div>
                        <div className="item">
                            <h2 className='font-semibold text-2xl'>Step 2: Add Links</h2>
                            {links && links.map((item, index) => {
                                return <div key={index} className="mx-4">
                                    <input value={item.linktext || ""} onChange={e => { handleChange(index, item.link, e.target.value) }} className='px-7 py-2 mx-2 my-3 focus:outline outline-pink-400 rounded-2xl' type="text" placeholder='Enter your linktext' />
                                    <input value={item.link || ""} onChange={e => { handleChange(index, e.target.value, item.linktext) }} className='px-7 py-2 mx-2 my-3 focus:outline outline-pink-400 rounded-2xl' type="text" placeholder='Enter your link' />
                                </div>
                            })}
                            <div className='ml-4'>
                            <button onClick={() => addLink()} className='p-5 py-2 mx-2 bg-[#7474] hover:bg-[#55005544] transition-all rounded-xl font-semibold'>+ Add Link</button>
                            </div>
                        </div>
                        <div className="item">
                            <h2 className='font-semibold text-2xl'>Step 3: Add Picture and Description</h2>
                            <div className="mx-4 flex flex-col gap-2    ">
                                <input value={picture || ""} onChange={e => { setpic(e.target.value) }} className='px-7 py-2 mx-2 my-3 focus:outline outline-pink-400 rounded-2xl' type="text" placeholder='Enter link to your picture' />
                                <input value={desc || ""} onChange={e => { setdesc(e.target.value) }} className='px-7 py-2 mx-2 my-3 focus:outline outline-pink-400 rounded-2xl' type="text" placeholder='Enter Description' />
                                {picture == "" || handle == "" || links[0].linktext == "" ? (<>  <button className='hover:cursor-not-allowed p-5 py-2 mx-2 bg-[#00000044] rounded-xl font-semibold'>Enter Details</button></>) : (<>
                                    <button onClick={() => { submitLinks() }} className="w-fit group relative inline-block font-medium hover:font-bold overflow-hidden rounded border-4 border-double border-purple-500 px-5 py-2 text-purple-600">
                                        <span className="absolute left-0 top-0 mb-0 flex h-full w-0 translate-x-0 transform bg-purple-600 opacity-90 transition-all duration-300 ease-out group-hover:w-full"></span>
                                        <span className="relative group-hover:text-white">Create Your DevTree</span>
                                    </button>
                                </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col2 h-screen w-full">
                    <img className='h-full object-contain mt-20' src="/generate.png" alt="generate-png-image" />
                </div>
            </div>
        </>
    )
}

export default Generate
