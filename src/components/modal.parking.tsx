import { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import {
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  TimeInput,
} from "@nextui-org/react";
import {Time} from "@internationalized/date";
import { updateDropOff, updatePickUp } from "@/app/api/brand/parking-api/parkingApi";
import { UserContext } from "@/app/context/userContext";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';

interface IProps {
  showModalParkingCreate: boolean;
  setShowModalParkingCreate: (value: boolean) => void;
  onChangeShuttle: (value: any) => void;
  curItemDeli: any;
  curItemPickUp: any;
}

function ParkingCreateModal(props: IProps) {
  const [startPoint, setStartPoint] = useState<string>("");
  const [time, setTime] = useState<any>(null);
  const [route, setRoute] = useState<string>("");
  const { setNotifi } = useContext(UserContext);
  const {
    showModalParkingCreate,
    setShowModalParkingCreate,
    curItemDeli,
    curItemPickUp,
    onChangeShuttle
  } = props;
  const handleSubmit = async() => {
    console.log(time)
    const newTime = `${('0'+time.hour).slice(0,2)}:${('0'+time.minute).slice(0,2)}:00`
    if (!startPoint) {
      toast.error("Not empty startPoint!");
      return;
    }
    if (!time) {
      toast.error("Not empty expected!");
      return;
    }
    let res
    if(curItemPickUp){
      res = await updatePickUp({pickUpId: curItemPickUp.id, pickUpPoint: startPoint,pickUpTime: newTime})
    } else {
      res = await updateDropOff({dropOffId: curItemDeli.id, dropOffPoint: startPoint,dropOffTime: newTime})
    }

    if (!res?.success) {
      setNotifi({ message: res?.message, type: "error" });
      return;
    }
    setNotifi({ message: res?.message, type: "success" });
    onChangeShuttle(null)
    // setItems(res.data)
  };

  useEffect(() => {
    const timePickup = curItemPickUp?.pickUpTime || curItemDeli?.dropOffTime;
    if (timePickup) {
      setStartPoint(curItemPickUp?.pickUpPoint || curItemDeli?.dropOffPoint);
      const arrTime = timePickup.split(':')
      setTime(new Time(+arrTime[0],+arrTime[1]))
    }
  }, [curItemDeli, curItemPickUp]);

  const handleCloseModal = () => {
    setStartPoint(""),
      setTime(""),
      setRoute(""),
      setShowModalParkingCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalParkingCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin chi tiết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>Điểm đến</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Điểm đến"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
              />
            </Form.Group>
            <TimeInput label="Event Time" value={time}/>
            {/* <Form.Group className="mb-3" > */}
            {/* <DatePicker
                        isRequired
                        showMonthAndYearPickers value={date} onChange={(e) => setStartPoint(e.target.value)}/> */}
            {/* <Form.Label>Thời gian đến</Form.Label> */}
            {/* <Form.Control type="text" placeholder="Thời gian đến" 
             value={expected}
             onChange={(e) => setExpected(e.target.value)}
          /> */}
            {/* </Form.Group> */}
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

export default ParkingCreateModal;
