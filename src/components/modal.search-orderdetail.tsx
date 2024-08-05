'use client'
import { getDateAndTimeByOrder, OrderDTO, searchOrderByOrderCode } from "@/app/api/customer";
import { UserContext } from "@/app/context/userContext";
import OrderDetailModal from "@/app/customer/modal.orderdetail";
import { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment1 from 'moment';
import { DateAndTime } from "@/app/api/customer";

interface Iprops {
    showModal: boolean;
    setShowModal: (value: boolean) => void
}
function SearchOrderDetailModal(props: Iprops) {
    const { showModal, setShowModal } = props;
    const [orderCode, setOrderCode] = useState<string>("")
    const [validated, setValidated] = useState(false);
    const [dateandtime, setDateAndTime] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false)
    const { setNotifi } = useContext(UserContext);
    const [timeValidToCancelBooking, setTimeValidToCancelBooking] = useState<boolean>(false)
    const today = new Date();

    const getDateAndTime = async (orderId:any) =>{
        const res = await getDateAndTimeByOrder(orderId)
        console.log("date", res)
        let dateCancelBooking = moment1(today).format("yyyy MM DD")
        console.log(dateCancelBooking)
        let timeCancelBooking = moment1(today).add(2, 'hours').format('HH:mm')
        console.log(timeCancelBooking)
        if (res?.data?.date < dateCancelBooking) {
            setTimeValidToCancelBooking(false)
        }
        else if (res?.data?.date == dateCancelBooking && res?.data?.time < timeCancelBooking) {
            setTimeValidToCancelBooking(false)
        }
        else {
            setTimeValidToCancelBooking(true)
        }
    }

    const handleSubmit = async (orderCode:any) => {
        if (!orderCode) {
            setNotifi({ message: "Mã đơn đặt trống!", type: "error" });
        }
        else {
            const res = await searchOrderByOrderCode(orderCode)
            console.log("res",res)
            if(res?.success){
                setOrders(res?.data)
                getDateAndTime(res?.data?.orderId)
                setShowModal(false)
                setShowModalDetail(true)
            }
            else{
                console.log("Mã sai")
                setNotifi({ message: "Mã đơn đặt không tồn tại!", type: "error" });
                setOrderCode("")
            }
            
        }
    };

    // useEffect(() => {
    //     const orderCode = "";
    //     setOrders(orderCode);
    // }, [orders]);
    
    return (
        <>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">Tra cứu đơn đặt vé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form validated={validated}>

                        <Form.Group className="mb-3">
                            <Form.Label>Mã đơn đặt</Form.Label>
                            <Form.Control type="text" placeholder="Type order code"
                                value={orderCode}
                                onChange={(e) => setOrderCode(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Huỷ
                            </Button>
                            <Button variant="primary" onClick={() => handleSubmit(orderCode)}>Tra cứu</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <OrderDetailModal
                showOrderDetail={showModalDetail}
                setShowOrderDetail={setShowModalDetail}
                orders={orders}
                timeValidToCancelBooking={timeValidToCancelBooking}
            />
        </>
    )
}
export default SearchOrderDetailModal;


