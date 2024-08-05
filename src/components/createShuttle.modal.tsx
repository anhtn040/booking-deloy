import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { UserContext } from '@/app/context/userContext';
import { createRoute, updateRoute } from '@/app/api/brand';
import { createShuttle, updateShuttle } from '@/app/api/brand/shuttle-api/shuttleApi';
import { InputLabel, MenuItem, Select } from '@mui/material';
import { SelectItem, Autocomplete, AutocompleteItem, DatePicker, TimeInput, Input } from '@nextui-org/react';
import { animals } from '../components/data/filter-data';
import { MdAddToPhotos } from 'react-icons/md';
import React from 'react';
import { IRoute } from '@/app/api/brand/route-api/routeApi';
import { convertDateObjToDateText, convertDateObjToTimeText } from '@/app/util';

interface IProps {
    showModalShuttleCreate: boolean;
    setShowModalShuttleCreate: (value: boolean) => void;
    setItems: (value: any) => void;
    item: any;
    routes: any;
    loadData:any;
}

function ShuttleCreateModal(props: IProps) {
    const { showModalShuttleCreate, setShowModalShuttleCreate, item, setItems, routes, loadData } = props;
    const [startPoint, setStartPoint] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    const [saveRoutes, setSaveRoutes] = useState<any>([]);
    const { setNotifi } = useContext(UserContext);
    const [dropOffs, setDropOffs] = useState<any>([]);
    const [pickUps, setPickUps] = useState<any>([]);
    const [routeId, setRouteId] = useState<any>(null);
    const [startTime, setStartTime] = useState<any>(null);
    const [endTime, setEndTime] = useState<any>(null);

    useEffect(() => {
        setSaveRoutes([...routes]);
        console.log('routes111111', routes);
    }, [routes]);

    const handleSubmit = async () => {
        const newDropOffs = dropOffs.map((item: any) => ({
            ...item,
            dropOffTime: convertDateObjToTimeText(item.dropOffTime),
        }));

        const newPickUps = pickUps.map((item: any) => ({
            ...item,
            pickUpTime: convertDateObjToTimeText(item.pickUpTime),
        }));

        const newStartTime = convertDateObjToTimeText(startTime);
        const newEndTime = convertDateObjToTimeText(endTime);
        const body = {  
            startTime: newStartTime,
            endTime: newEndTime,
            dropOffs: newDropOffs,
            pickUps: newPickUps,
            routeId: routeId,
        };

        console.log("body",body)

        const res = await createShuttle(body)
        // console.log("okkkkk", res);
        if(!res?.success){
            setNotifi({message:"Thêm chuyến không thành công!", type: "error"})
            return;
        }
        setNotifi({message: res?.message, type: "success"})
        loadData()
        console.log(newPickUps);
        console.log(routeId);
        // let res
        // if(item.id){
        //   res = await updateShuttle({id:item.id,startPoint,expected });
        // }else {
        //   res = await createRoute({ duration, startPoint, endPoint,userId:user.customerId });
        // }
        // if (!res?.success) {
        //   setNotifi({ message: res?.message, type: "error" });
        //   return;
        // }
        // setNotifi({ message: res?.message, type: "success" });
        // setItems(res.data)
    };

    const handleAddDropOffs = () => {
        setDropOffs([...dropOffs, { dropOffId: '', dropOffPoint: '', dropOffTime: null }]);
    };

    const handleAddPickUps = () => {
        setPickUps([...pickUps, { pickUpId: '', pickUpPoint: '', pickUpTime: null }]);
    };

    const onChangeDropOff = (value: any, idx: any) => {
        const newArr = [...dropOffs];
        newArr[idx] = { ...newArr[idx], ...value };
        setDropOffs(newArr);
    };

    const onChangePickUp = (value: any, idx: any) => {
        const newArr = [...pickUps];
        newArr[idx] = { ...newArr[idx], ...value };
        setPickUps(newArr);
    };

    const handleCloseModal = () => {
        setStartPoint(''), setExpected(''), setShowModalShuttleCreate(false);
    };

    let [date, setDate] = React.useState();
    const onChange = () => {};
    return (
        <>
            <Modal
                show={showModalShuttleCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size="lg"
                //  show={showModalScheduleCreate}
                // onHide={() => handleCloseModal()}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin lịch trình</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="space-y-3">
                        <div>
                            <div className="font-bold">Chọn tuyến đường</div>
                            <div>
                                {/* <Select
                                    isRequired
                                    size="sm"
                                    variant="bordered"
                                    label="Tuyến đường"
                                    // selectionMode="multiple"
                                    value={routeId}
                                    onChange={(e)=> setRouteId(e.target.value)}
                                >
                                    {saveRoutes?.map((saveRoute: any) => (
                                        <SelectItem key={saveRoute.id}>
                                            {saveRoute.startPoint} - {saveRoute.endPoint}
                                        </SelectItem>
                                    ))}
                                </Select> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={routeId}
                                    label="Điểm đi"
                                    onChange={(e) => setRouteId(e.target.value)}
                                >
                                    {saveRoutes.map((saveRoute: any) => (
                                        <MenuItem value={saveRoute.id}>
                                            {' '}
                                            {saveRoute.startPoint} - {saveRoute.endPoint}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>

                        <div className="">
                            <div className="font-bold">Ngày giờ xe chạy</div>
                            <div className="border-1 p-2">
                                <div className="w-full  flex flex-row items-start gap-2">
                                    <TimeInput
                                        size="sm"
                                        hourCycle={24}
                                        granularity="second"
                                        isRequired
                                        label="Thời gian xuất phát"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e)}
                                    />
                                    <TimeInput
                                        size="sm"
                                        hourCycle={24}
                                        granularity="second"
                                        isRequired
                                        label="Thời gian đến trạm dự kiến"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e)}

                                        // onChange={setDate}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Form className="flex flex-col space-y-2">
                                <div className="font-bold">Thêm điểm đón/thời gian đón</div>
                                {dropOffs.map((dof: any, idx: any) => (
                                    <div className="w-full max-w-xl flex flex-row items-start gap-3" key={idx}>
                                        <Input
                                            size="sm"
                                            isRequired
                                            type=""
                                            label="Điểm đón"
                                            value={dof.dropOffPoint}
                                            name={'dropOffPoint' + idx}
                                            onChange={(e) => onChangeDropOff({ dropOffPoint: e.target.value }, idx)}
                                        />
                                        <TimeInput
                                            size="sm"
                                            hourCycle={24}
                                            granularity="second"
                                            isRequired
                                            label="Thời gian đến trạm dự kiến"
                                            value={dof.dropOffTime}
                                            onChange={(e) => onChangeDropOff({ dropOffTime: e }, idx)}
                                            // onChange={setDate}
                                        />
                                    </div>
                                ))}
                                <Button variant="primary" style={{ width: '20%' }} onClick={() => handleAddDropOffs()}>
                                    Add
                                </Button>
                            </Form>
                        </div>
                        <div>
                            <Form className="flex flex-col space-y-2">
                                <div className="font-bold">Thêm điểm trả/thời gian trả</div>
                                {pickUps.map((pus: any, idx: any) => (
                                    <div className="w-full max-w-xl flex flex-row items-start gap-3" key={idx}>
                                        <Input
                                            size="sm"
                                            isRequired
                                            type=""
                                            label="Điểm đón"
                                            value={pus.pickUpPoint}
                                            name={'pickUpPoint' + idx}
                                            onChange={(e) => onChangePickUp({ pickUpPoint: e.target.value }, idx)}
                                        />
                                        <TimeInput
                                            size="sm"
                                            hourCycle={24}
                                            granularity="second"
                                            isRequired
                                            label="Thời gian đến trạm dự kiến"
                                            value={pus.pickUpTime}
                                            onChange={(e) => onChangePickUp({ pickUpTime: e }, idx)}
                                            // onChange={setDate}
                                        />
                                    </div>
                                ))}
                                <Button variant="primary" style={{ width: '20%' }} onClick={() => handleAddPickUps()}>
                                    Add
                                </Button>
                            </Form>
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

export default ShuttleCreateModal;
