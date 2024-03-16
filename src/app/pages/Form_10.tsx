import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_10 = (props: any) => {

 function formatDate(inputDateString: any) {
  const dateObject = new Date(inputDateString);
  const year = dateObject?.getFullYear();
  const month = dateObject?.getMonth() + 1;
  const day = dateObject?.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  return formattedDate;
 }

 const PhysicalPersonSchema = yup.object().shape({
  Management: yup.object().shape({
   Person: yup.object().shape({
    PersonalDetails: yup.object().shape({
     FirstName: yup.string().required("First Name is required"),
     Name: yup.string().required("Name is required"),
     DateOfBirth: yup.date().nullable().required("Date of birth is required"),
     PlaceOfBirth: yup.string().required("Place of birth is required"),
     PlaceOfResident: yup.string().required("Place of residence is required"),
    }),
   }),
  }),
 });

 const {
  register: physicalPersonRegister,
  handleSubmit: physicalPersonHandleSubmit,
  formState: { errors: physicalPersonErrors },
  setValue: physicalPersonSetValue,
  reset: physicalPersonReset,
 } = useForm({
  resolver: yupResolver(PhysicalPersonSchema),
 })

 const physicalPersonOnSubmit = (data: any) => {
  // Handle form submission here
  console.log("data", data);
  props.setAnswers({
   ...props.answers, selectPersons: [...props.answers.selectPersons, data?.Management?.Person?.PersonalDetails], Management: {
    ...props.answers?.Management, Person: {
     ...props.answers?.Management?.Person, PersonalDetails: { ...data?.Management?.Person?.PersonalDetails }
    }
   }
  });
  props.handleQuestions(true); // Use this data for further processing or API calls
 }

 const handleSelectPerson = (selectedPerson: any) => {
  const newFilteredData = props.answers?.Associates?.Person?.map((individual: any) => {
   const naturalPerson = individual?.NaturalPerson;
   return naturalPerson
  })

  const selectedPersonData = [...props?.answers?.selectPersons]?.find((person: any) => person.Name === selectedPerson);
  if (selectedPersonData) {
   Object.keys(selectedPersonData).forEach((property) => {
    const fieldName: any = `Management.Person.PersonalDetails.${property}`;
    const value = selectedPersonData[property];
    if (property == "DateOfBirth") {
     physicalPersonSetValue(fieldName, formatDate(value));
    } else {
     physicalPersonSetValue(fieldName, value);
    }
   });
  } else {
   physicalPersonReset()
  }
 };

 return (
  <>
   <div className="py-[0px] mt-5">
    <p className="pb-[0px] text-[25px] font-[500] text-[#315B3F]">Management </p>
    <p className="pb-[0px] text-[15px] underline font-[500] text-[#315B3F] mt-2 relative"
     title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital.">Physical Person</p>
    <div className="relative inline-block left-[165px] bottom-[60px]">
     <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
    </div>
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

    <form onSubmit={physicalPersonHandleSubmit(physicalPersonOnSubmit)}>
     <div className="flex flex-col gap-[20px]">
      <div className="flex w-full items-center relative">
       <label className="text-[15px] text-[#315B3F] w-[40%]">
        First Name <sup>*</sup>
       </label>
       <input
        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"First Name"}
        // name="Management.Person.PersonalDetails.FirstName"
        {...physicalPersonRegister("Management.Person.PersonalDetails.FirstName")}
        type="text"
       />
       {physicalPersonErrors.Management?.Person?.PersonalDetails?.FirstName && (
        <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
         {physicalPersonErrors.Management.Person.PersonalDetails.FirstName.message}
        </span>
       )}
      </div>

      <div className="flex w-full items-center relative">
       <label className="text-[15px] text-[#315B3F] w-[40%]">
        Name <sup>*</sup>
       </label>
       <input
        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"Name"}
        // name="Management.Person.PersonalDetails.Name"
        {...physicalPersonRegister("Management.Person.PersonalDetails.Name")}
        type="text"
       />
       {physicalPersonErrors.Management?.Person?.PersonalDetails?.Name && (
        <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
         {physicalPersonErrors.Management.Person.PersonalDetails.Name.message}
        </span>
       )}
      </div>

      <div className="flex w-full items-center relative">
       <label className="text-[15px] text-[#315B3F] w-[40%]">
        Date of birth <sup>*</sup>
       </label>
       <input
        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"Date of birth"}
        max={new Date().toISOString().split("T")[0]}
        type="date"
        // name="Management.Person.PersonalDetails.DateOfBirth"
        {...physicalPersonRegister("Management.Person.PersonalDetails.DateOfBirth")}
       />
       {physicalPersonErrors.Management?.Person?.PersonalDetails?.DateOfBirth && (
        <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
         {/* {physicalPersonErrors.Management.Person.PersonalDetails.DateOfBirth.message} */}
         Date of birth is required
        </span>
       )}
      </div>

      <div className="flex w-full items-center relative">
       <label className="text-[15px] text-[#315B3F] w-[40%]">
        Place of birth <sup>*</sup>
       </label>
       <input
        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"Place of birth"}
        // name="Management.Person.PersonalDetails.PlaceOfBirth"
        {...physicalPersonRegister("Management.Person.PersonalDetails.PlaceOfBirth")}
        type="text"
       />
       {physicalPersonErrors.Management?.Person?.PersonalDetails?.PlaceOfBirth && (
        <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
         {physicalPersonErrors.Management.Person.PersonalDetails.PlaceOfBirth.message}
        </span>
       )}
      </div>

      <div className="flex w-full items-center relative">
       <label className="text-[15px] text-[#315B3F] w-[40%]">
        Place of residence <sup>*</sup>
       </label>
       <input
        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"Place of residence"}
        // name="Management.Person.PersonalDetails.PlaceOfResident"
        {...physicalPersonRegister("Management.Person.PersonalDetails.PlaceOfResident")}
        type="text"
       />
       {physicalPersonErrors.Management?.Person?.PersonalDetails?.PlaceOfResident && (
        <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
         {physicalPersonErrors.Management.Person.PersonalDetails.PlaceOfResident.message}
        </span>
       )}
      </div>

      <div>
       <button
        // onClick={() => {
        //   handleQuestions(true);
        // }}
        type="submit"
        className="border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
       >
        Next
       </button>
      </div>
     </div>
    </form>
   </div>
  </>
 )
}

export default Form_10