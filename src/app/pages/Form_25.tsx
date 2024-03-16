import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UploadDocument from "../uploadDocument/uploadDocument";

const Form_25 = (props: any) => {
 const otherBeneficiaryDocumentSchema = yup.object().shape({
  Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
   return true
  }),
  additionalDocument: yup.string().test("fileSize", "Please Upload the document", (value) => {
   return true
  }),
 })

 const { register: otherBeneficiaryDocumentRegister,
  handleSubmit: otherBeneficiaryDocumentHandleSubmit,
  reset: resetOtherBeneficiaryDocument,
  formState: { errors: otherBeneficiaryDocumentErrors }
 } = useForm({
  resolver: yupResolver(otherBeneficiaryDocumentSchema)
 })

 const otherBeneficiaryDocumentOnSubmit = (data: any) => {
  const currentEffectiveBeneficiaries = props.answers?.Associates?.Company?.EffectiveBeneficiaries || [];
  const updatedEffectiveBeneficiaries = [
   ...currentEffectiveBeneficiaries.slice(0, -1),
   {
    ...currentEffectiveBeneficiaries[currentEffectiveBeneficiaries.length - 1],
    Document: props.documentUrl,
    AdditionalDocument: data.additionalDocumentUrl,
   },
  ];
  props.setAnswers({
   ...props.answers,
   Associates: {
    ...props.answers?.Associates,
    Company: {
     ...props.answers?.Associates?.Company,
     EffectiveBeneficiaries: updatedEffectiveBeneficiaries,
    },
   },
  });

  props.isAgainBenificialSelected ? props.handleQuestions(false, 1) : props.handleQuestions(true, -16);
  resetOtherBeneficiaryDocument();
  props.setDocumentUrl("")
 }


 function getLastBeneficiaryFirstName(answers: any, type: any) {

  if (type == "associate") {
   const effectiveBeneficiaries = answers?.Associates?.Company?.EffectiveBeneficiaries;

   if (effectiveBeneficiaries?.length > 0) {
    const lastBeneficiary = effectiveBeneficiaries[effectiveBeneficiaries.length - 1];
    return lastBeneficiary.FirstName;
   } else {
    return undefined;
   }

  } else {
   const effectiveBeneficiaries = answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries;

   if (effectiveBeneficiaries?.length > 0) {
    const lastBeneficiary = effectiveBeneficiaries[effectiveBeneficiaries.length - 1];
    return lastBeneficiary.FirstName;
   } else {
    return undefined;
   }
  }

 }

 return (
  <div>
   <>
    <div className="py-[50px]">
     <form onSubmit={otherBeneficiaryDocumentHandleSubmit(otherBeneficiaryDocumentOnSubmit)}>
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Other beneficial owners
      </p>
      <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {getLastBeneficiaryFirstName(props.answers, "associate")} </p>
      <div className="flex flex-col gap-[20px]">
       <div className="flex w-full flex-col items-start relative">
        <div className="">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Download a document: K BIS
          <sup> *</sup>
         </label>
        </div>
        <UploadDocument setDocumentUrl={props.setDocumentUrl} />
        {
         !props.documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
          Please Upload Document
         </span>
        }
       </div>
       <div className="flex w-full flex-col items-start relative mt-5">
        <div className="">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Additional Certificate ( Passport / ID card)
          <sup> *</sup>
         </label>
        </div>
        <UploadDocument isAdditionalDocument={true} setAdditionalDocumentURL={props.setAdditionalDocumentURL} />
        {
         !props.additionalDocumentURL && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
          Please Upload Document
         </span>
        }
       </div>
       <div className="flex flex-col gap-4 justify-start items-start mb-5">
        <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
         Other beneficial owners
         *
        </p>
        <button onClick={(e) => { e.preventDefault(); props.setIsAgainBenificialSelected(true) }} className={`${props.isAgainBenificialSelected ? "border-[2px]" : "border"
         } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
         Yes
        </button>
        <button onClick={(e) => { e.preventDefault(); props.setIsAgainBenificialSelected(false) }} className={`${!props.isAgainBenificialSelected ? "border-[2px]" : "border"
         } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
         No
        </button>
       </div>

       <div>
        {" "}
        <button
         type="submit"
         disabled={!props.documentUrl}
         className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
        >
         Next
        </button>
       </div>
      </div>
     </form>
    </div>

   </>
  </div>
 )
}

export default Form_25