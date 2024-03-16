import React from 'react'

const Form_04 = (props: any) => {
  return (
    <div>
      <>
        <div className="py-[50px] relative">
          <p className="text-[20px] font-[500] text-[#315B3F]">
            Type of Entity
          </p>
          <div className="pt-[20px] flex flex-col gap-[10px] w-[40%]">
            <div
              onClick={() => props.handleShape("Civil society")}
              className={`${props.answers.shape === "Civil society"
                ? "border-[2px]"
                : "border"
                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
            >
              Civil society
            </div>
            <div
              onClick={() => { props.handleShape("Joint stock company"); props.openPopup(); }}
              className={`${props.answers.shape === "Joint stock company"
                ? "border-[2px]"
                : "border"
                } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
            >
              Joint stock company
            </div>

            {!props.answers.shape && (
              <>
                <span className="text-[11px] text-[red] absolute left-[0px] bottom-[30px]">
                  Please Select Any one
                </span>
              </>
            )}
          </div>


          <div className="">
            {/* Popup */}
            {props.answers.shape === "Joint stock company" && (
              <p className="text-sm !w-full font-semibold text-[red] ">
                ( Please note that to use a PEA we need to establish a Société par Actions Simplifiée which is subject to corporate tax. While a PEA will exonerate the investors using their PEA (and only those investors, so not investors without PEA) of 13% tax on the proceeds received from the entity, the entity will be subject to corporate tax of 25% unless the entity owns at least 5% of the shares of the target for more than 2 years (in which case, the corporate tax will only be 3%).
                Otherwise, we can establish a Société Civile which is not subject to corporate tax but does not allow PEA.
                In Conclusion, a PEA with a société par action simplifée is the best solution only when the entity will hold more than 5% of the target for more than 2 years.)
              </p>
            )}
          </div>
        </div>
        <button
          // disabled={!answers.shape}
          onClick={() => {

            props.answers?.shape && (props.answers.shape === "Civil society" ? props.handleQuestions(true) : props.handleQuestions(true, 22))
          }}
          type="button"
          className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
        >
          Next
        </button>
      </>
    </div>
  )
}

export default Form_04