import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import { RiDeleteBin4Fill } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import EditCmodal from './editCmodal';
import PacmanLoader from "react-spinners/PacmanLoader";

export default function CounsellingR({student,studentStat}) {
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
      const getRecords = async (ress) =>{
        try{
            const response= await Axios.get(`http://localhost:3500/counselingRec/${studentStat.LRN}`)
            setrecordds(JSON.parse(response.data[0].counsellingRec))
            setTimeout(()=>{
              setloading(false)
              if(ress === 'add')
              return Swal.fire({
                icon: 'success',
                title: 'Record saved!',
                showConfirmButton: false,
                timer: 1500
              })

                if(ress === 'delete')
                return Swal.fire({
                  icon: 'success',
                  title: 'Deleted!!',
                  showConfirmButton: false,
                  timer: 1500
                })

                if(ress === 'update')
                return Swal.fire({
                  icon: 'success',
                  title: 'Record updated!!',
                  showConfirmButton: false,
                  timer: 1500
                })

            },1500)
          }catch (err){
              console.log(err)
          }
      }

    useEffect(()=>{
        getRecords()
    },[])
    
    const [recordds,setrecordds] = useState('')

    const [addmodal,setaddmodal] =useState(false)

    const [nature,setnature] =useState('')
    const [results,setresult] =useState('')
    const [date,setdate] =useState('')

    const [others,setothers] =useState('')
    const [resothers,setresothers] =useState('')

    function eventType(e){
        if(e === 'Others'){
          setothers(true)
        }else{
          setnature(e)
          setothers(false)
        }
    }
    function reseventType(e){
        if(e === 'Others'){
            setresothers(true)
        }else{
            setresult(e)
          setresothers(false)
        }
    }

    const save = () =>{
        if(!nature || !results || !date)
        return Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Input empty field!!',
            showConfirmButton: false,
            timer: 1500
          })
          Swal.fire({
            title: 'Double check your input?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit!!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              setloading(true)
                try{
                    const response= await Axios.post(`http://localhost:3500/counselingRec`,
                    {
                      lrn:studentStat.LRN,
                      nature:nature,
                      result:results,
                      date:date,
                      oldRec:recordds
                    })
                    if(response){
                        setaddmodal(false)
                        setnature('')
                        setresult('')
                        setdate('')
                        getRecords('add')
                    }
                    
                        
                  }catch (err){
                      console.log(err)
                  }
            }
          })
      
    }

    const [editValue,seteditValue] =useState('')

    const [editmodal,seteditmodal] =useState(false)


    const deleteR = (index) =>{
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Submit!!'
          }).then( async (result) => {
            if (result.isConfirmed) {
              setloading(true)
                recordds.splice(index, 1)
                try{
                    const response= await Axios.patch(`http://localhost:3500/counselingRec`,
                    {
                      lrn:studentStat.LRN,
                      newR:recordds
                    })
                    
                    if(response){
                      getRecords('delete')
                    }
                    
                  }catch (err){
                      console.log(err)
                  }

            }
          })
      
    }

    const [loading,setloading] = useState(true)

  return (
    <>
            {
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-0 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :<>
            <div className='text-[20px] font-bold font-[poppins] text-center textS px-2 pt-2 rounded-t-md bg-white'><div className='bg-black rounded-md py-1'>Counseling Records</div></div>
        <div className='w-full px-2 min-h-[450px] bg-white overflow-auto h-[400px]'>
           
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] overflow-auto'>
                        <thead className='border-b font-medium dark:border-neutral-500 bg-white sticky top-0'>
                            <tr className='font-bold'>
                                <th scope="col" className="px-6 py-[10px] text-[17px]">Nature of Test</th>
                                <th scope="col" className="px-6 py-[10px] text-[17px]">Result</th>
                                <th scope="col" className="px-6 py-[10px] text-[17px]">Date of Counseling</th>
                                <th scope="col" className="px-6 py-[10px] text-[17px]">Options</th>
                            </tr>
                        </thead>
                        {!recordds[0]? 
                        <tbody>
                            <tr>
                                <td className='text-[30px] py-2'>NO RECORD</td>
                            </tr>
                        </tbody>
                        :<>
                        {recordds && recordds.map((value,index)=>{
                            return   <tbody key={index}>
                            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                <td className="whitespace-nowrap px-6 py-[8px]">{value.nature}</td>
                                <td className="whitespace-nowrap px-6 py-[8px]">{value.result}</td>
                                <td className="whitespace-nowrap px-6 py-[8px]">{value.date}</td>
                                <td >
                                    <span onClick={()=>{
                                            seteditValue({valueV:value,indexV:index})
                                            seteditmodal(true)
                                        }} className='bg-blue-500 cursor-pointer rounded-md mx-1 font-bold textS px-2 text-[15px] hover:bg-blue-600'>edit</span>
                                    <span onClick={()=>{
                                            deleteR(index)
                                        }} className='bg-red-500 cursor-pointer rounded-md font-bold textS px-2 text-[15px] hover:bg-red-600'>delete</span>
                                </td>
                            </tr>
                        </tbody>
                        })}
                        </>
                        }
                    </table>
            </div>  
            <div className='text-[20px] font-bold font-[poppins] text-center textS p-2 rounded-b-md bg-white cursor-pointer '>
                <div onClick={()=>setaddmodal(true)} className='bg-green-500 rounded-md py-1 hover:bg-green-600'>ADD</div>
            </div>

            </>}

            {addmodal &&
            <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Counseling Record</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                                <div className=" relative p-6 z-50 w-[370px]">
                                                    <div>
                                                        <div className='font-bold text-black text-[17px]'>Nature of test</div>
                                                        <select name="nature" onChange={(e)=> eventType(e.target.value)} className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                            <option value=""></option>
                                                            <option value="Behavioral">Behavioral</option>
                                                            <option value="Family">Family</option>
                                                            <option value="Academic">Academic</option>
                                                            <option value="Personal">Personal</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                        {others && <>
                                                            <input type='text' onChange={(e)=> setnature(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                            </>}
                                                        <div className='font-bold text-black text-[17px]'>Result</div>
                                                        <select name="nature" onChange={(e)=> reseventType(e.target.value)} className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                            <option value=""></option>
                                                            <option value="Resolved">Resolved</option>
                                                            <option value="Ongoing">Ongoing</option>
                                                            <option value="Monitoring">Monitoring</option>
                                                            <option value="Others">Others</option>
                                                        </select>
                                                        {resothers && <>
                                                            <input type='text' onChange={(e)=> setresult(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                                            </>}

                                                        <div className='font-bold text-black text-[17px]'>Date of Counseling</div>
                                                        <input type='date' className='min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2' onChange={(e)=> setdate(e.target.value)}/>

                                                    </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>setaddmodal(false)}
                                                    >
                                                        close
                                                    </button>
                                                    <button
                                                        className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                       onClick={()=>save()}>
                                                         SAVE
                                                    </button>
                                            </div>
                                        </motion.div>
                                        </div>
                                        }
                    {addmodal &&  <div className="opacity-50 fixed inset-0 z-40 bg-black block"></div>}


                    
            {editmodal && <EditCmodal refresh2={getRecords} lrn={studentStat.LRN} value={editValue} records={recordds} close={seteditmodal} load={setloading}/>}
                    {editmodal &&  <div className="opacity-50 fixed inset-0 z-40 bg-black block"></div>}
    </>
  )
}
