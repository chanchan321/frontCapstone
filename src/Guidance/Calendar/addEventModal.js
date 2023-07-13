import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import PacmanLoader from "react-spinners/PacmanLoader";

export default function AddEventModal({close,close2,value}) {
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

///MONTH NAME//
   const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
];

  const date = new Date(value.dateStr);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();


  const [typeOfevent,settypeOfevent] = useState('')
  const str2 = typeOfevent.charAt(0).toUpperCase() + typeOfevent.slice(1);

  const [others,setothers] = useState('')

  const [place,setplace] = useState('')
   
  const [description,setdescription] = useState('')

 
  const [availTime,setavailTime] = useState('')
    function timeSelect(event){
        const {value, checked} = event.target

        if(checked) {
          setavailTime(pre => [...pre,value])
        
        }else{
          setavailTime(pre => {
            return [...pre.filter(time => time !== value)]
          })
        }
    }

    function eventType(e){
        if(e === 'others'){
          setothers(true)
        }else{
          settypeOfevent(e)
          setothers(false)
        }
    }

    const sendTOdb = {
      typeOfevent:str2,
      place:place,
      availTime:availTime,
      description:description
    }
    
    const submit = async ()=>{
      console.log(sendTOdb)
      if(!typeOfevent || !place || !availTime[0] || !description) {
        return  Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Incomplete Inputs',
          showConfirmButton: false,
          timer: 1500
        })
      }
      Swal.fire({
        title: 'Double check your Input!',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed!'
      }).then( async (result) => {
        if (result.isConfirmed) {
          setloading(true)
            try{
              const response= await Axios.post(`http://localhost:3500/getEvents`,
              {
                content:sendTOdb,
                date:value.dateStr,
                request:'other'
              })
              setTimeout(()=>{
                close(false)
                close2(false)
                setloading(false)
                  Swal.fire({
                    icon: 'success',
                    title: 'event Saved!',
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

    // const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']
    // const timeee = [['9am-10am'],['10am-11am'],['2pm-3pm','3pm-4pm']]
    
    // const filtereddb =  timeTochoosedb.filter((time)=> !timeee.includes(time))
    // console.log(filtereddb)
    // console.log(timeee.flat(1))
   
    const [noMoreAvailTime,setnoMoreAvailTime]= useState(true)
    const [choseeAvailableTime,setchoseeAvailableTime]= useState()

    const getAvailableTime = async () =>{
     try{
         const response= await Axios.get(`http://localhost:3500/availableCal/${value.dateStr}`)
 
           const timeTochoosedb = ['9am-10am','10am-11am','2pm-3pm','3pm-4pm','4pm-5pm']
            
           if(response.data[0]){
 
             const dateUnava = response.data
             
             let text = [ ];
             for (let i = 0; i < dateUnava.length; i++) {
                 text += dateUnava[i].setTime+ ','}
           
             //tira nalang
       
             const filtereddb =  timeTochoosedb.filter((time)=> !text.includes(time))
             if(!filtereddb[0]) return setnoMoreAvailTime(false)
             setchoseeAvailableTime(filtereddb)
 
           }else{
             console.log(timeTochoosedb)
             setchoseeAvailableTime(timeTochoosedb)
           }

           setTimeout(()=>{
            setloading(false)
           },500)
 
       }catch (err){
           console.log(err)
       }
    }
 
    useEffect(()=>{
     getAvailableTime()
    },[])

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
        <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-40 flex justify-center font-[poppins] min-w-[300px] ">
        {/*content*/}
                    
                    <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                      variants={container}
                      initial="hidden"
                      animate="show"> 
            {/*header*/}  
                            <div className="flex items-start justify-between py-2 border-b border-solid border-slate-200 rounded-t">
                                <h3  className=" text-[black] w-full m-auto flex flex-col items-center">

                                    {noMoreAvailTime?<div className='text-[25px] break-words'>Add event on {monthNames[month]+` ${day} ${year}`}</div>:''}
                                </h3>
                            </div>
            {/*body*/}
                        <div className="flex flex-col px-4 py-3 z-50 font-[poppins]">
                        {noMoreAvailTime? <>
                            <div className='flex flex-col md:flex-row'>

                                <div className='w-[330px] px-2 text-[20px] flex flex-col'>
                                    <label name='event' className='font-bold text-black text-[17px] '>Type of event :</label>
                                    <select name="event" id="event" onChange={(e)=> eventType(e.target.value)} className='text-[18px] focus:outline-none w-fit shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                        <option value="">----</option>
                                        <option value="counselling">Counselling</option>
                                        <option value="meeting">Meeting</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="others">Others</option>
                                    </select>
                                    {others && <>
                                    <div className='font-bold text-black text-[17px]'>Name of event:</div>
                                    <input type='text' onChange={(e)=> settypeOfevent(e.target.value)} className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                     </>}
                                      
                                    <div className='font-bold text-black text-[17px]'>where/place:</div>
                                    <textarea onChange={(e)=> setplace(e.target.value)} value={place}  className='w-full min-h-[35px] max-h-[65px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'/>
                                      
                                </div>
                                <div className='w-[330px] px-2'>
                                    <div className='font-bold text-black text-[15px]'>available time :</div>
                                    <div className='flex flex-col flex-wrap h-[120px]'>
                                    {choseeAvailableTime && choseeAvailableTime.map((value,index)=>{
                                   return  <div key={index} className='w-fit flex flex-row items-center justify-center py-2'>
                                            <input type='checkbox' onChange={timeSelect} value={value} className='w-[20px] h-[20px] mx-2'/>
                                            <span className='w-[90px]'>{value}</span>
                                        </div>  
                                    } )}
                                    </div>  
                                </div>
                            </div>

                            <div className='font-bold text-black text-[15px] px-2'>Description:</div>
                            <textarea onChange={(e)=> setdescription(e.target.value)} value={description} className='w-full min-h-[70px] max-h-[140px] text-[18px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2 '></textarea>
                            </>:
                            <>
                              <div className='px-4 py-2 text-[30px]' >
                                  NO MORE AVAILABLE TIME
                              </div>
                            </>}           
                        </div>
            {/*footer*/}
                    <div className="flex items-center justify-between px-6 py-3 border-t border-solid border-slate-200 rounded-b">
                        {noMoreAvailTime? <>     
                              <button
                                className="bg-red-400 hover:bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-4 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close(false)}>
                                 cancel
                            </button>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> submit()}>
                                 SAVE
                            </button>
                          </>
                          :<>
                            <button
                                className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={()=> close()}>
                                 back
                            </button>
                          </>}
                    </div>
                </motion.div>
        </div>
     <div onClick={()=> close(false)} className="opacity-75 fixed inset-0 z-30 bg-black "></div>
  
    </>
  )
}
