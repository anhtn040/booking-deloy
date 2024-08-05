// import { Radio, RadioGroup } from "@nextui-org/react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import "../../app/style/customer.css"
import { useState } from "react";
interface Ipros {
    formData: any;
    handleSubmit: any
    handlePrevStep: any
    paymentType:any,
    setPaymentType:any
    handleCreateOrder:any
    totalPrice:any
    infoCus:any
    pickUps:any
    delis:any
    parKingChoosenIds:any
    ticketChoosenIds:any
}
const StepPayment = (props: Ipros) => {
    const { formData, handleSubmit, handlePrevStep ,paymentType,setPaymentType,handleCreateOrder,totalPrice,infoCus,pickUps,delis,parKingChoosenIds,ticketChoosenIds} = props;
    const [infoRoute, setInfoRoute] = useState([null,null])

    const onChangeSelect = (e:any)=>{
        setPaymentType(e.target.value)
      }



    return (
        <>
            <h4 className="font-semibold text-center">Kiểm tra thông tin, thanh toán</h4>
            <div className="flex">
                <div className="flex flex-col border rounded-sm p-8 w-[550px]">
                    <div className="text-xl text-center font-semibold mb-4">Phương thức thanh toán</div>
                    <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e)=>onChangeSelect(e)}
            >
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Thanh toán tại nhà xe"
                  />
                  {/* <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label="Cọc tiền (60% tổng tiền hóa đơn)"
                  /> */}
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Thanh Toán online"
                  />
                  </RadioGroup>

                    {/* <RadioGroup aria-label="Select an option" className="flex flex-col space-y-4">
                        <Radio value="2" >Thanh toán tại nhà xe</Radio>
                        <Radio value="3" >Cọc tiền (60% tổng tiền hóa đơn)</Radio>
                        <Radio value="1" >Thanh Toán online</Radio>
                    </RadioGroup> */}
                    {/* loading */}
                </div >
            </div >
            <div className="flex flex-col border rounded-sm p-8 w-[550px]">
                <div className="text-xl text-center font-semibold mb-4">Thông tin chuyến đi</div>
                <div className="space-y-4 p-2 border-b-2 mb-6">
                    <div>Hành khách: {infoCus.name}</div>
                    <div>Số điện thoại: {infoCus.phone}</div>
                    <div>Email: {infoCus.email}</div>
                </div>

                <div className="space-y-4">
                    {/* <div>Nhà xe: BRANDNAME</div> */}
                    <div>Điểm đón (dự kiến):{pickUps?.parKingChoosenIds}</div>
                    <div>Điểm trả (dự kiến):{delis?.parKingChoosenIds}</div>
                    <div>Vé đã đặt: {ticketChoosenIds?.length || 0}</div>
                    <div>Số phần ăn: {infoCus?.quantity || 0}</div>
                </div>
            </div>
            <div className="info-panel flex mt-[20px]">
                <button className="button-back" onClick={handlePrevStep}>&#60; Quay lại</button>
                <div className="total-price ">
                    <p>Tổng cộng:</p>
                    <div>{totalPrice} </div>
                </div>
                <button className="button-consider" style={{ 'background': '#7bc47f' }} onClick={handleCreateOrder}>Đặt vé</button>
            </div >
        </>
    )
}
export default StepPayment;