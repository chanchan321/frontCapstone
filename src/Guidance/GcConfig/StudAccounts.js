import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'
import AddStudents from './AddStudents';

export default function StudAccounts() {


    const [students,setStudents] = useState()
    const [toFilter,settoFilter] = useState([])

    const getPisContent = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getStud`)
                if(!response.data) return alert('ERROR')
                setgradefilter('all')
                setStudents(response.data)
                settoFilter(response.data)
          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
    useEffect(()=>{
        getPisContent()
    },[])

    const [addStud,setaddStud] = useState(false)


    const [gradefilter,setgradefilter] = useState('all')
    const [filterSearch,setfilterSearch] = useState('')

    const filterstud = (e)=>{
        setfilterSearch(e)
        if(e){
           if(gradefilter === 'all' ){
               return setStudents(toFilter.filter((stud)=> (stud.lastname).includes(e)))
            }else{
                return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter).filter((stud)=> (stud.lastname).includes(e)))
            }
        }
      
        if(gradefilter === 'all' ){
            return setStudents(toFilter)
         }else{
             return setStudents(toFilter.filter((stud)=> stud.gradeLevel === gradefilter))
         }
    
      }

      const filtergrade = (e)=>{
        setgradefilter(e)
        if(e === 'all') return setStudents(toFilter)

        setStudents(toFilter.filter((stud)=> (stud.gradeLevel) === (e)))
        setfilterSearch('')
      }

      const resetPass = (value) =>{
        Swal.fire({
            title: 'Are you sure?',
            text:"Are you sure you want to reset?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reset it!'
          }).then( async (result) => {
            if (result.isConfirmed) {
                try{
                    const response= await Axios.patch(`http://localhost:3500/studentAccount`,{
                        accID:value.accountID,
                        type:'changePass'
                    })
                    if(response)
                        return Swal.fire({
                            icon: 'success',
                            title: 'Success!', 
                            text: 'Password reset!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                  }catch (err){
                    if (!err?.response) {
                      console.log(err)
                    }
                  }
            }
          })
      }

  return (
    <>

<div className='w-full h-[90vh] items-center font-[poppins]'>
        <div className='h-full'>
            <div className='flex flex-col sm:flex-row w-full justify-between px-2 py-2'>
                <p className='text-[25px] textS font-bold'>Students accounts</p>
                <div className='flex flex-row justify-center items-center'>
                <div>
                    <input type='text' placeholder='Enter lastname' onChange={(e)=> filterstud(e.target.value)} value={filterSearch} className='w-full  shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'/></div>
                    <button onClick={()=> setaddStud(true)} className='bg-red-500 hover:bg-red-600 p-2 rounded-md mx-2 textS font-bold'>Remove Gr.12 students</button>
                        <select name="grade" onChange={(e)=> filtergrade(e.target.value)} value={gradefilter} className='h-full mx-1 rounded-md'>
                            <option value='all'>All Grade</option>
                            <option value="7">grade 7</option>
                            <option value="8">grade 8</option>
                            <option value="9">grade 9</option>
                            <option value="10">grade 10</option>
                            <option value="11">grade 11</option>
                            <option value="12">grade 12</option>
                        </select>
                    <button onClick={()=> setaddStud(true)} className='bg-green-500 hover:bg-green-600 p-2 rounded-md textS font-bold mx-1'>ADD student</button>
               </div>  
            </div>
            <div className='w-[80%] mx-auto px-2 h-[90%] bg-white  rounded-md overflow-auto'>
                    <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                        <thead className='border-b font-medium dark:border-neutral-500  sticky top-0 bg-white'>
                            <tr className='font-bold'>
                                <th scope="col" className="px-6 py-[10px]">Lastname</th>
                                <th scope="col" className="px-6 py-[10px]">Firstname</th>
                                <th scope="col" className="px-6 py-[10px]">Middlename</th>
                                <th scope="col" className="px-6 py-[10px]"></th>
                            </tr>
                        </thead>
                        {students && !students[0]? 
                                <tbody>
                                    <tr>
                                        <td className='text-[30px] py-2'>NO RECORD</td>
                                    </tr>
                                </tbody>
                                :<>
                        {students && students.map((value,index)=>{
                            return  <tbody key={index} className='overflow-auto'>
                            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                <td className="whitespace-nowrap px-6 ">{value.lastname}</td>
                                <td className="whitespace-nowrap px-6 ">{value.firstname}</td>
                                <td className="whitespace-nowrap px-6 ">{value.middlename}</td>
                                <td className="whitespace-nowrap flex flex-row justify-around items-center py-1">
                                    <p onClick={()=> resetPass(value)} className='bg-red-500 hover:bg-red-600 py-1 px-2 textS rounded-md cursor-pointer'>reset password</p>
                                </td>
                            </tr>
                        </tbody>
                        })}</>}
                       
                    </table>
            </div>
        </div>
        </div>

        {addStud && <AddStudents close={setaddStud} refresh={getPisContent} className='z-50'/>}

    </>
  )
}
