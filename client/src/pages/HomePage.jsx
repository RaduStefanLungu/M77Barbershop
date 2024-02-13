
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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




// TODO : add gallery,


export default function HomePage() {
  return (
    <div className='bg-[var(--colorTemplate2)]'>

      <div className='hero-bg '>
        <Hero></Hero>        
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
        <a className="button-transparent-white uppercase" href='#Services' > Nos Services </a>
      </div>
    </div>
  )
}

const CardBelt = () => {

  const Card = ({Icon,Title,Text}) => {
    return(
      <div className='max-w-[350px]'>
        <div className=' grid bg-[var(--colorHightlight)] py-10 gap-5 h-[500px]'>
          <div className='bg-[var(--colorHightlight-dark)] m-auto text-5xl p-5 shadow-md shadow-[var(--colorTemplate2)] '> 
            {Icon}
          </div>

          <div className='text-center '>
            <h2 className='py-2 text-2xl text-center font-barlow font-bold tracking-normal'>{Title}</h2>
            <p className='text-para py-2 mx-10'>{Text}</p>
          </div>

        </div>
      </div>
    )
  }

  return(
    <div className='text-white container mx-auto py-10'>
      <div className='mx-10'>
        <h1 className='text-md uppercase text-center font-barlow font-bold tracking-widest '>Services Professionels</h1>
        <h2 className='text-3xl uppercase text-center font-barlow font-bold tracking-normal '> Les meilleurs services qu'on vous offre </h2>
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
    <div className='bg-[var(--colorTemplate1)] grid lg:grid-flow-col lg:gap-10 py-10 px-5 md:py-20 md:px-16'>

      <img alt='' src={AboutPhoto} className='hidden xl:block my-auto min-w-[300px]' />

      <div className='grid gap-5'>

        <div className='grid'>
          <div className=''>
            <h2 className='text-title uppercase text-3xl py-1 md:py-3 md:text-5xl lg:text-7xl '> A votre service depuis 2021 ! </h2>
            <p className='text-para text-lg md:text-xl lg:text-2xl'>
              {DATA.description_1} <br/><br/>
              {DATA.description_3}
            </p>
          </div>
        
          <div className='flex gap-5 md:gap-24 py-10 mx-auto md:px-10'>
            
            <div className='uppercase text-title' >
              <span className='text-[var(--colorHightlight-dark)] text-6xl '>+</span>
              <span className='text-6xl '> 100</span> 
              <br/><span className='text-3xl lg:text-4xl'>clients fidèles</span>
            </div>

            <div className='uppercase text-title' >
              <span className='text-6xl '> 99</span> 
              <span className='text-[var(--colorHightlight-dark)] text-6xl '>%</span>
              <br/><span className='text-3xl lg:text-4xl'> Clients Satisfaits </span>
            </div>

          </div>

        </div>
        
        <img alt='' src={AboutPhoto} className='xl:hidden md:w-[650px] lg:w-[800px] mx-auto' />

        

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
    <div id='Services' className='text-white pt-5 pb-10'>

      <div id='title' className='grid grid-flow-col'>
        <div className='border-y-[0.10rem] border-[var(--colorTemplate1)] my-auto pl-20'></div>
        <div className='grid grid-flow-col justify-center'>
          <GoDot className='my-auto text-3xl'/>
          <h2 className='py-2 md:py-6 text-title text-4xl md:text-6xl lg:text-8xl '>
            Nos Services
          </h2>
          <GoDot className='my-auto text-3xl'/>
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

const Contact = () => {
  
  const [userName,setUserName] = useState("")
  const [userEmail,setUserEmail] = useState("")
  const [userPhone,setUserPhone] = useState("")
  const [userMessage,setUserMessage] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    const myData = {
      user_name : userName,
      user_email : userEmail,
      user_phone : userPhone,
      user_message : userMessage
    }

    console.log(myData);
  }

  return(
    <div className='px-5 grid 2xl:grid-flow-col'>

      <div className='grid'>
        <div className='text-white'>
          <div id='title' className=' flex'>
            <GiRazor className='my-auto mx-2 text-4xl md:text-6xl lg:text-8xl text-[var(--colorHightlight)]'/>
            <h2 className='py-2 md:py-6 text-title text-4xl md:text-6xl lg:text-8xl'>Contactez Nous</h2>
          </div>
          <p className='text-para py-2 md:text-2xl'>
          Si vous avez des questions, n'hésitez pas à nous contacter. 
          Notre équipe est là pour vous offrir une expérience exceptionnelle. 
          Vous pouvez remplir le formulaire, nous appeler ou nous envoyer un e-mail. À très bientôt,
          <br/><br/>M77
          </p>
        </div>

        <div id='phone&email' className='grid gap-5 py-10 px-5 md:justify-start lg:grid-flow-col lg:'>

          <div className='grid grid-flow-col gap-5'>
            <div className='p-3 bg-gray-600/20 mx-auto grid'>
              <HiOutlinePhone className='text-white text-5xl self-center'/>
            </div>
            <div>
              <h3 className='uppercase text-lg md:text-xl  text-gray-600/80 font-open-sans font-medium'>Appelez nous maitenant </h3>
              <h3 className='uppercase text-lg md:text-xl  text-white font-barlow font-medium tracking-widest'>{DATA.phone_number}</h3>
            </div>
          </div>

          <div className='grid grid-flow-col gap-5'>
            <div className='p-3 bg-gray-600/20 mx-auto grid'>
              <MdOutlineMailOutline className='text-white text-5xl self-center'/>
            </div>
            <div>
              <h3 className='uppercase text-lg md:text-xl  text-gray-600/80 font-open-sans font-medium'>Envoyez nous un email </h3>
              <h3 className='uppercase text-md md:text-xl  text-white font-barlow font-medium tracking-widest'>{DATA.email}</h3>
            </div>
          </div>

        </div>
      </div>

      <form onSubmit={handleSubmit} className='grid 2xl:min-w-[550px] py-5'>

        <div className='grid px-10 gap-5'>
          <input id='user_full_name' onChange={(e)=>setUserName(e.target.value)} type='text' required placeholder='Nom et Prénom' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          <input id='user_email' onChange={(e)=>setUserEmail(e.target.value)} type='email' required placeholder='example@email.com' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          <input id='user_phone' onChange={(e)=>setUserPhone(e.target.value)} type='tel' pattern="[0-9]+" required placeholder='GSM' className='md:text-2xl  text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 placeholder:uppercase border-b-[0.15rem] border-white/50'/>
          
          <textarea id='user_message' onChange={(e)=>setUserMessage(e.target.value)} required placeholder='Veuillez écrire votre message ici...' className='h-[100px] md:text-2xl text-white font-barlow font-medium tracking-wider bg-transparent placeholder:px-2 border-b-[0.15rem] border-white/50'/>
        </div>

        <div className='grid my-auto mx-10 pt-10'>
          <button type='submit' className='button-filled uppercase '>Envoyer</button>
        </div>

      </form>

    </div>
  )
}