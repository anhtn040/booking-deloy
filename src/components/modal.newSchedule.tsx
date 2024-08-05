import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Input, TimeInput } from '@nextui-org/react';
import { Time, parseAbsoluteToLocal } from '@internationalized/date';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { animals, bustypes } from '../components/data/filter-data';
import {
    createSchedule,
    getBusForDropDownByTravelDate,
    getBusForDropDownByTravelDateForUpdate,
    getShuttleByRoute,
    Schedule,
    updateSchedule,
} from '@/app/api/brand/schedule-api/scheduleApi';
import { getBus } from '@/app/api/brand/bus-api/apiBus';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { UserContext } from '@/app/context/userContext';
import { convertDateObjToDateText } from '@/app/util';

interface IProps {
    showModalScheduleCreate: boolean;
    setShowModalScheduleCreate: (value: boolean) => void;
    item: any;
    routes: any;
    shuttles: any;
    user: any;
}

function ScheduleCreateModal(props: IProps) {
    const [startPoint, setStartPoint] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    const [routes1, setRoutes] = useState<string>('');
    const { showModalScheduleCreate, setShowModalScheduleCreate, item, routes, shuttles, user } = props;
    const [saveSchedule, setSaveSchedule] = useState<any>();
    const [buses, setBuses] = useState<any>();
    const [user1, setUser] = useState<any>();
    const [routeId, setRouteId] = useState<any>(null);
    const [shuttleId, setShuttleId] = useState<any>(null);
    const [busId, setBusId] = useState<any>(null);
    const { setNotifi } = useContext(UserContext);
    const [listDateStarts, setListDateStart] = useState<any>([]);
    const [shuttleReturnId, setShuttleReturnId] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [listDateStartReturn, setListDateStartReturn] = useState<any>([]);


    useEffect(() => {
        if (user.customerId) busDropDown();
        console.log('listDateStarts', listDateStarts);

    }, [saveSchedule, listDateStarts]);

    const busDropDown = async () => {
        const res = await getBusForDropDownByTravelDate(user.customerId, convertDateObjToDateText(listDateStarts[0]), convertDateObjToDateText(listDateStarts[listDateStarts.length-1]) );
        setBuses(res);
        console.log('buses', buses);
    };

    useEffect(() => {
        console.log('item', item);
        console.log('routes', routes);
        console.log('shuttle', shuttles);
        console.log('user1', user1);
        setRoutes({ ...routes });
        setUser({ ...user });

        // if (!item?.dateStart) return;
        // const date = new Date(`${item.dateStart} ${item.dateEnd} `);
        // setSaveSchedule({
        //     ...item,
        //     dateStart: parseDate(item.dateStart),
        //     dateEnd: parseDate(item.dateEnd),
        // });
        console.log('saveSchedule', saveSchedule);
    }, [item, user, routes, shuttles]);

    const handleSubmit = async () => {
        const newListDate = listDateStarts.map((item: any) => (convertDateObjToDateText(item) 
        ))
        console.log("newListDate", newListDate);
        

        const body={
            busId:busId,
            shuttleId:shuttleId,
            listDateStart:newListDate,
            listDateStartReturn:[],
            shuttleReturnId:'',
            price:saveSchedule.price,
            eatingFee:saveSchedule.eatingFee
        }

        console.log("body",body)

        const res = await createSchedule(body)
        setNotifi({message:"Tạo lịch trình thành công!", type:"success"})
        setShowModalScheduleCreate(false)
    };

    const handleCloseModal = () => {
        setStartPoint(''), setExpected(''), setShowModalScheduleCreate(false);
    };

    const onChangeDate = (value: any, idx: any) => {
        const newList = [...listDateStarts];
        newList[idx] = value;
        setListDateStart(newList);
    };

    const handleAddDate = () => {
        setListDateStart([...listDateStarts, null]);
    };

    return (
        <>
            <Modal show={showModalScheduleCreate} onHide={() => handleCloseModal()} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin lịch trình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="space-y-3">
                        <div>
                            <div className="font-bold">Chọn tuyến đường</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={routeId}
                                    label="Điểm đi"
                                    onChange={(e) => setRouteId(e.target.value)}
                                >
                                    {routes?.map((route: any) => (
                                        <MenuItem value={route?.id}>
                                            {' '}
                                            {route.startPoint} - {route.endPoint}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="">
                            <div className="font-bold">Ngày giờ xe chạy</div>
                            <div className="border-1 p-2">
                                {/* <TimeInput
                                    granularity="second"
                                    label="Second"
                                    value={saveSchedule?.startTime}
                                    onChange={(e) => setSaveSchedule({ ...saveSchedule, startTime: e })}
                                /> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={shuttleId}
                                    // label="Điểm đi"
                                    sx={{ minWidth: 200 }}
                                    onChange={(e) => setShuttleId(e.target.value)}
                                >
                                    {shuttles?.map((shuttle: any) => (
                                        <MenuItem value={shuttle?.id}>{shuttle.startTime}</MenuItem>
                                    ))}
                                </Select>
                                <div className="w-full max-w-xl flex flex-row gap-4 mt-2">
                                    <Form className="flex flex-col space-y-2">
                                        <div className="font-bold">Chọn ngày tạo lịch trình</div>
                                        {listDateStarts.map((listDateStart: any, idx: any) => (
                                            <div className="w-full max-w-xl flex flex-row items-start gap-3" key={idx}>
                                                <DatePicker
                                                    className="max-w-[284px]"
                                                    label="Date"
                                                    value={listDateStart}
                                                    name={'date' + idx} 
                                                    onChange={(e) => onChangeDate(e , idx)}
                                                />
                                            </div>
                                        ))}
                                        <Button
                                            variant="primary"
                                            style={{ width: '20%' }}
                                            onClick={() => handleAddDate()}
                                        >
                                            Add
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Chọn xe</div>
                            <div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={busId}
                                    label="Chọn xe"
                                    sx={{ minWidth: 200 }}
                                    onChange={(e) => setBusId(e.target.value)}
                                >
                                    {buses?.map((buse: any) => (
                                        <MenuItem value={buse?.id}> {buse.name}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Giá vé</div>
                            <div className="flex ">
                                <div className="w-[45%]">
                                    <Input
                                        isClearable
                                        label="Giá vé"
                                        variant="bordered"
                                        value={saveSchedule?.price}
                                        onChange={(e) => setSaveSchedule({ ...saveSchedule, price: e.target.value })}
                                        className="max-w-xs"
                                    />
                                </div>
                                <div className="w-[45%] ml-[50px]">
                                    <Input
                                        isClearable
                                        label="Giá vé"
                                        variant="bordered"
                                        value={saveSchedule?.eatingFee}
                                        onChange={(e) =>
                                            setSaveSchedule({ ...saveSchedule, eatingFee: e.target.value })
                                        }
                                        className="max-w-xs"
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ScheduleCreateModal;
