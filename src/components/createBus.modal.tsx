"use client";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import {
  IBus,
  IBusRequest,
  allBusApi,
  createOrUpdate,
  getBus,
} from "@/app/api/brand/bus-api/apiBus";
import { CgLogIn, CgSlack } from "react-icons/cg";
import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { bustypes } from "@/components/data/filter-data";
import { UserContext } from "@/app/context/userContext";

interface IProps {
  showModalBusCreate: boolean;
  setShowModalBusCreate: (value: boolean) => void;
}

function BusCreateModal(props: any) {
  const { showModalBusCreate, setShowModalBusCreate, item, user, setItems } =
    props;
  // const [user, setUser] = useState({} as any);
  // const[nameBus,setNameBus] = useState<string>("");
  // const[licensePlates,setLicensePlates] = useState<string>("");
  // const[seat,setSeat] = useState<string>();
  // const[typeBus,setTypeBus] = useState<string>("");
  // const[decription,setDecription] = useState<string>("");

  const [saveBus, setSaveBus] = useState<IBusRequest>();
  const { setNotifi } = useContext(UserContext);

  useEffect(() => {
    setSaveBus({ ...item });
  }, [item]);

  useEffect(() => {
    // let user: any = localStorage.getItem('user');
    // if (!user) {
    //     setUser(null);
    // }
    // user = JSON.parse(user);
    // setUser(user);
  }, []);

  const handleSubmit = async () => {
    if (!saveBus?.name) {
      toast.error("Not empty name bus!");
      return;
    }
    if (!saveBus?.seats) {
      toast.error("Not empty seats!");
      return;
    }
    if (!saveBus?.identityCode) {
      toast.error("Not empty identityCode!");
      return;
    }
    // if(!saveBus.typeId){
    //     toast.error("Not empty typeBus!");
    //     return;
    //   }
    const request = { ...saveBus, userId: user?.customerId };
    const res = await createOrUpdate(request);
    console.log("request", res);
    if (!res?.success) {
        setNotifi({ message: res?.message, type: "error" });
        return;
      }
      setNotifi({ message: res?.message, type: "success" });
      setItems(res.data)
      handleCloseModal()
  };

  const handleCloseModal = () => {
    setSaveBus;
    setShowModalBusCreate(false);
  };

  return (
    <>
      <Modal
        show={showModalBusCreate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size="mb"
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông tin xe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label required>Tên xe</Form.Label>

              <Form.Control
                type="text"
                placeholder="....."
                value={saveBus?.name}
                onChange={(e: any) =>
                  setSaveBus({ ...saveBus, name: e?.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Biển số</Form.Label>
              <Form.Control
                type="text"
                placeholder="....."
                value={saveBus?.identityCode}
                onChange={(e: any) =>
                  setSaveBus({ ...saveBus, identityCode: e?.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Số chổ</Form.Label>
              <Form.Control
                type="text"
                placeholder="....."
                value={saveBus?.seats}
                onChange={(e: any) =>
                  setSaveBus({ ...saveBus, seats: e?.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Loại chổ</Form.Label>
              {/* <Autocomplete
                className="inline-flex"
                placeholder="Nơi đến"
                defaultInputValue={saveBus?.typeId}
                value={saveBus?.typeId}
                onInputChange={(val) => setSaveBus({ ...saveBus, typeId: val })}
              >
                {bustypes.map((bustype: any, idx: any) => (
                  <AutocompleteItem
                    key={idx}
                    value={bustype.key}
                    className="bg-white"
                  >
                    {bustype.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete> */}
              <Select
                label="Loại xe"
                className="mr-[20px]"
                size="sm"
                value={saveBus?.typeId}
                onChange={(e) => {
                  setSaveBus({ ...saveBus, typeId: e?.target.value });
                }}
              >
                {bustypes.map((bustype) => (
                  <SelectItem value={bustype.key} key={bustype.key}>
                    {bustype.label}
                  </SelectItem>
                ))}
              </Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="....."
                value={saveBus?.description}
                onChange={(e: any) =>
                  setSaveBus({ ...saveBus, description: e?.target.value })
                }
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
export default BusCreateModal;
