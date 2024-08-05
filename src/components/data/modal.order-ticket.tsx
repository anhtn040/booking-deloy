import exp from "constants"
import MultiStepForm from "../multistepform";
import { Form, Modal } from "react-bootstrap";

interface IProps {
    showModalOrderTicket: boolean;
    setShowModalOrderTicket: (value: boolean) => void;
    item: any
}
const OrderTicket = (props: IProps) => {
    const { showModalOrderTicket, setShowModalOrderTicket,item,  } = props
    return (
        <>
            <Modal show={showModalOrderTicket}
                onHide={() => setShowModalOrderTicket(false)}
                backdrop='static'
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Đặt vé</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MultiStepForm showStepNumber={true} item={item} showModalOrderTicket={showModalOrderTicket} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default OrderTicket;