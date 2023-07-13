import React,{useEffect, useState} from 'react'
import logo from './Picture/cabanganLogo.png'
import Pis from './PIS/Pis'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import useStore from './Store/store';
import Axios from 'axios';
import Swal from 'sweetalert2'

import paper from './Picture/paper.svg'
import communication from './Picture/communication.svg'
import {VscAccount} from "react-icons/vsc"
import AccountModal from './MODALHOME/accountModal'

import Appointment from './Appointment/Appointment'

export default function Home() {

  const [showPis,setShowPis] = useState(false)
  const [showappointment,setShowappointment] = useState(false)
  const [shownotif,setshownotif] = useState(false)

  const cUser = useStore(state => state.cUser)
  const id= cUser.accountID

  const getPisContent = async ()=>{
    try{
        const response= await Axios.get(`http://localhost:3500/pis/${id}`)
        if(response.data === '404 Not Found') { 
          return  Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'NO RESPONSE'
            })
        }
       
        if(!(response.data.pis.statusComp === 'complete')){
          Swal.fire({
            icon: 'warning',
            title: 'Reminder',
            text: 'Please COMPLETE your P.I.S soon as possible!!'
          })
        }
        
      }catch (err){
        if (!err?.response) {
          console.log(err)
        }
      }
  }

  
  useEffect(()=>{
    getPisContent();
  },[])

  const [openAcc,setopenAcc] = useState(false)

  return (
    <>
           
    <div className=' bg-gradient-to-b from-blue-500 via-white to-blue-500 min-h-[100vh] h-[100vh] w-full flex flex-col justify-center relative items-center overflow-hidden' > 
        <div className=' w-full z-10 text-black px-8 py-2 fixed top-1 bg-opacity-0 flex flex-row justify-between bg-black shadow-md'>
                <img src={logo} alt='logo' className='w-[60px] z-50  block sm:hidden'/>
                <div className='hidden sm:flex flex-row items-center w-[350px] justify-around'><span><img src={logo} alt='logo' className='w-[50px] z-50'/></span>
                  <div className='font-[poppins] font-bold text-[20px] text-white textS '>Cabangan High School </div>
                </div>        
              <div className='flex flex-row items-center justify-around'>
                {/* <div  onClick={()=>setshownotif(true)}
                   className='flex flex-col justify-center items-center m-2 rounded-lg hover:scale-125 transition-all  cursor-pointer'>
                  <IoNotificationsOutline size={40}/>
                </div> */}
                <div  onClick={()=>setopenAcc(true)}
                   className='flex flex-col justify-center items-center m-2 rounded-lg hover:scale-125 transition-all  cursor-pointer'>
                  <VscAccount size={40}/>
                </div>
              </div>  
        </div>  
      
        <div className='flex flex-col w-full'>
          <div className='flex flex-row w-full justify-center'>
              {/* CALENDAR */}
              <div onClick={(()=>setShowappointment(true))} 
              className='flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-gradient-to-t from-blue-500 to-cyan-200  m-2 rounded-lg hover:scale-105 transition-all shadow-md shadow-black hover:shadow-xl hover:shadow-black border-2 border-blue-200 cursor-pointer'>
                <img src= {communication} alt='PIS' className='w-[40%] hover:scale-[1.3] transition-all  '/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Counselling Appointment</p></div>
              </div>
              {/* PIS */}  
              <div onClick={(()=>setShowPis(true))} 
                className=' flex flex-col justify-center items-center w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 rounded-lg hover:scale-105 transition-all shadow-md shadow-black hover:shadow-xl hover:shadow-black border-2 border-blue-200  cursor-pointer'>
                  <img src= {paper} alt='PIS' className='w-[40%] hover:scale-[1.3] transition-all  '/>
                <div><p className='break-words text-center font-[poppins] font-bold text-[18px] textS'>Personal Information Sheet</p></div>
                </div>
          </div>
        </div>


        {/* Notification */}      
        {/* <motion.div  className='z-20 absolute top-0 right-[-1000px] h-[100vh] w-full sm:w-fit flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
          transition={{
            type: "spring",
            stiffness: 40,
          }}
          animate={{
            x: shownotif? -1000:0}}
            >
             { shownotif && 
          <div>
            <div onClick={(()=>setshownotif(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
            <Notification className='z-30 w-full'/>
          </div>}
        </motion.div> */}

      {/* blackbehind Notification */}
      {shownotif &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>}




      {/* PIS */}      
        <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 30
          }}
          animate={{
            y: showPis? 1000:0}}
            >
             { showPis && 
          <div>
            <div onClick={(()=>setShowPis(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
            <Pis className='z-30 w-full' close={setShowPis}/>
          </div>}
        </motion.div>

      {/* blackbehind PIS */}
      {/* {showPis &&  <div  className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}

          {/* ACCOUNT */}   
      {openAcc && <AccountModal close={setopenAcc} /> }     

    
      {/* Appointment */}      
      <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-fit sm:h-[100vh] w-full sm:flex justify-center sm:p-10 items-center bg-black bg-opacity-75 overflow-auto'
          transition={{
            type: "spring",
            stiffness: 30
            }}
          animate={{
          y: showappointment?  1000:0}}>
          {showappointment && 
            <div>
              <div onClick={(()=>setShowappointment(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
              <Appointment className='z-30 w-full'/>
            </div>}
        </motion.div> 

    {/* blackbehind Appointment */}
      {/* {showappointment &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}



  </div>
</>
  )
}
