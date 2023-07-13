import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import logoC from '../../Picture/cabanganLogo.png'
import logo from '../../Picture/logo.png'

export default function GoodM({value}) {


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current 
  });


  return (
    <>
          

      <div className=" z-50 bg-white w-[816px] h-[100vh] overflow-y-auto">
      <button className=" absolut w-[100px] right-0 left-0 mx-auto z-50 bg-[blue] text-white" onClick={handlePrint}>Print this out!</button>
        <div ref={componentRef} className="h-[fit]">
          <div className="h-[1056px] overflow-hidden relative" >
                    
                      <div className=" ">

                            <div className="text-[15px] m-[1px]  flex flex-col items-center ">

                              <div className="self-end h-[20px]"></div>

                                 <img src={logo} className='w-[70px]'/>

                                    <div className="font-[oldE] text-[15px] font-bold">Republic of the Philippines</div>
                                    <div className="font-[oldE] font-bold">Department of Education</div>
                                    <div className="font-[tnr] ">REGION V - BICOL</div>
                                    <div className="font-[tnr]">SCHOOLS DIVISION OF LEGAZPI CITY</div>
                                    <div className="font-[tnr]">CABANGAN HIGH SCHOOL</div>
                                    <div className="border-[1px] border-[black] w-[80%] bg-black mb-2 "></div>
                                    <div className="mx-auto font-[tnr] text-[50px] py-10" > CERTIFICATION </div>
      {/* ////////////////////////////////////BODY */}
                                    <div className="w-[80%] font-[tnr] text-[20px] ">
                                      <textarea 
                                      className="w-full resize-none h-[100px] font-[tnr] indent-8 focus:border-none focus:outline-none">{`This is to certify that ${value.lastname}, ${value.firstname} ${value.middlename}. is a bonafide student of Cabangan High School, Cabagñan, Legazpi City of School Year 2022-2023.`}</textarea>
                                    </div>

                                    <div className="w-[80%] font-[tnr] text-[20px]">
                                      <textarea
                                      className="w-full resize-none h-[120px] indent-8 focus:border-none focus:outline-none">This further certifies that per record available in the office of the Guidance Counselor, said student has not been subjected to any disciplinary actions during his/her entire stay in this school & therefore known to be of GOOD MORAL CHARACTER.</textarea>
                                    </div>

                                    <div className="w-[80%] font-[tnr] text-[20px]">
                                      <textarea 
                                      className="w-full resize-none h-[120px] indent-8 focus:border-none focus:outline-none">Issued this 13th day of February 2023 at Cabangan High School, Legazpi City for tranfer and record purposes.</textarea>
                                    </div>

                                    <div className="w-[80%] flex flex-row justify-between py-16 font-[tnr] text-[20px]">
                                      <div className="w-1/2">
                                          <textarea className="w-full resize-none h-[30px] focus:border-none focus:outline-none">NAME</textarea>
                                          <div>Guidance Counselor I</div>
                                      </div>
                                      <div className="w-1/2 flex flex-col justify-center items-center font-[tnr] text-[20px]">
                                        <div>
                                          <textarea className="w-full resize-none h-[30px] focus:border-none focus:outline-none">NAME</textarea>
                                          <div>Principal I</div> 
                                        </div>
                                      </div>
                                    </div>
    {/* ////////////////////////////////////footer */}
                                    <div className="border-[1px] border-[black] w-[80%] bg-black mb-2"></div>


                                    <div className="w-[80%] flex flex-row text-[12px]">
                                        <div>
                                          <img src={logoC} className='w-[110px] px-2'/>
                                        </div>

                                        <div className="w-full">
                                            <div className="w-full flex flex-row justify-end items-end">
                                              <span className="font-bold w-fit">Address:</span>
                                              <textarea className="w-full px-2 text-[14px] font-[tnr] h-[20px] resize-none overflow-hidden">Brgy 20 Cabangan, Legazpi City</textarea>
                                            </div>

                                            <div className="w-full flex flex-row justify-end items-end">
                                              <span className="font-bold w-[100px]">Telephone No:</span>
                                              <textarea className="w-full px-2 text-[14px] font-[tnr] h-[20px] resize-none overflow-hidden">(052) 742-4909,Cellphone No.0929-888-5526</textarea>
                                            </div>

                                            <div className="w-full flex flex-row justify-end items-end">
                                              <span className="font-bold w-fit">Email:</span>
                                              <textarea className="w-full px-2 text-[14px] font-[tnr] h-[20px] resize-none overflow-hidden">B302260@deped.gov.ph</textarea>
                                            </div>

                                            <div className="w-full flex flex-row justify-end items-end">
                                              <span className="font-bold w-fit">Facebook:</span>
                                              <textarea className="w-full px-2 text-[14px] font-[tnr] h-[20px] resize-none overflow-hidden">www.facebook.com/cabanganhighschool</textarea>
                                            </div>

                                            <div className="w-full flex flex-row justify-end items-end">
                                              <span className="font-bold w-fit">Website:</span>
                                              <textarea className="w-full px-2 text-[14px] font-[tnr] h-[20px] resize-none overflow-hidden">https://sites.google.com/deped.gov.ph/cabanganhighschool</textarea>
                                            </div>
                                        </div>
                                  </div>  

                                  
                            </div>
                    </div>
              </div>
        </div>
    </div>

    </>
  )
}
