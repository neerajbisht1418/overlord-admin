import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_22 = (props: any) => {

  function formatDate(inputDateString: any) {
    const dateObject = new Date(inputDateString);
    const year = dateObject?.getFullYear();
    const month = dateObject?.getMonth() + 1;
    const day = dateObject?.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  }

  const corporationBeneficiarySchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    HoldingPercentage: yup
      .number()
      .required("Holding Percentage is required")
      .min(25, "Holding Percentage must be at least 25")
      .max(100, "Holding Percentage cannot be more than 100")
      .typeError("Holding Percentage must be a number"),
  })

  const { register: corporationBeneficiaryRegister,
    handleSubmit: corporationBeneficiaryHandleSubmit,
    reset: resetCorporationBeneficiary,
    setValue: corporationBeneficiarySetValue,
    formState: { errors: corporationBeneficiaryErrors }
  } = useForm({
    resolver: yupResolver(corporationBeneficiarySchema)
  })

  const corporationBeneficiaryOnSubmit = (data: any) => {
    console.log("data", data);
    props.setAnswers({
      ...props.answers, selectPersons: [...props.answers.selectPersons, data], Associates: {
        ...props.answers?.Associates, Company: {
          ...props.answers?.Associates?.Company, EffectiveBeneficiaries
            : [
              ...props.answers?.Associates?.Company?.EffectiveBeneficiaries, { ...data }
            ]
        }
      }
    })
    props.handleQuestions(true);

  }

  const handleSelectPerson = (selectedPerson: any) => {
    const newFilteredData = props.answers?.Associates?.Person?.map((individual: any) => {
      const naturalPerson = individual?.NaturalPerson;
      return naturalPerson
    })

    const selectedPersonData = [...props?.answers?.selectPersons]?.find((person: any) => person.Name === selectedPerson);
    if (selectedPersonData) {
      Object.keys(selectedPersonData).forEach((property) => {
        const fieldName: any = `${property}`;
        const value = selectedPersonData[property];
        if (property == "DateOfBirth") {
          corporationBeneficiarySetValue(fieldName, formatDate(value));
        } else {
          corporationBeneficiarySetValue(fieldName, value);
        }
      });
    } else {
      resetCorporationBeneficiary()
    }
  };


  return (
    <div>
      <>
        <form onSubmit={corporationBeneficiaryHandleSubmit(corporationBeneficiaryOnSubmit)}>
          <div className="py-[50px]">
            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
              Effective beneficiaries
            </p>
            <div className="flex w-full items-center relative mb-4">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                Select Person <sup>*</sup>
              </label>
              <select
                className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                name="selectedPerson"
                onChange={(e) => handleSelectPerson(e.target.value)}
              >
                <option value="">Select a person</option>
                {props.answers?.selectPersons.filter((person: any, index: number, self: any[]) =>
                  !self.slice(0, index).some((p: any) =>
                    p.FirstName === person.FirstName && p.PlaceOfBirth === person.PlaceOfBirth
                  )
                ).map((person: any) => (
                  <option key={person?.Name} value={person?.Name}>
                    {person.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full items-center relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Holding percentage
                  <sup> *</sup>
                </label>
                <input
                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Holding percentage"
                  }
                  type="number"
                  // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, HoldingPercentage: e.target.value })}
                  {...corporationBeneficiaryRegister("HoldingPercentage")}
                />
                {corporationBeneficiaryErrors.HoldingPercentage && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {corporationBeneficiaryErrors.HoldingPercentage.message}
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
                  placeholder={"First name"}
                  type="text"
                  {...corporationBeneficiaryRegister("FirstName")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, FirstName: e.target.value })}
                />
                {corporationBeneficiaryErrors.FirstName && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {corporationBeneficiaryErrors.FirstName.message}
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
                  {...corporationBeneficiaryRegister("Name")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Name: e.target.value })}
                />
                {corporationBeneficiaryErrors.Name && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {corporationBeneficiaryErrors.Name.message}
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
                  {...corporationBeneficiaryRegister("DateOfBirth")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, DateOfBirth: e.target.value })}
                />
                {corporationBeneficiaryErrors.DateOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {/* {corporationBeneficiaryErrors.DateOfBirth.message} */}
                    Date of birth is required
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
                  {...corporationBeneficiaryRegister("PlaceOfResident")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfResident: e.target.value })}
                />
                {corporationBeneficiaryErrors.PlaceOfResident && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {corporationBeneficiaryErrors.PlaceOfResident.message}
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
                  {...corporationBeneficiaryRegister("PlaceOfBirth")}
                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfBirth: e.target.value })}
                />
                {corporationBeneficiaryErrors.PlaceOfBirth && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                    {corporationBeneficiaryErrors.PlaceOfBirth.message}
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
            <div className='text-[16px] text-[red] flex justify-center align-middle mt-10 text-center '>
              ( Effective Beneficiaries identifies individuals with at least 25% ownership or control )
            </div>
          </div>
        </form>
      </>
    </div>
  )
}

export default Form_22