"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import submitToDocSeal from '../docSeal/submitToDocSeal';
import { sendEmail } from "../sendEmail/sendEmail";
import { automateForm } from "../api/automate-form";
import { incorporationForm } from "../api/incorporation-form";
import Form_00 from "../pages/Form_00";
import Form_01 from "../pages/Form_01";
import Form_03 from "../pages/Form_03";
import Form_04 from "../pages/Form_04";
import Form_05 from "../pages/Form_05";
import Form_06 from "../pages/Form_06";
import Form_08 from "../pages/Form_08";
import Form_10 from "../pages/Form_10";
import Form_09 from "../pages/Form_09";
import Form_11 from "../pages/Form_11";
import Form_18 from "../pages/Form_18";
import Form_21 from "../pages/Form_21";
import Form_31 from "../pages/Form_31";
import Form_30 from "../pages/Form_30";
import Form_27 from "../pages/Form_27";
import Form_24 from "../pages/Form_24";
import Form_17 from "../pages/Form_17";
import Form_16 from "../pages/Form_16";
import Form_22 from "../pages/Form_22";
import Form_20 from "../pages/Form_20";
import Form_15 from "../pages/Form_15";
import Form_14 from "../pages/Form_14";
import Form_13 from "../pages/Form_13";
import Form_26 from "../pages/Form_26";
import Form_29 from "../pages/Form_29";
import Form_33 from "../pages/Form_33";
import Form_34 from "../pages/Form_34";
import Form_12 from "../pages/Form_12";
import Form_19 from "../pages/Form_19";
import Form_23 from "../pages/Form_23";
import Form_25 from "../pages/Form_25";
import Form_28 from "../pages/Form_28";
import Form_32 from "../pages/Form_32";
import OngoingIncorporation from '../pages/OngoingIncorporation';
import Form_35 from "../pages/Form_35";
import Form_36 from "../pages/Form_36";

interface Person {
  AmountContribution: number;
  Document: string;
}

interface Associates {
  Person: Person[];
}

interface Answers {
  Associates?: Associates;
}

