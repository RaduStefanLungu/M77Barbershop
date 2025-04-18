
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import emailjs from '@emailjs/browser';

import DATA from '../data/data.json'
import SERVICES from '../data/services.json'

import Logo from '../resources/LOGO-BARBER.jpg'
import AboutPhoto from '../resources/man-haircut-modified.png'

import { SlMustache } from "react-icons/sl";
import { GoDot } from "react-icons/go";
import { GiComb,GiBeard,GiRazor } from "react-icons/gi";
import { CiGift } from "react-icons/ci";
import { HiOutlinePhone } from "react-icons/hi";
import { MdOutlineMailOutline } from "react-icons/md";

import { SiStylelint } from "react-icons/si";
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { GiMustache } from "react-icons/gi";
import { PiMaskHappyLight } from "react-icons/pi";

import GALLERY_IMAGE_1 from '../resources/gallery/image_1.JPG'
import GALLERY_IMAGE_2 from '../resources/gallery/image_2.jpg'
import GALLERY_IMAGE_3 from '../resources/gallery/image_3.jpg'
import GALLERY_IMAGE_4 from '../resources/handsome-man-barbershop-shaving-beard.jpg'
import GALLERY_IMAGE_5 from '../resources/hairdresser-cutting-man-s-hair-barber-shop.jpg'

import GALLERY_IMAGE_10 from '../resources/gallery/image00001.jpeg'
import GALLERY_IMAGE_11 from '../resources/gallery/image00002.jpeg'
import GALLERY_IMAGE_12 from '../resources/gallery/image00003.jpeg'
import GALLERY_IMAGE_13 from '../resources/gallery/image00004.jpeg'
import GALLERY_IMAGE_14 from '../resources/gallery/image00005.jpeg'
import GALLERY_IMAGE_15 from '../resources/gallery/image00006.jpeg'
import GALLERY_IMAGE_16 from '../resources/gallery/image00007.jpeg'
import GALLERY_IMAGE_17 from '../resources/gallery/image00008.jpeg'







export default function HomePage() {
  return (
    <div className='bg-[var(--colorTemplate2)]'>

      <div className='hero-bg '>
        <Hero></Hero>   
        {/* <div className='text-end px-10 text-white/70 text-xs'>
          <a href="https://www.freepik.com/free-photo/vintage-frame-salon-tools-wooden-table-jobs-career-concept_18836292.htm" target='_blank' rel='noreferrer'>Image by rawpixel.com</a> on Freepik   
        </div> */}
      </div>

      <div>
        <CardBelt/>
      </div>

      <div>
        <AboutUs></AboutUs>
      </div>

      <div>
        <Services></Services>
      </div>

      <div>
        <Gallery/>
      </div>

      <div>
        <Contact></Contact>
      </div>

    </div>
  )
}


const Hero = () => {
  return(
    <div className='text-white px-3 pt-10 pb-20 md:px-5 md:pt-20 md:pb-32 lg:px-24 xl:px-32'>
      <div className='grid justify-center'>
        <img src={Logo} alt='' className='rounded-lg w-[150px] md:w-[250px]'/>
      </div>
      <div className='pt-10'>
        <h1 className='text-center py-2 md:py-6 text-title text-4xl md:text-6xl lg:text-8xl uppercase'>une expérience barber unique</h1>
        
        <p className='pb-10 text-center md:text-2xl lg:text-3xl text-para'>
          {/* Eu, in in pharetra mauris mi pretium magnis nullam et consequat vel ina sit ut pharetra
          ultrices feugiat etol quam luctus in dictum placerat malesuada sollicitudin eu vel diam. */}
          Venir chez M77 ce n’est pas seulement aller chez un coiffeur, c’est avant tout être dans un environnement sain, jeune, dynamique et surtout familial
        </p>
      
      </div>
      <div className='grid gap-5 py-10 md:grid-flow-col md:justify-center'>
        <Link className="button-filled uppercase" to={'/rendez-vous'} > Réservez Maintenant </Link>
        <a className="button-transparent-white uppercase" href='#services' > Nos Services </a>
      </div>
    </div>
  )
}

