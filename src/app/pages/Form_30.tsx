import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_30 = (props: any) => {

 function formatDate(inputDateString: any) {
  const dateObject = new Date(inputDateString);
  const year = dateObject?.getFullYear();
  const month = dateObject?.getMonth() + 1;
  const day = dateObject?.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  return formattedDate;
 }


 const corporationLegalSchema = yup.object().shape({
  FirstName: yup.string().required("First Name is required"),
  Name: yup.string().required("Name is required"),
  DateOfBirth: yup.date().nullable().required("Date of birth is required"),
  PlaceOfBirth: yup.string().required("Place of birth is required"),
  PlaceOfResident: yup.string().required("Place of residence is required"),
  AmountContribution: yup.string().required("Amount Contribution is required"),

 })

 const { register: corporationLegalRegister,
  handleSubmit: corporationLegalHandleSubmit,
  reset: resetcorporationLegal,
  setValue: corporationLegalSetValue,
  formState: { errors: corporationLegalErrors }
 } = useForm({
  resolver: yupResolver(corporationLegalSchema)
 })

 const corporationLegalOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, selectPersons: [...props.answers.selectPersons, data], ConstituentPartner: {
    ...props.answers?.ConstituentPartner, Company: {
     ...props.answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...data }
    }
   }
  });
  props.handleQuestions(true);
 }

 const handleSelectPerson = (selectedPerson: any) => {
  const newFilteredData = props.answers?.Associates?.Person?.map((individual: any) => {
   const naturalPerson = individual?.NaturalPerson;
   return naturalPerson
  })

  const selectedPersonData = [...props.answers.selectPersons].find((person: any) => person.Name === selectedPerson);
  if (selectedPersonData) {
   Object.keys(selectedPersonData).forEach((property) => {
    const fieldName: any = `${property}`;
    const value = selectedPersonData[property];
    if (property == "DateOfBirth") {
     corporationLegalSetValue(fieldName, formatDate(value));
    } else {
     corporationLegalSetValue(fieldName, value);
    }
   });
  } else {
   resetcorporationLegal()
  }
 };

 return (
  <div>
   <>

    <div className="py-[50px]">
     <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
      Corporation
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
     <form onSubmit={corporationLegalHandleSubmit(corporationLegalOnSubmit)}>
      <div className="flex flex-col gap-[20px]">
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         First name

         <sup> *</sup>
        </label>
        <input
         className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
         placeholder={"First name"
         }
         type="text"
         {...corporationLegalRegister("FirstName")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, FirstName: e.target.value } } } })}

        />
        {corporationLegalErrors.FirstName && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationLegalErrors.FirstName.message}
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
         {...corporationLegalRegister("Name")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, Name: e.target.value } } } })}
        />
        {corporationLegalErrors.Name && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationLegalErrors.Name.message}
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
         {...corporationLegalRegister("DateOfBirth")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, DateOfBirth: e.target.value } } } })}
        />
        {corporationLegalErrors.DateOfBirth && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {/* {corporationLegalErrors.DateOfBirth.message} */}
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
         {...corporationLegalRegister("PlaceOfBirth")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfBirth: e.target.value } } } })}
        />
        {corporationLegalErrors.PlaceOfBirth && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationLegalErrors.PlaceOfBirth.message}
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
         {...corporationLegalRegister("PlaceOfResident")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfResident: e.target.value } } } })}
        />
        {corporationLegalErrors.PlaceOfResident && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationLegalErrors.PlaceOfResident.message}
         </span>
        )}
       </div>
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         Amount of contribution
         <sup> *</sup>
        </label>
        <input
         className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
         placeholder={"Amount of contribution"}
         type="number"
         {...corporationLegalRegister("AmountContribution")}
        // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, AmountContribution: e.target.value } } } })}
        />
        {corporationLegalErrors.AmountContribution && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationLegalErrors.AmountContribution.message}
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

   </>
  </div>
 )
}

export default Form_30