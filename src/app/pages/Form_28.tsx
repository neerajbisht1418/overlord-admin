import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UploadDocument from "../uploadDocument/uploadDocument";

const Form_28 = (props: any) => {

  const constituentDocumentPersonSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    }),
    AmountContribution: yup.string().required("Amount Contribution is required"),
  })

  const { register: constituentDocumentPersonRegister,
    handleSubmit: constituentDocumentPersonHandleSubmit,
    reset: resetconstituentDocumentPerson,
    formState: { errors: constituentDocumentPersonErrors }
  } = useForm({
    resolver: yupResolver(constituentDocumentPersonSchema)
  })

  const constituentDocumentPersonOnSubmit = (data: any) => {
    -
      props.setAnswers({
        ...props.answers, ConstituentPartner: {
          ...props.answers?.ConstituentPartner, PersonalDetails: {
            ...props.answers?.ConstituentPartner?.PersonalDetails, Document: props.documentUrl, AmountContribution: data?.AmountContribution
          }
        }
      })
    props.setDocumentUrl("")
    props.handleQuestions(true, -19)
  }
  return (
    <div>
      <>
        <form onSubmit={constituentDocumentPersonHandleSubmit(constituentDocumentPersonOnSubmit)}>
          <div className="py-[50px]">

            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]"
              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
            >
              Physical Person
            </p>
            {/* <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div> */}
            <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {props.answers?.ConstituentPartner?.PersonalDetails?.FirstName} </p>
            <div className="flex w-full items-center mb-5 relative">
              <label className="text-[15px] text-[#315B3F] w-[40%]">
                Amount of contribution
                <sup> *</sup>
              </label>
              <input
                className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                placeholder={"Amount of contribution"}
                type="number"
                {...constituentDocumentPersonRegister("AmountContribution")}
              // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, AmountContribution: e.target.value })}
              />
              {constituentDocumentPersonErrors.AmountContribution && (
                <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                  {constituentDocumentPersonErrors.AmountContribution.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full flex-col items-start relative">
                <div className="">
                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                    Download a document : Identity document
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
      </>
    </div>
  )
}

export default Form_28