import React,{useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function Studpis2({next,student}) {
   
    const studentRec = (student && JSON.parse(student.familyBackground))
    const studentSib = (student && JSON.parse(student.siblings))
    const newMaritalStatus = (student && JSON.parse(student.maritalStatus)) 
    
    const [father,setfather] = useState(studentRec && studentRec.father)
    // {
    //     status:'living',
    //     name:'Juan DelCruz',
    //     age:66,
    //     religion:'Catholic',
    //     nationality:'Filipino',
    //     educationalAttainment:'tagaBantay',
    //     occupation:'bakal na Cruz',
    //     positionEmployer:'tagaBantay',
    //     officeBusinessAddress:'kampusanto',
    //     contactNumber:'09461991211'
    // })

    const [mother,setmother] = useState(studentRec && studentRec.mother)
    //     {
    //     status:'living',
    //     name:'Juan DelCruz',
    //     age:66,
    //     religion:'Catholic',
    //     nationality:'Filipino',
    //     educationalAttainment:'tagaBantay',
    //     occupation:'bakal na Cruz',
    //     positionEmployer:'tagaBantay',
    //     officeBusinessAddress:'kampusanto',
    //     contactNumber:'09461991211'
    // })

    const [guardian,setguardian] = useState(studentRec && studentRec.guardian)
    //     {
    //     relationshipW:'tita',
    //     name:'Juan DelCruz',
    //     age:66,
    //     religion:'Catholic',
    //     nationality:'Filipino',
    //     educationalAttainment:'tagaBantay',
    //     occupation:'bakal na Cruz',
    //     positionEmployer:'tagaBantay',
    //     officeBusinessAddress:'kampusanto',
    //     contactNumber:'09461991211',
    //     monthStayed:'1month'
    // })

    // const siblings = 
    // [{
    //     name:'awdadadadad',
    //     age:2,
    //     occupation:'adawdawdawd',
    //     schoolOrWOrk:'awdadawdaw'
    // },
    // {
    //     name:'awdadadadad',
    //     age:2,
    //     occupation:'adawdawdawd',
    //     schoolOrWOrk:'awdadawdaw'
    // }]

    // const newMaritalStatus = {
    //     married:'',
    //     livingTogether:'',
    //     singleParent:true,
    //     widow:'',
    //     temporarySeperated:'',
    //     permanentlySeperated:'',
    //     marriedAnnulled:'',
    //     fatherOfw:'',
    //     motherOfw:'',
    //     fatherWpartner:'',
    //     motherWpartner:''
    // }


  return (
    <>
  <div className='bg-white rounded-md flex flex-col px-2 max-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black'>

<div className=' w-full flex flex-col  justify-around h-[50%] order'>
    <div className='w-full  px-4'>
                    <div className='text-[18px] font-bold self-start text-center'>II. FAMILY BACKGROUND</div>
    </div>
</div>
    {/* //////////////////////////////FATHER */}
    <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>FATHER</div>

                            <div className='flex flex-row justify-around items-center'>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                readOnly
                                    name="fstatus"
                                    value="living"
                                    checked={father.status === 'living'}
                                    /> <span>Living</span>  </div>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                readOnly
                                    name="fstatus"
                                    value="deceased"
                                    checked={father.status === 'deceased'}
                                    /><span>Deceased</span> </div>
                            </div>
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                          value={father.name}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='text' className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                              readOnly
                                value={father.age}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                                value={father.religion}></input>
                                
                            </div>
                        </div>
                        
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                         readOnly
                            value={father.nationality}></input>
                            
                        </div>
                        
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
              readOnly
                    value={father.educationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                   readOnly
                    value={father.occupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 readOnly
                    value={father.positionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                   readOnly
                    value={father.officeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 readOnly
                    value={father.contactNumber}></input>
                    
                </div> 
                
            
        </div>
        {/* //////////////////////////////MOTHER */}
        <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>MOTHER</div>
                    
                    <div className='flex flex-row justify-around items-center'>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                readOnly
                                    name="mstatus"
                                    value="living"
                                    checked={mother.status === 'living'}
                                    /> <span>Living</span>  </div>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                readOnly
                                    name="mstatus"
                                    value="deceased"
                                    checked={mother.status === 'deceased'}
                                    /><span>Deceased</span> </div>
                            </div>
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                       readOnly
                         value={mother.name}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='text' className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                 readOnly
                                 value={mother.age}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                                 value={mother.religion}></input>
                                
                            </div>
                        </div>
                        
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                readOnly
                            value={mother.nationality}></input>
                            
                        </div>
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                    value={mother.educationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                    value={mother.occupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={mother.positionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={mother.officeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                    value={mother.contactNumber}></input>
                    
                </div> 
                
            
        </div>
         {/* //////////////////////////////Guardian */}
         <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>GUARDIAN "OPTIONAL"</div>
                    <div className='mb-2'>
                        <div>Indicate Relationship</div>
                        <input type='text' placeholder='TITA/LOLA' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                        value={guardian.relationshipW}></input>
                    </div>  
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                        value={guardian.name}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='text' className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                                value={guardian.age}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                    readOnly
                                value={guardian.religion}></input>
                                
                            </div>
                        </div>
                        
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                readOnly
                            value={guardian.nationality}></input>
                            
                        </div>
                        
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                    value={guardian.educationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            readOnly
                    value={guardian.occupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                    value={guardian.positionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                    value={guardian.officeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={guardian.contactNumber}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Number of Months Staying with the Guardian</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                readOnly
                    value={guardian.MonthStayed}></input>
                    
                </div> 
                
        </div>

         {/* //////////////////////////////Number of Siblings */}
         <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>NUMBER OF SIBLINGS</div>
                    {studentRec && studentSib.map((value,index)=>{
                        return <div key={index} className='border-2 relative border-b-black border-transparent '> 
                                    <div className='mb-2'>

                                        <div>Name</div>
                                        <input type='text' disabled className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                         readOnly  
                                         value={value.name}
                                        ></input>
                                    
                                  </div>  
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <div className='flex flex-row '>
                                    <div className='mb-2'>
                                        <div>Age</div>
                                        <input type='text' disabled className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        readOnly
                                        value={value.age}
                                       ></input>
                                        
                                    </div>
                                    <div className='mb-2 mx-2'>
                                        <div>Occupation</div>
                                        <input type='text' disabled className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        readOnly
                                        value={value.occupation}
                                        ></input>
                                        
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <div>School / Place Of Work</div>
                                    <input type='text' disabled className='w-[240px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        readOnly
                                        value={value.school_placeWorkL}
                                    ></input>
                                    
                                </div>
                            </div>         
                        </div>
                    })}
                      
            
        </div>
                    
         {/* //////////////////////////////Marital Status */}

        <div className=' py-4 mb-6'>
                    <div className='text-[18px] font-bold'>PARENTS' MARITAL STATUS</div>
                    <div className='flex flex-row'>
                        <div className='w-full sm:w-fit'>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' className='w-[30px] h-[20px]' readOnly checked={newMaritalStatus.married && true} ></input>
                                        <div>MARRIED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' value={newMaritalStatus.married} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.livingTogether && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>LIVING TOGETHER /SINCE WHEN:</div>
                                    </div>
                                    <input type='text'  value={newMaritalStatus.livingTogether} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.singleParent && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>SINGLE PARENT:</div>
                                    </div>
                                   
                                </div>

                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.widow && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>WIDOW or WIDOWER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' value={newMaritalStatus.widow} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.temporarySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>TEMPORARILY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text'value={newMaritalStatus.temporarySeperated} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.permanentlySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>PERMANENTLY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text'  value={newMaritalStatus.permanentlySeperated} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>



                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.marriedAnnulled && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MARRIED ANNULLED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' value={newMaritalStatus.marriedAnnulled} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.fatherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' value={newMaritalStatus.fatherOfw} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.motherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' value={newMaritalStatus.motherOfw} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-rowpy-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.fatherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text'  value={newMaritalStatus.fatherWpartner} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={newMaritalStatus.motherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text'  value={newMaritalStatus.motherWpartner} readOnly className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                
                        </div>
                        <div className=''>

                        </div>
                    </div>
            
        </div>


            <div className=' flex flex-row w-full justify-between sticky bottom-0 border-2 border-t-black border-transparent bg-white p-2'>
                    <div className='bg-red-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold  cursor-pointer hover:bg-red-500'
                     onClick={()=> 
                        {
                        next(1)
                        }}
                        >BACK</div>
                    <div className='bg-green-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold  cursor-pointer hover:bg-green-500'
                     onClick={()=>{
                        next(3)
                     }}>NEXT</div>
                </div>

                
</div>
    </>
  )
}
