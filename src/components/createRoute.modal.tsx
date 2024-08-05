
"use client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { mutate } from "swr";
import { UserContext } from "@/app/context/userContext";
import { createRoute, updateRoute } from "@/app/api/brand";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { provinces } from "./data/filter-data";
interface IProps {
  showModalRouteCreate: boolean;
  setShowModalRouteCreate: (value: boolean) => void;
  setItems: (value: any) => void;
  item: any;
  user:any;
}
const listDropdown = provinces
function RouteCreateModal(props: IProps) {
  const { showModalRouteCreate, setShowModalRouteCreate, item,user,setItems } = props;
  const [startPoint, setStartPoint] = useState<string>(item?.startPoint || "");
  const [endPoint, setEndPoint] = useState<string>(item?.endPoint || "");
  const [duration, setDuration] = useState<string>(item?.duration || "");
  const { setNotifi } = useContext(UserContext);

  useEffect(() => {
    setStartPoint(item?.startPoint || "")
    setEndPoint(item?.endPoint || "")
    setDuration(item?.duration || "")
  }, [item]);

  const handleSubmit = async () => {
    if (!startPoint) {
      toast.error("Not empty startPoint!");
      return;
    }
    if (!endPoint) {
      toast.error("Not empty endPoint!");
      return;
    }
    if (!duration) {
      toast.error("Not empty duration!");
      return;
    }
    let res
    if(item.id){
      res = await updateRoute({id:item.id,userId:user.customerId, duration, startPoint, endPoint });
    }else {
      res = await createRoute({ duration, startPoint, endPoint,userId:user.customerId });
    }
    if (!res?.success) {
      setNotifi({ message:"Tạo tuyến/cập nhập không thành công!", type: "error" });
      return;
    }
    setNotifi({ message: "Tạo tuyến/cập nhập thành công!", type: "success" });
    setItems(res.data)
  };
  const handleCloseModal = () => {
    setStartPoint(""),
      setEndPoint(""),
      setDuration(""),
      setShowModalRouteCreate(false);
  };
  return (
    <>
      <Modal
        show={showModalRouteCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết chuyến xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>Start point</Form.Label>
              <DropdownButton
                style={{
                  width: "100%",
                  background: "white",
                  color: "black",
                  textAlign: "left",
                }}
                title="Điểm đi*"
              >
                {listDropdown.map((item) => (
                  <Dropdown.Item href="#/action-1">{item?.name}</Dropdown.Item>
                ))}
              </DropdownButton> */}
              <InputLabel id="demo-simple-select-label">Điểm đi *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={startPoint}
                label="Điểm đi"
                onChange={(e) => setStartPoint(e.target.value)}
              >
                {listDropdown.map((item) => (
                  <MenuItem value={item.value}>{item.value}</MenuItem>
                ))}
              </Select>
              {/* <Form.Control type="text" placeholder="....."
           value={startPoint}
           onChange={(e) => setEndPoint(e.target.value)}
          /> */}
            </Form.Group>
            <Form.Group className="mb-3">
            <InputLabel id="demo-simple-select-label">Điểm đến *</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={endPoint}
                label="Điểm đi"
                onChange={(e) => setEndPoint(e.target.value)}
              >
                {listDropdown.map((item) => (
                  <MenuItem value={item.value}>{item.value}</MenuItem>
                ))}
              </Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                // placeholder="....."
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Thoát
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RouteCreateModal;
