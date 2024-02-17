import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getAllAppointments, getAllAppointmentsMonotone, removeAppointment } from '../../firebase'

import { firestore_db } from '../../firebase'; // Assuming you have imported your Firestore instance as firestore_db
import { collection, doc, onSnapshot } from 'firebase/firestore';


export default function AdminSystem() {

  return (
    <div className='grid bg-[var(--colorTemplate2)]'>
      <LogOutButton/>  

      <AppointmentsList/>

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

const AppointmentsList = () => {

  const DayTab = ({Data}) => {

    const Appointment =({ADay,ATime,Uemail,Uname,Uphone,ATakenTime,ANumber}) => {

      function formatFirestoreTimestamp(timestamp) {
        // Convert Firestore Timestamp to JavaScript Date object
        const date = timestamp.toDate();
        
        // Get the day, month, year, hours, minutes, and seconds from the Date object
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
    
        // Construct the formatted date string
        const formattedDate = `${day}.${month}.${year} à ${hours}:${minutes}:${seconds}`;
    
        return formattedDate;
      }
      
      const [clickedApp,setClickedApp] = useState(false)


      function handleDeleteRDV(e){
        e.preventDefault();
        removeAppointment(ADay,ANumber)
      }

      return(
        <div className='grid bg-green-300 p-2 font-baskerville'>

          <div className='flex' onClick={()=>{setClickedApp(!clickedApp)}}>
            <label>Heure : {ATime}</label>
          </div>

          <div className={`${clickedApp? "grid" : "hidden"} gap-2 py-2`}>
            <div className='flex'>
              <label>Nom : {Uname}</label>
            </div>
            <div className='flex'>
              <label>GSM : {Uphone}</label>
            </div>
            <div className='flex'>
              <label>Email : {Uemail}</label>
            </div>
            <div className='flex text-xs'>
              <label>Jour du RDV : {ADay.replace(/_/g,".")}</label>
            </div>

            <div className='flex text-xs'>
              <label>RDV pris le : {formatFirestoreTimestamp(ATakenTime)}</label>
            </div>
          </div>
          
          <div className='grid grid-flow-col justify-start pt-5'>
            <button className='button-transparent-white-small'>Envoyer Rappel</button>
            <button className='button-deleteRDV' onClick={handleDeleteRDV}>Supprimer RDV</button>
          </div> 
          
        </div>
      )
    }

    const [clickedTab, setClickedTab] = useState(false)

    const [orderedApp,setOrderedApp] = useState([])

    function sortByTime(a, b) {
      const timeA = a.data.rdv_time.split(':');
      const timeB = b.data.rdv_time.split(':');
  
      // Compare hours
      if (parseInt(timeA[0]) !== parseInt(timeB[0])) {
          return parseInt(timeA[0]) - parseInt(timeB[0]);
      }
  
      // Compare minutes if hours are equal
      return parseInt(timeA[1]) - parseInt(timeB[1]);
  }

    useEffect(()=>{
      const fetch = async () => {
        Data.all_appointments.map(
          (value,key) => {
  
            if(!orderedApp.includes(value))
              {orderedApp.push(value)}
          }
        )
        orderedApp.sort(sortByTime)
      }

      fetch()
      
      },[])


    return(
      <div className='grid'>
        
        <h2 className="bg-[var(--colorHightlight-dark)] text-[var(--colorTemplate1)] font-baskerville p-2 mr-auto px-20 rounded-tr-xl " 
          onClick={()=>{setClickedTab(!clickedTab)}}>{Data.id.replace(/_/g,".")}</h2>

        <div className={`${clickedTab? "grid" : "hidden"} bg-[var(--colorHightlight-dark)] gap-5 p-5`}>
          {
            orderedApp.map(
              (element,key) => {
                return(
                  <Appointment key={key} ADay={element.data.rdv_date} ATime={element.data.rdv_time} Uemail={element.data.user_email}
                              Uname={element.data.user_name} Uphone={element.data.user_phone} ATakenTime={element.data.rdv_taken_time} ANumber={element.data.appointment_number} />
                )
              }
            )
          }
        </div>

      </div>
    )

  }

  const [allAppointments,setAllAppointments] = useState([])

  // useEffect(() => {
  //   getAllAppointmentsMonotone().then(
  //     (response) => {
  //       setAllAppointments(response)
  //     }
  //   )
  // },[])

  useEffect(() => {
        const fetchData = async () => {
            getAllAppointments(setAllAppointments)
        };

        fetchData();
    }, []);


  return(
    <div className='grid px-2'>
      <h3 className='text-title text-3xl text-[var(--colorTemplate1)] py-2'>Admin Rendez-Vous</h3>
      <div className='grid gap-5'>
        {
          allAppointments.map(
            (value,key) => {
              return(
                <DayTab Data={value} key={key} />
              )
            }
          )
        }
      </div>
    </div>
  )
}