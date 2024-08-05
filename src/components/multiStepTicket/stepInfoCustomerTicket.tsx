import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";


interface Ipros {
    formData: any;
    handlePrevStep: any
    handleCreateOrder:any
    pickUps:any
    delis:any
    parKingChoosenIds:any
    infoCus:any
    setInfoCus:any
    ticketChoosenIds:any
  }
const StepInfoCustomerTicket = (props: Ipros) => {
    const { formData, handlePrevStep, handleCreateOrder,infoCus,setInfoCus,ticketChoosenIds, parKingChoosenIds } = props;
    const [isSelected, setIsSelected] = useState(false)

    const onChange = (key: string, value: string) => {
        const newInfo = { ...infoCus };
        newInfo[key] = value;
        setInfoCus(newInfo);
      };

    const handleChangeQuantity = (about: number)=>{
        if((+infoCus.quantity || 0) + about < 0) return
        if((+infoCus.quantity || 0) + about > ticketChoosenIds?.length) return

        setInfoCus({...infoCus,quantity :(+infoCus.quantity || 0) + about})

    }


    return (
        <>
            <div className="font-bold">Nhập thông tin</div>
            <div className="mx-[148px] py-4">
                <div className="flex flex-col justify-center space-y-3">

                    <label>Họ tên</label>
                    <Input placeholder="Nguyen Van A" value={infoCus.name} onChange={(e)=> {onChange('name',e.target.value)}}/>
                    <label>Số điện thoại</label>
                    <Input placeholder="090890899" value={infoCus.phone} onChange={(e)=> {onChange('phone',e.target.value)}}/>
                    <label>Email để nhận thông tin vé</label>
                    <Input placeholder="example@gmail.com" value={infoCus.email} onChange={(e)=> {onChange('email',e.target.value)}}/>

                    {/* <div className="flex items-center"> */}
                    <div className="flex flex-col gap-2">
                        <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                            Số lượng
                        </Switch>
                        <p className="text-small text-default-500">Selected: {isSelected ? "true" : "false"}</p>
                    </div>
                    {/* ischecked */}
                    <div className="quantity-selector">
                        <button>
                            <AiOutlineMinusCircle onClick={()=> handleChangeQuantity(-1)}/>
                        </button>
                        <input placeholder="Quantity" readOnly value={infoCus.quantity} />
                        <button >
                            <AiOutlinePlusCircle onClick={()=> handleChangeQuantity(1)} />
                        </button>
                    </div >
                </div >
            </div >
            <div className="w-[550px] bg-gray-300 h-[2px] mb-[20px]"></div>

                <div className="info-panel flex mb-[20px]">
                    <button className="button-back" onClick={handlePrevStep}>&#60; Quay lại</button>
                    <div className="total-price">
                    </div>
                    <button className="button-next " onClick={handleCreateOrder}>
                        Đặt vé
                    </button>
                </div >
        </>
    )
}
export default StepInfoCustomerTicket;