import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_18 = (props: any) => {

 const managementLegalSchema = yup.object().shape({
  FirstName: yup.string().required("First Name is required"),
  Name: yup.string().required("Name is required"),
  DateOfBirth: yup.date().nullable().required("Date of birth is required"),
  PlaceOfBirth: yup.string().required("Place of birth is required"),
  PlaceOfResident: yup.string().required("Place of residence is required"),
 })

 const { register: managementLegalRegister,
  handleSubmit: managementLegalHandleSubmit,
  reset: resetManagementLegal,
  setValue: managementLegalSetValue,
  formState: { errors: managementLegalErrors }
 } = useForm({
  resolver: yupResolver(managementLegalSchema)
 })

 const managementLegalOnSubmit = (data: any) => {
  console.log("data", data);

  const updatedSelectPersons = [...props.answers.selectPersons, data];

  props.setAnswers({
   ...props.answers,
   selectPersons: updatedSelectPersons,
   Management: {
    ...props.answers?.Management, Company: {
     ...props.answers?.Management?.Company, LegalRepresentative: { ...data }
    }
   }
  })
  props.handleQuestions(true);
 }

 function formatDate(inputDateString: any) {
  const dateObject = new Date(inputDateString);
  const year = dateObject?.getFullYear();
  const month = dateObject?.getMonth() + 1;
  const day = dateObject?.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  return formattedDate;
 }

 const handleSelectPerson = (selectedPerson: any) => {
  const newFilteredData = props.answers?.Associates?.Person?.map((individual: any) => {
   const naturalPerson = individual?.NaturalPerson;
   return naturalPerson
  })

  const selectedPersonsData = props.answers.selectPersons

  const selectedPersonData = [...selectedPersonsData]?.find((person: any) => person.Name === selectedPerson);
  if (selectedPersonData) {
   Object.keys(selectedPersonData).forEach((property) => {
    const fieldName: any = `${property}`;
    const value = selectedPersonData[property];
    if (property == "DateOfBirth") {
     managementLegalSetValue(fieldName, formatDate(value));
    } else {
     managementLegalSetValue(fieldName, value);
    }
   });
  } else {
   resetManagementLegal()
  }
 };

 return (
  <div>
   <>
    <div>

     <div className="py-[50px]">
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Management
      </p>
      <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
       Legal representative:
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

      <form onSubmit={managementLegalHandleSubmit(managementLegalOnSubmit)}>
       <div className="flex flex-col gap-[20px]">
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          First name
          <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"First Name"}
          type="text"
          {...managementLegalRegister("FirstName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, FirstName: e.target.value } } } })}
         />
         {managementLegalErrors.FirstName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementLegalErrors.FirstName.message}
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
          {...managementLegalRegister("Name")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, Name: e.target.value } } } })}
         />
         {managementLegalErrors.Name && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementLegalErrors.Name.message}
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
          placeholder={"Date Of Birth"}
          type="date"
          {...managementLegalRegister("DateOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, DateOfBirth: e.target.value } } } })}
         />
         {managementLegalErrors.DateOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {/* {managementLegalErrors.DateOfBirth.message} */}
           Date of birth is required
          </span>
         )}
        </div>
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Place of Birth
          <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Place of Birth"}
          type="text"
          {...managementLegalRegister("PlaceOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, PlaceOfBirth: e.target.value } } } })}
         />
         {managementLegalErrors.PlaceOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementLegalErrors.PlaceOfBirth.message}
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
          {...managementLegalRegister("PlaceOfResident")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, PlaceOfResident: e.target.value } } } })}
         />
         {managementLegalErrors.PlaceOfResident && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementLegalErrors.PlaceOfResident.message}
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
      </form>
     </div>
    </div>

   </>
  </div>
 )
}

export default Form_18