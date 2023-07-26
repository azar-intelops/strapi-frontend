// This is a React component called FourthNavbar.
import React from 'react'

export default function FourthNavbar() {
  return (
    <div className='max-w-screen'>
    <div className="flex gap-20 items-center flex-wrap text-[#7d8695] px-20 py-[5%]">
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
                    <img src="/content-4.svg" alt="" />
                </div>
            </div>
        </div>
    // <div className='h-screen w-screen'>
    //         <div className="containerBanner2 flex ">
    //         <div>
    //                 <div className="heading-2">
    //             We Are IntelOps
    //             </div>
    //             <div className="heading2-2">
    //             Lots Of People Love Us, 
    //             And We’re Also.
    //             </div>
    //             <div className="heading3-2">
    //             Vestibulum ante ipsum primis in faucibus orci luctus et ultrices 
    //             posuere cubilia Curae; Donec velit neque, auctor sit amet 
    //             aliquam vel, ullamcorper sit amet ligula. Vestibulum.
    //             </div>
    //             <ul>
    //                 <li>
    //                 luctus et ultrices uere cubia Curae Donec verglit
    //                 </li>
    //                 <li>
    //                 Neque auctor congue leo eget malesuada Vivamus
    //                 </li>
    //                 <li>
    //                 Sit amet dui Nulla quis lorem ut libero malesuada feugiat
    //                 </li>
    //                 <li>
    //                 Donec verglit neque, auctor congue leo malesuada.
    //                 </li>
    //             </ul>
    //             </div>
    //             <div className="top-right-2 float-right">
    //                 <img src='/content-4.svg' className="content-2-rightCeneter " />
    //             </div>
                
    //         </div>
    //     </div>
  )
}
