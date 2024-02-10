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

            <div className='px-5'>
                <BurgerMenu/>
            </div>

        </header>
  )
}
