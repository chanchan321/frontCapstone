import React,{useState} from 'react'
import { motion } from "framer-motion"
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function AddSiblings({close,refresh}) {

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

    

      const [name,setname]= useState('')
      const [age,setage]= useState('')
      const [occupation,setoccupation]= useState('')
      const [school_placeWork,setschool_placeWork]= useState('')

      const sib = useStorePIS((state)=>state.sib)

      const newSiblings = 
        {
            name:name,
            age:Number(age),
            occupation:occupation,
            school_placeWorkL:school_placeWork
        }
      
        const pisID = useStorePIS((state)=>state.pisID)



      const savetoDB = async (e) =>{
        e.preventDefault()
        close(false)
        const toDB=[...sib,newSiblings]
        if (!name || !age || !occupation || !school_placeWork) {
        Swal.fire({
          icon: 'error',
          title: 'Pls enter Credentials',
          showConfirmButton: false,
        })}else{



        try{
          const response= await Axios.patch(`http://localhost:3500/pis`,
          {
            pisID:pisID,
            content:toDB,
            tableName:'siblings'
          })
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            showConfirmButton: false,
          })
              refresh()
        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
      }
      }


  return (
    <>
        
                                <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[320px] ">
                                {/*content*/}
                                            <motion.form onSubmit={savetoDB} className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Add Siblings</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                                <div className=" p-4 z-50 w-[310px] sm:w-[370px]">
                                                    <div className='mb-2'>
                                                        <div>Name</div>
                                                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setname(e.target.value)}
                                                        value={name}></input>
                                                        
                                                    </div>       
                                                    <div className='mb-2'>
                                                        <div>Age</div>
                                                        <input type='number' min='10' max='99' required className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setage(e.target.value)}
                                                        value={age}></input>
                                                        
                                                    </div>     
                                                    <div className='mb-2'>
                                                        <div>Occupation</div>
                                                        <textarea required className='min-h-[50px] max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setoccupation(e.target.value)}
                                                        value={occupation}></textarea>
                                                        
                                                    </div>           
                                                    <div className='mb-2'>
                                                        <div>School/PLace of Work</div>
                                                        <textarea required className='min-h-[50px] max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            onChange={(e)=> setschool_placeWork(e.target.value)}
                                                            value={school_placeWork}></textarea>
                                                        
                                                    </div>  
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                                    <button
                                                        className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="submit">
                                                         SAVE
                                                    </button>
                                            </div>
                                        </motion.form>
                                </div>
                          <div   className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                                    
    </>
  )
}