const CardBelt = () => {

  const Card = ({Icon,Title,Text}) => {
    return(
      <div className='max-w-[350px]'>
        <div className=' grid bg-[var(--colorHightlight)] py-10 gap-5 h-[500px] md:h-[550px]'>
          <div className='bg-[var(--colorHightlight-dark)] m-auto text-5xl p-5 shadow-md shadow-[var(--colorTemplate2)] md:text-6xl lg:text-7xl '> 
            {Icon}
          </div>

          <div className='text-center '>
            <h2 className='py-2 text-2xl text-center font-barlow font-bold tracking-normal md:text-4xl'>{Title}</h2>
            <p className='text-para py-2 mx-10 md:text-xl'>{Text}</p>
          </div>

        </div>
      </div>
    )
  }

  return(
    <div className='text-white container mx-auto py-10'>
      <div className='mx-10'>
        <h1 className='pb-3 text-md uppercase text-center font-barlow font-bold tracking-widest md:text-xl lg:text-2xl '>Services Professionels</h1>
        <h2 className='text-3xl uppercase text-center font-barlow font-bold tracking-normal md:text-5xl lg:text-6xl'> Les meilleurs services qu'on vous offre </h2>
      </div>

      <div className='mx-10 grid gap-10 justify-center py-10 xl:grid-flow-col'>
        <Card Icon={<SiStylelint/>} Title={"Coupes Modernes et Tendances"} 
          Text={"Découvrez les dernières tendances en matière de coupes de cheveux modernes dans notre salon. Nous sommes là pour vous aider à trouver le look parfait qui reflète votre personnalité et votre style de vie."}/>
        <Card Icon={<MdOutlineFaceRetouchingNatural/>} Title={"Rasages Impeccables"} 
          Text={"Pour une apparence soignée et professionnelle, optez pour nos rasages impeccables. Nos experts vous offriront un rasage précis et confortable, laissant votre peau lisse et rafraîchie."}/>
        <Card Icon={<PiMaskHappyLight/>} Title={"Satisfaction Client Garantie"} 
          Text={"Rejoignez notre communauté de clients satisfaits et découvrez pourquoi nous sommes le choix numéro un pour une expérience de coiffure exceptionnelle. Chez M77 Barber, votre satisfaction est notre priorité. "}/>
      
      </div>

    </div>
  )
}

const AboutUs = () => {
  return(
    <div id='a-propos' className='bg-[var(--colorTemplate1)] grid lg:grid-flow-col lg:gap-10 py-10 px-5 md:py-20 md:px-16'>

      <div className='relative grid'>
        <img alt='' src={AboutPhoto} className='hidden xl:block my-auto min-w-[300px]' />
        {/* <a href='/' target='_blank' rel='noreferrer' className='absolute bottom-[21%] right-0 text-end text-white text-xs'>Image by Freepik</a> */}
      </div>

      <div className='grid gap-5'>

        <div className='grid'>
          <div className=''>
            <h2 className='text-title uppercase text-3xl py-1 md:py-3 md:text-5xl lg:text-7xl '> A votre service depuis 2021 ! </h2>
            <p className='text-para text-lg md:text-xl lg:text-2xl 2xl:text-3xl'>
              {DATA.description_1} <br/><br/>
              {DATA.description_3}
            </p>
          </div>
        
          <div className='flex gap-5 md:gap-24 py-10 mx-auto md:px-10'>
            
            <div className='uppercase text-title' >
              <span className='text-[var(--colorHightlight-dark)] text-6xl '>+</span>
              <span className='text-6xl '> 215</span> 
              <br/><span className='text-3xl lg:text-4xl'>clients fidèles</span>
            </div>

            <div className='uppercase text-title' >
              <span className='text-6xl '> 99</span> 
              <span className='text-[var(--colorHightlight-dark)] text-6xl '>%</span>
              <br/><span className='text-3xl lg:text-4xl'> Clients Satisfaits </span>
            </div>

          </div>

        </div>
        
        <div className='relative'>
          <img alt='' src={AboutPhoto} className='xl:hidden md:w-[650px] lg:w-[800px] mx-auto' />
          {/* <a href='/' target='_blank' rel='noreferrer' className='absolute bottom-0 right-0 lg:right-10 text-end text-white text-xs'>Image by Freepik</a> */}
        </div>

        

      </div>

      

    </div>
  )
}

