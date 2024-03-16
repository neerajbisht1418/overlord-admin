import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_17 = (props: any) => {

 const managementCorporationSchema = yup.object().shape({
  CompanyName: yup.string().required("CompanyName is required"),
  Id: yup.string().required("Id is required"),
  HeadOffice: yup.string().required("Head office is required"),
 })

 const { register: managementCorporationRegister,
  handleSubmit: managementCorporationHandleSubmit,
  reset: resetManagementCorporation,
  formState: { errors: managementCorporationFeeErrors }
 } = useForm({
  resolver: yupResolver(managementCorporationSchema)
 })

 const managementCorporationOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, Management: {
    ...props.answers?.Management, Company: {
     ...props.answers?.Management?.Company, CompanyDetail: { ...data }
    }
   }
  })
  // setActiveQuestion(18)
  props.handleQuestions(true);
 }
 return (
  <div>
   <>
    <div>
     <form onSubmit={managementCorporationHandleSubmit(managementCorporationOnSubmit)}>
      <div className="py-[50px]">
       <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
        Management
       </p>
       <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
        Corporation
       </p>
       <div className="flex flex-col gap-[20px]">
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          Company name
          <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Company name"}
          type="text"
          // name="CompanyName"
          {...managementCorporationRegister("CompanyName")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, CompanyName: e.target.value } } } })}

         />
         {managementCorporationFeeErrors.CompanyName && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementCorporationFeeErrors.CompanyName.message}
          </span>
         )}
        </div>

        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          ID number
          <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"ID Number"}
          type="number"
          // name="Id"
          {...managementCorporationRegister("Id")}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, Id: e.target.value } } } })}
         />
         {managementCorporationFeeErrors.Id && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementCorporationFeeErrors.Id.message}
          </span>
         )}
        </div>
        <div className="flex w-full items-center relative">
         <label className="text-[15px] text-[#315B3F] w-[40%]">
          The head office
          <sup> *</sup>
         </label>
         <input
          className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"The Head Office"}
          type="text"
          {...managementCorporationRegister('HeadOffice')}
         // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, HeadOffice: e.target.value } } } })}
         />
         {managementCorporationFeeErrors.HeadOffice && (
          <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
           {managementCorporationFeeErrors.HeadOffice.message}
          </span>
         )}
        </div>
       </div>
       <div>
        <button
         // onClick={() => {
         //   setActiveQuestion(18);
         // }}
         type="submit"
         className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
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

export default Form_17