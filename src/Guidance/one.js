import React,{useEffect, useState} from 'react'
import { IoIosPaper } from "react-icons/io";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import Mainpis from './PIS/Mainpis'
import Guidance from './GuidanceR/Guidance';
import CounsellingR from './GuidanceR/CounsellingR';
import { Tooltip} from "@material-tailwind/react";
import GoodM from './GoodMoral/goodM';


export default function One() {



    const [openStudpis,setopenStudpis] = useState(false)
    const [openStudGuidanceR,setopenStudGuidanceR] = useState(false)
    const [openCounsellingR,setopenCounsellingR] = useState(false)

    const [students,setStudents] = useState([])
    const [toFilter,settoFilter] = useState([])

    const [statusfil,setstatusfil] = useState('incomplete')
    const [gradefilter,setgradefilter] = useState('all')
    const [filterSearch,setfilterSearch] = useState('')

    const getPisContent = async (ress)=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getStud`)
                if(!response.data) return alert('ERROR')
                {!(ress === 'refresh') && setStudents(response.data.filter((stud)=> (stud.statusComp.toLowerCase()) === (statusfil))) }
                
                settoFilter(response.data)
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
    useEffect(()=>{
        getPisContent()
        const interval =  setInterval(()=>{
            getPisContent('refresh')
       },3500)
       return () => clearInterval(interval)
        
    },[])




    const [activestudents,setactivestudents] = useState()
    const [activecounsellingRec,setactivecounsellingRec] = useState()
  
  

    const filterStatus = (e)=>{
        setstatusfil(e)
        setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === (e)))
        setgradefilter('all')
        setfilterSearch('')
      }

      const filtergrade = (e)=>{
        setgradefilter(e)
        if(e === 'all') return setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === statusfil))

        setStudents(toFilter.filter((stud)=> (stud.statusComp.toLowerCase()) === (statusfil)).filter((stud)=> (stud.gradeLevel.toLowerCase()) === (e)))
        setfilterSearch('')
      }

      
      const filterstud = (e)=>{
        setfilterSearch(e)
        setgradefilter('all')
        if(e) return setStudents(toFilter.filter((stud)=> stud.statusComp === statusfil).filter((stud)=> (stud.lastname).includes(e)))
        
        setStudents(toFilter.filter((stud)=> stud.statusComp === statusfil))
       
      
      }

      const [goodMoral,setgoodMoral] = useState()
      const [goodMoralV,setgoodMoralV] = useState()
      

  return (
   <>
    <div className='w-full h-[90vh] flex justify-center items-center font-[poppins]'>
        <div className='w-[90%] h-full'>
            <div className='flex flex-col sm:flex-row w-full justify-between px-2 py-2'>
                <p className='text-[25px] textS font-bold'>Personal Informatin Records</p>
                <div className='flex flex-row'>
                    <div className='w-full flex flex-row'>
                        <div className='px-2 bg-white rounded-md'>TOTAL:<span className=' px-2 text-[30px]'>{students[0] && students.length}</span></div>
                        <select name="status" onChange={(e)=> filterStatus(e.target.value)} value={statusfil} className='h-full mx-2 rounded-md text-center'>
                            <option value="incomplete">Incomplete</option>
                            <option value="complete">Complete</option>
                        </select>
                        <select name="grade" onChange={(e)=> filtergrade(e.target.value)} value={gradefilter} className='h-full mx-2 rounded-md'>
                            <option value='all'>All Grade</option>
                            <option value="7">grade 7</option>
                            <option value="8">grade 8</option>
                            <option value="9">grade 9</option>
                            <option value="10">grade 10</option>
                            <option value="11">grade 11</option>
                            <option value="12">grade 12</option>
                        </select>
                    </div>
                    <input type='text' placeholder='Enter lastname' onChange={(e)=> filterstud(e.target.value)} value={filterSearch} className='w-full shadow-inner shadow-gray-500/50 border-[1px] p-[2px] border-gray-200 rounded-md px-2'></input>
                </div>
            </div>
            <div className='w-full px-2 h-[90%] bg-white bg-opacity-60 rounded-md overflow-auto'>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                        <thead className='border-b font-medium dark:border-neutral-500 sticky top-0'>
                            <tr className='font-bold'>
                                <th scope="col" className="px-6 py-[12px]">Lastname</th>
                                <th scope="col" className="px-6 py-[12px]">Firstname</th>
                                <th scope="col" className="px-6 py-[12px]">Middlename</th>
                                <th scope="col" className="px-6 py-[12px]">Records</th>
                            </tr>
                        </thead>
                        {!students[0]? 
                        <tbody>
                            <tr>
                                <td className='text-[30px] py-2'>NO RECORD</td>
                            </tr>
                        </tbody>
                        :<>
                        {students && students.map((value,index)=>{
                            return  <tbody key={index}>
                            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.lastname}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.firstname}</td>
                                <td className="whitespace-nowrap px-6 py-[12px]">{value.middlename}</td>
                                <td className="whitespace-nowrap  flex flex-row justify-around items-center ">

                                    <Tooltip content="P I S" placement="bottom" className='z-30 px-2 bg-blue-600 '
                                                        animate={{
                                                        mount: { scale: 1.5, y: 10,  x:1 },
                                                        unmount: { scale: 0, y: 0, x:0 },
                                                        }}>
                                    <div onClick={(()=>{
                                        setactivestudents(value)
                                        setopenStudpis(true)})} className='rounded-full p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 '><IoIosPaper className='text-white'/></div>
                                    </Tooltip>
  
                                    <Tooltip content="Counseling" placement="bottom" className='z-30 px-2 bg-green-600 '
                                                        animate={{
                                                        mount: { scale: 1.5, y: 10,  x:1 },
                                                        unmount: { scale: 0, y: 0, x:0 },
                                                        }}>            
                                    <div onClick={(()=>{
                                        setactivecounsellingRec(value.counsellingRec)
                                        setactivestudents(value)
                                        setopenCounsellingR(true)})} className='rounded-full p-2 bg-green-500 cursor-pointer'><IoIosPaper className='text-white'/></div>
                                    </Tooltip>  
                                    
                                    <Tooltip content="GoodMoral" placement="bottom" className='z-30 px-2 bg-red-600 '
                                                        animate={{
                                                        mount: { scale: 1.5, y: 10,  x:1 },
                                                        unmount: { scale: 0, y: 0, x:0 },
                                                        }}>   
                                    <div onClick={(()=>{
                                        setgoodMoral(true)
                                        setgoodMoralV(value)
                                        })} className='rounded-full p-2 bg-red-500 cursor-pointer hover:bg-red-600'><IoIosPaper className='text-white'/></div>
                                    </Tooltip>  
                                </td>
                            </tr>
                        </tbody>
                        })}</>}
                       
                    </table>
            </div>
        </div>

        {/* PIS */}      
        <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
          }}
          animate={{
                y: openStudpis? 1000:0}}
                >
                { openStudpis && 
            <div>
                <div onClick={(()=>setopenStudpis(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                <Mainpis student={activestudents && activestudents} className='z-30 w-full' />
            </div>}
           </motion.div>

        {/*blackbehind  PIS */}
        {/* {openStudpis &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}




         {/* Counselling Record */}      
         <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
          }}
          animate={{
                y: openCounsellingR? 1000:0}}
                >
                { openCounsellingR && 
            <div>
                <div onClick={(()=>setopenCounsellingR(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                <CounsellingR student={activecounsellingRec && activecounsellingRec} studentStat={activestudents && activestudents} className='z-30 w-full' />
            </div>}
           </motion.div>

        {/* blackbehind Counselling */}
        {/* {openCounsellingR &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}



       <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  flex justify-center sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
          }}
          animate={{
                y: goodMoral? 1000:0}}
                >
                { goodMoral && 
            <div>
                <div onClick={(()=>setgoodMoral(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                <GoodM value={goodMoralV && goodMoralV} className='z-50 w-full' />
            </div>}
           </motion.div>             

        


         {/* Guidance Record */}      
         {/* <motion.div  className='z-20 absolute top-0 left-0 h-[100vh] w-full sm:w-fit flex justify-center sm:p-10 items-center bg-black bg-opacity-50'
            transition={{
                type: "spring",
                stiffness: 30,
                duration: 0.5
            }}
            animate={{
                x: openStudGuidanceR? 0:-1500}}
                >
                { openStudGuidanceR && 
            <div>
                <div onClick={(()=>setopenStudGuidanceR(false))} className='text-white absolute top-0 left-0 z-50 cursor-pointer'><RxCross2 size={40}/></div> 
                <Guidance student={activeguidanceRec && activeguidanceRec} studentD={activestudents} className='z-30 w-full' />
            </div>}
           </motion.div> */}

        {/* blackbehind Guidance Record */}
        {/* {openStudGuidanceR &&  <div className="opacity-75 fixed inset-0 z-10 bg-black block"></div>} */}


    
    </div>
   </>
  )
}
