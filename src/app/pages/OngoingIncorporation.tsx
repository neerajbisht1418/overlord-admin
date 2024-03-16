// "use client"

import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { sendEmailToJoinStockCompany } from '../sendEmail/sendEmailToJoinStockCompany';
import UploadDocument from "../uploadDocument/uploadDocument";
import { SendEmailToClientWithIBAN } from '../sendEmail/SendEmailToClientWithIBAN';

const OngoingIncorporation = (props: any) => {

 console.log("props", props)

 const [selectedIncorporation, setSelectedIncorporation] = useState({});
 const [showConfirmationModal, setShowConfirmationModal] = useState(false);
 const [showUploadDocument, setShowUploadDocument] = useState(false);

 const [showCurrentSubKey, setShowCurrentSubKey] = useState("")
 const [showCurrentKey, setShowCurrentKey] = useState("")

 async function sendMailToCARPA() {
  const legalRepresentNaturalPerson = props.answers?.ConstituentPartner?.PersonalDetails?.Document
  const legalRepresentCorporation = props.answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries
  const naturalPersonShareholder = props.answers?.Management?.Person?.Document
  const corporationShareholder = props.answers?.Management?.Company?.Document

  const legalRepresentativeName = props.answers?.Management?.Company?.LegalRepresentative?.Name
  const physicalPersonName = props.answers?.Management?.Person?.PersonalDetails?.FirstName
  const physicalPersonFamilyName = props.answers?.Management?.Person?.FatherMotherDetails?.FatherFirstName

  const documents = { legalRepresentNaturalPerson, legalRepresentCorporation, naturalPersonShareholder, corporationShareholder }
  const sendMailToBank = await sendEmailToJoinStockCompany({ email: props.answers?.email, documents, legalRepresentativeName, physicalPersonName, physicalPersonFamilyName })
  if (sendMailToBank?.status === "success") {
   setSelectedIncorporation((prevSelectedIncorporation: any) => ({
    ...prevSelectedIncorporation,
    [showCurrentKey]: {
     ...prevSelectedIncorporation[showCurrentKey],
     [showCurrentSubKey]: true,
     mailSend: true
    }
   }));
  }
 }

 const handleIncorporationChange = (e: any) => {
  const selected = e.target.value;
  setSelectedIncorporation(
   props?.OngoingIncorporationDataList?.find((ele: any) => ele.incorporation === selected)
  );
 };

 const formatKeyForDisplay = (key: any) => {
  let formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
  formattedKey = formattedKey.replace(/[A-Z]/g, (match: any, index: any) => {
   if (index === formattedKey.length - 1) {
    return ` ${match}`;
   } else {
    return ` ${match}`;
   }
  });
  return formattedKey.trim();
 };

 const handleEmailStatusClick = () => {
  setShowConfirmationModal(true);
 };

 const handleCarpaEmailStatus = () => {
  setShowConfirmationModal(true);
 }

 const handleCarpaEmailResponse = () => {
  setShowUploadDocument(true)
 }

 const handleIBANsendToClient = () => {
  setShowConfirmationModal(true)
 }

 const handleReminderToClientToSendMoney = () => {
  setShowConfirmationModal(true)
 }

 const handleClientSendMoney = () => {
  setShowConfirmationModal(true)
 }


 const handleConfirmation = async (confirmation: any) => {
  if (confirmation) {

   if (showCurrentSubKey === "send") {
    const mailStatus = await props.sendMail();
    if (mailStatus?.status === "success") {
     setSelectedIncorporation((prevSelectedIncorporation: any) => ({
      ...prevSelectedIncorporation,
      [showCurrentKey]: {
       ...prevSelectedIncorporation[showCurrentKey],
       [showCurrentSubKey]: true
      }
     }));
    }
   }

   if (showCurrentSubKey === "mailToCarpaNotSend") {
    sendMailToCARPA()
   }

   if (showCurrentSubKey === "IBANsendToClient") {
    const emailResponse = await SendEmailToClientWithIBAN({ answers: props.answers, isEmailType: "IBANsendToClient" })
    console.log("emailResponse", emailResponse)
    if (emailResponse?.status === "success") {
     setSelectedIncorporation((prevSelectedIncorporation: any) => ({
      ...prevSelectedIncorporation,
      [showCurrentKey]: {
       ...prevSelectedIncorporation[showCurrentKey],
       [showCurrentSubKey]: true
      }
     }));
    } else {
     alert("Email not sent")
    }
   }

   if (showCurrentSubKey === "sendEmail (In case the money has not been sent)") {
    const emailResponse = await SendEmailToClientWithIBAN({ answers: props.answers, isEmailType: "sendEmail (In case the money has not been sent)" })
    console.log("emailResponse", emailResponse)
    if (emailResponse?.status === "success") {
     setSelectedIncorporation((prevSelectedIncorporation: any) => ({
      ...prevSelectedIncorporation,
      [showCurrentKey]: {
       ...prevSelectedIncorporation[showCurrentKey],
       [showCurrentSubKey]: true
      }
     }));
    } else {
     alert("Email not sent")
    }
   }

   if (showCurrentSubKey === "clientSendMoney") {
    setSelectedIncorporation((prevSelectedIncorporation: any) => ({
     ...prevSelectedIncorporation,
     [showCurrentKey]: {
      ...prevSelectedIncorporation[showCurrentKey],
      [showCurrentSubKey]: true
     }
    }));
   }




  }
  setShowConfirmationModal(false);
 }


 const handleStatusClick = (subKey: any) => {
  switch (subKey) {
   case "Not Send":
    handleEmailStatusClick();
    break;
   case "send":
    handleEmailStatusClick();
    break;
   case "mailToCarpaNotSend":
    handleCarpaEmailStatus();
    break;
   case "responseReceive/uploadIBAN":
    handleCarpaEmailResponse();
    break;
   case "IBANsendToClient":
    handleIBANsendToClient()
    break;
   case "sendEmail (In case the money has not been sent)":
    handleReminderToClientToSendMoney()
    break;
   case "clientSendMoney":
    handleClientSendMoney()
    break
   default:
    break;
  }
 };

 console.log("props", props)

 return (
  <div className='my-[50px] mx-20'>
   <div>
    <form className="max-w-sm my-[50px] mx-20">
     <label className="block mb-2 text-md bold-600 font-medium text-gray-900 dark:text-black">Select an Incorporation</label>
     <select
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#315b3f] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleIncorporationChange}
     >
      <option disabled selected className='!text-[#eeeffc]'>Choose an Incorporation</option>
      {props?.OngoingIncorporationDataList?.map((ele: any) => (
       <option key={ele.incorporation} value={ele.incorporation}>{ele.incorporation}</option>
      ))}
     </select>
    </form>
   </div>

   {selectedIncorporation && (
    <div>
     {Object.entries(selectedIncorporation).map(([key, value]) => (
      key !== "incorporation" && (
       <div key={key} className='flex flex-col gap-4 px-20 rounded' onClick={() => setShowCurrentKey(key)}>
        <div>
         <h1 className="text-xl font-bold text-gray-900 dark:text-black">{formatKeyForDisplay(key)}</h1>
        </div>
        <div>
         <ol className="flex">
          {Object.entries(value as { [key: string]: boolean }).map(([subKey, subValue]) => (
           subKey !== "status" && (
            <li key={subKey} className="relative w-full mb-6">
             <div className="flex items-center">
              <div
               className={`z-10 flex items-center justify-center w-6 h-6 rounded-full ring-0 ring-white sm:ring-8 ${subValue ? 'bg-green-500' : 'bg-red-500'} cursor-pointer`}
               onClick={() => { handleStatusClick(subKey); console.log("subKey", subKey); setShowCurrentSubKey(subKey) }}
              >
               {subValue ? (
                <svg className="w-2.5 h-2.5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
               ) : <IoMdClose className='text-[white] cursor-pointer' />}
              </div>
              <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
             </div>
             <div className="mt-3">
              <h3 className={`font-medium ${subValue ? 'text-gray-900' : 'text-red-500'}`}>{formatKeyForDisplay(subKey)}</h3>
             </div>
            </li>
           )
          ))}
         </ol>
        </div>
       </div>
      )
     ))}
    </div>
   )}

   {showConfirmationModal && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50  z-40">
     <div className="bg-white rounded-lg p-5 w-80">
      <p>Are you sure you want to update the status?</p>
      <div className="mt-4 flex justify-end">
       <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={() => handleConfirmation(true)}>Confirm</button>
       <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded" onClick={() => handleConfirmation(false)}>Cancel</button>
      </div>
     </div>
    </div>
   )}

   {showUploadDocument && (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-50  z-40">
     <IoMdClose onClick={() => setShowUploadDocument(false)} className='absolute top-[41%] left-[61%] text-[20px] font-[800]' />
     <div className="bg-white rounded-lg p-5 w-100 h-[200px]">

      <div className="mt-4 flex justify-end flex-col gap-5">
       <p className='font-[600] text-[20px] text-green-500'>Please Upload CARPA Document</p>
       <UploadDocument setSelectedIncorporation={setSelectedIncorporation} selectedIncorporation={selectedIncorporation} setAnswers={props.setAnswers} answers={props.answers} setShowUploadDocument={setShowUploadDocument} showUploadDocument={showUploadDocument} isCARPADocument={true} />
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default OngoingIncorporation;
