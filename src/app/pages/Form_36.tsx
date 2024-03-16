import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Form_36 = (props: any) => {

 const entitySchema = yup.object().shape({
  companyName: yup.string().required("Entity Name is required"),
 });

 const {
  register: entityRegister,
  handleSubmit: entityHandleSubmit,
  formState: { errors: entityErrors },
 } = useForm({
  resolver: yupResolver(entitySchema),
 });

 const entityOnSubmit = (data: any) => {
  console.log("data", data)
  props.setAnswers({ ...props.answers, companyName: data?.companyName });
  props.handleQuestions(true, -35); // Use this data for further processing or API calls
 };

 return (
  <div>
   <>
    <form onSubmit={entityHandleSubmit(entityOnSubmit)}>
     <div className="py-5 relative">
      <p className="text-[20px] font-[500] text-[#315B3F]">
       Name of New Entity
      </p>
     </div>
     <input
      className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
      placeholder={"Company Name"}
      // name="companyName"
      {...entityRegister("companyName")}
      type="text"
     />
     {entityErrors.companyName && (
      <span className="text-[11px] text-[red] absolute left-[36%] top-[32.8%]">
       {entityErrors.companyName.message}
      </span>
     )}
     <button
      // onClick={() => {
      //  props.answers?.shape && (props.answers.shape === "Civil society" ? props.handleQuestions(true) : props.handleQuestions(true, 22))
      // }}
      type="submit"
      className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-10"
     >
      Next
     </button>
    </form>
   </>
  </div>
 )
}

export default Form_36