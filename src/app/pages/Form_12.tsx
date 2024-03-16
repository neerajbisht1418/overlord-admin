import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UploadDocument from "../uploadDocument/uploadDocument";

const Form_12 = (props: any) => {
  const ManagementDocumentSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    }),
  })

  const { register: ManagementDocumentRegister,
    handleSubmit: ManagementDocumentHandleSubmit,
    reset: resetManagementDocument,
    formState: { errors: ManagementDocumentErrors }
  } = useForm({
    resolver: yupResolver(ManagementDocumentSchema)
  })

  const ManagementDocumentOnSubmit = (data: any) => {
    props.setAnswers({
      ...props.answers, Management: {
        ...props.answers?.Management, Person: {
          ...props.answers?.Management?.Person, Document: props.documentUrl
        }
      }
    });
    props.setDocumentUrl("")
    props.handleQuestions(true)

  }

  console.log("props", props)

  return (
    <div>
      <>
        <div className="py-[50px]">
          <form onSubmit={ManagementDocumentHandleSubmit(ManagementDocumentOnSubmit)}>
            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">Management </p>
            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]"
              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
            >Physical Person</p>
            {/* <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div> */}
            <div className="flex flex-col gap-[20px]">
              <div className="flex w-full flex-col items-start relative">
                <div className="">
                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                    Download a document : Identity document <sup> *</sup>
                  </label>
                </div>
                <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {props.answers?.Management?.Person?.PersonalDetails?.FirstName} </p>
                <UploadDocument setDocumentUrl={props.setDocumentUrl} />
                {
                  !props.documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                    Please Upload Document
                  </span>
                }


              </div>
            </div>
            <div>
              {" "}
              <button
                // onClick={() => handleQuestions(true)}
                type="submit"
                disabled={!props.documentUrl}
                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
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

export default Form_12