// This is Login page routes to (http://localhost:3000/login)
import { LoginForm } from '@/components/Form/LoginForm'
import Wrapper from '@/components/Main/Wrapper'
import React from 'react'

export default function login() {
  return (
    <Wrapper>  
        <div className='flex justify-center items-center min-h-screen'>
        <LoginForm/>
        </div>   
    </Wrapper>     
  )
}
