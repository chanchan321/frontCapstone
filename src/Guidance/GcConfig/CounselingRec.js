import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Crecords from './Crecords';

export default function CounselingRec({close}) {
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
      const todayD =  `${yyyy}-${mm}-${dd}`

      const [display,setdisplay] = useState([])

      const getCounselingRec = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getCounselingRec`)
            console.log(response.data)
            const datas = ((response.data).filter((value)=>  value.setDate < todayD ))
            setdisplay(datas)
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
     
    useEffect(()=>{
       getCounselingRec()
    },[])


      const [history,sethistory] = useState(false)


  return (
    <>
    <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
    {/*content*/}
                
                <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                  variants={container}
                  initial="hidden"
                  animate="show"> 
        {/*header*/}  
                        <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                            <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                Counseling records
                            </h3>
                        </div>
        {/*body*/}
                    <div className="flex flex-col px-4 py-3 z-50 font-[poppins] min-w-[350px]">

                        <div className='flex flex-row'>
                                <div className='w-[150px] border-2 border-black h-[120px] mx-1'>
                                    <div className='text-[20px] mx-auto w-fit py-4'>Referral</div>
                                    <div className='text-[30px] mx-auto w-fit '>
                                      {(display).filter((value)=> value.eventName === 'Referral').length}
                                    </div>
                                </div>
                                <div className='w-[150px] border-2 border-black h-[120px] mx-1'>
                                    <div className='text-[20px] mx-auto w-fit py-4'>Appointment</div>
                                    <div className='text-[30px] mx-auto w-fit '>
                                      {(display).filter((value)=> value.eventName === 'Appointment').length}
                                    </div>
                                </div>
                                <div className='w-[150px] border-2 border-black h-[120px] mx-1'>
                                    <div className='text-[20px] mx-auto w-fit py-4'>Others</div>
                                    <div className='text-[30px] mx-auto w-fit '>
                                      {(display).filter((value)=> value.eventName === 'Counselling').length}
                                    </div>
                                </div>
                            </div>    

                        <div className='text-[20px] mx-auto'>Total : 
                          <span className='text-[35px]'>{" "}
                            {(display).filter((value)=> value.eventName === 'Referral').length + 
                            (display).filter((value)=> value.eventName === 'Appointment').length +
                            (display).filter((value)=> value.eventName === 'Counselling').length}
                          </span>
                        </div>

                        <button onClick={()=> sethistory(true)} className='py-1 bg-green-500 hover:bg-green-600 rounded-md textS font-bold text-[20px] shadow-black shadow-sm'>History log</button>


                    </div>
        {/*footer*/}
                <div className="flex items-center justify-start px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="bg-red-400 hover:bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-1 shadow-black shadow-sm rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=> close(false)}>
                             close
                        </button>
                </div>
            </motion.div>
    </div>
 <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>

 <motion.div  className='z-40 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
            }}
          animate={{
          y: history?  1000:0}}>
          {history && 
            <div>
              <div onClick={(()=>sethistory(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 className='text-white' size={40}/></div> 
              <Crecords className='z-50 w-full'/>
              
            </div>}
      </motion.div> 


</>
  )
}
