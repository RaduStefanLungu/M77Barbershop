import React, { useRef } from 'react'

import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth()

    const redirect = useNavigate();
  
    async function handleLogin(e){
        e.preventDefault()
        
        const result = await login(emailRef.current.value, passwordRef.current.value)
        redirect('/admin/rendez-vous')
    }
  
    return (
        <div className='grid justify-center'>


            <form onSubmit={handleLogin} className='grid py-10'>

                <div className='grid gap-2 justify-center'>
                    <input required ref={emailRef} type='email' placeholder='Email' className='border-[0.10rem] border-blue-500 rounded-xl px-2 focus:border-blue-900 focus:outline-none'/>
                    <input required ref={passwordRef} type='password' placeholder='Password' className='border-[0.10rem] border-blue-500 rounded-xl px-2 focus:border-blue-900 focus:outline-none' />
                </div>

                <button className='bg-blue-500 text-white py-2 px-10 rounded-xl mx-auto my-5 hover:bg-blue-900 transition-all duration-150'>Connection</button>

            </form>


        </div>
    )
}
