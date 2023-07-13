import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import paper from '../Picture/paper.svg'
import communication from '../Picture/communication.svg'
import {HashLink as Link} from 'react-router-hash-link'
import PacmanLoader from "react-spinners/PacmanLoader";



export default function Notification() {

    const [notifications,setnotifications] = useState([])


    const getNtotification = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/notification/${'notif'}`)
            if(response.data === '404 Not Found') { 
                    console.log(' no notification')
            }
        
            setTimeout(()=>{
                setloading(false)
                setnotifications(response.data)
            },1000)
            
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
      
      useEffect(()=>{
        getNtotification();
      },[])

      const setRead = async () =>{
        setloading(true)
            try{
                const response= await Axios.patch(`http://localhost:3500/notification`,{
                    type:'all'
                })
                if(response.data === '404 Not Found') { 
                        console.log(' no notification')
                }
                getNtotification()

              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
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
        <div className='w-[300px] h-[99vh] overflow-auto'>
            <div className='bg-white sticky top-0 text-center rounded-t-md'>NOTIFICATION</div>
            <div onClick={()=> setRead()} className='bg-blue-500 text-[white] sticky top-0 text-center rounded-b-md cursor-pointer'>Mark all as read</div>
            <div className='h-[90%]'>
                    {notifications && notifications.map((value,index)=>{
                        return   <NotifList key={index} value={value} refresh={getNtotification} load={setloading}/>

                    })}
              
            
                
            </div>
        </div>
    </>
    
  )
}

function NotifList({value,refresh,load}){

    const [timeS,settimeS] = useState()
        
    var initialTime = new Date(value.timeStamp);
    var finalTime = new Date();

    const timee=({
        month: finalTime.getMonth() - initialTime.getMonth(),
        days: finalTime.getDate() - initialTime.getDate(),
        hours: finalTime.getHours() - initialTime.getHours(),
        minutes: finalTime.getMinutes() - initialTime.getMinutes(),
        seconds: finalTime.getSeconds() - initialTime.getSeconds()
    })

    useEffect(()=>{
        settimeS(timee.month? timee.month + ' month/s ago':
                    timee.days? timee.days + ' day/s ago':
                        timee.hours?(timee.minutes) < 59 ? timee.minutes + 60 +' minute/s ago' :timee.hours + ' hour/s ago':
                            timee.minutes?timee.minutes + ' minute/s ago':
                                timee.seconds && timee.seconds  + ' second/s ago')
    },[])

    const setRead = async () =>{
        load(true)
            try{
                const response= await Axios.patch(`http://localhost:3500/notification`,{
                    id:value.id,
                    type:'once'
                })
                if(response.data === '404 Not Found') { 
                        console.log(' no notification')
                }
                    refresh()

              }catch (err){
                if (!err?.response) {
                  console.log(err)
                }
              }
    }


    return(
        <>

              {value.type === 'PIS'?
            <Link smooth={true} to='#one' >
                            
                <div className='bg-white my-2 px-4 py-2 flex flex-col hover:bg-blue-100 hover:rounded-lg hover:text-black '>
                    <div className='flex flex-row'>
                        <img src= {value.type === 'PIS'? paper : communication} alt='PIS' className='w-[20%] '/>
                        <div className='w-full px-2'>{value.message}</div>
                    </div>
                    <div className='w-full flex flex-row justify-between'> 
                    <div onClick={()=> setRead()}>
                        {value.status === 'unread' &&
                            <div className='text-[blue]  self-end px-2 underline rounded-md hover:text-[red]  cursor-pointer'>Mark as read</div>
                        }
                    </div>
                        <div className='text-[red] self-end'>{timeS && timeS}</div>
                    </div>
                </div>
            </Link>
                        :
            <Link smooth={true} to='#two' >
                            
                <div className='bg-white my-2 px-4 py-2 flex flex-col hover:bg-blue-100 hover:rounded-lg hover:text-black '>
                    <div className='flex flex-row'>
                        <img src= {value.type === 'PIS'? paper : communication} alt='PIS' className='w-[20%] '/>
                        <div className='w-full px-2'>{value.message}</div>
                    </div>
                    <div className='w-full flex flex-row justify-between'> 
                    <div onClick={()=> setRead()}>
                        {value.status === 'unread' &&
                            <div className='text-[blue]  self-end px-2 underline rounded-md hover:text-[red] cursor-pointer'>Mark as read</div>
                        }
                    </div>
                        
                        <div className='text-[red] self-end'>{timeS && timeS}</div>
                    </div>
                </div>
            </Link>
            }    


        </>
    )
}
