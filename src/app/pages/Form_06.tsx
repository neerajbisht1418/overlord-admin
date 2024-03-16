import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Form_06 = (props: any) => {

 const NaturalPersonSchema = yup.object().shape({
  NaturalPerson: yup.object().shape({
   FirstName: yup.string().required("First Name is required"),
   Name: yup.string().required("Name is required"),
   DateOfBirth: yup.date().nullable().required("Date of birth is required"),
   PlaceOfBirth: yup.string().required("Place of birth is required"),
   PlaceOfResident: yup.string().required("Place of residence is required"),
  }),
 });

 const {
  register: naturalPersonRegister,
  handleSubmit: naturalPersonHandleSubmit,
  reset: resetNaturalPerson,
  formState: { errors: naturalPersonErrors },
 } = useForm({
  resolver: yupResolver(NaturalPersonSchema),
 })

 const naturalPersonOnSubmit = (data: any) => {
  console.log("naturalPersonOnSubmit", data.NaturalPerson);
  const updatedSelectPersons = [...props.answers.selectPersons, data.NaturalPerson];
  const updatedAssociatesPerson = [
   ...props.answers.Associates.Person,
   { NaturalPerson: { ...data.NaturalPerson } }
  ];
  props.setAnswers({
   ...props.answers,
   selectPersons: updatedSelectPersons,
   Associates: {
    ...props.answers.Associates,
    Person: updatedAssociatesPerson
   }
  });

  props.handleQuestions(true, 20);
  resetNaturalPerson();
 }

 return (
  <div>
   <>
    <form onSubmit={naturalPersonHandleSubmit(naturalPersonOnSubmit)}>
     <div className="py-[50px]">
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Associates – Natural person
      </p>

      <div className="flex flex-col gap-[20px]">
       <div className="flex w-full items-center relative">

        <label className="text-[15px] text-[#315B3F] w-[40%]">
         First Name <sup>*</sup>
        </label>
        <input
         className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
         placeholder={"First Name"}
         // name="NaturalPerson.FirstName"
         {...naturalPersonRegister('NaturalPerson.FirstName')}
         type="text"
        />
        {naturalPersonErrors.NaturalPerson?.FirstName && (
         <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
          {naturalPersonErrors.NaturalPerson.FirstName.message}
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
         // name="NaturalPerson.Name"
         {...naturalPersonRegister("NaturalPerson.Name")}
         type="text"
        />
        {naturalPersonErrors.NaturalPerson?.Name && (
         <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
          {naturalPersonErrors.NaturalPerson.Name.message}
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
         // name="NaturalPerson.DateOfBirth"
         {...naturalPersonRegister("NaturalPerson.DateOfBirth")}
        />
        {naturalPersonErrors.NaturalPerson?.DateOfBirth && (
         <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
          {/* {naturalPersonErrors.NaturalPerson.DateOfBirth.message} */}
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
         // name="NaturalPerson.PlaceOfBirth"
         {...naturalPersonRegister("NaturalPerson.PlaceOfBirth")}
         type="text"
        />
        {naturalPersonErrors.NaturalPerson?.PlaceOfBirth && (
         <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
          {naturalPersonErrors.NaturalPerson.PlaceOfBirth.message}
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
         // name="NaturalPerson.PlaceOfResident"
         {...naturalPersonRegister("NaturalPerson.PlaceOfResident")}
         type="text"
        />
        {naturalPersonErrors.NaturalPerson?.PlaceOfResident && (
         <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
          {naturalPersonErrors.NaturalPerson.PlaceOfResident.message}
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
     </div>
    </form>
   </>

  </div>
 )
}

export default Form_06