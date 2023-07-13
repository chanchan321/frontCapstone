import React,{useEffect, useState} from 'react'
import Personalbg from './Pis1PersonalBG'
import Pis2Familybg from './Pis2Familybg'
import Pis3Educational from './Pis3Educational'
import Pis4FOURFIVE from './Pis4FOURFIVE'
import Pis5HomeSketch from './Pis5HomeSketch'
import PacmanLoader from "react-spinners/PacmanLoader";

import useStore from '../Store/store';
import Axios from 'axios';
import Swal from 'sweetalert2'
import useStorePIS from '../Store/storePIS';


export default function Pis({close}) {

    const [pisNum,setPisNum] =useState(1)
    

    const addPersonalbg = useStorePIS( state => state.addPersonalbg)
    const addFamilybg = useStorePIS( state => state.addFamilybg)
    const addSiblings = useStorePIS( state => state.addSiblings)
    const addMaritalS = useStorePIS( state => state.addMaritalS)
    const addeducBG = useStorePIS( state => state.addeducBG)
    const addeducBG2 = useStorePIS( state => state.addeducBG2)
    const addUniqueHealthCosult = useStorePIS( state => state.addUniqueHealthCosult)
    const addPisID = useStorePIS( state => state.addPisID)
    const addHomeS = useStorePIS( state => state.addHomeS)
  
    const cUser = useStore(state => state.cUser)
    const id= cUser.accountID
  
  
    const getPisContent = async (ress)=>{
      try{
          const response= await Axios.get(`http://localhost:3500/pis/${id}`)
          if(response.data === '404 Not Found') { 
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'NO RESPONSE'
              })
          }
          addPersonalbg(JSON.parse(response.data.pis.personalBackground))
          addFamilybg(JSON.parse(response.data.pis.familyBackground))
          addSiblings(JSON.parse(response.data.pis.siblings))
          addMaritalS(JSON.parse(response.data.pis.maritalStatus))
          addeducBG(JSON.parse(response.data.pis.educationalInformation))
          addeducBG2(JSON.parse(response.data.pis.educbg2))
          addUniqueHealthCosult(JSON.parse(response.data.pis.uniqueHealthCosult))
          addPisID(response.data.pisID)
          addHomeS(JSON.parse(response.data.pis.homeSketch))
        
          setTimeout(()=>{
                    setloading(false)
                    if(ress === 'finishL'){
                        Swal.fire({
                          icon: 'warning',
                          title: 'Reminder',
                          text: 'Please COMPLETE your P.I.S soon as possible!!'
                        })
                        close(false)
                      }
                },500)

            
          
        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            getPisContent()
        },1500)
    },[])
    const [loading,setloading] = useState(true)

    // useEffect(()=>{
    //     setInterval(()=>{
    //       getPisContent();
    //     },1500)
    //   },[])

  return (<>

                {
                loading ?
                <>
                <div className=' inset-0 absolute bg-[black] flex w-full h-[100vh] justify-center items-center text-center z-50 bg-opacity-70 ' >
                <PacmanLoader speedMultiplier={2} color={'white'}/>
                </div>
                </>
                :
                <>
                
            {pisNum === 1 &&
                <div className=' self-end h-full w-full'>
                        <Personalbg next={setPisNum} refresh={getPisContent} load={setloading}/>
                </div>
            }
            {pisNum === 2 &&
                  <div className=' self-end h-full w-full sm:min-w-[370px] '>
                        <Pis2Familybg next={setPisNum} refresh={getPisContent} load={setloading}/>
                </div>
            }
            {pisNum === 3 &&
                 <div className=' self-end h-full w-full sm:min-w-[370px] '>
                        <Pis3Educational next={setPisNum} refresh={getPisContent} load={setloading}/>
                </div>
            }
             {pisNum === 4 &&
                  <div className=' self-end h-full w-full sm:min-w-[370px] '>
                        <Pis4FOURFIVE next={setPisNum} refresh={getPisContent} load={setloading}/>
                </div>
            }
            {pisNum === 5 &&
                  <div className=' self-end h-full w-full sm:min-w-[370px] '>
                        <Pis5HomeSketch next={setPisNum} refresh={getPisContent} load={setloading}/>
                </div>
            }
            
            </> }
  </>
  )
}
