import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";


export default function EditCmodal({refresh2,lrn,value,records,close,load}) {
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
    const redord = records

    const [editnature,seteditnature] =useState(value.valueV.nature)
    const [editresults,seteditresult] =useState(value.valueV.result)
    const [editdate,seteditdate] =useState(value.valueV.date)

    const [editothers,seteditothers] =useState('')
    const [editresothers,seteditresothers] =useState('')

    function editeventType(e){
        if(e === 'Others'){
          seteditothers(true)
        }else{
          seteditnature(e)
          seteditothers(false)
        }
    }
    function editreseventType(e){
        if(e === 'Others'){
            seteditresothers(true)
        }else{
            seteditresult(e)
          seteditresothers(false)
        }
    }

    const editsave = () =>{
        if(!editnature || !editresults || !editdate)
        return Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Input empty fields!!',
            showConfirmButton: false,
            timer: 1500
          })
          Swal.fire({
            title: 'Warning!',
            text: "Double check your inputs!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save??'
          }).then( async (result) => {
            if (result.isConfirmed) {

                redord[value.indexV] = {
                  nature:editnature,
                  result:editresults,
                  date:editdate,
                }
                load(true)
                try{
                  const response= await Axios.patch(`http://localhost:3500/counselingRec`,
                  {
                    lrn:lrn,
                    newR:redord
                  })
                
                  if(response){
                    refresh2('update')
                    close(false)
                  }

                }catch (err){
                    console.log(err)
                }

            }
          })
      
    }


  return (
    <>
        
            <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Edit Counseling Record</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                    <div className=" relative p-6 z-50 w-[370px]">
                                                    <div>
                                                        <div className='font-bold text-black text-[17px]'>Nature of test</div>
                                                        <select name="nature" onChange={(e)=> editeventType(e.target.value)} value={editothers ? 'Others' :editnature} className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                            <option value=""></option>
                                                            <option value="Behavioral">Behavioral</option>
                                                            <option value="Family">Family</option>
                                                            <option value="Academic">Academic</option>
                                                            <option value="Personal">Personal</option>
                                                            <option value="Others" >Others</option>
                                                        </select>
                                                        {editothers && <>
                                                            <input type='text' onChange={(e)=> seteditnature(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                            </>}
                                                        <div className='font-bold text-black text-[17px]'>Result</div>
                                                        <select name="nature" onChange={(e)=> editreseventType(e.target.value)}  value={editresothers? 'Others' :editresults} className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                            <option value=""></option>
                                                            <option value="Resolved">Resolved</option>
                                                            <option value="Ongoing">Ongoing</option>
                                                            <option value="Monitoring">Monitoring</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                        {editresothers && <>
                                                            <input type='text' onChange={(e)=> seteditresult(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                            </>}

                                                        <div className='font-bold text-black text-[17px]'>Date of Counseling</div>
                                                        <input type='date' onChange={(e)=> seteditdate(e.target.value)} value={editdate} className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>

                                                    </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                                    <button
                                                        className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>editsave()}>
                                                         SAVE
                                                    </button>
                                            </div>
                                        </motion.div>
                                        </div>
    </>
  )
}
