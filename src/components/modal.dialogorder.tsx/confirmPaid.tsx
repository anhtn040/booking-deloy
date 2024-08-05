import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { confirmPaid, enterDeposit, Orders } from '@/app/api/customer/route';
import { UserContext } from '@/app/context/userContext';

interface IProps {
    showModalConfirmPaid: boolean;
    setShowModalDConfirmPaid: (value: boolean) => void;
    item: any;
    setItems: any;
}

function ConfirmPaid(props: IProps) {
    const [expected, setExpected] = useState<string>('');
    const [route, setRoute] = useState<string>('');
    const { showModalConfirmPaid, setShowModalDConfirmPaid, item, setItems } = props;
    const [saveSeatTickets, setSaveSeatTickets] = useState<Orders>();
    const [inputValue, setInputValue] = useState('');
    const { setNotifi } = useContext(UserContext);

    const handleSubmit = async () => {
        const res = await confirmPaid(item?.id);
        console.log('request', res);
        setItems(res?.data);
        if(!res?.success){
            setNotifi({ message: "Cập nhập đơn không thành công!", type: "error" });
            setShowModalDConfirmPaid(false);
            return;
        }
        setNotifi({ message: "Cập nhập đơn thành công!", type: "success" });
        setShowModalDConfirmPaid(false);
    };

    const handleCloseModal = () => {
        // saveSeatTickets;
        setShowModalDConfirmPaid(false);
    };

    useEffect(() => {
        // setSaveSeatTickets({...item})
    }, [item]);

    return (
        <>
            <Modal
                size="sm"
                show={showModalConfirmPaid}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <div>
                    <Form>
                        {/* <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                className=''
                                aria-label="Tiền cọc"
                                placeholder="Nhập tiền cọc"
                                min="0"
                                itemType="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="mt-8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                style={{ marginRight: '20px' }}
                                className="bg-red-800 text-cyan-50"
                                onClick={() => handleCloseModal()}
                            >
                                {' '}
                                Hủy
                            </button>
                            <button
                                
                                onClick={() => {
                                    // setItem(item)
                                    handleSubmit();
                                  }}
                                className="bg-green-600 text-cyan-50"
                            >
                                Lưu
                            </button>
                        </div> */}
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h2 className="text-xl font-bold mb-4">Xác nhận</h2>
                                <p className="mb-6">Đơn đặt đã thanh toán?</p>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                        onClick={handleCloseModal}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                                        onClick={handleSubmit}
                                    >
                                        Xác nhận
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default ConfirmPaid;
