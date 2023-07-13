import React,{useEffect, useState} from 'react'
import communication from '../Picture/communication.svg'
import conversation from '../Picture/conversation.svg'
import RefferalReq from './Request/RefferalReq'
import AppointmentReq from './Request/AppointmentReq'
import {RxCross2} from 'react-icons/rx'
import { motion } from "framer-motion"

export default function Two() {


  const [openReferral,setopenReferral] = useState(false)
  const [openAppoinment,setopenAppoinment] = useState(false)

  

  return (
    <>
    <div className='flex flex-col '>
          <div className='flex flex-row w-full justify-center'>
              {/* CALENDAR */}
              <div onClick={(()=>setopenReferral(true))} 
              className='flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 rounded-lg hover:scale-105 transition-all shadow-md shadow-black hover:shadow-xl hover:shadow-black border-2 border-blue-200 cursor-pointer'>
                <img src= {conversation} alt='referral' className='w-[40%]   '/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Teachers' Referral Reqeust</p></div>
              </div>
              {/* PIS */}  
              <div onClick={(()=>setopenAppoinment(true))} 
                className=' flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 rounded-lg hover:scale-105 transition-all shadow-md shadow-black hover:shadow-xl hover:shadow-black border-2 border-blue-200 cursor-pointer'>
                  <img src= {communication} alt='appointment' className='w-[40%] '/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Counselling Appointment Reqeust</p></div>
                </div>
          </div>
     </div>




             {/* referral */}      
             <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-25'
          transition={{
            type: "spring",
            stiffness: 25
          }}
          animate={{
                y: openReferral? 1000:0}}
                >
                { openReferral && 
            <div>
                <div onClick={(()=>setopenReferral(false))} className='text-white absolute top-0  left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div> 
                <RefferalReq  close={setopenReferral}/>
            </div>}
           </motion.div>

        {/*blackbehind  referral */}
        {/* {openReferral &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}



                     {/* Appointment */}      
        <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-25'
          transition={{
            type: "spring",
            stiffness: 25
          }}
          animate={{
                y: openAppoinment? 1000:0}}
                >
                { openAppoinment && 
            <div>
                <div onClick={(()=>setopenAppoinment(false))} className='text-white absolute top-0 left-0 z-10 cursor-pointer'><RxCross2 size={40}/></div> 
                <AppointmentReq  className='z-30 w-full' />
            </div>}
           </motion.div>

        {/*blackbehind  Appointment */}
        {/* {openAppoinment &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}
    </>
  )
}
