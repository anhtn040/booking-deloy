"use client";
import { createRoute, deleteRoute, getAllRoute } from "@/app/api/brand";
import { UserContext } from "@/app/context/userContext";
import BusCreateModal from "@/components/createRoute.modal";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { MdDelete } from "react-icons/md";
interface IProps {
  items: any[];
}

const handleDeleteRoute = (id: number) => {
  console.log("Cheking :><>>>>", id);
};

const Route = (props: IProps) => {
  const { setNotifi } = useContext(UserContext);
  const [user, setUser] = useState({} as any);
  const [item, setItem] = useState<any>(null);
  const [items, setItems] = useState<any>([]);
  const [showRouteCreate, setShowRouteCreate] = useState<boolean>(false);
  

  const loadDataRoute = async () => {
    const res = await getAllRoute(user.customerId);
    setItems(res?.data);
  };

  useEffect(() => {
    if(user.customerId)
    loadDataRoute();
  }, [user]);

  useEffect(() => {
    let user: any = localStorage.getItem("user");
    if (!user) {
      setUser(null);
    }
    user = JSON.parse(user);
    setUser(user);
  }, []);

  const handleOpenModal = (itemChild: any = null) => {
    setShowRouteCreate(true);
    setItem({ ...itemChild });
  };

  const handleDeleteRoute = async(itemChild: any = null) => {
    const res = await deleteRoute(itemChild.id, user.customerId)
    if (!res?.success) {
      setNotifi({ message: res?.message, type: "error" });
      return;
    }
    setNotifi({ message: res?.message, type: "success" });
    setItems(res.data)
  }

  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button variant="secondary" onClick={() => handleOpenModal()}>
          Thêm mới
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">Điểm xuất phát</th>
            <th className="text-center">Điểm kết thúc</th>
            <th className="text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((itemChild:any) => {
            return (
              <tr key={itemChild?.id}>
                <td className="text-center">{itemChild?.startPoint}</td>
                <td className="text-center">{itemChild?.endPoint}</td>
                <td className="text-center">
                  <Button
                    // variant="warning"
                    className="mx-3"
                    onClick={() => {
                      // setItem(item)
                      handleOpenModal(itemChild);
                    }}
                  >
                    {" "}
                    <MdModeEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDeleteRoute(itemChild);
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
        showModalRouteCreate={showRouteCreate}
        setShowModalRouteCreate={setShowRouteCreate}
        item={item}
        user={user}
        setItems={setItems}
      />
    </>
  );
};

export default Route;
