import React,{useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStorePIS from '../Store/storePIS';
import AddSiblings from './MODALS/addSiblings';

export default function Pis2Familybg({next,refresh,load}) {

    const pisFb = useStorePIS((state)=>state.fb)
    const sib = useStorePIS((state)=>state.sib)
    const maritalStatus = useStorePIS((state)=>state.marital)

    const [father,setfather] = useState(pisFb && pisFb.father)
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

    const [mother,setmother] = useState(pisFb && pisFb.mother)
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

    const [guardian,setguardian] = useState(pisFb && pisFb.guardian)
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

    const [fstatus,setfstatus]= useState(father.status)
    const [fname,setfname]= useState(father.name)
    const [fage,setfage]= useState(father.age)
    const [freligion,setfreligion]= useState(father.religion)
    const [fnationality,setfnationality]= useState(father.nationality)
    const [feducationalAttainment,setfeducationalAttainment]= useState(father.educationalAttainment)
    const [foccupation,setfoccupation]= useState(father.occupation)
    const [fpositionEmployer,setfpositionEmployer]= useState(father.positionEmployer)
    const [fofficeBusinessAddress,setfofficeBusinessAddress]= useState(father.officeBusinessAddress)
    const [fcontactNumber,setfcontactNumber]= useState(father.contactNumber)

    const [mstatus,setmstatus]= useState(mother.status)
    const [mname,setmname]= useState(mother.name)
    const [mage,setmage]= useState(mother.age)
    const [mreligion,setmreligion]= useState(mother.religion)
    const [mnationality,setmnationality]= useState(mother.nationality)
    const [meducationalAttainment,setmeducationalAttainment]= useState(mother.educationalAttainment)
    const [moccupation,setmoccupation]= useState(mother.occupation)
    const [mpositionEmployer,setmpositionEmployer]= useState(mother.positionEmployer)
    const [mofficeBusinessAddress,setmofficeBusinessAddress]= useState(mother.officeBusinessAddress)
    const [mcontactNumber,setmcontactNumber]= useState(mother.contactNumber)

    const [grelationshipW,setrelationshipW]= useState(guardian.relationshipW)
    const [gname,setgname]= useState(guardian.name)
    const [gage,setgage]= useState(guardian.age)
    const [greligion,setgreligion]= useState(guardian.religion)
    const [gnationality,setgnationality]= useState(guardian.nationality)
    const [geducationalAttainment,setgeducationalAttainment]= useState(guardian.educationalAttainment)
    const [goccupation,setgoccupation]= useState(guardian.occupation)
    const [gpositionEmployer,setgpositionEmployer]= useState(guardian.positionEmployer)
    const [gofficeBusinessAddress,setgofficeBusinessAddress]= useState(guardian.officeBusinessAddress)
    const [gcontactNumber,setgcontactNumber]= useState(guardian.contactNumber)
    const [gMonthStayed,setgMonthStayed]= useState(guardian.monthStayed)

    const objectTopis = {
        father:{
            status:fstatus,
            name:fname,
            age:fage,
            religion:freligion,
            nationality:fnationality,
            educationalAttainment:feducationalAttainment,
            occupation:foccupation,
            positionEmployer:fpositionEmployer,
            officeBusinessAddress:fofficeBusinessAddress,
            contactNumber:fcontactNumber
        },
        mother:{
            status:mstatus,
            name:mname,
            age:mage,
            religion:mreligion,
            nationality:mnationality,
            educationalAttainment:meducationalAttainment,
            occupation:moccupation,
            positionEmployer:mpositionEmployer,
            officeBusinessAddress:mofficeBusinessAddress,
            contactNumber:mcontactNumber

        },
        guardian:{
            relationshipW:grelationshipW,
            name:gname,
            age:gage,
            religion:greligion,
            nationality:gnationality,
            educationalAttainment:geducationalAttainment,
            occupation:goccupation,
            positionEmployer:gpositionEmployer,
            officeBusinessAddress:gofficeBusinessAddress,
            contactNumber:gcontactNumber,
            monthStayed:gMonthStayed

        }
    }

    const SaveAvailable = (e) =>{

        e.preventDefault()

        if (sib.length> 0){
                next(3)
                finishLater()
                savetoDB()
        }else{
            Swal.fire({
                icon: 'error',
                title:'enter credentials',
                text: 'Father or Mother or Guardian or siblings is Empty',
                showConfirmButton: false,
              })
        }
      
    }

    const pisID = useStorePIS((state)=>state.pisID)

    const savetoDB = async (show) =>{
        load(true)
        try{
          const response= await Axios.patch(`http://localhost:3500/pis`,
          {
            pisID:pisID,
            content:objectTopis,
            tableName:'familyBackground'
          })
          {show === 'true' ? refresh('finishL') : refresh() }
        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }

        try{
            const response= await Axios.patch(`http://localhost:3500/pis`,
            {
              pisID:pisID,
              content:newMaritalStatus,
              tableName:'maritalStatus'
            })
           
            {show === 'true' ? refresh('finishL') : refresh() }
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }

      const addFamilybg = useStorePIS( state => state.addFamilybg)
      const addMaritalS = useStorePIS( state => state.addMaritalS)

      const finishLater = ()=>{
        addFamilybg(objectTopis)
        addMaritalS(newMaritalStatus)
         }

    const removeSiblings = async (index) =>{
        sib.splice(index,1)

        const updatedSib = sib       
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const response= await Axios.patch(`http://localhost:3500/pis`,
                    {
                      pisID:pisID,
                      content:updatedSib,
                      tableName:'siblings'
                    })
                      Swal.fire({
                          icon: 'success',
                          title: 'Deleted!',
                          showConfirmButton: false,
                        })
                        refresh()
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
      
    }

    const [showaddSiblings,setShowaddSiblings] = useState(false)


    const [married,setmarried]= useState(maritalStatus.married)
    const [livingTogether,setlivingTogether]= useState(maritalStatus.livingTogether)
    const [singleParent,setsingleParent]= useState(maritalStatus.singleParent)
    const [widow,setwidow]= useState(maritalStatus.widow)
    const [temporarySeperated,settemporarySeperated]= useState(maritalStatus.temporarySeperated)
    const [permanentlySeperated,setpermanentlySeperated]= useState(maritalStatus.permanentlySeperated)
    const [marriedAnnulled,setmarriedAnnulled]= useState(maritalStatus.marriedAnnulled)
    const [fatherOfw,setfatherOfw]= useState(maritalStatus.fatherOfw)
    const [motherOfw,setmotherOfw]= useState(maritalStatus.motherOfw)
    const [fatherWpartner,setfatherWpartner]= useState(maritalStatus.fatherWpartner)
    const [motherWpartner,setmotherWpartner]= useState(maritalStatus.motherWpartner)

    const newMaritalStatus = {
        married:married,
        livingTogether:livingTogether,
        singleParent:singleParent,
        widow:widow,
        temporarySeperated:temporarySeperated,
        permanentlySeperated:permanentlySeperated,
        marriedAnnulled:marriedAnnulled,
        fatherOfw:fatherOfw,
        motherOfw:motherOfw,
        fatherWpartner:fatherWpartner,
        motherWpartner:motherWpartner
    }

    

  return (
    <>
  <form onSubmit={SaveAvailable} className='bg-white rounded-md flex flex-col px-2 max-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black'>

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
                                    name="fstatus"
                                    value="living"
                                    checked={fstatus === 'living'}
                                    onChange={(e)=>setfstatus(e.target.value)}/> <span>Living</span> </div>
                                <div><input type='radio' className='w-[20px] h-[20px]'
                                    name="fstatus"
                                    value="deceased"
                                    checked={fstatus === 'deceased'}
                                    onChange={(e)=>setfstatus(e.target.value)}/> <span>Deceased</span> </div>
                            </div>
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                          onChange={(e)=> setfname(e.target.value)}
                          value={fname}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='number' min='10' max='99' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onChange={(e)=> setfage(e.target.value)}
                                value={fage}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onChange={(e)=> setfreligion(e.target.value)}
                                value={freligion}></input>
                                
                            </div>
                        </div>

                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onChange={(e)=> setfnationality(e.target.value)}
                                value={fnationality}></input>
                            
                        </div>
                        
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setfeducationalAttainment(e.target.value)}
                    value={feducationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setfoccupation(e.target.value)}
                    value={foccupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setfpositionEmployer(e.target.value)}
                    value={fpositionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setfofficeBusinessAddress(e.target.value)}
                    value={fofficeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' required={fstatus === 'living'} disabled={fstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                     placeholder='+639123456789'
                     pattern='^(\+63)(\d){10}$'
                    onChange={(e)=> setfcontactNumber(e.target.value)}
                    value={fcontactNumber}></input>
                    
                </div> 
                
            
        </div>
        {/* //////////////////////////////MOTHER */}
        <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>MOTHER</div>
                    
                    <div className='flex flex-row justify-around items-center'>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                    name="mstatus"
                                    value="living"
                                    checked={mstatus === 'living'}
                                    onChange={(e)=>setmstatus(e.target.value)}/> <span>Living</span>  </div>
                                <div><input type='radio' className='w-[20px] h-[20px]' 
                                    name="mstatus"
                                    value="deceased"
                                    checked={mstatus === 'deceased'}
                                    onChange={(e)=>setmstatus(e.target.value)}/><span>Deceased</span> </div>
                            </div>
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                         onChange={(e)=> setmname(e.target.value)}
                         value={mname}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='number' min='10' max='99' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                 onChange={(e)=> setmage(e.target.value)}
                                 value={mage}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                 onChange={(e)=> setmreligion(e.target.value)}
                                 value={mreligion}></input>
                                
                            </div>
                        </div>
                        
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            onChange={(e)=> setmnationality(e.target.value)}
                            value={mnationality}></input>
                            
                        </div>
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setmeducationalAttainment(e.target.value)}
                    value={meducationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setmoccupation(e.target.value)}
                    value={moccupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setmpositionEmployer(e.target.value)}
                    value={mpositionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setmofficeBusinessAddress(e.target.value)}
                    value={mofficeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' required={mstatus === 'living'} disabled={mstatus === 'deceased'} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    placeholder='+639123456789'
                    pattern='^(\+63)(\d){10}$'
                    onChange={(e)=> setmcontactNumber(e.target.value)}
                    value={mcontactNumber}></input>
                    
                </div> 
                
            
        </div>
         {/* //////////////////////////////Guardian */}
         <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>GUARDIAN "OPTIONAL"</div>
                    <div className='mb-2'>
                        <div>Indicate Relationship</div>
                        <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} placeholder='TITA/LOLA' className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        onChange={(e)=> setrelationshipW(e.target.value)}
                        value={grelationshipW}></input>
                    </div>  
                    <div className='mb-2'>
                        <div>Name</div>
                        <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                        onChange={(e)=> setgname(e.target.value)}
                        value={gname}></input>
                        
                    </div>  
                    <div className='flex flex-col sm:flex-row justify-between'>
                        <div className='flex flex-row'>
                            <div className='mb-2'>
                                <div>Age</div>
                                <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onChange={(e)=> setgage(e.target.value)}
                                value={gage}></input>
                                
                            </div>
                            
                            <div className='mb-2 mx-2'>
                                <div>Religion</div>
                                <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                onChange={(e)=> setgreligion(e.target.value)}
                                value={greligion}></input>
                                
                            </div>
                        </div>
                        
                        <div className='mb-2'>
                            <div>Nationality</div>
                            <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-[200px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                            onChange={(e)=> setgnationality(e.target.value)}
                            value={gnationality}></input>
                            
                        </div>
                        
                    </div> 
                  
   
                <div className='mb-2'>
                    <div>Educational Attainment</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setgeducationalAttainment(e.target.value)}
                    value={geducationalAttainment}></input>
                    
                </div>  
                <div className='mb-2'>
                    <div>Occupation</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setgoccupation(e.target.value)}
                    value={goccupation}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Position / Employer</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setgpositionEmployer(e.target.value)}
                    value={gpositionEmployer}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Office / Business Address</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setgofficeBusinessAddress(e.target.value)}
                    value={gofficeBusinessAddress}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Contact Number</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    placeholder='+639123456789'
                    pattern='^(\+63)(\d){10}$'
                    onChange={(e)=> setgcontactNumber(e.target.value)}
                    value={gcontactNumber}></input>
                    
                </div> 
                <div className='mb-2'>
                    <div>Number of Months Staying with the Guardian</div>
                    <input type='text' required={!(mstatus === 'living') && !(fstatus === 'living')} className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                    onChange={(e)=> setgMonthStayed(e.target.value)}
                    value={gMonthStayed}></input>
                    
                </div> 
                
        </div>

         {/* //////////////////////////////Number of Siblings */}
         <div className=' px-4 mb-6'>
                    <div className='text-[18px] font-bold'>NUMBER OF SIBLINGS</div>
                    {sib.map((value,index)=>{
                        return <div key={index} className='border-2 relative border-b-black border-transparent '> 
                                    <div className='mb-2'>
                                        <div onClick={()=> removeSiblings(index)} className='bg-red-600 text-white cursor-pointer absolute top-0 right-1 rounded-md hover:bg-red-700 px-2'>X</div>
                                        <div>Name</div>
                                        <input type='text' disabled className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                            value={value.name}
                                        ></input>
                                    
                                  </div>  
                            <div className='flex flex-col sm:flex-row justify-between'>
                                <div className='flex flex-row '>
                                    <div className='mb-2'>
                                        <div>Age</div>
                                        <input type='number' min='10' max='99' disabled className='w-[40px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        value={value.age}
                                       ></input>
                                        
                                    </div>
                                    <div className='mb-2 mx-2'>
                                        <div>Occupation</div>
                                        <input type='text' disabled className='w-[150px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        value={value.occupation}
                                        ></input>
                                        
                                    </div>
                                </div>
                                <div className='mb-2'>
                                    <div>School / Place Of Work</div>
                                    <input type='text' disabled className='w-[240px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                        value={value.school_placeWorkL}
                                    ></input>
                                    
                                </div>
                            </div>         
                        </div>
                    })}
                        <div className=' flex flex-row w-full justify-between border-2 border-t-black border-transparent p-2'>
                            <div className='bg-green-600 rounded-md px-4 py-2 w-full cursor-pointer hover:bg-green-500 text-center text-white font-bold' 
                             onClick={()=>{
                                setShowaddSiblings(true)
                            }}>ADD SIBLING INFO</div>
                        </div>
            
        </div>
                    
         {/* //////////////////////////////Marital Status */}

        <div className=' py-4 mb-6'>
                    <div className='text-[18px] font-bold'>PARENTS' MARITAL STATUS</div>
                    <div className='flex flex-row'>
                        <div className='w-full sm:w-fit'>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' className='w-[30px] h-[20px]' readOnly checked={married && true} ></input>
                                        <div>MARRIED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setmarried(e.target.value)} value={married} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={livingTogether && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>LIVING TOGETHER /SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setlivingTogether(e.target.value)} value={livingTogether} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' onClick={(e)=>setsingleParent(!singleParent)} checked={singleParent && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>SINGLE PARENT:</div>
                                    </div>
                                   
                                </div>

                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={widow && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>WIDOW or WIDOWER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setwidow(e.target.value)} value={widow} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={temporarySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>TEMPORARILY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>settemporarySeperated(e.target.value)} value={temporarySeperated} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={permanentlySeperated && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>PERMANENTLY SEPERATED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setpermanentlySeperated(e.target.value)} value={permanentlySeperated} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>



                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={marriedAnnulled && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MARRIED ANNULLED/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setmarriedAnnulled(e.target.value)} value={marriedAnnulled} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={fatherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setfatherOfw(e.target.value)} value={fatherOfw} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={motherOfw && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER OFW/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setmotherOfw(e.target.value)} value={motherOfw} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-rowpy-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={fatherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>FATHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setfatherWpartner(e.target.value)} value={fatherWpartner} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                <div className='flex flex-col sm:flex-row py-2 w-fit justify-between'>
                                    <div className='flex flex-row'>
                                        <input type='checkbox' checked={motherWpartner && true} readOnly className='w-[30px] h-[20px]'></input>
                                        <div>MOTHER W/ANOTHER PARTNER/SINCE WHEN:</div>
                                    </div>
                                    <input type='text' onChange={(e)=>setmotherWpartner(e.target.value)} value={motherWpartner} className='w-[250px] shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'></input>
                                </div>
                                
                        </div>
                        <div className=''>

                        </div>
                    </div>
                    <input className='bg-green-400 rounded-md px-4 py-2 w-full mx-auto cursor-pointer hover:bg-green-500'
                      type="submit"
                      value="NEXT"
                     />
            
        </div>


            <div className=' flex flex-row w-full justify-between sticky bottom-0 border-2 border-t-black border-transparent bg-white p-2'>
                    <div className='bg-red-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-red-500'
                     onClick={()=> 
                        {
                        next(1)
                        finishLater()
                        savetoDB()
                        }}
                        >BACK</div>
                    
                    <div className='bg-green-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-green-500'
                        onClick={()=>{
                            savetoDB('true')
                        }}
                    >FINISH LATER</div>
                </div>

               
</form>
{showaddSiblings && <AddSiblings close={setShowaddSiblings} refresh={refresh}/> }
    </>
  )
}
