import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import { Tooltip, Button } from "@material-tailwind/react";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2, RxValueNone} from 'react-icons/rx'
import Calendar from './calendar';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function RefferalReq({close}) {



    const [referrals,setreferrals] = useState()
    const [tofilter,settofilter]= useState([])
    const [tofilterStatus,settofilterStatus]= useState('pending') 

    const getallRequest = async (ress)=>{
        try{
            const response= await Axios.get(`http://localhost:3500/referral`)
            
                    setTimeout(()=>{
                        setreferrals(response.data.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
                        settofilter(response.data)
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
        getallRequest()
      },[])

      const details = (value) =>{
        setreferraldetails(value)
        setshowreferraldetails(true)
    }
    const [showreferraldetails,setshowreferraldetails] = useState(false)
    const [referraldetails,setreferraldetails] = useState('')

      const [tofilterSearch,settofilterSearch]= useState('') 

      const filterstud = (e)=>{
        settofilterSearch(e)

        if(e) return setreferrals(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) )
                    .filter((referral)=>(referral.teacherName.toLowerCase() + referral.employeeID.toLowerCase()).includes(e)))
        
         setreferrals(tofilter.filter((referral)=> (referral.status.includes(tofilterStatus)) ))
        
      }

      const filterStatus = (e)=>{
            settofilterStatus(e)
            setreferrals(tofilter.filter((referral)=> (referral.status.toLowerCase()).includes(e)))
            settofilterSearch('')
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
        <div className='w-full p-2 h-[80vh] overflow-auto bg-white rounded-md z-30 '>
                <div className='flex flex-col md:flex-row w-full justify-between px-2 py-2'>
                        <p className='text-[25px]  font-[poppins] text-black font-bold'>Teachers' Referral Request</p>
                        <div className='flex flex-col max-w-[300px] lg:flex-row'>
                                <select name="status" onChange={(e)=> filterStatus(e.target.value)} className='h-full mx-2 rounded-md text-center'>
                                    <option value="pending">Pending</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="done">Done</option>
                                </select>
                            <input type='text' onChange={(e)=> filterstud(e.target.value)} value={tofilterSearch} placeholder='Search Name of teacher' className='w-[300px] shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'></input>
                        </div>
                    </div>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                   
                            <thead className='border-b font-medium dark:border-neutral-500 '>
                                <tr className='font-bold'>
                                    <th scope="col" className="px-6 py-[12px]">Teacher name</th>
                                    <th scope="col" className="px-6 py-[12px]">{tofilterStatus === 'pending' ?'Date of reqeust':'Date of event'}</th>
                                    <th scope="col" className="px-6 py-[12px]">Records</th>
                                </tr>
                            </thead>
                            {referrals && !referrals[0]? 
                                <tbody>
                                    <tr>
                                        <td className='text-[30px] py-2'>NO REQUEST</td>
                                    </tr>
                                </tbody>
                                :<>
                            <tbody >
                            {referrals && referrals.map((value,index)=>{
                                    return <ReferralList key={index} value={value} refresh={getallRequest} filter={tofilterStatus} details={details}/>
                                })}
                            </tbody></>}
                    </table>
            </div>
                

            <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full flex justify-center sm:p-10 items-center bg-black bg-opacity-50 overflow-auto'
                    transition={{
                        type: "spring",
                        stiffness: 25
                    }}
                    animate={{
                        y: showreferraldetails?  1000 : 0 }}>
                        {showreferraldetails && 
                            <div>
                            <div onClick={(()=>setshowreferraldetails(false))} className='z-50 text-white absolute top-0 left-0 cursor-pointer'><RxCross2 className='text-white' size={40}/></div> 
                                    <Details value={referraldetails} refresh={getallRequest} close={setshowreferraldetails} load={setloading}/>
                            </div>}
                          
                </motion.div>     
           
    </>
  )
}

function ReferralList({value,refresh,filter,details}) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(value.dateOfReferral);
                  let day = date.getDate();
                  let month = date.getMonth();
                  let year = date.getFullYear();
      const dateRequested = monthNames[month]+` ${day} ${year}`

      
      const [referraldetails,setreferraldetails] = useState(false)
      const [referralReply,setreferralReply] = useState(false)


      const getEventAppointment = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${'Referral'}`)
          settimeANDdate(response.data)
        }catch (err){   
            console.log(err)
          
        }
    }
          useEffect(()=>{
                if(value.eventID){
                    getEventAppointment()
                }
          },[])

    const [timeANDdate,settimeANDdate] = useState('')

    const dateE = new Date(timeANDdate.setDate);
    let dayE = dateE.getDate();
    let monthE = dateE.getMonth();
    let yearE = dateE.getFullYear();
    const dateOfevent = monthNames[monthE]+` ${dayE} ${yearE}`

    return(
        <>
                <tr  className="border-b dark:border-neutral-500 text-[18px]">
                                        <td className="whitespace-wrap break-word px-6 py-[12px]">{value.teacherName}</td>
                                        <td className="whitespace-wrap break-word px-6 py-[12px]">{filter === 'pending'?dateRequested:dateOfevent}</td>
                                        <td className="whitespace-nowrap  flex flex-row justify-around items-center ">

                                            <Tooltip content="Details" placement="bottom" className='z-30 px-2 bg-blue-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>
                                            <div onClick={()=> details(value)}  className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                            </Tooltip>
        
                                            <Tooltip content="Reply" placement="bottom" className='z-30 px-2 bg-green-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                            <div onClick={()=> setreferralReply(true)}  className='rounded-full p-2 bg-green-500 hover:bg-green-600 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                            </Tooltip>  
                                            {/* <Tooltip content="Print" placement="bottom" className='z-30 px-2 bg-red-600 '
                                                                animate={{
                                                                mount: { scale: 1.5, y: 10,  x:1 },
                                                                unmount: { scale: 0, y: 0, x:0 },
                                                                }}>            
                                            <div  className='rounded-full p-2 bg-red-500 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                            </Tooltip>  */}
                                        </td>
                </tr>
{/* 
                <motion.tr  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
                    transition={{
                        type: "spring",
                        stiffness: 25
                    }}
                    animate={{
                        y: referraldetails?  1000 : 0 }}>
                        {referraldetails && 
                            <td>
                            <div onClick={(()=>setreferraldetails(false))} className='z-50 text-white absolute top-0 left-0 cursor-pointer'><RxCross2 className='text-white' size={40}/></div> 
                                    <Details value={value} refresh={refresh} />
                            </td>}
                          
                </motion.tr>                                      */}



                <motion.tr  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
                    transition={{
                        type: "spring",
                        stiffness: 25
                    }}
                    animate={{
                        y: referralReply?  1000 : -0 }}>
                        {referralReply && 
                            <td>
                            <div onClick={(()=>setreferralReply(false))} className='z-50 text-white absolute top-0 left-0 cursor-pointer'><RxCross2 className='text-white' size={40}/></div> 
                                    <Reply value={value} date={dateRequested}/>
                            </td>}
                          
                </motion.tr>                                     
                
        </>
    )
}
function Details({value,refresh,load,close}){

    const [scheduleReferral,setscheduleReferral] = useState(false)      
    const getEventAppointment = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${'Referral'}`)
          settimeANDdate(response.data)
                setTimeout(()=>{
                    setloading(false)
                },1500)
          
        }catch (err){   
            console.log(err)
          
        }
    }
          useEffect(()=>{
                if(value.eventID){
                 getEventAppointment()
                }
                setTimeout(()=>{
                    setloading(false)
                },1500)
          },[])
    const [timeANDdate,settimeANDdate] = useState('')

    const monthNames = ["January", "February", "March", "April", "May", "June" ,
    "July", "August", "September", "October", "November", "December"
      ];
      const date = new Date(timeANDdate && timeANDdate.setDate);
                  let day = date.getDate();
                  let month = date.getMonth();
                  let year = date.getFullYear();
      const dateRequested = monthNames[month]+` ${day} ${year}`

      const [loading,setloading] = useState(true)


    return(
        <>
        {
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-0 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :<>
                <div className=' mx-auto bg-white rounded-md w-fit h-[500px] overflow-auto'>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] text-[25px] py-2 w-full m-auto justify-center items-center">
                                                            Referral Details
                                                        </div>
                                                    </div>
                                    {/*body*/} 
                                                <div className=" relative px-6  flex flex-col ">


                                                <div className='flex flex-col md:flex-row justify-start pt-2 w-[700px] items-center '>   
                                                {value.status === 'pending'? <>
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Employee ID:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.employeeID}</div>
                                                    </div>  

                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Referred by:</div>
                                                        <div className='mx-2 w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.teacherName}</div>
                                                    </div></>
                                                    :
                                                    <>
                                                     <div className='mb-2 text-[18px]' >
                                                        <div>Date scheduled:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{dateRequested}</div>
                                                    </div>  

                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Time scheduled:</div>
                                                        <div className='mx-2 w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{timeANDdate && JSON.parse(timeANDdate.setTime)}</div>
                                                    </div>
                                                </>}  
                                               
                                                  </div> 
                                                  <div className='flex flex-col md:flex-row justify-start w-[700px] items-center'>   
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Contact Number:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.teacherContactNum}</div>
                                                   
                                                    </div>  
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Designation:</div>
                                                        <div className='mx-2 w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.designation}</div>
                                                   
                                                    </div>  
                                               
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-start  w-[700px]  '>   
                                                
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Name of Student:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.nameOfStudent}</div>
                                                   
                                                    </div>  
                                                    <div className='flex flex-col mx-2 text-[18px]'>
                                                      <label className='text-[18px]'>Grade Level</label>
                                                      <div className=' w-[50px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.gradeLevel}</div>
                                                   
                                                        </div>
                                                        <div className='flex flex-col mx-2'> 
                                                          <label className='text-[18px]'>Gender</label>
                                                          <div className=' w-[150px] text-[18px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.gender}</div>
                                                   
                                                        </div>   
                                                     </div> 
                                                     <div className='flex flex-col md:flex-row justify-start w-[700px] items-center'>   
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Parent/Guardian Name:</div>
                                                        <div className=' w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.parentName}</div>
                                                        
                                                    </div>  
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Parent/Guardian Contact #:</div>
                                                        <div className=' mx-2 w-[300px] py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>{value.parentContactNum}</div>
                                                    </div>  
                                               
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-between w-[700px]'>   
                                  {/* Date of Referral: */}
                                                    <div className='mb-2 text-[18px] mx-2 flex flex-row'>
                                                        <div>Did the student agree to be referred to GCO?:</div>
                                                          <div><input type='radio'  className='w-[20px] h-[20px]'
                                                              name="referred"
                                                              readOnly
                                                              checked={'yes'===value.agreeToCounsel}
                                                              /> <span>Yes</span> </div>
                                                        <div><input type='radio' className='w-[20px] h-[20px]'
                                                            name="referred"
                                                            readOnly
                                                            checked={'no'===value.agreeToCounsel}
                                                            /> <span>No</span> </div>
                                                    </div>  
                                                     
                                                    </div>   

                                                  <div className='flex flex-col md:flex-row justify-between w-[700px]'>   
                                                
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Reason for Referral:</div>
                                                        <textarea type='text' readOnly value={value.reasonforReferral} className=' w-[340px] h-[150px] max-h-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        ></textarea>
                                                    </div>  
                                                    <div className='mb-2 text-[18px] mx-2'>
                                                        <div>Initial Actions Taken:</div>
                                                        <textarea type='text' readOnly value={value.initialActions} className=' w-[340px] h-[150px] max-h-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        ></textarea>
                                                        </div>  
                                                  </div>   

                                                  {value.status === 'pending' &&
                                    <div className="flex sticky w-full bottom-0 items-start justify-between border-t border-solid bg-white border-white rounded-t py-2">
                                              
                                                
                                         <div onClick={()=> setscheduleReferral(true)} className="flex flex-row bg-green-500 hover:bg-green-600 cursor-pointer text-[white]  border-white text-[15px] py-2 w-full m-auto justify-center items-center">
                                            Set Date
                                        </div>
                                    </div>}
                                                
                                                    
                                                </div>
                                    {/*footer*/}
                                  
                     
                      </div>
                      </>}
                      <motion.div  className='z-50 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center px-2 items-center bg-black bg-opacity-50'
                        transition={{
                            type: "spring",
                            stiffness: 25
                        }}
                        animate={{
                            y: scheduleReferral? 1000:0}}
                            >
                             <div onClick={(()=>setscheduleReferral(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div>    
                            {scheduleReferral && <Calendar close={setscheduleReferral} value={value} type={'referral'} refresh={refresh} load={load} clos2={close}/>}         
            
                        </motion.div>

        </>
    )
}
function Reply({value,date}){

    return(
        <>
            
                <div className='mt-10 bg-white rounded-md mx-6'>
                                    
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] text-[25px] py-2 w-full m-auto justify-center items-center">
                                                            Acknowledgement Form
                                                        </div>
                                    </div>
                                   
                                    <div className=" relative px-6  flex flex-col">
                                        <div className='flex flex-col justify-start pt-2 w-[700px] items-center'> 

                                            <div className='flex flex-col sm:flex-row'>
                                                <div className='mb-2 text-[15px]' >
                                                        <div>{'To:(Referring person/Unit)'}</div>
                                                        <input type='text' readOnly value={value.teacherName} className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div> 
                                                <div className='mb-2 text-[15px]' >
                                                        <div>Designation/Department</div>
                                                        <input type='text' readOnly value={value.designation} className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div>   
                                            </div>

                                            <div className='flex flex-col sm:flex-row'>
                                                <div className='mb-2 text-[15px]' >
                                                        <div>This is to confirm that</div>
                                                        <input type='text' readOnly value={value.nameOfStudent} className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div>   
                                                <div className='mb-2 text-[15px]' >
                                                        <div>whom you referred to us on</div>
                                                        <input type='text' readOnly value={date} className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div>
                                            </div>

                                            <div className='flex flex-col sm:flex-row'>
                                                <div className='mb-2 text-[15px]' >
                                                        <div>had started his/her session on</div>
                                                        <input type='text' className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div>
                                                <div className='mb-2 text-[15px]' >
                                                        <div>and is being attended by</div>
                                                        <input type='text' className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                </div>
                                            </div>
                                            <div className='w-full border-t-2 border-solid border-black'>
                                                <div className='text-center text-[18px] py-1'>Refer to the Checklist below</div>
                                                <div className='w-full flex flex-row'>
                                                    <div className=' w-1/2'>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Close at intake Interview</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>For Counselling</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Counselling sessions are on-going</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Parent/Guardian Conference conducted</p>
                                                        </div>
                                                    </div>
                                                    <div className=' w-1/2'>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Session - Complete/Terminated</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Student did not show up</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Under Monitoring</p>
                                                        </div>
                                                        <div className='flex flex-row text-[18px] py-2 '>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1 w-[250px]'>Number of Follow-ups made by the Counselor</p>
                                                            <input type='text' className='w-[40px] border-2 border-black px-2'></input>
                                                        </div>
                                                    </div>
                                                </div>
                                                    <div className='flex flex-row text-[18px] items-center py-2'>
                                                            <input type='checkbox' className='w-[15px]'></input>
                                                            <p className='mx-1'>Referred to:</p>
                                                            <input type='text' className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                        </div>
                                                    <div className='flex flex-col text-[18px] items-center py-2'>
                                                            <p className='mx-1'>Attending Guidace Counselor:</p>
                                                            <input type='text' className='py-1 w-[350px] mx-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            ></input>
                                                    </div>

                                            </div>

                                        </div>   
                                                
                                                    
                                    </div>
                                    <div className="flex items-start justify-between border-t border-solid border-slate-200 rounded-t p-2">
                                                {value.status === 'done' ? '':<>
                                                
                                                        {/* <div  className="flex flex-row bg-green-500 hover:bg-green-600 cursor-pointer text-[white] text-[15px] py-2 w-full m-auto justify-center items-center">
                                                            Set Date
                                                        </div> */}
                                                        <div  className="flex flex-row bg-blue-500  hover:bg-blue-600 cursor-pointer text-white text-[15px] py-2 w-full m-auto justify-center items-center">
                                                            Notify Teacher
                                                        </div></>}
                                    </div>
                            
                     
                 </div>
        </>
    )
}
