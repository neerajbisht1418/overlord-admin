import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Form_00 = (props: any) => {

 const emailSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email address"),
 })

 const { register: emailRegister,
  handleSubmit: emailHandleSubmit,
  reset: emailReset,
  formState: { errors: emailErrors }
 } = useForm({
  resolver: yupResolver(emailSchema)
 })

 const emailOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, email: data?.email
  })
  props.handleQuestions(true, 36);
 }


 return (
  <div>
   <form onSubmit={emailHandleSubmit(emailOnSubmit)}>
    <div className="py-[50px]">
     <p className="text-[20px] font-[500] text-[#315B3F]">
      Client's Email
     </p>
     <div className="flex w-full items-center relative">
      <label className="text-[15px] text-[#315B3F] w-[40%]">
       Email<sup> *</sup>
      </label>
      <div className="w-full relative mt-[15px]">
       <input
        className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
        placeholder={"Email"}
        // name="email"
        {...emailRegister("email")}
        type="email"
       />
       {emailErrors.email && (
        <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
         {emailErrors.email.message}
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
     >
      Next
     </button>
    </div>
   </form>
  </div>
 )
}

export default Form_00