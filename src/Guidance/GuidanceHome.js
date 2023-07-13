// import React,{useEffect, useState, useRef,useMemo} from 'react'
// import {HashLink as Link} from 'react-router-hash-link'

// export default function GuidanceHome() {

//    const myRef = useRef()

//     useEffect(()=>{
//       console.log('myref', myRef.current)
//     },[])

    

//   return (
//     <>
//     <div className='h-[100vh] w-full overflow-x-hidden overflow-y-auto ' > 
//     <nav className='w-full absolute top-0'>
//       <ul className='flex flex-row w-full justify-around'>
//         <li><Link smooth={true} to='#one' className='cursor-pointer'>one</Link></li>
//         <li><Link smooth={true} to='#two'className='cursor-pointer'>two</Link></li>
//         <li><Link smooth={true} to='#three'className='cursor-pointer'>three</Link></li>
//         <li><Link smooth={true} to='#four'className='cursor-pointer'>four</Link></li>
//       </ul>
//     </nav>

//      <section id='one' ref={myRef} className='bg-red-500 w-full h-[100vh] pt-10'>one</section>
//      <section id='two' ref={myRef} className='bg-green-500 w-full h-[100vh]'>two</section>
//      <section id='three' ref={myRef} className='bg-yellow-500 w-full h-[100vh]'>three</section>
//      <section id='four' ref={myRef} className='bg-blue-500 w-full h-[100vh]'>four</section>

//     </div>
// </>
//   )
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React,{useEffect, useState, useRef,useMemo} from 'react'
import {HashLink as Link} from 'react-router-hash-link'
import Axios from 'axios';
import logo from '../Picture/cabanganLogo.png'
import {IoNotificationsOutline} from "react-icons/io5"
import {VscAccount} from "react-icons/vsc"
import {HiOutlineBars4} from "react-icons/hi2"
import {RxCross2} from 'react-icons/rx'
import { motion, useInView } from "framer-motion"
import Layout from './layout';
import Notification from './Notification'



