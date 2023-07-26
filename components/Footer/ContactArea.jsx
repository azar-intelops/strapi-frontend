// contact Area included Foorter.js
import React from 'react'

function ContactArea() {
    return (
        <div className='max-w-[85vw] bg-white mx-auto absolute -top-80 inset-x-0 rounded-3xl shadow-[0_30px_99px_30px_rgba(0,0,0,0.3)] shadow-[#4949681A]'>
            <div className="flex gap-20 items-center flex-wrap text-[#7D8695] px-20 py-[5%] shadow-[#4949681A]">
                <div className='flex-1 max-w-[50vw] text-xl space-y-8 px-8'>
                    <div>
                        <h2 className='font-black text-black text-3xl max-w-xl'>Looking For Cloud-Native Talent? Let Us Make Your Life Easy!</h2>
                    </div>
                    <div>
                        <p className=''>
                            We heard the pain of building the Talent, keeping up with Concepts, Culture, Technology and Tools. We have been there! Hence, we built the new Ai-based automated solution to solve the problems for everyone.
                        </p>
                    </div>
                    <div>
                        <button className='px-8 py-2 rounded-full bg-[#F88136] text-white'>Contact Us</button>
                    </div>
                </div>
                <div className='flex-1'>
                    <img src="/content-7.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default ContactArea