import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_14 = (props: any) => {

  const admissionFeeSchema = yup.object().shape({
    Percentage: yup
      .number()
      .required(" Percentage is required")
      .min(0, " Percentage must be at least 0")
      .max(100, " Percentage cannot be more than 100")
      .typeError(" Percentage must be a number"),
    Fixed: yup
      .number()
      .required("Fixed Percentage is required")
      .min(0, "Fixed Percentage must be at least 0")
      .max(100, "Fixed Percentage cannot be more than 100")
      .typeError("Fixed Percentage must be a number"),
    percentageOption: yup.string().required("Percentage Option is required"),
  })

  const { register: admissionFeeRegister,
    handleSubmit: admissionFeeHandleSubmit,
    reset: resetAdmissionFee,
    formState: { errors: admissionFeeErrors }
  } = useForm({
    resolver: yupResolver(admissionFeeSchema)
  })

  const admissionFeeOnSubmit = (data: any) => {
    console.log("admissionFeeOnSubmit", data);
    props.setAnswers({
      ...props.answers, ManagementFees: { ...data }
    })
    // setActiveQuestion(33)
    props.handleQuestions(true, 19);
  }


  return (
    <div>
      <>
        <form onSubmit={admissionFeeHandleSubmit(admissionFeeOnSubmit)}>
          <div className="py-[50px]">
            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
              Admission Fees
            </p>
            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full items-center relative gap-5">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Percentage <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Percentage"}
                  type="number"
                  {...admissionFeeRegister("Percentage")}
                // onChange={(e) => setAnswers({ ...answers, ManagementFees: { ...answers?.ManagementFees, Percentage: e.target.value } })}
                />
                {admissionFeeErrors.Percentage && (
                  <span className="text-[11px] text-[red] absolute left-[130px] bottom-[-17px]">
                    {admissionFeeErrors.Percentage.message}
                  </span>
                )}

                <select
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  {...admissionFeeRegister("percentageOption")}
                >
                  <option value="">Percentage Option</option>
                  <option value="Amount of Subscripts">Amount of Subscripts</option>
                  <option value="Invested Amount">Invested Amount</option>
                </select>
                {admissionFeeErrors.percentageOption && (
                  <span className="text-[11px] text-[red] absolute left-[350px] bottom-[-17px]">
                    {admissionFeeErrors.percentageOption.message}
                  </span>
                )}

              </div>

              <div className="flex w-[330px] items-center relative mt-4">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Fixed <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Fixed"}
                  type="number"
                  {...admissionFeeRegister("Fixed")}
                // onChange={(e) => setAnswers({ ...answers, ManagementFees: { ...answers?.ManagementFees, Fixed: e.target.value } })}
                />
                {admissionFeeErrors.Fixed && (
                  <span className="text-[11px] text-[red] absolute left-[130px] bottom-[-40px]">
                    {admissionFeeErrors.Fixed.message}
                  </span>
                )}


              </div>

              <div>
                {" "}
                <button
                  // onClick={() => {
                  //   setActiveQuestion(16)
                  // }}
                  type="submit"
                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

        </form>

      </>
    </div>
  )
}

export default Form_14