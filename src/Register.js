
import React,{useState,useRef, useEffect} from 'react'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from './Picture/cabanganLogo.png'
import Axios from 'axios';
import Swal from 'sweetalert2'


export default function Register() {
  const [lrn, setlrn] = useState('');

  const [type, setType] = useState('');
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const [lastname, setlastname] = useState('');
  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');

  const [contact, setcontact] = useState('');
  const [gradeL, setgradeL] = useState('');

 
  
    const handleSubmit = async (e) =>{
      e.preventDefault(); 
      if (!type || !user || !pwd ) {
        Swal.fire({
          icon: 'error',
          title: 'Pls enter Credentials',
          showConfirmButton: false,
        })}else{

        try{
          const response= await Axios.post(`http://localhost:3500/register`,
          {
            type:type,
            user:user,
            pwd:pwd,

            lrn:lrn,

            lastname:lastname,
            firstname:firstname,
            middlename:middlename,

            contact:contact,
            gradeL:gradeL,
          })
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            showConfirmButton: false,
          })
           console.log(response.data)
        }catch (err){
          if (!err?.response) {
            console.log(err)
          }
        }
      }


      }
  return (
    <>
      <div className='bg-blue-400 bg h-[100vh] flex justify-center items-center z-0 overflow-hidden'>

        <form  onSubmit={handleSubmit} className='rounded-lg w-[370px] min-h-[400px] bg-black bg-opacity-30 flex flex-col justify-around items-center text-white'>

                <div>REGISTER </div>
          {/* <img src={logo} alt='logo' className='w-[170px] z-50'/> */}
             
                  <div>
                  <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                          
                              onChange={(e) => setgradeL(e.target.value)}
                              value={gradeL}
                              type="text"
                              placeholder='gradeL'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 

                  <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                          
                              onChange={(e) => setcontact(e.target.value)}
                              value={contact}
                              type="text"
                              placeholder='contact'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 


                  <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                          
                              onChange={(e) => setlastname(e.target.value)}
                              value={lastname}
                              type="text"
                              placeholder='lastname'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 

                   <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                          
                              onChange={(e) => setfirstname(e.target.value)}
                              value={firstname}
                              type="text"
                              placeholder='firstname'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 

                      <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                          
                              onChange={(e) => setmiddlename(e.target.value)}
                              value={middlename}
                              type="text"
                              placeholder='middlename'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 


                  <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                              
                              onChange={(e) => setlrn(e.target.value)}
                              value={lrn}
                              type="text"
                              placeholder='LRN'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div> 

                  <div className='relative flex justify-center mt-[15px]  z-50'>
                            <input
                           
                              onChange={(e) => setType(e.target.value)}
                              value={type}
                              type="text"
                              placeholder='User Type'
                              className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                            <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                          </div>  

                      <div className='relative flex justify-center mt-[15px]  z-50'>
                         <input
                        
                          onChange={(e) => setUser(e.target.value)}
                          value={user}
                          type="text"
                          placeholder='Username'
                          className='bg-[#71A1CC] text-black  w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white focus:outline-none'/>
                        <FaUser size={25} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>

                      <div className='relative flex justify-center mt-[15px]  z-50'>
                        <input
                          onChange={(e) => setPwd(e.target.value)}
                          value={pwd}
                          type="password"
                          placeholder='Password'
                          className='bg-[#71A1CC] w-[300px] mx-0 rounded-sm p-2 pl-[50px] placeholder-white text-black focus:outline-none'/>
                        <RiLockPasswordFill size={30} className='text-white absolute left-[15px] top-[7px]'/>
                      </div>
                      
                        <div className='relative flex justify-center mt-[15px] z-50'>
                          <input
                            type="submit"
                            value="REGISTER"
                            className='bg-[#71A1CC] p-2 px-32 m-auto rounded-sm cursor-pointer text-white mt-[15px] hover:bg-blue-500 focus:outline-none'/>
                        </div>
                    </div>
          </form>

      </div>
      <div className="opacity-20 fixed inset-0 z-0 bg-black "></div>
    </>
    
  )
}

