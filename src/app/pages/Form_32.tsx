import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UploadDocument from "../uploadDocument/uploadDocument";


const Form_32 = (props: any) => {
 const constituentDocumentSchema = yup.object().shape({
  Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
   return true
  }),
  additionalDocument: yup.string().test("fileSize", "Please Upload the document", (value) => {
   return true
  }),
 })

 const { register: constituentDocumentRegister,
  handleSubmit: constituentDocumentHandleSubmit,
  reset: resetconstituentDocument,
  formState: { errors: constituentDocumentErrors }
 } = useForm({
  resolver: yupResolver(constituentDocumentSchema)
 })

 const constituentDocumentOnSubmit = (data: any) => {
  const currentDocuments = props.answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries || [];
  const updatedDocuments = [
   ...currentDocuments.slice(0, -1),
   {
    ...currentDocuments[currentDocuments.length - 1],
    Document: props.documentUrl,
    AdditionalDocument: data.additionalDocumentUrl,
   },
  ];

  props.setAnswers({
   ...props.answers,
   ConstituentPartner: {
    ...props.answers?.ConstituentPartner, Company: {
     ...props.answers?.ConstituentPartner?.Company, EffectiveBeneficiaries: updatedDocuments,
    }

   },
  });

  props.isCorporationBenificialSelected ? props.handleQuestions(true, -1) : props.handleQuestions(true, -23);
  props.resetconstituentBeneficiary();
  props.setDocumentUrl("");
 };


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
    <form onSubmit={constituentDocumentHandleSubmit(constituentDocumentOnSubmit)}>
     <div className="py-[50px]">
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Corporation
      </p>
      <p className="pb-[20px] text-[15px] underline font-[500] text-[#315B3F]">
       Effective beneficiaries:
      </p>
      <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {getLastBeneficiaryFirstName(props.answers, "")} </p>
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
        <button onClick={(e) => { e.preventDefault(); props.setIsCorporationBenificialSelected(true) }} className={`${props.isCorporationBenificialSelected ? "border-[2px]" : "border"
         } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
         Yes
        </button>
        <button onClick={(e) => { e.preventDefault(); props.setIsCorporationBenificialSelected(false) }} className={`${!props.isCorporationBenificialSelected ? "border-[2px]" : "border"
         } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
         No
        </button>
       </div>

       <div>
        {" "}
        <button

         type="submit"
         className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
         disabled={!props.documentUrl}
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

export default Form_32