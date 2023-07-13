import React,{useEffect, useState} from 'react'
import StudPis from './StudPis'
import Studpis2 from './Studpis2'
import Studpis3 from './Studpis3'
import Studpis4 from './Studpis4'
import Studpis5 from './Studpis5'

export default function Pis({student}) {

    const [pisNum,setPisNum] =useState(1)

  return (<>
            {pisNum === 1 &&
                <div className=' self-end h-full w-full min-w-[370px] '>
                        <StudPis next={setPisNum} student={student && student}/>
                </div>
            }
             {pisNum === 2 &&
                <div className=' self-end h-full w-full min-w-[370px] '>
                        <Studpis2 next={setPisNum} student={student && student}/>
                </div>
            }
            {pisNum === 3 &&
                <div className=' self-end h-full w-full min-w-[370px] '>
                        <Studpis3 next={setPisNum} student={student && student}/>
                </div>
            }
            {pisNum === 4 &&
                <div className=' self-end h-full w-full min-w-[370px] '>
                        <Studpis4 next={setPisNum} student={student && student}/>
                </div>
            }
             {pisNum === 5 &&
                <div className=' self-end h-full w-full min-w-[370px] '>
                        <Studpis5 next={setPisNum} student={student && student}/>
                </div>
            }
  </>
  )
}
