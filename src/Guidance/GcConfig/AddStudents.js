import React,{useState,useEffect,useRef} from 'react'
import {BsFillPersonFill} from "react-icons/bs";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'

export default function AddStudents({close,refresh}) {
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



    const [lrn,setLrn] = useState('')
    const lrnRef = useRef()

    const [lastname,setlastname] = useState('')
    const [firstname,setfirstname] = useState('')
    const [middlename,setmiddlename] = useState('')
    
    const [gradeL,setgradeL] = useState('')

    useEffect(()=>{
        lrnRef.current.focus();
    },[])

    const saveTODB = async () => {
      if(!lrn || !lastname || !firstname || !middlename || !gradeL){
        return Swal.fire({
          icon: 'error',
          title: 'empty input!', 
          text: 'input field empty!!',
          showConfirmButton: false,
          timer: 1500
        })
      }
        try{
            const response= await Axios.post(`http://localhost:3500/studentAccount`,{
                lrn:lrn,
                lastname:lastname,
                firstname:firstname,
                middlename:middlename,
                gradeL:gradeL
            })
            close(false)
            refresh()
            Swal.fire({
                icon: 'success',
                title: 'student added!',
                showConfirmButton: false,
                timer: 1500
              })
    
          }catch (err){
              console.log(err)
          }
    }

  return (
    <>
        <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}  
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center text-[20px]">
                                    Enter details
                                </h3>
                            </div>
            {/*body*/}
                        <div className="flex flex-col px-4 py-3 z-50 font-[poppins] w-[360px]">
                       
                              <div>
                                <div>LRN:</div>
                                <input type='text' 
                                ref={lrnRef}
                                onChange={(e)=> setLrn(e.target.value) }
                                value={lrn}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                           
                                <div>Lastname:</div>
                                <input type='text' 
                                onChange={(e)=> setlastname(e.target.value) }
                                value={lastname}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                           
                                <div>Firstname:</div>
                                <input type='text' 
                                onChange={(e)=> setfirstname(e.target.value) }
                                value={firstname}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                              
                                <div>Middlename:</div>
                                <input type='text' 
                                onChange={(e)=> setmiddlename(e.target.value) }
                                value={middlename}
                                className='w-full py-1 shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                             
                                <div>GradeLevel:</div>
                                <select name="gradeLevel" id="gradeLevel" 
                                onChange={(e)=> setgradeL(e.target.value) }
                                value={gradeL}
                                className='text-[18px] focus:outline-none w-fit shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value="">--</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                              </div>
                                    
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-end px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close(false)}>
                                 close
                            </button>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> saveTODB()}>
                                 Save
                            </button>
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-40 bg-black "></div>
  
    </>
  )
}
