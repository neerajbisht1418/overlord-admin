"use client"

import React, { useState } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";
import submitToDocSeal from '../docSeal/submitToDocSeal';
import Image from "next/image";
import { sendEmailToJoinStockCompany } from "../sendEmail/sendEmailToJoinStockCompany";


const Form_16 = (props: any) => {
  const [loading, setLoading] = useState(false)
  const ongoingIncorporationTemplate = props?.answers?.ongoingIncorporationData

  function getFormattedDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
  }

  const commentSchema = yup.object().shape({
    Comment: yup.string()

  })

  const { register: commentRegister,
    handleSubmit: commentHandleSubmit,
    reset: resetComment,
    formState: { errors: commentErrors }
  } = useForm({
    resolver: yupResolver(commentSchema)
  })

  const commentOnSubmit = async (data: any) => {

    try {
      setLoading(true);
      props.setAnswers({
        ...props.answers, Comment: data
      })

      // setOngoingIncorporationDataList={setOngoingIncorporationDataList} OngoingIncorporationDataList={OngoingIncorporationDataList}

      props.setOngoingIncorporationDataList([...props?.OngoingIncorporationDataList, props.answers?.ongoingIncorporationData])

      const isCivilSociety = props.answers?.shape
      const isCarried = props.answers?.PerformanceFees?.Carried
      // props.main()

      // if (props.answers?.shape == "Joint stock company") {
      //   const legalRepresentNaturalPerson = props.answers?.ConstituentPartner?.PersonalDetails?.Document
      //   const legalRepresentCorporation = props.answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries
      //   const naturalPersonShareholder = props.answers?.Management?.Person?.Document
      //   const corporationShareholder = props.answers?.Management?.Company?.Document

      //   const legalRepresentativeName = props.answers?.Management?.Company?.LegalRepresentative?.Name
      //   const physicalPersonName = props.answers?.Management?.Person?.PersonalDetails?.FirstName
      //   const physicalPersonFamilyName = props.answers?.Management?.Person?.FatherMotherDetails?.FatherFirstName

      //   const documents = { legalRepresentNaturalPerson, legalRepresentCorporation, naturalPersonShareholder, corporationShareholder }
      //   const sendMailToBank = await sendEmailToJoinStockCompany({ email: props.answers?.email, documents, legalRepresentativeName, physicalPersonName, physicalPersonFamilyName })
      //   console.log("sendMailToBank", sendMailToBank)
      // }

      if (props?.shape?.isCivilSociety === "Civil society") {
        if (props?.answers?.PerformanceFees?.Carried === "yes") {
          const templateDataOfCivilSocietyCarried = {
            "template_id": "28898",
            "send_email": true,
            // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
            "submission": {
              "submitters": [
                {
                  "role": "First Party",
                  "email": props.answers?.email,
                  "values": {
                    "nameOfEntity1": `${props?.answers?.CompanyName || "Not Found"}`,
                    "addressOfEntity1": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,
                    "registeryIncorporation": `${props.answers?.AvailableHeadQuarter == "Yes" ? "Not Required" : "Creteil"}`,

                    "nameOfFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,
                    "typeOfFoundingShareholder": `Not Required`,
                    "headquarter": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident ? props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.HeadOffice}`,
                    "dateOfPublication": `${getFormattedDate()}`,
                    "foundingShareholder": `$${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,
                    "legalRepresentativeFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? "Not Required" : props.answers?.ConstituentPartner?.Company?.RepresentativeDetails?.Name}`,

                    "nameOfEntity2": `${props?.answers?.CompanyName || "Not Found"}`,
                    "addressOfEntity2": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,
                    "nameOfPresident": `${props.answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"}`,
                    "typeOfEntity": `${props?.answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"}`,
                    "target": `${props.answers?.wallet?.companyName || "Target name"}`,
                  },
                }
              ]
            }
          }
          const DocSealData = await submitToDocSeal(templateDataOfCivilSocietyCarried)
        } else {
          const templateDataOfCivilSocietyNotCarried = {
            "template_id": "28899",
            "send_email": true,
            // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
            "submission": {
              "submitters": [
                {
                  "role": "First Party",
                  "email": props.answers?.email,
                  "values": {
                    "nameOfEntity1": `${props?.answers?.CompanyName || "Not Found"}`,
                    "addressOfEntity1": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,
                    "registeryIncorporation": `${props.answers?.AvailableHeadQuarter == "Yes" ? "Not Required" : "Creteil"}`,

                    "nameOfFoundingShareholder1": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,
                    "nameOfFoundingShareholder2": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,

                    "typeOfFoundingShareholder": `Not Required`,
                    "headquarter": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident ? props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.HeadOffice}`,
                    "dateOfPublication": `${getFormattedDate()}`,
                    "foundingShareholder": `$${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,
                    "legalRepresentativeFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? "Not Required" : props.answers?.ConstituentPartner?.Company?.RepresentativeDetails?.Name}`,

                    "nameOfEntity2": `${props?.answers?.CompanyName || "Not Found"}`,
                    "addressOfEntity2": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,
                    "nameOfPresident": `${props.answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"}`,
                    "typeOfEntity": `${props?.answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"}`,
                    "target": `${props.answers?.wallet?.companyName || "Target name"}`,
                  },
                }
              ]
            }
          }
          const DocSealData = await submitToDocSeal(templateDataOfCivilSocietyNotCarried)
          console.log("DocSealData1", DocSealData)
        }
      } else {
        if (props?.answers?.PerformanceFees?.Carried === "yes") {
          const templateDataOfNonCivilSocietyCarried = {
            "template_id": "28896",
            "send_email": true,
            // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
            "submission": {
              "submitters": [
                {
                  "role": "First Party",
                  "email": props.answers?.email,
                  "values": {
                    "nameOfEntity1": `${props.answers?.Associates?.Company?.CompanyDetail?.CompanyName || props.answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
                    "addressOfEntity1": `${props.answers?.Associates?.Company?.CompanyDetail?.CompanyName || props.answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "No Data"}`,
                    "registeryIncorporation": `${props.answers?.shape || "No Data"}`,

                    "nameOfFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,

                    "typeOfFoundingShareholder": `Not Required`,
                    "headquarter": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident ? props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.HeadOffice}`,
                    "dateOfPublication": `${getFormattedDate()}`,
                    "foundingShareholder": `$${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,
                    "legalRepresentativeFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? "Not Required" : props.answers?.ConstituentPartner?.Company?.RepresentativeDetails?.Name}`,

                    "nameOfEntity2": `${props?.answers?.CompanyName || "Not Found"}`,
                    "addressOfEntity2": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,
                    "nameOfPresident": `${props.answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"}`,
                    "typeOfEntity": `${props?.answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"}`,
                    "target": `${props.answers?.wallet?.companyName || "Target name"}`,

                    "percentageOne": `${props.answers?.PerformanceFees?.CarriedPercentage || "No data"}`,
                    "percentageTwo": `${props.answers?.PerformanceFees?.CarriedPercentage || "No data"}`,
                  },
                }
              ]
            }
          }
          const DocSealData = await submitToDocSeal(templateDataOfNonCivilSocietyCarried)
          console.log("DocSealData2", DocSealData)
        } else {
          const templateDataOfNonCivilSocietyNotCarried = {
            "template_id": "28897",
            "send_email": true,
            // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
            "submission": {
              "submitters": [
                {
                  "role": "First Party",
                  "email": props.answers?.email,
                  "values": {
                    "nameOfEntity1": `${props.answers?.Associates?.Company?.CompanyDetail?.CompanyName || props.answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
                    "addressOfEntity1": `${props.answers?.Associates?.Company?.CompanyDetail?.CompanyName || props.answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "No Data"}`,
                    "registeryIncorporation": `${props.answers?.shape || "No Data"}`,

                    "nameOfFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName}`,

                    "typeOfFoundingShareholder": `Not Required`,
                    "headquarter": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident ? props.answers?.ConstituentPartner?.PersonalDetails?.PlaceOfResident : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.HeadOffice}`,
                    "dateOfPublication": `${getFormattedDate()
                      } `,
                    "foundingShareholder": `$${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? props.answers?.ConstituentPartner?.PersonalDetails?.Name : props.answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName} `,
                    "legalRepresentativeFoundingShareholder": `${!!props.answers?.ConstituentPartner?.PersonalDetails?.Name ? "Not Required" : props.answers?.ConstituentPartner?.Company?.RepresentativeDetails?.Name} `,

                    "nameOfEntity2": `${props?.answers?.CompanyName || "Not Found"} `,
                    "addressOfEntity2": `${props?.answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"} `,
                    "nameOfPresident": `${props.answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"} `,
                    "typeOfEntity": `${props?.answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
                    "target": `${props.answers?.wallet?.companyName || "Target name"} `,
                  },
                }
              ]
            }
          }
          const DocSealData = await submitToDocSeal(templateDataOfNonCivilSocietyNotCarried)
        }

      }

      // const updateLastEmail = () => {
      //   props.setOngoingIncorporationData((prevState: any) => {
      //     const updatedData = [...prevState, ongoingIncorporationTemplate];
      //     console.log("updatedData", updatedData)
      //     const lastIndex = updatedData.length - 1;
      //     const updatedLastElement = {
      //       ...updatedData[lastIndex],
      //       incorporation: props?.answers?.questionaryId,
      //       Mail: {
      //         ...updatedData[lastIndex].Mail,
      //         "Not Send": true,
      //         "send": true,
      //       }
      //     };

      //     console.log("updatedLastElement", updatedLastElement)
      //     return [
      //       ...updatedData?.slice(0, lastIndex),
      //       updatedLastElement
      //     ];
      //   });
      // }

      // const updateBankAccountStatus = () => {
      //   props.setOngoingIncorporationData((prevState: any) => {
      //     const updatedData = [...prevState];
      //     const lastIndex = updatedData.length - 1;
      //     const updatedLastElement = {
      //       ...updatedData[lastIndex],
      //       incorporation: props?.answers?.questionaryId,
      //       BankAccount: {
      //         ...updatedData[lastIndex].BankAccount,
      //         "mailToCarpaNotSend": true,
      //         "mailSend": true,
      //         "responseReceive": false,
      //         "IBANsendToClient": false,
      //         "clientSendMoney": false
      //       }
      //     };
      //     return [
      //       ...updatedData?.slice(0, lastIndex),
      //       updatedLastElement
      //     ];
      //   });
      // }

      // updateLastEmail()

      if (props.answers?.shape == "Joint stock company") {
        // updateBankAccountStatus()
      }

      props.setIsQuestionaryCompleted(true)
      props.setIsQuestionOpen(false)
      props.setBackButtonFunctionality([0])
      props.setActiveQuestion(0)

    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <>
        <form onSubmit={commentHandleSubmit(commentOnSubmit)}>
          <div>
            <div className="py-[50px]">
              <div className="flex w-full items-start relative">
                <label className="text-[15px] text-[#315B3F] w-[40%]">
                  Comment <sup> *</sup>
                </label>
                <textarea
                  className="border outline-none w-[60%] h-[100px] rounded-[8px] px-[10px]"
                  placeholder={"Comment"}
                  {...commentRegister("Comment")}
                />
                {commentErrors.Comment && (
                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                    {commentErrors.Comment.message}
                  </span>
                )}
              </div>

              <p className="pb-[20px] text-[30px] font-[600] text-[#315B3F] mt-5">
                Thanks !
              </p>
              <div className="flex  justify-center items-center w-full h-[80px] p-[24px_32px]">
                <Image src={"/logo.png"} alt={"logo"} height={32} width={200} />
              </div>
              <div>
                {" "}
                <button
                  type="submit"
                  className="border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-[10px] relative"
                >

                  {loading ? (
                    <>
                      <div className=" flex justify-center items-center gap-1">
                        <div>
                          Loading
                        </div>
                        <div className="flex">
                          <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce"></div>
                          <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                          <div className="w-1 h-1 bg-white rounded-full mx-1 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                        </div>

                      </div>
                    </>
                  )
                    :
                    'Submit'}
                </button>
              </div>
            </div>

          </div>
        </form>
      </>
    </div>
  )
}

export default Form_16