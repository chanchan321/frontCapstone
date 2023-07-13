// import React,{useState} from 'react'
// import { motion } from "framer-motion"

// export default function AccountModal({close}) {


//     const container = {
//         hidden: { opacity: 0 },
//         show: {
//           scale:[0.5,1],
//           opacity: 1,
//           transition: {
//             delayChildren: 0.5,
//             staggerDirection: -1
//           }
//         }
//       }

//       const studeDet = {
//         lrn:1231415151,
//         lastname:'babasa',
//         firstname:'christian',
//         middlename:'bigtas',
//         contactNumber:'09461991211',
//         passowrd:'qwesrty'
//       }


//       const [lrn,setlrn] = useState(studeDet.lrn)
//       const [lastname,setlastname] = useState(studeDet.lastname)
//       const [firstname,setfirstname] = useState(studeDet.firstname)
//       const [middlename,setmiddlename] = useState(studeDet.middlename)
//       const [contactnumber,setcontactnumber] = useState(studeDet.contactNumber)
//       const [password,setpassword] = useState(studeDet.passowrd)

//      const [edit,setEdit] = useState(true)
//      const [showpass,setshowpass] = useState(true)
//   return (
//     <>
          
//             <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
//                                 {/*content*/}
//                                             <motion.div className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit  bg-[white] outline-none focus:outline-none"
//                                               variants={container}
//                                               initial="hidden"
//                                               animate="show"> 
//                                     {/*header*/}
//                                                     <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
//                                                         <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
//                                                               <div className='text-[25px] break-words'>ACCOUNT DETAILS</div>
//                                                         </h3>
//                                                     </div>
//                                     {/*body*/} 
//                                                 <div className=" relative p-6 z-50 w-[370px] flex flex-col">
//                                                         {edit?  <div onClick={()=>setEdit(false)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>EDIT DETAILS</div>:
//                                                              <div onClick={()=>setEdit(true)}  className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>SAVE</div>}
//                                                     <div className='mb-2'>
//                                                         <div>LRN:</div>
//                                                         <input type='text' readOnly value={studeDet.lrn}  className='w-full  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                         ></input>
                                                        
//                                                     </div>  
//                                                     <div className='mb-2'>
//                                                         <div>Lastname</div>
//                                                         <input type='text' readOnly={edit} onChange={(e)=> setlastname(e.target.value)} value={lastname}  className='w-full  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                         ></input>
                                                        
//                                                     </div>       
//                                                     <div className='mb-2'>
//                                                         <div>Firstname</div>
//                                                         <input type='text' readOnly={edit} onChange={(e)=> setfirstname(e.target.value)} value={firstname}  className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                         ></input>
                                                        
//                                                     </div>     
//                                                     <div className='mb-2'>
//                                                         <div>Middlename</div>
//                                                         <input type='text' readOnly={edit} onChange={(e)=> setmiddlename(e.target.value)} value={middlename}  className='max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                   ></input>
                                                        
//                                                     </div>    

//                                                      <div className='mb-2'>
//                                                         <div>ContactNumber</div>
//                                                         <input type='text' readOnly={edit} onChange={(e)=> setcontactnumber(e.target.value)} value={contactnumber}  className='max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                   ></input>
                                                        
//                                                     </div>     

//                                                     <div className='mb-2 flex flex-col  '>
//                                                         <div>Password</div>
//                                                         <input type={showpass? 'password' : 'text'}  readOnly={edit} onChange={(e)=> setpassword(e.target.value)} value={password}  className='max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                            
//                                                   ></input>
//                                                            {!edit && <div className='self-end flex flex-row items-center'>
//                                                                 <input type='checkbox' readOnly={edit} checke={`${showpass}`} onChange={()=> setshowpass(!showpass)} className=''></input><span className='self-end text-[15px] mx-1'>show password</span> 
//                                                             </div>}
//                                                     </div>   
                                                    
//                                                 </div>
//                                     {/*footer*/}
//                                             <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
//                                                     <button
//                                                         className="text-white-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                                                         type="button"
//                                                         onClick={()=>close(false)}
//                                                     >
//                                                         close
//                                                     </button>
                                                   
//                                             </div>
//                                         </motion.div>
//                                 </div>
//                           <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                                    
//     </>
//   )
// }
import React,{useEffect, useState, useRef} from 'react'
import { motion } from "framer-motion"
import useStore from '../Store/store';
import useStorePIS from '../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'
import PacmanLoader from "react-spinners/PacmanLoader";



