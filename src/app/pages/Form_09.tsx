import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";


const Form_09 = (props: any) => {
 return (
  <div>
   <>
    <div className="py-[50px]">
     <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
      Management
      *
     </p>
     <div className="flex flex-col gap-3 items-start relative">
      <button onClick={() => props.setIsCorporationSelected(false)} className={`${!props.isCorporationSelected ? "border-[2px]" : "border"
       } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
       title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
      >
       Physical Person
      </button>
      <div className="relative inline-block left-[140px] bottom-14">
       <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
      </div>
      <button onClick={() => props.setIsCorporationSelected(true)} className={`${props.isCorporationSelected ? "border-[2px]" : "border"
       } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
       Corporation
      </button>
      <div className="relative inline-block left-[110px] bottom-14">
       <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="A legal entity, such as a company or firm, that participates in the SPV, usually contributing significant financial resources, expertise, or assets to the venture." />
      </div>

     </div>
     <div >
      <button
       onClick={() => {
        // isCorporationSelected ? setActiveQuestion(17) : handleQuestions(true, 1)
        props.isCorporationSelected ? props.handleQuestions(true, 8) : props.handleQuestions(true, 1)

       }}
       type="button"
       className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-4"
      >
       Next
      </button>
     </div>

    </div>
   </>
  </div>
 )
}

export default Form_09