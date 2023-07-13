import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from "framer-motion"
import SetTime from './setTime';
import SetTimeAppointment from './setTimeAppointment';


export default function Calendar({close,close2,value,type,refresh,load,clos2}) {

  // console.log(value)
  // console.log(type)
    const container = {
        hidden: { opacity: 0 },
        show: {
          scale:[0.5,1],
          opacity: 1,
          transition: {
            delayChildren: 0.5,
            staggerDirection: -1
          }
        }
      }

      const clickDate= (info)=>{

        const date = new Date(info.dateStr);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
    
        const todaydates = new Date();
        let Tday = todaydates.getDate();
        let Tmonth = todaydates.getMonth() + 1;
        let Tyear = todaydates.getFullYear();
    
    
        if(year<Tyear){
          Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Unavailable',
                showConfirmButton: false,
                timer: 1500
              })
        }else if(year === Tyear && month < Tmonth){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Unavailable',
            showConfirmButton: false, 
            timer: 1500
          })
        }else if(year === Tyear && month <= Tmonth && day < Tday){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Unavailable',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
          setopenSetdateTime(true)
          setdateClicked(info)
        }
      }   

      const [openSetdateTime,setopenSetdateTime] = useState(false)
      const [dateClicked,setdateClicked] = useState('')


      
  const todaydate = new Date();
  var dd = todaydate.getDate();
  var mm = todaydate.getMonth()+1; 
  var yyyy = todaydate.getFullYear();

  if(dd<10) {dd='0'+dd} 
  if(mm<10) { mm='0'+mm} 

  const today = [ 
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},
    { date: `${yyyy}-${mm}-${dd}` ,display: 'background', backgroundColor:'#035bf3'},];

  const  [unavailable,setunavailable] = useState([
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-25',display: 'background', backgroundColor:'#ff0000'}
    ]);


      const [selected,setselected] = useState([])
  
        const tiime = (time) =>{
          if((time.toString()).includes('9am')){
              return 'T09:00:00'
          }else if((time.toString()).includes('10am')){
            return 'T10:00:00'
          }else if((time.toString()).includes('2pm')){
            return 'T14:00:00'
          }else if((time.toString()).includes('3pm')){
            return 'T15:00:00'
          }else if((time.toString()).includes('4pm')){
            return 'T16:00:00'
          }
        }



 const startTimxe = (date,time) =>{
      return `${date}${tiime(time)}`
    }
    const [eevents,seteevents] = useState('')

    const events = [...today,selected,...eevents,
      {
        title: `TODAY`,
        className:'font-bold bg-transparent border-transparent text-[12px]',
        start:`${yyyy}-${mm}-${dd}` 
      }
    ]

      const getEventss = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/getAllEvents`)
          
          seteevents((response.data).map((item)=> {
            return {
              title:item.eventName === ('Referral' || 'Appointment')? 'Counselling' : item.eventName,
              start: startTimxe(item.setDate,item.setTime)
            }
          }))
  
        }catch (err){   
            console.log(err)
        }
    }
    
      useEffect(()=>{

        setTimeout(()=>{
          getEventss()
        },1500)

      },[])




    return (
        <>
                           {!openSetdateTime &&  
                            <div className=" h-auto z-50 font-[poppins] bg-white overflow-x-hidden rounded-md">
                            
                                <div className='w-[1000px] h-[85vh] p-2 cursor-pointer '>
                              
                                     <FullCalendar
                                        contentHeight='auto'
                                        fixedWeekCount={false}
                                        showNonCurrentDates={false}
                                        headerToolbar={{
                                            left: 'title',
                                            right: 'prev,today,next'
                                        }}
                                        plugins={[ dayGridPlugin,interactionPlugin ]}
                                        initialView="dayGridMonth"
                                        dateClick={ function(info) {
                                          clickDate(info)
                                        }}
                                        eventOrderStrict={true}
                                        dayCellClassNames={'cursor-pointer'}
                                        // eventContent={(arg)=>(
                                        //   <p>{arg.event.extendedProps.description}</p>
                                        // )}
                                        events={events && events}
                                        
                                    />  
                                 </div> 
    
    
                            </div>}
             

          {openSetdateTime && <> 
          {type === 'referral' && <SetTime close={setopenSetdateTime} value={dateClicked} back={close} eventInfo={value} type={type} refresh={refresh} load={load} clos2={clos2}/>}
          {type === 'appointment' && <SetTimeAppointment close={setopenSetdateTime} close1={close} closse2={close2} value={dateClicked} back={close} eventInfo={value} type={type} refresh={refresh} load={load}/>}
          
          </> }                      
        </>
      )
    }
