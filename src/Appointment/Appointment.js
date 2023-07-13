import React,{useEffect, useState} from 'react'
import {RxCross2} from 'react-icons/rx'
import StudeAddAppointment from './studeAddAppointment';
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStore from '../Store/store';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Appointment() {

    const cUser = useStore(state => state.cUser)

    //   const appointmentDetails = {
    //         reqID:'151ad23r22d2',
    //         studID:'2f325sd1542',
    //         dateRequested:'151ad23r22d2',
    //         timeRequested:['9am-10am,10am-11am'],
    //         reason:'The reason(s) for the patient event affecting the patients health and/ or well being.',
    //         status:'pending/accepted/complete',
    //         response:{
    //             resched:false,
    //             gcResponse:'The reason(s) for the patient requiring involvement with care professionals. These may include any problem,'
    //         }
    //   }

      ///MONTH NAME//
      const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
        ];


        const [reason,setreason] = useState(false)
        const [response,setresponse] = useState(false)
        const openBottom = (toOpen) =>{
            if(toOpen === 'details'){
                setreason(true)
                setresponse(false)
            }else if(toOpen === 'response'){
                setreason(false)
                setresponse(true)
            }
        }

        const [appointmentDetails,setappointmentDetails] = useState('')

        const [hasReq,setHasReq] = useState()

        const dateToday = new Date();
                    var dayT = dateToday.getDate();
                    var monthT = dateToday.getMonth() + 1;
                    var yearT = dateToday.getFullYear();
              
                    if(dayT<10) {dayT='0'+dayT} 
                    if(monthT<10) { monthT='0'+monthT} 
        const dateTodayNow = `${yearT}-${monthT}-${dayT}`

        const date = new Date(appointmentDetails.dateRequested);
                    let day = date.getDate();
                    let month = date.getMonth();
                    let year = date.getFullYear();
        const dateRequested = monthNames[month]+` ${day} ${year}`

        const [hasResponse,sethasResponse] = useState()

        const dateSug = new Date(hasResponse && hasResponse.reschedDate && hasResponse.reschedDate);
            let daysug = dateSug.getDate();
            let monthsug = dateSug.getMonth();
            let yearsug = dateSug.getFullYear();
        const datesuggested = monthNames[monthsug]+` ${daysug} ${yearsug}`

      
        const getAppointmentReq = async (ress) =>{
            try{
                const response= await Axios.get(`http://localhost:3500/appointment/${cUser.LRN}`)

                  if(!response)
                  return Swal.fire({
                    icon: 'error',
                    title: 'server error',
                    showConfirmButton: false,
                    timer: 1000
                  })
                setTimeout(()=>{
                  
                    setappointmentDetails(response.data)
                    setHasReq(response.data ? true:false)


                    sethasResponse(response.data.response ?
                        {
                            response:response.data.response,
                            reschedTime:response.data.reschedTime,
                            reschedDate:response.data.reschedDate
                        }
                        
                        :false)
                        
                          setloading(false)
                        if(ress === 'cancel')
                          return Swal.fire({
                            icon: 'success',
                            title: 'Removed',
                            showConfirmButton: false,
                            timer: 1000
                          })
                        if(ress === 'accept')
                          return  Swal.fire({
                            icon: 'success',
                            title: 'Event rescheduled!',
                            text:'Comeback within 24hours to see Response and Pls input your ContactNumber in Account details!',
                            showConfirmButton: true,
                            timer: 1500
                          })
                        if(ress === 'add')
                          return   Swal.fire({
                            icon: 'success',
                            title: 'Request Sent!',
                            showConfirmButton: false,
                            timer: 1500
                          })

                      },2000)
                }catch (err){
                    console.log(err.response)
              }
             }
            useEffect(()=>{
                getAppointmentReq();
            },[])

            
        const cancelReq = async () => {
              Swal.fire({
                title: 'Are you sure?',
                text: "This action will terminate your request!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!'
              }).then( async (result) => {
                if (result.isConfirmed) {
                  setloading(true)
                    try{
                        const response= await Axios.patch(`http://localhost:3500/appointment`,
                        {
                          content:appointmentDetails,
                          date:'value.dateStr',
                          request:'cancel',
                          message:'message'
                        })

                            try{
                              const response= await Axios.post(`http://localhost:3500/notification`,{
                                  type:'Counseling',
                                  message:`A student w/ ${appointmentDetails.studLrn} LRN canceled his/her appointment`,
                                  status:'unread'
                              })
                              if(response.data === '404 Not Found') { 
                                      console.log(' no notification')
                              }
                                  if(response.data){
                                    getAppointmentReq('cancel')
                                  }
              
                            }catch (err){
                              if (!err?.response) {
                                console.log(err)
                              }
                            }
                            
                      }catch (err){
                        if (err?.response) {
                          console.log(err.message)
                        }
                      }


                }
              })
        }
        const accept = async () =>{  
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
              setloading(true)
                try{
                    const response= await Axios.post(`http://localhost:3500/getEvents`,
                    {
                      content:appointmentDetails,
                      date:appointmentDetails.reschedDate,
                      request:'appointment'
                    })
                    if(response.data){
                      getAppointmentReq('accept')
                    }
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
        }   

        const remove = async () =>{  
          console.log(appointmentDetails.LRN)
            // Swal.fire({
            //   title: 'Are you sure?',
            //   text: "This action will remove the requesxt !",
            //   icon: 'warning',
            //   showCancelButton: true,
            //   confirmButtonColor: '#3085d6',
            //   cancelButtonColor: '#d33',
            //   confirmButtonText: 'Yes, Im sure!'
            // }).then( async (result) => {
            //   if (result.isConfirmed) {
            //       try{
            //           const response= await Axios.delete(`http://localhost:3500/appointment/${appointmentDetails.requestID}`)
            //           getAppointmentReq()
            //           setresponse(false)
            //              Swal.fire({
            //                 icon: 'success',
            //                 title: 'Removed !',
            //                 showConfirmButton: false,
            //                 timer: 1500
            //               })
                          
            //         }catch (err){
            //           if (!err?.response) {
            //             console.log(err)
            //           }
            //         }
            //   }
            // })
            Swal.fire({
              title: 'Are you sure?',
              text: "This action will terminate your request!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, remove it!'
            }).then( async (result) => {
              setloading(true)
              if (result.isConfirmed) {
                  try{
                      const response= await Axios.patch(`http://localhost:3500/appointment`,
                      {
                        content:appointmentDetails,
                        date:'value.dateStr',
                        request:'cancel',
                        message:'message'
                      })
                              try{
                                const response= await Axios.post(`http://localhost:3500/notification`,{
                                    type:'Counseling',
                                    message:`A student w/ ${appointmentDetails.studLrn} LRN canceled his/her appointment`,
                                    status:'unread'
                                })
                                if(response.data === '404 Not Found') { 
                                        console.log(' no notification')
                                }
                                    if(response.data){
                                      setresponse(false)
                                      getAppointmentReq('cancel')
                                    }
                
                              }catch (err){
                                if (!err?.response) {
                                  console.log(err)
                                }
                              }

                    }catch (err){
                      if (err?.response) {
                        console.log(err.message)
                      }
                    }
              }
            })
          }   
             
          const [loading,setloading] = useState(true)

            
  return (
    <>
   
            {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
                
    <div className='w-full min-w-[320px] h-[100vh] sm:flex flex-col sm:flex-row overflow-y-auto overflow-x-auto' >
        {/* /////calendar */}
      
       
        <div className=' h-fit  flex flex-col flex-wrap justify-center items-center  my-10 '>

                          <div className='flex flex-col justify-center items-center rounded-md bg-white p-2' >

                  <p className='textS text-[25px] text-black' > Appointment Request</p>
                  <hr className='w-full sm:w-[370px] my-4 border-black'></hr>



                  {hasReq?
                  <>
                      <div onClick={()=> openBottom('details')} className='bg-green-600 hover:bg-green-700 cursor-pointer shadow-sm shadow-black text-white px-4 rounded-md'>View Details</div>
                      <p>
                          <span className='text-black font-bold text-[16px] font-[poppins]'>When:{' '}<span className='text-red-500'>{appointmentDetails.status === 'ongoing'? dateRequested:'-------'}</span></span> 
                          <span className='text-red-500 font-bold text-[16px] font-[poppins]'>{}</span>
                      </p>
                      <p>
                          <span className='text-black font-bold text-[16px] font-[poppins]'>Time:{' '}<span className='text-red-500'>{appointmentDetails.status === 'ongoing'? appointmentDetails.timeRequested:'-------'}</span></span> 
                          <span className='text-red-500 font-bold text-[16px] font-[poppins]'>{}</span>
                      </p>
                      <p>
                          <span className='text-black font-bold text-[16px] font-[poppins]'>Status:{' '}<span className='text-red-500'>{appointmentDetails.status}</span> </span> 
                          <span className='text-red-500 font-bold text-[16px] font-[poppins]'>{}</span>
                      </p>
                      {appointmentDetails && appointmentDetails.dateRequested > dateTodayNow ? 
                      <div onClick={()=> cancelReq()} className='bg-red-600 hover:bg-red-700 text-white px-4 cursor-pointer shadow-sm shadow-black rounded-md'>CANCEL</div>
                      :<div className='bg-red-600 hover:bg-red-700 text-white px-4 cursor-pointer shadow-sm shadow-black rounded-md'>Being process....</div>}
                      
                      <div onClick={()=> openBottom('response')} className='bg-blue-600 hover:bg-blue-700 text-white px-10 my-2 cursor-pointer shadow-sm shadow-black rounded-md'>View RESPONSE</div>
                  </>
                  :
                  <>  
                      <p className='textS text-[20px] sm:text-[25px] text-black' >NO PENDING REQUEST....</p>
                      <p className='text-[13px] sm:text-[18px] text-black text-center word-break w-full sm:w-[380px]' >
                          {'" Click to specific date in the calendar above to make a request "'}
                      </p>
                      <div className=' text-[13px] sm:text-[18px] text-black text-center word-break w-full sm:w-[380px]'>
                        <span className='text-red-500 font-bold'>NOTE:</span>
                          'You cant choose past dates'
                          <div className='flex flex-row'>
                                 <p>The Time shown in each date is the occupied Time!</p>
                          </div>
                          <div>{`->Click the number of the date or the white space inside the date<-`}</div>
                      </div>
                  </>}
                  </div>


           {/* View Response */}
  {response &&
            <div className='relative bg-white w-full sm:w-[380px] h-[stretch] my-2 flex flex-col justify-center items-center py-2'>
                <div onClick={(()=>setresponse(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
                <p className='textS text-[25px] text-black' >Response</p>

                <hr className='w-full sm:w-[370px] my-4 border-black'></hr>

                {appointmentDetails.status === 'ongoing' && 
                <div className='text-center bg-green-600 hover:bg-green-700 text-white px-10 my-2 cursor-pointer shadow-sm shadow-black rounded-md'>ACCEPTED</div>}

                {hasResponse? 
                //* true? *//
                <>
                    <div className='text-center flex flex-wrap break-all'>{hasResponse.response}</div>
                </>
                :
                <>
                    <div className='text-center flex flex-wrap'>No Respone Yet...</div>
                </>}
              
                {hasResponse && hasResponse.reschedTime && hasResponse.reschedDate?
                 //* true? *//
                    <>
                        <p>
                            <span className='text-black font-bold text-[16px] font-[poppins]'>Date suggested:{' '}<span className='text-red-500'>{datesuggested}</span></span>
                        </p>
                        <p>
                            <span className='text-black font-bold text-[16px] font-[poppins]'>Time suggested:{' '}<span className='text-red-500'>{hasResponse.reschedTime}</span></span>
                        </p>
                        {!(appointmentDetails.status === 'ongoing') && 
                        <div className='w-full flex flex-row justify-between'>
                            <div onClick={()=> remove()} className='bg-red-600 hover:bg-red-700 text-white px-10 my-2 cursor-pointer shadow-sm shadow-black rounded-md'>Decline</div>
                            <div onClick={()=> accept()} className='bg-blue-600 hover:bg-blue-700 text-white px-10 my-2 cursor-pointer shadow-sm shadow-black rounded-md'>Accept</div>
                        </div>}
                    </>:'' }
                    

            </div>}




                        {/* REASON */}
            {reason &&
            <div className='relative bg-white w-full sm:w-[380px] h-[stretch] my-2 flex flex-col justify-center items-center py-2'>
                <div onClick={(()=>setreason(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
                {/* {!(appointmentDetails.status === 'ongoing') && <> */}
                {!(hasResponse.reschedDate) && <>
                    <p>
                        <span className='text-black font-bold text-[16px] font-[poppins]'>Date requested:{' '}<span className='text-red-500'>{dateRequested}</span></span> 
                    </p>
                    <p>
                        <span className='text-black font-bold text-[16px] font-[poppins]'>Time requested:{' '}<span className='text-red-500'>{appointmentDetails.timeRequested}</span></span> 
                    </p>
                    <hr className='w-full sm:w-[370px] my-4 border-black'></hr>
                    </>}

                    
                    <p className='textS text-[25px] text-black'>Reason</p>
              
                <div className='text-center flex flex-wrap break-all'>{appointmentDetails.reason}</div>
            </div>}

               

        </div>

        <StudeAddAppointment haverequest={hasReq} refresh={getAppointmentReq} appointmentD={appointmentDetails} load={setloading}/>
    </div>

   
   
    </>
  )
}
