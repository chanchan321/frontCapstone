
import React,{useState} from 'react'
import { motion } from "framer-motion"
import useStorePIS from '../../Store/storePIS';
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function AddEducbg({close,refresh}) {


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

      const [gradeLevel,setgradeLevel]= useState('')
      const [schoolAttended,setschoolAttended]= useState('')
      const [inclusiveYearsAttended,setinclusiveYearsAttended]= useState('')

      const educBG = useStorePIS((state)=>state.educBG)

    //   const [educBG,seteducBG] =useState(
    //     [{
    //         gradeLevel:'1-6',
    //         schoolAttended:'ACS',
    //         inclusiveYearsAttended:'2012-2025'
    //     },{
    //         gradeLevel:'11-12',
    //         schoolAttended:'UI',
    //         inclusiveYearsAttended:'2016-2020'
    //     }
    // ]
    // )
    const newgradeLevelbg = 
    {
        gradeLevel:gradeLevel,
        schoolAttended:schoolAttended,
        inclusiveYearsAttended:inclusiveYearsAttended
    }


    const pisID = useStorePIS((state)=>state.pisID)
    const savetoDB = async (e) =>{
      e.preventDefault()
      close(false)

        const toDB=[...educBG,newgradeLevelbg]


        try{
          const response= await Axios.patch(`http://localhost:3500/pis`,
          {
            pisID:pisID,
            content:toDB,
            tableName:'educationalInformation'

          })
            Swal.fire({
                icon: 'success',
                title: 'SAVED',
                showConfirmButton: false,
              })
              refresh()
        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
      }


  return (
    <>
          
            <div className="absolute top-[10%] left-0 w-[100%] h-[1px] z-50 flex justify-center font-[poppins] min-w-[300px] ">
                                {/*content*/}
                                            <motion.form onSubmit={savetoDB} className="mx-auto border-0 rounded-lg shadow-lg fixed flex flex-col w-fit bg-[white] outline-none focus:outline-none"
                                              variants={container}
                                              initial="hidden"
                                              animate="show"> 
                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                        <h3  className=" text-[black] w-full m-auto flex flex-col items-center">
                                                              <div className='text-[25px] break-words'>Educational background</div>
                                                        </h3>
                                                    </div>
                                    {/*body*/}
                                                <div className=" p-6 z-50 w-[320px] sm:w-[370px]">
                                                    <div className='mb-2'>
                                                        <div>GradeLevel</div>
                                                        <input type='number' min='6' max='12' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setgradeLevel(e.target.value)}
                                                        value={gradeLevel}></input>
                                                        
                                                    </div>       
                                                    <div className='mb-2'>
                                                        <div>SchoolAttended</div>
                                                        <input type='text' required className='w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setschoolAttended(e.target.value)}
                                                        value={schoolAttended}></input>
                                                        
                                                    </div>     
                                                    <div className='mb-2'>
                                                        <div>InclusiveYearsAttended</div>
                                                        <input type='text' required className='max-h-[50px] w-full shadow-inner shadow-gray-500/50 border-[1px] border-gray-200 rounded-md px-2'
                                                        onChange={(e)=> setinclusiveYearsAttended(e.target.value)}
                                                        value={inclusiveYearsAttended}></input>
                                                        
                                                    </div>       
                                                </div>
                                    {/*footer*/}
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-white-500 background-transparent text-black font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={()=>close(false)}
                                                    >
                                                        close
                                                    </button>
                                                    <button
                                                        className="bg-green-400 hover:bg-green-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="submit">
                                                         SAVE
                                                    </button>
                                            </div>
                                        </motion.form>
                                </div>
                          <div   className="opacity-25 fixed inset-0 z-40 bg-black "></div>
                                    
    </>
  )
}
