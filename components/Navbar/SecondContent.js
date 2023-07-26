// This is a React component called SecondContent.
import React from 'react'

export default function SecondContent() {
    return (
        <div className='max-w-screen'>            
            <div className="flex gap-20  items-center flex-wrap text-[#7d8695] px-20 py-[5%]">
                <div className='flex-1 max-w-[50vw] text-xl space-y-8'>
                    <div>
                        <h3 className='text-[#f88136] text-2xl font-bold'>We Are IntelOps</h3>
                    </div>
                    <div>
                        <h2 className='font-black text-black text-5xl max-w-xl'>Lots Of People Love Us, And We’re Also.</h2>
                    </div>
                    <div>
                        <p className=''>
                        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Vestibulum.
                        </p>
                    </div>
                    <div>
                        <ul className='space-y-2'>
                            <li className='flex gap-4 items-center'>
                                <div className='w-3 h-3 bg-[#FF8378] rounded-full' />
                                <p>luctus et ultrices uere cubia Curae Donec verglit</p></li>
                            <li className='flex gap-4 items-center'>
                                <div className='w-3 h-3 bg-[#EFDA3D] rounded-full' />
                                <p>Neque auctor congue leo eget malesuada Vivamus</p></li>
                            <li className='flex gap-4 items-center'>
                                <div className='w-3 h-3 bg-[#A06EF8] rounded-full' />
                                <p>Sit amet dui Nulla quis lorem ut libero malesuada feugiat</p></li>
                            <li className='flex gap-4 items-center'>
                                <div className='w-3 h-3 bg-[#3DDEAE] rounded-full' />
                                <p>Donec verglit neque, auctor congue leo malesuada.</p></li>
                        </ul>
                    </div>
                </div>
                <div className='flex-1'>
                    <img src="/content-2-new.svg" alt="" />
                </div>
            </div>
        </div>
    )
}
//Overall, this code seems to represent a section of a webpage that displays information about IntelOps. It includes headings, paragraphs, and a list of items, along with an accompanying image.