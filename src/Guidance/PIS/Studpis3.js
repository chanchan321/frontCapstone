
import React,{useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function Studpis3({next,student}) {
    

    const educBG = (student && JSON.parse(student.educationalInformation))
    // [{
    //     gradeLevel:'7-12',
    //     schoolAttended:'UI',
    //     inclusiveYearsAttended:'2017-2020'
    // }]
   


    const toDB= (student && JSON.parse(student.educbg2))
    // {
    //     subjectWithLowestGrade:'awdawdadadawda',
    //     subjectWithHighestGrade:'adawdawdadawda',
    //     awards:'awdawdawdawddad',
    //     newscholarship:{
    //         fourpis:true,
    //         cibi:false,
    //         sistersCharity:false,
    //         others:''
    //         }
    // }


  return (
    <>
      <div className='bg-white rounded-md flex flex-col px-2 max-h-[80vh] h-[80vh] min-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black'>

         <div className=' px-4 h-[80vh]'>
                    <div className='text-[18px] font-bold p-2 text-center'> III.EDUCATIONAL BACKGROUND</div>
                    {educBG.map((value,index)=>{
                        return <div key={index} className='border-2 relative border-b-black border-transparent'>
                            <div className='flex flex-col sm:flex-row justify-between'>
                                
                                <div className='mb-4 w-[15%]'>
                                    <div>Grade Level</div>
                                    <input type='text' disabled value={value.gradeLevel} readOnly className='w-[70px] text-center shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                    
                                </div>
                                <div className='mb-4 sm:w-[40%]'>
                                    <div>School Attended</div>
                                    <textarea type='text' disabled value={value.schoolAttended} readOnly className='w-full max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                                    
                                </div>
                                <div className='mb-4 sm:w-[40%]'>
                                    <div>Inclusive Years of Attended</div>
                                    <textarea type='text' disabled value={value.inclusiveYearsAttended} readOnly className='w-full max-h-[50px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                                    
                                </div>
                            </div>         
                        </div>
                    })}
                        <div className=' flex flex-row w-full justify-between border-2 border-t-black border-transparent p-2'>
             
                        </div>
                        <div className='mb-2'>
                                    <div>Subject with the Lowest Grade</div>
                                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                                     value={toDB.subjectWithLowestGrade}></input>
                                    
                                </div> 
                        <div className='mb-2'>
                                    <div>Subject with the Highest Grade</div>
                                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                 readOnly
                                    value={toDB.subjectWithHighestGrade}></input>
                                    
                                </div> 
                        <div className='mb-2'>
                                    <div>Awards Honors Received</div>
                                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                   readOnly
                                    value={toDB.awards}></input>
                                    
                                </div> 
                        <div className='mb-2'>
                                <div className='text-[20px] text-center'>Membership in Organization</div>
                                <div className='flex flex-row flex-wrap justify-around items-center h-[200px]'>
                                    <div><input type='checkbox' checked={toDB.newscholarship.fourpis && true} readOnly className='w-[20px] h-[20px]'/> <span>4ps Beneficiary</span>  </div>
                                    <div><input type='checkbox' checked={toDB.newscholarship.cibi && true} readOnly className='w-[20px] h-[20px]'/> <span>CIBI</span> </div>
                                    <div><input type='checkbox' checked={toDB.newscholarship.sistersCharity && true} readOnly className='w-[20px] h-[20px]'/> <span>Sisters of Charity </span> </div>
                                    <div><input type='checkbox'  checked={toDB.newscholarship.others && true} readOnly className='w-[20px] h-[20px]'/> <span>Other's</span> 
                                    <input type='text' value={toDB.newscholarship.others} readOnly className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input> </div>
                                </div>
                                </div> 


                <div className=' flex flex-row w-full px-2 justify-between sticky py-2 border-2 border-t-black border-transparent left-0 bottom-0 bg-white'>
                                    <div className='bg-red-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold cursor-pointer hover:bg-red-500' 
                                    onClick={()=>{
                                        next(2)
                                    } }>BACK</div>
                                    <div className='bg-green-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold  cursor-pointer hover:bg-green-500' 
                                    onClick={()=>{
                                        next(4)
                                    } }>NEXT</div>
                                </div>
            </div>
            
        </div>
    </>
  )
}
