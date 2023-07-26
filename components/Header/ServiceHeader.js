// Service header Component included in service.js
import React, { useEffect, useState } from 'react'
import UserRequireModal from '../modal/UserRequireModal'


export default function ServiceHeader() {
    // State to manage whether the UserRequireModal should be shown or not
    const [showUserReqModal,setShowUserReqModal]=useState(false)
    
      // Function to handle the user requirement submission
    const handleRequirement=()=>{
        setShowUserReqModal(true)
    }
    
  return (
    <div className='flex px-28 justify-between items-center'>
       <div className='flex'>
        <img src='/LottieLego.gif'/>
        <img src='/Polite_Chicky.gif'/>
        </div>
        <div className=''>
            {showUserReqModal ?
                    <div className={`max-h-screen bg-cyan-300 absolute inset-0 transition-all duration-500 ${showUserReqModal ? "opacity-100" : "opacity-0"}`}>
                        <UserRequireModal handleModal={setShowUserReqModal} modalStatus={showUserReqModal} />
                    </div> : ""}                                                      
            <button type="button" className="rounded-full bg-cyan-300 boarder-1 px-12 py-2" onClick={handleRequirement} >Submit</button>
        
       </div>        
    </div>
  )
}