export default function GuidanceHome() {

  const arr = ['dashboard','one', 'two', 'three', 'four'];
  const [myelementVisible, myelmentVisible]= useState()


  const refs = useRef([]);
  const options = {
    threshold : 0.8
  }

    useEffect(()=>{
        const observer = new IntersectionObserver((entries) =>{
          entries.forEach(e => {
             
            if(e.isIntersecting){
              if(e.target.id !== 'dashboard'){
                myelmentVisible(e.target.id)
              }else{
                myelmentVisible('dashboard')
              }
            }
          })
        },options)
        
        refs.current.forEach(section => {
          observer.observe(section)
        })
    },[])

    const [resNav,setresNav] =useState(false)


    const [shownotif,setshownotif] = useState(false)

    const [numberNotif,setnumberNotif] = useState(false)

    const getNtotification = async ()=>{
      try{
          const response= await Axios.get(`http://localhost:3500/notification/${'icon'}`)
          if(response.data === '404 Not Found') { 
                  console.log(' no notification')
          }

          setnumberNotif(response.data.unread)

        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
    }
    
    useEffect(()=>{
    const interval =  setInterval(()=>{
        getNtotification();
      },2500)

      return () => clearInterval(interval)
    },[])
  


  return (
    <>
    <div className=' bg-gradient-to-b from-blue-500 via-white to-blue-500 min-h-[100vh] h-[100vh] w-full overflow-x-hidden  overflow-auto' >

        <div className={`transition ease-in-out w-full h-[60px] z-10 text-black px-2 'bg-blue-400 shadow-md absolute top-0 flex flex-row justify-between `}>

          
                    <div className=' transition ease-in-out duration-1000 flex flex-row items-center w-[280px] sm:w-[320px] justify-between py-[4px]'>
                      <span><img src={logo} alt='logo' className='w-[50px] self-start z-50'/></span>
                      <div className='font-[poppins] font-bold text-[18px] sm:text-[20px] text-white textS'>Cabangan High School </div>
                    </div>     

                    <nav  className='hidden lg:flex'>
                      <ul className='flex flex-row h-full w-stretch justify-center items-center' >
                        <li><Link smooth={true} to='#dashboard' 
                        className={`${myelementVisible === 'dashboard' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-6`}>Dashboard</Link></li>
                        <li><Link smooth={true} to='#one' 
                        className={`${myelementVisible === 'one' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-6`}>P I S</Link></li>
                        <li><Link smooth={true} to='#two' 
                        className={`${myelementVisible === 'two' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-6`}>Requests'</Link></li>
                        <li><Link smooth={true} to='#three' 
                        className={`${myelementVisible === 'three' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-6`}>Calendar</Link></li>
                        <li><Link smooth={true} to='#four' 
                        className={`${myelementVisible === 'four' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                              text-[20px] `}></Link></li>
                      </ul>
                    </nav>

                  <div className='flex flex-row items-center w-[150px] justify-around'>
                  {resNav?<div onClick={()=> setresNav(false)} className='flex lg:hidden  items-center hover:scale-125 transition-all  cursor-pointer'><RxCross2 size={42}/></div>
                      :
                  <div onClick={()=> setresNav(true)} className='flex lg:hidden items-center hover:scale-125 transition-all  cursor-pointer'><HiOutlineBars4 size={42}/></div>}
                    <div  onClick={()=> setshownotif(true)}
                      className='relative flex flex-col justify-center items-center mx-2 rounded-lg hover:scale-125 transition-all  cursor-pointer'>
                        {numberNotif > 0 &&
                          <div className='bg-[red] rounded-full w-[20px] h-[20px] absolute top-0 right-0 flex justify-center items-center text-white'>{numberNotif}</div>
                        }
                      <IoNotificationsOutline size={40}/>
                    </div>
                    <Link smooth={true} to='#four'
                      className='flex flex-col justify-center items-center mr-4 rounded-lg hover:scale-125 transition-all  cursor-pointer'>
                      <VscAccount size={40}/>
                    </Link>
                    
                  </div>  
                   
         
        </div>  
             <motion.nav  
                transition={{
                    type: "spring",
                    stiffness: 20,
                    duration: 0.5
                  }} 
                  animate={{
                    x: resNav? 0:-1000,
                  delay: 1}}
                     className='fixed top-13 w-[full] z-40 left-0 sm:flex lg:hidden bg-blue-500 shadow-md'>
                      <ul className='flex flex-row h-full w-stretch justify-center items-center'  >
                        <li><Link smooth={true} to='#dashboard' 
                        className={`${myelementVisible === 'dashboard' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[15px] sm:mx-6`}>Dashboard</Link></li>
                        <li><Link smooth={true} to='#one' 
                        className={`${myelementVisible === 'one' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-2 sm:mx-6`}>P I S</Link></li>
                        <li><Link smooth={true} to='#two' 
                        className={`${myelementVisible === 'two' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-2 sm:mx-6`}>Requests'</Link></li>
                        <li><Link smooth={true} to='#three' 
                        className={`${myelementVisible === 'three' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                            text-[20px] mx-2 sm:mx-6`}>Calendar</Link></li>
                        <li><Link smooth={true} to='#four' 
                        className={`${myelementVisible === 'four' && 'border-b-4 border-black'} transition-all text-white cursor-pointer
                              text-[20px] mx-2 sm:mx-6`}></Link></li>
                      </ul>
                    </motion.nav>
       
          {arr.map((item, index) => {
            return (
              <section
                
                key={index}
                id={item}
                className='bg-transparent w-full md:h-[100vh] h-auto pt-12 flex flex-row justify-center items-center'
                ref={(element) => {
                  refs.current[index] = element;
                }}
              >
               <Layout pageName={item}/>
              </section>
            );
          })}


            <motion.div  className='z-20 absolute top-[-1000px] right-0  h-[100vh] w-[320px] px-2 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
            }}
          animate={{
          y: shownotif?  1000:0}}>
          {shownotif && 
            <div>
              <Notification className='z-30 w-full'/>
            </div>}
            </motion.div> 
            {
                shownotif &&
                <>
                <div onClick={(()=>setshownotif(false))} className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-10 bg-opacity-0 ' >
                </div>
            </>}
            


    
    </div>
  
    </>
  );

