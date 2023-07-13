import React,{useEffect, useState} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'

import useStore from '../Store/store';

export default function StudeAddAppointment({haverequest,refresh,appointmentD,load}) {
    //from database mga dating nakuha
    // const existingChossenTime = ['9am-10am','10am-11am','1pm-2pm','2pm-3pm','3pm-4pm']

    // const timeTochoose = ['9am-10am','10am-11am','1pm-2pm','2pm-3pm','3pm-4pm','4pm-5pm']

    //tira nalang
    // const filtered =  timeTochoose.filter((time)=> !existingChossenTime.includes(time))

    //piniling Time
    // const chossenTime = ['4pm-5pm']

    // matitira sa pinili tsaka dati
    // const filter =  filtered.filter((time)=> !chossenTime.includes(time))

    // const availableTIME=filtered

    // console.log({availableTIME:filtered})  

    // console.log({freeTimeLeft:filter})  

    // console.log(filter[0]? 'true':'false')

    // if(!filter[0]){
    //     console.log(' I SAVE ANG DATE TO UNAVAILABLE DATES PARA SA RED   ')
    // }

  const cUser = useStore(state => state.cUser)

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

      // today DATE
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

       //from database all un available dates
      const [unavailableDates,setunavailableDates] = useState(['2023-05-24'])

    //display red from database
    const  [unavailable,setunavailable] = useState([
      { date: '2023-05-24',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-24',display: 'background', backgroundColor:'#ff0000'},
      { date: '2023-05-24',display: 'background', backgroundColor:'#ff0000'}
    ]);

    // const timeDisplay = (array) =>{
    //   if(array.length === 1){
    //     return `${(array.toString().split('-')[0])}-${(array.toString().split('-')[1])}`
    //   }
    //   if(array.length > 1){
    //     return `${array[0].split('-')[0]}-${array.slice(-1).toString().split('-').slice(-1).toString()}`
    //   }
    // }

    const timeDisplay = (array) =>{
      if(array.length === 1){
        return `${(array.toString().split('-')[0])}-${(array.toString().split('-')[1])}`
      }
      if(array.length > 1){
        return `${array[0].split('-')[0]}-${array.slice(-1).toString().split('-').slice(-1).toString()}`
      }
    }
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
    const yourReq =(
        {
          title: `Request`,
          className:'border-transparent text-[12px] bg-[#66ff61] text-[#fcfcfc]',
          start:appointmentD.dateRequested
        }
    )

    const [eevents,seteevents] = useState('')
    //from database
    const events= [
      // ...unavailable,
      ...today,...eevents,yourReq,
      {
        title: `TODAY`,
        className:'bg-transparent border-transparent text-[12px]',
        start:`${yyyy}-${mm}-${dd}` 
      }
    ]

    ///MONTH NAME//
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
  
  const [choseeAvailableTime,setchoseeAvailableTime]= useState()
  const [dateRequested,setdateRequested] = useState()
  const [timeRequested,settimeRequested] = useState('')
  const [reason,setreason] = useState()
  const [status,setstatus] = useState('pending')
  const [dateOfRequest,setdateOfRequest] = useState()

  const[dateclicked,setDateclicked] = useState('');

          function getDayName(date = new Date(), locale = 'en-US') {
            return date.toLocaleDateString(locale, {weekday: 'long'});
          }
                  
    const getEventss = async () =>{
      
            try{
              const response= await Axios.get(`http://localhost:3500/getAllEvents`)
            
              const futureEvents = (response.data.filter((event)=> event.setDate > `${yyyy}-${mm}-${dd}` ) )
            
              seteevents((futureEvents).map((item)=> {
                return {
                  title:`${timeDisplay(JSON.parse(item.setTime))} is busy`,
                  className:'font-light',
                  // start: item.setDate,
                   start: startTimxe(item.setDate,item.setTime)
                }
              }))
              
            }catch (err){   
                console.log(err)
            }
        }
          useEffect(()=>{
            getEventss()
          },[appointmentD])   


 const addApp = async (selectInfo) => {

        const dateclick = selectInfo.dateStr
        const dayOfname =getDayName(new Date(dateclick))

        const date = new Date(dateclick);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
  
        const todaydate = new Date();
        let Tday = todaydate.getDate();
        let Tmonth = todaydate.getMonth() + 1;
        let Tyear = todaydate.getFullYear();

     

            if(haverequest){
              // if(false){
              Swal.fire({
                title: 'Unavailable!',
                text: "You have pending request!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
              })}else if(unavailableDates.includes(dateclick)){
                Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: 'Unavailable',
                      showConfirmButton: false,
                      timer: 1500
                    })
            }else if(year<Tyear){
              Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Unavailable',
                    text:'The date you click is past year',
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
            }else if(dayOfname==='Sunday'){
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Sunday is Unavailable',
                showConfirmButton: false,
                timer: 1500
              })
            }else{

                    const date = new Date(dateclick);
                    let day = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
                    // MnameToday
                    const todayDate = monthNames[mm-1]+` ${dd} ${year}`
                    // MnameClick
                    const monthName = monthNames[month]+` ${day} ${year}`

                    setDateclicked(monthName)
                    //numberFormatToday
                    const yearMdayFormatToday = `${year}-${mm}-${dd}`
                    setdateOfRequest(`${year}-${mm}-${dd}`)
                    //numberFormatCLick
                    const yearMdayFormatClick = selectInfo.dateStr
                    load(true)
                    try{
                          const response= await Axios.get(`http://localhost:3500/availableCal/${yearMdayFormatClick}`)

                            const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']
                         
                                  if(response.data[0]){

                                    const dateUnava = response.data
                                    
                                    let text = [ ];
                                    for (let i = 0; i < dateUnava.length; i++) {
                                        text += dateUnava[i].setTime+ ','}
                                  
                                    //tira nalang
                                    
                                    const filtereddb =  timeTochoosedb.filter((time)=> !text.includes(time))
                                    setchoseeAvailableTime(filtereddb)
                              
                                      
                                  }else{
                                    setchoseeAvailableTime(timeTochoosedb)
                                  }
                                 
                        }catch (err){
                          if (!err?.response) {
                            console.log(err)
                          }
                        }
                    
                        setTimeout(()=>{
                          load(false)
                          setdateRequested(yearMdayFormatClick)
                          setOpen(true)
                      },1000)     
                   
                  }
              }

        const [open,setOpen] = useState(false)

      const toDB={
          dateRequested:dateRequested,
          timeRequested:[timeRequested],
          reason:reason,
          status:status,
          dateOfRequest:dateOfRequest,
      }

      const saveToDB = ()=>{
        if(!timeRequested || !reason ) {
          return  Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Incomplete Inputs',
            showConfirmButton: false,
            timer: 1500
          })
        }
        const date = new Date(toDB.dateRequested);
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        const dateRequestednotif = monthNames[month]+` ${day} ${year}`
          Swal.fire({
              title: 'Are you sure?',
              text: "Double check your inputs !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, Im sure!'
            }).then( async (result) => {
              if (result.isConfirmed) {
                load(true)
                  try{
                      const response= await Axios.post(`http://localhost:3500/appointment`,
                      {
                        content:toDB,
                        lrn:cUser.LRN
                      })

                          try{
                            const response= await Axios.post(`http://localhost:3500/notification`,{
                                type:'Counseling',
                                message:`A student w/ ${cUser.LRN} LRN Request an Appointment on ${dateRequestednotif}`,
                                status:'unread'
                            })
                              if(!response) { 
                                      console.log('server Error')
                              }
                                  if(response.data){
                                    setOpen(false)
                                    refresh('add')
                                  }
            
                          }catch (err){
                            if (!err?.response) {
                              console.log(err)
                            }
                          }
                      
                    }catch (err){
                      if (!err?.response) {
                        console.log(err)
                      }
                    }
              }
            })
          }


  return (
    <>
          <div className='bg-white w-full sm:min-w-[600px] sm:w-[700px] sm:min-h-[600px] h-[90vh] p-1 sm:mx-2 rounded-sm mt-10 cursor-pointer  sm:text-[15px] '>
                <FullCalendar
                height='100%'
                fixedWeekCount={false}
                showNonCurrentDates={false}
                headerToolbar={{
                    left: 'title',
                    right: 'prev,today,next',
                }}
                plugins={[ dayGridPlugin,interactionPlugin ]}
                initialView="dayGridMonth"
                dateClick={ function(info) {
                    addApp(info)
                }}
                // initialEvents={currenEvents && currenEvents}
                dayMaxEventRows={2}
                events={events && events}
                displayEventTime={false} 
                eventClassNames='text-[9px] font-bold sm:text-[15px] bg-blue-200'
                eventDisplay= 'block '
                eventTextColor='black'
            />      
        </div> 

    {open && <>
        <div className="absolute top-[8%] right-0 left-0 mx-auto w-[100%] h-[1px] z-50 flex justify-center  font-[poppins] max-w-[600px] ">
                                {/*content*/}
                                            <motion.div className="m-auto border-0 rounded-lg shadow-lg flex flex-col w-full  bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                        {choseeAvailableTime[0]?<>
                                                              <div className='text-[15px] sm:text-[25px] break-words'>Enter details for Appointment</div>
                                                              </>:
                                                      <div className='w-full font-bold text-[20px] text-center'>SORRY !!</div>}
                                                        </h3>
                                                    </div>
                                    {/*body*/} 
                                                <div className=" relative p-2 sm:p-6 z-50 sm:min-w-[370px] w-full sm:w-[600px] flex flex-col">
                                                      {choseeAvailableTime[0]?<>
                                                    <div className='w-full flex flex-col sm:flex-col justify-between'>

                                                        <div className='text-[15px] sm:text-[18px]'><span className=' font-bold text-black'>Date requested:</span> <span className='text-red-500 font-bold'>{dateclicked && dateclicked}</span></div>
                                                        
                                                        <div className='flex flex-row text-[15px] sm:text-[18px]'>
                                                            <div className=' font-bold text-black'>Available Time:</div>
                                                            <select name="availableTime" className='text-[15px] sm:text-[18px] text-red-500 font-bold border-2 border-black' onChange={(e)=>settimeRequested(e.target.value)}>
                                                                        <option value={''} className='p-2'></option>
                                                            {choseeAvailableTime &&  choseeAvailableTime.map((value,index)=>{
                                                                return  <option key={index} value={value} className='p-2'>{value}</option>
                                                            } )}
                                                            </select>
                                                        </div>

                                                    </div>

                                                    <div className='flex flex-col '>
                                                        <div className='font-bold text-black text-[18px]'>Reason:</div>
                                                        <textarea onChange={(e)=>setreason(e.target.value) } className='w-full h-[100px] max-h-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                    </div>
                                                      </>:
                                                      <div className='w-full font-bold text-[20px] text-center'>NO MORE AVAILABLE TIME !!</div>}
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 hover:rounded-sm background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>setOpen(false)}
                                                    >
                                                        close
                                                    </button>
                                                    {choseeAvailableTime[0] &&
                                                    <button
                                                        className="bg-green-400 hover:bg-green-500 text-white-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>saveToDB()}
                                                    >
                                                        SEND Request
                                                    </button>  }
                                            </div>
                                        </motion.div>
                                </div>
                          <div  className="opacity-25 fixed inset-0 z-40 bg-black "></div></>}
                                    
    </>
  )
}
