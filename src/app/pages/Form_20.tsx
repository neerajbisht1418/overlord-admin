import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_20 = (props: any) => {
 const corporationCompanyDetailSchema = yup.object().shape({
  CompanyName: yup.string().required("Company Name is required"),
  Id: yup.string().required("Id Name is required"),
  HeadOffice: yup.string().required("Head Office is required"),
 })

 const {
  register: corporationCompanyDetailRegister,
  handleSubmit: corporationCompanyDetailHandleSubmit,
  reset: resetCorporationCompanyDetail,
  formState: { errors: corporationCompanyDetailErrors },
 } = useForm({
  resolver: yupResolver(corporationCompanyDetailSchema)
 })

 const corporationCompanyDetailOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, Associates: {
    ...props.answers?.Associates, Company: {
     ...props.answers?.Associates?.Company, CompanyDetail: {
      ...data
     }
    }
   }
  })
  props.handleQuestions(true);
 }


 return (
  <div>
   <>
    <form onSubmit={corporationCompanyDetailHandleSubmit(corporationCompanyDetailOnSubmit)}>
     <div className="py-[50px]">
      <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
       Partners - Legal entity
      </p>
      <div className="flex flex-col gap-[20px]">
       <div className="flex w-full items-center relative">
        <label className="text-[15px] text-[#315B3F] w-[40%]">
         Company name
         <sup> *</sup>
        </label>
        <input
         className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
         placeholder={" Company name"}
         type="text"
         // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, CompanyDetail: { ...answers?.Associates?.Company?.CompanyDetail, CompanyName: e.target.value } } } })}
         {...corporationCompanyDetailRegister("CompanyName")}
        />
        {corporationCompanyDetailErrors.CompanyName && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationCompanyDetailErrors.CompanyName.message}
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
         placeholder={"ID number"}
         type="number"
         {...corporationCompanyDetailRegister("Id")}
        // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, CompanyDetail: { ...answers?.Associates?.Company?.CompanyDetail, Id: e.target.value } } } })}
        />
        {corporationCompanyDetailErrors.Id && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationCompanyDetailErrors.Id.message}
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
         placeholder={"The head office"}
         type="text"
         {...corporationCompanyDetailRegister("HeadOffice")}
        // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, CompanyDetail: { ...answers?.Associates?.Company?.CompanyDetail, HeadOffice: e.target.value } } } })}
        />
        {corporationCompanyDetailErrors.HeadOffice && (
         <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
          {corporationCompanyDetailErrors.HeadOffice.message}
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
     </div>
    </form>
   </>
  </div>
 )
}

export default Form_20