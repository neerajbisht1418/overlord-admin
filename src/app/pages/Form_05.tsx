import React from 'react'
import { IoIosInformationCircle } from "react-icons/io";

const Form_05 = (props: any) => {

 return (
  <div>
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
       onClick={() => props.setIsSelectedCorporation(false)}
       className={`${!props.isSelectedCorporation ? 'border-[2px]' : 'border'
        } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px] relative`}
       title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital."
      >
       Physical person
      </div>
      <div className="relative inline-block left-[390px] bottom-14">
       <IoIosInformationCircle className="text-[#315B3F] cursor-pointer" title="An individual who participated in the SPV as an investor, manager, or owner, bringing personal expertise or capital" />
      </div>
      <div
       onClick={() => props.setIsSelectedCorporation(true)}
       className={`${props.isSelectedCorporation ? 'border-[2px]' : 'border'
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
       props.isSelectedCorporation ? props.handleQuestions(true, 15) : props.handleQuestions(true)
      }}
      type="button"
      className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
     >
      Next
     </button>
    </div>
   </>
  </div>
 )
}

export default Form_05