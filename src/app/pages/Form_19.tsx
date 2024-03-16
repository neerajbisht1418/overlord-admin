import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UploadDocument from "../uploadDocument/uploadDocument";

const Form_19 = (props: any) => {
 const managementLegalDocumentSchema = yup.object().shape({
  Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
   return true
  })
 })

 const { register: managementLegalDocumentRegister,
  handleSubmit: managementLegalDocumentHandleSubmit,
  reset: managementLegalDocumentDocument,
  formState: { errors: managementLegalDocumentErrors }
 } = useForm({
  resolver: yupResolver(managementLegalDocumentSchema)
 })

 const managementLegalDocumentOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, Management: {
    ...props.answers?.Management, Company: {
     ...props.answers?.Management?.Company, Document: props.documentUrl

    }
   }
  })
  props.setDocumentUrl("")
  props.handleQuestions(true, -6);
 }
 return (
  <div>
   <>
    <div>
     <form onSubmit={managementLegalDocumentHandleSubmit(managementLegalDocumentOnSubmit)}>
      <div className="py-[50px]">
       <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
        Management
       </p>
       <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
        Legal representative:
       </p>
       <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {props.answers?.Management?.Company?.LegalRepresentative?.FirstName} </p>
       <div className="flex flex-col gap-[20px]">
        <div className="flex w-full flex-col items-start relative">
         <div className="">
          <label className="text-[15px] text-[#315B3F] w-[40%]">
           Download a document : K BIS
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
      </div>
     </form>
    </div>
   </>
  </div>
 )
}

export default Form_19