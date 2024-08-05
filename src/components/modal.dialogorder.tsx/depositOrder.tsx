import { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { enterDeposit, Orders } from '@/app/api/customer/route';
import { UserContext } from '@/app/context/userContext';

interface IProps {
    showModalDepositOrder: boolean;
    setShowModalDepositOrder: (value: boolean) => void;
    item:any;
    setItems:any;
}

function DepositOrder(props: IProps) {
    const [startPoint, setStartPoint] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    const [route, setRoute] = useState<string>('');
    const { showModalDepositOrder, setShowModalDepositOrder, item, setItems } = props;
    const [saveSeatTickets, setSaveSeatTickets] = useState<Orders>();
    const [inputValue, setInputValue] = useState('');
    const { setNotifi } = useContext(UserContext);

    const handleSubmit = async () => {
        const res = await enterDeposit(item?.id, inputValue)
        console.log("request", res)
        setItems(res?.data)
        if(!res?.success){
            setNotifi({ message: "Cập nhập không thành công!", type: "error" });
            return;
        }
        setNotifi({ message: "Đã đặt thành công", type: "success" });
        setShowModalDepositOrder(false);
    };

    const handleCloseModal = () => {
        saveSeatTickets;
        setShowModalDepositOrder(false);
    };

    useEffect(() => {
        // setSaveSeatTickets({...item})
    }, [item]);
    
    return (
        <>
            <Modal
                size="sm"
                show={showModalDepositOrder}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
            >
                <div>
                    <div className="text-center text-sm font-semibold mt-3">Nhập tiền cọc</div>
                    <Form>
                        <Form.Group className="mb-3">
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
                        </div>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default DepositOrder;
