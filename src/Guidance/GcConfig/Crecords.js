import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import Swal from 'sweetalert2'

export default function Crecords() {
    const todaydate = new Date();
    var dd = todaydate.getDate();
    var mm = todaydate.getMonth()+1; 
    var yyyy = todaydate.getFullYear();

    if(dd<10) {dd='0'+dd} 
    if(mm<10) { mm='0'+mm} 
    const todayD =  `${yyyy}-${mm}-${dd}`
  

    const getCounselingRec = async ()=>{
        try{
            const response= await Axios.get(`http://localhost:3500/getCounselingRec`)
            
                    const datas = ((response.data).filter((value)=>   value.setDate < todayD))
                    setdisplay((datas).filter((value)=> value.setDate.includes(`${yyyy}-${mm}`)))
                    setall(datas)

          }catch (err){
            if (!err?.response) {
              console.log(err)
            }
          }
      }
     
    useEffect(()=>{
       getCounselingRec()
    },[])

    const [display,setdisplay] = useState([])
    const [all,setall] = useState([])

    // console.log(['2023-02-15','2023-01-15','2023-02-15','2023-02-15','2023-02-15'].filter((value)=> value.includes('2023-02')))

    const [month,setmonth] = useState(`${yyyy}-${mm}`)

    const filterMonth = (fvalue) =>{
        setmonth(fvalue)
        setdisplay(all.filter((value)=> value.setDate.includes(fvalue)))
    } 
    
  

    ///////////////////////sort by date using MAP
    //     const employees = 
    //     [
    //         {id:'2023-06-08', name: 'Dean', country: 'Denmark'},
    //         {id:'2023-06-05', name: 'Carl', country: 'Canada'},
    //         {id:'2023-06-03', name: 'Bob', country: 'Belgium'},
    //         {id:'2023-06-09', name: 'Alice', country: 'Austria'},
    //         {id:'2023-06-01', name: 'Ethan', country: 'Egypt'},
    //       ];
        
    //       // 👇️ sort by Numeric property ASCENDING (1 - 100)
    //     //   const numAscending = [...employees].sort((a, b) => a.id - b.id);

    //     const numAscending = employees.sort((x, y) => {
    //         x = new Date(x.id)
    //          y = new Date(y.id)
    //        return (x - y);

    //    })
    //     //   const numAscending = [...employees].sort();
    //       console.log(numAscending);

  return (
    <>

<div className='w-full h-[90vh] items-center font-[poppins]'>
        <div className='h-full mt-7 sm:m-2'>
            <div className='flex flex-col sm:flex-row w-full justify-between px-2 py-2'>
                <p className='text-[25px] textS font-bold hidden sm:block'>Counseling Records</p>
                <div className='flex flex-row'>
                {/* <div>
                    <select name="cars" id="cars" className='w-[100px] shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'>
                    <option value="all">All</option>
                    <option value="referral">Referral</option>
                    <option value="appointment">Appointment</option>
                    <option value="others">others</option>
                    </select>
                </div> */}

                <div className='w-full  shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2 bg-white font-bold mx-2'><p>Total:<span>{' '}{display.length}</span></p></div>
                <div>
                    <input type='month' onChange={(e)=> filterMonth(e.target.value)} value={month}  className='w-full  shadow-inner shadow-gray-500/50 border-[1px] p-[4px] border-gray-200 rounded-md px-2'/>
                </div>
              
               
               </div>  
            </div>
            <div className='w-full sm:w-1/2 mx-auto px-2 h-[90%] bg-white  rounded-md overflow-auto'>
                    <table className='w-full text-left text-sm font-light font-[poppins] '>
                        <thead className='border-b font-medium dark:border-neutral-500 sticky top-0 bg-white'>
                            <tr className='font-bold'>
                                <th scope="col" className="px-6 py-[10px]">Date</th>
                                <th scope="col" className="px-6 py-[10px]">Time</th>
                            </tr>
                        </thead>
                        
                        {display[0] ? 
                        <>{display && display.map((value,index)=>{
                                return  <tbody key={index} className='overflow-auto'>
                                    <List value={value} />
                            </tbody>})}
                            </>
                        :
                        <>
                        <tbody>
                        <tr className="border-b dark:border-neutral-500 text-[18px]">
                            <td className="whitespace-nowrap px-6 py-2 text-[30px]">NO RECORDS</td>
                        </tr></tbody>
                        </>}
                      
                      
                       
                    </table>
            </div>
        </div>
        </div>


    </>
  )
}


function List({value}){

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
 ];


    const date = new Date(value.setDate);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    const pastDate = monthNames[month]+` ${day} ${year}`



    return(
        <>
            <tr className="border-b dark:border-neutral-500 text-[18px]">
                                <td className="whitespace-nowrap px-6 py-2">{pastDate}</td>
                                {/* <td className="whitespace-nowrap px-6 py-2">{JSON.parse(value.setTime).toString()}</td> */}
                               
                            </tr>
        </>
    )
}