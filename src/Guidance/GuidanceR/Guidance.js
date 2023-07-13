import React from 'react'

export default function Guidance({student,studentD}) {
  
    console.log(studentD)
  const recordds = (JSON.parse(student))

return (
  <>
          <div className='text-[20px] font-bold font-[poppins] text-center textS py-2'>Incident / Guidance Records</div>
      <div className='w-full p-2 h-[90%] min-h-[450px] bg-white  rounded-md overflow-auto'>
         
                  <table className='w-full min-w-[800px] text-left text-sm font-light font-[poppins] '>
                      <thead className='border-b font-medium dark:border-neutral-500 '>
                          <tr className='font-bold'>
                              <th scope="col" className="px-6 py-[12px]">Incident</th>
                              <th scope="col" className="px-6 py-[12px]">Empty</th>
                              <th scope="col" className="px-6 py-[12px]">Date of Incident</th>
                          </tr>
                      </thead>
                      {recordds && recordds.map((value,index)=>{
                          return   <tbody key={index}>
                          <tr className="border-b dark:border-neutral-500 text-[18px]">
                              <td className="whitespace-nowrap px-6 py-[12px]">{value.Incident}</td>
                              <td className="whitespace-nowrap px-6 py-[12px]">{value.empty}</td>
                              <td className="whitespace-nowrap px-6 py-[12px]">{value.DateofIncident}</td>
                          </tr>
                      </tbody>
                      })}
                  </table>
          </div>  
  </>
  )
}
