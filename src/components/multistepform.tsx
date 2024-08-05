import { useContext, useEffect, useState } from "react";
import StepTicketList from "./multiStep/stepTicketList";
import StepParkingtList from "./multiStep/stepParkingList";
import StepInfoCustomer from "./multiStep/stepInfoCustomer";
import StepPayment from "./multiStep/stepPayment";
import { createOrder, createPay, getTicketStep } from "@/app/api/customer";
import {
  getAllDropOff,
  getAllPickUp,
} from "@/app/api/brand/parking-api/parkingApi";
import { info } from "console";
import { UserContext } from "@/app/context/userContext";

const stepArray = ["1", "2", "3", "4"];
const initFormData = {
  firstname: "",
  lastname: "",
  agreeToTerms: false,
};
const MultiStepForm = (prop: any) => {
  const { showStepNumber, item, showModalOrderTicket } = prop;
  const [step, setStep] = useState("1");
  const [formData, setFormData] = useState(initFormData);
  const { setNotifi } = useContext(UserContext);


  // step 1
  const [tickets, setTickets] = useState([]);
  const [ticketChoosenIds, setTicketChoosenIds] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // step 2
  const [pickUps, setPickUps] = useState<any>([]);
  const [delis, setDelis] = useState<any>([]);
  const [parKingChoosenIds, setParKingChoosenIds] = useState<any>([null, null]);

  // step 3
  const [infoCus, setInfoCus] = useState<any>({});

  // step 4
  const [paymentType, setPaymentType] = useState();

  const handleNextStep = () => {
    if (step === "1") setStep("2");
    else if (step === "2") setStep("3");
    else if (step === "3") setStep("4");
  };
  const handlePrevStep = () => {
    if (step === "4") setStep("3");
    else if (step === "3") setStep("2");
    else if (step === "2") setStep("1");
  };
  const handleInput = (event: any) => {
    const fieldName = event.target.name;
    let fieldValue;
    if (fieldName === "agreeToTerms") {
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
      alert("error");
    } else {
      setStep("final");
    }
  };

  const loadTicket = async () => {
    if (item?.scheduleId) {
      const res = await getTicketStep(item.scheduleId);
      setTickets(res?.data);
    }
  };

  const loadParking = async () => {
    if (!item?.shuttleId) return;
    const res = await Promise.all([
      getAllPickUp(item?.shuttleId),
      getAllDropOff(item?.shuttleId),
    ]);

    setPickUps(res[0]?.data);
    setDelis(res[1]?.data);
  };

  useEffect(() => {
    setNotifi("okeeeeeeeeeeeeeee");
    loadTicket();
    loadParking();
  }, [item]);

  const handleCreateOrder = async () => {
    if (ticketChoosenIds?.length === 0) return;
    if (!parKingChoosenIds[0] || !parKingChoosenIds[1]) return;
    // console.log(parKingChoosenIds)

    const pickUp = pickUps.find(
      (p: any) => `${p.id}` === `${parKingChoosenIds[0]}`
    );
    const deli = delis.find(
      (p: any) => `${p.id}` === `${parKingChoosenIds[1]}`
    );

    const body = {
      seatId: ticketChoosenIds.map((id: any) => `${id}`),
      scheduleId: item?.scheduleId,
      pickUp: pickUp?.pickUpPoint,
      dropOff: deli?.dropOffPoint,
      customer: {
        fullName: infoCus?.name,
        email: infoCus?.email,
        phoneNumber: infoCus?.phone,
      },
      paymentId: paymentType,
      paidAmount: totalPrice,
      quantityEating: infoCus?.quantity || 0,
    };
    console.log(body);
    if (paymentType === "1") {
      const res: any = await createPay({
        amount: `${totalPrice}`,
        bankCode: "NCB",
      });
      localStorage.setItem('dataCreateOrder', JSON.stringify(body))
      if (res.data) window.open(res.data);
      return;
    }
    const res = await createOrder(body);
    if (!res?.success) {
      setNotifi({message: "Đặt vé thành công", type:"success"})
      MultiStepForm(false)
    }else{
      setNotifi({ message: res?.message, type: "success" });
    }

  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const renderTopStepNumber = () => {
    if (!showStepNumber || step === "final") return null;
    return (
      <section className="mt-2 mb-4 flex justify-between">
        {stepArray.map((item) => (
          <div
            key={item}
            className={`w-8 h-8 flex justify-center items-center border-2 border-gray-600 rounded-full cursor-pointer${
              item === step ? "bg-blue-500" : ""
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
      {step === "1" ? (
        <StepTicketList
          formData={formData}
          handleInput={handleInput}
          handleNextStep={handleNextStep}
          tickets={tickets}
          ticketChoosenIds={ticketChoosenIds}
          setTicketChoosenIds={setTicketChoosenIds}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
      ) : null}

      {step === "2" ? (
        <StepParkingtList
          formData={formData}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          delis={delis}
          pickUps={pickUps}
          parKingChoosenIds={parKingChoosenIds}
          setParKingChoosenIds={setParKingChoosenIds}
        />
      ) : null}
      {step === "3" ? (
        <StepInfoCustomer
          formData={formData}
          handleNextStep={handleNextStep}
          handlePrevStep={handlePrevStep}
          infoCus={infoCus}
          setInfoCus={setInfoCus}
          ticketChoosenIds={ticketChoosenIds}
        />
      ) : null}
      {step === "4" ? (
        <StepPayment
          formData={formData}
          handlePrevStep={handlePrevStep}
          handleSubmit={handleSubmit}
          paymentType={paymentType}
          setPaymentType={setPaymentType}
          handleCreateOrder={handleCreateOrder}
          totalPrice={totalPrice}
          infoCus={infoCus}
          delis={delis}
          pickUps={pickUps}
          parKingChoosenIds={parKingChoosenIds}
          ticketChoosenIds={ticketChoosenIds}
        />
      ) : null}
    </div>
  );
};
export default MultiStepForm;
