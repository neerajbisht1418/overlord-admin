import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";


const Form_24 = (props: any) => {
  const otherBenificialSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    HoldingPercentage: yup
      .number()
      .required("Holding Percentage is required")
      .min(0, "Holding Percentage must be at least 0")
      .max(100, "Holding Percentage cannot be more than 100")
      .typeError("Holding Percentage must be a number"),
  })

  const { register: otherBenificialRegister,
    handleSubmit: otherBenificialHandleSubmit,
    reset: resetOtherBenificial,
    formState: { errors: otherBenificialErrors }
  } = useForm({
    resolver: yupResolver(otherBenificialSchema)
  })

  const otherBenificialOnSubmit = (data: any) => {
    console.log("data", data);
    props.setAnswers({
      ...props.answers, Associates: {
        ...props.answers?.Associates, Company: {
          ...props.answers?.Associates?.Company, EffectiveBeneficiaries
            : [
              ...props.answers?.Associates?.Company?.EffectiveBeneficiaries, { ...data }
            ]
        }
      }
    })
    props.handleQuestions(true);
    resetOtherBenificial()
  }

  return (
    <div>
      <>
        <form onSubmit={otherBenificialHandleSubmit(otherBenificialOnSubmit)}>
          <div className="py-[50px]">
            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
              Other beneficial owners
            </p>
            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
              Legal representative:
            </p>
            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Holding percentage
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={" Holding percentage"
                  }
                  type="number"
                  {...otherBenificialRegister("HoldingPercentage")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, HoldingPercentage: e.target.value })}
                />
                {otherBenificialErrors.HoldingPercentage && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {otherBenificialErrors.HoldingPercentage.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  First name

                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"First name"
                  }
                  {...otherBenificialRegister("FirstName")}
                  type="text"
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, FirstName: e.target.value })}
                />
                {otherBenificialErrors.FirstName && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {otherBenificialErrors.FirstName.message}
                  </span>
                )}

              </div>

              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Name
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Name"}
                  type="text"
                  {...otherBenificialRegister("Name")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Name: e.target.value })}
                />
                {otherBenificialErrors.Name && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {otherBenificialErrors.Name.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Date of birth
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Date of birth"}
                  type="date"
                  {...otherBenificialRegister("DateOfBirth")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, DateOfBirth: e.target.value })}
                />
                {otherBenificialErrors.DateOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {/* {otherBenificialErrors.DateOfBirth.message} */}
                    Date of birth is required
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Place of birth
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Place of birth"}
                  type="text"
                  {...otherBenificialRegister("PlaceOfBirth")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfBirth: e.target.value })}
                />
                {otherBenificialErrors.PlaceOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {otherBenificialErrors.PlaceOfBirth.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Place of residence
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Place of residence"}
                  type="text"
                  {...otherBenificialRegister("PlaceOfResident")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfResident: e.target.value })}
                />
                {otherBenificialErrors.PlaceOfResident && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {otherBenificialErrors.PlaceOfResident.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <button
                // onClick={() => {
                //   handleQuestions(true);
                // }}
                type="submit"
                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </>
    </div>
  )
}

export default Form_24