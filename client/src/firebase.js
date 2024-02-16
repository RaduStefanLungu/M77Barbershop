import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { addDoc, collection, getFirestore, doc, getDoc, getDocs, updateDoc, deleteDoc, Timestamp, setDoc, arrayUnion } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// const analytics = getAnalytics(app);

export const auth = getAuth(app)

const firestore_db = getFirestore(app)


export async function getUserDocument(userEmail){
  const myCollection = await collection(firestore_db,"user_data")
  const querySnapshot = await getDocs(myCollection)
  
  const documentsData = []
  querySnapshot.forEach((doc) => {
    documentsData.push({id: doc.id, ...doc.data()})
  })  

  let searchedDocument = null
  documentsData.forEach((doc) => {
    if(doc.email === userEmail){
      searchedDocument = doc
      return false
    }
  })
  return searchedDocument;
}

// export async function getUserDocumentByID(userID){
//   const myCollection = await collection(firestore_db,"user_data")
//   const querySnapshot = await getDocs(myCollection)
  
//   const documentsData = []
//   querySnapshot.forEach((doc) => {
//     documentsData.push({id: doc.id, ...doc.data()})
//   })  

//   let searchedDocument = null
//   documentsData.forEach((doc) => {
//     if(doc.id === userID){
//       searchedDocument = doc
//       return false
//     }
//   })
//   return searchedDocument;
// }



const getDocumentById = async (collectionName, documentId) => {
  try {
    const docRef = doc(firestore_db, collectionName, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      // Document found, you can access its data using documentSnapshot.data()
      return documentSnapshot.data();
    } else {
      // Document does not exist
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

export async function getUsers(){
  const myCollection = await collection(firestore_db,"user_data")
  const querySnapshot = await getDocs(myCollection)

  const all_users = []
  querySnapshot.forEach((doc) => {
    all_users.push({id: doc.id, ...doc.data()})
  })  

  return all_users;
}

export async function getTakenHoursOfDay(day){
  let result = []

  // check if document exists : 

  let document_from_db = await getDocumentById('appointments',day)

  if(document_from_db === null){
    return result
  }
  else{
    const given_day_appointments = await getAppointmentDate(day)
    given_day_appointments.all_appointments.forEach(
      (element) => {
        const appointmentKeys = Object.keys(element)

        appointmentKeys.forEach(key => {
          const appointmentData = element[key];
          result.push(appointmentData['rdv_time'])
      });
    })
    return result
  }

  
}

export async function getAppointmentDate(documentID) {
    try{
        return getDocumentById("appointments",documentID)
    }catch(e){
        addError({
            e_message: "Failed to get appointment from << appointments >> firestore table.",
            program_execution: "Failed to execute firebase.getAppointmentDate(...)",
            program_function_error: `addAppointment(${documentID})`,
            program_page: "/rendez-vous",
          })
          return(e)
    }
}

export async function addAppointment(user_name,user_emai,user_phone,rdv_date,rdv_time){
    const data = {
        user_name: user_name,
        user_emai: user_emai,
        user_phone: user_phone,
        rdv_date: rdv_date,
        rdv_time: rdv_time,
        rdv_taken_time : Timestamp.now()
    }
  
    try{
      
      // check if document already existst:

      getDocumentById('appointments',rdv_date).then(
        (response) => {
          let number_of_existing_appointments = 0
          
          // if it doesn't exists, create it 
          if(response === null){
            setDoc(doc(firestore_db,'appointments',rdv_date),{
              all_appointments : []
            })
          }
          else{
            //get # of existing appointments 
            number_of_existing_appointments = response.all_appointments.length 
          }

           // add new appointment to array
           // no need to check if already exists because of 'disableb' proprety of the selected stuff
           const appointmentRef = doc(firestore_db, "appointments", rdv_date);
           updateDoc(appointmentRef, {
           all_appointments: arrayUnion({ [`appointment_${number_of_existing_appointments}`]: data })
       });

        }
      )
      

      return(true)

    }catch(e){
      addError({
        e_message: "Failed to add appointment to << appointments >> firestore table.",
        program_execution: "Failed to execute firebase.addAppointment(...)",
        program_function_error: `addAppointment(${user_name},${user_emai},${user_phone},${rdv_date},${rdv_time})`,
        program_page: "/rendez-vous",
      })
      return(e)
    }
  
  }


export async function addUser(email,phone,sex,caracteristics,newsletterSubscription,acceptedTerms,accountCompleted){
  const data = {
    account_completed: accountCompleted,
    caracteristics: caracteristics,
    email: email,
    newsletter_subscription: newsletterSubscription,
    phone_number: phone,
    sex: sex,
    notifications: [],
    my_match_sex : "/",
    my_match_id : "/",
    accepted_terms_of_service : acceptedTerms,
    account_created_timestamp : Timestamp.now()
  }

  try{
    addDoc(collection(firestore_db,"user_data"),data)
    return(true)
  }catch(e){
    addError({
      e_message: "Failed to add user to user_data firestore table.",
      program_execution: "Failed to execute firebase.addUser(...)",
      program_function_error: `addUser(${email},${phone},${sex},${caracteristics},${newsletterSubscription},${accountCompleted})`,
      program_page: "-",
      user_email: `${email}`
    })
    return(e)
  }

}

export async function updateUser(docID,data){
  const documentRef = doc(firestore_db,"user_data",docID)

  updateDoc(documentRef,data).then(
    () => {
      console.log('successfully updated user');
      return(true)
    }
  ).catch(
    (error) => {
      addError({
        e_message: "Failed to update data to user_data firestore table.",
        error : `${error.message}`,
        program_execution: "Failed to execute firebase.updateUserCaracteristics(docID,data)",
        program_function_error: `updateUserCaracteristics(${docID},${data})`,
        program_page: "/profile -> settingsView",
        user_document_id: `${docID}`
      })
      console.log(error);
      return(error)
    }
  )

  
}

export async function addError(data){
    const error_data = {
      error_time: Timestamp.now(),
      error_message: data
    }
    addDoc(collection(firestore_db,"error_table"),error_data)
  }

// export default app;