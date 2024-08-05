'use client';
import { Button, Tab, Table } from 'react-bootstrap';
// import { sSelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { animals } from '../../../components/data/filter-data';
import React from 'react';
import ScheduleCreateModal from '@/components/modal.newSchedule';
import ScheduleEditModal from '@/components/modal.editschedule';
import { getAllRoute } from '@/app/api/brand';
import { getRouteByUserId } from '@/app/api/brand/route-api/routeApi';
import { getScheduleByRoute, getShuttleByRoute } from '@/app/api/brand/schedule-api/scheduleApi';
import { getBus } from '@/app/api/brand/bus-api/apiBus';
import { MenuItem, Select } from '@mui/material';
import { MdModeEdit } from "react-icons/md";

const Schedule = () => {
    const [showScheduleCreate, setShowScheduleCreate] = useState<boolean>(false);
    const [showScheduleEdit, setShowScheduleEdit] = useState<boolean>(false);
    const [user, setUser] = useState({} as any);
    const [item, setItem] = useState<any>(null);
    const [routes, setRoutes] = useState<any>(null);
    const [curRoute, setCurRoute] = useState<any>(null);
    const [schedules, setSchedules] = useState<any>(null);
    const [shuttles, setShutlles] = useState<any>();

    const loadData = async () => {
        const res = await getAllRoute(user.customerId);
        setRoutes(res?.data);
    };

    const onChangeRoute = async (e: any) => {
        setCurRoute(e.target.value);
        const res = await getScheduleByRoute(e.target.value);
        const res1 = await getShuttleByRoute(e.target.value);
        setSchedules(res?.data || []);
        setShutlles(res1?.data || []);
        console.log('schedule', res);
        console.log('shuttle', res1);
        console.log('curRoute', curRoute);

    };

    const onShowModal = (itemChild: any = null) => {
        setShowScheduleEdit(true);
        setItem({ ...itemChild });
    };

    useEffect(() => {
        if (user.customerId) loadData();
    }, [user]);

    useEffect(() => {
        let user: any = localStorage.getItem('user');
        if (!user) {
            setUser(null);
        }
        user = JSON.parse(user);
        setUser(user);
    }, []);

    return (
        <>
            <div>
                <div className="flex justify-between p-2 shadow-xl">
                    <div className="mt-[10px]">
                        <Button variant="secondary" className="w-[100px]" onClick={() => setShowScheduleCreate(true)}>
                            Thêm
                        </Button>
                    </div>

                    <div className="flex space-x-3 ">
                        {/* <Select label="Tuyến" className="w-[300px]"
                        value={curRoute}
                        onChange={(e) => onChangeRoute(e)}>
                            {routes?.map((route: any) => (
                                <SelectItem key={route.id} value={route.id}>
                                    {route.startPoint} - {route.endPoint}
                                </SelectItem>
                            ))}
                        </Select> */}
                        <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={curRoute}
                                    label="Tuyến"
                                    sx={{ minWidth: 250 }}
                                    onChange={(e) => onChangeRoute(e) }>
                                    {routes?.map((route: any) => (
                                        <MenuItem value={route?.id}>
                                            {route.startPoint} - {route.endPoint}
                                        </MenuItem>
                                    ))}
                                </Select>
                    </div>
                </div>

                <div className=" justify-around mt-10">
                    <div className="flex flex-col justify-center items-center ">
                        <Table>
                            <thead>
                                <tr>
                                    <th className="w-[25%] text-center">Xe</th>
                                    <th className="w-[25%] text-center">Giá</th>
                                    <th className="w-[25%] text-center">Thời gian</th>
                                    <th className="w-[25%] text-center">Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules?.map((schedule: any) => {
                                    return (
                                        <tr key={schedule?.id}>
                                            <td className="text-center">
                                                {schedule?.busName}
                                                <br />
                                                <div className="font-bold">Xe {schedule?.seats} chỗ</div>
                                            </td>
                                            <td className="text-center">
                                                Giá vé:
                                                {schedule?.price}đ
                                                <br />
                                                <div>Tiền cơm: {schedule?.eatingFee}đ</div>
                                            </td>
                                            <td className="text-center">
                                                {' '}
                                                Ngày xuất phát:
                                                {schedule?.dateStart}
                                                <br />
                                                <div>Giờ đi: {schedule?.startTime}</div>
                                            </td>

                                            <td className="text-center">
                                                <Button
                                                    // variant="warning"
                                                    className="mx-3"
                                                    onClick={() => {
                                                        // setItem(item)
                                                        onShowModal(schedule);
                                                    }}
                                                >
                                                    {' '}
                                                    <MdModeEdit />
                                                </Button>
                                                {/* <Button
                                                    variant="danger"
                                                    onClick={() => {
                                                        handleDeleteShuttle(item.id);
                                                    }}
                                                >
                                                    {' '}
                                                    Delete
                                                </Button> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <ScheduleEditModal
                            showModalScheduleEdit={showScheduleEdit}
                            setShowModalScheduleEdit={setShowScheduleEdit}
                            item={item}
                            routes={routes}
                            shuttles={shuttles}
                            user={user}
                            curRoute={curRoute}
                        />
                        <ScheduleCreateModal
                            showModalScheduleCreate={showScheduleCreate}
                            setShowModalScheduleCreate={setShowScheduleCreate}
                            item={item}
                            routes={routes}
                            shuttles={shuttles}
                            user={user}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schedule;
