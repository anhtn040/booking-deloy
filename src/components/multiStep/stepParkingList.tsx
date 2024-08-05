import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
// import { Input, Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";
import { Form } from "react-bootstrap";

interface Ipros {
  formData: any;
  handlePrevStep: any;
  handleNextStep: any;
  pickUps: any;
  delis: any;
  setParKingChoosenIds:any
  parKingChoosenIds:any
}

const StepParkingtList = (props: Ipros) => {
  const { formData, handlePrevStep, handleNextStep, pickUps, delis,setParKingChoosenIds,parKingChoosenIds } = props;

  const onChangeSelectPickUp = (e:any)=>{
    console.log([e.target.value,parKingChoosenIds[1]])
    setParKingChoosenIds([e.target.value,parKingChoosenIds[1]])
  }

  const onChangeSelectDeli = (e:any)=>{
    setParKingChoosenIds([parKingChoosenIds[0],e.target.value])
  }

  return (
    <>
      <Form>
        <div>Điểm đón trả</div>
        <div className="flex justify-around mt-7">
          <div className="w-[100%]">
            <div className="text-center text-mb font-bold bg-[#f7f7f7] mb-3 py-3">
              Điểm đón
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={parKingChoosenIds[0]}
              onChange={(e)=>onChangeSelectPickUp(e)}
            >
              {pickUps.map((location: any) => {
                return (
                  <FormControlLabel
                    value={location.id} 
                    control={<Radio />}
                    label={location.pickUpTime + "•" + location.pickUpPoint}
                  />
                  // <Radio value={location}>{location.dropOffTime} • {location.dropOffPoint}</Radio>
                );
              })}
            </RadioGroup>

            {/* <p className="text-default-500 text-small">Selected: {selected}</p> */}
          </div>
          <div className="w-[2px] bg-gray-300 h-[364px] mx-5"></div>
          <div className=" w-[100%]">
            <div className="text-center text-mb font-bold bg-[#f7f7f7] mb-3  py-3 ">
              Điểm trả
            </div>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={parKingChoosenIds[1]}
              onChange={(e)=>onChangeSelectDeli(e)}
            >
              {delis.map((location: any) => {
                return (
                  <FormControlLabel
                    value={location.id} 
                    control={<Radio />}
                    label={location.dropOffTime + "•" + location.dropOffPoint}
                  />
                  // <Radio value={location}>{location.dropOffTime} • {location.dropOffPoint}</Radio>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        <div className="w-[550px] bg-gray-300 h-[2px] mb-[20px]"></div>

        <div className="info-panel flex mb-[20px]">
          <button className="button-back" onClick={handlePrevStep}>
            &#60; Quay lại
          </button>
          <div className="total-price"></div>
          <button className="button-next " onClick={handleNextStep}>
            Tiếp tục
          </button>
        </div>
      </Form>
    </>
  );
};
export default StepParkingtList;
