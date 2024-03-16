import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_33 = (props: any) => {

  const [availableHeadquarter, setAvailableHeadquarter] = useState(false)
  const [headquarterName, setHeadquarterName] = useState("")

  return (
    <div>
      <>
        <div className="py-[50px]">
          <p className="pb-[20px] text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
            Do you have an available headquarter?<br></br>
            If, not, Overlord is happy without charging to <br></br> offer its own headquarter for the entity.
            *
          </p>
          <div className="flex flex-col gap-1 justify-start items-start">
            <button onClick={(e: any) => { props.setIsAvailableHeadQuarter(true); setAvailableHeadquarter(true); props.setAnswers({ ...props.answers, AvailableHeadQuarter: e.target.innerText }) }} className={`${props.isAvailableHeadQuarter ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            {
              availableHeadquarter ?
                <>
                  <div className="flex w-[90%] items-center relative mb-2">

                    <input
                      className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px] mb-1"
                      placeholder={"Type here"}
                      type="type"
                      // onChange={(e) => props.setAnswers({ ...props.answers, PerformanceFees: { ...props.answers?.PerformanceFees, PerformancePercentage: e.target.value } })}
                      onChange={(e) => { props.setAnswers({ ...props.answers, Headquarter: e.target.value }); setHeadquarterName(e.target.value) }}

                    />
                    {!headquarterName && (
                      <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                        Please enter the Value
                      </span>
                    )}
                  </div>
                </> :
                ""
            }
            <button onClick={(e: any) => { props.setIsAvailableHeadQuarter(false); setAvailableHeadquarter(false); props.setAnswers({ ...props.answers, AvailableHeadQuarter: e.target.innerText }) }} className={`${!props.isAvailableHeadQuarter ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              No
            </button>
            <div >
              <button
                onClick={() => {
                  props.isAvailableHeadQuarter ? props.handleQuestions(true) : props.handleQuestions(true, -17)
                    ;
                }}
                type="button"
                disabled={!!availableHeadquarter && !!!headquarterName}
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

export default Form_33