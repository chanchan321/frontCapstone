import React,{useState,useEffect} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'


export default function StudPis({next,student}) {
    const [personalbg,setPersonalbg] = useState(student && JSON.parse(student.personalBackground))
  return (

    <>
       <div className='bg-white rounded-md flex flex-col px-2 pt-2 w-[100%] max-h-[80vh] overflow-auto shadow-md shadow-black relative'>

<div className=' w-full flex flex-col lg:flex-row justify-around h-[50%] order'>
    <div className='w-full lg:w-[55%]'>
                    <div className='text-[18px] font-bold'>I. Personal Background</div>

                    <div className='mb-2'>
                        <div>Lastname:</div>
                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                readOnly
                             value={personalbg.lastname}></input>
                    </div>  

                    <div className='mb-2'>
                        <div>Firstname:</div>
                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                         value={personalbg.firstname}></input>
                    </div> 

                    <div className='mb-2'>
                        <div>Middlename:</div>
                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                readOnly
                        value={personalbg.middlename}
                        ></input>
                    </div> 

                    
    </div>

            <div className=' w-full lg:w-[35%] justify-between items-center'>
                    <div className='my-2'>
                        <div>LRN:</div>
                        <input type='text' disabled className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                  readOnly
                        value={personalbg.lrn}></input>
                    </div>
                    <div className='flex flex-row '>
                        <div className='mb-2 mx-2'>
                            <div>Age:</div>
                            <input type='text' required className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                          readOnly
                            value={personalbg.age}
                            ></input>

                        </div>
                        <div className='mb-2'>
                                <div>Gender:</div>
                                <select name="gender" value={personalbg.gender} required className='shadow-inner shadow-gray-500/50 rounded-md' 
                            readOnly >
                                    <option value=" "></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                        </div>
                        
                    </div> 
                    <div className='mb-2'>
                            <div>Date of Birth:</div>
                            <input type='date' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        readOnly
                            value={personalbg.dateOfBirth}
                            ></input>
                            
                        </div>
            
            </div>

</div>
<div className=' px-2 h-[50%]'>
        <div className='mb-2 px-2'>
            <div>Place of Birth:</div>
            <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                readOnly
           value={personalbg.placeOfBirth}></input>
        </div>  

        <div className='flex flex-col sm:flex-row justify-start px-2'>

                           
                                <div className='mb-2 '>
                                    <div>Religion:</div>
                                    <input type='text' className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                    readOnly
                                    value={personalbg.religion}></input>
                                </div>
                        
                           
                                <div className='mx-2 mb-2 '>
                                    <div>Civil Status:</div>
                                    <select name="cars" id="cars" className='w-[100px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        readOnly
                                        value={personalbg.civilStatus}>
                                        <option value=""></option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>
                          
                        

                        <div className='mb-2 '>
                                <div>Birth Among Siblings:</div>
                                <select name="cars" id="cars" className='w-[100px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                                    value={personalbg.birthAmongSib}>
                                    <option value=""></option>
                                    <option value="eldest">Eldest</option>
                                    <option value="middle">Middle</option>
                                    <option value="youngest">Youngest</option>
                                    <option value="onlychild">Only Child</option>
                                </select>
                            
                        </div>
                        
        </div> 
                        <div className='flex flex-row justify-start '>
                                        <div className='mb-2 mx-2'>
                                            <div>Citizenship:</div>
                                            <input type='text'className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                    readOnly
                                            value={personalbg.birthAmongSib}></input>
                                            
                                        </div>
                                        <div className='mb-2 '>
                                            <div>Cellphone No.#:</div>
                                            <input type='text' className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                    readOnly
                                             value={personalbg.cellphoneNo}></input>
                                        </div>
                                        
                        </div> 
                        <div className='flex flex-col sm:flex-row justify-start '>
                                        <div className=' mb-2 mx-2'>
                                            <div>Email:</div>
                                            <input type='text' placeholder='example@gmail.com' className=' w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                  readOnly              
                                            value={personalbg.eMail}></input>
                                            
                                        </div>
                                        <div className=' mb-2 mx-2'>
                                            <div>Landline:</div>
                                            <input type='text' className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                    readOnly
                                            value={personalbg.landline}></input>
                                            
                                        </div>
                                        
                        </div> 
                        <div className='mb-2 px-2'>
                            <div>Current Address:</div>
                            <textarea  className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'
                                    readOnly
                             value={personalbg.currentAddress}></textarea>
                            
                        </div>
                        <div className='mb-2 px-2'>
                            <div>Permanent Address:</div>
                            <textarea  className='w-full shadow-inner shadow-gray-500/50 border-[1px] max-h-[50px] border-gray-200 rounded-md px-2'
                                    readOnly
                             value={personalbg.permanentAddress}></textarea>
                            
                        </div>
                        <div className='mb-2 px-2'>
                            <div>Language /Dialect Spoken At home:</div>
                            <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                             value={personalbg.languageSpoken}></input>
                            
                        </div>
                    
                    

                </div>
                        <div className=' flex flex-row w-full justify-between sticky bottom-0 border-2 border-t-black border-transparent p-2 bg-white'>
                            <div className='bg-green-400 rounded-md px-4 py-2 w-full text-center textS font-bold  cursor-pointer hover:bg-green-500' 
                            onClick={()=>
                                {
                                    next(2)
                           
                                } 
                            }>NEXT</div>
                        </div>

                    {/* {opencover && 
                        <div onClick={()=> setOpencover(false)} className='bg-black cursor-pointer bg-opacity-50 rounded-md flex flex-col justify-center w-[98%] h-[78vh] overflow-auto shadow-md shadow-black absolute'>
                                <img src = {paper} alt='PIS' className='min-w-[300px] w-[200px] text-white rotate-160 mx-auto '/>
                                <p className='text-center text-[30px] font-bold font-[poppins] textS'>Personal Information Sheet</p>
                                <p className='text-center text-[20px] font-bold font-[poppins] textS'>"CLICK ANYWHERE"</p>
                        </div>} */}
        </div>
</>
  )
}
