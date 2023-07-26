// Footer Component included index.js
import React from 'react'
import ContactArea from './ContactArea'

const icons = [{ icon: "/facebook-icon.svg", link: "#" }, { icon: "/twitter-icon.svg", link: "#" }, { icon: "/instagram-icon.svg", link: "#" }, { icon: "/linkedin-icon.svg", link: "#" }, { icon: "/youtube-icon.svg", link: "#" }]

const footerTags = {
    "Support": [
        { name: "About", path: "#" },
        { name: "Contact", path: "#" },
        { name: "Privacy Policy", path: "#" },
        { name: "Terms & Conditions", path: "#" },
    ],
    "Resources": [
        { name: "Certified", path: "#" },
        { name: "Partner Program", path: "#" },
        { name: "Team", path: "#" },
    ],
    "Other pages": [
        { name: "Docs", path: "#" },
        { name: "Blog", path: "#" },
        { name: "Home", path: "#" },
    ]
}
export default function Footer() {
    let year = new Date()
    // console.log(year.getFullYear())
    return (
        <div className="max-w-screen items-center bg-[url('/footer-background.svg')] bg-center bg-cover pt-[22rem] px-24 relative">
            <ContactArea />
            <div className='space-y-4 '>
                <div className='flex justify-between items-center'>
                    <div>
                        <img src="/intelops-white-logo.svg" alt="intelops-logo" />
                    </div>
                    <div className='flex items-center gap-16'>
                        <div>
                            <div className='relative flex items-center gap-2 bg-[#FFFFFF1A] px-4 rounded-full '>
                                <span className=''>
                                    <img src="/search.svg" alt="search-icon" />
                                </span>
                                <input placeholder='Search Intelops...' type="search" name="" id="" className='min-w-[20vw] px-4 py-2 bg-transparent outline-none' />
                            </div>
                        </div>
                        <div>
                            <ul className='flex gap-3'>
                                {
                                    icons.map((icon, index) => <li key={index}>
                                        <a href={icon.link}><img className='w-12' src={icon.icon} alt={icon.icon.split(".")[0]} /></a>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className='' />
                <div className='flex gap-8 text-white py-4'>
                    <div className='min-w-[20vw] space-y-2'>
                        <h3 className='text-2xl font-black'>Product</h3>
                        <p className='text-white text-lg max-w-xs'>Our open source Contributed open source</p>
                    </div>
                    {
                        Object.keys(footerTags).map((tag) => {
                            return (
                                <div key={tag} className="min-w-[20vw] space-y-2" >
                                    <div className=''> <h3 className='font-black text-2xl'>{tag}</h3> </div>
                                    <div className='flex flex-col gap-2'>
                                        {
                                            footerTags[tag].map((data) => {
                                                return (
                                                    <a className='text-white text-lg' key={data.name} href={data.path}>{data.name}</a>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <p className='text-base text-[#9F9F9F] text-center pt-28 pb-3'>Copyright @ Intelops - {year.getFullYear()}</p>
                </div>
            </div>
        </div>
    )
}
