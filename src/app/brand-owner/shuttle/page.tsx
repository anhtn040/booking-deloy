'use client';
import { getAllRoute } from '@/app/api/brand';
import { deleteShuttle, getAllShuttles, getRouteUser } from '@/app/api/brand/shuttle-api/shuttleApi';
import { UserContext } from '@/app/context/userContext';
import ShuttleCreateModal from '@/components/createShuttle.modal';
import EditShuttleModal from '@/components/editShuttle.modal';
import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const handleDeleteShuttle = (id: number) => {
    console.log('Cheking :><>>>>', id);
};
export class Shuttle {
    id?: number;
    routeName?: string;
    startTime?: string;
    endTime?: string;
}

const shuttle = () => {
    const { setNotifi } = useContext(UserContext);
    const [user, setUser] = useState({} as any);
    const [routes, setRoutes] = useState<any>([]);
    const [item, setItem] = useState<any>(null);
    const [shuttles, setShuttles] = useState<any>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

    const loadData = async () => {
        const res = await getAllShuttles(user.customerId);
        const res1 = await getAllRoute(user.customerId);
        setShuttles(res?.data);
        setRoutes(res1?.data);
    };

    useEffect(() => {
        if (user.customerId) loadData();
    }, [user]);

    useEffect(() => {
        let user: any = localStorage.getItem('user');
        if (!user) {
            setUser(null);
        }
        user = JSON.parse(user);
        setUser(user);
    }, []);

    const handleOpenModalEdit = (itemChild: any = null) => {
        setShowModalEdit(true);
        setItem({ ...itemChild });
    };

    const handleOpenModal = (itemChild: any = null) => {
        setShowModal(true);
        // setItem({ ...itemChild });
    };

    const handleDelete = async (itemChild: any = null) => {
      const res = await deleteShuttle(itemChild.id)
      if (!res?.success) {
          setNotifi({ message: res?.message, type: 'error' });
          return;
      }
      setNotifi({ message: res?.message, type: 'success' });
      loadData();
    };

    return (
        <>
            <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={() => handleOpenModal(true)}>
                    Thêm mới
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">Thời gian xuất phát</th>
                        <th className="text-center">Thời gian dự kiến</th>
                        <th className="text-center">Tuyến Đường</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {shuttles?.map((shuttle: any) => {
                        return (
                            <tr key={shuttle?.id}>
                                <td className="text-center">{shuttle?.startTime}</td>
                                <td className="text-center">{shuttle?.endTime}</td>
                                <td className="text-center">{shuttle?.routeName}</td>
                                <td className="text-center">
                                    <Button
                                        // variant="warning"
                                        className="mx-3"
                                        onClick={() => {
                                            // setItem(item)
                                            handleOpenModalEdit(shuttle);
                                        }}
                                    >
                                        {' '}
                                        <MdModeEdit />
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            handleDelete(shuttle);
                                        }}
                                    >
                                        {' '}
                                        <MdDelete />
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <ShuttleCreateModal
                showModalShuttleCreate={showModal}
                setShowModalShuttleCreate={setShowModal}
                item={item}
                routes={routes}
                setItems={setShuttles}
                loadData={loadData}
            />
            <EditShuttleModal
                showEditShuttleModal={showModalEdit}
                setShowEditShuttleModal={setShowModalEdit}
                item={item}
                setItems={setShuttles}
                loadData={loadData}
            />
        </>
    );
};

export default shuttle;
