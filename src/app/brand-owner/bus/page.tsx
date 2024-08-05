"use client";
import { allBusApi, deleteBus, IBus } from "@/app/api/brand/bus-api/apiBus";
import { UserContext } from "@/app/context/userContext";
import BusCreateModal from "@/components/createBus.modal";
import { use, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";


const Bus = () => {
  const { setNotifi } = useContext(UserContext);
  const [item, setItem] = useState<any>(null);
  const [user, setUser] = useState({} as any);
  const [buses, setBuses] = useState<IBus[]>([]);
  const [showBusCreate, setShowBusCreate] = useState<boolean>(false);

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (!user) {
      setUser(null);
    }
    user = JSON.parse(user);
    setUser(user);
    getAllBus(user?.customerId);
  }, []);

  const getAllBus = async (userId: any) => {
    const response = await allBusApi(userId);
    setBuses(response?.data);
    console.log(buses);
  };

  const handleOpenModal = (itemChild: any = null) => {
    setShowBusCreate(true);
    setItem({ ...itemChild });
  };

  const handleDelete = async(itemChild: any = null) => {
    const res = await deleteBus(itemChild.id);
    if (!res?.success) {
      setNotifi({ message: res?.message, type: "error" });
      return;
    }
    setNotifi({ message: res?.message, type: "success" });
    getAllBus(user?.customerId)
  }

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="secondary" onClick={() => setShowBusCreate(true)}>
          Thêm mới
        </Button>
      </div>
      <Table >
        <thead>
          <tr>
            <th className="text-center">Tên xe</th>
            <th className="text-center">Biển số</th>
            <th className="text-center">Số chổ</th>
            <th className="text-center">Loại xe</th>
            <th className="text-center">Mô Tả</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {buses?.map((bus) => {
            return (
              <tr key={bus?.id}>
                <td className="text-center">{bus?.name}</td>
                <td className="text-center">{bus?.identityCode}</td>
                <td className="text-center">{bus?.seats}</td>
                <td className="text-center">{bus?.busType}</td>
                <td className="text-center">{bus?.description}</td>
                <td className="text-center">
                  <Button
                    // variant="warning"
                    className="mx-3"
                    onClick={() => {
                      // setItem(item)
                      handleOpenModal(bus);
                    }}
                  >
                    {" "}
                    <MdModeEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(bus);
                    }}
                  >
                    {" "}
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <BusCreateModal
        showModalBusCreate={showBusCreate}
        setShowModalBusCreate={setShowBusCreate}
        item={item}
        user={user}
        setItems={setBuses}
      />
    </>
  );
};

export default Bus;
