'use client';
import { Button, Dropdown, Table } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { button, DatePicker, DropdownItem, DropdownMenu, DropdownTrigger, Select, SelectItem } from '@nextui-org/react';
import { animals } from '../../../components/data/filter-data';
import React from 'react';
import TicketCreateModal from '@/components/modal.bookingticket';
import { Menu, MenuItem } from '@mui/material';
import { FiAlignJustify } from 'react-icons/fi';
import DepositOrder from '@/components/modal.dialogorder.tsx/depositOrder';
import DetailOrder from '@/components/modal.dialogorder.tsx/detailOrder';
import { getScheduleByTravelDate, getSeatInTicketPage } from '@/app/api/brand/ticket-api/ticketApi';
import { ApprovalOrder, getDateAndTimeByOrder, getOrderInSchedule, Orders, searchOrderByOrderCode } from '@/app/api/customer/route';
import moment1 from 'moment';
import { UserContext } from '@/app/context/userContext';
import ConfirmPaid from '@/components/modal.dialogorder.tsx/confirmPaid';

const Order = () => {
    const [showDeposit, setShowDeposit] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [showConfirmPaid, setShowConfirmPaid] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<any>('');
    const [schedules, setSchedules] = useState<any>([]);
    const [user, setUser] = useState({} as any);
    const [curSchedule, setSchedule] = useState<any>([]);
    const [seatTickets, setSeatTickets] = useState<any>([]);
    const [dateFormat, setDateFormat] = useState<any>([]);
    const [item, setItem] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
    const [curItemClick, setCurItemClick] = useState<any>(null);


    useEffect(() => {
        if (user.customerId) loadData();
    }, [user]);

    const loadData = async () => {
        //   const res = await getAllShuttles(user.customerId);
        //   setItems(res?.data);
    };

    useEffect(() => {
        if (user.customerId) onChangeDate;
    }, [user]);

    useEffect(() => {
        let user: any = localStorage.getItem('user');
        console.log(user);
        if (!user) {
            setUser(null);
        }
        user = JSON.parse(user);
        setUser(user);
    }, []);

    const onChangeDate = async (date: any) => {
        setSelectedDate({ ...selectedDate, dateStart: date });
        const res = await getScheduleByTravelDate(date, user.customerId);
        setSchedules(res?.data || []);
        // console.log(schedules)
    };

    const onChangeSchedule = async (e: any) => {
        setSchedule(e?.target.value || curSchedule);
        const res = await getOrderInSchedule(e.target.value);
        // console.log("fdfdfdfd",res?.data?.orderDate)
        // // setDateFormat.map((res?.date.orderDate)=>{moment(date).format("HH:mm dd/MM/yyyy")});
        // setDateFormat(res?.data?.orderDate.map((date:any)=>{
        //     moment1(date).format("HH:mm DD/MM/yyyy")
        // }))
        const formatDate = res?.data.map((order: any) => {
            order.orderDate = moment1(order?.orderDate).format('HH:mm DD/MM/yyyy');
            return order;
        });
        console.log('data', formatDate);
        setSeatTickets(formatDate || []);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>, itemChild: any) => {
        setAnchorEl(event.currentTarget);
        setCurItemClick(itemChild)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const searchOrder = async (orderCode: any) => {
        const res = await searchOrderByOrderCode(item?.orderCode);
        getDateAndTime(res?.data?.orderId)
        console.log('searchOrder', res);
        setOrders(res?.data)
    };

    const handleOpenModalDetail = () => {
        setShowDetail(true);
        setItem({ ...curItemClick });
        searchOrder(item?.orderCode)
        console.log("orders",orders)
        console.log("itemChild",curItemClick)
    };

    const handleOpenModalConfirmPaid = () => {
        setShowConfirmPaid(true);
        setItem({ ...curItemClick });
        searchOrder(item?.orderCode)
        console.log("orders",orders)
        console.log("itemChild",curItemClick)
    };

    const handleOpenModalDeposit = () => {
        setShowDeposit(true);
        setItem({ ...curItemClick });
    };

    const approvalOrder = async  (orderId: any) => {
        const res = await ApprovalOrder(item?.id);
        console.log('approvalOrder', res);
        setOrders(res?.data)
    };

    const handleApprovalOrder = () => {
        approvalOrder(item?.id)
        setItem({ ...curItemClick });
    };

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
            // setNotifi({ message: "Ngày hủy đơn không hợp lệ!", type: "error" });
            setTimeValidToCancelBooking(false)
        }
        else if (res?.data?.date == dateCancelBooking && res?.data?.time < timeCancelBooking) {
            // setNotifi({ message: "Chỉ được hủy đơn đặt vé trước 2 tiếng trước giờ xe chạy!", type: "error" });
            setTimeValidToCancelBooking(false)
        }
        else {
            setTimeValidToCancelBooking(true)
        }
    }




    return (
        <>
            <div className="w-full mt-3">
                <div className="border-2 rounded-t-lg shadow-lg mx-10 bg-white px-14 py-4">
                    <div className="flex justify-between items-center border-1 h-20 p-6 bg-[#F0F0EE] rounded-lg mb-[15px]">
                        <form action="" className="flex">
                            <div>
                                <div className="flex space-x-3 ">
                                    <DatePicker
                                        className="w-[300px]"
                                        label="Ngày"
                                        value={selectedDate?.dateStart}
                                        onChange={(date) => onChangeDate(date)}
                                    />
                                    <Select
                                        label="Lịch trình"
                                        className="w-[300px]"
                                        onChange={(e) => onChangeSchedule(e)}
                                    >
                                        {schedules.map((schedule: any) => (
                                            <SelectItem key={schedule.id}>{schedule.routeName}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div></div>
                        </form>
                    </div>
                    <div>
                        {/* <div className="font-semibold ">Tổng tiền: </div> */}
                        <Table aria-label="Example table with dynamic content">
                            <thead>
                                <tr>
                                    <th className="w-[15%] text-center">Mã đơn đặt</th>
                                    <th className="w-[10%] text-center">Vé</th>
                                    <th className="w-[15%] text-center">Ngày đặt</th>
                                    <th className="w-[10%] text-center">Tổng tiền</th>
                                    <th className="w-[10%] text-center">Tiền cọc</th>
                                    <th className="w-[15%] text-center">Trạng thái đơn đặt</th>
                                    <th className="w-[15%] text-center">Thanh toán</th>
                                    <th className="w-[10%] text-center">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seatTickets?.map((seatTicket: any) => {
                                    return (
                                        <tr key={seatTicket?.id}>
                                            <td className="w-[15%] text-center">{seatTicket?.orderCode}</td>
                                            <td className="w-[10%] text-center">{seatTicket?.listSeat}</td>
                                            <td className="w-[15%] text-center">{seatTicket?.orderDate}</td>
                                            <td className="w-[10%] text-center">{seatTicket?.totalPrice}</td>
                                            <td className="w-[10%] text-center">{seatTicket?.deposit}</td>
                                            <td className="w-[15%] text-center">
                                                <div className="rounded-lg border-4 h-[34px] text-center py-1 w-[270px] px-7 text-cyan-900 ">
                                                    {seatTicket?.orderStatus}
                                                </div>
                                            </td>
                                            <td className="w-[15%] text-center">
                                                <div className="rounded-lg border-4 h-[34px] py-1 w-[270px] px-7 text-cyan-900 ">
                                                    {seatTicket?.paymentStatus}
                                                </div>
                                            </td>
                                            <td className="w-[10%] text-center">
                                                <div>
                                                    <Button
                                                        id="demo-positioned-button"
                                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                    
                                                        onClick={(event)=>{handleClick(event,seatTicket)}}
                                                    >
                                                        <FiAlignJustify />
                                                    </Button>
                                                    <Menu
                                                        id="demo-positioned-menu"
                                                        aria-labelledby="demo-positioned-button"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'left',
                                                        }}
                                                        key={seatTicket.id}
                                                    >
                                                        <MenuItem onClick={() => handleApprovalOrder()}>
                                                            Duyệt đơn đặt
                                                        </MenuItem>
                                                        <MenuItem onClick={handleClose}>Hủy đơn đặt</MenuItem>
                                                        <MenuItem onClick={()=>{
                                                            // setItem(seatTicket)
                                                            handleOpenModalDetail()}}>
                                                            Chi tiết đơn đặt
                                                        </MenuItem>
                                                        <MenuItem onClick={()=>{
                                                            // setItem(seatTicket)
                                                            handleOpenModalConfirmPaid()}}>
                                                            Xác nhận thanh toán
                                                        </MenuItem>
                                                        <MenuItem onClick={()=>{
                                                            setItem(item)
                                                            handleOpenModalDeposit()}}>
                                                            Nhập tiền cọc
                                                        </MenuItem>
                                                    </Menu>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <DepositOrder 
                            showModalDepositOrder={showDeposit} 
                            setShowModalDepositOrder={setShowDeposit}
                            item={item}
                            setItems={setSeatTickets} />

                        <DetailOrder
                            showModalDetailOrder={showDetail}
                            setShowModalDetailOrder={setShowDetail}
                            item={item}
                            orders={orders}
                            timeValidToCancelBooking={timeValidToCancelBooking}
                            // setItem={setSeatTickets}
                        />
                        <ConfirmPaid
                            showModalConfirmPaid={showConfirmPaid}
                            setShowModalDConfirmPaid={setShowConfirmPaid}
                            item={item}
                            // orders={orders}
                            setItems={setSeatTickets}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
