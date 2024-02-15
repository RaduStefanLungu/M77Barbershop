import React, { useState } from 'react'
import Logo from '../resources/LOGO-BARBER.jpg'

import { TbRazorElectric } from "react-icons/tb";
import { BiCut } from "react-icons/bi";
import { GiRazor } from "react-icons/gi";
import { HiOutlineMenu,HiOutlineMenuAlt3  } from "react-icons/hi";


export default function Header() {

    const BurgerMenu = () => {
        const [clicked,setClicked] = useState(false)

        return(
            clicked?
            <HiOutlineMenuAlt3 className='text-[var(--colorHightlight)] text-4xl' onClick={()=>{setClicked(false)}}/> :
            <HiOutlineMenu className='text-[var(--colorHightlight)] text-4xl' onClick={()=>{setClicked(true)}}/>
        )
    }

    return (
        <header className='bg-[var(--colorTemplate2)] py-2 flex justify-between'>
            
            {/* <img alt='' src={Logo} className='w-[100px]'/> */}

            <div id='logo' className='flex px-2'>
                <GiRazor className='text-[var(--colorHightlight)] text-4xl my-auto -rotate-90'/>
                <h1 className='text-white tracking-wider font-baskerville font-bold text-3xl my-auto'>
                    M77 Barber
                </h1>
            </div>

            <div className='px-5 md:hidden'>
                <BurgerMenu/>
            </div>

            <div className='hidden md:grid grid-flow-col gap-5 px-5 text-[var(--colorTemplate1)]'>
                <a href='/' className='py-2 px-1 mt-auto font-barlow font-extrabold tracking-normal text-2xl 2xl:text-4xl text-[var(--colorHightlight)] hover:text-[var(--colorHightlight-dark)] transition-all duration-150'>Accueil</a>
                <a href='#a-propos' className='py-2 px-1 mt-auto font-barlow font-extrabold tracking-normal text-2xl 2xl:text-4xl hover:text-[var(--colorHightlight-dark)] transition-all duration-150'>A propos</a>
                <a href='#services' className='py-2 px-1 mt-auto font-barlow font-extrabold tracking-normal text-2xl 2xl:text-4xl hover:text-[var(--colorHightlight-dark)] transition-all duration-150'>Services</a>
                <a href='#contact' className='py-2 px-1 mt-auto font-barlow font-extrabold tracking-normal text-2xl 2xl:text-4xl hover:text-[var(--colorHightlight-dark)] transition-all duration-150'>Contact</a>
            </div>

        </header>
  )
}
