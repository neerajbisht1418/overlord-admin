import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_13 = (props: any) => {
  return (
    <div>
      <>
        <div className="py-[25px]">
          <div>
            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
              Costs
            </p>
          </div>
          <p className="pb-[10px] text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
            Management fee
            *
          </p>
          {/* <p className="pb-[20px] text-[18px] font-[500] text-[#315B3F] ">
                            ( Indicates the fee, typically a fixed percentage of the assets under management, charged by the General Partner or management team for operating the SPV. This fee covers administrative and operational expenses related to managing the investment.)
                          </p> */}
          <div className="relative inline-block left-[165px] bottom-[35px]">
            <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Indicates the fee, typically a fixed percentage of the assets under management, charged by the General Partner or management team for operating the SPV. This fee covers administrative and operational expenses related to managing the investment." />
          </div>

          <div className="flex flex-col gap-1 justify-start items-start">
            <button onClick={() => props.setIsCost(true)} className={`${props.isCost ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            <button onClick={() => props.setIsCost(false)} className={`${!props.isCost ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              No
            </button>
            <div >
              <button
                onClick={() => {
                  // isCost ? setActiveQuestion(14) : setActiveQuestion(15)
                  props.isCost ? props.handleQuestions(true) : props.handleQuestions(true, 2)
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

export default Form_13