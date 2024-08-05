import { useContext, useEffect, useState } from 'react';
import { Time, parseAbsoluteToLocal } from '@internationalized/date';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { UserContext } from '@/app/context/userContext';
import { createRoute, updateRoute } from '@/app/api/brand';
import { updateShuttle } from '@/app/api/brand/shuttle-api/shuttleApi';
import { InputLabel, MenuItem } from '@mui/material';
import { Select, SelectItem, Autocomplete, AutocompleteItem, DatePicker, TimeInput, Input } from '@nextui-org/react';
import { animals } from '../components/data/filter-data';
import { MdAddToPhotos } from 'react-icons/md';
import React from 'react';
import { convertDateObjToTimeText } from '@/app/util';

interface IProps {
    showEditShuttleModal: boolean;
    setShowEditShuttleModal: (value: boolean) => void;
    setItems: (value: any) => void;
    item: any;
    loadData:any
}

function EditShuttleModal(props: IProps) {
    const { showEditShuttleModal, setShowEditShuttleModal, item ,loadData} = props;
    const [saveShuttle, setSaveShuttle] = useState<any>();
    const [expected, setExpected] = useState<string>('');
    const [route, setRoute] = useState<string>('');
    const [curItemClick, setCurItemClick] = useState<any>(null);
    const { setNotifi } = useContext(UserContext);

    useEffect(() => {
        if (!item?.startTime) return;
        const dateSt = new Date(`2024-01-01 ${item.startTime}`);
        const dateEt = new Date(`2024-01-01 ${item.endTime}`);
        setSaveShuttle({
            ...item,
            startTime: parseAbsoluteToLocal(dateSt.toISOString()),
            endTime: parseAbsoluteToLocal(dateEt.toISOString()),
        });
    }, [item]);

    const handleSubmit = async () => {
        let newStartTime = '';
        let newEndTime = '';
        if (saveShuttle?.startTime) newStartTime = convertDateObjToTimeText(saveShuttle?.startTime);
        if (saveShuttle?.endTime) newEndTime = convertDateObjToTimeText(saveShuttle?.endTime);
        console.log(saveShuttle);
        console.log(newStartTime);
        const request = { ...saveShuttle, startTime: newStartTime, endTime: newEndTime };
        const res = await updateShuttle(request);

         if (!res?.success) {
          setNotifi({ message: res?.message, type: "error" });
          return;
        }
        setNotifi({ message: res?.message, type: "success" });
        loadData()
        // setItems(res.data)
    };

    const handleCloseModal = () => {
        setShowEditShuttleModal(false);
    };

    const onChange = () => {};
    return (
        <>
            <Modal
                show={showEditShuttleModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size="sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin xe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label required>Thời gian xuất phát</Form.Label>
                            <TimeInput
                                granularity="second"
                                label="Second"
                                value={saveShuttle?.startTime}
                                onChange={(e) => setSaveShuttle({ ...saveShuttle, startTime: e })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label required>Thời gian đến dự kiến</Form.Label>
                            <TimeInput
                                granularity="second"
                                label="Second"
                                value={saveShuttle?.endTime}
                                onChange={(e) => setSaveShuttle({ ...saveShuttle, endTime: e })}
                            />
                        </Form.Group>
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

export default EditShuttleModal;
