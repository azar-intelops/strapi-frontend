// This is a React functional component named "ServiceLayout" that displays a layout for a service.
import React, { useEffect, useState } from "react";

export default function ServiceLayout({ data, categoty_name,children }) {  
  return (
    <>
    <div className="h-1/2 w-full border-2 p-10 overflow-auto">
              
                {children}                            
    </div>
    </>
  );
}
// Overall, this component is a basic layout component that renders a div element with a border and overflow styles.
