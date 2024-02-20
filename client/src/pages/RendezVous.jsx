import React, { useEffect, useRef, useState } from 'react'
import { addAppointment, getAppointmentDate, getTakenHoursOfDay, isDayLocked } from '../firebase'
import emailjs from '@emailjs/browser';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useNavigate } from 'react-router-dom';

import { GiComb,GiBeard } from "react-icons/gi";
import { CiGift } from "react-icons/ci";

import DATA from '../data/data.json'
import SERVICES from '../data/services.json'

// TODO make user to render appointment if it is available

export default function RendezVous() {
  return (
    <div className='min-h-screen hero-bg'>
      
      <div className='container mx-auto py-10 px-2'>

        <RdvForm/>

      </div>

    </div>
  )
}


const RdvForm = () => {

  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')
  const [selectedServices,setSelectedServices] = useState('')

  const [today,setToday] = useState(new Date().toISOString().split('T')[0])

  const [appointmentHours, setAppointmentHours] = useState([])      // contains : [hour,bool] where bool => is taken?

  const [lockedDay,setLockedDay] = useState(false) 

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const redirect = useNavigate()

  const rendezVousForm = useRef()

  // when date is set query from db all the free appointment spots

  async function handleDateChosen(e){
    e.preventDefault()

    // format
    let given_date = e.target.value
    let splitted_date = given_date.split('-')
    let formatted_date = splitted_date[2] + "_" + splitted_date[1] + "_" + splitted_date[0]

    // set formated date
    setDate(formatted_date)
    
    // user chosen day
    let chosen_day_of_week = getDayOfWeek(new Date(e.target.value)) 

    // get existing appointments in db
      // check if the day is locked
    const locked_day = await isDayLocked(formatted_date)
    setLockedDay(locked_day)

    let taken_hours = []

    if(locked_day === false) {
      taken_hours = await getTakenHoursOfDay(formatted_date)
    }

    // put all of them at IsTaken = false
    DATA.horaire.map(
      (value,key) =>{
        if(value.day === chosen_day_of_week){
          let formatted_list = []
          value.hours.map((hour,k) => {
            if(taken_hours.includes(hour)){
              formatted_list.push([hour,true])
            }
            else{
              formatted_list.push([hour,false])
            }
            
          })
          setAppointmentHours(formatted_list)
        }
      }
    )

  }

  const updateAppointmentHours = async (chosen_day) =>{

    const formatted_date = chosen_day.split('-').reverse().join("_")

    let taken_hours = []

    if(lockedDay === false) {
      taken_hours = await getTakenHoursOfDay(formatted_date)
    }

    DATA.horaire.map(
      (value,key) =>{
        if(value.day === new Date(chosen_day)){
          let formatted_list = []
          value.hours.map((hour,k) => {
            if(taken_hours.includes(hour)){
              formatted_list.push([hour,true])
            }
            else{
              formatted_list.push([hour,false])
            }
            
          })
          setAppointmentHours(formatted_list)
        }
      }
    )
  }

  function redirectToHomePageAfterDelay(miliseconds) {
    
    setTimeout(() => {
      // redirect('/')
      window.location.reload();
    }, miliseconds); // Redirect after 5 seconds (5000 milliseconds)
  }



  function handleSubmit(e) {
    e.preventDefault()

    // check if everything is completed (by default all but appointmentTime will be selected because of 'required' )
    if(appointmentTime.length <= 0 || selectedServices.length <= 0) {
      setErrorMessage("Veuillez choisir une heure disponible et un service")
    }
    else{
      // if all good : add appointment to db
      addAppointment(fullName, email, phone, date, appointmentTime).then(
        (response) => {
          // send email to user
          emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, rendezVousForm.current, process.env.REACT_APP_EMAILJS_USER_ID)
              .then((result) => {
                  setSuccessMessage("Votre réservation à été prise en compte, veuillez vérifier votre email !")
                  setErrorMessage("")
                  // Add any success message or logic here
              }, (error) => {
                  console.error('Email sending failed:', error.text);
                  // Add any error handling logic here
              });
          redirectToHomePageAfterDelay(3000)
        }
      )
    }


  }

  function getDayOfWeek(default_date) {
    if (default_date) {
      const days = ['dimanche','lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
      const dayIndex = default_date.getDay();
      return days[dayIndex];
    } else {
      return '';
    }
  };

  const HourTab = ({Value,IsTaken,ReferenceValues}) => {
    
    function handleChosenHour(e){
      e.preventDefault()
      ReferenceValues[1](Value)
    }
    
    return(
      <button className={`${IsTaken? "bg-red-300 text-[var(--colorTemplate2)]": "bg-green-300 text-[var(--colorTemplate1)]"} border-[0.15rem] border-transparent rounded-lg`} disabled={IsTaken} onClick={handleChosenHour}>
        {Value}
      </button>
    )
  }


  const [clickedHour,setClickedHour] = useState(["",false])


  return(
    <form ref={rendezVousForm} className='grid bg-[var(--colorHightlight-transparent-50)] pt-5 pb-10 px-2 max-w-[500px] mx-auto' onSubmit={handleSubmit}>
      <h3 className='text-title text-white text-3xl pb-5'>Rendez-Vous</h3>
      <div className='grid gap-5'>
        <input type='text' name='user_name' required placeholder='Nom et Prénom' className='input-custom' onChange={(e)=>{setFullName(e.target.value)}}/>
        <input type='text' name='user_email' required placeholder='Email' className='input-custom' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='text' required placeholder='GSM' className='input-custom' onChange={(e)=>{setPhone(e.target.value)}} />
        <div className='flex gap-5'>
          <label className='my-auto font-barlow font-bold tracking-tight text-[var(--colorTemplate1)] text-xl xl:text-2xl'>Sélectionnez le jour : </label>
          <input type='date' id='chosen_date' required min={today} className='input-custom-2' onChange={handleDateChosen}/>
        </div>
        <input name='appointment_date' className='hidden' value={date}/>
        <input name='appointment_time' className='hidden' value={appointmentTime}/>
        <input name='selected_service' className='hidden' value={selectedServices}/>
      </div>

      

      <div className='py-5 grid gap-1 grid-cols-5'>
        {appointmentHours.map((value,key) => {
          return(
            <div id={`hourTab_${key}`} className={`grid border-[0.15rem] ${clickedHour[0]===`hourTab_${key}` && clickedHour[1] ? "border-black" : "border-transparent"}`} onClick={(e)=>{setClickedHour([e.currentTarget.id,true])}}>
              <HourTab key={key}  Value={value[0]} IsTaken={value[1] || lockedDay} ReferenceValues={[appointmentTime,setAppointmentTime]} />
            </div>
          )
        })}
      </div>

      <div className='grid pt-5'>
        <label className='text-title text-[var(--colorTemplate1)] text-3xl pb-5'>Choisissez le service</label>
        <div className='grid justify-center gap-10'>
          <ServiceGroup GroupName={SERVICES.services_by_group[0].group} GroupIcon={<GiComb/>} Services={SERVICES.services_by_group[0].services} SelectedServiceList={[selectedServices,setSelectedServices]}/>
          <ServiceGroup GroupName={SERVICES.services_by_group[1].group} GroupIcon={<GiBeard/>} Services={SERVICES.services_by_group[1].services} SelectedServiceList={[selectedServices,setSelectedServices]} />
          <ServiceGroup GroupName={"Packs"} GroupIcon={<CiGift/>} Services={SERVICES.packages} SelectedServiceList={[selectedServices,setSelectedServices]} />
        </div>
      </div>

      <label className='text-[var(--colorTemplate1)] font-open-sans text-center p-2'><span className='underline font-medium'>Note</span> : <span className='font-bold'>Mardi</span> et <span className='font-bold'>Vendredi</span> à partir de 18:30 il y aura 10€ de supplement .</label>
      <p className='text-center text-red-500 bg-white'>{errorMessage}</p>
      <p className='text-center text-green-500 bg-white'>{successMessage}</p>
      <button type='submit' className='button-filled-small'>Réserver</button>

    </form>
  )
}

const ServiceGroup = ({GroupName,Services,GroupIcon,SelectedServiceList}) => {


  return(
    <div className='grid'>

      <div className='p-5 bg-[var(--colorTemplate2)] grid justify-center m-auto'>
        <div className='grid justify-center text-[var(--colorTemplate1)] text-5xl text-center'>
            {GroupIcon}
          </div>
        <label className='text-title text-[var(--colorTemplate1)] text-xl text-center'>
          {GroupName}
        </label>
      </div>

      <div id='section_holder' className='grid gap-5 py-5'>
          {
            Services.map((value,key) => {

              function handleClickedService(e){
                e.preventDefault()
                SelectedServiceList[1](value.name)
              }

              return(
                <div key={key} id={`service_${key}`} className={`grid grid-flow-col p-2 bg-[var(--colorTemplate2)] hover:bg-[var(--colorTemplate2-dark)] transition-all duration-150 text-[var(--colorTemplate1)] ${SelectedServiceList[0] === value.name ? "border-[var(--colorTemplate1)] border-[0.10rem]" : ""}`} onClick={handleClickedService}>
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