export default function AccountModal({close}) {
  const cUser = useStore(state => state.cUser)
  const id= cUser.accountID

  const editRef = useRef()
  

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

      const [loading,setloading] = useState(true)

    const [studAcc,setstudAcc] = useState('')

    const getStudAccD = async (ress)=>{
          try{
              const response= await Axios.get(`http://localhost:3500/getstudAccDetails/${id}`)
              setstudAcc(response.data[0])

              setcontactnumber(response.data[0].contactNumber)

              setcurrpassword(response.data[0].password)

              setTimeout(()=>{
                setloading(false)
                if(ress === 'changeD')  
                 return Swal.fire({
                  icon: 'success',
                  title: 'Saved!',
                  text: 'Details changed!!',
                  showConfirmButton: false,
                  timer: 1500
                })
                if(ress === 'changeP')  
                 return Swal.fire({
                  icon: 'success',
                  title: 'Saved!',
                  text: 'Password changed!!',
                  showConfirmButton: false,
                  timer: 1500
                })
              },1000)

            }catch (err){
                console.log(err)
            }
        }
        useEffect(()=>{
          getStudAccD();
      },[])    

      const [contactnumber,setcontactnumber] = useState(studAcc && studAcc.contactNumber)

      const [edit,setEdit] = useState(true)

      const [showchangepass,setshowchangepass] = useState(false)

      const [oldshowpass,setoldshowpass] = useState(false)
      const [oldpassword,setoldpassword] = useState('')

      const [newshowpass,setnewshowpass] = useState(false)
      const [newpassword,setnewpassword] = useState('')

      const [currpassword,setcurrpassword] = useState('')


     const saveTODB= async ()=>{
     
      const patternContactNum = /^(\+63)(\d){10}$/;

      if(studAcc.contactNumber === contactnumber){
        return Swal.fire({
                  icon: 'warning',
                  title: 'warning!',
                  text: 'Nothing change!!',
                  showConfirmButton: false,
                  timer: 1500
                })
      }

      if(!(patternContactNum.test(contactnumber))){
        setcontactnumber(studAcc.contactNumber)
        return Swal.fire({
                  icon: 'warning',
                  title: 'warning!',
                  text: 'Invalid input!!',
                  showConfirmButton: false,
                  timer: 1500
                })
      }
      setloading(true)
        try{
            const response= await Axios.patch(`http://localhost:3500/getstudAccDetails`,{
              accID:id,
              lrn:studAcc.LRN,
              contactNumber:contactnumber,
              type:'details'
            })
            if(response.data){
              getStudAccD('changeD')
            }
          }catch (err){
              console.log(err)
          }
     }

     

    const savePass = async () =>{

      if(!oldpassword || !newpassword){
        return Swal.fire({
          icon: 'error',
          title: 'empty input!', 
          text: 'input field empty!!',
          showConfirmButton: false,
          timer: 1500
        })
      }

      const patternpassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if(!(patternpassword.test(newpassword))){
        return Swal.fire({
          icon: 'error',
          title: 'Invalid input!', 
          text: 'Minimum eight characters, at least one letter and one number',
          showConfirmButton: false,
          timer: 1500
        })
      }

      setloading(true)

      try{
        const response= await Axios.patch(`http://localhost:3500/getstudAccDetails`,{
          accID:id,
          bycrptOldpas :currpassword,
          oldpassword:oldpassword,
          newpassword:newpassword,
          type:'password'
        })

        if(response.status === 200){
          setoldpassword('')
          setnewpassword('')
          setshowchangepass(!showchangepass)  
          getStudAccD('changeP')
        }

      }catch (err){

        setTimeout(()=>{
          setloading(false)
          if(err.response.status){
            setoldpassword('')
            setnewpassword('')
            setshowchangepass(!showchangepass) 
            return Swal.fire({
                  icon: 'error',
                  title: 'wrong input!', 
                  text: 'old password not match!!',
                  showConfirmButton: false,
                  timer: 1500
          })}
          },1500)
      }
     }

     const logoutUSer = useStore( state => state.logout)
     const logoutUSerPIS = useStorePIS( state => state.logout)
     const logoutUSerPIS1 = useStorePIS( state => state.logout1)
     const logoutUSerPIS2 = useStorePIS( state => state.logout2)
     const logoutUSerPIS3 = useStorePIS( state => state.logout3)
     const logoutUSerPIS4 = useStorePIS( state => state.logout4)
     const logoutUSerPIS5 = useStorePIS( state => state.logout5)
     const logoutUSerPIS6 = useStorePIS( state => state.logout6)
     const logoutUSerPIS7 = useStorePIS( state => state.logout7)
     const logoutUSerPIS8 = useStorePIS( state => state.logout8)

     const logout = ()=>{
      setloading(true)
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
          logoutUSer('logout')
          logoutUSerPIS('logout')
          logoutUSerPIS1('logout')
          logoutUSerPIS2('logout')
          logoutUSerPIS3('logout')
          logoutUSerPIS4('logout')
          logoutUSerPIS5('logout')
          logoutUSerPIS6('logout')
          logoutUSerPIS7('logout')
          logoutUSerPIS8('logout')
          
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
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-70 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :<>
          
            <div className="h-[100vh] absolute top-0 overflow-auto w-[100%] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.div className="m-auto border-0 rounded-lg shadow-lg flex flex-col w-fit  bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>ACCOUNT DETAILS</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/} 
                                                <div className={`relative px-2 z-50 w-[full] ${!showchangepass?`sm:w-[500px] md:w-[700px]`:`sm:w-[350px] md:w-[350px]`} flex flex-col`}>
                                                {!showchangepass?
                                                  <>
                                                          {edit?  <div onClick={()=>{
                                                                    editRef.current.focus();
                                                                    setEdit(false)}} 
                                                                    className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>EDIT DETAILS
                                                                  </div>:
                                                             
                                                              <div onClick={()=>{
                                                                setEdit(true)
                                                                saveTODB()
                                                                }}  className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>SAVE</div>}
                                                      
                                                      <div className='mb-2'>
                                                          <div>LRN:</div>
                                                          <div className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                          >{studAcc && studAcc.LRN}</div>
                                                          
                                                      </div>  
                                                      <div className='flex flex-col md:flex-row justify-around'>
                                                            <div className='mb-2'>
                                                              <div>Lastname</div>
                                                              <div  className='w-[300px]  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                              >{studAcc.lastname} </div>
                                                              
                                                          </div>       
                                                          <div className='mb-2'>
                                                              <div>Firstname</div>
                                                              <div className='w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                              >{studAcc.firstname} </div>
                                                              
                                                          </div>     
                                                      </div>
                                                      <div className='flex flex-col md:flex-row justify-around'>
                                                            <div className='mb-2'>
                                                                <div>Middlename</div>
                                                                <div className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                                >{studAcc.middlename}</div>
                                                                
                                                            </div>    
                                                            
                                                            <div className='mb-2'>
                                                                <div>ContactNumber</div>
                                                                <input type='text' placeholder='+639123456789' ref={editRef} readOnly={edit} onChange={(e)=> setcontactnumber(e.target.value)} value={contactnumber}  className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                                ></input>
                                                                
                                                            </div>     
                                                        </div>
                                                  </>:
                                                      <>
                                                      <div className='mb-2 flex flex-col'>
                                                          <div>Enter old password</div>
                                                          <input type={!oldshowpass? 'password' : 'text'} onChange={(e)=> setoldpassword(e.target.value)} value={oldpassword}  
                                                            className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                          </input>
                                                          <div className='self-start flex flex-row items-center'>
                                                            <input type='checkbox' checked={oldshowpass} onChange={()=> setoldshowpass(!oldshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
                                                          </div>
                                                      </div>   

                                                      <div className='mb-2 flex flex-col'>
                                                          <div>Enter new password</div>
                                                          <input type={!newshowpass? 'password' : 'text'} onChange={(e)=> setnewpassword(e.target.value)} value={newpassword}  
                                                            className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
                                                          </input>
                                                          <div className='self-start flex flex-row items-center'>
                                                            <input type='checkbox' checked={newshowpass} onChange={()=> setnewshowpass(!newshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
                                                          </div>
                                                      </div>  

                                                  </>}
                                                    
                                                    {!showchangepass? <div onClick={()=>setshowchangepass(true)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 my-4 shadow-sm shadow-black'>change password</div>:
                                                    <>
                                                    <div className='flex flex-row justify-between'>
                                                    <button onClick={()=>savePass()} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-4 py-1 my-4 shadow-sm shadow-black'>save</button>
                                                    <button onClick={()=>setshowchangepass(false)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-4 py-1 my-4 shadow-sm shadow-black'>back</button>
                                                    </div>
                                                    </>}
                                                
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                                    <button
                                                        className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>logout()}
                                                    >
                                                        logout
                                                    </button>
                                                   
                                            </div>
                                        </motion.div>
                                </div>
                          <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                   
            </> }                
    </>
  )
}


// return (
//   <>
        
//           <div className="h-[100vh] absolute top-0 overflow-auto w-[100%] z-50 flex justify-center font-[poppins] min-w-[300px] ">
//                               {/*content*/}
//                                           <motion.div className="m-auto border-0 rounded-lg shadow-lg flex flex-col w-fit  bg-[white] outline-none focus:outline-none"
//                                             variants={container}
//                                             initial="hidden"
//                                             animate="show"> 
//                                   {/*header*/}
//                                                   <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
//                                                       <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
//                                                             <div className='text-[25px] break-words'>ACCOUNT DETAILS{loading && 'LOADING'}</div>
//                                                       </h3>
//                                                   </div>
//                                   {/*body*/} 
//                                               <div className={`relative px-2 z-50 w-[full] ${!showchangepass?`sm:w-[500px] md:w-[700px]`:`sm:w-[350px] md:w-[350px]`} flex flex-col`}>
//                                               {!showchangepass?
//                                                 <>
//                                                         {edit?  <div onClick={()=>setEdit(false)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>EDIT DETAILS</div>:
//                                                             <div onClick={()=>{
//                                                               setEdit(true)
//                                                               saveTODB()
//                                                               }}  className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 shadow-sm shadow-black'>SAVE</div>}
                                                    
//                                                     <div className='mb-2'>
//                                                         <div>LRN:</div>
//                                                         <div className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                         >{studAcc && studAcc.LRN}</div>
                                                        
//                                                     </div>  
//                                                     <div className='flex flex-col md:flex-row justify-around'>
//                                                           <div className='mb-2'>
//                                                             <div>Lastname</div>
//                                                             <div type='text' readOnly={edit} onChange={(e)=> setlastname(e.target.value)} value={lastname}  className='w-[300px]  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                             ></div>
                                                            
//                                                         </div>       
//                                                         <div className='mb-2'>
//                                                             <div>Firstname</div>
//                                                             <input type='text' readOnly={edit} onChange={(e)=> setfirstname(e.target.value)} value={firstname}  className='w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                             ></input>
                                                            
//                                                         </div>     
//                                                     </div>
//                                                     <div className='flex flex-col md:flex-row justify-around'>
//                                                           <div className='mb-2'>
//                                                               <div>Middlename</div>
//                                                               <input type='text' readOnly={edit} onChange={(e)=> setmiddlename(e.target.value)} value={middlename}  className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                               ></input>
                                                              
//                                                           </div>    

//                                                           <div className='mb-2'>
//                                                               <div>ContactNumber</div>
//                                                               <input type='text' readOnly={edit} onChange={(e)=> setcontactnumber(e.target.value)} value={contactnumber}  className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
//                                                               ></input>
                                                              
//                                                           </div>     
//                                                       </div>
//                                                 </>:
//                                                     <>
//                                                     <div className='mb-2 flex flex-col'>
//                                                         <div>Enter old password</div>
//                                                         <input type={!oldshowpass? 'password' : 'text'} onChange={(e)=> setoldpassword(e.target.value)} value={oldpassword}  
//                                                           className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
//                                                         </input>
//                                                         <div className='self-start flex flex-row items-center'>
//                                                           <input type='checkbox' checked={oldshowpass} onChange={()=> setoldshowpass(!oldshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
//                                                         </div>
//                                                     </div>   

//                                                     <div className='mb-2 flex flex-col'>
//                                                         <div>Enter new password</div>
//                                                         <input type={!newshowpass? 'password' : 'text'} onChange={(e)=> setnewpassword(e.target.value)} value={newpassword}  
//                                                           className='w-[300px] max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'>
//                                                         </input>
//                                                         <div className='self-start flex flex-row items-center'>
//                                                           <input type='checkbox' checked={newshowpass} onChange={()=> setnewshowpass(!newshowpass)} className=''></input><span className='self-start text-[15px] mx-1'>show password</span> 
//                                                         </div>
//                                                     </div>  

//                                                 </>}
                                                  
//                                                   {!showchangepass? <div onClick={()=>setshowchangepass(true)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-2 my-4 shadow-sm shadow-black'>change password</div>:
//                                                   <>
//                                                   <div className='flex flex-row justify-between'>
//                                                   <button onClick={()=>savePass()} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-4 py-1 my-4 shadow-sm shadow-black'>save</button>
//                                                   <button onClick={()=>setshowchangepass(false)} className='self-end rounded-sm bg-green-400 hover:bg-green-500 cursor-pointer px-4 py-1 my-4 shadow-sm shadow-black'>back</button>
//                                                   </div>
//                                                   </>}
                                              
//                                               </div>
//                                   {/*footer*/}
//                                           <div className="flex items-center justify-between p-2 border-t border-solid border-slate-200 rounded-b">
//                                                   <button
//                                                       className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                                                       type="button"
//                                                       onClick={()=>close(false)}
//                                                   >
//                                                       close
//                                                   </button>
//                                                   <button
//                                                       className="text-white-500 hover:rounded-md hover:bg-red-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                                                       type="button"
//                                                       onClick={()=>logout()}
//                                                   >
//                                                       logout
//                                                   </button>
                                                 
//                                           </div>
//                                       </motion.div>
//                               </div>
//                         <div onClick={()=>close(false)}  className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                                  
//   </>
// )
// }
