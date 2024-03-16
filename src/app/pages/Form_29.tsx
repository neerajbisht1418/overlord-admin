import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_29 = (props: any) => {

 const corporationSchema = yup.object().shape({
  CompanyName: yup.string().required("Company Name is required"),
  Id: yup.string().required("Id Name is required"),
  HeadOffice: yup.string().required("Head Office is required"),
 })

 const {
  register: corporationRegister,
  handleSubmit: corporationHandleSubmit,

  formState: { errors: corporationErrors }
 } = useForm({
  resolver: yupResolver(corporationSchema)
 })

 const corporationOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, ConstituentPartner: {
    ...props.answers?.ConstituentPartner, Company: {
     ...props.answers?.ConstituentPartner?.Company, CompanyDetail: { ...data }
    }
   }
  });
  props.handleQuestions(true);
 }

 return (
  <div>
   <>

    <div className="py-[50px]">
     <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
      Corporation
     </p>
     <form onSubmit={corporationHandleSubmit(corporationOnSubmit)}>
      <div className="flex flex-col gap-[25px]">
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         Company Name <sup> *</sup>
        </label>
        <div className="w-[60%] relative">
         <input
          className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Company Name"}
          // name="companyName"
          {...corporationRegister("CompanyName")}
          // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, CompanyName: e.target.value } } } })}
          type="text"
         />
         {corporationErrors.CompanyName && (
          <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
           {corporationErrors.CompanyName.message}
          </span>
         )}
        </div>
       </div>
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         ID number <sup> *</sup>
        </label>
        <div className="w-[60%] relative">
         <input
          className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"ID number"}
          // name="idNumber"
          type="number"
          {...corporationRegister("Id")}
         // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, Id: e.target.value } } } })}
         />
         {corporationErrors.Id && (
          <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
           {corporationErrors.Id.message}
          </span>
         )}
        </div>
       </div>
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         Head Office <sup> *</sup>
        </label>
        <div className="w-[60%] relative">
         <input
          className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
          placeholder={"Head Office"}
          // name="HeadOffice"
          type="text"
          {...corporationRegister("HeadOffice")}
         // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, HeadOffice: e.target.value } } } })}
         />
         {corporationErrors.HeadOffice && (
          <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
           {corporationErrors.HeadOffice.message}
          </span>
         )}
        </div>
       </div>
      </div>
      <div>
       {" "}
       <button
        type="submit"
        className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
       // onClick={() => {
       //   handleQuestions(true);
       // }}
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

export default Form_29