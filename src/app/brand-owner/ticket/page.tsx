'use client';
import { Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { button, DatePicker, Select, SelectItem } from '@nextui-org/react';
import { animals } from '../../../components/data/filter-data';
import React from 'react';
import TicketCreateModal from '@/components/modal.bookingticket';
import ScheduleCreateModal from '@/components/modal.editschedule';
import { getEmptySeat, getScheduleByTravelDate, getSeatInTicketPage } from '@/app/api/brand/ticket-api/ticketApi';
import shuttle from '../shuttle/page';
import { MdModeEdit } from "react-icons/md";

const Ticket = (props: any) => {
    const [showTiketCreate, setShowTiketCreate] = useState<boolean>(false);
    const [showScheduleCreate, setShowScheduleCreate] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [curSchedule, setSchedule] = useState<any>([]);
    const [schedules, setSchedules] = useState<any>([]);
    const [selectedDate, setSelectedDate] = useState<any>('');
    const [seatTickets, setSeatTickets] = useState<any>([]);
    const [booked, setBooked] = useState<boolean>();
    const [item, setItem] = useState<any>(null);
    const [emptyTicket, setEmptyTicket] = useState<any>(null);


    const ticketStatus:any []=[
        {id:"ALL",name:"Tất cả"},
        {id:"ORDERED",name:"Đã đặt"},
        {id:"PENDING",name:"Chờ duyệt"},
        {id:"INITIALIZED",name:"Chưa đặt"}
      ];

    const statusColors:any = {
        ORDERED: 'red',
        INITIALIZED: 'green',
        PENDING: '#F59E08'
    };
     
        

    const onChangeDate = async (date:any) => {
        setSelectedDate({ ...selectedDate, dateStart: date });
        const res = await getScheduleByTravelDate(date, user.customerId);
        setSchedules(res?.data || []);
        // console.log(schedules)

    };

    const onChangeSchedule = async (e: any) => {
        setSchedule(e?.target.value || curSchedule);
        const res = await getSeatInTicketPage(e.target.value)
        console.log(seatTickets)
        setSeatTickets(res?.data || [])

    };


    const empty_seat = async()=>{
        const res = await getEmptySeat(selectedDate?.dateStart,curSchedule )
        setEmptyTicket(res)
        console.log("emptyseat", res);
    }

    useEffect(() => {
        empty_seat()
    }, [curSchedule,selectedDate, seatTickets ]);

    useEffect(() => {
        if (user.customerId) loadData();
    }, [user]);

    const loadData = async () => {
        //   const res = await getAllShuttles(user.customerId);
        //   setItems(res?.data);
    };

    useEffect(() => {
        if(user.customerId)
        onChangeDate
      }, [user]);

    useEffect(() => {
        let user: any = localStorage.getItem("user");
        console.log(user);
        if (!user) {
          setUser(null);
        }
        user = JSON.parse(user);
        setUser(user);
      }, []);


    return (
        <>
            <div className="w-full mt-3">
                <div className="border-2 rounded-t-lg shadow-lg mx-10 bg-white px-14 py-4">
                    <div className="flex justify-between items-center border-1 h-20 p-6 bg-[#F0F0EE] rounded-lg">
                        <form action="" className="flex">
                            <div>
                                <div className="flex space-x-3 ">
                                    <DatePicker
                                        className="w-[300px]"
                                        label="Ngày"
                                        value={selectedDate?.dateStart}
                                        onChange={(date) => onChangeDate(date)}/>
                                    <Select label="Lịch trình"  className="w-[300px]"
                                    onChange={(e) => onChangeSchedule(e)}>
                                        {schedules.map((schedule:any) => (
                                            <SelectItem key={schedule.id}>{schedule.routeName}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div></div>
                        </form>
                    </div>
                    <div>
                        <div className="font-semibold p-2 ">Số vé trống:{emptyTicket?.seatEmpty || ''}</div>
                        <Table aria-label="Example table with dynamic content">
                            <thead>
                                <tr>
                                    <th className='text-center'>Vé</th>
                                    <th className='text-center'>Giá</th>
                                    <th className='text-center'>Trạng thái vé</th>
                                    <th className='text-center'>Thông tin khách hàng</th>
                                    <th >Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {seatTickets?.map((seatTicket:any) => {
                                    return (
                                        <tr key={seatTicket?.id}>
                                            <td className='text-center'>{seatTicket?.seatName}</td>
                                            <td className='text-center'>Giá vé: {seatTicket?.price}
                                                <div>Tiền cơm: {seatTicket.eatingFee}</div>
                                            </td>
                                            <td className='w-[20%] text-center'>
                                                <div className="rounded-lg border-4 h-[34px] py-1 w-[220px] px-7 text-cyan-900 "
                                                
                                                >{seatTicket.statusTicket}</div>      
                                            </td>
                                            <td className='text-center'>{seatTicket?.customerName}
                                                <div>{seatTicket?.customerPhone}</div>
                                            </td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    className="mx-3 mr-[15px] "
                                                    onClick={() => {
                                                        setItem(seatTicket)
                                                        setShowTiketCreate(true);
                                                    }}
                                                >
                                                   <MdModeEdit />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <TicketCreateModal
                            showModalTicketCreate={showTiketCreate}
                            setShowModalTicketCreate={setShowTiketCreate} 
                            item={item}
                            curSchedule={curSchedule}
                            seatTickets={seatTickets}
                             />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ticket;