const OnBoarding: React.FC = () => {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConstituentPartnerSelected, setIsConstituentPartnerSelected] = useState(0)
  const [isSelectedCorporation, setIsSelectedCorporation] = useState(0)
  const [isCost, setIsCost] = useState(0)
  const [isCorporationSelected, setIsCorporationSelected] = useState(0)
  const [isOtherBenificialSelected, setIsOtherBenificialSelected] = useState(0)
  const [isAgainBenificialSelected, setIsAgainBenificialSelected] = useState(0)
  const [isPriorityInterestSelected, setIsPrioritySelected] = useState(0)
  const [isGpCatchUpSelected, setIsGpCatchUpSelected] = useState(0)
  const [isCarriedSelected, setIsCarriedSelected] = useState(0)
  const [isConstituentSelected, setIsConstituentSelected] = useState(0)
  const [isCorporationBenificialSelected, setIsCorporationBenificialSelected] = useState(0)
  const [isAvailableHeadQuarter, setIsAvailableHeadQuarter] = useState(0)
  const [isDownloadLeaseSelected, setIsDownloadSelected] = useState(0)
  const [backButtonFunctionality, setBackButtonFunctionality] = useState<number[]>([0]);
  const [isQuestionaryCompleted, setIsQuestionaryCompleted] = useState(false)
  const [active, setActive] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isSignCompleted, setIsSignCompleted] = useState(false)
  const [handleOpenIncorporation, setHandleOpenIncorporation] = useState(false)
  const [ongoingIncorporation, setOngoingIncorporation] = useState(false)
  const idForQuestionaryAndIncorporation = generateRandomValue(8).toUpperCase()
  const [answers, setAnswers] = useState<Partial<any>>({
    isSingle: true,
    portfolioConstructionType: null,
    target: 0,
    wallet: {},
    shape: null,
    isPersonal: false,
    VehicleType: "",
    CompanyDetails: {},
    ConstituentPartner: {
      Person: [{}],
      PersonalDetails: {},
      Document: "",
      Company: {
        CompanyDetail: {},
        RepresentativeDetails: {},
        EffectiveBeneficiaries: []
      }
    },
    Associates: {
      Person: [],
      Company: {
        CompanyDetail: {},
        RepresentativeDetails: {},
        EffectiveBeneficiaries: [

        ],
        ConstituentPartner: {
          Person: {
            PersonalDetails: {},
            Document: ""
          },
          Company: {
            CompanyDetail: {},
            RepresentativeDetails: {},
            EffectiveBeneficiaries: [
              {}
            ]
          }
        }
      }
    },
    Management: {
      Person: {
        PersonalDetails: {},
        FatherMotherDetails: {},
        Document: ""
      },
      Company: {
        CompanyDetail: {},
        LegalRepresentative: {},
        Document: ""
      }
    },
    ManagementFees: {},
    PerformanceFees: {},
    email: "",
    selectPersons: [],
    questionaryId: idForQuestionaryAndIncorporation,
    fatherAndMotherList: [],
    isSignDone: isSignCompleted,
    ongoingIncorporationData: {
      "incorporation": idForQuestionaryAndIncorporation,
      "Mail": {
        "Not Send": true,
        "send": false,
      },
      "Publication": {
        "Not Done": false,
        "Published": false
      },
      "BankAccount": {
        "mailToCarpaNotSend": false,
        "mailSend": false,
        "responseReceive/uploadIBAN": false,
        "IBANsendToClient": false,
        "sendEmail (In case the money has not been sent)": false,
        "clientSendMoney": false
      },
      "Documentation": {
        "Not Started": true,
        "signed": false,
        "signedBothParty": false,
        "complete": false
      },
      "Incorporation": {
        "Not Started": true,
        "completed": false,
        "paid": false,
        "submitted": false,
        "response": false
      }
    },
  });
  const [OngoingIncorporationDataList, setOngoingIncorporationDataList] = useState([])
  const [documentUrl, setDocumentUrl] = useState("")
  const [additionalDocumentURL, setAdditionalDocumentURL] = useState("")

  const [finalData, setFinalData] = useState({
    questionAnswers: [],
    incorporationData: []
  })

  function formatDate(inputDateString: any) {
    const dateObject = new Date(inputDateString);
    const year = dateObject?.getFullYear();
    const month = dateObject?.getMonth() + 1;
    const day = dateObject?.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  }

  function getFormattedDate() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return formattedDate;
  }

  function retrieveDataFromToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      const [tokenValue, encodedData] = token.split('.');
      const decodedData = atob(encodedData);
      const objectData = JSON.parse(decodedData);
      return objectData;
    } else {
      return null;
    }
  }

  useEffect(() => {
    const tokenData = retrieveDataFromToken()
    console.log("tokenData", tokenData)
    if (tokenData) {
      setAnswers({ ...tokenData, isSignDone: true })
      setIsSignCompleted(true)
    }
  }, [])

  function generateRandomValue(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  console.log("answers", answers)

  // ======================================================================================================


  const corporationBeneficiarySchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    HoldingPercentage: yup.string().required("Holding Percentage is required"),
  })

  const { register: corporationBeneficiaryRegister,
    handleSubmit: corporationBeneficiaryHandleSubmit,
    reset: resetCorporationBeneficiary,
    formState: { errors: corporationBeneficiaryErrors }
  } = useForm({
    resolver: yupResolver(corporationBeneficiarySchema)
  })

  const constituentBeneficiarySchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    HoldingPercentage: yup.string().required("Holding Percentage is required"),
  })

  const { register: constituentBeneficiaryRegister,
    handleSubmit: constituentBeneficiaryHandleSubmit,
    reset: resetconstituentBeneficiary,
    formState: { errors: constituentBeneficiaryErrors }
  } = useForm({
    resolver: yupResolver(constituentBeneficiarySchema)
  })

  // ========================================================================================================

  function generateToken(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  let token = generateToken(10) + '.' + btoa(JSON.stringify(answers));
  let signingURL = `https://overlord-admin.vercel.app/onboarding?token=${token}`;

  const templateData = {
    "template_id": "25200",
    "send_email": true,
    "completed_redirect_url": signingURL,
    "submission": {
      "submitters": [
        {
          "role": "First Party",
          "email": answers?.email,
          "values": {
            "name_entity": `${answers?.shape || "No Data"}`,
            "type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"}`,
            "address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,

            "type_of_share": `${answers?.PerformanceFees?.Carried == "no" ? "PARTS ORDINAIRES" : "PARTS A SOUSCRITES"}`,
            "name_of_investor": `${answers?.ConstituentPartner?.PersonalDetails?.FirstName || answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName || "No Data"}`,
            "amount_share": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"}`,
            "total_amount": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"}`,
            "total_amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"}`,
            "amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"}`,

            "president_name_01": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representation": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,
            "provision_name": `Monsieur Gaspard de Monclin`,
            "name_of_entity": `${answers?.companyName || "No Data"
              }`,
            "legal_type_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "name_of_signature_entity": `Gaspard de Monclin`,


            "pouvoir_name_entity": `${answers?.companyName || "No Data"} `,
            "pouvoir_legal_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "pouvoir_address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,
            "legal_representative_entity": `Gaspard de Monclin`,
            "pouvoir_date": getFormattedDate(),
            "president_name_02": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representative_president": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,

            "president_name_03": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"} `,
            "president_nationality": `${answers?.Management?.Person?.PersonalDetails?.Nationality || "No Data"} `,
            "president_dob": `${formatDate(answers?.Management?.Person?.PersonalDetails?.DateOfBirth) || "No Data"} `,
            "presiden_birth_place": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfBirth || "No Data"} `,
            "president_address": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfResident || "No Data"} `,
            "president_father_name": `${answers?.Management?.Person?.FatherMotherDetails?.FatherName || "No Data"} `,
            "father_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.FatherDateOfBirth) || "No Data"} `,
            "father_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.FatherPlaceOfBirth || "No Data"} `,
            "president_mother_name": `${answers?.Management?.Person?.FatherMotherDetails?.MaidenName || "No Data"} `,
            "mother_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.MotherPlaceOfBirth || "No Data"} `,
            "mother_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.MotherDateOfBirth) || "No Data"} `,

            "name_of_declaration_entity": `${answers?.companyName || "No Data"} `,
            "type_of_declaration_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "address_of_declaration_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,

            "publicationDate": getFormattedDate(),
            "declaration_date": getFormattedDate(),
            "template_02_date": getFormattedDate(),
          },
        }
      ]
    }
  }

  const templateDataWithCorporation = {
    "template_id": "51453",
    "send_email": true,
    "completed_redirect_url": signingURL,
    "submission": {
      "submitters": [
        {
          "role": "First Party",
          "email": answers?.email,
          "values": {
            "name_entity": `${answers?.shape || "No Data"} `,
            "type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"} `,
            "address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,

            "type_of_share": `${answers?.PerformanceFees?.Carried == "no" ? "PARTS ORDINAIRES" : "PARTS A SOUSCRITES"} `,
            "name_of_investor": `${answers?.ConstituentPartner?.PersonalDetails?.FirstName || answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName || "No Data"} `,
            "amount_share": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"} `,
            "total_amount": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"} `,
            "total_amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"} `,
            "amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || "No Data"} `,

            "president_name_01": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representation": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,
            "provision_name": `Monsieur Gaspard de Monclin`,
            "name_of_entity": `${answers?.companyName || "No Data"} `,
            "legal_type_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "name_of_signature_entity": `Gaspard de Monclin`,

            "pouvoir_name_entity": `${answers?.companyName || "No Data"} `,
            "pouvoir_legal_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "pouvoir_address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,
            "legal_representative_entity": `Gaspard de Monclin`,
            "pouvoir_date": getFormattedDate(),
            "president_name_02": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representative_president": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,

            "publicationDate": getFormattedDate(),
            "template_02_date": getFormattedDate(),
          },
        }
      ]
    }
  }

  const templateDataWithCarriedWithFamilyDetail = {
    "template_id": "51063",
    "send_email": true,
    "completed_redirect_url": signingURL,
    "submission": {
      "submitters": [
        {
          "role": "First Party",
          "email": answers?.email,
          "values": {
            "name_entity": `${answers?.shape || "No Data"} `,
            "type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"} `,
            "address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,

            // "type_of_share": `${ answers?.PerformanceFees?.Carried == "no" ? "PARTS ORDINAIRES" : "PARTS A SOUSCRITES" } `,
            "name_of_investor": `${answers?.ConstituentPartner?.PersonalDetails?.FirstName || answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName || "No Data"} `,
            "amount_share_01": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partA} `,
            "amount_share_02": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partB}}`,
            "total_amount_01": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partA} `,
            "total_amount_02": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partB}}`,
            "total_amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0} `,
            "amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0} `,

            "president_name_01": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representation": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,
            "provision_name": `Monsieur Gaspard de Monclin`,
            "name_of_entity": `${answers?.companyName || "No Data"} `,
            "legal_type_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "name_of_signature_entity": `Gaspard de Monclin`,

            "pouvoir_name_entity": `${answers?.companyName || "No Data"} `,
            "pouvoir_legal_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "pouvoir_address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,
            "legal_representative_entity": `Gaspard de Monclin`,
            "pouvoir_date": getFormattedDate(),
            "president_name_02": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"}`,
            "legal_representative_president": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"}`,

            "president_name_03": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"} `,
            "president_nationality": `${answers?.Management?.Person?.PersonalDetails?.Nationality || "No Data"} `,
            "president_dob": `${formatDate(answers?.Management?.Person?.PersonalDetails?.DateOfBirth) || "No Data"} `,
            "presiden_birth_place": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfBirth || "No Data"} `,
            "president_address": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfResident || "No Data"} `,
            "president_father_name": `${answers?.Management?.Person?.FatherMotherDetails?.FatherName || "No Data"} `,
            "father_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.FatherDateOfBirth) || "No Data"} `,
            "father_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.FatherPlaceOfBirth || "No Data"} `,
            "president_mother_name": `${answers?.Management?.Person?.FatherMotherDetails?.MaidenName || "No Data"} `,
            "mother_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.MotherPlaceOfBirth || "No Data"} `,
            "mother_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.MotherDateOfBirth) || "No Data"} `,

            "name_of_declaration_entity": `${answers?.companyName || "No Data"} `,
            "type_of_declaration_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "address_of_declaration_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,

            // "publicationDate": getFormattedDate(),
            "declaration_date": getFormattedDate(),
            "template_02_date": getFormattedDate(),
          },
        }
      ]
    }
  }

  const templateDataWithCarriedWithoutFamilyDetail = {
    "template_id": "51418",
    "send_email": true,
    "completed_redirect_url": signingURL,
    "submission": {
      "submitters": [
        {
          "role": "First Party",
          "email": answers?.email,
          "values": {
            "name_entity": `${answers?.shape || "No Data"} `,
            "type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"} `,
            "address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry-Sur-Seine, 94200, France"}`,

            // "type_of_share": `${ answers?.PerformanceFees?.Carried == "no" ? "PARTS ORDINAIRES" : "PARTS A SOUSCRITES" } `,
            "name_of_investor": `${answers?.ConstituentPartner?.PersonalDetails?.FirstName || answers?.ConstituentPartner?.Company?.CompanyDetail?.CompanyName || "No Data"
              } `,
            "amount_share_01": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partA} `,
            "amount_share_02": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partB}}`,
            "total_amount_01": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partA} `,
            "total_amount_02": `${calculatePartsAmounts(answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0, answers?.PerformanceFees?.ManagerPercentage || 0, answers?.PerformanceFees?.InvestorPercentage || 0).partB}}`,
            "total_amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0} `,
            "amount_capital": `${answers?.ConstituentPartner?.PersonalDetails?.AmountContribution || answers?.ConstituentPartner?.Company?.RepresentativeDetails?.AmountContribution || 0} `,

            "president_name_01": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"} `,
            "legal_representation": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"} `,
            "provision_name": `Monsieur Gaspard de Monclin`,
            "name_of_entity": `${answers?.companyName || "No Data"} `,
            "legal_type_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "name_of_signature_entity": `Gaspard de Monclin`,

            "pouvoir_name_entity": `${answers?.companyName || "No Data"} `,
            "pouvoir_legal_entity": `${answers?.shape == "Joint stock company" ? "société par action simplifiée" : "Société civile"} `,
            "pouvoir_address_entity": `${answers?.Headquarter || "32 A Avenue Pierre Semard, Ivry- Sur-Seine, 94200, France"} `,
            "legal_representative_entity": `Gaspard de Monclin`,
            "pouvoir_date": getFormattedDate(),
            "president_name_02": `${answers?.Management?.Company?.CompanyDetail?.Name || answers?.companyName || "No Data"} `,
            "legal_representative_president": `${answers?.Management?.Person?.PersonalDetails?.FirstName || answers?.Management?.Company?.LegalRepresentative?.Name || "No Data"} `,

            "publicationDate": getFormattedDate(),
            "template_02_date": getFormattedDate(),
          },
        }
      ]
    }
  }

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionOpen = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };

  const handleActive = (number: any) => {
    setActive(number);
  };

  const handleQuestions = (isNext: any, valueJump: any) => {
    if (isNext) {
      setActiveQuestion(activeQuestion + (valueJump ? valueJump : 1));
      setBackButtonFunctionality([...backButtonFunctionality, activeQuestion])
    } else {
      if (backButtonFunctionality.length > 0) {
        const previousPage = backButtonFunctionality.pop();
        if (previousPage) {
          setActiveQuestion(previousPage);
        }

      }
    }
  };

  const handleIsSingle = (value: any) => {
    setAnswers({
      ...answers,
      isSingle: value,
      portfolioConstructionType: value ? null : "",
    });
  };

  const handleIsPersonal = (value: any) => {
    setAnswers({
      ...answers,
      isPersonal: value,
    });
  };

  const handleShape = (value: any) => {
    setAnswers({
      ...answers,
      shape: value,
    });
  };

  const associateDocumentPersonSchema = yup.object().shape({
    Document: yup.mixed().test("fileSize", "Please Upload the document", (value: any) => {
      if (value.length) return true
    }),
    AmountContribution: yup.string().required("Amount Contribution is required"),
  })

  const { register: associateDocumentPersonRegister,
    handleSubmit: associateDocumentPersonHandleSubmit,
    reset: resetassociateDocumentPerson,
    formState: { errors: associateDocumentPersonErrors }
  } = useForm({
    resolver: yupResolver(associateDocumentPersonSchema)
  })

  const associateDocumentPersonOnSubmit = (data: { AmountContribution: number; Document: string }, answers: Answers) => {
    if (answers?.Associates?.Person && answers.Associates.Person.length > 0) {
      const lastElementOfArray = answers.Associates.Person.length - 1;
      const newArray = [...answers.Associates.Person];
      newArray[lastElementOfArray] = {
        ...newArray[lastElementOfArray],
        AmountContribution: data?.AmountContribution,
        Document: data?.Document
      };
      setAnswers({
        ...answers,
        Associates: {
          ...answers?.Associates,
          Person: newArray
        }
      })
      console.log("newArray", newArray);
      handleQuestions(true, ""); // Ensure handleQuestions is defined somewhere
    } else {
      console.error("Associates.Person array is empty or not present");
    }
  };

  async function main() {
    const dataToMail = { email: answers?.email, clientName: "Dear Client" };
    try {
      const response = await sendEmail(dataToMail);
      if (response?.status === "success") {
        alert("Email sent successfully")
      } else {
        alert("Error sending email")
      }
    } catch (error) {
      console.error("Error sending email:", error); `   `
    }
  }

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    return day + month + year;
  }

  function formatDateIncorporation(dateString: any) {
    const [day, month, year] = dateString?.match(/\d+/g) || [];
    const date = new Date(`${month} /${day}/${year} `);

    const formattedDay = date?.getDate().toString().padStart(2, '0');
    const formattedMonth = (date?.getMonth() + 1).toString().padStart(2, '0');
    const formattedYear = date?.getFullYear().toString();

    return formattedDay + formattedMonth + formattedYear;
  }

  const incorporationData = {
    form_01: {
      CompanyName: "New Company",
      MontantCapital: "5",
      CapitalMinimum: "5",
      BeneficialOwners: true,
    },

    form_02: {
      DateOfPublication: "31122024",
      PublicationSupport: "12 L'Hebdo",
    },

    form_03: {
      FirstName: "Adnold",
      LastName: "Whillium",
      Gender: "male",
      DateOfBirth: getCurrentDate(),
      PlaceOfBirth: "75001 Paris",
      Telephone: "1234567890",
      Village: "Village Name",
      Track: "Track Name",
      Country: "FRANCE",
      NativeCountry: "FRANCE",

      Nationality: "Française",
      Address: "4 RUE Lamblardie 75012 Paris",
    },

    form_04: {
      Country: "",
      Address: "4 RUE Lamblardie 75012 Paris",
    },

    form_05: {
      FirstName: "Maxwel",
      BirthName: "Trapezium",
      Gender: "male",
      DateOfBirth: formatDateIncorporation("11-10-1999"),
      Village: "Village Name",
      Track: "Track Name",
      Country: "FRANCE",
      NativeCountry: "FRANCE",
      Nationality: "Française",
      Address: "4 RUE Lamblardie 75012 Paris",
      PlaceOfBirth: "75001 Paris",
    },

    form_07: {
      doc_01: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_02: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_03: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_04: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_05: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_06: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_07: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      doc_08: "https://res.cloudinary.com/ddrvpin2u/image/upload/v1708441047/overlord/q5wkesbufgaadtny4xtb.pdf",
      room_type: "Copie du passeport en cours de validité"
    },
  }

  const publicationData = {
    form_01: {},
    form_02: {},
  }

  // const updatePublicationStatus = () => {
  //   setOngoingIncorporationData((prevState: any) => {
  //     const updatedData = [...prevState];
  //     console.log("updatedData", updatedData)
  //     const lastIndex = updatedData.length - 1;
  //     const updatedLastElement = {
  //       ...updatedData[lastIndex],
  //       Publication: {
  //         ...updatedData[lastIndex].Publication,
  //         "Not Done": true,
  //         "Published": true,
  //       }
  //     };

  //     console.log("updatedLastElement", updatedLastElement)
  //     return [
  //       ...updatedData?.slice(0, lastIndex),
  //       updatedLastElement
  //     ];
  //   });
  // }

  // const updateIncorporationStatus = () => {
  //   setOngoingIncorporationData((prevState: any) => {
  //     const updatedData = [...prevState];
  //     console.log("updatedData", updatedData)
  //     const lastIndex = updatedData.length - 1;
  //     const updatedLastElement = {
  //       ...updatedData[lastIndex],
  //       Incorporation: {
  //         ...updatedData[lastIndex].Incorporation,
  //         "Not Started": true,
  //         "completed": true,
  //         "paid": false,
  //         "submitted": false,
  //         "response": false
  //       }
  //     };
  //     return [
  //       ...updatedData?.slice(0, lastIndex),
  //       updatedLastElement
  //     ];
  //   });
  // }

  console.log("isQuestionOpen", isQuestionOpen)

  function calculatePartsAmounts(totalContribution: any, managerPercentage: any, investorPercentage: any) {
    const managerDecimal = managerPercentage / 100;
    const investorDecimal = investorPercentage / 100;

    const partA = totalContribution * investorDecimal;
    const partB = totalContribution * managerDecimal;

    const roundedPartA = Math.round(partA * 100) / 100;
    const roundedPartB = Math.round(partB * 100) / 100;

    return { partA: roundedPartA, partB: roundedPartB };
  }

  console.log("answers", answers)

  return (
    <div className="relative" >
      {
        handleOpenIncorporation ? (
          <div className="absolute h-screen w-full bg-[#00000060] flex items-center justify-center">

            <div className="relative bg-[#f6f2ee] p-[80px] rounded-[10px]">
              <IoMdClose onClick={() => { setHandleOpenIncorporation(false); setOngoingIncorporation(false) }} className="absolute top-5 right-5 text-[30px] pointer cursor-pointer" />
              <div className="flex gap-10">
                <button
                  onClick={() => {
                    setOngoingIncorporation(true)
                    setHandleOpenIncorporation(false);
                  }}
                  className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px] text-nowrap px-5"
                >
                  Ongoing Incorporation
                </button>
                <button
                  onClick={() => {
                    // updateIncorporationStatus()
                    // incorporationForm(incorporationData)
                    //   .then(() => {
                    //     console.log('Form automation completed successfully!');
                    //   })
                    //   .catch(error => {
                    //     console.error('Error automating form:', error);
                    //   });

                    handleQuestionOpen()
                    setHandleOpenIncorporation(false);

                  }}
                  className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px] text-nowrap px-5"
                >
                  New Incorporation
                </button>
              </div>

            </div>
          </div>
        ) : ""
      }

      {
        ongoingIncorporation ? (
          <>
            <div className="absolute top-6 right-10 border w-[95vw] h-[95vh] bg-[#F6F2EE]   rounded-[10px]">
              <IoMdClose onClick={() => { setHandleOpenIncorporation(false); setOngoingIncorporation(false) }} className="absolute top-5 right-5 text-[30px] pointer cursor-pointer" />
              <OngoingIncorporation setAnswers={setAnswers} answers={answers} sendMail={main} setOngoingIncorporationDataList={setOngoingIncorporationDataList} OngoingIncorporationDataList={OngoingIncorporationDataList} />
            </div>
          </>
        ) : ""
      }
      <div className={isQuestionOpen ? "blur-sm" : ""}>
        <div className="flex w-full">
          <div className="w-1/2 bg-[#F6F2EE]">
            <div className="w-full h-[80px] p-[24px_32px]">
              <Image src={"/logo.png"} alt={"logo"} height={32} width={220} />
            </div>
            <div className="flex h-[calc(100vh-160px)] items-center">
              <div className="px-[84.5px] ">
                <p className="font-campton text-[48px] font-[600] text-[#315B3F]">
                  Hello, Admin
                </p>
                <p className="font-campton text-[32px] font-[600] text-[#315B3F]">
                  Here you can add new vehicle
                </p>
              </div>
            </div>
            <div className="w-full h-[80px] text-center px-[100px]">
              <p className="text-[16px] font-[300] text-[#676664]">
                Overlord est une plateforme perspiciatis unde omnis iste natus
                error sit voluptatem omnis iste perspiciatis.
              </p>
            </div>
          </div>
          <div className="w-1/2  bg-white">
            <div className="mt-[80px] flex items-start justify-center">
              <div className="flex flex-col gap-[20px] w-[559px]">
                <div className="p-[16px] rounded-[8px] bg-[#F9F6F4]">
                  <div className="flex justify-between pb-[8px]">
                    <p className="text-[20px] font-[500]">Subscription</p>
                    <p className="h-[32px] w-[32px] bg-[white] rounded-full flex justify-center items-center">
                      1
                    </p>
                  </div>
                  <div className="">
                    <p className="pb-[20px] text-[14px] font-[300] text-[#878583]">
                      Embark on your journey by engaging with our Questionnaire. Simply click the button below to begin. We're excited to hear from you!
                    </p>
                    <button
                      disabled={isSignCompleted}
                      onClick={handleQuestionOpen}
                      className="w-full rounded-[8px] bg-[#315B3F] text-white text-[16px] font-[500] py-[13px] mb-[4px] disabled:bg-[lightgray]"
                    >
                      Respond to Questionnaire
                    </button>
                    <p className="text-[#315B3F] text-[16px] font-[500]">
                      <span className="text-[lightgray]">Or </span>
                      use an existing Profile
                    </p>
                  </div>
                </div>
                <div className="p-[16px] rounded-[8px] bg-[#F9F6F4]">
                  <div className="flex justify-between pb-[8px]">
                    <p className="text-[20px] font-[500]">
                      Signature of the documents:
                    </p>
                    <p className="h-[32px] w-[32px] bg-[white] rounded-full flex justify-center items-center">
                      2
                    </p>
                  </div>
                  <div className="">
                    <p className="pb-[20px] text-[14px] font-[300] text-[#878583]">
                      To finalize the documentation process efficiently, kindly use the button provided below to electronically sign your documents. This e-signature step is a convenient and secure way to complete the required formalities swiftly.
                    </p>
                    {/* <button
                      onClick={async () => {
                        setIsSignCompleted(true)
                        setAnswers(prevAnswers => ({
                          ...prevAnswers,
                          isSignDone: isSignCompleted
                        }));

                        const isDefined = !!answers?.Management?.Company?.CompanyDetail?.CompanyName;
                        const isCarried = answers?.PerformanceFees?.Carried === "yes"

                        let DocSealData;
                        // if (isDefined) {
                        //   DocSealData = await submitToDocSeal(templateDataWithCorporation);
                        // } else {
                        //   DocSealData = await submitToDocSeal(templateData);
                        // }

                        token = generateToken(10) + '.' + btoa(JSON.stringify(answers));
                        signingURL = `https://overlord-admin.vercel.app/onboarding?token=${token}`;

                        if (isDefined && isCarried) {
                          console.log(1)
                          DocSealData = await submitToDocSeal(templateDataWithCarriedWithoutFamilyDetail);
                        } else if (isDefined && !isCarried) {
                          console.log(2)
                          DocSealData = await submitToDocSeal(templateDataWithCorporation);
                        } else if (!isDefined && isCarried) {
                          console.log(3)
                          DocSealData = await submitToDocSeal(templateDataWithCarriedWithFamilyDetail);
                        } else if (!isDefined && !isCarried) {
                          console.log(4)
                          DocSealData = await submitToDocSeal(templateData);
                        }
                        setIsQuestionaryCompleted(false)
                        // const sendMailToBank = await sendEmailToJoinStockCompany({email: "overlord-admin-bank@yopmail.com", answers })
                        window.open(DocSealData?.submissionUrl);
                      }}
                      disabled={!isQuestionaryCompleted}
                      className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px]"
                    >
                      Sign
                    </button> */}
                    <div className="flex gap-5 mt-3">
                      {/* <button
                        // onClick={async () => {
                        //   try {
                        //     const response = await axios.post('/api/automate-form', publicationData);
                        //     console.log(response.data.message);
                        //   } catch (error) {
                        //     console.error('Error automating form:', error);
                        //   }
                        // }}

                        onClick={async () => {

                          setOngoingIncorporation(false)
                          automateForm(publicationData)
                            .then(() => {
                              console.log('Form automation completed successfully!');
                            })
                            .catch(error => {
                              console.error('Error automating form:', error);
                            });
                        }}
                        // disabled={!isQuestionaryCompleted}
                        disabled={!isSignCompleted}
                        className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px]"
                      >
                        Publication
                      </button> */}
                      <button
                        // onClick={async () => {
                        //   try {
                        //     const response = await axios.post('/api/incorporation-form', incorporationData);
                        //     console.log(response.data.message);
                        //   } catch (error) {
                        //     console.error('Error automating form:', error);
                        //   }
                        // }}
                        // =================================
                        // onClick={async () => {
                        //   incorporationForm(incorporationData)
                        //     .then(() => {
                        //       console.log('Form automation completed successfully!');
                        //     })
                        //     .catch(error => {
                        //       console.error('Error automating form:', error);
                        //     });
                        // }}

                        // disabled={!isQuestionaryCompleted}
                        onClick={() => { setHandleOpenIncorporation(!handleOpenIncorporation); setOngoingIncorporation(false) }}
                        className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px]"
                      >
                        Incorporation
                      </button>
                    </div>
                  </div >
                </div >
                <p className="text-[#315B3F] text-[16px] font-[500]">
                  <span className="text-[#122117]"> A question? </span>
                  Here is our FAQ
                </p>
              </div >
            </div >
          </div >
        </div >
      </div >
      {
        isQuestionOpen ? (
          <div className={`absolute h-full w-full top-0 left-0 bg-transparant ${activeQuestion === 11 ? "mt-[100px]" : ""} `} >
            <div className="flex justify-center items-start my-[100px] h-screen">
              <div className=" bg-[white] max-w-[650px] w-[600px] shadow-lg rounded-[20px] p-[30px]">
                <div className="flex justify-between items-center mt-5">
                  {activeQuestion > 0 ? (
                    <button
                      onClick={() => {
                        handleQuestions(false, null);
                      }}
                      type="button"
                      className="text-black border p-[5px_20px] rounded-[5px]"
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <div onClick={handleQuestionOpen} className="cursor-pointer" >
                    <IoMdClose size={25} />
                  </div>
                </div>
                {
                  {
                    0: (
                      <Form_00 handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} />
                    ),
                    1: (
                      <Form_01 handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} handleIsSingle={handleIsSingle} />
                    ),
                    2: (
                      ""
                    ),
                    3: (
                      <Form_03 handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} />
                    ),
                    4: (
                      <Form_04 isPopupVisible={isPopupVisible} setIsQuestionOpen={setIsQuestionOpen} closePopup={closePopup} handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} handleShape={handleShape} openPopup={openPopup} />
                    ),
                    5: (
                      <Form_05 isSelectedCorporation={isSelectedCorporation} setIsSelectedCorporation={setIsSelectedCorporation} handleQuestions={handleQuestions} />
                    ),
                    6: (
                      <Form_06 handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} handleIsSingle={handleIsSingle} />
                    ),
                    7: (""),
                    8: (
                      <Form_08 isConstituentPartnerSelected={isConstituentPartnerSelected} handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} setIsConstituentPartnerSelected={setIsConstituentPartnerSelected} />
                    ),
                    9: (
                      < Form_09 isCorporationSelected={isCorporationSelected} setIsCorporationSelected={setIsCorporationSelected} handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} />
                    ),
                    10: (
                      < Form_10 handleQuestions={handleQuestions} setAnswers={setAnswers} answers={answers} isCorporationSelected={isCorporationSelected} />
                    ),
                    11: (
                      < Form_11 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    12: (
                      < Form_12 documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    13: (
                      < Form_13 setIsCost={setIsCost} isCost={isCost} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    14: (
                      < Form_14 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    15: (
                      < Form_15 isCarriedSelected={isCarriedSelected} setIsCarriedSelected={setIsCarriedSelected} isGpCatchUpSelected={isGpCatchUpSelected} setIsGpCatchUpSelected={setIsGpCatchUpSelected} isPriorityInterestSelected={isPriorityInterestSelected} setIsPrioritySelected={setIsPrioritySelected} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    16: (
                      < Form_16 setOngoingIncorporationDataList={setOngoingIncorporationDataList} OngoingIncorporationDataList={OngoingIncorporationDataList} setBackButtonFunctionality={setBackButtonFunctionality} main={main} setIsQuestionOpen={setIsQuestionOpen} setActiveQuestion={setActiveQuestion} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} setIsQuestionaryCompleted={setIsQuestionaryCompleted} />
                    ),
                    17: (
                      < Form_17 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    18: (
                      < Form_18 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    19: (
                      < Form_19 documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    20: (
                      < Form_20 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    21: (
                      < Form_21 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    22: (
                      < Form_22 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    23: (
                      < Form_23 setAdditionalDocumentURL={setAdditionalDocumentURL} additionalDocumentURL={additionalDocumentURL} resetCorporationBeneficiary={resetCorporationBeneficiary} isOtherBenificialSelected={isOtherBenificialSelected} setIsOtherBenificialSelected={setIsOtherBenificialSelected} documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    24: (
                      < Form_24 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    25: (
                      < Form_25 additionalDocumentURL={additionalDocumentURL} setAdditionalDocumentURL={setAdditionalDocumentURL} isAgainBenificialSelected={isAgainBenificialSelected} setIsAgainBenificialSelected={setIsAgainBenificialSelected} documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    26: (
                      < Form_26 isConstituentSelected={isConstituentSelected} setIsConstituentSelected={setIsConstituentSelected} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    27: (
                      < Form_27 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    28: (
                      < Form_28 isAgainBenificialSelected={isAgainBenificialSelected} setIsAgainBenificialSelected={setIsAgainBenificialSelected} documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    29: (
                      < Form_29 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    30: (
                      < Form_30 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    31: (
                      < Form_31 setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    32: (
                      < Form_32 additionalDocumentURL={additionalDocumentURL} setAdditionalDocumentURL={setAdditionalDocumentURL} resetconstituentBeneficiary={resetconstituentBeneficiary} isCorporationBenificialSelected={isCorporationBenificialSelected} setIsCorporationBenificialSelected={setIsCorporationBenificialSelected} isAgainBenificialSelected={isAgainBenificialSelected} setIsAgainBenificialSelected={setIsAgainBenificialSelected} documentUrl={documentUrl} setDocumentUrl={setDocumentUrl} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    33: (
                      < Form_33 isAvailableHeadQuarter={isAvailableHeadQuarter} setIsAvailableHeadQuarter={setIsAvailableHeadQuarter} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} />
                    ),
                    34: (
                      < Form_34 isDownloadLeaseSelected={isDownloadLeaseSelected} setIsDownloadSelected={setIsDownloadSelected} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} setActiveQuestion={setActiveQuestion} />
                    ),
                    35: (
                      < Form_35 isDownloadLeaseSelected={isDownloadLeaseSelected} setIsDownloadSelected={setIsDownloadSelected} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} setActiveQuestion={setActiveQuestion} />
                    ),
                    36: (
                      < Form_36 isDownloadLeaseSelected={isDownloadLeaseSelected} setIsDownloadSelected={setIsDownloadSelected} setAnswers={setAnswers} answers={answers} handleQuestions={handleQuestions} setActiveQuestion={setActiveQuestion} />
                    )
                  }[activeQuestion]
                }
              </div>
            </div>
          </div >
        ) : (
          <></>
        )
      }
    </div >
  );
};

export default OnBoarding;
