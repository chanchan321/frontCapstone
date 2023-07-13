import React,{useState,useEffect} from 'react'
import communication from '../Picture/communication.svg'
import paper from '../Picture/paper.svg'
import conversation from '../Picture/conversation.svg'
import { useNavigate } from 'react-router-dom'
import logo from '../Picture/cabanganLogo.png'
import ReferralForm from '../MODALHOME/referralForm'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";



export default function LandingPage() {

    // const sendMessage = async () =>{

    //     try{
    //         const response= await fetch(`https://sms.teamssprogram.com/api/send?key=037810dc0c5d2417b617680bf6565c80cf0d717a&phone=+639156218108&message=awdfhfthfthfthfthftfhftawdwa`)
    //     //   const response= await fetch(`https://sms.teamssprogram.com/api/send`,
    //     //   {
    //     //     key:'037810dc0c5d2417b617680bf6565c80cf0d717a',
    //     //     phone:'+639461991211',
    //     //     message:'awdawdadawd',
    //     //     sim:2
    //     //   })


    //       console.log(response)
    //     }catch (err){
    //       if (!err?.response) {
    //         console.log(err)
    //       }
    //     }
    
    //   }

      useEffect(()=>{
        setTimeout(()=>{
            setloading(false)
        },2000)
      },[])

    const [loading,setloading] = useState(true)

    const navigate = useNavigate()

    const [referral,openreferralForm] = useState(false)

  return (
  <>
           
        <div >
            {
                loading?
                <>
                <div className='bg-gradient-to-br  from-blue-500 to-cyan-200 flex w-full h-[100vh] justify-center items-center text-center'>
                <PacmanLoader speedMultiplier={2}/>
                </div>
                </>
                :
                <>
                
           
            <div className=' bg-gradient-to-br from-blue-500 to-cyan-200 min-h-[100vh h-fit flex flex-col overflow-x-hidden' > 

                <div className='bg-white z-20 text-black px-2 sm:px-8 py-2 absolute top-0 w-full bg-opacity-0 flex flex-col sm:flex-row shadow-md justify-between items-center'>
                        <div className='flex flex-row items-center w-full sm:w-[360px] justify-around py-1 mx-4'>
                            <span><img src={logo} alt='logo' className='w-[40px] z-50 '/></span>
                            <div className='font-[poppins] font-bold text-[20px] text-white textS'>Cabangan High School </div>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <button className='bg-blue-500 px-6 rounded-md font-bold h-full text-white shadow-sm border-2 border-blue-300 hover:bg-blue-600 py-[4px] hover:scale-[1.1] transition-all ' onClick={()=> navigate('/login')}>LOG IN</button>
                        </div>
                </div>

             <div className='min-h-[100vh] h-fit flex flex-col justify-around sm:justify-around'>
          
                    <div className='text-white  font-bold textS break-words w-full sm:w-[460px] pt-32 sm:pt-20 text-center mx-auto text-[30px] md:text-[35px]'>WELCOME TO GUIDANCE MANAGEMENT AND COUNSELING SERVICES SYSTEM</div>
                            <div className='w-full flex flex-col md:flex-row justify-around items-center'>
                            
                                <div className='lg:mx-10 mb-10 w-fit bg-gradient-to-t from-blue-500 to-cyan-200 rounded-lg cursor-pointer hover:scale-[1.1] py-4 transition-all border-2 border-blue-300 shadow-md'>
                                    <img src = {conversation} alt='Teachers Referral' className='w-[100px] mx-auto'/>
                                    <div className='text-[20px] lg:text-[25px] w-[250px] sm:w-fit text-center textS font-bold '>Teachers' Counseling Referral </div>
                                </div> 

                                <div className='lg:mx-10 mb-10 w-[full] bg-gradient-to-t from-blue-500 to-cyan-200 rounded-lg cursor-pointer hover:scale-[1.1] py-4 transition-all border-2 border-blue-300 shadow-md'>
                                    <img src = {paper} alt='Teachers Referral' className='w-[100px] mx-auto'/>
                                    <div className='text-[20px] lg:text-[25px] w-[250px] sm:w-fit text-center textS font-bold '>Personal Information Sheeet </div>
                                </div>

                                <div className='lg:mx-10 mb-10 w-[full] bg-gradient-to-t from-blue-500 to-cyan-200 rounded-lg cursor-pointer hover:scale-[1.1] py-4 transition-all border-2 border-blue-300 shadow-md'>
                                    <img src = {communication} alt='Teachers Referral' className='w-[100px] mx-auto'/>
                                    <div className='text-[20px] lg:text-[25px] w-[250px] sm:w-fit text-center textS font-bold '>Counselling Appointment </div>
                                </div>
                                
                             </div>   
                        </div>

                </div>
            </>
            }
        </div>


            <motion.div  className='z-40 absolute top-0 left-0 h-[100vh] w-full sm:w-fit overflow-hidden flex justify-center items-start bg-black bg-opacity-50'
            transition={{
              type: "spring",
                stiffness: 30,
                duration: 1
                }}
            animate={{
            x: referral?  -0 : -1000 }}>
            {referral && 
                <div>
                <div onClick={(()=>openreferralForm(false))} className='text-white absolute top-0 left-0 z-50 flex  cursor-pointer bg-black rounded-full'><RxCross2 className='text-white' size={40}/></div> 
                <ReferralForm className='z-30 ' close={openreferralForm}/>
                </div>}
            </motion.div> 

        {/* blackbehind Appointment */}
        {referral &&  <div className="opacity-75 fixed inset-0 z-30 bg-black block"></div>}

  </>

  )
}
    