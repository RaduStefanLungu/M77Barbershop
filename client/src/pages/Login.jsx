import React, { useRef } from 'react'

import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

import LOGO from '../resources/LOGO-BARBER.jpg'

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
        <div className='grid justify-center content-start min-h-screen hero-bg'>

            <img alt='' src={LOGO} className='max-w-[250px] my-5 mx-auto'/>

            <form onSubmit={handleLogin} className='grid py-10 bg-[var(--colorHightlight-transparent-50)] px-2 rounded-lg'>

                <label className='text-[var(--colorTemplate1)] text-3xl pb-5 mx-auto lg:text-5xl'>Connexion Admin</label>

                <div className='grid gap-2 justify-center'>
                    <input required ref={emailRef} type='email' placeholder='Email' className='border-[0.10rem] border-[var(--colorTemplate2)] rounded-xl px-2 lg:px-5 focus:border-[var(--colorHighlight-dark)] focus:outline-none'/>
                    <input required ref={passwordRef} type='password' placeholder='Password' className='border-[0.10rem] border-[var(--colorTemplate2)] rounded-xl px-2 lg:px-5 focus:border-[var(--colorHighlight-dark)] focus:outline-none' />
                </div>

                <button className='bg-[var(--colorTemplate2)] text-white py-2 px-10 rounded-xl mx-auto my-5 hover:bg-[var(--colorHighlight-dark)] transition-all duration-150 lg:text-2xl'>Se connecter</button>

            </form>


        </div>
    )
}
