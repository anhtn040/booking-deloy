// import { Input, RadioGroup } from '@nextui-org/react';
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from 'react';
import { Form } from 'react-bootstrap';
import '../../app/style/customer.css';
// import { FormControlLabel, Radio } from '@mui/material';

interface Ipros {
    formData: any;
    handlePrevStep: any;
    handleNextStep: any;
    pickUps: any;
    delis: any;
    setParKingChoosenIds: any;
    parKingChoosenIds: any;
}
interface location {
    time: string;
    value: string;
}

const locations = [
    { time: '1', value: 'diem1' },
    { time: '2', value: 'diem12' },
    { time: '3', value: 'diem13' },
    { time: '4', value: 'diem14' },
    { time: '15', value: 'diem15' },
    { time: '16', value: 'diem16' },
    { time: '17', value: 'diem17' },
    { time: '18', value: 'diem19' },
    { time: '19', value: 'diem10' },
];

const StepParkingTicket = (props: Ipros) => {
    const { formData, handlePrevStep, handleNextStep, pickUps, delis, setParKingChoosenIds, parKingChoosenIds } = props;

    const onChangeSelectPickUp = (e: any) => {
        console.log('1111111111')
        setParKingChoosenIds([e.target.value, parKingChoosenIds[1]]);
        console.log("parKingChoosenIds", parKingChoosenIds)
    };

    const onChangeSelectDeli = (e: any) => {
        setParKingChoosenIds([parKingChoosenIds[0], e.target.value]);
        console.log("parKingChoosenIds", parKingChoosenIds)
    };
    // const [selected, setSelected] = React.useState("london");
    // const isInvalid = !validOptions.includes(selected);
    return (
        <>
            <Form>
                <div>Điểm đón trả</div>
                <div className="flex justify-around mt-7">
                    <div className="w-[100%]">
                        <div className="text-center text-mb font-bold bg-[#f7f7f7] mb-3 py-3">Điểm đón</div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={parKingChoosenIds[0]}
                            onChange={(e) => onChangeSelectPickUp(e)}
                        >
                            {pickUps.map((location: any) => {
                                return (
                                    <FormControlLabel
                                        value={location.id}
                                        control={<Radio />}
                                        label={location.pickUpTime + '•' + location.pickUpPoint}
                                    />
                                    // <Radio value={location}>{location.dropOffTime} • {location.dropOffPoint}</Radio>
                                );
                            })}
                        </RadioGroup>

                        {/* <p className="text-default-500 text-small">Selected: {selected}</p> */}
                    </div>
                    <div className="w-[2px] bg-gray-300 h-[364px] mx-5"></div>
                    <div className=" w-[100%]">
                        <div className="text-center text-mb font-bold bg-[#f7f7f7] mb-3  py-3 ">Điểm trả</div>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={parKingChoosenIds[1]}
                            onChange={(e) => onChangeSelectDeli(e)}
                        >
                            {delis.map((location: any) => {
                                return (
                                    <FormControlLabel
                                        value={location.id}
                                        control={<Radio />}
                                        label={location.dropOffTime + '•' + location.dropOffPoint}
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
export default StepParkingTicket;
