import React, { useEffect, useState } from 'react'
import { addAppointment, getAppointmentDate } from '../firebase'

import DATA from '../data/data.json'

// TODO make user to render appointment if it is available

export default function RendezVous() {
  return (
    <div>
      RendezVous

      <RdvForm/>

    </div>
  )
}


const RdvForm = () => {

  const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [date,setDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')

  const [today,setToday] = useState(new Date().toISOString().split('T')[0])

  const [appointmentHours, setAppointmentHours] = useState([])      // contains : [hour,bool] where bool => is taken?


  // when date is set query from db all the free appointment spots

  function handleDateChosen(e){
    e.preventDefault()

    // query

    // console.log(e.target.value);
    let given_date = e.target.value

    let splitted_date = given_date.split('-')

    let formatted_date = splitted_date[2] + "_" + splitted_date[1] + "_" + splitted_date[0]

    console.log(formatted_date);

    setDate(formatted_date)
    
    // user chosen day
    let chosen_day_of_week = getDayOfWeek(new Date(e.target.value)) 
    console.log(chosen_day_of_week);


    DATA.horaire.map(
      (value,key) =>{
        if(value.day === chosen_day_of_week){
          let formatted_list = []
          value.hours.map((hour,k) => {
            formatted_list.push([hour,false])
          })
          console.log(formatted_list);
          setAppointmentHours(formatted_list)
        }
      }
    )
  
  }

  function handleSubmit(e) {
    e.preventDefault()

    // add appointment

    addAppointment(fullName, email, phone, date, appointmentTime)

    console.log(fullName,email,phone,date,appointmentTime);

  }

  function getDayOfWeek(default_date) {
    if (default_date) {
      const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
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
      <button className={`${IsTaken? "bg-red-300": "bg-green-300"}`} onClick={handleChosenHour}>
        {Value}
      </button>
    )
  }


  return(
    <form className='grid bg-gray-300 py-10' onSubmit={handleSubmit}>
      <div className='grid gap-5'>
        <input type='text' required placeholder='Nom et Prénom' className='border-black border-2' onChange={(e)=>{setFullName(e.target.value)}}/>
        <input type='text' required placeholder='Email' className='border-black border-2' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type='text' required placeholder='GSM' className='border-black border-2' onChange={(e)=>{setPhone(e.target.value)}} />
        <input type='date' id='chosen_date' required min={today} className='border-black border-2' onChange={handleDateChosen}/>
      </div>

      <div className='py-5 grid gap-1 grid-cols-5'>
        {appointmentHours.map((value,key) => {
          return(
            <HourTab key={key} Value={value[0]} IsTaken={value[1]} ReferenceValues={[appointmentTime,setAppointmentTime]} />
          )
        })}
      </div>

      <button type='submit' className='bg-red-300 py-2 m-4'>Réserver</button>

    </form>
  )
}