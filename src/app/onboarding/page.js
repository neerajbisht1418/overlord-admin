"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import submitToDocSeal from '../docSeal/submitToDocSeal';
import { sendEmail } from "../sendEmail/sendEmail";
import { sendEmailToJoinStockCompany } from "../sendEmail/sendEmailToJoinStockCompany";
import UploadDocument from "../uploadDocument/uploadDocument";
import { IoIosInformationCircle } from "react-icons/io";
import axios from "axios"
import { automateForm } from "../api/automate-form";
import { automateFormTwo } from "../api/automate-form2";

const OnBoarding = () => {
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
  const [checkShapeSelected, setCheckShapeSelected] = useState(false)
  const [isAvailableHeadQuarter, setIsAvailableHeadQuarter] = useState(0)
  const [isDownloadLeaseSelected, setIsDownloadSelected] = useState(0)
  const [backButtonFunctionality, setBackButtonFunctionality] = useState([])
  const [isQuestionaryCompleted, setIsQuestionaryCompleted] = useState(false)
  const [active, setActive] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(16);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [answers, setAnswers] = useState({
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
    PerformanceFees: {}

  });
  const [documentUrl, setDocumentUrl] = useState("")

  console.log(documentUrl)


  function formatDate(inputDateString) {
    const dateObject = new Date(inputDateString);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  }


  const templateData = {
    "template_id": "25200",
    "send_email": true,
    "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
    "submission": {
      "submitters": [
        {
          "role": "First Party",
          "email": answers?.email,
          "values": {
            "name_entity": `${answers?.shape || "No Data"}`,
            "type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"}`,
            "address_entity": `${answers?.wallet?.headOffice || "No Data"}`,

            "type_of_share": "No type",
            "name_of_investor": "Alan Block Admon",
            "amount_share": "1,000",
            "total_amount": "10,000",
            "total_amount_capital": "999",
            "amount_capital": "88889",

            "president_name_01": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
            "legal_representation": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
            "provision_name": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "No Data"}`,
            "name_of_entity": `${answers?.shape || "No Data"}`,
            "legal_type_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"}`,
            "name_of_signature_entity": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
            "pouvoir_name_entity": `${answers?.shape || "No Data"}`,
            "pouvoir_legal_entity": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || "No Data"}`,
            "pouvoir_address_entity": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "No Data"}`,
            "legal_representative_entity": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "No Data"}`,
            "president_name_02": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
            "legal_representative_president": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,

            "president_name_03": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
            "president_nationality": `${answers?.Management?.Person?.PersonalDetails?.Nationality || "No Data"}`,
            "president_dob": `${formatDate(answers?.Management?.Person?.PersonalDetails?.DateOfBirth) || "No Data"}`,
            "presiden_birth_place": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfBirth || "No Data"}`,
            "president_address": `${answers?.Management?.Person?.PersonalDetails?.PlaceOfResident || "No Data"}`,
            "president_father_name": `${answers?.Management?.Person?.FatherMotherDetails?.FatherName || "No Data"}`,
            "father_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.FatherDateOfBirth) || "No Data"}`,
            "father_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.FatherPlaceOfBirth || "No Data"}`,
            "president_mother_name": `${answers?.Management?.Person?.FatherMotherDetails?.MotherName || "No Data"}`,
            "mother_birth_place": `${answers?.Management?.Person?.FatherMotherDetails?.MotherPlaceOfBirth || "No Data"}`,
            "mother_dob": `${formatDate(answers?.Management?.Person?.FatherMotherDetails?.MotherDateOfBirth) || "No Data"}`,

            "name_of_declaration_entity": `${answers?.shape || "No Data"}`,
            "type_of_declaration_entity": `${answers?.isSingle ? "Single Asset" : "Multi Asset" || "No Data"}`,
            "address_of_declaration_entity": `${answers?.wallet?.headOffice || "No Data"}`,
          },
        }
      ]
    }
  }

  console.log("answers", answers)

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

  const walletOnSubmit = (data) => {
    setAnswers({ ...answers, wallet: data });
    handleQuestions(true); // Use this data for further processing or API calls
  };


  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleQuestionOpen = () => {
    setIsQuestionOpen(!isQuestionOpen);
  };

  const handleActive = (number) => {
    setActive(number);
  };


  const handleQuestions = (isNext, valueJump) => {
    if (isNext) {
      setActiveQuestion(activeQuestion + (valueJump ? valueJump : 1));
      setBackButtonFunctionality([...backButtonFunctionality, activeQuestion])
    } else {
      if (backButtonFunctionality.length > 0) {
        const previousPage = backButtonFunctionality.pop();
        setActiveQuestion(previousPage);
      }
    }
  };

  const handleIsSingle = (value) => {
    setAnswers({
      ...answers,
      isSingle: value,
      portfolioConstructionType: value ? null : "",
    });
  };

  const handleIsPersonal = (value) => {
    setAnswers({
      ...answers,
      isPersonal: value,
    });
  };

  const handleShape = (value) => {

    setAnswers({
      ...answers,
      shape: value,
    });
  };


  const FatherMotherSchema = yup.object().shape({
    FatherName: yup.string().required("Father Name is required"),
    FatherFirstName: yup.string().required("Father First Name is required"),
    FatherDateOfBirth: yup.date().nullable().required("Father Date of birth is required"),
    FatherPlaceOfBirth: yup.string().required("Father Place of birth is required"),
    FatherPlaceOfResident: yup.string().required("Father Place of residence is required"),
    MotherName: yup.string().required("Mother Name is required"),
    MotherFirstName: yup.string().required("Mother First Name is required"),
    MotherDateOfBirth: yup.date().nullable().required("Mother Date of birth is required"),
    MotherPlaceOfBirth: yup.string().required("Mother Place of birth is required"),
    MotherPlaceOfResident: yup.string().required("Mother Place of residence is required"),
  })

  const {
    register: fatherMotherRegister,
    handleSubmit: fatherMotherHandleSubmit,
    reset: resetFatherMother,
    formState: { errors: fatherMotherErrors },
  } = useForm({
    resolver: yupResolver(FatherMotherSchema),
  })

  const fatherMotherOnSubmit = (data) => {
    console.log("fatherMotherOnSubmit", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Person: {
          ...answers?.Management?.Person, FatherMotherDetails: { ...data }
        }
      }
    });
    handleQuestions(true);
  }


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

  const corporationCompanyDetailOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Associates: {
        ...answers?.Associates, Company: {
          ...answers?.Associates?.Company, CompanyDetail: {
            ...data
          }
        }
      }
    })
    handleQuestions(true);
  }


  const corporationLegalRepresentationSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    AmountContribution: yup.string().required("Amount Contribution is required"),

  })

  const { register: corporationLegalRepresentationRegister,
    handleSubmit: corporationLegalRepresentationHandleSubmit,
    reset: resetcorporationLegalRepresentation,
    formState: { errors: corporationLegalRepresentationErrors }
  } = useForm({
    resolver: yupResolver(corporationLegalRepresentationSchema)
  })


  const corporationLegalRepresentationOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Associates: {
        ...answers?.Associates, Company: {
          ...answers?.Associates?.Company, RepresentativeDetails
            : {
            ...data
          }
        }
      }
    })
    handleQuestions(true);
  }


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

  const corporationBeneficiaryOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Associates: {
        ...answers?.Associates, Company: {
          ...answers?.Associates?.Company, EffectiveBeneficiaries
            : [
              ...answers?.Associates?.Company?.EffectiveBeneficiaries, { ...data }
            ]
        }
      }
    })
    handleQuestions(true);

  }


  const otherBenificialSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    HoldingPercentage: yup.string().required("Holding Percentage is required"),
  })

  const { register: otherBenificialRegister,
    handleSubmit: otherBenificialHandleSubmit,
    reset: resetOtherBenificial,
    formState: { errors: otherBenificialErrors }
  } = useForm({
    resolver: yupResolver(otherBenificialSchema)
  })

  const otherBenificialOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Associates: {
        ...answers?.Associates, Company: {
          ...answers?.Associates?.Company, EffectiveBeneficiaries
            : [
              ...answers?.Associates?.Company?.EffectiveBeneficiaries, { ...data }
            ]
        }
      }
    })
    handleQuestions(true);
    resetOtherBenificial()
  }


  const NaturalPersonSchema = yup.object().shape({
    NaturalPerson: yup.object().shape({
      FirstName: yup.string().required("First Name is required"),
      Name: yup.string().required("Name is required"),
      DateOfBirth: yup.date().nullable().required("Date of birth is required"),
      PlaceOfBirth: yup.string().required("Place of birth is required"),
      PlaceOfResident: yup.string().required("Place of residence is required"),
    }),
  });


  const {
    register: naturalPersonRegister,
    handleSubmit: naturalPersonHandleSubmit,
    reset: resetNaturalPerson,
    formState: { errors: naturalPersonErrors },
  } = useForm({
    resolver: yupResolver(NaturalPersonSchema),
  })

  const naturalPersonOnSubmit = (data) => {
    console.log("naturalPersonOnSubmit", data);
    setAnswers({ ...answers, Associates: { ...answers?.Associates, Person: [...answers?.Associates?.Person, { NaturalPerson: { ...data?.NaturalPerson } }] } })
    handleQuestions(true, 2)
    resetNaturalPerson()
  }


  const PhysicalPersonSchema = yup.object().shape({
    Management: yup.object().shape({
      Person: yup.object().shape({
        PersonalDetails: yup.object().shape({
          FirstName: yup.string().required("First Name is required"),
          Name: yup.string().required("Name is required"),
          DateOfBirth: yup.date().nullable().required("Date of birth is required"),
          PlaceOfBirth: yup.string().required("Place of birth is required"),
          PlaceOfResident: yup.string().required("Place of residence is required"),
        }),
      }),
    }),
  });

  const {
    register: physicalPersonRegister,
    handleSubmit: physicalPersonHandleSubmit,
    formState: { errors: physicalPersonErrors },
    setValue: physicalPersonSetValue,
    reset: physicalPersonReset,
  } = useForm({
    resolver: yupResolver(PhysicalPersonSchema),
  })

  const physicalPersonOnSubmit = (data) => {
    // Handle form submission here
    console.log("data", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Person: {
          ...answers?.Management?.Person, PersonalDetails: { ...data?.Management?.Person?.PersonalDetails }
        }
      }
    });
    handleQuestions(true); // Use this data for further processing or API calls
  }


  const effectBeneficiaryDocumentSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    })
  })

  const { register: effectBeneficiaryDocumentRegister,
    handleSubmit: effectBeneficiaryDocumentHandleSubmit,
    reset: resetEffectBeneficiaryDocument,
    formState: { errors: effectBeneficiaryDocumentErrors }
  } = useForm({
    resolver: yupResolver(effectBeneficiaryDocumentSchema)
  })

  const effectBeneficiaryDocumentOnSubmit = (data) => {
    console.log("data", data);
    console.log("documentUrl", documentUrl);
    const currentEffectiveBeneficiaries = answers?.Associates?.Company?.EffectiveBeneficiaries || [];
    const updatedEffectiveBeneficiaries = [
      ...currentEffectiveBeneficiaries.slice(0, -1),
      {
        ...currentEffectiveBeneficiaries[currentEffectiveBeneficiaries.length - 1],
        Document: documentUrl,
      },
    ];
    setAnswers({
      ...answers,
      Associates: {
        ...answers?.Associates,
        Company: {
          ...answers?.Associates?.Company,
          EffectiveBeneficiaries: updatedEffectiveBeneficiaries,
        },
      },
    });

    isOtherBenificialSelected ? handleQuestions(true) : handleQuestions(true, -15);
    resetCorporationBeneficiary();
    setDocumentUrl("")
  }



  const corporationSchema = yup.object().shape({
    CompanyName: yup.string().required("Company Name is required"),
    Id: yup.string().required("Id Name is required"),
    HeadOffice: yup.string().required("Head Office is required"),
  })

  const {
    register: corporationRegister,
    handleSubmit: corporationHandleSubmit,

    formState: { errors: corporationErrors }
  } = useForm({
    resolver: yupResolver(corporationSchema)
  })

  const corporationOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, ConstituentPartner: {
        ...answers?.ConstituentPartner, Company: {
          ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...data }
        }
      }
    });
    handleQuestions(true);
  }


  const corporationLegalSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
    AmountContribution: yup.string().required("Amount Contribution is required"),

  })

  const { register: corporationLegalRegister,
    handleSubmit: corporationLegalHandleSubmit,
    reset: resetcorporationLegal,
    formState: { errors: corporationLegalErrors }
  } = useForm({
    resolver: yupResolver(corporationLegalSchema)
  })

  const corporationLegalOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, ConstituentPartner: {
        ...answers?.ConstituentPartner, Company: {
          ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...data }
        }
      }
    });
    handleQuestions(true);
  }


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

  const constituentBeneficiaryOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, ConstituentPartner: {
        ...answers?.ConstituentPartner, Company: {
          ...answers?.ConstituentPartner?.Company, EffectiveBeneficiaries: [...answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries, { ...data }]
        }
      }
    });
    handleQuestions(true);

  }


  const constituentDocumentSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    }),
  })

  const { register: constituentDocumentRegister,
    handleSubmit: constituentDocumentHandleSubmit,
    reset: resetconstituentDocument,
    formState: { errors: constituentDocumentErrors }
  } = useForm({
    resolver: yupResolver(constituentDocumentSchema)
  })

  const constituentDocumentOnSubmit = (data) => {
    console.log("documentUrl", documentUrl);
    const currentDocuments = answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries || [];
    const updatedDocuments = [
      ...currentDocuments.slice(0, -1),
      {
        ...currentDocuments[currentDocuments.length - 1],
        Document: documentUrl,
      },
    ];

    console.log("updatedDocuments", updatedDocuments)

    setAnswers({
      ...answers,
      ConstituentPartner: {
        ...answers?.ConstituentPartner, Company: {
          ...answers?.ConstituentPartner?.Company, EffectiveBeneficiaries: updatedDocuments,
        }

      },
    });

    isCorporationBenificialSelected ? handleQuestions(true, -1) : handleQuestions(true, -23);
    resetconstituentBeneficiary();
    setDocumentUrl("");
  };



  const portFolioSchema = yup.object().shape({
    target: yup.string().required("Target is required"),
  })

  const { register: portFolioRegister,
    handleSubmit: portFolioHandleSubmit,
    reset: resetPortFolio,
    formState: { errors: portFolioErrors }
  } = useForm({
    resolver: yupResolver(portFolioSchema)
  })

  const portFolioOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers,
      target: Number(data?.target),
    });
    handleQuestions(true);

  }


  const constituentPersonSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
  })

  const { register: constituentPersonRegister,
    handleSubmit: constituentPersonHandleSubmit,
    reset: resetconstituentPerson,
    formState: { errors: constituentPersonErrors }
  } = useForm({
    resolver: yupResolver(constituentPersonSchema)
  })

  const constituentPersonOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, ConstituentPartner: {
        ...answers.ConstituentPartner, PersonalDetails: { ...data }
      }
    });
    handleQuestions(true);
    // resetconstituentPerson()
  }


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

  const constituentDocumentPersonOnSubmit = (data) => {
    console.log("data", data);
    console.log("documentUrl", documentUrl)
    setAnswers({
      ...answers, ConstituentPartner: {
        ...answers?.ConstituentPartner, PersonalDetails: {
          ...answers?.ConstituentPartner?.PersonalDetails, Document: documentUrl, AmountContribution: data?.AmountContribution
        }
      }
    })
    setDocumentUrl("")
    handleQuestions(true, -19)
  }

  const admissionFeeSchema = yup.object().shape({
    Percentage: yup.string().required("Percentage is required"),
    Fixed: yup.string().required("Fixed is required"),

  })

  const { register: admissionFeeRegister,
    handleSubmit: admissionFeeHandleSubmit,
    reset: resetAdmissionFee,
    formState: { errors: admissionFeeErrors }
  } = useForm({
    resolver: yupResolver(admissionFeeSchema)
  })

  const admissionFeeOnSubmit = (data) => {
    console.log("admissionFeeOnSubmit", data);
    setAnswers({
      ...answers, ManagementFees: { ...data }
    })
    // setActiveQuestion(33)
    handleQuestions(true, 19);
  }


  const managementCorporationSchema = yup.object().shape({
    CompanyName: yup.string().required("CompanyName is required"),
    Id: yup.string().required("Id is required"),
    HeadOffice: yup.string().required("Head office is required"),
  })

  const { register: managementCorporationRegister,
    handleSubmit: managementCorporationHandleSubmit,
    reset: resetManagementCorporation,
    formState: { errors: managementCorporationFeeErrors }
  } = useForm({
    resolver: yupResolver(managementCorporationSchema)
  })

  const managementCorporationOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Company: {
          ...answers?.Management?.Company, CompanyDetail: { ...data }
        }
      }
    })
    // setActiveQuestion(18)
    handleQuestions(true);
  }


  const managementLegalSchema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    Name: yup.string().required("Name is required"),
    DateOfBirth: yup.date().nullable().required("Date of birth is required"),
    PlaceOfBirth: yup.string().required("Place of birth is required"),
    PlaceOfResident: yup.string().required("Place of residence is required"),
  })

  const { register: managementLegalRegister,
    handleSubmit: managementLegalHandleSubmit,
    reset: resetManagementLegal,
    formState: { errors: managementLegalErrors }
  } = useForm({
    resolver: yupResolver(managementLegalSchema)
  })

  const managementLegalOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Company: {
          ...answers?.Management?.Company, LegalRepresentative: { ...data }
        }
      }
    })
    handleQuestions(true);
  }


  const associateDocumentPersonSchema = yup.object().shape({
    Document: yup.mixed().test("fileSize", "Please Upload the document", (value) => {
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

  const associateDocumentPersonOnSubmit = (data) => {

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
          ...answers?.Associates, Person: newArray
        }
      })
      console.log("newArray", newArray);
      handleQuestions(true);
    } else {
      console.error("Associates.Person array is empty or not present");
    }
  };


  const commentSchema = yup.object().shape({
    Comment: yup.string().required(" Comment is required"),

  })

  const { register: commentRegister,
    handleSubmit: commentHandleSubmit,
    reset: resetComment,
    formState: { errors: commentErrors }
  } = useForm({
    resolver: yupResolver(commentSchema)
  })



  const commentOnSubmit = async (data) => {

    automateForm()
      .then(() => {
        console.log('Form automation completed successfully!');
        // Add any further handling here if needed
      })
      .catch(error => {
        console.error('Error automating form:', error);
        // Handle errors here
      });

    // automateFormTwo()
    //   .then(() => {
    //     console.log('Form automation completed successfully!');
    //     // Add any further handling here if needed
    //   })
    //   .catch(error => {
    //     console.error('Error automating form:', error);
    //     // Handle errors here
    //   });

    // try {
    //   setLoading(true);
    //   console.log("data", data);
    //   setAnswers({
    //     ...answers, Comment: data
    //   })
    //   const isCivilSociety = answers?.shape
    //   const isCarried = answers?.PerformanceFees?.Carried
    //   main()
    //   if (answers?.shape == "Joint stock company") {
    //     const legalRepresentNaturalPerson = answers?.ConstituentPartner?.PersonalDetails?.Document
    //     const legalRepresentCorporation = answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries
    //     const naturalPersonShareholder = answers?.Management?.Person?.Document
    //     const corporationShareholder = answers?.Management?.Company?.Document

    //     const legalRepresentativeName = answers?.Management?.Company?.LegalRepresentative?.Name
    //     const physicalPersonName = answers?.Management?.Person?.PersonalDetails?.FirstName
    //     const physicalPersonFamilyName = answers?.Management?.Person?.FatherMotherDetails?.FatherFirstName

    //     const documents = { legalRepresentNaturalPerson, legalRepresentCorporation, naturalPersonShareholder, corporationShareholder }

    //     const sendMailToBank = await sendEmailToJoinStockCompany({ email: answers?.email, documents, legalRepresentativeName, physicalPersonName, physicalPersonFamilyName })

    //   }

    //   if (isCivilSociety === "Civil society") {
    //     if (isCarried === "yes") {
    //       const templateDataOfCivilSocietyCarried = {
    //         "template_id": "28898",
    //         "send_email": true,
    //         // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
    //         "submission": {
    //           "submitters": [
    //             {
    //               "role": "First Party",
    //               "email": answers?.email,
    //               "values": {
    //                 "nameOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "nameOfEntity1"}`,
    //                 "addressOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "addressOfEntity1"}`,
    //                 "registeryIncorporation": `${answers?.shape || "registeryIncorporation"}`,
    //                 "nameOfFoundingShareholder": `${answers?.Management?.Company?.CompanyDetail?.CompanyName || answers?.Management?.Person?.PersonalDetails?.FirstName || "nameOfFoundingShareholder"}`,
    //                 "typeOfFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName ? "Corporation" : "Natural Person"}`,
    //                 "headquarter": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "headquarter"}`,
    //                 "dateOfPublication": `${answers?.shape || "dateOfPublication"}`,
    //                 "foundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "foundingShareholder"}`,
    //                 "legalRepresentativeFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "legalRepresentativeFoundingShareholder"}`,
    //                 "nameOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || "nameOfEntity2"}`,
    //                 "addressOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "addressOfEntity2"}`,
    //                 "nameOfPresident": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"}`,
    //                 "typeOfEntity": `${answers?.shape || "typeOfEntity"}`,
    //                 "target": `${answers?.shape || "target"}`,
    //               },
    //             }
    //           ]
    //         }
    //       }
    //       const DocSealData = await submitToDocSeal(templateDataOfCivilSocietyCarried)
    //     } else {
    //       const templateDataOfCivilSocietyNotCarried = {
    //         "template_id": "28899",
    //         "send_email": true,
    //         // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
    //         "submission": {
    //           "submitters": [
    //             {
    //               "role": "First Party",
    //               "email": answers?.email,
    //               "values": {
    //                 "nameOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "nameOfEntity1"}`,
    //                 "addressOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "addressOfEntity1"}`,
    //                 "registeryIncorporation": `${answers?.shape || "registeryIncorporation"}`,
    //                 "nameOfFoundingShareholder1": `${answers?.Management?.Company?.CompanyDetail?.CompanyName || answers?.Management?.Person?.PersonalDetails?.FirstName || "nameOfFoundingShareholder"}`,
    //                 "nameOfFoundingShareholder2": `${answers?.Management?.Company?.CompanyDetail?.CompanyName || answers?.Management?.Person?.PersonalDetails?.FirstName || "nameOfFoundingShareholder"}`,
    //                 "typeOfFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName ? "Corporation" : "Natural Person"}`,
    //                 "headquarter": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "headquarter"}`,
    //                 "dateOfPublication": `${answers?.shape || "dateOfPublication"}`,
    //                 "foundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "foundingShareholder"}`,
    //                 "legalRepresentativeFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "legalRepresentativeFoundingShareholder"}`,
    //                 "nameOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || "nameOfEntity2"}`,
    //                 "addressOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "addressOfEntity2"}`,
    //                 "nameOfPresident": `${answers?.Associates?.Company?.RepresentativeDetails?.FirstName || "nameOfPresident"}`,
    //                 "typeOfEntity": `${answers?.shape || "typeOfEntity"}`,
    //                 "target": `${answers?.shape || "target"}`,
    //               },
    //             }
    //           ]
    //         }
    //       }
    //       const DocSealData = await submitToDocSeal(templateDataOfCivilSocietyNotCarried)
    //       console.log("DocSealData1", DocSealData)
    //     }
    //   } else {
    //     if (isCarried === "yes") {
    //       const templateDataOfNonCivilSocietyCarried = {
    //         "template_id": "28896",
    //         "send_email": true,
    //         // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
    //         "submission": {
    //           "submitters": [
    //             {
    //               "role": "First Party",
    //               "email": answers?.email,
    //               "values": {
    //                 "nameOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
    //                 "addressOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "No Data"}`,
    //                 "registeryIncorporation": `${answers?.shape || "No Data"}`,
    //                 "nameOfFoundingShareholder": `${answers?.Management?.Company?.CompanyDetail?.CompanyName || answers?.Management?.Person?.PersonalDetails?.FirstName || "nameOfFoundingShareholder"}`,
    //                 "typeOfFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName ? "Corporation" : "Natural Person"}`,
    //                 "headquarter": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "No Data"}`,
    //                 "dateOfPublication": `${answers?.shape || "No Data"}`,
    //                 "foundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "foundingShareholder"}`,
    //                 "legalRepresentativeFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "No Data"}`,
    //                 "nameOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName}`,
    //                 "addressOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "No Data"}`,
    //                 "nameOfPresident": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || "No Data"}`,
    //                 "typeOfEntity": `${answers?.shape || "No Data"}`,
    //                 "target": `${answers?.shape || "No Data"}`,
    //                 "percentageOne": `${answers?.PerformanceFees?.CarriedPercentage || "No data"}`,
    //                 "percentageTwo": `${answers?.PerformanceFees?.CarriedPercentage || "No data"}`,
    //               },
    //             }
    //           ]
    //         }
    //       }
    //       const DocSealData = await submitToDocSeal(templateDataOfNonCivilSocietyCarried)
    //       console.log("DocSealData2", DocSealData)
    //     } else {
    //       const templateDataOfNonCivilSocietyNotCarried = {
    //         "template_id": "28897",
    //         "send_email": true,
    //         // "completed_redirect_url": "https://overlord-admin.vercel.app/onboarding",
    //         "submission": {
    //           "submitters": [
    //             {
    //               "role": "First Party",
    //               "email": answers?.email,
    //               "values": {
    //                 "nameOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.FirstName || "No Data"}`,
    //                 "addressOfEntity1": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName || answers?.Associates?.Person[0]?.NaturalPerson?.PlaceOfResident || "No Data"}`,
    //                 "registeryIncorporation": `${answers?.shape || "No Data"}`,
    //                 "nameOfFoundingShareholder": `${answers?.Management?.Company?.CompanyDetail?.CompanyName || answers?.Management?.Person?.PersonalDetails?.FirstName || "nameOfFoundingShareholder"}`,
    //                 "typeOfFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName ? "Corporation" : "Natural Person"}`,
    //                 "headquarter": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "No Data"}`,
    //                 "dateOfPublication": `${answers?.shape || "No Data"}`,
    //                 "foundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "foundingShareholder"}`,
    //                 "legalRepresentativeFoundingShareholder": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || answers?.Management?.Person?.PersonalDetails?.FirstName || "No Data"}`,
    //                 "nameOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.CompanyName}`,
    //                 "addressOfEntity2": `${answers?.Associates?.Company?.CompanyDetail?.HeadOffice || "No Data"}`,
    //                 "nameOfPresident": `${answers?.Management?.Company?.LegalRepresentative?.FirstName || "No Data"}`,
    //                 "typeOfEntity": `${answers?.shape || "No Data"}`,
    //                 "target": `${answers?.shape || "No Data"}`,
    //               },
    //             }
    //           ]
    //         }
    //       }
    //       const DocSealData = await submitToDocSeal(templateDataOfNonCivilSocietyNotCarried)
    //     }
    //   }

    //   setIsQuestionaryCompleted(true)
    //   setIsQuestionOpen(false)
    //   setActiveQuestion(1)

    // } catch (error) {
    //   console.error("Error:", error);
    //   setLoading(false);
    // } finally {
    //   setLoading(false);
    // }
  }

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


  const managementDocumentSchema = yup.object().shape({
    Document: yup.mixed().test("fileSize", "Please Upload the document", (value) => {
      if (value.length) return true
    }),
  })

  const { register: managementDocumentRegister,
    handleSubmit: managementDocumentHandleSubmit,
    reset: resetmanagementDocument,
    formState: { errors: managementDocumentErrors }
  } = useForm({
    resolver: yupResolver(managementDocumentSchema)
  })

  const managementDocumentOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Person: {
          ...answers?.Management?.Person, Document: { ...data?.Document }
        }
      }
    });
    handleQuestions(true, -6);

  }

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

  const ManagementDocumentOnSubmit = (data) => {
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Person: {
          ...answers?.Management?.Person, Document: documentUrl
        }
      }
    });
    setDocumentUrl("")
    handleQuestions(true)

  }


  const otherBeneficiaryDocumentSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    })
  })

  const { register: otherBeneficiaryDocumentRegister,
    handleSubmit: otherBeneficiaryDocumentHandleSubmit,
    reset: resetOtherBeneficiaryDocument,
    formState: { errors: otherBeneficiaryDocumentErrors }
  } = useForm({
    resolver: yupResolver(otherBeneficiaryDocumentSchema)
  })

  const otherBeneficiaryDocumentOnSubmit = (data) => {
    console.log("data", data);
    console.log("documentUrl", documentUrl);

    const currentEffectiveBeneficiaries = answers?.Associates?.Company?.EffectiveBeneficiaries || [];
    const updatedEffectiveBeneficiaries = [
      ...currentEffectiveBeneficiaries.slice(0, -1),
      {
        ...currentEffectiveBeneficiaries[currentEffectiveBeneficiaries.length - 1],
        Document: documentUrl,
      },
    ];
    setAnswers({
      ...answers,
      Associates: {
        ...answers?.Associates,
        Company: {
          ...answers?.Associates?.Company,
          EffectiveBeneficiaries: updatedEffectiveBeneficiaries,
        },
      },
    });

    isAgainBenificialSelected ? handleQuestions(false, 1) : handleQuestions(true, -17);
    resetOtherBeneficiaryDocument();
    setDocumentUrl("")
  }



  const managementLegalDocumentSchema = yup.object().shape({
    Document: yup.string().test("fileSize", "Please Upload the document", (value) => {
      return true
    })
  })

  const { register: managementLegalDocumentRegister,
    handleSubmit: managementLegalDocumentHandleSubmit,
    reset: managementLegalDocumentDocument,
    formState: { errors: managementLegalDocumentErrors }
  } = useForm({
    resolver: yupResolver(managementLegalDocumentSchema)
  })

  const managementLegalDocumentOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, Management: {
        ...answers?.Management, Company: {
          ...answers?.Management?.Company, Document: documentUrl

        }
      }
    })
    setDocumentUrl("")
    handleQuestions(true, -6);
  }


  const handleSelectPerson = (selectedPerson) => {
    const newFilteredData = answers?.Associates?.Person?.map((individual) => {
      const naturalPerson = individual?.NaturalPerson;
      return naturalPerson
    })
    const selectedPersonData = newFilteredData.find((person) => person.Name === selectedPerson);
    if (selectedPersonData) {
      Object.keys(selectedPersonData).forEach((property) => {
        const fieldName = `Management.Person.PersonalDetails.${property}`;
        const value = selectedPersonData[property];
        if (property == "DateOfBirth") {
          physicalPersonSetValue(fieldName, formatDate(value));
        } else {
          physicalPersonSetValue(fieldName, value);
        }
      });
    } else {
      physicalPersonReset()
    }
  };

  function getLastBeneficiaryFirstName(answers, type) {

    if (type == "associate") {
      const effectiveBeneficiaries = answers?.Associates?.Company?.EffectiveBeneficiaries;

      if (effectiveBeneficiaries?.length > 0) {
        const lastBeneficiary = effectiveBeneficiaries[effectiveBeneficiaries.length - 1];
        return lastBeneficiary.FirstName;
      } else {
        return undefined;
      }

    } else {
      const effectiveBeneficiaries = answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries;

      if (effectiveBeneficiaries?.length > 0) {
        const lastBeneficiary = effectiveBeneficiaries[effectiveBeneficiaries.length - 1];
        return lastBeneficiary.FirstName;
      } else {
        return undefined;
      }
    }

  }


  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

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

  const emailOnSubmit = (data) => {
    console.log("data", data);
    setAnswers({
      ...answers, email: data?.email
    })
    handleQuestions(true, 1);
  }





  return (
    <div className="relative" >
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
                      onClick={handleQuestionOpen}
                      className="w-full rounded-[8px] bg-[#315B3F] text-white text-[16px] font-[500] py-[13px] mb-[4px]"
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
                    <button
                      onClick={async () => {
                        const DocSealData = await submitToDocSeal(templateData)
                        // const sendMailToBank = await sendEmailToJoinStockCompany({ email: "overlord-admin-bank@yopmail.com", answers })
                        window.open(DocSealData?.submissionUrl, '_blank');
                      }}
                      disabled={!isQuestionaryCompleted}
                      className="w-full rounded-[8px] bg-[#315B3F] disabled:bg-[lightgray] text-white text-[16px] font-[500] py-[13px] mb-[4px]"
                    >
                      Sign
                    </button>
                  </div>
                </div>
                <p className="text-[#315B3F] text-[16px] font-[500]">
                  <span className="text-[#122117]"> A question? </span>
                  Here is our FAQ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        isQuestionOpen ? (
          <div className={`absolute h-full w-full top-0 left-0 bg-transparant ${activeQuestion === 11 ? "mt-[100px]" : ""} `}>
            <div className="flex justify-center items-start my-[100px] h-screen">
              <div className=" bg-[white] max-w-[650px] w-[600px] shadow-lg rounded-[20px] p-[30px]">
                <div className="flex justify-between items-center mt-5">
                  {activeQuestion > 0 ? (
                    <button
                      onClick={() => {
                        handleQuestions(false);
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
                      <>
                        <>
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
                                    name="email"
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
                                // onClick={() => {
                                //   // handleQuestions(true, 1);
                                // }}
                                type="submit"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                              >
                                Next
                              </button>
                            </div>
                          </form>
                        </>
                      </>
                    ),
                    1: (
                      <>
                        <div className="py-[50px]">
                          <p className="text-[20px] font-[500] text-[#315B3F]">
                            What type of vehicle creation do you want?
                          </p>
                          <div className="pt-[20px] flex flex-col gap-[10px] w-[70%]">
                            <div
                              onClick={() => handleIsSingle(true)}
                              className={`${answers.isSingle ? "border-[2px]" : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                            >
                              Single Asset - For SPVs, Angels & Founders
                            </div>
                            <div
                              onClick={() => handleIsSingle(false)}
                              className={`${!answers.isSingle ? "border-[2px]" : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                            >
                              Multi Asset - For VCs & Family Offices
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <button
                            onClick={() => {
                              handleQuestions(true, 2);
                            }}
                            type="button"
                            className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                          >
                            Next
                          </button>
                        </div>

                      </>
                    ),
                    2: (
                      // <>

                      //   {answers.isSingle ? (
                      //     <form onSubmit={portFolioHandleSubmit(portFolioOnSubmit)}>
                      //       <div className="py-[50px]">
                      //         <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                      //           Wallet
                      //         </p>
                      //         <p className="text-[20px] font-[500] text-[#315B3F]">
                      //           Portfolio constitution
                      //           <sup className="!text-[red]"> *</sup>
                      //         </p>
                      //         <div className="flex w-full items-center mt-[20px] relative">
                      //           <label className="text-[15px] text-[#315B3F] w-[40%]">
                      //             Target <sup> *</sup>
                      //           </label>
                      //           <input

                      //             className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                      //             placeholder={"Target"}
                      //             // onChange={(e) => {
                      //             //   setAnswers({
                      //             //     ...answers,
                      //             //     target: Number(e.target.value),
                      //             //   });
                      //             // }}
                      //             {...portFolioRegister("target")}
                      //             type="number"
                      //           />
                      //           {portFolioErrors.target && (
                      //             <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                      //               {portFolioErrors.target.message}
                      //             </span>
                      //           )}
                      //         </div>

                      //       </div>
                      //       <div>
                      //         {" "}
                      //         <button

                      //           type="submit"
                      //           className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                      //         >
                      //           Next
                      //         </button>
                      //       </div>
                      //     </form>
                      //   ) : (
                      //     <div className="py-[50px]">
                      //       <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                      //         Wallet
                      //       </p>
                      //       <p className="text-[20px] font-[500] text-[#315B3F]">
                      //         Portfolio constitution
                      //         <sup className="!text-[red]"> *</sup>
                      //       </p>
                      //       <div className="pt-[20px] flex flex-col gap-[10px] w-[70%]">
                      //         <div
                      //           onClick={(e) => {
                      //             setAnswers({
                      //               ...answers,
                      //               portfolioConstructionType: "Real Estate",
                      //             });
                      //           }}
                      //           className={`${answers?.portfolioConstructionType === "Real Estate" ? "border-2" : "border"} cursor-pointer text-[15px] font-[400] text-[#315B3F]  border-[#315B3F] rounded-[8px] p-[10px]`}
                      //         >
                      //           Real Estate
                      //         </div>
                      //         <div
                      //           onClick={(e) => {
                      //             setAnswers({
                      //               ...answers,
                      //               portfolioConstructionType: "Private Equity",
                      //             });
                      //           }}
                      //           className={`${answers?.portfolioConstructionType === "Private Equity" ? "border-2" : "border"} cursor-pointer text-[15px] font-[400] text-[#315B3F]  border-[#315B3F] rounded-[8px] p-[10px]`}
                      //         >
                      //           Private Equity
                      //         </div>
                      //         <div className="flex flex-row gap-2">
                      //           <div
                      //             onClick={(e) => {
                      //               setAnswers({
                      //                 ...answers,
                      //                 portfolioConstructionType: "Other",
                      //               });
                      //             }}
                      //             className={`${answers?.portfolioConstructionType === "Other" ? "border-2" : "border"} w-[40%] cursor-pointer text-[15px] font-[400] text-[#315B3F]  border-[#315B3F] rounded-[8px] p-[10px]`}
                      //           >
                      //             Other
                      //           </div>
                      //           <div>
                      //             {answers?.portfolioConstructionType === "Other" && (
                      //               <div className="w-[100%] ">
                      //                 <input
                      //                   className="border outline-none w-[100%] h-[50px] px-[10px] rounded-[8px] p-[10px]"
                      //                   placeholder={"Company Name"}
                      //                   name="companyName"

                      //                   type="text"
                      //                 />

                      //               </div>
                      //             )}
                      //           </div>
                      //         </div>
                      //       </div>
                      //       {
                      //         !answers?.portfolioConstructionType && (
                      //           <span className="text-[11px] text-[red] ">
                      //             Please the select the fields
                      //           </span>
                      //         )
                      //       }

                      //       <div>
                      //         <button
                      //           onClick={() => {
                      //             answers?.portfolioConstructionType ? handleQuestions(true) : ""
                      //           }}
                      //           type="submit"
                      //           className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
                      //         >
                      //           Next
                      //         </button>
                      //       </div>
                      //     </div>
                      //   )}
                      // </>
                      ""
                    ),
                    3: (
                      <form onSubmit={walletHandleSubmit(walletOnSubmit)}>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                            Wallet
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
                                  name="companyName"
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
                                  name="idNumber"
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
                                  name="headOffice"
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
                                  name="countryOfRegistration"
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
                                  name="tradeRegister"
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
                    ),
                    4: (
                      <>

                        <div className="py-[50px] relative">
                          <p className="text-[20px] font-[500] text-[#315B3F]">
                            Type of Entity
                          </p>
                          <div className="pt-[20px] flex flex-col gap-[10px] w-[40%]">
                            <div
                              onClick={() => handleShape("Civil society")}
                              className={`${answers.shape === "Civil society"
                                ? "border-[2px]"
                                : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                            >
                              Civil society
                            </div>
                            <div
                              onClick={() => { handleShape("Joint stock company"); openPopup(); }}
                              className={`${answers.shape === "Joint stock company"
                                ? "border-[2px]"
                                : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                            >
                              Joint stock company
                            </div>
                            {!answers.shape && (
                              <>
                                <span className="text-[11px] text-[red] absolute left-[0px] bottom-[30px]">
                                  Please Select Any one
                                </span>
                              </>
                            )}
                          </div>

                          <div className="">
                            {/* Popup */}
                            {isPopupVisible && (
                              <div className="fixed inset-2 flex items-center justify-center  m-auto mt-[-15%] bg-gray-100 w-full">

                                <div className="bg-white p-8 rounded shadow-md w-[40%]  ">
                                  <div className="bg-white text-[red] text-[25px] font-semibold ">
                                    Warning
                                  </div>
                                  <p className="text-lg font-semibold text-[#315B3F] ">
                                    Please note that to use a PEA we need to establish a Société par Actions Simplifiée which is subject to corporate tax. While a PEA will exonerate the investors using their PEA (and only those investors, so not investors without PEA) of 13% tax on the proceeds received from the entity, the entity will be subject to corporate tax of 25% unless the entity owns at least 5% of the shares of the target for more than 2 years (in which case, the corporate tax will only be 3%).
                                    Otherwise, we can establish a Société Civile which is not subject to corporate tax but does not allow PEA.
                                    In Conclusion, a PEA with a société par action simplifée is the best solution only when the entity will hold more than 5% of the target for more than 2 years.

                                  </p>
                                  <button
                                    onClick={() => { closePopup(); setIsQuestionOpen(true) }}
                                    className="bg-[#315B3F] text-white px-4 py-2 rounded hover:bg-opacity-80"
                                  >
                                    Close
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          // disabled={!answers.shape}
                          onClick={() => {

                            answers?.shape && (answers.shape === "Civil society" ? handleQuestions(true) : handleQuestions(true, 22))
                          }}
                          type="button"
                          className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                        >
                          Next
                        </button>
                      </>
                    ),
                    5: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                            Associates
                          </p>
                          <p className="text-[20px] font-[500] text-[#315B3F]">
                            Please select one of the following options
                          </p>
                          <div className="pt-[20px] flex flex-col gap-[10px] w-[70%]">
                            <div
                              onClick={() => setIsSelectedCorporation(false)}
                              className={`${!isSelectedCorporation ? 'border-[2px]' : 'border'
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px] relative`}
                              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
                            >
                              Physical person
                            </div>
                            <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div>
                            <div
                              onClick={() => setIsSelectedCorporation(true)}
                              className={`${isSelectedCorporation ? 'border-[2px]' : 'border'
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px] `}
                              title="A legal entity, such as a company or firm, that participates in the SPV, usually contributing significant financial resources, expertise, or assets to the venture."
                            >
                              Corporation
                            </div>
                            <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="A legal entity, such as a company or firm, that participates in the SPV, usually contributing significant financial resources, expertise, or assets to the venture." />
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <button
                            onClick={() => {
                              // isSelectedCorporation ? setActiveQuestion(20) : handleQuestions(true)
                              isSelectedCorporation ? handleQuestions(true, 15) : handleQuestions(true)
                            }}
                            type="button"
                            className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ),
                    6: (
                      <>
                        <form onSubmit={naturalPersonHandleSubmit(naturalPersonOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Associates – Natural person
                            </p>

                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">

                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First Name <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First Name"}
                                  name="NaturalPerson.FirstName"
                                  {...naturalPersonRegister('NaturalPerson.FirstName')}
                                  type="text"
                                />
                                {naturalPersonErrors.NaturalPerson?.FirstName && (
                                  <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                                    {naturalPersonErrors.NaturalPerson.FirstName.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  name="NaturalPerson.Name"
                                  {...naturalPersonRegister("NaturalPerson.Name")}
                                  type="text"
                                />
                                {naturalPersonErrors.NaturalPerson?.Name && (
                                  <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                                    {naturalPersonErrors.NaturalPerson.Name.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  max={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  name="NaturalPerson.DateOfBirth"
                                  {...naturalPersonRegister("NaturalPerson.DateOfBirth")}
                                />
                                {naturalPersonErrors.NaturalPerson?.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                                    {/* {naturalPersonErrors.NaturalPerson.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  name="NaturalPerson.PlaceOfBirth"
                                  {...naturalPersonRegister("NaturalPerson.PlaceOfBirth")}
                                  type="text"
                                />
                                {naturalPersonErrors.NaturalPerson?.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                                    {naturalPersonErrors.NaturalPerson.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  name="NaturalPerson.PlaceOfResident"
                                  {...naturalPersonRegister("NaturalPerson.PlaceOfResident")}
                                  type="text"
                                />
                                {naturalPersonErrors.NaturalPerson?.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                                    {naturalPersonErrors.NaturalPerson.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>

                              <div>
                                <button
                                  // onClick={() => {
                                  //   handleQuestions(true);
                                  // }}
                                  type="submit"
                                  className="border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    7: (
                      // <>
                      //   <form onSubmit={associateDocumentPersonHandleSubmit(associateDocumentPersonOnSubmit)}>
                      //     <div className="py-[50px]">
                      //       <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
                      //         Associates – Natural person
                      //       </p>
                      //       <div className="flex w-full items-center relative">
                      //         <label className="text-[15px] text-[#315B3F] w-[40%]">
                      //           Amount of contribution <sup> *</sup>
                      //         </label>
                      //         <input
                      //           className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] flex items-top"
                      //           type="number"
                      //           {...associateDocumentPersonRegister("AmountContribution")}
                      //         // onChange={(e) => setAssociatePersonDetail({ ...associatePersonDetail, Amount: e.target.value })}
                      //         />
                      //         {associateDocumentPersonErrors.AmountContribution && (
                      //           <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[220px]">
                      //             {associateDocumentPersonErrors.AmountContribution.message}
                      //           </span>
                      //         )}
                      //       </div>
                      //       <div className="flex flex-col w-full mt-5 mb-10">
                      //         <div className="mb-3">
                      //           <label className="text-[15px] text-[#315B3F] w-[40%]">
                      //             Download a document: Identity document
                      //             <sup> *</sup>
                      //           </label>
                      //         </div>

                      //         <div class="flex items-center justify-center w-full relative">
                      //           <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                      //             <div class="flex flex-col items-center justify-center pt-5 pb-6 relative">
                      //               <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      //                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      //               </svg>
                      //               <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                      //               <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      //             </div>
                      //             <input id="dropzone-file" type="file" class="hidden"
                      //               {...associateDocumentPersonRegister("Document")}
                      //             // onChange={(e) => setAssociatePersonDetail({ ...associatePersonDetail, Document: e.target.files })}
                      //             />

                      //             {associateDocumentPersonErrors.Document && (
                      //               <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[0px]">
                      //                 {associateDocumentPersonErrors.Document.message}
                      //               </span>
                      //             )}

                      //           </label>

                      //         </div>
                      //       </div>

                      //       <div >
                      //         {" "}
                      //         <button
                      //           // onClick={() => {
                      //           //   handleQuestions(true);
                      //           //   setAnswers({ ...answers, Associates: { ...answers?.Associates, Person: [...answers?.Associates?.Person, { ...associatePersonDetail }] } })
                      //           // }}
                      //           type="submit"
                      //           className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                      //         >
                      //           Next
                      //         </button>
                      //       </div>
                      //     </div>
                      //   </form>

                      // </>
                      ""
                    ),
                    8: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
                            Second Constituent Partner?
                            *
                          </p>
                          <div className="flex flex-col gap-1 justify-start items-start">
                            <button onClick={() => setIsConstituentPartnerSelected(true)} className={`${isConstituentPartnerSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            <button onClick={() => setIsConstituentPartnerSelected(false)} className={`${!isConstituentPartnerSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                            <div >
                              <button
                                onClick={() => {
                                  isConstituentPartnerSelected ? handleQuestions(true, 18) : handleQuestions(true)
                                    ;
                                }}
                                type="button"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                    9: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
                            Management
                            *
                          </p>
                          <div className="flex flex-col gap-3 items-start relative">
                            <button onClick={() => setIsCorporationSelected(false)} className={`${!isCorporationSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
                            >
                              Physical Person
                            </button>
                            <div className="relative inline-block left-[140px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div>
                            <button onClick={() => setIsCorporationSelected(true)} className={`${isCorporationSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Corporation
                            </button>
                            <div className="relative inline-block left-[110px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="A legal entity, such as a company or firm, that participates in the SPV, usually contributing significant financial resources, expertise, or assets to the venture." />
                            </div>

                          </div>
                          <div >
                            <button
                              onClick={() => {
                                // isCorporationSelected ? setActiveQuestion(17) : handleQuestions(true, 1)
                                isCorporationSelected ? handleQuestions(true, 8) : handleQuestions(true, 1)

                              }}
                              type="button"
                              className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-4"
                            >
                              Next
                            </button>
                          </div>

                        </div>
                      </>
                    ),
                    10: (
                      <>
                        <div className="py-[0px] mt-5">
                          <p className="pb-[0px] text-[25px] font-[500] text-[#315B3F]">Management </p>
                          <p className="pb-[0px] text-[15px] underline font-[500] text-[#315B3F] mt-2 relative"
                            title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital.">Physical Person</p>
                          <div className="relative inline-block left-[165px] bottom-[60px]">
                            <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                          </div>
                          <div className="flex w-full items-center relative mb-4">
                            <label className="text-[15px] text-[#315B3F] w-[40%]">
                              Select Person <sup>*</sup>
                            </label>
                            <select
                              className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                              name="selectedPerson"
                              onChange={(e) => handleSelectPerson(e.target.value)}
                            >
                              <option value="">Select a person</option>
                              {answers?.Associates?.Person.map((person) => {
                                const newData = person.NaturalPerson
                                return <option key={newData.Name} value={newData.Name}>
                                  {newData.Name}
                                </option>
                              })}
                            </select>
                          </div>

                          <form onSubmit={physicalPersonHandleSubmit(physicalPersonOnSubmit)}>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First Name <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First Name"}
                                  name="Management.Person.PersonalDetails.FirstName"
                                  {...physicalPersonRegister("Management.Person.PersonalDetails.FirstName")}
                                  type="text"
                                />
                                {physicalPersonErrors.Management?.Person?.PersonalDetails?.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {physicalPersonErrors.Management.Person.PersonalDetails.FirstName.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  name="Management.Person.PersonalDetails.Name"
                                  {...physicalPersonRegister("Management.Person.PersonalDetails.Name")}
                                  type="text"
                                />
                                {physicalPersonErrors.Management?.Person?.PersonalDetails?.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {physicalPersonErrors.Management.Person.PersonalDetails.Name.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  max={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  name="Management.Person.PersonalDetails.DateOfBirth"
                                  {...physicalPersonRegister("Management.Person.PersonalDetails.DateOfBirth")}
                                />
                                {physicalPersonErrors.Management?.Person?.PersonalDetails?.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {physicalPersonErrors.Management.Person.PersonalDetails.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  name="Management.Person.PersonalDetails.PlaceOfBirth"
                                  {...physicalPersonRegister("Management.Person.PersonalDetails.PlaceOfBirth")}
                                  type="text"
                                />
                                {physicalPersonErrors.Management?.Person?.PersonalDetails?.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {physicalPersonErrors.Management.Person.PersonalDetails.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence <sup>*</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  name="Management.Person.PersonalDetails.PlaceOfResident"
                                  {...physicalPersonRegister("Management.Person.PersonalDetails.PlaceOfResident")}
                                  type="text"
                                />
                                {physicalPersonErrors.Management?.Person?.PersonalDetails?.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {physicalPersonErrors.Management.Person.PersonalDetails.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>

                              <div>
                                <button
                                  // onClick={() => {
                                  //   handleQuestions(true);
                                  // }}
                                  type="submit"
                                  className="border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </>
                    ),
                    11: (
                      <>
                        <form onSubmit={fatherMotherHandleSubmit(fatherMotherOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Management
                            </p>
                            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]"
                              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."

                            >
                              Physical Person
                            </p>

                            <div>
                              <p className="pb-[20px] text-[20px] font-[500] text-[#315B3F]">
                                Father Information
                              </p>
                              <div className="flex flex-col gap-[20px]">
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Name <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Name"}
                                    type="text"
                                    name="FatherName"
                                    {...fatherMotherRegister("FatherName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherName: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.FatherName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.FatherName.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    First Name <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"First Name"}
                                    type="text"
                                    {...fatherMotherRegister("FatherFirstName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherFirstName: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.FatherFirstName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.FatherFirstName.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of birth <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of birth"}
                                    type="text"
                                    {...fatherMotherRegister("FatherPlaceOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherPlaceOfBirth: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.FatherPlaceOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.FatherPlaceOfBirth.message}
                                    </span>
                                  )}
                                </div>

                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Date of birth <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Date of birth"}
                                    max={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    {...fatherMotherRegister("FatherDateOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherDateOfBirth: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.FatherDateOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {/* {fatherMotherErrors.FatherDateOfBirth.message} */}
                                      Mother Date of birth is required
                                    </span>
                                  )}
                                </div>

                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of residence <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of residence"}
                                    type="text"
                                    {...fatherMotherRegister("FatherPlaceOfResident")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, FatherPlaceOfResident: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.FatherPlaceOfResident && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.FatherPlaceOfResident.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <p className="pb-[20px] text-[20px] font-[500] text-[#315B3F]">
                                Information about the mother:
                              </p>
                              <div className="flex flex-col gap-[20px]">
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Name <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Name"}
                                    type="text"
                                    {...fatherMotherRegister("MotherName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherName: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.MotherName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.MotherName.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    First Name <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"First Name"}
                                    type="text"
                                    {...fatherMotherRegister("MotherFirstName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherFirstName: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.MotherFirstName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.MotherFirstName.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of birth <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of birth"}
                                    type="text"
                                    {...fatherMotherRegister("MotherPlaceOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherPlaceOfBirth: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.MotherPlaceOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.MotherPlaceOfBirth.message}
                                    </span>
                                  )}
                                </div>

                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Date of birth <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Date of birth"}
                                    max={new Date().toISOString().split("T")[0]}
                                    type="date"
                                    {...fatherMotherRegister("MotherDateOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherDateOfBirth: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.MotherDateOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {/* {fatherMotherErrors.MotherDateOfBirth.message} */}
                                      Mother Date of birth is required
                                    </span>
                                  )}
                                </div>

                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of residence <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of residence"}
                                    type="text"
                                    {...fatherMotherRegister("MotherPlaceOfResident")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, FatherMotherDetails: { ...answers?.Management?.Person?.FatherMotherDetails, MotherPlaceOfResident: e.target.value } } } })}
                                  />
                                  {fatherMotherErrors.MotherPlaceOfResident && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {fatherMotherErrors.MotherPlaceOfResident.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div>
                              {" "}
                              <button
                                // onClick={() => {
                                //   handleQuestions(true);
                                // }}
                                type="submit"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-[10px]"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    12: (
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
                                <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {answers?.Management?.Person?.PersonalDetails?.FirstName} </p>
                                {/* <div className="flex items-center justify-center w-full mt-4 relative" >
                                  <label
                                    for="dropzone-file"
                                    class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800"
                                  >
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                      <svg
                                        class="w-8 h-8 mb-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                      </svg>
                                      <p class="mb-2 text-sm  ">
                                        <span class="font-semibold">Click to upload</span> or drag and drop
                                      </p>
                                      <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                      id="dropzone-file"
                                      type="file"
                                      class="hidden"
                                      {...ManagementDocumentRegister("Document")}
                                    // onChange={(e) =>
                                    //   setAnswers({
                                    //     ...answers,
                                    //     Management: { ...answers?.Management, Person: { ...answers?.Management?.Person, Document: e.target.files } },
                                    //   })
                                    // }
                                    />
                                    {ManagementDocumentErrors.Document && (
                                      <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[0px]">
                                        {ManagementDocumentErrors.Document.message}
                                      </span>
                                    )}
                                  </label>
                                </div> */}
                                <UploadDocument setDocumentUrl={setDocumentUrl} />
                                {
                                  !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
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
                                disabled={!documentUrl}
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
                              >
                                Next
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ),
                    13: (
                      <>
                        <div className="py-[25px]">
                          <div>
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
                              Costs
                            </p>
                          </div>
                          <p className="pb-[10px] text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                            Management fee
                            *
                          </p>
                          {/* <p className="pb-[20px] text-[18px] font-[500] text-[#315B3F] ">
                            ( Indicates the fee, typically a fixed percentage of the assets under management, charged by the General Partner or management team for operating the SPV. This fee covers administrative and operational expenses related to managing the investment.)
                          </p> */}
                          <div className="relative inline-block left-[165px] bottom-[35px]">
                            <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Indicates the fee, typically a fixed percentage of the assets under management, charged by the General Partner or management team for operating the SPV. This fee covers administrative and operational expenses related to managing the investment." />
                          </div>

                          <div className="flex flex-col gap-1 justify-start items-start">
                            <button onClick={() => setIsCost(true)} className={`${isCost ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            <button onClick={() => setIsCost(false)} className={`${!isCost ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                            <div >
                              <button
                                onClick={() => {
                                  // isCost ? setActiveQuestion(14) : setActiveQuestion(15)
                                  isCost ? handleQuestions(true) : handleQuestions(true, 2)
                                }}
                                type="button"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                    14: (
                      <>
                        <form onSubmit={admissionFeeHandleSubmit(admissionFeeOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Admission Fees
                            </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Percentage <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Percentage"}
                                  type="number"
                                  {...admissionFeeRegister("Percentage")}
                                // onChange={(e) => setAnswers({ ...answers, ManagementFees: { ...answers?.ManagementFees, Percentage: e.target.value } })}
                                />
                                {admissionFeeErrors.Percentage && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                    {admissionFeeErrors.Percentage.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Fixed <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Fixed"}
                                  type="number"
                                  {...admissionFeeRegister("Fixed")}
                                // onChange={(e) => setAnswers({ ...answers, ManagementFees: { ...answers?.ManagementFees, Fixed: e.target.value } })}
                                />
                                {admissionFeeErrors.Fixed && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                    {admissionFeeErrors.Fixed.message}
                                  </span>
                                )}
                              </div>
                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   setActiveQuestion(16)
                                  // }}
                                  type="submit"
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>

                        </form>

                      </>
                    )
                    ,
                    15: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap" >
                            Performance fee
                          </p>

                          <div className="flex flex-col gap-1 justify-start items-start mb-5">
                            <p className="text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                              Priority interest
                              *
                            </p>
                            {/* <p className="mb-[5px] text-[14px] font-[500] text-[#315B3F] ">
                              ( Enter the rate of return investors receive from the SPV's income before any profit-sharing. This ensures investors get a return on their investment before other distributions. )
                            </p> */}
                            <div className="relative inline-block left-[150px] bottom-[25px]">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Enter the rate of return investors receive from the SPV's income before any profit-sharing. This ensures investors get a return on their investment before other distributions." />
                            </div>


                            <button value="yes" onClick={() => setIsPrioritySelected(true)} className={`${isPriorityInterestSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            {isPriorityInterestSelected ? (
                              <>
                                <div className="flex w-1/3 items-center relative mb-2">

                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] mb-1"
                                    placeholder={"Percentage"}
                                    type="number"
                                    onChange={(e) => setAnswers({ ...answers, PerformanceFees: { ...answers?.PerformanceFees, PerformancePercentage: e.target.value } })}
                                  />
                                  {!answers?.PerformanceFees?.PerformancePercentage && (
                                    <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                                      Please enter the Value
                                    </span>
                                  )}
                                </div>
                              </>
                            ) : ""}
                            <button value="no" onClick={() => { setIsPrioritySelected(false); setAnswers({ ...answers, PerformanceFees: { ...answers?.PerformanceFees, PerformancePercentage: 0 } }) }} className={`${!isPriorityInterestSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                          </div>

                          <div className="flex flex-col gap-1 justify-start items-start mb-5">
                            <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                              GP Catch-up
                              *
                            </p>
                            {/* <p className="mb-[5px] text-[14px] font-[500] text-[#315B3F] ">
                              ( Specify the arrangement where the General Partner receives a share of profits after investors have received their priority interest. This occurs once investors achieve their agreed-upon return. )
                            </p> */}
                            <div className="relative inline-block left-[130px] bottom-[25px]">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Specify the arrangement where the General Partner receives a share of profits after investors have received their priority interest. This occurs once investors achieve their agreed-upon return." />
                            </div>
                            <button onClick={() => setIsGpCatchUpSelected(true)} className={`${isGpCatchUpSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            <button onClick={() => setIsGpCatchUpSelected(false)} className={`${!isGpCatchUpSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                          </div>

                          <div className="flex flex-col gap-1 justify-start items-start mb-5">
                            <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                              Carried
                              *
                            </p>
                            {/* <p className="mb-[5px] text-[14px] font-[500] text-[#315B3F] ">
                              ( Detail the percentage of profits the General Partner earns after priority interest and GP catch-up. This aligns the General Partner’s incentives with maximizing the SPV's profitability. )
                            </p> */}
                            <div className="relative inline-block left-[85px] bottom-[25px]">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Detail the percentage of profits the General Partner earns after priority interest and GP catch-up. This aligns the General Partner’s incentives with maximizing the SPV's profitability." />
                            </div>
                            <button onClick={() => setIsCarriedSelected(true)} className={`${isCarriedSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            {isCarriedSelected ? (
                              <>
                                <div className="flex w-1/3 items-center relative mb-2">

                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] mb-1"
                                    placeholder={"Percentage"}
                                    type="number"
                                    onChange={(e) => setAnswers({ ...answers, PerformanceFees: { ...answers?.PerformanceFees, CarriedPercentage: e.target.value } })}
                                  />
                                  {!answers?.PerformanceFees?.CarriedPercentage && (
                                    <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                                      Please enter the Value
                                    </span>
                                  )}
                                </div>
                              </>
                            ) : ""}
                            <button onClick={() => setIsCarriedSelected(false)} className={`${!isCarriedSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                          </div>

                          <div >
                            <button
                              onClick={() => {
                                // setActiveQuestion(33)
                                handleQuestions(true, 18)
                                setAnswers({ ...answers, PerformanceFees: { ...answers?.PerformanceFees, PriorityInterest: isPriorityInterestSelected ? "yes" : "no", GpCatchUp: isGpCatchUpSelected ? "yes" : "no", Carried: isCarriedSelected ? "yes" : "no" } })
                              }}
                              type="button"
                              className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </>
                    ),
                    16: (
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
                                  type="text"
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
                                  onClick={() => {
                                    setLoading(true);
                                    // Add your logic for submitting here
                                  }}
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
                    ),
                    17: (
                      <>
                        <div>
                          <form onSubmit={managementCorporationHandleSubmit(managementCorporationOnSubmit)}>
                            <div className="py-[50px]">
                              <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                                Management
                              </p>
                              <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                                Corporation
                              </p>
                              <div className="flex flex-col gap-[20px]">
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Company name
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Company name"}
                                    type="text"
                                    name="CompanyName"
                                    {...managementCorporationRegister("CompanyName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, CompanyName: e.target.value } } } })}

                                  />
                                  {managementCorporationFeeErrors.CompanyName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementCorporationFeeErrors.CompanyName.message}
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
                                    placeholder={"ID Number"}
                                    type="number"
                                    name="Id"
                                    {...managementCorporationRegister("Id")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, Id: e.target.value } } } })}
                                  />
                                  {managementCorporationFeeErrors.Id && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementCorporationFeeErrors.Id.message}
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
                                    placeholder={"The Head Office"}
                                    type="text"
                                    {...managementCorporationRegister('HeadOffice')}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, CompanyDetail: { ...answers?.Management?.Company?.CompanyDetail, HeadOffice: e.target.value } } } })}
                                  />
                                  {managementCorporationFeeErrors.HeadOffice && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementCorporationFeeErrors.HeadOffice.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <button
                                  // onClick={() => {
                                  //   setActiveQuestion(18);
                                  // }}
                                  type="submit"
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px] mt-5"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </>
                    ),
                    18: (
                      <>
                        <div>

                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Management
                            </p>
                            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                              Legal representative:
                            </p>

                            <form onSubmit={managementLegalHandleSubmit(managementLegalOnSubmit)}>
                              <div className="flex flex-col gap-[20px]">
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    First name
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"First Name"}
                                    type="text"
                                    {...managementLegalRegister("FirstName")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, FirstName: e.target.value } } } })}
                                  />
                                  {managementLegalErrors.FirstName && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementLegalErrors.FirstName.message}
                                    </span>
                                  )}
                                </div>

                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Name
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Name"}
                                    type="text"
                                    {...managementLegalRegister("Name")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, Name: e.target.value } } } })}
                                  />
                                  {managementLegalErrors.Name && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementLegalErrors.Name.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Date of birth
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Date Of Birth"}
                                    type="date"
                                    {...managementLegalRegister("DateOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, DateOfBirth: e.target.value } } } })}
                                  />
                                  {managementLegalErrors.DateOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {/* {managementLegalErrors.DateOfBirth.message} */}
                                      Date of birth is required
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of Birth
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of Birth"}
                                    type="text"
                                    {...managementLegalRegister("PlaceOfBirth")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, PlaceOfBirth: e.target.value } } } })}
                                  />
                                  {managementLegalErrors.PlaceOfBirth && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementLegalErrors.PlaceOfBirth.message}
                                    </span>
                                  )}
                                </div>
                                <div className="flex w-full items-center relative">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Place of residence
                                    <sup> *</sup>
                                  </label>
                                  <input
                                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Place of residence"}
                                    type="text"
                                    {...managementLegalRegister("PlaceOfResident")}
                                  // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, LegalRepresentative: { ...answers?.Management?.Company?.LegalRepresentative, PlaceOfResident: e.target.value } } } })}
                                  />
                                  {managementLegalErrors.PlaceOfResident && (
                                    <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-17px]">
                                      {managementLegalErrors.PlaceOfResident.message}
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
                            </form>
                          </div>
                        </div>

                      </>
                    ),
                    19: (
                      <>
                        <div>
                          <form onSubmit={managementLegalDocumentHandleSubmit(managementLegalDocumentOnSubmit)}>
                            <div className="py-[50px]">
                              <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                                Management
                              </p>
                              <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                                Legal representative:
                              </p>
                              <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {answers?.Management?.Company?.LegalRepresentative?.FirstName} </p>
                              <div className="flex flex-col gap-[20px]">
                                <div className="flex w-full flex-col items-start relative">
                                  <div className="">
                                    <label className="text-[15px] text-[#315B3F] w-[40%]">
                                      Download a document : K BIS
                                      <sup> *</sup>
                                    </label>
                                  </div>
                                  {/* <div class="flex items-center justify-center w-full mt-4 relative">
                                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                      <div class="flex flex-col items-center justify-center pt-5 pb-6 ">
                                        <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                      </div>
                                      <input id="dropzone-file" type="file" class="hidden"
                                        {...managementLegalDocumentRegister("Document")}
                                      // onChange={(e) => setAnswers({ ...answers, Management: { ...answers?.Management, Company: { ...answers?.Management?.Company, Document: e.target.files } } })}
                                      />
                                      {managementLegalDocumentErrors.Document && (
                                        <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[0px]">
                                          {managementLegalDocumentErrors.Document.message}
                                        </span>
                                      )}
                                    </label>
                                  </div> */}
                                  <UploadDocument setDocumentUrl={setDocumentUrl} />
                                  {
                                    !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                      Please Upload Document
                                    </span>
                                  }
                                </div>

                                <div>
                                  {" "}
                                  <button
                                    // onClick={() => {
                                    //   // setActiveQuestion(13);
                                    //   handleQuestions(true, -6);
                                    // }}
                                    type="submit"
                                    disabled={!documentUrl}
                                    className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                  >
                                    Next
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </>
                    ),
                    20: (
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
                    ),
                    21: (
                      <>
                        <form onSubmit={corporationLegalRepresentationHandleSubmit(corporationLegalRepresentationOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Partners - Legal entity
                            </p>
                            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                              Legal representative:
                            </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First name"
                                  }
                                  type="text"
                                  {...corporationLegalRepresentationRegister("FirstName")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, FirstName: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalRepresentationErrors.FirstName.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...corporationLegalRepresentationRegister("Name")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, Name: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalRepresentationErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative
            ">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  type="date"
                                  {...corporationLegalRepresentationRegister("DateOfBirth")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, DateOfBirth: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {corporationLegalRepresentationErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...corporationLegalRepresentationRegister("PlaceOfBirth")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfBirth: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalRepresentationErrors.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...corporationLegalRepresentationRegister("PlaceOfResident")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfResident: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalRepresentationErrors.PlaceOfResident.message}
                                  </span>
                                )}

                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Amount of contribution
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Amount of contribution"}
                                  type="number"
                                  {...corporationLegalRepresentationRegister("AmountContribution")}
                                // onChange={(e) => setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, ConstituentPartner: { ...answers?.Associates?.Company?.ConstituentPartner, company: { ...answers?.Associates?.Company?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.Associates?.Company?.ConstituentPartner?.Company?.RepresentativeDetails, AmountContribution: e.target.value } } } } } })}
                                />
                                {corporationLegalRepresentationErrors.AmountContribution && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalRepresentationErrors.AmountContribution.message}
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
                    ),
                    22: (
                      <>
                        <form onSubmit={corporationBeneficiaryHandleSubmit(corporationBeneficiaryOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Effective beneficiaries
                            </p>

                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Holding percentage
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Holding percentage"
                                  }
                                  type="number"
                                  // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, HoldingPercentage: e.target.value })}
                                  {...corporationBeneficiaryRegister("HoldingPercentage")}
                                />
                                {corporationBeneficiaryErrors.HoldingPercentage && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationBeneficiaryErrors.HoldingPercentage.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First name
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First name"}
                                  type="text"
                                  {...corporationBeneficiaryRegister("FirstName")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, FirstName: e.target.value })}
                                />
                                {corporationBeneficiaryErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationBeneficiaryErrors.FirstName.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...corporationBeneficiaryRegister("Name")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Name: e.target.value })}
                                />
                                {corporationBeneficiaryErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationBeneficiaryErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  type="date"
                                  {...corporationBeneficiaryRegister("DateOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, DateOfBirth: e.target.value })}
                                />
                                {corporationBeneficiaryErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {corporationBeneficiaryErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...corporationBeneficiaryRegister("PlaceOfResident")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfResident: e.target.value })}
                                />
                                {corporationBeneficiaryErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationBeneficiaryErrors.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...corporationBeneficiaryRegister("PlaceOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfBirth: e.target.value })}
                                />
                                {corporationBeneficiaryErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationBeneficiaryErrors.PlaceOfBirth.message}
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
                    ),
                    23: (
                      <>
                        <div className="py-[50px]">
                          <form onSubmit={effectBeneficiaryDocumentHandleSubmit(effectBeneficiaryDocumentOnSubmit)}>
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Effective beneficiaries
                            </p>
                            <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {getLastBeneficiaryFirstName(answers, "associate")}  </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full flex-col items-start relative">
                                <div className="">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Download a document : K BIS
                                    <sup> *</sup>
                                  </label>
                                </div>
                                {/* <div class="flex items-center justify-center w-full mt-4">
                                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                      <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                      </svg>
                                      <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                      <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <div className="flex w-full items-center relative">
                                      <input id="dropzone-file" type="file" class="hidden" name="document"
                                        {...effectBeneficiaryDocumentRegister("Document")}

                                      // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Document: e.target.files })}
                                      />
                                      {effectBeneficiaryDocumentErrors.Document && (
                                        <span className="text-[11px] text-[red] absolute left-[0] bottom-[-30px]">
                                          {effectBeneficiaryDocumentErrors.Document.message}
                                        </span>
                                      )}
                                    </div>
                                  </label>
                                </div> */}
                                <UploadDocument setDocumentUrl={setDocumentUrl} />
                                {
                                  !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                    Please Upload Document
                                  </span>
                                }
                              </div>
                              <div className="flex flex-col gap-4 justify-start items-start mb-5">
                                <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                                  Other beneficial owners
                                  *
                                </p>
                                <button onClick={(e) => { e.preventDefault(); setIsOtherBenificialSelected(true) }} className={`${isOtherBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  Yes
                                </button>
                                <button onClick={(e) => { e.preventDefault(); setIsOtherBenificialSelected(false) }} className={`${!isOtherBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  No
                                </button>
                              </div>

                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, EffectiveBeneficiaries: [...answers?.Associates?.Company?.EffectiveBeneficiaries, effectiveBenificiaryData] } } })
                                  //   isOtherBenificialSelected ? handleQuestions(true) : setActiveQuestion(8)
                                  // }}
                                  type="submit"
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                  disabled={!documentUrl}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                      </>
                    ),
                    24: (
                      <>
                        <form onSubmit={otherBenificialHandleSubmit(otherBenificialOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Other beneficial owners
                            </p>
                            <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                              Legal representative:
                            </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Holding percentage
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={" Holding percentage"
                                  }
                                  type="number"
                                  {...otherBenificialRegister("HoldingPercentage")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, HoldingPercentage: e.target.value })}
                                />
                                {otherBenificialErrors.HoldingPercentage && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {otherBenificialErrors.HoldingPercentage.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First name"
                                  }
                                  {...otherBenificialRegister("FirstName")}
                                  type="text"
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, FirstName: e.target.value })}
                                />
                                {otherBenificialErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {otherBenificialErrors.FirstName.message}
                                  </span>
                                )}

                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...otherBenificialRegister("Name")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Name: e.target.value })}
                                />
                                {otherBenificialErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {otherBenificialErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  type="date"
                                  {...otherBenificialRegister("DateOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, DateOfBirth: e.target.value })}
                                />
                                {otherBenificialErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {otherBenificialErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...otherBenificialRegister("PlaceOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfBirth: e.target.value })}
                                />
                                {otherBenificialErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {otherBenificialErrors.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...otherBenificialRegister("PlaceOfResident")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfResident: e.target.value })}
                                />
                                {otherBenificialErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {otherBenificialErrors.PlaceOfResident.message}
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
                    ),
                    25: (
                      <>
                        <div className="py-[50px]">
                          <form onSubmit={otherBeneficiaryDocumentHandleSubmit(otherBeneficiaryDocumentOnSubmit)}>
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Other beneficial owners
                            </p>
                            <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {getLastBeneficiaryFirstName(answers, "associate")} </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full flex-col items-start relative">
                                <div className="">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Download a document: K BIS
                                    <sup> *</sup>
                                  </label>
                                </div>
                                {/* <div class="flex items-center justify-center w-full mt-4 relative">
                                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                      <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                      </svg>
                                      <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                      <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden"
                                      {...otherBeneficiaryDocumentRegister("Document")}
                                    // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Document: e.target.files })} 
                                    />
                                    {otherBeneficiaryDocumentErrors.Document && (
                                      <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[0px]">
                                        {otherBeneficiaryDocumentErrors.Document.message}
                                      </span>
                                    )}

                                  </label>
                                </div> */}
                                <UploadDocument setDocumentUrl={setDocumentUrl} />
                                {
                                  !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                    Please Upload Document
                                  </span>
                                }
                              </div>
                              <div className="flex flex-col gap-4 justify-start items-start mb-5">
                                <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                                  Other beneficial owners
                                  *
                                </p>
                                <button onClick={() => setIsAgainBenificialSelected(true)} className={`${isAgainBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  Yes
                                </button>
                                <button onClick={() => setIsAgainBenificialSelected(false)} className={`${!isAgainBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  No
                                </button>
                              </div>

                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   // isAgainBenificialSelected ? handleQuestions(false, 1) : setActiveQuestion(8)
                                  //   isAgainBenificialSelected ? handleQuestions(false, 1) : handleQuestions(true, -17)
                                  //   setAnswers({ ...answers, Associates: { ...answers?.Associates, Company: { ...answers?.Associates?.Company, EffectiveBeneficiaries: [...answers?.Associates?.Company?.EffectiveBeneficiaries, effectiveBenificiaryData] } } })
                                  // }}
                                  type="submit"
                                  disabled={!documentUrl}
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                      </>
                    ),
                    26: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                            Constituent partner
                          </p>
                          <p className="text-[20px] font-[500] text-[#315B3F]">
                            Please select one of the following options
                          </p>
                          <div className="pt-[20px] flex flex-col gap-[10px] w-[70%]">
                            <div
                              onClick={() => setIsConstituentSelected(true)}
                              className={`${isConstituentSelected ? "border-[2px]" : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
                            >
                              Physical person
                            </div>
                            <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div>
                            <div
                              onClick={() => setIsConstituentSelected(false)}
                              className={`${!isConstituentSelected ? "border-[2px]" : "border"
                                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
                            >
                              Corporation
                            </div>
                            <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="A legal entity, such as a company or firm, that participates in the SPV, usually contributing significant financial resources, expertise, or assets to the venture." />
                            </div>
                          </div>
                        </div>
                        <div>
                          {" "}
                          <button
                            onClick={() => {
                              // isConstituentSelected ? handleQuestions(true) : setActiveQuestion(29)
                              isConstituentSelected ? handleQuestions(true) : handleQuestions(true, 3)

                            }}
                            type="button"
                            className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ),
                    27: (
                      <>
                        <form onSubmit={constituentPersonHandleSubmit(constituentPersonOnSubmit)} >
                          <div className="py-[50px]">
                            <p className="pb-[10px] text-[25px] font-[500] text-[#315B3F]"
                              title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital.">
                              Physical Person
                            </p>
                            {/* <div className="relative inline-block left-[390px] bottom-14">
                              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
                            </div> */}
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First Name <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First Name"}
                                  type="text"
                                  {...constituentPersonRegister("FirstName")}
                                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, FirstName: e.target.value })}

                                />
                                {constituentPersonErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentPersonErrors.FirstName.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...constituentPersonRegister("Name")}
                                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, Name: e.target.value })}
                                />
                                {constituentPersonErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentPersonErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  max={new Date().toISOString().split("T")[0]}
                                  type="date"
                                  {...constituentPersonRegister("DateOfBirth")}
                                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, DateOfBirth: e.target.value })}
                                />
                                {constituentPersonErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {constituentPersonErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...constituentPersonRegister("PlaceOfBirth")}
                                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, PlaceOdBirth: e.target.value })}
                                />
                                {constituentPersonErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentPersonErrors.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...constituentPersonRegister("PlaceOfResident")}
                                // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, PlaceOfResident: e.target.value })}
                                />
                                {constituentPersonErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentPersonErrors.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>
                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   handleQuestions(true);
                                  // }}
                                  type="submit"
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    28: (
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
                            <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {answers?.ConstituentPartner?.PersonalDetails?.FirstName} </p>
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
                                {/* <div class="flex items-center justify-center w-full mt-4 relative" >
                                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                      <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                      </svg>
                                      <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                      <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" class="hidden"
                                      {...constituentDocumentPersonRegister("Document")}
                                    // onChange={(e) => setConstituentPersonData({ ...constituentPersonData, Document: e.target.Files })}
                                    />

                                    {constituentDocumentPersonErrors.Document && (
                                      <span className="text-[11px] text-[red] absolute bottom-[-17px] left-[0px]">
                                        {constituentDocumentPersonErrors.Document.message}
                                      </span>
                                    )}
                                  </label>
                                </div> */}
                                <UploadDocument setDocumentUrl={setDocumentUrl} />
                                {
                                  !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                    Please Upload Document
                                  </span>
                                }
                              </div>

                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Person: [...answers?.ConstituentPartner?.Person, { ...constituentPersonData }] } })
                                  //   setActiveQuestion(9);
                                  // }}
                                  type="submit"
                                  disabled={!documentUrl}
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    29: (
                      <>

                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                            Corporation
                          </p>
                          <form onSubmit={corporationHandleSubmit(corporationOnSubmit)}>
                            <div className="flex flex-col gap-[25px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Company Name <sup> *</sup>
                                </label>
                                <div className="w-[60%] relative">
                                  <input
                                    className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Company Name"}
                                    name="companyName"
                                    {...corporationRegister("CompanyName")}
                                    // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, CompanyName: e.target.value } } } })}
                                    type="text"
                                  />
                                  {corporationErrors.CompanyName && (
                                    <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                      {corporationErrors.CompanyName.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  ID number <sup> *</sup>
                                </label>
                                <div className="w-[60%] relative">
                                  <input
                                    className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"ID number"}
                                    name="idNumber"
                                    type="number"
                                    {...corporationRegister("Id")}
                                  // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, Id: e.target.value } } } })}
                                  />
                                  {corporationErrors.Id && (
                                    <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                      {corporationErrors.Id.message}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Head Office <sup> *</sup>
                                </label>
                                <div className="w-[60%] relative">
                                  <input
                                    className="border outline-none w-[100%] h-[40px] rounded-[8px] px-[10px]"
                                    placeholder={"Head Office"}
                                    name="HeadOffice"
                                    type="text"
                                    {...corporationRegister("HeadOffice")}
                                  // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, CompanyDetail: { ...answers?.ConstituentPartner?.Company?.CompanyDetail, HeadOffice: e.target.value } } } })}
                                  />
                                  {corporationErrors.HeadOffice && (
                                    <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                      {corporationErrors.HeadOffice.message}
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
                              // onClick={() => {
                              //   handleQuestions(true);
                              // }}
                              >
                                Next
                              </button>
                            </div>
                          </form>
                        </div>


                      </>
                    ),
                    30: (
                      <>

                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                            Corporation
                          </p>
                          <p className="pb-[10px] text-[15px] underline font-[500] text-[#315B3F]">
                            Legal representative:
                          </p>
                          <form onSubmit={corporationLegalHandleSubmit(corporationLegalOnSubmit)}>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First name"
                                  }
                                  type="text"
                                  {...corporationLegalRegister("FirstName")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, FirstName: e.target.value } } } })}

                                />
                                {corporationLegalErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalErrors.FirstName.message}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name

                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...corporationLegalRegister("Name")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, Name: e.target.value } } } })}
                                />
                                {corporationLegalErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  type="date"
                                  {...corporationLegalRegister("DateOfBirth")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, DateOfBirth: e.target.value } } } })}
                                />
                                {corporationLegalErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {corporationLegalErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...corporationLegalRegister("PlaceOfBirth")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfBirth: e.target.value } } } })}
                                />
                                {corporationLegalErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalErrors.PlaceOfBirth.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...corporationLegalRegister("PlaceOfResident")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, PlaceOfResident: e.target.value } } } })}
                                />
                                {corporationLegalErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalErrors.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Amount of contribution
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Amount of contribution"}
                                  type="number"
                                  {...corporationLegalRegister("AmountContribution")}
                                // onChange={(e) => setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, RepresentativeDetails: { ...answers?.ConstituentPartner?.Company?.RepresentativeDetails, AmountContribution: e.target.value } } } })}
                                />
                                {corporationLegalErrors.AmountContribution && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {corporationLegalErrors.AmountContribution.message}
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
                          </form>
                        </div>

                      </>
                    ),
                    31: (
                      <>
                        <form onSubmit={constituentBeneficiaryHandleSubmit(constituentBeneficiaryOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Corporation
                            </p>
                            <p className="pb-[20px] underline text-[15px] font-[500] text-[#315B3F]">
                              Effective beneficiaries:
                            </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Holding percentage
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Holding percentage"
                                  }
                                  type="number"
                                  {...constituentBeneficiaryRegister("HoldingPercentage")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, HoldingPercentage: e.target.value })}

                                />
                                {constituentBeneficiaryErrors.HoldingPercentage && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentBeneficiaryErrors.HoldingPercentage.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  First name
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"First name"}
                                  type="text"
                                  {...constituentBeneficiaryRegister("FirstName")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, FirstName: e.target.value })}
                                />
                                {constituentBeneficiaryErrors.FirstName && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentBeneficiaryErrors.FirstName.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Name
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Name"}
                                  type="text"
                                  {...constituentBeneficiaryRegister("Name")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Name: e.target.value })}
                                />
                                {constituentBeneficiaryErrors.Name && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentBeneficiaryErrors.Name.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Date of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Date of birth"}
                                  type="date"
                                  {...constituentBeneficiaryRegister("DateOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, DateOfBirth: e.target.value })}
                                />
                                {constituentBeneficiaryErrors.DateOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {/* {constituentBeneficiaryErrors.DateOfBirth.message} */}
                                    Date of birth is required
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of residence
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of residence"}
                                  type="text"
                                  {...constituentBeneficiaryRegister("PlaceOfResident")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfResident: e.target.value })}
                                />
                                {constituentBeneficiaryErrors.PlaceOfResident && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentBeneficiaryErrors.PlaceOfResident.message}
                                  </span>
                                )}
                              </div>
                              <div className="flex w-full items-center relative">
                                <label className="text-[15px] text-[#315B3F] w-[40%]">
                                  Place of birth
                                  <sup> *</sup>
                                </label>
                                <input
                                  className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px]"
                                  placeholder={"Place of birth"}
                                  type="text"
                                  {...constituentBeneficiaryRegister("PlaceOfBirth")}
                                // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, PlaceOfBirth: e.target.value })}
                                />
                                {constituentBeneficiaryErrors.PlaceOfBirth && (
                                  <span className="text-[11px] text-[red] absolute left-[220px] bottom-[-15px]">
                                    {constituentBeneficiaryErrors.PlaceOfBirth.message}
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
                    ),
                    32: (
                      <>
                        <form onSubmit={constituentDocumentHandleSubmit(constituentDocumentOnSubmit)}>
                          <div className="py-[50px]">
                            <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F]">
                              Corporation
                            </p>
                            <p className="pb-[20px] text-[15px] underline font-[500] text-[#315B3F]">
                              Effective beneficiaries:
                            </p>
                            <p className="pb-[20px] text-[17px] font-[500] text-[#315B3F]">Person Name : {getLastBeneficiaryFirstName(answers)} </p>
                            <div className="flex flex-col gap-[20px]">
                              <div className="flex w-full flex-col items-start relative">
                                <div className="">
                                  <label className="text-[15px] text-[#315B3F] w-[40%]">
                                    Download a document: K BIS
                                    <sup> *</sup>
                                  </label>
                                </div>
                                {/* <div class="flex items-center justify-center w-full mt-4 relative">
                                  <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-40 border-2  border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                      <svg class="w-8 h-8 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                      </svg>
                                      <p class="mb-2 text-sm  "><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                      <p class="text-xs ">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>

                                    <input id="dropzone-file" type="file" class="hidden"
                                      {...constituentDocumentRegister("Document")}
                                    // onChange={(e) => setEffectiveBenificiaryData({ ...effectiveBenificiaryData, Document: e.target.files })}
                                    />
                                    {constituentDocumentErrors.Document && (
                                      <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                        {constituentDocumentErrors.Document.message}
                                      </span>
                                    )}

                                  </label>

                                </div> */}

                                <UploadDocument setDocumentUrl={setDocumentUrl} />
                                {
                                  !documentUrl && <span className="text-[11px] text-[red] absolute left-[0px] bottom-[-15px]">
                                    Please Upload Document
                                  </span>
                                }

                              </div>
                              <div className="flex flex-col gap-4 justify-start items-start mb-5">
                                <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                                  Other beneficial owners
                                  *
                                </p>
                                <button onClick={(e) => { e.preventDefault(); setIsCorporationBenificialSelected(true) }} className={`${isCorporationBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  Yes
                                </button>
                                <button onClick={(e) => { e.preventDefault(); setIsCorporationBenificialSelected(false) }} className={`${!isCorporationBenificialSelected ? "border-[2px]" : "border"
                                  } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                                  No
                                </button>
                              </div>

                              <div>
                                {" "}
                                <button
                                  // onClick={() => {
                                  //   setAnswers({ ...answers, ConstituentPartner: { ...answers?.ConstituentPartner, Company: { ...answers?.ConstituentPartner?.Company, EffectiveBeneficiaries: [...answers?.ConstituentPartner?.Company?.EffectiveBeneficiaries, { ...effectiveBenificiaryData }] } } })
                                  //   isCorporationBenificialSelected ? setActiveQuestion(30) : setActiveQuestion(9)
                                  // }}
                                  type="submit"
                                  className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                                  disabled={!documentUrl}
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </>
                    ),
                    33: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
                            Do you have an available headquarter?<br></br>
                            If, not, Overlord is happy without charging to <br></br> offer its own headquarter for the entity.
                            *
                          </p>
                          <div className="flex flex-col gap-1 justify-start items-start">
                            <button onClick={(e) => { setIsAvailableHeadQuarter(true); setAnswers({ ...answers, AvailableHeadQuarter: e.target.innerText }) }} className={`${isAvailableHeadQuarter ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            <button onClick={(e) => { setIsAvailableHeadQuarter(false); setAnswers({ ...answers, AvailableHeadQuarter: e.target.innerText }) }} className={`${!isAvailableHeadQuarter ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                            <div >
                              <button
                                onClick={() => {
                                  isAvailableHeadQuarter ? handleQuestions(true) : handleQuestions(true, -17)
                                    ;
                                }}
                                type="button"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ),
                    34: (
                      <>
                        <div className="py-[50px]">
                          <p className="pb-[20px] text-[25px] font-[500] text-[#315B3F] whitespace-nowrap">
                            Can you download a recent lease,<br></br> domiciliation contract, EDF receipt or<br></br> telephone bill for this address?

                            *
                          </p>
                          <div className="flex flex-col gap-1 justify-start items-start">
                            <button onClick={(e) => { setIsDownloadSelected(true); setAnswers({ ...answers, DownloadLease: e.target.innerText }) }} className={`${isDownloadLeaseSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              Yes
                            </button>
                            <button onClick={(e) => { setIsDownloadSelected(false); setAnswers({ ...answers, DownloadLease: e.target.innerText }) }} className={`${!isDownloadLeaseSelected ? "border-[2px]" : "border"
                              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
                              No
                            </button>
                            <div >
                              <button
                                onClick={() => {
                                  setActiveQuestion(16)
                                }}
                                type="button"
                                className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
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
