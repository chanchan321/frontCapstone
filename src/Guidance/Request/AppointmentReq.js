
import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import { Tooltip, Button } from "@material-tailwind/react";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Calendar from './calendar';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function AppointmentReq() {

    const [appointmentlist,setappointmentlist] = useState()
    const [tofilter,settofilter] = useState()

    const [showname,setshowname] = useState(false)

        const getAppointmentReqs = async (ress) =>{
            try{
                const response= await Axios.get(`http://localhost:3500/gcAppointment`)
                    // console.log(response.data)
                   
                    setTimeout(()=>{
                         settofilter(response.data)
                        setappointmentlist(response.data.filter((list)=> (list.status.toLowerCase()).includes('pending')))
                        setloading(false)
                        if(ress === 'setSched'){
                            Swal.fire({
                                icon: 'success',
                                title: 'Event scheduled!',
                                showConfirmButton: false,
                                timer: 1500
                              })
                             
                        }
                    },1500) 
              }catch (err){ 
                  console.log(err)
              }
        }
        useEffect(()=>{
            getAppointmentReqs()
        },[])


        const details = (value) =>{
            setappointmentdetails(value)
            setshowappointmentdetails(true)
        }
        const [showappointmentdetails,setshowappointmentdetails] = useState(false)
        const [appointmentdetails,setappointmentdetails] = useState('')

        const [tofilterStatus,settofilterStatus]= useState('pending') 

        const [tofilterSearch,settofilterSearch]= useState('') 
        

        const filterStatus = (e)=>{
            settofilterStatus(e)
            setappointmentlist(tofilter.filter((list)=> (list.status.toLowerCase()).includes(e)))
            settofilterSearch('')
      }

      
      const filterstud = (e)=>{
        settofilterSearch(e)
        if(e) return setappointmentlist(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) )
                    .filter((referral)=>(referral.lastname.toLowerCase() + referral.firstname.toLowerCase() + referral.middlename.toLowerCase()).includes(e)))
        
                    setappointmentlist(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
      }

      const [loading,setloading] = useState(true)
    
  return (
    <>

                {
                loading &&
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-25 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
         <div className='w-full p-2 h-[80vh] overflow-auto bg-white rounded-md'>
                <div className='flex flex-col md:flex-row w-full justify-between px-2 py-2'>
                        <p className='text-[25px] font-[poppins] text-black font-bold'>Student Appointment Request</p>
                        
                        <div className='flex flex-col max-w-[300px] lg:flex-row'>
                                <select name="status" onChange={(e)=> filterStatus(e.target.value)} value={tofilterStatus} className='h-full mx-2 rounded-md text-center'>
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="canceled">Canceled</option>
                                    <option value="done">Done</option>
                                </select>
                            <input type='text' onChange={(e)=> filterstud(e.target.value)} value={tofilterSearch} placeholder='Search Name of student' className='w-[300px] shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'></input>
                        </div>
                    </div>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                            <thead className='border-b font-medium dark:border-neutral-500 '>
                                <tr className='font-bold'>
                                    
                                    <th scope="col" className="px-6 py-[12px]">
                                    <span onClick={()=> setshowname(!showname)} className='p-2 rounded-md bg-green-400 hover:bg-green-600 text-white font-bold cursor-pointer mx-2'>{showname? 'SHOW NAME':'SHOW LRN'}</span>
                                    Student LRN/Student Name
                                    </th>
                                    <th scope="col" className="px-6 py-[12px]">{tofilterStatus === 'pending' ? 'Date Requested':'Date of Event'}</th>
                                    <th scope="col" className="px-6 py-[12px]">Records</th>
                                </tr>
                            </thead>
                            {appointmentlist && !appointmentlist[0]? 
                                <tbody>
                                    <tr>
                                        <td className='text-[30px] py-2'>NO REQUEST</td>
                                    </tr>
                                </tbody>
                                :<>
                            <tbody>
                                {appointmentlist && appointmentlist.map((value,index)=>{
                                        return <AppointmentList key={index} value={value} showname={showname} details={details}/>
                                    })}
                            </tbody></>}
                    </table>

            </div>
                                    
            <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-25'
                        transition={{
                            type: "spring",
                            stiffness: 25
                        }}
                        animate={{
                        y: showappointmentdetails?  1000 : 0 }}>
                        {showappointmentdetails && 
                            <div>
                            <div onClick={(()=>setshowappointmentdetails(false))} className='z-30 text-white absolute top-0 left-0 cursor-pointer'><RxCross2 className='text-white' size={40}/></div> 
                                    <Details value={appointmentdetails} refresh={getAppointmentReqs} close={setshowappointmentdetails} load={setloading}/>
                            </div>}
                          
                </motion.div>                                     
                {/* {showappointmentdetails &&  <div className="opacity-25 fixed inset-0 z-20 bg-black block"></div>}       */}



                

             

    </>
  )
}

