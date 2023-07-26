// Main Header of Every page
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react';
import SocialMediaAuth from '../modal/SocialMediaAuth';

const Headermenus = {
    "menus": {
        "Home": [{
            name: "Home",
            path: "#"
        }],
        "Platform": [
            { name: "Capten", path: "#" },
            { name: "Compage", path: "#" },
            { name: "Quiality Trace", path: "#" },
            { name: "Opty", path: "#" },
            { name: "Tarian", path: "#" }

        ],
        "Learning Center": "Learning Center",
        "Open Source": [
            { name: "Compage", path: "#" },
        ],
        "Services": [{ name: "Services", path: "#" }],
        "Resources": [
            { name: "Capten", path: "#" },
        ],
        "Blogs": "Blogs",
    }
}
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [openLoginModel, setLoginOpenModel] = useState(false);
    const { data, status } = useSession();
    
    useEffect(() => {
        if(openLoginModel){
      
            setLoginOpenModel(false)
      
          }else{
            setLoginOpenModel(true)
          }

        // console.log(data,"datadatadatadata",status);
        // if(data!==undefined){
        //     fetch('`${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}`/api/users?email='+data?.user.email).then((res)=>res.json()).then((userdata)=>{
        //         console.log(userdata,"userdatauserdatauserdata");
        //     })
        // }else{
        //     console.log(data?.user,"datatatat");
        // }
    
        const handleScroll = event => {
            setScrollTop(window.scrollY);
            // console.log(typeof scrollTop, 'scrollTopscrollTop', scrollTop);
        };
        if (scrollTop >= 144) {
            console.log(true, scrollTop);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    const GooglesignOut=()=>{        
        if(openLoginModel){
            setLoginOpenModel(false)
        }else{
            setLoginOpenModel(true)
            // signOut()    
        }                
    }
    return (
        <div>
            {openLoginModel?<div className={`max-h-screen 
 absolute flex justify-center items-center transition-all duration-500 ${
            openLoginModel ? "opacity-100" : "opacity-0"
          }`}>
            <SocialMediaAuth handleOpen={setLoginOpenModel} openLoginModel={openLoginModel}/>
          
        </div>:<div>
          ''
          </div>}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 fixed inset-0 h-20 z-10 bg-white flex flex-col justify-center">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex-shrink-0 flex items-center gap-24">
                            <Link href='/'>
                            <img
                                className="h-10 w-30 bg-white"
                                src="/Component.svg"
                                alt="Workflow"
                            />
                            </Link>
                            {
                                scrollTop >= 1 ? <div className="hidden md:flex gap-4">
                                    <a href='/service' className="">Services</a>
                                    <Link href='/menus/provide-requirements'>Provide-Requirements</Link>                                    
                                    <Link href='/talk2us'>Talk2Us</Link>
                                    <Link href='/questions'>Questions</Link>
                                </div> : ""
                            }
                        </div>

                        {scrollTop <= 1 ? <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {
                                    Object.keys(Headermenus).map((menu) => {
                                        return (
                                            <div className='flex text-[#7D8695] '>
                                                {Object.keys(Headermenus[menu]).map((item) => {
                                                    return (<div>
                                                        {Object.keys(Headermenus[menu][item]).length > 1 ?
                                                            <div className=''>
                                                                <div className='p-3 flex' id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover">{item} <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>

                                                                </div>
                                                                <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                    <ul className="absolute hidden text-gray-700 pt-1 group-hover:block">
                                                                        <li className="">
                                                                            <a
                                                                                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                                                                href="#"
                                                                            >One</a
                                                                            >
                                                                        </li>
                                                                        <li className="">
                                                                            <a
                                                                                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                                                                href="#"
                                                                            >Two</a
                                                                            >
                                                                        </li>
                                                                        <li className="">
                                                                            <a
                                                                                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                                                                                href="#"
                                                                            >Three is the magic number</a
                                                                            >
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div> :
                                                            <div>
                                                                <div className='p-3'>{item}</div>
                                                            </div>}

                                                    </div>
                                                    )
                                                })}
                                            </div>
                                        )

                                    })
                                }
                                <img src="awesome-user-login.svg" />
                                {status=="authenticated"?
                                <div>{data.user.name}
                                <button onClick={GooglesignOut} className="rounded-full bg-[#F88136] border-1 px-6 py-2">Sign Out</button>    
                                
                                </div>
                                :
                                <div>
                                <a
                                    href="login"
                                    className=" hover:bg-gray-700 text-black px-3 py-2 rounded-md text-sm font-medium p-14 font-bold"
                                >
                                    Login In
                                </a>
                                <button className="rounded-full bg-[#F88136] border-1 px-6 py-2">Sign Up Now</button>    
                                    </div>}
                                

                            </div>

                        </div> : ""
                        }
                        {/* {scrollTop >= 1 ? <nav className="second-header-parent">
                                    <a href='/services' className="second-header-links">Services</a>
                                    <a href='/provide-requirements' className="second-header-links">Provide-Requirements</a>
                                    <a href='/talk2us' className="second-header-links">Talk2Us</a>
                                </nav> : ''} */}

                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >

                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
