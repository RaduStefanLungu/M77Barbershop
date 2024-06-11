import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getAllAppointments, lockDays, removeAppointment, unlockDays } from '../../firebase'

import emailjs from '@emailjs/browser';

import { RiArrowDownSLine,RiArrowUpSLine } from "react-icons/ri";
// import DownloadJson from '../../components/DownloadJson';


export default function AdminSystem() {

  return (
    <div className='grid bg-[var(--colorTemplate2)] admin-bg'>
      <header className='flex gap-5 justify-end px-4 py-2'>
        <LogOutButton/>
      </header>
{/* 
      <div className='container mx-auto px-10'>
        <DownloadJson/>
      </div> */}

      <AppointmentsList/>

      <LockDays/>

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
    <button className='button-filled-small my-auto' onClick={handleLogout}>Déconnection</button>
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
      const [sendMessage,setSendMessage] = useState("")

      const rappelFormRef = useRef()

      function handleDeleteRDV(e){
        e.preventDefault();
        removeAppointment(ADay,ANumber)
      }

      function handleRappel(e){
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, "template_yy6hcmb", rappelFormRef.current, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((result) => {
                setSendMessage(`Email envoyé : ${result.text} !` )
                // Add any success message or logic here
            }, (error) => {
                console.error('Email sending failed:', error.text);
                // Add any error handling logic here
            });
      }

      return(
        <div className='grid bg-[var(--colorHightlight)] p-5 rounded-lg font-baskerville'>

          <div className='flex border-b-[0.05rem] border-[var(--colorTemplate2)] md:text-xl' onClick={()=>{setClickedApp(!clickedApp)}}>
            <label>Heure : {ATime}</label>
            {
              clickedApp? <RiArrowDownSLine className='text-2xl text-center text-[var(--colorTemplate2)] my-auto ml-2 md:ml-5'/> : <RiArrowUpSLine className='text-2xl text-center text-[var(--colorTemplate2)] my-auto ml-2 md:ml-5'/>
            }
          </div>

          <div className={`${clickedApp? "grid" : "hidden"} gap-2 py-2 lg:text-xl`}>
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
          
          <p className='text-center font-bold'>{sendMessage}</p>
          <div className='grid grid-flow-col gap-5 justify-start pt-5'>
            
            <button className='button-transparent-white-small' onClick={handleRappel}>Envoyer Rappel</button>
            <button className='button-deleteRDV' onClick={handleDeleteRDV}>Supprimer RDV</button>
          </div> 

          <form ref={rappelFormRef} className='hidden'>
            <input name="user_email" value={Uemail}></input>
            <input name="user_name" value={Uname}></input>
            <input name="appointment_date" value={ADay}></input>
            <input name="appointment_time" value={ATime}></input>
          </form>
          
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
        
        <div onClick={()=>{setClickedTab(!clickedTab)}} className={`${Data.locked? "bg-red-900" : "bg-[var(--colorHightlight-dark)]"} flex justify-between mr-auto py-2 pl-5 pr-5 rounded-tr-xl`}>
          <h2 className={` text-[var(--colorTemplate1)] font-baskerville md:text-xl `} 
            >{Data.id.replace(/_/g,".")}</h2>
          {
            clickedTab? <RiArrowDownSLine className='text-2xl text-center text-[var(--colorTemplate1)] my-auto ml-10 md:ml-20 lg:ml-32'/> : <RiArrowUpSLine className='text-2xl text-center text-[var(--colorTemplate1)] my-auto ml-10 md:ml-20 lg:ml-32'/>
          }
        </div>

        <div className={`${clickedTab? "grid" : "hidden"} ${Data.locked? "bg-red-900":"bg-[var(--colorHightlight-dark)]"} gap-5 p-5`}>
          {
            Data.locked ? 
            <div className='flex border-b-[0.05rem] border-white md:text-xl' >
              <label className='font-barlow font-bold tracking-widest text-white uppercase'> Journée bloquée </label>
            </div> :
               <></>
          }
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

  const [todayDate,setTodayDate] = useState(getTodaysDate)

  useEffect(() => {
        const fetchData = async () => {
            getAllAppointments(setAllAppointments)
        };

        fetchData();
    }, []);

    function getTodaysDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
      const day = String(today.getDate()).padStart(2, '0');
  
      return `${year}-${month}-${day}`;
  }

  function convertDateFormat(dateString) {
    const [day, month, year] = dateString.split('_');
    return `${year}-${month}-${day}`;
}

  return(
    <div className='grid p-2 h-screen content-start m-5 md:mx-32 lg:mx-48 xl:mx-80'>
      <h3 className='text-title text-3xl text-[var(--colorTemplate1)] py-2 md:text-5xl'>Admin - Rendez-Vous</h3>
      <div className='grid gap-5 overflow-auto'>
        {
          allAppointments.map(
            (value,key) => {
              
              // remove return only if it's >= today

              if(convertDateFormat(value.id) >= todayDate){
                return(
                  <DayTab Data={value} key={key} />
                )
              }
            }
          )
        }
      </div>
    </div>
  )
}

const LockDays = () => {

  const [selectedDates, setSelectedDates] = useState([]);

  const [validMessage,setValidMessage] = useState("");
  
  const DateSelector = ({ListReferences}) => {

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const updatedList = [...ListReferences[0], selectedDate];
        ListReferences[1](updatedList);
    };

    return (
        <div className='py-5'>
            <input type="date" id="datePicker" placeholder='Sélectionnez le jour' onChange={handleDateChange} min='today' multiple className='bg-[var(--colorHightlight)] rounded-lg p-2'/>

            <h2 className='text-white mx-2 pt-5 pb-1 border-b-[0.10rem] border-white'>Selected Days:</h2>
            <ul className='text-white px-2 py-5 max-h-[250px] overflow-auto'>
                {ListReferences[0].map((day, index) => (
                    <li key={index}>{day}</li>
                ))}
            </ul>
        </div>
    );
}

    async function handleLock(e){
        e.preventDefault();
        // Ici, vous pouvez faire ce que vous voulez avec la liste des dates sélectionnées, par exemple, les ajouter à une liste de dates bloquées.
      
        if(selectedDates.length > 0) {
          let formatted_dates_list = []
          selectedDates.forEach(
            (element) => {
              let splitted_date = element.split('-')
              let formatted_date = splitted_date[2] + "_" + splitted_date[1] + "_" + splitted_date[0]
              formatted_dates_list.push(formatted_date)
            }
          )
          const response = await lockDays(formatted_dates_list)
          
          if(response) {
            setValidMessage("Vous avez bloqué les journées sélectionnés !")
          }

        }

      };

      async function handleUnlock(e){
        e.preventDefault();
        // Ici, vous pouvez faire ce que vous voulez avec la liste des dates sélectionnées, par exemple, les ajouter à une liste de dates bloquées.
      
        if(selectedDates.length > 0) {
          let formatted_dates_list = []
          selectedDates.forEach(
            (element) => {
              let splitted_date = element.split('-')
              let formatted_date = splitted_date[2] + "_" + splitted_date[1] + "_" + splitted_date[0]
              formatted_dates_list.push(formatted_date)
            }
          )
          const response = await unlockDays(formatted_dates_list)
          
          if(response) {
            setValidMessage("Vous avez débloqué les journées sélectionnés !")
          }

        }

      };

  return(
    <div className='grid px-2 h-screen content-start md:mx-32 lg:mx-48 xl:mx-80'>
      <h3 className='text-title text-3xl text-[var(--colorTemplate1)] py-2 md:text-5xl'>Admin - Réservation Jours</h3>

      <form className='grid'>
            <label htmlFor="datePicker" className='text-white py-2'>Sélectionnez le(s) jour(s) à bloquer :</label>
            
            <DateSelector ListReferences={[selectedDates,setSelectedDates]}/>


            <p className={`text-green-500 text-center py-5 ${validMessage.length > 0 ? "border-y-[0.10rem]" : ""} border-white mb-5`}>{validMessage}</p>

            <div className='flex justify-center gap-5'>
              <button className='button-transparent-white-small' onClick={handleLock}>Bloquer</button>
              <button className='button-transparent-white-small' onClick={handleUnlock}>Débloquer</button>
              <button className='button-deleteRDV' onClick={(e)=>{e.preventDefault();setSelectedDates([])}}>Supprimer tout</button>
            </div>
        </form>


    </div>
  )
}