function AppointmentList({value,showname,details}) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(value.dateOfRequest);
                  let day = date.getDate();
                  let month = date.getMonth();
                  let year = date.getFullYear();
      const dateOfRequest = monthNames[month]+` ${day} ${year}`

    //   const dateOFEvent = (value) =>{
    //         const date2 = new Date(value);
    //         let day2 = date2.getDate();
    //         let month2 = date2.getMonth();
    //         let year2 = date2.getFullYear();
    //     return monthNames[month2]+` ${day2} ${year2}`
    //   }
    //   console.log(dateOFEvent(value.status === 'ongoing' ? (value.reschedDate? value.reschedDate : value.dateRequested) :value.dateRequested))

      const date2 = new Date(value.status === 'ongoing' ? (value.reschedDate? value.reschedDate : value.dateRequested) :value.dateRequested);
            let day2 = date2.getDate();
            let month2 = date2.getMonth();
            let year2 = date2.getFullYear();
        const dateRequested = monthNames[month2]+` ${day2} ${year2}`

    return(
        <>
                <tr  className="border-b dark:border-neutral-500 text-[18px]">
                                        <td className="whitespace-wrap break-word px-6 py-[12px] ">{showname? value.LRN : value.lastname+' '+value.firstname+' '+value.middlename }</td>
                                        <td className="whitespace-wrap break-word px-6 py-[12px] w-[30%]">{dateRequested}</td>
                                        <td className="whitespace-nowrap  flex flex-row justify-around items-center ">

            
                                            <Tooltip content="Details" placement="bottom" className='z-30 px-2 bg-blue-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>
                                            <div size={35} onClick={()=> details(value)}  className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                            </Tooltip>
{/*         
                                            <Tooltip content="details for ongoing" placement="bottom" className='z-30 px-2 bg-green-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                            <div  className='rounded-full p-2 bg-green-500 hover:bg-green-600 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                            </Tooltip>   */}
                                       
                                        </td>
                </tr>

                
        </>
    )
}

