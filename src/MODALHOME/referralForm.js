
import React,{useEffect, useState} from 'react'
import { motion } from "framer-motion"
import Axios from 'axios';
import Swal from 'sweetalert2'
import { MdGroupAdd } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";



export default function ReferralForm({close}) {
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

            //teacher
              const [employeeID,setEmployeeID] = useState('')
              const [referredBy,setreferredBy] = useState('')
              const [teacherContactNum,setteacherContactNum] = useState('')
              const [designation,setdesignation] = useState('')

              const [agreetoCounsel,setagreetoCounsel] = useState('')

              const [reasonReferral,setreasonReferral] = useState('')
              const [initalActions,setinitalActions] = useState('')

              //student
              const [lrn,setlrn] = useState('')

              const [nameOfStudent,setnameOfStudent] = useState('')
              const [gradeLevel,setgradeLevel] = useState('')
              const [gender,setgender] = useState('')
              const [parentGuardian,setparentGuardian] = useState('')
              const [parentGuardianContact,setparentGuardianContact] = useState('')

              const todaydate = new Date();
              var dd = todaydate.getDate();
              var mm = todaydate.getMonth()+1; 
              var yyyy = todaydate.getFullYear();
        
              if(dd<10) {dd='0'+dd} 
              if(mm<10) { mm='0'+mm} 

              
              const sendRequest = {
                employeeID:employeeID,
                referredBy:referredBy,
                teacherContactNum:teacherContactNum,
                designation:designation,
                agreetoCounsel:agreetoCounsel,
                reasonReferral:reasonReferral,
                initalActions:initalActions,

                lrn:lrn,
                nameOfStudent:nameOfStudent,
                gradeLevel:gradeLevel,
                gender:gender,
                parentGuardian:parentGuardian,
                parentGuardianContact:parentGuardianContact,
                date:yyyy + "-" + mm + "-" + dd
              }


              const sendtherequest = async (e)=>{
                e.preventDefault()
                Swal.fire({
                  title: 'Double check your input?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Submit!!'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try{
                      const response= await Axios.post(`http://localhost:3500/referral`,{
                        content:sendRequest
                      })

                      try{
                        const response= await Axios.post(`http://localhost:3500/notification`,{
                            type:'Counseling',
                            message:`Teacher ${sendRequest.referredBy} make a referral request`,
                            status:'unread'
                        })
                              if(!response) { 
                                      console.log('server Error')
                              }
                              Swal.fire({
                                icon: 'success',
                                title: 'Request Sent!',
                                text: 'Referral request submitted!!',
                              })
                              close(false)
        
                      }catch (err){
                        if (!err?.response) {
                          console.log(err)
                        }
                      }

                      


                    }catch (err){
                        Swal.fire({
                          icon: 'error',
                          title: err.response.data
                        })
                    }
                  }
                })
              }
              
                const selectedStud = (studInfo) =>{
                  // console.log(studInfo)
                  setlrn(studInfo.LRN)
                  setnameOfStudent(studInfo.lastname+' '+studInfo.firstname + " " +studInfo.middlename)
                  const personal = (JSON.parse(studInfo.personalBackground))
                  setgender(personal.gender)
                  const families = (JSON.parse(studInfo.familyBackground))
                  if(families.father.name && families.father.contactNumber){
                    setparentGuardian(families.father.name)
                    setparentGuardianContact(families.father.contactNumber)
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                  }else if(families.mother.name && families.mother.contactNumber){
                    setparentGuardian(families.mother.name)
                    setparentGuardianContact(families.mother.contactNumber)
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                  }else 
                  if(families.guardian.name && families.guardian.contactNumber){
                    setparentGuardian(families.guardian.name)
                    setparentGuardianContact(families.guardian.contactNumber)
                    Swal.fire({
                      icon: 'success',
                      title: 'Selected'
                    })
                    setstudentlist(false)
                    
                  }else{
                    Swal.fire({
                      icon: 'warning',
                      title: 'Oops...!',
                      text: 'student doest have parent/guardian info Registered',
                    })
                    setstudentlist(false)

                  }
                }
              



            const [studentlist,setstudentlist] = useState(false) 

              const [students,setStudents] = useState([])
              const [tofilter,settofilter]= useState([])
              const getPisContent = async ()=>{
                try{
                    const response= await Axios.get(`http://localhost:3500/getStud`)
                        if(!response.data) return alert('ERROR')
                        setStudents(response.data)
                        settofilter(response.data)
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
              }
              useEffect(()=>{
                getPisContent()
              },[])

              const filterstud = (e)=>{
                if(e){
                  setStudents(tofilter.filter((name)=> (name.lastname+name.firstname).includes(e) ))
                }else{
                  setStudents(tofilter)
                }
              }
            
  return (
    <>
  
    <form onSubmit={sendtherequest} className='w-[320px] sm:w-[600px] md:w-[800px] lg:w-[800px] h-[full] overflow-y-auto overflow-x-hidden py-12 sm:p-4' >
         {/*content*/}
                                        <div className='py-6 bg-white rounded-md'>
                                    {/*header*/}
                                    <div className="flex items-start justify-between border-b border-solid border-slate-200 rounded-t ">
                                                        <div  className="flex flex-row text-[black] w-full m-auto justify-center items-center">
                                                          <MdGroupAdd size={40} onClick={()=> setstudentlist(true)} className='mx-4 cursor-pointer hover:text-green-600'/>
                                                          <p className='font-bold font-[poppins] text-[20px]'>Click to select from list of Student</p>
                                                              {/* <div className='text-[25px] break-words'>Enter details</div> */}
                                                        </div>
                                                    </div>
                                    {/*body*/} 
                                                <div className=" relative sm:px-6  flex flex-col">


                                                <div className='flex flex-col md:flex-row justify-start pt-2 sm:w-[700px] items-center'>   
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Employee ID:</div>
                                                        <input type='text' required className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setEmployeeID(e.target.value)}
                                                        value={employeeID}></input>
                                                    </div>  
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Referred by:</div>
                                                        <input type='text' required className=' w-[300px]  shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setreferredBy(e.target.value)}
                                                        value={referredBy}></input>
                                                    </div>  
                                               
                                                  </div>   
                                                  <div className='flex flex-col md:flex-row justify-start sm:w-[700px] items-center'>   
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Contact Number:</div>
                                                        <input type='text' required className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setteacherContactNum(e.target.value)}
                                                        value={teacherContactNum}></input>
                                                    </div>  
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Designation:</div>
                                                        <input type='text' required className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setdesignation(e.target.value)}
                                                        value={designation}></input>
                                                    </div>  
                                               
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-start  sm:w-[700px] items-center '>   
                                                
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Name of Student:</div>
                                                        <input type='text' required className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setnameOfStudent(e.target.value)}
                                                        value={nameOfStudent}></input>
                                                    </div>  
                                                    <div className='flex flex-col mx-2'>
                                                      <label className='text-[18px]'>Grade Level</label>
                                                      <select  onChange={(e)=>setgradeLevel(e.target.value)} value={gradeLevel} required className='w-[100px] h-[30px] px-2 text-[18px] shadow-inner shadow-gray-500/50 rounded-md'   >
                                                              <option value={null}></option>
                                                              <option value="7">7</option>
                                                              <option value="8">8</option>
                                                              <option value="9">9</option>
                                                              <option value="10">10</option>
                                                              <option value="11">11</option>
                                                              <option value="12">12</option>
                                                          </select>
                                                        </div>
                                                        <div className='flex flex-col mx-2'> 
                                                          <label className='text-[18px]'>Gender</label>
                                                          <select onChange={(e)=>setgender(e.target.value)} value={gender} required className='w-[100px] h-[30px] px-2 text-[18px] shadow-inner shadow-gray-500/50 rounded-md'   >
                                                                  <option value={null}></option>
                                                                  <option value="male">Male</option>
                                                                  <option value="female">Female</option>
                                                              </select>
                                                        </div>   
                                                     </div> 
                                                     <div className='flex flex-col md:flex-row justify-start sm:w-[700px] items-center'>   
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Parent/Guardian Name:</div>
                                                        <input type='text' className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                         onChange={(e)=> setparentGuardian(e.target.value)}
                                                         value={parentGuardian}></input>
                                                    </div>  
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Parent/Guardian Contact #:</div>
                                                        <input type='text' className=' w-[300px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                         onChange={(e)=> setparentGuardianContact(e.target.value)}
                                                         value={parentGuardianContact}></input>
                                                    </div>  
                                               
                                                  </div>   

                                                  <div className='flex flex-col md:flex-row justify-between sm:w-[700px] items-center'>   
                                  {/* Date of Referral: */}
                                                    <div className='mb-2 text-[18px] mx-2 flex flex-row'>
                                                      <div></div>
                                                        <div>Did the student agree to be referred to GCO?:</div>
                                                          <div><input type='radio'  onChange={(e)=> setagreetoCounsel(e.target.value)} className='w-[20px] h-[20px]'
                                                              name="referred"
                                                              value="yes" /> <span>Yes</span> </div>
                                                        <div><input type='radio'  onChange={(e)=> setagreetoCounsel(e.target.value)} className='w-[20px] h-[20px]'
                                                            name="referred"
                                                            value="no"
                                                            /> <span>No</span> </div>
                                                    </div>  
                                                     
                                                    </div>   

                                                  <div className='flex flex-col md:flex-row justify-between sm:w-[700px] items-center'>   
                                                
                                                    <div className='mb-2 text-[18px]' >
                                                        <div>Reason for Referral:</div>
                                                        <textarea type='text' required className=' w-[300px] max-h-[80px] h-[60px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                          onChange={(e)=> setreasonReferral(e.target.value)}
                                                          value={reasonReferral}
                                                        ></textarea>
                                                    </div>  
                                                    <div className='mb-2 text-[18px] mx-2'>
                                                        <div>Initial Actions Taken:</div>
                                                        <textarea type='text' required className=' w-[300px] max-h-[80px] h-[60px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                             onChange={(e)=> setinitalActions(e.target.value)}
                                                             value={initalActions}
                                                        ></textarea>
                                                    </div>  
                                                  </div>   
                                                
                                                    
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end border-t border-solid sm:p-2 border-slate-200 rounded-b">
                                          
                                                    <input
                                                        className="text-white-500 cursor-pointer bg-green-400 hover:bg-green-500 rounded-md hover:text-white  background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        
                                                        type='submit'
                                                        value='Send Request'
                                                     />
                                                   
                                            </div>
                     
                                            </div>
    </form>
         
        {studentlist && 
        <>
            <div className="absolute top-[8%] left-0 w-[100%] z-50 h-[1px] flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.div className="mx-auto  border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Select the Student</div>
                                                              <input type='text' placeholder='Search Name' onChange={(e)=> filterstud(e.target.value)} className='w-[320px] py-[3px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                                <div className=" relative px-2 h-[300px] w-[350px] sm:w-full overflow-auto">
                                                  <div  className=' bg-white h-full w-fit bg-opacity-20 rounded-md shadow-sm  px-4 '>
                                                  <table className='min-w-[500px] text-left text-sm font-light font-[poppins] w-[500px] overflow-auto'>
                                                      <thead  className='border-b font-medium dark:border-neutral-500 sticky top-0  bg-white text-[15px]'>
                                                        <tr>
                                                          <th scope="col" className="px-6 py-[3px]">Lastname</th>
                                                          <th scope="col" className="px-6 py-[3px]">Firstname</th>
                                                          <th cscope="col" className="px-6 py-[3px]">Middlename</th>
                                                        </tr>
                                                      </thead>
                                                  <tbody >
                                                      {students && students.map((value,index)=>{
                                                      return   <tr key={index} className='border-b-[1px] py-[2px] border-black text-[16px]'>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.lastname}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.firstname}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]">{value.middlename}</td>
                                                                  <td className="whitespace-nowrap px-6 py-[6px]"><BsPersonFillAdd size={30} 
                                                                  className='cursor-pointer hover:text-green-500'
                                                                  onClick={()=> selectedStud(value)}/></td>
                                                                </tr>
                                                    })}
                                                     </tbody>
                                                  </table>
                                                  </div>
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 hover:bg-red-500 rounded-md background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                      onClick={()=> setstudentlist(false)}
                                                    >
                                                        close
                                                    </button>
                                            </div>
                                        </motion.div>
                                </div>
                         
        </>}{studentlist &&  <div   className="opacity-75 fixed inset-0 z-40 bg-black "></div>}
    
    </>
  )
}
