
import React,{useEffect, useState, useRef} from 'react'
import Axios from 'axios';

export default function Studpis5({next,student}) {
  const pisPb =(student && JSON.parse(student.homeSketch))
  const pisID= student.pisID
  const noImg = useRef();

  const [images,setimages]= useState('')



    const getPisContent = async (imagess)=>{
      noImg.current = ''  
      const toIterate = []

      if(imagess[0]? true:false){
          
        for(let index = 0; index < pisPb.length; index++){
              const imgname = imagess[index]

              try{
                  const response= await Axios.get(`http://localhost:3100/img/${pisID}/${imgname}`,{
                    responseType: 'blob'
                  })
                    toIterate.push(URL.createObjectURL(response.data))
                  
                }catch (err){
                  console.log(err.response.request.status)
                }
              }
      }else{
        noImg.current = 'No Image'
      }
      setimages(toIterate)
    }

     useEffect(()=>{
      getPisContent(pisPb)
     },[])




  return (
    <>
     <div className='bg-white rounded-md flex flex-col px-4 max-h-[80vh] min-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black relative'>
                   <div className='text-[18px] font-bold p-2 text-center'> VI.HOME SCKETCH</div>
                  
                    
                    <div className='border border-black h-[450px] overflow-auto p-2'>
                        <div>{noImg.current? noImg.current:<>
                            <div className=''>
                              {images && images.map((value,index)=>{ 
                                return <div key={index} className='relative'>
                                     <img  src={value} className='w-[950px] h-[400px] mb-3'/> 
                                    <div className=' absolute top-0 right-0'>
                                      <span className='bg-green-500 px-4 py-2'>{index+1}</span>{' '}</div>
                                  </div>
                                })}
                            </div>
                            </>}
                          </div>
                    </div>
                    
                    <div className=' flex flex-row justify-between border-transparent items-center bg-white p-2'>
                                <div className='bg-red-400 rounded-md px-4 text-center py-2 textS font-bold w-full cursor-pointer hover:bg-red-500' onClick={()=> next(4)}>BACK</div>   
                    </div>

                

    </div>
     
      
 

    </>
  )
}
