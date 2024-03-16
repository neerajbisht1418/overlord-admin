import React, { useState } from 'react'
import { IoIosInformationCircle } from "react-icons/io";

const Form_15 = (props: any) => {
  const [managerPercentageErrorMessage, setManagerPercentageErrorMessage] = useState('');
  const [investorPercentageErrorMessage, setInvestorPercentageErrorMessage] = useState('');

  return (
    <div>
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


            <button value="yes" onClick={() => props.setIsPrioritySelected(true)} className={`${props.isPriorityInterestSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            {props.isPriorityInterestSelected ? (
              <>
                <div className="flex w-1/3 items-center relative mb-2">

                  <input
                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] mb-1"
                    placeholder={"Percentage"}
                    type="number"
                    onChange={(e) => props.setAnswers({ ...props.answers, PerformanceFees: { ...props.answers?.PerformanceFees, PerformancePercentage: e.target.value } })}
                  />
                  {!props.answers?.PerformanceFees?.PerformancePercentage && (
                    <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                      Please enter the Value
                    </span>
                  )}
                </div>
              </>
            ) : ""}
            <button value="no" onClick={() => { props.setIsPrioritySelected(false); props.setAnswers({ ...props.answers, PerformanceFees: { ...props.answers?.PerformanceFees, PerformancePercentage: 0 } }) }} className={`${!props.isPriorityInterestSelected ? "border-[2px]" : "border"
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
            <button onClick={() => props.setIsGpCatchUpSelected(true)} className={`${props.isGpCatchUpSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            <button onClick={() => props.setIsGpCatchUpSelected(false)} className={`${!props.isGpCatchUpSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              No
            </button>
          </div>

          <div className="flex flex-col gap-1 justify-start items-start mb-5">
            <p className=" text-[18px] font-[500] text-[#315B3F] whitespace-nowrap">
              Carried
              *
            </p>
            <div className="relative inline-block left-[85px] bottom-[25px]">
              <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="Detail the percentage of profits the General Partner earns after priority interest and GP catch-up. This aligns the General Partner’s incentives with maximizing the SPV's profitability." />
            </div>
            <button onClick={() => props.setIsCarriedSelected(true)} className={`${props.isCarriedSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}>
              Yes
            </button>
            {props.isCarriedSelected ? (
              <>
                <div className="flex w-full items-center relative mb-2 gap-2">
                  <input
                    className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] mb-1"
                    placeholder={"Manager (%)"}
                    type="number"
                    onChange={(e) => {
                      let managerPercentage = parseFloat(e.target.value);
                      let errorMessage = '';

                      if (managerPercentage < 0) {
                        managerPercentage = 0;
                      } else if (managerPercentage > 100) {
                        managerPercentage = 100;
                        errorMessage = 'Cannot be greater than 100';
                      }

                      const investorPercentage = 100 - managerPercentage;

                      props.setAnswers({
                        ...props.answers,
                        PerformanceFees: {
                          ...props.answers?.PerformanceFees,
                          ManagerPercentage: managerPercentage,
                          InvestorPercentage: investorPercentage
                        }
                      });

                      // Set the error message
                      setManagerPercentageErrorMessage(errorMessage);
                    }}
                  />
                  {managerPercentageErrorMessage && (
                    <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                      {managerPercentageErrorMessage}
                    </span>
                  )}
                  {!props.answers?.PerformanceFees?.ManagerPercentage && (
                    <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                      Please enter the Value
                    </span>
                  )}

                  <>
                    <div className="flex w-full items-center relative mb-2 gap-2">
                      <input
                        className="border outline-none w-[60%] h-[40px] rounded-[8px] px-[10px] mb-1 mt-2"
                        placeholder={"Investor (%)"}
                        type="number"
                        value={props.answers?.PerformanceFees?.InvestorPercentage || ""}
                        onChange={(e) => {
                          let investorPercentage = parseFloat(e.target.value);
                          let errorMessage = '';

                          if (investorPercentage < 0) {
                            investorPercentage = 0;
                          } else if (investorPercentage > 100) {
                            investorPercentage = 100;
                            errorMessage = 'Cannot be greater than 100';
                          }
                          const managerPercentage = 100 - investorPercentage;
                          props.setAnswers({
                            ...props.answers,
                            PerformanceFees: {
                              ...props.answers?.PerformanceFees,
                              ManagerPercentage: managerPercentage,
                              InvestorPercentage: investorPercentage
                            }
                          });

                          // Set the error message
                          setInvestorPercentageErrorMessage(errorMessage);
                        }}
                      />
                      {investorPercentageErrorMessage && (
                        <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-17px]">
                          {investorPercentageErrorMessage}
                        </span>
                      )}
                      {!props.answers?.PerformanceFees?.InvestorPercentage && (
                        <span className="text-[15px] text-[red] absolute left-[0px] bottom-[-25px] ">
                          Please enter the Value
                        </span>
                      )}
                    </div>
                  </>

                </div>
              </>
            ) : ""}
            <button onClick={() => props.setIsCarriedSelected(false)} className={`${!props.isCarriedSelected ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px] mt-4`}>
              No
            </button>
          </div>
          <div >
            <button
              onClick={() => {
                // setActiveQuestion(33)
                props.handleQuestions(true, 18)
                props.setAnswers({ ...props.answers, PerformanceFees: { ...props.answers?.PerformanceFees, PriorityInterest: props.isPriorityInterestSelected ? "yes" : "no", GpCatchUp: props.isGpCatchUpSelected ? "yes" : "no", Carried: props.isCarriedSelected ? "yes" : "no" } })
              }}
              type="button"
              className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]">
              Next
            </button>
          </div>
        </div>
      </>
    </div>
  )
}
export default Form_15