import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_11 = (props: any) => {

 const FatherMotherSchema = yup.object().shape({
  FatherName: yup.string().required("Father Name is required"),
  FatherFirstName: yup.string().required("Father First Name is required"),
  FatherDateOfBirth: yup.date().nullable().required("Father Date of birth is required"),
  FatherPlaceOfBirth: yup.string().required("Father Place of birth is required"),
  FatherPlaceOfResident: yup.string().required("Father Place of residence is required"),
  MaidenName: yup.string().required("Mother Name is required"),
  MotherFirstName: yup.string().required("Mother First Name is required"),
  MotherDateOfBirth: yup.date().nullable().required("Mother Date of birth is required"),
  MotherPlaceOfBirth: yup.string().required("Mother Place of birth is required"),
  MotherPlaceOfResident: yup.string().required("Mother Place of residence is required"),
 })

 const {
  register: fatherMotherRegister,
  handleSubmit: fatherMotherHandleSubmit,
  reset: resetFatherMother,
  formState: { errors: fatherMotherErrors },
 } = useForm({
  resolver: yupResolver(FatherMotherSchema),
 })

 const fatherMotherOnSubmit = (data: any) => {
  data = { ...data, ...props?.answers?.Management?.Person?.PersonalDetails }
  props.setAnswers({
   ...props.answers, fatherAndMotherList: [...props?.answers?.fatherAndMotherList, data],
   Management: {
    ...props.answers?.Management, Person: {
     ...props.answers?.Management?.Person, FatherMotherDetails: { ...data }
    }
   }
  });
  props.handleQuestions(true);
 }

 return (
  <div>
   <>
    <form onSubmit={fatherMotherHandleSubmit(fatherMotherOnSubmit)}>
     <div className="py-[50px]">
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Management
      </p>
      <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]"
       title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."

      >
       Physical Person
      </p>

      <div>
       <p className="pb-[20px] text-[20px] font-[500] text-[#315B3F]">
        Father Information
       </p>
       <div className="flex flex-col gap-[20px]">
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Name <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Name"}
          type="text"
          // name="FatherName"
          {...fatherMotherRegister("FatherName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherName: e.target.value } } } })}
         />
         {fatherMotherErrors.FatherName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.FatherName.message}
          </span>
         )}
        </div>
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          First Name <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"First Name"}
          type="text"
          {...fatherMotherRegister("FatherFirstName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherFirstName: e.target.value } } } })}
         />
         {fatherMotherErrors.FatherFirstName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.FatherFirstName.message}
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
          {...fatherMotherRegister("FatherPlaceOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherPlaceOfBirth: e.target.value } } } })}
         />
         {fatherMotherErrors.FatherPlaceOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.FatherPlaceOfBirth.message}
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
          {...fatherMotherRegister("FatherDateOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherDateOfBirth: e.target.value } } } })}
         />
         {fatherMotherErrors.FatherDateOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {/* {fatherMotherErrors.FatherDateOfBirth.message} */}
           Mother Date of birth is required
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
          {...fatherMotherRegister("FatherPlaceOfResident")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherPlaceOfResident: e.target.value } } } })}
         />
         {fatherMotherErrors.FatherPlaceOfResident && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.FatherPlaceOfResident.message}
          </span>
         )}
        </div>
       </div>
      </div>
      <div className="mt-4">
       <p className="pb-[20px] text-[20px] font-[500] text-[#315B3F]">
        Information about the mother:
       </p>
       <div className="flex flex-col gap-[20px]">
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Maiden Name <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Name"}
          type="text"
          {...fatherMotherRegister("MaidenName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherName: e.target.value } } } })}
         />
         {fatherMotherErrors.MaidenName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.MaidenName.message}
          </span>
         )}
        </div>
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          First Name <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"First Name"}
          type="text"
          {...fatherMotherRegister("MotherFirstName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherFirstName: e.target.value } } } })}
         />
         {fatherMotherErrors.MotherFirstName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.MotherFirstName.message}
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
          {...fatherMotherRegister("MotherPlaceOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherPlaceOfBirth: e.target.value } } } })}
         />
         {fatherMotherErrors.MotherPlaceOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.MotherPlaceOfBirth.message}
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
          {...fatherMotherRegister("MotherDateOfBirth")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherDateOfBirth: e.target.value } } } })}
         />
         {fatherMotherErrors.MotherDateOfBirth && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {/* {fatherMotherErrors.MotherDateOfBirth.message} */}
           Mother Date of birth is required
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
          {...fatherMotherRegister("MotherPlaceOfResident")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherPlaceOfResident: e.target.value } } } })}
         />
         {fatherMotherErrors.MotherPlaceOfResident && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {fatherMotherErrors.MotherPlaceOfResident.message}
          </span>
         )}
        </div>
       </div>
      </div>
      <div>
       {" "}
       <button
        // onClick={() => {
        //   handleQuestions(true);
        // }}
        type="submit"
        className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-[10px]"
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

export default Form_11