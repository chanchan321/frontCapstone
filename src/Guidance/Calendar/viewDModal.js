import React,{useEffect, useState, useRef} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";


export default function ViewDModal({close,close2,value,resched}) {
    
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
      
    const [studEventInfo,setstudEventInfo] = useState()
    const getEventAppointment = async () =>{
        try{
          const response= await Axios.get(`http://localhost:3500/eventDcalendar/${value.eventID}/${value.eventName}`)
          setTimeout(()=>{
            setloading(false)
            setstudEventInfo(response.data)
            getRecords(response.data)
        },1000)
        

        }catch (err){   
            if (!err?.response) {
            console.log(err)
            }
        }
     }
     
     const [recordds,setrecordds] = useState('')
    const getRecords = async (data) =>{
        try{
            const response= await Axios.get(`http://localhost:3500/counselingRec/${value.eventName==='Appointment'?data.studInfo.LRN:data.studLrn}`)
          
            setTimeout(()=>{
                setrecordds(JSON.parse(response.data[0].counsellingRec))
                setloading(false)
            },1000)
            
          }catch (err){
              console.log(err)
          }
      }

      useEffect(()=>{
        if(value.eventName === 'Appointment'){
            getEventAppointment()
        }else if(value.eventName === 'Referral'){
            getEventAppointment()
        }else{
            setTimeout(()=>{
                setloading(false)
            },1000)
        }
      },[])

    const delEvent = () =>{
        Swal.fire({
            title: 'Are you sure ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                try{
                    const response= await Axios.delete(`http://localhost:3500/getEvents/${value.eventID}`)

                    setTimeout(()=>{
                        close2(false)
                        setloading(false)
                            Swal.fire({
                                icon: 'success',
                                title: 'Event deleted!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                    },1000)
                      
                  }catch (err){
                      console.log(err)
                  }
            }
          })
    }




    const [markAsDone,setmarkAsDone] = useState(false)
       
    

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

    let newDate = new Date()
    let dateC = newDate.getDate();
    let monthC = newDate.getMonth() + 1;
    let yearC = newDate.getFullYear();
    if(dateC<10) {dateC='0'+dateC} 
    if(monthC<10) { monthC='0'+monthC} 

    const save = () =>{
        if(!nature || !results )
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
                    const response= await Axios.post(`http://localhost:3500/markAsDone`,
                    {
                      eventID:value.eventID,
                      lrn:value.eventName === 'Appointment'?studEventInfo.studInfo.LRN:studEventInfo.studLrn,
                      nature:nature,
                      result:results,
                      date:value.setDate,
                      oldRec:recordds,
                      type:value.eventName
                    })
                    if(response){
                        setTimeout(()=>{
                            close(false)
                            setloading(false)  
                            Swal.fire({
                              icon: 'success',
                              title: 'Record saved!',
                              showConfirmButton: false,
                              timer: 1500
                            })     
                        },1000)
                    }
                    
                        
                  }catch (err){
                      console.log(err)
                  }
            }
            
          })
      
    }

    const [place,setplace] = useState(value.place)
    const [description,setdescription] = useState(value.description)
    const editRef = useRef()

    const [openEdit,setOpenEdit] = useState(false)

    const saveChanges = () =>{
        setOpenEdit(false)
        if (place === value.place && description === value.description){
            return Swal.fire({
                    icon: 'warning',
                    title: 'Nothing changes!',
                    showConfirmButton: false,
                    timer: 1500
           })}
           Swal.fire({
            title: 'Double check your input?',
            text: "Please check you inputs!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save!!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                try{
                    const response= await Axios.patch(`http://localhost:3500/editEvent`,{
                        eventID:value.eventID,
                        place:place,
                        description:description
                    })
                    if(response){
                        setTimeout(()=>{
                        close(false)
                        setloading(false)
                        Swal.fire({
                          icon: 'success',
                          title: 'Record saved!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                    },1000)
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
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
    
    {!markAsDone && 
        <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                      <div className='text-[25px] break-words'>Event details </div>
                                </h3>
                            </div>
                            {/* =to stud appointment AND counselling to other school */}
            {/*body*/}
                        <div className="flex flex-col px-4 py-1 z-40 font-[poppins] max-h-[350px] overflow-auto">

                        {value.eventName === 'Referral'? <>
                            <div className='flex flex-row'>
                                <div className='w-[290px] mx-2 '>
                                    <div className='text-[18px] font-bold'>Event name:</div>
                                    <div className='text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{value.eventName}</div>
                                </div>
                                <div className='w-[290px] mx-2 '>
                                    <div className='w-[300px] '>
                                        <div className='text-[18px] font-bold '>Time scheduled:</div>
                                            <div className='text-[18px] flex flex-wrap'>
                                                {JSON.parse(value.setTime).map((value,index)=> {
                                                    return <div key={index} className='px-3 py-2'>{value}</div>
                                                })}
                                            </div>
                                        </div>
                                </div>
                            </div>
                                                                
                                <div className='flex flex-row'>
                                    <div className='w-[290px] mx-2 '>
                                        <div className='text-[18px] font-bold'>Student name:</div>
                                        <textarea readOnly value={studEventInfo && studEventInfo.nameOfStudent}
                                        className='text-[18px] shadow-inner w-full h-[37px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{studEventInfo && studEventInfo.nameOfStudent}</textarea>
                                    </div>
                                    <div className='w-[290px] mx-2 '>
                                        <div className='text-[18px] font-bold'>Teacher name:</div>
                                        <textarea readOnly value={studEventInfo && studEventInfo.teacherName}
                                        className='text-[18px] shadow-inner w-full h-[37px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{studEventInfo && studEventInfo.nameOfStudent}</textarea>
                                    </div>
                                </div>
                                <div className='flex flex-row '>
                                    <div className='w-[290px] mx-2 '>
                                        <div className='text-[18px] font-bold'>Parent Contact #:</div>
                                        <div className='text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{studEventInfo && studEventInfo.parentContactNum}</div>
                                    </div>
                                    <div className='w-[290px] mx-2 '>
                                        <div className='text-[18px] font-bold'>Teacher Contact #:</div>
                                        <div className='text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{studEventInfo && studEventInfo.teacherContactNum}</div>
                                    </div>
                                </div>
                                               
                                <div className='flex flex-row '>
                                    <div className='w-[300px] pb-2 mx-1'>
                                        <div className='text-[18px] font-bold '>Reason for Referral:</div>
                                        <textarea readOnly defaultValue={studEventInfo && studEventInfo.reasonforReferral} className='text-[18px] w-full  shadow-inner h-[150px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                    <div className='w-[300px] mx-1 '>
                                        <div className='text-[18px] font-bold'>Initial Action:</div>
                                        <textarea readOnly defaultValue={studEventInfo && studEventInfo.initialActions} className='text-[18px] w-full shadow-inner h-[150px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </div>
                                </div>  
                                </>
                                :
                                <>
                            <div className='flex flex-row py-1'>
                                <div className='w-[300px]  '>
                                    <div className='text-[18px] font-bold'>Event name:</div>
                                    <div className='text-[18px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>{value.eventName}</div>
                                    {value.eventName === 'Appointment' ? <>
                                    <div className='text-[18px] font-bold'>Name of student:</div>
                                    <textarea readOnly value={studEventInfo && studEventInfo.studInfo.lastname +' '+ studEventInfo.studInfo.firstname  +' '+ studEventInfo.studInfo.middlename} 
                                        className='text-[18px] h-[37px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'>
                                    </textarea>
                                    </>:<>
    {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                                    <div className='text-[18px] font-bold'>Place:</div>
                                    <textarea ref={editRef} readOnly={!openEdit} onChange={(e)=> setplace(e.target.value)} value={place} className='text-[18px] h-[40px] max-h-[65px] shadow-inner w-full shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                    </>}
                                </div>
                                <div className='w-[250px] flex flex-col justify-center items-center '>
                                    <div className='text-[18px] font-bold '>Time scheduled:</div>
                                    <div className='text-[18px] flex flex-wrap'>    
                                        {JSON.parse(value.setTime).map((value,index)=> {
                                            return <div key={index} className='px-3 py-2'>{value}</div>
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='flex flex-col w-full py-1'>
                                {value.eventName === 'Appointment' ? 
                                <>
                                <div className='text-[18px] font-bold'>Reason for appointment:</div>
                                <textarea readOnly  value={studEventInfo && studEventInfo.eventInfo.reason} 
                                className='focus:outline-none shadow-inner h-[100px] max-h-[100px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                </>:<>
                                 <div className='text-[18px] font-bold'>Description:</div>
                                <textarea readOnly={!openEdit} onChange={(e)=> setdescription(e.target.value)} value={description} className='focus:outline-none shadow-inner h-[100px] max-h-[100px] shadow-gray-500/50 border-[1px] py-1 border-gray-200 rounded-md px-4'></textarea>
                                </> }
                                 </div>
                            </>}
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between py-2 px-3 border-t border-solid border-slate-200 rounded-b">
                        <div>
                              <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> {
                                    close(false)
                                }}>
                                 back
                            </button>
                            {(value.status) ==='done' ?"":
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> {
                                    close(false)    
                                    resched(true)}}>
                                 Reschedule
                            </button>}
                            {
                            value.eventName === 'Appointment' || value.eventName === 'Referral' ?'':
                            <>
                            {!(value.setDate < `${yearC}-${monthC}-${dateC}`) &&
                            <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> delEvent()}>
                                 delete
                            </button>}
                            </>
                            }
                        </div>
                        <div>
                        {value.eventName === 'Appointment' || value.eventName === 'Referral' ?
                                <>
                                    {value.status ==='done'?'': <>
                                        {(value.setDate <=  `${yearC}-${monthC}-${dateC}`) &&
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={()=> setmarkAsDone(true)}>
                                            Mark as done
                                        </button>} </>
                                    }
                                </>:
                                
                                <>
                                    {!(value.setDate < `${yearC}-${monthC}-${dateC}`) &&
                                    <>
                                        {openEdit? 
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=> saveChanges()}>
                                                    save
                                            </button>
                                        :
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={()=>{
                                                    setOpenEdit(true)
                                                    editRef.current.focus()
                                                }}>
                                                    edit
                                            </button>
                                        }
                                    </>}
                                 </>}


                            
                            
                       </div>
                    </div>
                </motion.div>
        </div>}
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>


     {markAsDone && 
     <div className="absolute top-[8%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
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
                                     <div className=" relative p-6 z-50 w-full">
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

                                         </div>
                                     </div>
                         {/*footer*/}
                                 <div className="flex items-center justify-end px-5 py-2 border-t border-solid border-slate-200 rounded-b">
                                         <button
                                             className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                             type="button"
                                             onClick={()=>setmarkAsDone(false)}>
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
                           
                          


                                    
  
    </>
  )
}
