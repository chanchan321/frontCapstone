import React,{useEffect, useState, useRef} from 'react'
import paper from '../Picture/paper.svg'
import Counseling from '../Picture/counseling-icon.svg'
import Conversation from '../Picture/conversation.svg'
import Communication from '../Picture/communication.svg'
import { BsThreeDotsVertical } from "react-icons/bs";
import otherE from '../Picture/conference-room-icon.svg'
import Axios from 'axios';
import {HashLink as Link} from 'react-router-hash-link'
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Dashboard() {
        const todaydate = new Date();
        var dd = todaydate.getDate();
        var mm = todaydate.getMonth()+1; 
        var yyyy = todaydate.getFullYear();
    
        if(dd<10) {dd='0'+dd} 
        if(mm<10) { mm='0'+mm} 

        const todayD =  `${yyyy}-${mm}-${dd}`

        const [display,setdisplay] = useState()

        const getCounselingRec = async ()=>{
                try{
                    const response= await Axios.get(`http://localhost:3500/forDasboard`)

                        const one = (response.data.pis.filter((value)=> value.statusComp === "complete").length)
                        // (response.data.tocounsel.filter((value)=>  ((value.eventName === "Appointment") || (value.eventName === "Counselling") || (value.eventName === "Referral") && (value.setDate > todayD)) ))
                        const two = (response.data.tocounsel.filter((value)=> value.setDate > todayD).length)
                        const three = (response.data.referralreq.filter((value)=> (value.status === 'pending')).length)
                        const four = (response.data.appointmentreq.filter((value)=> (value.status === 'pending') && (value.dateRequested > todayD)).length)

                        setdisplay({
                                one:one,
                                two:two,
                                three:three,
                                four:four
                        })
                        // setloading(false)
        
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
              }

                const [events,setEvents] = useState()
                const [haveEvents,sethaveEvents] = useState() 

              const getEvents = async () =>{
                try{
                  const response= await Axios.get(`http://localhost:3500/getEvents/${todayD}`)

                        setEvents(response.data.filter((item)=> item.status != 'canceled'))
                        sethaveEvents(response.data.filter((item)=> item.status != 'canceled')[0]? true:false)
                        
                }catch (err){
                  if (!err?.response) {
                    console.log(err)
                  }
                }
            }
             
            useEffect(()=>{
                getCounselingRec() 
                getEvents()
            },[])

            useEffect(()=>{
                const interval =  setInterval(()=>{
                        getCounselingRec() 
                        getEvents()
                  },2000)
            
                  return () => clearInterval(interval)
                },[])



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

          
        //   const [loading,setloading] = useState(false)
  return (
    <>
                {
                // loading &&
                // <>
                // <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-0 ' >
                // {/* <PacmanLoader speedMultiplier={2} color={'white'}/> */}
                // </div>
                // </>
                }
        <div className='w-stretch flex-col flex md:flex-row '>
            <div className=' w-[520px] mx-4 h-stretch flex flex-row flex-wrap justify-between '>
                <div className='flex flex-col justify-around w-[230px] rounded-md h-[200px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 shadow-md p-2 hover:scale-[1.1] transition-all cursor-pointer'>
                        <img src= {paper} alt='PIS' className='w-[40%]  mx-auto '/>
                        <div className='text-center text-[20px] text-white font-bold textS'> Personal Information Sheet Submitted</div>
                        <div className='text-center text-[30px] font-bold'>{display && display.one}</div>
                </div>
                <div className='flex flex-col justify-around w-[230px] rounded-md h-[200px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 shadow-md p-2 hover:scale-[1.1] transition-all cursor-pointer'>
                        <img src= {Counseling} alt='PIS' className='w-[40%]  mx-auto '/>
                        <div className='text-center text-[20px] text-white font-bold textS'>To be Counselled studdent</div>
                        <div className='text-center text-[30px] font-bold'>{display && display.two}</div>
                </div>
                <div className='flex flex-col justify-around w-[230px] rounded-md h-[200px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 shadow-md p-2 hover:scale-[1.1] transition-all cursor-pointer'>
                        <img src= {Conversation} alt='PIS' className='w-[40%]  mx-auto '/>
                        <div className='text-center text-[20px] text-white font-bold textS'>Referral request</div>
                        <div className='text-center text-[30px] font-bold'>{display && display.three}</div>
                </div>
                <div className='flex flex-col justify-around w-[230px] rounded-md h-[200px] bg-gradient-to-t from-blue-500 to-cyan-200 m-2 shadow-md  p-2 hover:scale-[1.1] transition-all cursor-pointer'>
                        <img src= {Communication} alt='PIS' className='w-[40%]  mx-auto '/>
                        <div className='text-center text-[20px] text-white font-bold textS'>Appointment request</div>
                        <div className='text-center text-[30px] font-bold'>{display && display.four}</div> 
                </div>
            </div>   
            
            <div className='w-[300px] overflow-auto mx-4 bg-gradient-to-t from-blue-500 to-cyan-200 rounded-md'>
                <div className='sticky top-0 text-center py-2 bg-white rounded-md m-2 font-bold text-black'>To do Today</div>
                <div className='overflow-auto h-[400px] flex flex-col'>
                        {!haveEvents && <div className='text-[red] font-[poppins] font-bold text-center'>No events set on this date</div>}
                    {events && events.map((value,index)=>{
                 return <div key={index} className={`flex flex-row  px-2 py-4 m-2 border-2 bg-white bg-opacity-80  border-blue-500 rounded-md cursor-pointer hover:bg-opacity-100 ${orderTime(value.setTime)}`}>
                                {value.eventName === 'Counselling' || value.eventName === 'Appointment' || value.eventName === 'Referral' ? 
                                <img src={Counseling} alt='PIS' className='w-[60px]  mx-auto '/>
                                :
                                <img src={otherE} alt='events' className='w-[60px]  mx-auto '/>
                                }
                                
                                <div className='w-full flex flex-col '>   
                                        <p className='text-[20px] w-[150px] px-2 truncate overflow-ellipsis'>{value.eventName} </p>
                                        <p className='text-[15px] w-[150px] px-2 truncate overflow-ellipsis'>{' '+
                                        `${JSON.parse(value.setTime.toString())[0].split('-')[0]}
                                         -
                                         ${JSON.parse(value.setTime.toString()).slice(-1).toString().split('-').slice(-1).toString()}`
                                        }</p>
                                        </div>
                                        <Link smooth={true} to='#three'   >      
                                <BsThreeDotsVertical size={30} />
                                </Link>
                        </div>
               })}



                         {/* <div className='flex flex-row  px-2 py-4 m-2 border-2 bg-white bg-opacity-80  border-blue-500 rounded-md cursor-pointer hover:bg-opacity-100'>
                             <img src= {counseling} alt='PIS' className='w-[60px]  mx-auto '/>
                             <div className='w-full flex flex-col '>   
                                    <p className='text-[20px] w-[150px] px-2 truncate overflow-ellipsis'>Counseling</p>
                                    <p className='text-[15px] w-[150px] px-2 truncate overflow-ellipsis'>Time: 9am-10am</p>
                                </div>
                                        <BsThreeDotsVertical size={30} />
                                </div>

                        <div className='flex flex-row  px-2 py-4 m-2 border-2 bg-white bg-opacity-80 border-blue-500 rounded-md cursor-pointer hover:bg-opacity-100'>
                             <img src= {events} alt='PIS' className='w-[60px]  mx-auto '/>
                             <div className='w-full flex flex-col '>   
                                    <p className='text-[20px] w-[150px] px-2 truncate overflow-ellipsis'>Meeting</p>
                                    <p className='text-[15px] w-[150px] px-2 truncate overflow-ellipsis'>Time: 2pm-3pm</p>
                                </div>
                                <BsThreeDotsVertical size={30} children=''/>
                        </div> */}
                </div>
                
                </div>   
        </div>    
    </>
  )
}

function List(){





return(
<>


                
</>
)}