//   return(
//     <>
//       <div>
//         {['one','two','three','ffour'].map((value,index)=>{
//           return <Pagess key={index} value={value}/>
//         })}
//       </div>
//     </>
//   )
// }

// function Pagess({value}){
//   const ref = useRef(null);
//   const isInView = useInView(ref,{
//     amount:0.3
//   });

//   useEffect(()=>{
//       console.log(isInView)
//       console.log(isInView && value)
//   },[isInView])

//   return(
//     <>
//       <motion.div className='h-[100vh] w-full bg-blue-500 border-2 border-black py-2'
//       //  animate={{ x: isInView?  '100px': '200px'}}
//        >
//         <motion.div ref={ref} className='bg-white w-fit mx-2 h-full'
//         animate={
//           { x: isInView?  '100px': '500px',
//           opacity:isInView? 1:0
//         }
//         }
//         transition={{
//           duration:3
//         }}

//         >{value}</motion.div>

//       </motion.div>
//     </>
//   )
}
// import React,{useEffect, useState, useRef,useMemo} from 'react'
// import {HashLink as Link} from 'react-router-hash-link'

// import Layout from './layout';

// export default function GuidanceHome() {
//   const arr = ['one', 'two', 'three', 'four'];
//   const [myelementVisible, myelmentVisible]= useState('dashboard')

//   const nav= document.querySelector('nav')

//   const refs = useRef([]);
//   const options = {
//     threshold : 0.2
//   }
//     useEffect(()=>{
//         const observer = new IntersectionObserver((entries) =>{
//           entries.forEach(e => {
            
//             if(e.isIntersecting){
//               if(e.target.id !== 'dashboard'){
//                 myelmentVisible(e.target.id)
//               }else{
//                 myelmentVisible('dashboard')
//               }
//             }
//           })
//         },options)
        
//         refs.current.forEach(section => {
//           observer.observe(section)
//         })
    
         
//     },[])

   
//   return (
//     <div className='h-[100vh] w-full overflow-x-hidden overflow-y-auto ' > 
//         <nav className='w-full absolute top-0'>
//               <ul className='flex flex-row w-full justify-around'>
//                 <li><Link smooth={true} to='#dashboard' className={`${myelementVisible === 'dashboard' && 'bg-green-600'} transition-all cursor-pointer`}>dashboard</Link></li>
//                 <li><Link smooth={true} to='#one' className={`${myelementVisible === 'one' && 'bg-green-600'} transition-all cursor-pointer`}>one</Link></li>
//                 <li><Link smooth={true} to='#two' className={`${myelementVisible === 'two' && 'bg-green-600'} transition-all cursor-pointer`}>two</Link></li>
//                 <li><Link smooth={true} to='#three' className={`${myelementVisible === 'three' && 'bg-green-600'} transition-all cursor-pointer`}>three</Link></li>
//                 <li><Link smooth={true} to='#four' className={`${myelementVisible === 'four' && 'bg-green-600'} transition-all cursor-pointer`}>four</Link></li>
            
//               </ul>
//             </nav>
//             <div className='bg-red-500 w-full h-[100vh] pt-10 shadow-md shadow-black border-2 border-black' id='dashboard'>

//             </div>
//           {arr.map((item, index) => {
//             return (
//               <section
                
//                 key={index}
//                 id={item}
//                 className='bg-red-500 w-full h-[100vh] pt-10 shadow-md shadow-black border-2 border-black'
//                 ref={(element) => {
//                   refs.current[index] = element;
//                 }}
//               >
//                <Layout pageName={item}/>
//               </section>
//             );
//           })}


//       {/* <section id='one' ref={refs} className='bg-red-500 w-full h-[100vh] pt-10'>one</section>
//       <section id='two'  className='bg-green-500 w-full h-[100vh]'>two</section>
//       <section id='three'  className='bg-yellow-500 w-full h-[100vh]'>three</section>
//       <section id='four' className='bg-blue-500 w-full h-[100vh]'>four</section>

//  */}

    
//     </div>
//   );
// }