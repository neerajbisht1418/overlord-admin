import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

const Form_03 = (props: any) => {

  const walletSchema = yup.object().shape({
    companyName: yup.string().required("Company Name is required"),
    idNumber: yup.string().required("ID Number is required"),
    headOffice: yup.string().required("Head Office is required"),
    countryOfRegistration: yup
      .string()
      .required("Country of Registration is required"),
    tradeRegister: yup
      .string()
      .required("Trade Register of Companies is required"),
  });

  const {
    register: walletRegister,
    handleSubmit: walletHandleSubmit,
    formState: { errors: walletErrors },
  } = useForm({
    resolver: yupResolver(walletSchema),
  });

  const walletOnSubmit = (data: any) => {
    console.log("data", data)
    props.setAnswers({ ...props.answers, wallet: data });
    props.handleQuestions(true); // Use this data for further processing or API calls
  };



  return (
    <div>
      <form onSubmit={walletHandleSubmit(walletOnSubmit)}>
        <div className="py-[50px]">
          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
            Target Company
          </p>
          <div className="flex flex-col gap-[25px]">
            <div className="flex w-full items-center">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                Company Name <sup> *</sup>
              </label>
              <div className="w-[60%] relative">
                <input
                  className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Company Name"}
                  // name="companyName"
                  {...walletRegister("companyName")}
                  type="text"
                />
                {walletErrors.companyName && (
                  <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    {walletErrors.companyName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                ID number <sup> *</sup>
              </label>
              <div className="w-[60%] relative">
                <input
                  className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"ID number"}
                  // name="idNumber"
                  {...walletRegister("idNumber")}
                  type="number"
                />
                {walletErrors.idNumber && (
                  <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    {walletErrors.idNumber.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                The head office <sup> *</sup>
              </label>
              <div className="w-[60%] relative">
                <input
                  className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"The head office"}
                  // name="headOffice"
                  {...walletRegister("headOffice")}
                  type="text"
                />
                {walletErrors.headOffice && (
                  <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    {walletErrors.headOffice.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                Country of registration <sup> *</sup>
              </label>
              <div className="w-[60%] relative">
                <input
                  className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Country of registration"}
                  // name="countryOfRegistration"
                  {...walletRegister("countryOfRegistration")}
                  type="text"
                />
                {walletErrors.countryOfRegistration && (
                  <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    {walletErrors.countryOfRegistration.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                Trade Register of Companies <sup> *</sup>
              </label>
              <div className="w-[60%] relative">
                <input
                  className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                  placeholder={"Trade Register of Companies"}
                  // name="tradeRegister"
                  {...walletRegister("tradeRegister")}
                  type="text"
                />
                {walletErrors.tradeRegister && (
                  <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    {walletErrors.tradeRegister.message}
                  </span>
                )}
              </div>
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

export default Form_03