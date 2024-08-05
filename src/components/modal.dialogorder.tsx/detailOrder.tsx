import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import '../../app/style/customer.css'
import { cancelOrder, OrderDTO, searchOrderByOrderCode } from '@/app/api/customer/route';
import { UserContext } from '@/app/context/userContext';

interface IProps {
    showModalDetailOrder: boolean;
    setShowModalDetailOrder: (value: boolean) => void;
    // seatTickets:any;
    item: any;
    orders: OrderDTO;
    timeValidToCancelBooking:boolean;
    // setItem:Orders;
}

function DetailOrder(props: IProps) {
    const [expected, setExpected] = useState<string>('');
    const { setNotifi } = useContext(UserContext);
    const [route, setRoute] = useState<string>('');
    const { showModalDetailOrder, setShowModalDetailOrder, item, orders, timeValidToCancelBooking } = props;
    // const [deposit, setDeposit] = useState<any>(item?.deposit || "");
    // const handleSubmit = () => {};

    // const handleCloseModal = () => {
    //     setStartPoint(''), setExpected(''), setRoute(''), setShowModalDetailOrder(false);
    // };

    const handleSubmit = async () => {
        // getDateAndTime(orders?.orderId)
        const res = await cancelOrder(orders?.orderId)
        console.log(res);
        setNotifi({ message: "Hủy thành công đơn đặt!", type: "success" });
        setShowModalDetailOrder(false)


    };

    useEffect(() => {
        console.log('item', item);
        console.log('timeValidToCancelBooking', timeValidToCancelBooking);

        // searchOrder(item?.orderCode)
    }, [item, timeValidToCancelBooking]);

    return (
        <>
            <Modal
                size="xl"
                show={showModalDetailOrder}
                onHide={() => setShowModalDetailOrder(false)}
                backdrop="static"
                keyboard={false}
            >
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
}

export default DetailOrder;