const Services = () => {

  const SectionWithServices = ({Section,Services,Icon}) => {

    return(
      <div id='section' className='font-open-sans'>

        <div className='flex'>
          {Icon}
          <h2 className='text-3xl font-bold text-[var(--colorHightlight)] py-5 lg:text-5xl'>{Section}</h2>
        </div>
        
        <div id='section_holder' className='grid gap-5'>

          {
            Services.map((value,key) => {
              return(
                <div key={key} id={`service_${key}`} className='grid grid-flow-col'>
                  <div>
                    <h3 className='text-lg uppercase tracking-wider lg:text-xl'>{value.name}</h3>
                    <p className='uppercase text-sm tracking-wider lg:text-lg'>{value.description.length > 0 ? `(${value.description})` : ""}</p>
                  </div>
                  <p className=' text-center my-auto ml-auto px-5 lg:text-2xl'>
                    {value.price}€
                  </p>
                </div>
              )
            })
          }

        </div>

      </div>
    )
  }

  return(
    <div id='services' className='text-white pt-5 pb-10'>

      <div id='title' className='grid grid-flow-col'>
        <div className='border-y-[0.10rem] border-[var(--colorTemplate1)] my-auto pl-20'></div>
        <div className='grid grid-flow-col justify-center'>
          <GoDot className='my-auto text-3xl md:text-5xl'/>
          <h2 className='py-2 md:py-6 text-title text-4xl md:text-6xl lg:text-8xl '>
            Nos Services
          </h2>
          <GoDot className='my-auto text-3xl md:text-5xl '/>
        </div>
        <div className='border-y-[0.10rem] border-[var(--colorTemplate1)] my-auto pr-20'></div>
      </div>



      <div id='holder' className='grid px-5 md:px-20 max-w-[750px] mx-auto'>


        {SERVICES.services_by_group.map((element,key) => {
          return(
            <SectionWithServices key={key} Section={element.group} Services={element.services} Icon={element.group.toUpperCase() === 'BARBE'? <GiBeard className='my-auto mr-2 text-3xl'/> : <GiComb className='my-auto mr-2 text-3xl'/> }/>
          )
        })}

        <div id='packages' className='font-open-sans'>

          <div className='flex'>
            <CiGift className='my-auto mr-2 text-3xl'/>
            <h2 className='text-3xl font-bold text-[var(--colorHightlight)] py-5 lg:text-5xl'>Packages</h2>
          </div>
          
          <div id='section_holder' className='grid gap-5'>

            {
              SERVICES.packages.map((value,key) => {
                return(
                  <div key={key} id={`service_${key}`} className='grid grid-flow-col'>
                    <div>
                      <h3 className='text-lg uppercase tracking-wider lg:text-xl'>{value.name}</h3>
                    </div>
                    <p className=' text-center my-auto ml-auto px-5 lg:text-2xl'>
                      {value.price}€
                    </p>
                  </div>
                )
              })
            }

          </div>

        </div>

      </div>


      <div className='grid my-10 '>
        <Link className="button-transparent-white uppercase mx-auto" to={'/rendez-vous'} > Prendre Rendez-vous </Link>
      </div>

    </div>
  )
}


