import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_27 = (props: any) => {
  const constituentPersonSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
  })

  const { register: constituentPersonRegister,
    handleSubmit: constituentPersonHandleSubmit,
    reset: resetconstituentPerson,
    formState: { errors: constituentPersonErrors }
  } = useForm({
    resolver: yupResolver(constituentPersonSchema)
  })

  const constituentPersonOnSubmit = (data: any) => {
    console.log("data", data);
    props.setAnswers({
      ...props.answers, selectPersons: [...props.answers.selectPersons, data], ConstituentPartner: {
        ...props.answers.ConstituentPartner, PersonalDetails: { ...data }
      }
    });
    props.handleQuestions(true);
    // resetconstituentPerson()
  }

  return (
    <div>
      <>
        <form onSubmit={constituentPersonHandleSubmit(constituentPersonOnSubmit)} >
          <div className="py-[50px]">
            <p className="pb-[10px] text-[25px] font-[500] text-[#315B3F]"
              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital.">
              Physical Person
            </p>
            {/* <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div> */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  First Name <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"First Name"}
                  type="text"
                  {...constituentPersonRegister("FirstName")}
                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, FirstName: e.target.value })}

                />
                {constituentPersonErrors.FirstName && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {constituentPersonErrors.FirstName.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Name <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Name"}
                  type="text"
                  {...constituentPersonRegister("Name")}
                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, Name: e.target.value })}
                />
                {constituentPersonErrors.Name && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {constituentPersonErrors.Name.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Date of birth <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Date of birth"}
                  max={new Date().toISOString().split("T")[0]}
                  type="date"
                  {...constituentPersonRegister("DateOfBirth")}
                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, DateOfBirth: e.target.value })}
                />
                {constituentPersonErrors.DateOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {/* {constituentPersonErrors.DateOfBirth.message} */}
                    Date of birth is required
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Place of birth <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Place of birth"}
                  type="text"
                  {...constituentPersonRegister("PlaceOfBirth")}
                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, PlaceOdBirth: e.target.value })}
                />
                {constituentPersonErrors.PlaceOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {constituentPersonErrors.PlaceOfBirth.message}
                  </span>
                )}
              </div>
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Place of residence <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Place of residence"}
                  type="text"
                  {...constituentPersonRegister("PlaceOfResident")}
                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, PlaceOfResident: e.target.value })}
                />
                {constituentPersonErrors.PlaceOfResident && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {constituentPersonErrors.PlaceOfResident.message}
                  </span>
                )}
              </div>
              <div>
                {" "}
                <button
                  // onClick={() => {
                  //   handleQuestions(true);
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

export default Form_27