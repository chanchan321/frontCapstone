import React,{useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { m, motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import { CgDetailsMore } from "react-icons/cg";
import { MdAssignmentAdd } from "react-icons/md";
import AddEventModal from './Calendar/addEventModal';
import ViewDModal from './Calendar/viewDModal';
import Reschedule from './Calendar/Reschedule';
import Events from './Events'


export default function Three() {
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
        className:'bg-transparent border-transparent text-[12px]',
        start:`${yyyy}-${mm}-${dd}`
      }
      // {
      //   id:1,
      //   title:`9am-10am Occupied`,
      //   description:{
      //     name:'adawda',
      //     adwad:'awdawdawd'
      //   },
      //   start: '2023-05-04',
      //   end: '2023-05-06'
      // }
      // {
      //   title:`9am-10am is busy`,
      //   start: '2023-05-26'
      // },
      // {
      //   title:`8am-10am is busy`,
      //   start: '2023-05-26'
      // }
      // {  title: `Counselingss'`,
      //   className:'bg-blue-300',
      //   description:'32pm-3pm',
      //   start: '2023-05-04T15:00:00'
      // },{
      //   title: `Counselingssxx'`,
      //   className:'',
      //   description:'32pm-3pm',
      //   start: startTimxe()
      // },
    ]

    const getEventss = async () =>{
      try{
        const response= await Axios.get(`http://localhost:3500/getAllEvents`)
        //  console.log(JSON.parse(response.data[0].setTime))
        seteevents((response.data).map((item)=> {
          return {
            title:item.eventName === ('Referral' || 'Appointment')? 'Counselling' : item.eventName,
            start: startTimxe(item.setDate,item.setTime),
            etendedProps:item.setTime
          }
        }))

      }catch (err){   
          console.log(err)
      }
  }
  

    // console.log('2023-05-05' < '2023-05-12')

    const currenEvents= [...today,...unavailable]

    const [openEvents,setopenEvents] = useState(false)

    const clickDate = (info) => {
      setopenEvents(true)
      setdateClicked(info)
      // adwd(info)
    }

    const [openaddEvents,setopenaddEvents] = useState(false)
    const [dateClicked,setdateClicked] = useState()

    const [eventViewDetails,setEventViewDetails] = useState(false)
    const [eventValue,setEventValue] = useState()

    const [openReschedule,setopenReschedule] = useState()

    
    useEffect(()=>{
      getEventss()
      const interval =  setInterval(()=>{
             getEventss()
        },2500)
        return () => clearInterval(interval)

      },[openEvents,openReschedule,eventViewDetails])
      

    const closeAll = (data) =>{
      setopenReschedule(data)
      setEventViewDetails(data)
      setopenEvents(data)
    }

    const seleect = (info)=>{
      const startD = new Date(info.startStr)
      const endD = new Date(info.endStr)

        if(endD.getDate() - startD.getDate() > 1 || (endD.getMonth() - startD.getMonth())){
          adwd(info)
          console.log({addEVENT:info})
        }      

    }

    const adwd = (info)=>{
       if (openEvents){
        return setdateClicked(info)
      }else{
        setselected({
          title:`s`,
          className:'s',
          ID:'s',
          start: info.startStr,
          end: info.endStr
          
        })
      }
    }

    const seleectDetails = (info)=>{
      const start = new Date(info.start)
      const end = new Date(info.end)
     

        if(end.getDate() - start.getDate() > 1){
          console.log('open details')
        }      

    }


  return (
    <>
    <div  className='w-full relative h-[100vh] overflow-x-auto overflow-y-hidden items-start'>
          <div className='bg-white min-w-[500px] mx-auto h-[85vh] p-2 rounded-sm mt-10 '>
                <FullCalendar
                height='100%'
                // fixedWeekCount={false}
                // showNonCurrentDates={false}
                headerToolbar={{
                    left: 'title',
                    right: 'prevYear,prev,today,next,nextYear'
                }}
                plugins={[ dayGridPlugin,interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={ function(info) {
                  clickDate(info)
                }}
                eventClassNames={'events'}
                dayMaxEventRows={2}
                // initialEvents={events && events}
                
                // dayMaxEventRows={5}
                eventClick={(info)=>{
                  seleectDetails(info.el.fcSeg.eventRange.range)
                }}

                selectable
                select={function(info) {
                  seleect(info)
                }}
                
                eventOrderStrict={true}
                dayCellClassNames={'cursor-pointer w-fit'}
                // eventContent={(arg)=>(
                //   <p>{arg.event.extendedProps.description}</p>
                // )}
                events={events && events}
            />      
        </div> 
        </div>


      {/* ///////////////////////////////////////////////////////////////////////////////// */}

        {/* date EVENTS */}      
      <motion.div className='z-20 absolute top-0 left-[-1000px] h-[100vh] w-full sm:w-fit flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
            transition={{
                type: "spring",
                stiffness: 30
            }}
            animate={{
                x: openEvents? 1000:0}}
                >
                { openEvents && 
            <div>
                <div onClick={(()=>setopenEvents(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                    <Events  addModal={setopenaddEvents} value={dateClicked} refresh={eventViewDetails} opendetails={setEventViewDetails} details={setEventValue}/>
            </div>}
            
           </motion.div>

        {/*blackbehind  EVENTS */}
        {openEvents &&
        <motion.div 
        // transition={{
        //     duration: 0.5
        // }}
        // animate={{
        //   x: openEvents? 0:-2500}}
         className="opacity-75 fixed inset-0 z-10 bg-black block"></motion.div>}

      {/* //////////////// ADD EVENTS ///////////////////////////////////////////////////////////////// */}

        {openaddEvents && <AddEventModal close={setopenaddEvents} close2={closeAll} value={dateClicked && dateClicked}/>}
          
        {eventViewDetails && <ViewDModal close={setEventViewDetails} close2={closeAll} resched={setopenReschedule} value={eventValue} />}
            
        {openReschedule && <Reschedule close={setopenReschedule} close2={closeAll} back={setEventViewDetails} value={eventValue} />}
    

    </>
  )
}

