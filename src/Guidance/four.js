import React,{useState,useEffect,useRef} from 'react'
import useStore from '../Store/store';
import {BsFillPersonFill} from "react-icons/bs";
import Axios from 'axios';
import Swal from 'sweetalert2'
import { motion } from "framer-motion"
import {RxCross2} from 'react-icons/rx'
import StudAccounts from './GcConfig/StudAccounts'
import BackUpRestore from './GcConfig/BackUpRestore';
import InsertExcel from './GcConfig/InsertExcel';
import CounselingRec from './GcConfig/CounselingRec';
import PacmanLoader from "react-spinners/PacmanLoader";


export default function Four() {
  const cUser = useStore(state => state.cUser)
  const id= cUser.accountID

  const container = {
    hidden: { opacity: 0 },
    show: {
      scale:[0.5,1],
      opacity: 1,
      transition: {
        delayChildren: 1.5,
        staggerDirection: -1,
      }
    }
  }



  const [gcdetails,setgcdetails] = useState('')

  const getGCdetails = async ()=>{
    try{
        const response= await Axios.get(`http://localhost:3500/gcDetails/${id}`)
   
        setgcdetails(response.data[0])

        setlastname(response.data[0].lastname)
        setfirstname(response.data[0].firstname)
        setmiddlename(response.data[0].middlename)
        setcontactNumber(response.data[0].contactNumber)

        setusername(response.data[0].username) 

      }catch (err){
          console.log(err)
      }
  }
    useEffect(()=>{
      getGCdetails();
  },[])  

  const [editable,seteditable] = useState(true)

  const [username,setusername] = useState(gcdetails && gcdetails.username)

  const [lastname,setlastname] = useState(gcdetails && gcdetails.lastname)
  const [firstname,setfirstname] = useState(gcdetails && gcdetails.firstname)
  const [middlename,setmiddlename] = useState(gcdetails && gcdetails.middlename)
  const [contactNumber,setcontactNumber] = useState(gcdetails && gcdetails.contactNumber)

  const editRef = useRef()

  const [showchangepass,setshowchangepass] = useState(false)

  const [oldshowpass,setoldshowpass] = useState(false)
  const [oldpassword,setoldpassword] = useState('')

  const [newshowpass,setnewshowpass] = useState(false)
  const [newpassword,setnewpassword] = useState('')

  


const saveTODB= async ()=>{

  if(gcdetails.lastname === lastname && gcdetails.firstname === firstname && gcdetails.middlename === middlename && gcdetails.username === username && gcdetails.contactNumber === contactNumber){
    return Swal.fire({
              icon: 'warning',
              title: 'warning!',
              text: 'Nothing change!!',
              showConfirmButton: false,
              timer: 1500
            })
  }
  setloading(true)
    try{
        const response= await Axios.patch(`http://localhost:3500/gcDetails`,{
          accID:id,
          lastname:lastname,
          firstname:firstname,
          middlename:middlename,
          username:username,
          contactNumber:contactNumber,
          type:'details'
        })
              if(response.data) {
                setTimeout(()=>{
                  setloading(false) 
                  getGCdetails()
                   Swal.fire({
                          icon: 'success',
                          title: 'Saved!', 
                          text: 'Details changed!!',
                          showConfirmButton: false,
                          timer: 1500
                        })
                },1500)
              }
      }catch (err){
          console.log(err)
      }
 }


 const [loading,setloading] = useState(false)
 const savePass = async () =>{
  if(!oldpassword || !newpassword){
    return Swal.fire({
      icon: 'error',
      title: 'empty input!', 
      text: 'input field empty!!',
      showConfirmButton: false,
      timer: 1500
    })
  }else if(oldpassword === newpassword){
    return Swal.fire({
      icon: 'error',
      title: 'wrong input!', 
      text: 'old and new pass cant be the same!!',
      showConfirmButton: false,
      timer: 1500
    })  
  }
  setloading(true)
  try{
    const response= await Axios.patch(`http://localhost:3500/gcDetails`,{
      accID:id,
      bycrptOldpas:gcdetails.password,
      oldpassword:oldpassword,
      newpassword:newpassword,
      type:'password'
    })
    if(response.status === 200) {
    setTimeout(()=>{
      
      setloading(false) 
      getGCdetails()
      setoldpassword('')
      setnewpassword('')
       Swal.fire({
              icon: 'success',
              title: 'Saved!', 
              text: 'Password changed!!',
              showConfirmButton: false,
              timer: 1500
            })
            setshowchangepass(false) 
                
    },1500)
  }
 
  }catch (err){
   
    setTimeout(()=>{
      if(err.response.status){
        setloading(false)
        getGCdetails()
        setoldpassword('')
        setnewpassword('')
         Swal.fire({
              icon: 'error',
              title: 'wrong input!', 
              text: 'old password not match!!',
              showConfirmButton: false,
              timer: 1500
      })}
      setshowchangepass(false) 
      },1500)
  }
 }

 const [studACCs,setstudACCs] = useState(false)

 const [backUpRestore,setbackUpRestore] = useState(false)
 const [insertExcel,setinsertExcel] = useState(false)
 const [counselingRec,setcounselingRec] = useState(false)

 const logoutUSer = useStore( state => state.logout)

 const logout = ()=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Log out ?'
  }).then((result) => {
    if (result.isConfirmed) {
      setloading(true)

      logoutUSer('logout')
      
        setTimeout(()=>{
          setloading(false)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged out',
            showConfirmButton: false,
            timer: 1500
          })
        },1000)
      
    }
  })
  
 }
 

  return (
    <>
               {
                loading &&
                <>
                <div className='inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-50 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>}
    <div className='bg-white bg-opacity-60 rounded-md shadow-2xl shadow-gray border-2 border-white h-[fit] p-2 flex flex-col font-[poppins]' >
      
      <div className=' min-w-[350px] h-full w-[600px]'>
        <p className='text-center font-bold'>Account details</p>

        <div className='flex flex-row h-[70px] justify-around items-center'>
          <p className='text-[25px]'>Guidance Counselor{loading && 'loading'}</p>
          <BsFillPersonFill size={80}/>
        </div>
       
        <div className='text-[17px] text-center'>Username</div>
        <input type='text' ref={editRef} className='w-full text-[22px] bg-transparent text-center' readOnly={editable} onChange={(e)=>setusername(e.target.value)} value={username}></input>
      </div>
        
        {showchangepass ? 
        <>
          <div className='mb-2 mx-auto'>
              <div>Enter old password</div>
              <input type={!oldshowpass? 'password' : 'text'} onChange={(e)=> setoldpassword(e.target.value)} value={oldpassword}  
                className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
              </input>
              <div className='flex flex-row items-center'>
                <input type='checkbox' checked={oldshowpass} onChange={()=> setoldshowpass(!oldshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
              </div>
          </div>   
          <div className='mb-2 mx-auto'>
              <div>Enter new password</div>
              <input type={!newshowpass? 'password' : 'text'} onChange={(e)=> setnewpassword(e.target.value)} value={newpassword}  
                className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
              </input>
              <div className='flex flex-row items-center'>
                <input type='checkbox' checked={newshowpass} onChange={()=> setnewshowpass(!newshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
              </div>
          </div>  
          <div className='flex flex-row justify-between'>
            <div onClick={()=> savePass()} className='w-[49%] px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 textS text-center cursor-pointer shadow-sm shadow-black'> Save</div>
            <div onClick={()=> {
              setoldpassword('')
              setnewpassword('')
              setshowchangepass(false)
              }} className='w-[49%] px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 textS text-center cursor-pointer shadow-sm shadow-black'> back</div>
          </div>
      </>
        :
      <>
        <div className='flex flex-col items-center mx-auto'>
          <div>
            <div className='text-[15px]'>lastname:</div>
            <input type='text' 
            readOnly={editable} 
            placeholder='lastname'
            onChange={(e)=> setlastname(e.target.value)}
            value={lastname} 
            className=' shadow-inner  shadow-gray-500/50 border-[1px] w-[350px] border-gray-200 rounded-md px-2 py-1' ></input>
          </div>
          <div>
            <div className='text-[15px]'>firstname:</div>
            <input type='text' 
            readOnly={editable} 
            placeholder='firstname' 
            onChange={(e)=> setfirstname(e.target.value)}
            value={firstname}
            className='shadow-inner shadow-gray-500/50 border-[1px] w-[350px] border-gray-200 rounded-md px-2 py-1' ></input>
          </div>
          <div>
            <div className='text-[15px]'>middlename:</div>
            <input type='text' 
            readOnly={editable} 
            placeholder='middlename' 
            onChange={(e)=> setmiddlename(e.target.value)}
            value={middlename}
            className='shadow-inner shadow-gray-500/50 border-[1px] w-[350px] border-gray-200 rounded-md px-2 py-1' ></input>
          </div>
          <div>
            <div className='text-[15px]'>contact Number:</div>
            <input type='text' 
            readOnly={editable} 
            placeholder='contact number' 
            onChange={(e)=> setcontactNumber(e.target.value)}
            value={contactNumber}
            className='shadow-inner shadow-gray-500/50 border-[1px] w-[350px] border-gray-200 rounded-md px-2 py-1' ></input>
          </div>
        </div>

        <div className='flex flex-row justify-between mt-2'>
          {editable?
          <div
            onClick={()=>{
              seteditable(false)
              editRef.current.focus();
            } }
            className='w-[32%] px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 textS text-center cursor-pointer shadow-sm shadow-black'>Edit details
          </div>
          :
          <div
            onClick={()=>{
              seteditable(true)
              saveTODB()
            } }
            className='w-[32%] px-2 py-1 rounded-md bg-green-500 hover:bg-green-600 textS text-center cursor-pointer shadow-sm shadow-black'>Save
          </div>
          }
          <div 
          onClick={()=> setshowchangepass(true)}
          className='w-[32%] px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 textS text-center cursor-pointer shadow-sm shadow-black'>Change password</div>
           <div 
          onClick={()=> logout()}
          className='w-[32%] px-2 py-1 rounded-md bg-red-500 hover:bg-red-600 textS text-center cursor-pointer shadow-sm shadow-black'>Log Out</div>
        </div>
        

      
      </>}
      <div className=' p-2 flex flex-row justify-between items-center border-t-2 border-black mt-4'>
        <div onClick={()=> setstudACCs(true)} className=' px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 textS text-center cursor-pointer shadow-sm shadow-black'>stud accounts</div>
        <div onClick={()=> setbackUpRestore(true)} className=' px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 textS text-center cursor-pointer shadow-sm shadow-black'>backup and restore</div>
        <div onClick={()=> setinsertExcel(true)} className=' px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 textS text-center cursor-pointer shadow-sm shadow-black'>insert Excel</div>
        <div onClick={()=> setcounselingRec(true)} className=' px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600 textS text-center cursor-pointer shadow-sm shadow-black'>counseling records</div>
      </div>
    </div>



    {/* <motion.div  className='z-20 absolute top-[-1000px] right-0 left-0 mx-auto h-[100vh] w-full  sm:p-10 items-center bg-black bg-opacity-75'
          transition={{
            type: "spring",
            stiffness: 25
            }}
          animate={{
          y: studACCs?  1000:0}}>
          {studACCs && 
            <div>
              <div onClick={(()=>setstudACCs(false))} className='text-white absolute top-0 left-0 z-20 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
              <StudAccounts className='z-30 w-full'/>
              
            </div>}
      </motion.div>  */}
    {studACCs  &&
      <motion.div  className='z-20 absolute top-[0px] right-0 left-0 mx-auto h-[100vh] w-full  sm:p-10 items-center bg-black bg-opacity-75 overflow-auto'
          variants={container}
          initial="hidden"
          animate="show"
          >
          {studACCs && 
            <div>
              <div onClick={(()=>setstudACCs(false))} className='text-white absolute top-0 left-0 z-20 cursor-pointer'><RxCross2 className='text-red-600' size={40}/></div> 
              <StudAccounts className='z-30 w-full'/>
              
            </div>}
      </motion.div> }

      {backUpRestore && <BackUpRestore close={setbackUpRestore} className='z-50 overflow-auto  ' />}
      
      {insertExcel && <InsertExcel close={setinsertExcel} className='z-50'/>}

      {counselingRec && <CounselingRec close={setcounselingRec} className='z-50'/>}

      


    </>  
  )
}