const Gallery = () => {
  return(
    <div className='bg-[var(--colorTemplate1)] flex flex-col'>

      <h2 id='galerie' className='mx-2 pt-10 text-title uppercase text-4xl md:px-16 md:text-5xl lg:text-7xl'>Galerie</h2>

      <div className='flex flex-col gap-10 2xl:hidden py-10 lg:py-20'>
        <div className='flex flex-col justify-center gap-10 mx-auto md:flex-row md:gap-5 '>
          <div className='relative max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black '>
            <img alt='' src={GALLERY_IMAGE_10} className='' />
            {/* <a className='absolute top-0 right-2 text-end text-white text-xs' href='https://www.freepik.com/' target='_blank' rel='noreferrer'>Image from Freepik</a> */}
          </div>
          <img alt='' src={GALLERY_IMAGE_11} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black ' />
        </div>

        <div className='relative max-w-[400px] mx-2 md:px-0 md:mx-auto shadow-md shadow-black'>
          <img alt='' src={GALLERY_IMAGE_2} className='' />
          {/* <a className='absolute top-0 md:left-[5%] lg:left-[17%] text-end text-white text-xs' href='https://www.freepik.com/' target='_blank' rel='noreferrer'>Image by senivpetro - Freepik.com</a> */}
        </div>

        <div className='flex flex-col justify-center gap-10 mx-auto md:flex-row md:gap-5 '>
          <img alt='' src={GALLERY_IMAGE_12} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
          <img alt='' src={GALLERY_IMAGE_14} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
        </div>

        <div className='flex flex-col justify-center gap-10 mx-auto md:flex-row md:gap-5 '>
          <img alt='' src={GALLERY_IMAGE_15} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
          <img alt='' src={GALLERY_IMAGE_17} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
        </div>
        
        <div className='flex flex-col justify-center gap-10 mx-auto md:flex-row md:gap-5 '>
          <img alt='' src={GALLERY_IMAGE_3} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
          <img alt='' src={GALLERY_IMAGE_1} className='max-w-screen mx-2 md:max-w-[350px] shadow-md shadow-black' />
        </div>

      </div>

      {/* <div className='hidden flex-col gap-10 xl:hidden'>
        <div className='flex flex-col justify-center gap-10  md:flex-row md:gap-5 '>
          <div className='relative'>
            <img alt='' src={GALLERY_IMAGE_5} className='max-w-[350px] xl:max-w-[250px] ' />
            <a className='absolute top-0 right-2 text-end text-red-500 text-xs' href='https://www.freepik.com/' target='_blank' rel='noreferrer'>Image from Freepik</a>
          </div>
          <img alt='' src={GALLERY_IMAGE_4} className='max-w-[700px] px-10 md:px-0 md:mx-auto xl:mx-0' />
          <img alt='' src={GALLERY_IMAGE_2} className='max-w-[350px] xl:max-w-[250px] ' />
        </div>
        
        
        <div className='flex flex-col justify-center gap-10  md:flex-row md:gap-5 '>
          <img alt='' src={GALLERY_IMAGE_3} className='max-w-[350px]' />
          <img alt='' src={GALLERY_IMAGE_1} className='max-w-[350px]' />
        </div>

      </div> */}

      <div className='hidden flex-col 2xl:flex py-20'>
        <div className='grid  justify-center md:flex-row md:gap-5 '>
          
          {/* <div className='relative'>
            <img alt='' src={GALLERY_IMAGE_4} className='max-w-[700px] px-10 md:px-0 md:mx-auto 2xl:mx-5 2xl:max-w-[600px] 2xl:h-[450px] shadow-md shadow-black' />
            <a className='absolute bottom-0 right-7  text-end text-white/70 text-xs' href='https://www.freepik.com/' target='_blank' rel='noreferrer'>Image by senivpetro - Freepik.com</a>
          </div> */}

          <div className=' h-[500px] self-center flex gap-20 mr-20'>
            <div className='relative 2xl:w-[300px]'>
              <img alt='' src={GALLERY_IMAGE_10} className='max-w-[350px] 2xl:h-[450px] absolute top-0 left-7 z-40 shadow-md shadow-black' />
              <img alt='' src={GALLERY_IMAGE_11} className='max-w-[350px] 2xl:h-[450px] absolute top-0 left-5 z-30 shadow-md shadow-black rotate-12 hover:z-50 hover:shadow-transparent transition-all duration-300'/>
            </div>
            
            <div className='relative 2xl:w-[300px]'>
              <img alt='' src={GALLERY_IMAGE_13} className='max-w-[350px] 2xl:h-[450px] absolute top-0 left-7 z-40 shadow-md shadow-black' />
              <img alt='' src={GALLERY_IMAGE_12} className='max-w-[350px] 2xl:h-[450px] absolute top-0 left-5 z-30 shadow-md shadow-black rotate-12 hover:z-50 hover:shadow-transparent transition-all duration-300'/>
            </div>
          </div>

          {/* <img alt='' src={GALLERY_IMAGE_3} className='mr-5 max-w-[350px] 2xl:max-w-[250px] 2xl:h-[450px] shadow-md shadow-black hover:shadow-transparent transition-all duration-300'/> */}

          <div className=' h-[500px] self-center flex gap-20'>
            <div className='relative 2xl:w-[300px]'>
              <img alt='' src={GALLERY_IMAGE_17} className='max-w-[350px]  2xl:h-[450px] absolute top-0 left-7 z-40 shadow-md shadow-black' />
              <img alt='' src={GALLERY_IMAGE_15} className='max-w-[350px]  2xl:h-[450px] absolute top-0 left-5 z-30 shadow-md shadow-black rotate-12 hover:z-50 hover:shadow-transparent transition-all duration-300'/>
            </div>
            
            <div className='relative 2xl:w-[300px]'>
              <img alt='' src={GALLERY_IMAGE_1} className='max-w-[350px]  2xl:h-[450px] absolute top-0 left-7 z-40 shadow-md shadow-black' />
              <img alt='' src={GALLERY_IMAGE_2} className='max-w-[350px]  2xl:h-[450px] absolute top-0 left-5 z-30 shadow-md shadow-black rotate-12 hover:z-50 hover:shadow-transparent transition-all duration-300'/>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}


const Contact = () => {
  
  const [userName,setUserName] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userPhone,setUserPhone] = useState("")
  const [userMessage,setUserMessage] = useState("")

  const contactFormRef = useRef()

  const [successMessage,setSuccessMessage] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, "template_hivji9c", contactFormRef.current, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((result) => {
                setSuccessMessage("Votre email a bien été envoyé !")
                // Add any success message or logic here
            }, (error) => {
                console.error('Email sending failed:', error.text);
                // Add any error handling logic here
            });
  }

  return(
    <div id='contact' className='px-5 grid 2xl:grid-flow-col py-20 justify-center'>

      <div className='grid max-w-[1000px]'>
        <div className='text-white'>
          <div id='title' className=' flex'>
            <GiRazor className='my-auto mx-2 text-4xl md:text-6xl lg:text-8xl text-[var(--colorHightlight)]'/>
            <h2 className='py-2 md:py-6 text-title text-4xl md:text-6xl lg:text-8xl'>Contactez Nous</h2>
          </div>
          <p className='text-para py-2 md:text-2xl'>
          Si vous avez des questions, n'hésitez pas à nous contacter. 
          Notre équipe est là pour vous offrir une expérience exceptionnelle. 
          Vous pouvez remplir le formulaire, nous appeler ou nous envoyer un e-mail. 
          <br/><br/>À très bientôt,
          <br/>M77
          </p>
        </div>

        <div id='phone&email' className='grid gap-5 py-10 px-5 md:justify-start lg:grid-flow-col lg:justify-center'>

          <div className='grid grid-flow-col gap-5'>
            <div className='hidden sm:grid p-3 bg-gray-600/20 mx-auto'>
              <HiOutlinePhone className='text-white text-5xl self-center'/>
            </div>
            <div>
              <h3 className='uppercase text-lg md:text-xl  text-gray-600/80 font-open-sans font-medium'>Appelez nous maintenant </h3>
              <h3 className='uppercase text-lg md:text-xl  text-white font-barlow font-medium tracking-widest'>{DATA.phone_number}</h3>
            </div>
          </div>

          <div className='grid grid-flow-col gap-5'>
            <div className='hidden sm:grid p-3 bg-gray-600/20 mx-auto'>
              <MdOutlineMailOutline className='text-white text-5xl self-center'/>
            </div>
            <div>
              <h3 className='uppercase text-lg md:text-xl  text-gray-600/80 font-open-sans font-medium'>Envoyez nous un email </h3>
              <h3 className='uppercase text-md md:text-xl  text-white font-barlow font-medium tracking-widest'>{DATA.email}</h3>
            </div>
          </div>

        </div>
      </div>

      <form ref={contactFormRef} onSubmit={handleSubmit} className='grid 2xl:min-w-[550px] py-5'>

        <div className='grid px-10 gap-5'>
          <input id='user_name' name='user_name' onChange={(e)=>setUserName(e.target.value)} type='text' required placeholder='Nom et Prénom' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          <input id='user_email' name='user_email' onChange={(e)=>setUserEmail(e.target.value)} type='email' required placeholder='example@email.com' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          <input id='user_phone' name='user_phone' onChange={(e)=>setUserPhone(e.target.value)} type='tel' pattern="[0-9]+" required placeholder='GSM' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          
          <textarea id='user_message' name='user_message' onChange={(e)=>setUserMessage(e.target.value)} required placeholder='Veuillez écrire votre message ici...' className='h-[100px] md:text-2xl text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 border-b-[0.15rem] border-white/50'/>
        </div>


        <p className='text-center text-green-500 bg-white my-2 md:mx-auto md:px-5'>{successMessage}</p>
        <div className='grid my-auto mx-10 pt-10'>
          <button type='submit' className='button-filled uppercase '>Envoyer</button>
        </div>

      </form>

    </div>
  )
}