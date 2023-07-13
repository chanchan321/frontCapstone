import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import ReschedDateTime from './reschedDateTime';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Reschedule({close,close2,value,back}) {
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
      setopenRescheduledateTime(true)
      setdateClicked(info)
    }
  }   

  const [openRescheduledateTime,setopenRescheduledateTime] = useState(false)
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
    className:'font-bold bg-transparent border-transparent text-[12px] w-fit',
    start:`${yyyy}-${mm}-${dd}` 
  }
]

  const getEventss = async () =>{
    try{
      const response= await Axios.get(`http://localhost:3500/getAllEvents`)
      
      seteevents((response.data).map((item)=> {
        return {
          title:item.eventName === ('Referral' || 'Appointment')? 'Counselling' : item.eventName,
          className:'w-fit',
          start: startTimxe(item.setDate,item.setTime)
        }
      }))

    }catch (err){   
        console.log(err)
    }
}
const [showcalendar,setshowcalendar] = useState(false)
  useEffect(()=>{
    
    
    setTimeout(()=>{
      setshowcalendar(true)
 
        // setTimeout(()=>{
          getEventss()
          setloading(false)
        // },100)

    },500)
   
    
  },[])



   
  const [loading,setloading] = useState(true)
  return (
    <>
      {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'black'}/>
                </div>
                </>}
        <div className={`${openRescheduledateTime && 'hidden'} absolute top-1 left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] `}>
        {/*content*/}
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}
                            <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                      <div className='text-[20px] break-words'>Select date </div>
                                </h3>
                            </div>
                           
            {/*body*/}
                          <div className="w-full flex flex-col z-50 font-[poppins] overflow-x-hidden">
                            
                            <div className='bg-white w-[1000px] h-[85vh] p-2 rounded-sm cursor-pointer'>
                        
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
                                    events={events && events}
                                    
                                    
                                />     
                             </div> 


                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between py-1 px-3 border-t border-solid border-slate-200 rounded-b">
                        <div>
                              <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=>{
                                    close(false)
                                    back(true)
                                } }>
                                 back
                            </button>
                        </div>
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>
  
     {openRescheduledateTime && <ReschedDateTime close={setopenRescheduledateTime} close2={close2} back={close} value={dateClicked} eventInfo={value}/>}                           
    </>
  )
}
