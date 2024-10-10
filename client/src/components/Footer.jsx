import React from 'react'

import LOGO from '../resources/LOGO-BARBER.jpg'

import DATA from '../data/data.json'

import { FaInstagram,FaFacebook  } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className='text-white bg-black grid'>        
        <div className='pt-10 flex flex-col lg:flex-row justify-between xl:mx-auto xl:gap-32'>

          <div className='hidden lg:block lg:ml-10 my-auto mr-auto'>
            <img alt='' src={LOGO} className='w-[150px] lg:w-[250px]'/>
          </div>

          <div className='grid gap-2 px-1 lg:mr-10'>

            <div id='social media' className='grid px-10 pb-5 border-b-[0.15rem] border-white'>
              <h3 className='text-center text-lg'>Suivez-nous sur : </h3>
              <div className='flex justify-between px-5 py-2 md:w-[250px] md:mx-auto'>
                <a href={DATA.instagram_url}><FaInstagram className='text-5xl'/></a>
                <a href={DATA.facebook_url}><FaFacebook className='text-5xl'/></a>
              </div>
            </div>
            
            <div className='grid md:flex gap-5 py-5 md:mx-auto'>

              <div id='adresse' className='grid'>
                <label className='font-bold py-1'>Adresse : {DATA.street_address} {DATA.street_number}, {DATA.postal_code} {DATA.city}</label>
              </div>

              <div id='horaire' className='grid'>
                <label className='font-bold py-1'>Horaire</label>
                <div className='grid'>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Lundi : </label>
                    <label className='text-red-500'> Fermé</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Mardi : </label>
                    <label className='text-green-200'>9:00 - 18:00</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Mercredi : </label>
                    <label className='text-green-200'>9:00 - 21:00</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Jeudi : </label>
                    <label className='text-green-200'>9:00 - 18:00</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Vendredi : </label>
                    <label className='text-green-200'>9:00 - 21:00</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Samedi : </label>
                    <label className='text-green-200'>9:00 - 18:00</label>
                  </div>
                  <div className='grid grid-cols-2 gap-5'>
                    <label className='ml-auto'>Dimanche : </label>
                    <label className='text-red-500'> Fermé</label>
                  </div>
                </div>
              </div>

              <div id='lien rapids' className='grid self-start'>
                <label className='py-1 font-bold'>Liens Rapides </label>
                <ul className='px-5 grid grid-cols-2 gap-2'>
                  <li><a href='/' className='px-2 py-1 text-blue-500 underline'>- Accueil</a></li>
                  <li><a href='/#a-propos' className='px-2 py-1 text-blue-500 underline'>- A propos</a></li>
                  <li><a href='/#services' className='px-2 py-1 text-blue-500 underline'>- Services</a></li>
                  <li><a href='/#galerie' className='px-2 py-1 text-blue-500 underline'>- Galerie</a></li>
                  <li><a href='/#contact' className='px-2 py-1 text-blue-500 underline'>- Contact</a></li>
                  <li><a href='/rendez-vous' className='px-2 py-1 text-blue-500 underline'>- Rendez-Vous</a></li>
                  <li><a href='/admin/login' className='px-2 py-1 text-blue-500 underline'>- Admin</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className='py-5'>
          <p className='text-center my-auto'>Copyright © 2024 M77 Barber. Tous droits réservés.</p>
          <p className='text-center my-auto pt-2'>Powered by <a href='https://www.prowebsolutions.online/#/fr/home' className='text-blue-500 underline'>Pro Web Solutions</a></p>
        </div>

    </footer>
  )
}
