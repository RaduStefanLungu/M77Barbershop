import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminSystem() {

  return (
    <div className='grid'>
      AdminSystem
    
      <LogOutButton/>  
    </div>
  )
}


const LogOutButton = () => {

  const { logout } = useAuth()
  async function handleLogout(e){
    e.preventDefault()
    await logout()
  }

  return(
    <button className='bg-blue-500 text-white py-2 px-10 rounded-xl mx-auto my-5 hover:bg-blue-900 transition-all duration-150' onClick={handleLogout}>Déconnection</button>
  )
}