function Details({value,refresh,close,load}){
    const sugeested = value.reschedDate? true:false
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];

    const date2 = new Date(value.dateRequested);
      let day2 = date2.getDate();
      let month2 = date2.getMonth();
      let year2 = date2.getFullYear();
  const dateRequested = monthNames[month2]+` ${day2} ${year2}`



  const todaydate2 = new Date(value.dateRequested);
  var dd2 = todaydate2.getDate();
  var mm2 = todaydate2.getMonth()+1; 
  var yyyy2 = todaydate2.getFullYear();
  
  if(dd2<10) {dd2='0'+dd2} 
  if(mm2<10) { mm2='0'+mm2} 
  

  const dateRequest = `${yyyy2}-${mm2}-${dd2}`


    const todaydate = new Date();
    var dd = todaydate.getDate();
    var mm = todaydate.getMonth()+1; 
    var yyyy = todaydate.getFullYear();

    if(dd<10) {dd='0'+dd} 
    if(mm<10) { mm='0'+mm} 

    const datetoday =  `${yyyy}-${mm}-${dd}`


            
        const resched = async () =>{  
            if(!(availability.includes(JSON.parse(value.timeRequested).toString())) || (dateRequested < datetoday))
            return  Swal.fire({
                icon: 'error',
                title: 'Unavailable!',
                text:'The date or time is unavailable',
                showConfirmButton: false,
                timer: 1500
              })
          Swal.fire({
            title: 'Are you sure?',
                text: "Double check your inputss !",
                icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Im sure!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                load(true)
                try{
                    const response= await Axios.post(`http://localhost:3500/getEvents`,
                    {
                      content:value,
                      date:value.dateRequested,
                      request:'appointment'
                    })
                    setTimeout(()=>{
                        refresh('setSched')
                        close(false)
                    },1000)
                    
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
        }   
    

        const [scheduleAppointment,setscheduleAppointment] = useState(false) 


        const [availability,setavailability] = useState('') 

        const getAvailableTime = async () =>{
            try{
                const response= await Axios.get(`http://localhost:3500/availableCal/${value.dateRequested}`)
        
                  const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']
        
                  if(response.data[0]){
        
                    const dateUnava = response.data
                    
                    let text = [ ];
                    for (let i = 0; i < dateUnava.length; i++) {
                        text += dateUnava[i].setTime+ ','}
                  
                    //tira nalang
              
                    const filtereddb =  timeTochoosedb.filter((time)=> !text.includes(time))
                  
                    setavailability(filtereddb)
        
                  }else{
                    setavailability(timeTochoosedb)
                  }

                  setTimeout(()=>{
                    setloading(false)
                },1000)
        
              }catch (err){
                  console.log(err)
              }
           }

           useEffect(()=>{
            getAvailableTime()

           },[])

      
            const [eventSet,setEvent] = useState()

            const dateS = new Date(eventSet && eventSet.setDate);
            let dayS = dateS.getDate();
            let monthS = dateS.getMonth();
            let yearS = dateS.getFullYear();
             const dateRequesteS = monthNames[monthS]+` ${dayS} ${yearS}`
      
 

            const getdateTimeset = async () =>{
                try{
                    const response= await Axios.get(`http://localhost:3500/getEventID/${value.eventID}`)
                      setEvent(response.data[0])
                  }catch (err){
                      console.log(err)
                  }
            }
            useEffect( ()=>{
                getdateTimeset()
            },[])
            const [loading,setloading] = useState(true)
    return(
        <>
                {
                loading &&
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-25 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
                <div className='mt-10 bg-white rounded-md mx-6 font-[poppins] w-[700px] '>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] text-[25px] py-2 w-full m-auto justify-center items-center">
                                                            Appointment Details
                                                        </div>
                                                    </div>
                                    {/*body*/} 
                                                <div className=" relative px-6  flex flex-col overflow-auto h-[fit] max-h-[450px]" >
                                                    <div>
                                                        <div>Student name:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                               {value.lastname +' '+ value.firstname +' ' +value.middlename}
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col sm:flex-row'>
                                                        {value.status === 'pending'? 
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>Date Requested:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {dateRequested}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>Time Requested:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {(JSON.parse(value.timeRequested)).toString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>Date Set:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {eventSet? dateRequesteS:dateRequested}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>Time Set:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                        {eventSet? (JSON.parse( eventSet.setTime)).toString() :(JSON.parse(value.timeRequested)).toString()}
                                                                </div>
                                                            </div>
                                                        </div>}
                                                        <div className='w-1/2'>
                                                            <div>
                                                                <div>GRADE LEVEL:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                       {value.gradeLevel}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>STATUS:</div>
                                                                <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                                   {value.status}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>Reason:</div>
                                                        <textarea value={value.reason} readOnly className=' w-full h-[100px] my-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 break-words'>
                                                         
                                                        </textarea>
                                                        {value.reschedTime && value.status === 'canceled' &&<>
                                                        <div>Response:</div>
                                                        <textarea value={value.response} readOnly className=' w-full h-[100px] my-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 break-words'>
                                                         
                                                        </textarea></>}
                                                    </div>
                                                    
                                                </div>
                                    {/*footer*/}
                                    {value.status === 'pending' &&
                                    <div className="flex items-start justify-between border-t border-solid border-slate-200 rounded-t p-2">
                                          
                                        {sugeested ? <div className="text-center bg-green-500 hover:bg-green-600 w-full py-2 textS font-bold rounded-sm" >Waiting for student response on your suggested Date and TIme</div>:
                                        <>
                                        <div onClick={()=> resched()}  className="flex flex-row bg-green-500 hover:bg-green-600 cursor-pointer text-[white] text-[15px] py-2 w-full m-auto justify-center items-center">
                                            Accept
                                        </div>       
                                                
                                        <div onClick={()=> setscheduleAppointment(true)}  className="flex flex-row bg-blue-500 hover:bg-blue-600 cursor-pointer text-[white] text-[15px] py-2 w-full m-auto justify-center items-center">
                                            Suggest Date and Time
                                        </div>
                                        </>}
                                    </div>}
                     
                    </div>

                    <motion.div  className='z-50 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center px-2 items-center bg-black bg-opacity-50'
                        transition={{
                            type: "spring",
                            stiffness: 25
                        }}
                        animate={{
                            y: scheduleAppointment? 1000:0}}
                            >
                             <div onClick={(()=>setscheduleAppointment(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div>    
                            {scheduleAppointment && <Calendar close={setscheduleAppointment} close2={close} value={value} type={'appointment'} refresh={refresh} load={load}/>}         
                            {/* { showPis && 
                             <div>
                            
                            <Pis className='z-30 w-full' refresh={getPisContent}/>
                            </div>} */}
                        </motion.div>

                   
        </>
    )
}