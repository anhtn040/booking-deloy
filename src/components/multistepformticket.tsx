import { useContext, useEffect, useState } from 'react';
import StepParkingTicket from './multiStepTicket/stepParkingTicket';
import StepInfoCustomerTicket from './multiStepTicket/stepInfoCustomerTicket';
import { getAllDropOff, getAllPickUp } from '@/app/api/brand/parking-api/parkingApi';
import { UserContext } from '@/app/context/userContext';
import { createOrder } from '@/app/api/customer';
const stepArray = ['1', '2'];
const initFormData = {
    firstname: '',
    lastname: '',
    agreeToTerms: false,
};
const MultiStepFormTicket = (prop: any) => {
    const { showStepNumber, item, curSchedule, seatTickets } = prop;
    const [step, setStep] = useState('1');
    const [formData, setFormData] = useState(initFormData);
    const { setNotifi } = useContext(UserContext);
    const [paymentType, setPaymentType] = useState('');
    const [ticketChoosenIds, setTicketChoosenIds] = useState<any>([]);

    // step 1
    const [pickUps, setPickUps] = useState<any>([]);
    const [delis, setDelis] = useState<any>([]);
    const [parKingChoosenIds, setParKingChoosenIds] = useState<any>([null, null]);

    // step 2
    const [infoCus, setInfoCus] = useState<any>({});

    const handleNextStep = () => {
        if (step === '1') setStep('2');
    };

    const handlePrevStep = () => {
        if (step === '2') setStep('1');
    };

    const handleInput = (event: any) => {
        const fieldName = event.target.name;
        let fieldValue;
        if (fieldName === 'agreeToTerms') {
            fieldValue = event.target.checked;
        } else {
            fieldValue = event.target.value;
        }
        setFormData({
            ...formData,
            [fieldValue]: fieldValue,
        });
    };
    const handleSubmit = () => {
        if (!formData.agreeToTerms) {
            alert('error');
        } else {
            setStep('final');
        }
    };
    // const loadTicket = async () => {
    //     if (item?.scheduleId) {
    //       const res = await getTicketStep(item.scheduleId);
    //       setTickets(res?.data);
    //     }
    // };

    const loadParking = async () => {
        if (!curSchedule) return;
        const res = await Promise.all([
            getAllPickUp(curSchedule), 
            getAllDropOff(curSchedule)]);
        console.log(res);
        setPickUps(res[0]?.data);
        setDelis(res[1]?.data);
    };

    useEffect(() => {
        setNotifi('okeeeeeeeeeeeeeee');
        console.log(curSchedule)
        console.log("item",item)
        // loadTicket();
        loadParking();
    }, [item, curSchedule, seatTickets]);

    const handleCreateOrder = async () => {
        // if (ticketChoosenIds?.length === 0) return;
        console.log("parKingChoosenIds", parKingChoosenIds)
        if (!parKingChoosenIds[0] || !parKingChoosenIds[1]) return;
        // console.log(parKingChoosenIds)

        const pickUp = pickUps.find((p: any) => `${p.id}` === `${parKingChoosenIds[0]}`);
        const deli = delis.find((p: any) => `${p.id}` === `${parKingChoosenIds[1]}`);

        const body = {
            seatId : [item.id],
            scheduleId: curSchedule,
            pickUp: pickUp?.pickUpPoint,
            dropOff: deli?.dropOffPoint,
            customer: {
                fullName: infoCus?.name,
                email: infoCus?.email,
                phoneNumber: infoCus?.phone,
            },
            paymentId: "2",
            paidAmount: item.price,
            quantityEating: infoCus?.quantity || 0,
        };
        console.log(body);
        // if (paymentType === "1") {
        //   const res: any = await createPay({
        //     amount: `${totalPrice}`,
        //     bankCode: "NCB",
        //   });
        //   localStorage.setItem('dataCreateOrder', JSON.stringify(body))
        //   if (res.data) window.open(res.data);
        //   return;
        // }
        const res = await createOrder(body);
        if (!res?.success) {
            alert(res?.message || " ");
            return;
        }
            alert(res?.message || null);
            setNotifi({ message: "Đã đặt thành công", type: "success" });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);
    const renderTopStepNumber = () => {
        if (!showStepNumber || step === 'final') return null;
        return (
            <section className="mt-2 mb-4 flex justify-between">
                {stepArray.map((item) => (
                    <div
                        key={item}
                        className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer${
                            item === step ? 'bg-blue-500' : ''
                        }`}
                        onClick={() => setStep(item)}
                    >
                        {item}
                    </div>
                ))}
            </section>
        );
    };
    return (
        <div className="w-[600px] max-w-full px-6 py-1 mx-auto rounded-lg border-2 border-dotted border-sky-300">
            {renderTopStepNumber()}
            {step === '1' ? (
                <StepParkingTicket
                    formData={formData}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    delis={delis}
                    pickUps={pickUps}
                    parKingChoosenIds={parKingChoosenIds}
                    setParKingChoosenIds={setParKingChoosenIds}
                />
            ) : null}
            {step === '2' ? (
                <StepInfoCustomerTicket
                    formData={formData}
                    handlePrevStep={handlePrevStep}
                    infoCus={infoCus}
                    setInfoCus={setInfoCus}
                    delis={delis}
                    pickUps={pickUps}
                    parKingChoosenIds={parKingChoosenIds}
                    ticketChoosenIds={ticketChoosenIds}
                    handleCreateOrder={handleCreateOrder}
                    
                />
            ) : null}
        </div>
    );
};
export default MultiStepFormTicket;
