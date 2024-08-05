import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { cancelOrder, getDateAndTimeByOrder, OrderDTO } from '../api/customer';
import '../style/customer.css'
import moment1 from 'moment';
import { UserContext } from '../context/userContext';

interface Iprops {
    showOrderDetail: boolean;
    setShowOrderDetail: (value: boolean) => void;
    orders: OrderDTO;
    timeValidToCancelBooking:boolean;
}




const OrderDetailModal = (props: Iprops) => {
    const { showOrderDetail, setShowOrderDetail, orders, timeValidToCancelBooking } = props;
    const { setNotifi } = useContext(UserContext);

    useEffect(() => {
        console.log("okk1",orders);
    }, [orders]);

    const handleSubmit = async () => {
        // getDateAndTime(orders?.orderId)
        const res = await cancelOrder(orders?.orderId)
        console.log(res);
        setNotifi({ message: "Hủy thành công đơn đặt!", type: "success" });
        setShowOrderDetail(false)
        
    };

    return (
        <>
            <Modal size='xl' show={showOrderDetail} onHide={() => setShowOrderDetail(false)} backdrop="static" keyboard={false}>
                <Modal.Header closeButton style={{ border: '0' }}>
                    {/* <Modal.Title className="text-center">Login</Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="w-[900px] h-auto">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-center font-semibold text-lg">Thông tin đơn đặt vé</div>
                                {/* <button>close</button> */}
                            </div>
                            <div className="flex justify-between mx-20">
                            
                                <div className="border rounded-md p-1 shadow-2xl p">
                                    <div className="font-medium text-lg mb-4 text-center">Thông tin đơn đặt</div>
                                    <div className="space-y-7 flex flex-col p-4 justify-center">
                                        <div>Tên nhà xe:  {orders?.brandName} </div>
                                        <div>Số điện thoại nhà xe: {orders?.brandPhone} </div>
                                        <div>Tuyến xe: {orders?.routeName} </div>
                                        <div>Thời gian khởi hành: {orders?.startTime}  ngày {orders?.travelDate}  </div>
                                        <div>Vé đã đặt: {orders?.listSeat} </div>
                                        <div>Ngày đặt vé: {orders?.orderDate} </div>
                                        <div>Trạng thái đơn đặt: {orders?.orderStatus}  </div>
                                        <div>Trạng thái thanh toán: {orders?.paymentStatus} </div>
                                    </div>
                                </div>
                                <div className="border rounded-md p-1 shadow-2xl">
                                    <div className="font-medium text-lg text-center mb-2">Chi tiết</div>
                                    <div className="flex items-center justify-center  row-detail">
                                        <div>Tên </div>
                                        <div>Giá tiền</div>
                                        <div>Số lượng</div>
                                    </div>
                                    <div className="flex items-center  row-detail">
                                        <div>Vé</div>
                                        <div>{orders?.price}</div>
                                        <div>{orders?.quantityTicket}</div>
                                    </div>
                                    <div className="flex items-center row-detail">
                                        <div>Cơm</div>
                                        <div>{orders?.eatingFee}</div>
                                        <div>{orders?.quantityEating}</div>
                                    </div>
                                    {/* <div className="flex items-center border-b-2   row-detail">
                                        <div>Tiền giảm giá</div>
                                        <div></div>
                                    </div> */}
                                    <div className="flex items-center  row-detail">
                                        <div>Tổng tiền</div>
                                        <div>{orders?.totalPrice}</div>
                                    </div>
                                    <div className="flex items-center  row-detail">
                                        <div>Tiền cọc</div>
                                        <div>{orders?.deposit}</div>
                                    </div>
                                    <div className="flex items-center  row-detail">
                                        <div>Số tiền còn lại</div>
                                        <div>{orders?.restMoney}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="bg-green-600 text-cyan-50"
                                disabled={timeValidToCancelBooking}
                                onClick={() => handleSubmit()}>Hủy vé</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};
export default OrderDetailModal;
function setNotifi(arg0: { message: string; type: string; }) {
    throw new Error('Function not implemented.');
}

