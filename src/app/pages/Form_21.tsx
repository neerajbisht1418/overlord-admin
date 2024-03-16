import React from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IoIosInformationCircle } from "react-icons/io";

const Form_21 = (props: any) => {

    function formatDate(inputDateString: any) {
        const dateObject = new Date(inputDateString);
        const year = dateObject?.getFullYear();
        const month = dateObject?.getMonth() + 1;
        const day = dateObject?.getDate();
        const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formattedDate;
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
        setValue: corporationLegalRepresentationSetValue,
        formState: { errors: corporationLegalRepresentationErrors }
    } = useForm({
        resolver: yupResolver(corporationLegalRepresentationSchema)
    })

    const corporationLegalRepresentationOnSubmit = (data: any) => {
        console.log("data", data);
        props.setAnswers({
            ...props.answers, selectPersons: [...props.answers.selectPersons, data], Associates: {
                ...props.answers?.Associates, Company: {
                    ...props.answers?.Associates?.Company, RepresentativeDetails
                        : {
                        ...data
                    }
                }
            }
        })
        props.handleQuestions(true);
    }

    const handleSelectPerson = (selectedPerson: any) => {
        const newFilteredData = props.answers?.Associates?.Person?.map((individual: any) => {
            const naturalPerson = individual?.NaturalPerson;
            return naturalPerson
        })

        const selectedPersonData = [...props?.answers?.selectPersons]?.find((person: any) => person.Name === selectedPerson);
        if (selectedPersonData) {
            Object.keys(selectedPersonData).forEach((property) => {
                const fieldName: any = `${property}`;
                const value = selectedPersonData[property];
                if (property == "DateOfBirth") {
                    corporationLegalRepresentationSetValue(fieldName, formatDate(value));
                } else {
                    corporationLegalRepresentationSetValue(fieldName, value);
                }
            });
        } else {
            resetcorporationLegalRepresentation()
        }
    };
    return (
        <div>
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
                                    {props.answers?.selectPersons.filter((person: any, index: number, self: any[]) =>
                                        !self.slice(0, index).some((p: any) =>
                                            p.FirstName === person.FirstName && p.PlaceOfBirth === person.PlaceOfBirth
                                        )
                                    ).map((person: any) => (
                                        <option key={person?.Name} value={person?.Name}>
                                            {person.Name}
                                        </option>
                                    ))}
                                </select>
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
        </div>
    )
}

export default Form_21