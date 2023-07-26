// This is a React component called FifthNavbar.
import React from 'react'

export default function FifthNavbar() {
    return (
        <div className="max-w-screen items-center bg-[url('/intelops.svg')] bg-center bg-no-repeat bg-cover flex space-between">
            <div className='flex-1 max-w-[50vw] text-xl space-y-8 px-20'>
                <div>
                    <h1 className='text-6xl text-white font-black max-w-lg'>Start using Compage platform today...</h1>
                </div>
                <div className=''>
                    <button type="button" className='px-8 py-2 rounded-full bg-black text-white'>Get started</button>
                </div>
            </div>
            <div className='flex-1'>
                <img src="/content-5.svg" />
            </div>
        </div>
    )
}
