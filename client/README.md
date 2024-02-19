> Title : M77 Barbershop
> Vertical Scrolling website

> TODO :
    - add Appointment system client                                                         OK
        - show selected hour by client on click                                             OK

    - add Appointment system admin
        - Login Page (admin only)                                                           OK
        - list of appointments (date,hour,user data)                                        OK
        - appointment cancelling (delete appointment from the selected day)                 OK
            - if document.all_appointments is empty then remove it                          OK
    
        - bloquer des jours (update 'locked' to true and don't let users take that day)     OK
            - show in list the locked days with 'special' effect                            OK
        
        - envoyer rappel rdv aux clients par email (connection EmailJS)                     OK


    - apply Design on Appointment System                                                    OK
    - let user chose what service it wants (and give him price)                             OK


    - finish Menu Bar (Burger Version)                                                      OK
    - add up/down arrow to clickable components (Admin/rendez-vous)                         OK
    - fix layout tablet/pc for page /rendez-vous                                            OK
    - add message of success on email sent (/#contact)                                      OK
    - do not send email if incomplete values (chosen hour/service) ! (/rendez-vous)         OK       
    - move the message of incompletion to near the submit button (/rendez-vous)             OK
    - add success message on rezervation (/rendez-vous)                                     OK

    - add design on /admin/login                                                            OK

    - footer                                                                                OK
        - add link to used images
        - add admin link
        - add social medias                                         
    
    - /admin/rendez-vous add button to unlock day                                           OK
    
    -> fix refreshing on new appointment added (it refreshes everything not just            
        adds something to the list)