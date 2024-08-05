"use client";
import { Button, Table } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { animals } from "../../../components/data/filter-data";
import ParkingCreateModal from "@/components/modal.parking";
import { UserContext } from "@/app/context/userContext";
import { getRouteByUserId } from "@/app/api/brand/route-api/routeApi";
import { getShuttleByRoute } from "@/app/api/brand/shuttle-api/shuttleApi";
import {
  deleteDropOff,
  deletePickUp,
  getAllDropOff,
  getAllPickUp,
} from "@/app/api/brand/parking-api/parkingApi";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const handleDeleteShuttle = (id: number) => {
  console.log("Cheking :><>>>>", id);
};
const Parking = () => {
  const { setNotifi } = useContext(UserContext);
  const [user, setUser] = useState({} as any);
  const [item, setItem] = useState<any>(null);
  const [routePickUps, setRoutePickUps] = useState<any>([]);
  const [routeDeliveries, setRouteDeliveries] = useState<any>([]);
  const [routes, setRoutes] = useState<any>([]);
  const [curRoute, setCurRoute] = useState<any>(null);
  const [shuttles, setShuttles] = useState<any>([]);
  const [curShuttle, setShuttle] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [curItemPickUp, setCurItemPickup] = useState<any>(null);
  const [curItemDeli, setCurItemDeli] = useState<any>(null);

  const loadData = async () => {
    //   const res = await getAllShuttles(user.customerId);
    //   setItems(res?.data);
  };

  const loadRoutes = async () => {
    const res = await getRouteByUserId(user.customerId);
    setRoutes(res?.data || []);
  };

  const onChangeRoute = async (e: any) => {
    setCurRoute(e.target.value);
    const res = await getShuttleByRoute(e.target.value);
    setShuttles(res?.data || []);
  };
  const onChangeShuttle = async (e: any) => {
    setShuttle(e?.target?.value || curShuttle);
    const res = await Promise.all([
      getAllPickUp(e?.target?.value || curShuttle),
      getAllDropOff(e?.target?.value || curShuttle),
    ]);
    setRoutePickUps(res[0]?.data);
    setRouteDeliveries(res[1]?.data);
  };

  const onShowModal = (itemPickup: any, itemDeli: any) => {
    setCurItemPickup(itemPickup);
    setCurItemDeli(itemDeli);
    setShowModal(true);
  };

  const onDeletePickUp = async (id: string) => {
    const res = await deletePickUp(id);
    if (!res?.success) {
      setNotifi({ message: res?.message, type: "error" });
      return;
    }
    setNotifi({ message: res?.message, type: "success" });
    onChangeShuttle(null)
  };

  const onDeleteDropOff = async (id: string) => {
    const res = await deleteDropOff(id);
    if (!res?.success) {
      setNotifi({ message: res?.message, type: "error" });
      return;
    }
    setNotifi({ message: res?.message, type: "success" });
    onChangeShuttle(null)
  };

  useEffect(() => {
    if (user.customerId) loadRoutes();
  }, [user]);

  useEffect(() => {
    if (user.customerId) loadData();
  }, [user]);

  useEffect(() => {
    let user: any = localStorage.getItem("user");
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
          {/* <div>
            <Button
              variant="secondary"
              className="w-[100px]"
              onClick={() => setShowModal(true)}
            >
              Thêm
            </Button>
          </div> */}

          <div className="flex space-x-3 ">
            <Select
              label="Tuyến"
              className="w-[300px]"
              onChange={(e) => onChangeRoute(e)}
            >
              {routes.map((animal: any) => (
                <SelectItem key={animal.id}>{animal.routeName}</SelectItem>
              ))}
            </Select>
            <Select
              label="Khung giờ"
              className="w-[300px]"
              onChange={(e) => onChangeShuttle(e)}
            >
              {shuttles.map((animal: any) => (
                <SelectItem key={animal.id}>
                  {animal.startTime + " - " + animal.endTime}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="flex justify-around mt-10">
          <div className="flex flex-col justify-center items-center ">
            <div className="h-[55px]">Điểm đón</div>
            <Table>
              <thead>
                <tr>
                  <th>Điểm đón</th>
                  <th>Thời gian đón</th>
                  <th>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {routePickUps?.map((item: any) => {
                  return (
                    <tr key={item?.id}>
                      <td>{item?.pickUpPoint}</td>
                      <td>{item?.pickUpTime}</td>
                      <td>
                        <Button
                          // variant="warning"
                          className="mx-3"
                          onClick={() => {
                            // setItem(item)
                            onShowModal(item, null);
                          }}
                        >
                          {" "}
                          <MdModeEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            onDeletePickUp(item.id);
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
          </div>

          <div className="flex flex-col justify-center items-center ">
            <div className="h-[55px]">Điểm trả</div>
            <Table>
              <thead>
                <tr>
                  <th>Điểm trả</th>
                  <th>Thời gian trả</th>
                  <th>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {routeDeliveries?.map((item: any) => {
                  return (
                    <tr key={item?.id}>
                      <td>{item?.dropOffPoint}</td>
                      <td>{item?.dropOffTime}</td>
                      <td>
                        <Button
                          // variant="warning"
                          className="mx-3"
                          onClick={() => {
                            // setItem(item)
                            onShowModal(null, item);
                          }}
                        >
                          {" "}
                          <MdModeEdit />
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            onDeleteDropOff(item.id);
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
            <ParkingCreateModal
              showModalParkingCreate={showModal}
              setShowModalParkingCreate={setShowModal}
              curItemDeli={curItemDeli}
              curItemPickUp={curItemPickUp}
              onChangeShuttle={onChangeShuttle}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Parking;
