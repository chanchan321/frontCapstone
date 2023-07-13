import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import FileDownload from 'js-file-download'
import { resolvePath } from 'react-router-dom';

export default function InsertExcel({close}) {
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
      
      
       const formData = new FormData()
       const [filee,setfilee]= useState('')

    const restore = async (e) =>{
        e.preventDefault()
              const myFiles = document.getElementById('myFiles').files
        
              Object.keys(myFiles).forEach(key => {
                formData.append(myFiles.item(key).name, myFiles.item(key))
            })
                  try{
                          const response = await fetch(`http://localhost:3100/uploadExcel`, {
                            method: 'POST',
                            body: formData
                        })

                        close(false)
                        if(response.status === 500)
                         return Swal.fire({
                          icon: 'error',
                          title: 'ERROR',
                          showConfirmButton: false,
                          timer: 1500
                        }) 
                         
                         
                         Swal.fire({
                            icon: 'success',
                            title: 'data restored',
                            showConfirmButton: false,
                            timer: 1500
                          }) 
                  
                }catch (err){
                  
                          close(false)
                          Swal.fire({
                            icon: 'error',
                            title: 'ERROR',
                            showConfirmButton: false,
                            timer: 1500
                          }) 
                     
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
                                Insert Excel
                            </h3>
                        </div>
        {/*body*/}
                    <div className="flex flex-col px-4 py-3 z-50 font-[poppins] w-[360px]">
                        

                        <form onSubmit={restore} className='py-6'>
                          <div className='font-bold'>For Students :</div>
                          <div className='py-2 text-center'>Choose " .xlsx File " or " excel File "</div>
                            <input type="file" id="myFiles" accept="*" onChange={(e)=> setfilee(e.target.value)}/>
                            {filee && <button className='w-full px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 textS font-bold shadow-sm shadow-black my-1'>INSERT</button> }
                        </form>

                        <form onSubmit={restore} className='py-6'>
                        <div className='font-bold'>For Teachers :</div>
                          <div className='py-2 text-center'>Choose " .xlsx File " or " excel File "</div>
                            <input type="file" id="myFiles" accept="*" onChange={(e)=> setfilee(e.target.value)}/>
                            {filee && <button className='w-full px-4 py-1 rounded-md bg-green-500 hover:bg-green-600 textS font-bold shadow-sm shadow-black my-1'>INSERT</button> }
                        </form>

                        
                    
                    </div>
        {/*footer*/}
                <div className="flex items-center justify-start px-2 py-2 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="bg-red-400 hover:bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={()=> close(false)}>
                             close
                        </button>
                </div>
            </motion.div>
    </div>
 <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-40 bg-black "></div>

</>
  )
}
