import React from 'react'
const Form_01 = (props: any) => {

  return (
    <>
      <div className="py-[50px]">
        <p className="text-[20px] font-[500] text-[#315B3F]">
          What type of vehicle creation do you want?
        </p>
        <div className="pt-[20px] flex flex-col gap-[10px] w-[70%]">
          <div
            onClick={() => props.handleIsSingle(true)}
            className={`${props.answers.isSingle ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
          >
            Single Asset
          </div>
          <div
            onClick={() => props.handleIsSingle(false)}
            className={`${!props.answers.isSingle ? "border-[2px]" : "border"
              } cursor-pointer text-[15px] font-[400] text-[#315B3F] border-[#315B3F] rounded-[8px] p-[10px]`}
          >
            Multi Asset
          </div>
        </div>
      </div>
      <div>
        {" "}
        <button
          onClick={() => {
            props.answers.isSingle ? props.handleQuestions(true, 2) : props.handleQuestions(true, 34)

          }}
          type="button"
          className=" border bg-[#315B3F] text-white p-[5px_20px] rounded-[5px]"
        >
          Next
        </button>
      </div>

    </>

  )
}

export default Form_01