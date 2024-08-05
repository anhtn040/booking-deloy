import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Input, TimeInput } from '@nextui-org/react';
import { Time, parseAbsoluteToLocal } from '@internationalized/date';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { animals, bustypes } from './data/filter-data';
import { getBusForDropDownByTravelDateForUpdate, getShuttleByRoute, Schedule, updateSchedule } from '@/app/api/brand/schedule-api/scheduleApi';
import { getBus } from '@/app/api/brand/bus-api/apiBus';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { UserContext } from '@/app/context/userContext';
import { convertDateObjToDateText } from '@/app/util';

interface IProps {
    showModalScheduleEdit: boolean;
    setShowModalScheduleEdit: (value: boolean) => void;
    item: any;
    routes:any;
    shuttles:any;
    user:any;
    curRoute:any;
}

function ScheduleEditModal(props: IProps) {
    const [startPoint, setStartPoint] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    const [routes1, setRoutes] = useState<any>('');
    const { showModalScheduleEdit, setShowModalScheduleEdit, item,routes,shuttles, user, curRoute} = props;
    const [saveSchedule, setSaveSchedule] = useState<any>();
    const [buses, setBuses] = useState<any>();
    const [user1, setUser] = useState<any>();
    const [routeId, setRouteId] = useState<any>(null);
    const [shuttleId, setShuttleId] = useState<any>(null);
    const [busId, setBusId] = useState<any>(null);
    const { setNotifi } = useContext(UserContext);


    useEffect(() => {
        if(user.customerId) busDropDown()
            
    }, [saveSchedule]);

    const busDropDown = async ()=>{
        const res = await getBusForDropDownByTravelDateForUpdate(user.customerId, saveSchedule?.dateStart)
        setBuses(res)
        console.log("buses", buses)
    }



    useEffect(() => {
        console.log('item', item);
        console.log('routes', routes);
        console.log('shuttle', shuttles);
        console.log('curRoute', curRoute);
        setRoutes([...routes || []])
        setUser({...user})

        if (!item?.dateStart) return;

        const foundShuttle = shuttles?.find((s:any)=> s.startTime == item.startTime)
        const foundRoute = routes?.find((s:any)=> s.id == curRoute)

        const date = new Date(`${item.dateStart}`);
        setSaveSchedule({
            ...item,
            // startTime: parseAbsoluteToLocal(date.toISOString()),
            dateStart: parseDate(item.dateStart),
            shuttleId:foundShuttle?.id, 
            routeName:`${foundRoute?.startPoint} ${foundRoute?.endPoint}`
        });
        console.log("saveSchedule", saveSchedule)
        console.log("dateStart", )
        console.log('routes1', routes1);


    }, [item, user, routes, shuttles, curRoute]);

    const handleSubmit = async () => {
        let newDateStart = '';
        if (saveSchedule?.dateStart) {
            newDateStart = convertDateObjToDateText(saveSchedule?.dateStart)


        }           
        console.log("newDateStart", newDateStart);
        console.log("travelDate", saveSchedule?.dateStart);
        console.log("saveSchedule", saveSchedule);


        

        const body = {
            id:saveSchedule.id,
            busId:saveSchedule.busId,
            shuttleId:saveSchedule.shuttleId,
            travelDate:newDateStart,
            price:saveSchedule.price,
            eatingFee:saveSchedule.eatingFee
        }
        const res = await updateSchedule(body)
        if(!res?.success){
            setNotifi({message:"Thêm chuyến không thành công!", type: "error"})
            return;
        }
        setNotifi({message: res?.message, type: "success"})
    };


    const handleCloseModal = () => {
        setStartPoint(''), setExpected(''), setShowModalScheduleEdit(false);
    };

    const onChangeTime = (e: any) => {
       
    };



    return (
        <>
            <Modal show={showModalScheduleEdit} onHide={() => handleCloseModal()} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin lịch trình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="space-y-3">
                        <div>
                            <div className="font-bold">Chọn tuyến đường</div>
                            <div>
                                <p>{saveSchedule?.routeName}</p>
                                {/* <Select */}
                                {/* // //     labelId="demo-simple-select-label"
                                // //     id="demo-simple-select"
                                // //     value={routes?.id}
                                // //     label="Điểm đi"
                                // //     // onChange={(e) => setRoutes({ ...routes1,id: e.target.value })}
                                // //  */}
                                //     {/* {routes1?.map((route: any) => (
                                //         <MenuItem value={route?.id}>
                                //             {' '}
                                //             {route.startPoint} - {route.endPoint}
                                //         </MenuItem>
                                //     ))} */}
                                {/* </Select> */}
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
                                    value={saveSchedule?.shuttleId}
                                    // label="Điểm đi"
                                    sx={{ minWidth: 200 }}
                                    onChange={(e) => {setSaveSchedule({ ...saveSchedule, shuttleId: e.target.value });
                                console.log("e",e);}}
                                >
                                    {shuttles?.map((shuttle: any) => (
                                        <MenuItem value={shuttle?.id}>  
                                            {shuttle.startTime}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {/* <div className="w-full  flex flex-row items-start gap-2">
                                    <TimeInput
                                        size="sm"
                                        hourCycle={24}
                                        granularity="second"
                                        isRequired
                                        label="Thời gian xuất phát"
                                    
                                    />
                                </div> */}
                                <div className="w-full max-w-xl flex flex-row gap-4 mt-2">
                                    <DatePicker
                                        isDisabled
                                        className="max-w-[284px]"
                                        label="Date (controlled)"
                                        value={saveSchedule?.dateStart}
                                        onChange={(e) => setSaveSchedule({ ...saveSchedule, dateStart: e })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold">Chọn xe</div>
                            <div>
                            <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={saveSchedule?.busId}
                                    label="Chọn xe"
                                    sx={{ minWidth: 200 }}
                                    onChange={(e) => setSaveSchedule({ ...saveSchedule, busId: e.target.value})}>
                                    {buses?.map((buse: any) => (
                                        <MenuItem value={buse?.id}>
                                            {' '}
                                            {buse.name}
                                        </MenuItem>
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
                                        onChange={(e) => setSaveSchedule({ ...saveSchedule, eatingFee: e.target.value })}
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

export default ScheduleEditModal;
