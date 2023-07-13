
import React,{useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
export default function Studpis4({next,student}) {

    const fromDB = (student && JSON.parse(student.uniqueHealthCosult))

    // {
    //   friendsInschool:'ffddfabfd',
    //   outsideInschool:'dbx',
    //   specialInterest:'hdft',
    //   hobbies:'hftd',
    //   characteristicsThatDescibeU:'htd',
    //   presentFears:'htd',
    //   disabilities:'dh',
    //   chronicIllness:'dhdgfbdfg',
    //   medicinesRegTaken:'dfhdfgh',
    //   accidentsExperienced:'dfhdtfg',
    //   operationsExp:'fdthdfg',
    //   immunizations:'dfthfdft',

    //   consultedPsy:false,
    //   howmanysessionPsy:'adawdawdad',
    //   forwhatPsy:'awdadawd',

    //   consultedCoun:false,
    //   howmanysessionCoun:'adawdawd',
    //   forwhatCoun:'adawdaw',

    //   emerContact:'awdawda',
    //   address:'da2add2dsda2ddaw',
    //   contactNumber:'2a2d2'

    // }

 
    
  return (
    <>
      <div className='bg-white rounded-md flex flex-col px-2 max-h-[80vh] min-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black'>
 
      <div className=' px-4'>
                <div className='text-[18px] font-bold p-2 text-center'> IV. UNIQUE FEATURES</div>

                <div className='mb-2'>
                    <div>Friends in School:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        readOnly
                      value={fromDB.friendsInschool}
                    ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Outside in School:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                   readOnly
                    value={fromDB.outsideInschool}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Special Interest:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
            readOnly
                    value={fromDB.specialInterest}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Hobbies:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={fromDB.hobbies}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Characteristics that described you best:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={fromDB.characteristicsThatDescibeU}
                  ></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Present Fears:</div>
                    <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    readOnly
                    value={fromDB.presentFears}
                  ></input>
                    
                </div>  



                <div className='text-[18px] font-bold p-2 text-center'> I. HEALTH INFORMATION </div>

                  <div className='mb-2'>
                        <div>Disabilities/impairments:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                 readOnly
                      value={fromDB.disabilities}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Chronic Illness:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                     readOnly
                      value={fromDB.chronicIllness}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Medicines regularily taken:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                  readOnly
                      value={fromDB.medicinesRegTaken}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Accidents experienced/Effect:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                  readOnly
                      value={fromDB.accidentsExperienced}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Operations experienced/Effect:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                   readOnly
                      value={fromDB.operationsExp}
                    ></input>
                      
                  </div>  
                  <div className='mb-2'>
                        <div>Immunizations you had:</div>
                      <input type='text' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                     readOnly
                      value={fromDB.immunizations}
                    ></input>
                      
                  </div>  

                  <div className='text-[18px] font-bold p-2 text-center'> PREVIOUS PSYCHOLOGICAL CONSULTATIONS </div>
                    {/* /////////////////////////////////////////////// */}
                    <div className='p-2 border-2 border-black mb-1'>
                        <div className='w-full flex flex-col sm:flex-row  justify-between '>

                                  <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Psychiatrist before:</div>
                     
                              
                                  <div className='flex flex-col sm:flex-row'>
                                    <span className='flex flex-row'><input type='radio' readOnly checked={fromDB.consultedPsy? false :true} name='psy' className='w-[30px] h-[20px]'/><span>NO</span></span>
                                    <span className='flex flex-row'><input type='radio' readOnly checked={fromDB.consultedPsy? true :false} name='psy' className='w-[30px] h-[20px]'/><span>YES</span></span>
                                  </div>
                                  <div className='mb-4 w-full sm:w-[40%]'>
                                      <input type='text' value={fromDB.consultedPsy} readOnly className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                      <div>If yes When:</div>
                                    </div>
                        </div>    
                        <div className='mb-2'>
                          <div>How many Sessions/how long:</div>
                            <input type='text' value={fromDB.howmanysessionPsy} readOnly className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        <div className='mb-2'>
                            <div>For What:</div>
                            <input type='text' value={fromDB.forwhatPsy} readOnly className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        </div>

                {/* /////////////////////////////////////////////// */}
                <div className='p-2 border-2 border-black mb-1'>
                              <div className='w-full flex flex-col sm:flex-row justify-between '>

                                    <div className='w-full sm:w-[150px] md:w-fit'>Have you consulted a Counselor of Psychologist before:</div>
                     
                              
                                    <div className='flex flex-col sm:flex-row'>
                                      <span className='flex flex-row'><input type='radio' readOnly checked={fromDB.consultedCoun? false :true} name='coun' className='w-[30px] h-[20px]'/><span>NO</span></span>
                                      <span className='flex flex-row'><input type='radio' readOnly checked={fromDB.consultedCoun? true :false} name='coun' className='w-[30px] h-[20px]'/><span>YES</span></span>
                                    </div>

                                    <div className='mb-4  w-full sm:w-[40%] '>
                                      <input type='text' readOnly value={fromDB.consultedCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                      <div>If yes When:</div>
                                    </div>
                              </div>    
                        <div className='mb-2'>
                            <div>How many Sessions/how long:</div>
                            <input type='text' readOnly value={fromDB.howmanysessionCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                        <div className='mb-2'>
                            <div>For What:</div>
                            <input type='text' readOnly value={fromDB.forwhatCoun} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                       
                </div>  
                <div className='p-2 border-2 border-black mb-1'>
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Person to contact in case of Emergency:</div>
                            <input type='text'value={fromDB.emerContact} readOnly className='w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
             
             
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Address:</div>
                            <textarea type='text' value={fromDB.address} readOnly className=' w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></textarea>
                        </div>  
           
          
                        <div className='mb-2 flex flex-col sm:flex-row justify-between'>
                            <div className='w-fit'>Contact Number:</div>
                            <input type='text' value={fromDB.contactNumber} readOnly className='w-full sm:w-[60%] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                        </div>  
                </div>  
            

            <div className=' flex flex-row w-full justify-between  border-transparent sticky bottom-0 bg-white p-2'>
                                <div className='bg-red-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold  cursor-pointer hover:bg-red-500' 
                                onClick={()=>{
                                   next(3)
                                }}>BACK</div>
                                <div className='bg-green-400 rounded-md px-4 py-2 w-1/2 text-center textS font-bold  cursor-pointer hover:bg-green-500' 
                                onClick={()=>{
                                   next(5)
                                }}>NEXT</div>
                               
                            </div>
        </div>
      </div>
      
 

    </>
  )
}
