import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import { CgDetailsMore } from "react-icons/cg";
import { MdAssignmentAdd } from "react-icons/md";
import PacmanLoader from "react-spinners/PacmanLoader";


export default  function Events({addModal,value,refresh,opendetails,details}){

    ///MONTH NAME//
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];
 
 
   const date = new Date(value.dateStr);
   let day = date.getDate();
   let month = date.getMonth();
   let year = date.getFullYear();
 
   const todaydate = new Date();
   var dd = todaydate.getDate();
   var mm = todaydate.getMonth()+1; 
   var yyyy = todaydate.getFullYear();

   if(dd<10) {dd='0'+dd} 
   if(mm<10) { mm='0'+mm} 
 
     const pastDate = value.dateStr < `${yyyy}-${mm}-${dd}`? false : true
   
   const [events,setEvents] = useState()
   const [haveEvents,sethaveEvents] = useState() 
   const getEvents = async () =>{
       try{
         const response= await Axios.get(`http://localhost:3500/getEvents/${value.dateStr}`)

         if(!response)
         return Swal.fire({
           icon: 'error',
           title: 'server error',
           showConfirmButton: false,
           timer: 1000
         })

          setTimeout(()=>{

            sethaveEvents(response.data.filter((item)=> item.status != 'canceled')[0]? true:false)
            setEvents(response.data.filter((item)=> item.status != 'canceled'))
            setloading(false)

          },1000)
      
          
       }catch (err){
         if (!err?.response) {
           console.log(err)
         }
       }
   }
 
   useEffect(()=> {
     getEvents()
   },[refresh])
 
   const orderTime = (time) =>{
         if (time.includes('9am-10am'))
         return `order-1`;
         if (time.includes('10am-11am'))
         return `order-2`;
         if (time.includes('2pm-3pm'))
         return `order-3`;
         if (time.includes('3pm-4pm'))
         return `order-4`;
         if(time.includes('4pm-5pm'))
         return `order-5`;
   }
 
 
   const [loading,setloading] = useState(true)
   return(
     <>
              {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
         <div  className='bg-[#EEEEEE] w-[350px] px-2 text-center text-[20px] rounded-t-md font-[poppins] font-bold flex flex-row justify-around py-1 border-b-2 border-black'>
             <span>{monthNames[month]+` ${day} ${year}`}</span>
             {pastDate}
             {pastDate? <MdAssignmentAdd size={30} className='cursor-pointer hover:text-green-600' onClick={()=> addModal(true)}/>:''}
         </div>
         <div className='bg-[#EEEEEE] h-[80vh] overflow-auto p-2 flex flex-col font-[poppins] w-[350px]'>
             {!haveEvents && <div className='text-[red] font-bold'>No events set on this date</div>}
               {events && events.map((value,index)=>{
                 return <div key={index} className={`bg-white flex flex-col rounded-md shadow-lg w-full p-2 h-[100px] my-1 ${orderTime(value.setTime)}`}> 
                         <div className='self-end text-right w-[100px] py-1 text-ellipsis truncate text-[15px]'><span className='font-bold'>Time:</span><span className='text-[green] font-bold'>{' '+JSON.parse(value.setTime.toString())}</span></div>
                         {(value.eventName === 'Appointment') || (value.eventName === 'Referral') || (value.eventName === 'Counselling') ?
                           <div className='text-[20px] '><p className=' text-ellipsis font-bold truncate'>Counselling</p></div>
                         :
                         <div className='text-[20px] '><p className=' text-ellipsis font-bold truncate'>{value.eventName}</p></div>}
 
                         <div className='flex flex-row w-full justify-between text-[15px]'>
                           {value.eventName === 'Appointment' && <p className=''><span className='text-[red] font-bold'>for:</span><span className='text-[green] font-bold'> Appointment</span></p>}
                           {value.eventName === 'Referral' && <p className=''><span className='text-[red] font-bold'>for:</span><span className='text-[green] font-bold'> Referral</span></p>}
                           {value.eventName === 'Counselling' && <p className=''><span className='text-[red] font-bold'>for:</span><span className='text-[green] font-bold'> {value.place}</span></p>}
 
                           {!(value.eventName === 'Appointment') && !(value.eventName === 'Referral') && !(value.eventName === 'Counselling') ?
                            <p className='truncate'><span className='text-[red] font-bold'>where: </span><span className='text-[green] font-bold'> {value.place}</span></p> :""}
 
                           <div onClick={()=>{
                             opendetails(true)
                             details(value) }}
                            className='px-2 py-1  hover:bg-gray-300 rounded-md cursor-pointer hover:scale-105'><CgDetailsMore size={20} /></div>
                         </div>
 
                         
                 </div>
               })}
         
         </div>
      
     </>
   )
 }

 