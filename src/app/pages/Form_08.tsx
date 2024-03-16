import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Form_08 = (props: any) => {
  return (
    <div>
      <>
        <div className="py-[50px]">
          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
            Second Constituent Partner?
            *
          </p>
          <div className="flex flex-col gap-1 justify-start items-start">
            <button onClick={() => props.setIsConstituentPartnerSelected(true)} className={`${props.isConstituentPartnerSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            <button onClick={() => props.setIsConstituentPartnerSelected(false)} className={`${!props.isConstituentPartnerSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              No
            </button>
            <div >
              <button
                onClick={() => {
                  props.isConstituentPartnerSelected ? props.handleQuestions(true, 18) : props.handleQuestions(true)
                    ;
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

export default Form_08