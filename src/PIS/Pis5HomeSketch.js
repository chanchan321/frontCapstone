import React,{useEffect, useState, useRef} from 'react'
import useStorePIS from '../Store/storePIS';
import useStore from '../Store/store';
import Axios from 'axios';
import Swal from 'sweetalert2'


export default function Pis5HomeSketch({next,refresh,load}) {

  const pisPb = useStorePIS((state)=>state.homeS)
  const cUser = useStore(state => state.cUser)
  const pisID = useStorePIS((state)=>state.pisID)
  

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
     },[pisPb])

    

const formData = new FormData()

const [filee,setfilee]= useState('')

const sendFiles = async (e) => {
  load(true)
      e.preventDefault()
  
        const myFiles = document.getElementById('myFiles').files
  
        Object.keys(myFiles).forEach(key => {
          formData.append(myFiles.item(key).name, myFiles.item(key))
      })

      // formData.append(myFiles.name, myFiles)
      
        const response = await fetch(`http://localhost:3100/upload/${pisID}/${JSON.stringify(pisPb)}`, {
          method: 'POST',
          body: formData
      })

      const json = await response.json()
      setfilee(null)
      // document.getElementById("myFiles").value ='';  

      if(json.status === 'error'){
         return  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text:`${json.message}`,
                    showConfirmButton: false,
                    timer: 1500
                }) 
      }
      refresh()
        Swal.fire({
          icon: 'success',
          title: 'file inserted',
          text:`${json.message}`,
          showConfirmButton: false,
          timer: 1500
      }) 
             
  }
const removePic = (value,index) =>{
  
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const pictures= JSON.stringify(pisPb);
        const removed =  pisPb.splice(index, 1)
        // console.log(JSON.stringify(removed))
        // console.log(JSON.stringify(pisPb))
        load(true)
      try{
        const response= await Axios.delete(`http://localhost:3100/img/delete/${pisID}/${JSON.stringify(removed)}/${JSON.stringify(pisPb)}`)
          // console.log(response)
          refresh()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'picture deleted',
            showConfirmButton: false,
            timer: 1500
          })
      }catch (err){
        console.log(err.response.request.status)
      }
    }
  })
}


  return (
    <>
      <div className='bg-white rounded-md flex flex-col px-4 max-h-[80vh] min-h-[80vh] overflow-auto overflow-x-hidden shadow-md shadow-black relative'>
                   <div className='text-[18px] font-bold p-2 text-center'> VI.HOME SCKETCH</div>
                    <form onSubmit={sendFiles} className='w-full max-w-[300px] sm:w-[800px] mx-auto py-2 flex flex-row justify-between'>
                        <input type="file" id="myFiles" accept="image/*" onChange={(e)=> setfilee(e.target.value)}/>
                        {filee && <button className='bg-green-500 px-4 rounded-md textS font-bold shadow-sm shadow-black'>INSERT</button> }
                    </form>
                    
                    <div className='border border-black h-[400px] overflow-auto p-2'>
                        <div>{noImg.current? noImg.current:<>
                            <div className=''>
                              {images && images.map((value,index)=>{ 
                                return <div key={index} className='relative'>
                                     <img  src={value} className='w-full sm:w-[950px] h-[350px] mb-3'/> 
                                    <div className=' absolute top-0 right-0'>
                                      <span className='bg-green-500 px-4 py-2'>{index+1}</span>{' '}
                                      <span onClick={()=> removePic(value,index)} className='cursor-pointer bg-red-500 text-white font-bold px-4 py-2'>REMOVE</span></div>
                                  </div>
                                })}
                            </div>
                            </>}
                          </div>
                    </div>
                    
                    <div className=' flex flex-row justify-between border-transparent items-center bg-white p-2'>
                                <div className='bg-red-400 rounded-md px-4 py-2 w-fit cursor-pointer hover:bg-red-500' onClick={()=> next(4)}>BACK</div>   
                    </div>

                

    </div>
     
      
 

    </>
  )
}
