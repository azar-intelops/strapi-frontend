// This is a React component called MainNavbar.

import React, { useState, useEffect } from "react";

import { Transition } from "@headlessui/react";
export default function MainNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  // State variable to keep track of the scroll position
  const [scrollTop, setScrollTop] = useState(0);

  // Effect hook to handle scroll events
  useEffect(() => {
      // Function to handle scroll events
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
          // Update the scrollTop state with the current scroll position
      console.log(typeof scrollTop, "scrollTopscrollTop", scrollTop);
    };
    // Check if scrollTop is greater than or equal to 144
    if (scrollTop >= 144) {
      console.log(true, scrollTop);
    }
      // Add the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);
      // Clean up by removing the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header className="">
        <div className="max-w-screen items-center bg-[url('/intelops.svg')] bg-center bg-no-repeat bg-cover flex space-between py-12">
          <div className="flex-1 max-w-[50vw] text-xl space-y-8 px-20">
            <div>
              <h3 className="text-white text-2xl font-bold">We Are IntelOps</h3>
            </div>
            <div>
              <h1 className="text-5xl text-white font-bold">
                Lorem ipsum dolor sit amet, consetetur sadipscing.
              </h1>
            </div>
            <div className="text-white">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat
            </div>
            <div className="flex gap-6">
              <button className="rounded-full bg-black text-white px-12 py-2">
                Get Started Now
              </button>
              <button className="flex items-center border-2 rounded-full border-white py-2 gap-4 pr-10">
                <img className="px-2" src="/playbutton.svg" />
                <span className="text-center text-white font-bold">
                  Watch Demo
                </span>
              </button>
            </div>
          </div>
          <div className="flex-1">
            <img src="/compage-banner-image.svg" />
          </div>
        </div>        
      </header>
    </div>
  );
}
// Overall, this code defines a MainNavbar component that renders a header section with a responsive layout. It also includes a scroll event listener that updates the scrollTop state variable when the user scrolls the page. The component uses various CSS classes to style its elements and displays text and buttons with different styles.