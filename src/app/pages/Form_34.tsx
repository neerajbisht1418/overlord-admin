import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_34 = (props: any) => {
 return (
  <div>
   <>
    <div className="py-[50px]">
     <p className="pb-[20px] text-[20px] font-[500] text-[#315B3F] whitespace-nowrap">
      Can you download a recent lease,<br></br> domiciliation contract, EDF receipt or<br></br> telephone bill for this address?

      *
     </p>
     <div className="flex flex-col gap-1 justify-start items-start">
      <button onClick={(e: any) => { props.setIsDownloadSelected(true); props.setAnswers({ ...props.answers, DownloadLease: e.target.innerText }) }} className={`${props.isDownloadLeaseSelected ? "border-[2px]" : "border"
       } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
       Yes
      </button>
      <button onClick={(e: any) => { props.setIsDownloadSelected(false); props.setAnswers({ ...props.answers, DownloadLease: e.target.innerText }) }} className={`${!props.isDownloadLeaseSelected ? "border-[2px]" : "border"
       } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
       No
      </button>
      <div >
       <button
        onClick={() => {
         props.setActiveQuestion(16)
        }}
        type="button"
        className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
       >
        Next
       </button>
      </div>
     </div>
    </div>
   </>
  </div>
 )
}

export default Form_34