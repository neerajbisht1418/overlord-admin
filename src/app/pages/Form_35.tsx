import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const Form_35 = (props: any) => {

 const investmentPolicySchema = yup.object().shape({
  investmentPolicy: yup.string().required("Investment Policy is Required"),
 })

 const { register: investmentPolicyRegister,
  handleSubmit: investmentPolicyHandleSubmit,
  reset: investmentPolicyReset,
  formState: { errors: investmentPolicyErrors }
 } = useForm({
  resolver: yupResolver(investmentPolicySchema)
 })

 const investmentPolicyOnSubmit = (data: any) => {
  console.log("data", data);
  props.setAnswers({
   ...props.answers, investmentPolicy: data?.investmentPolicy
  })
  props.handleQuestions(true, -31);
 }


 return (
  <div>
   <form onSubmit={investmentPolicyHandleSubmit(investmentPolicyOnSubmit)}>
    <div className="py-5 relative">
     <p className="text-[20px] font-[500] text-[#315B3F]">
      Investment Policy
     </p>
    </div>
    <input
     className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
     placeholder={"Investment Policy"}
     // name="companyName"
     {...investmentPolicyRegister("investmentPolicy")}
     type="text"
    />
    {investmentPolicyErrors.investmentPolicy && (
     <span className="text-[11px] text-[red] absolute left-[29%] top-[32.8%]">
      {investmentPolicyErrors.investmentPolicy.message}
     </span>
    )}
    <button
     type="submit"
     className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-10"
    >
     Next
    </button>
   </form>
  </div>
 )
}

export default Form_35