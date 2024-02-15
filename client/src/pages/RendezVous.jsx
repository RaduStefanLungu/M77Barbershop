import React, { useState } from 'react'

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

  // when date is set query from db all the free appointment spots

  function handleSubmit(e) {
    e.preventDefault()

    

  }


  return(
    <form className='grid bg-gray-300 py-10' onSubmit={handleSubmit}>
      <div className='grid gap-5'>
        <input type='text' placeholder='Nom et Prénom' className='border-black border-2' onChange={(e)=>{setFullName(e.target.value)}}/>
        <input type='text' placeholder='Email' className='border-black border-2' />
        <input type='text' placeholder='GSM' className='border-black border-2' />
        <input type='date' className='border-black border-2' />
      </div>

      <div className='py-5'>
        ...
      </div>

      <button type='submit' className='bg-red-300 py-2 m-4'>Réserver</button>

    </form>
  )
}