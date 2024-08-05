import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import { Select, SelectItem, Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react';
import { animals } from '../components/data/filter-data';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import MultiStepFormTicket from './multistepformticket';

interface IProps {
    showModalTicketCreate: boolean;
    setShowModalTicketCreate: (value: boolean) => void;
    item: any;
    curSchedule: any;
    seatTickets:any;
}

function TicketCreateModal(props: IProps) {
    const [startPoint, setStartPoint] = useState<string>('');
    const [expected, setExpected] = useState<string>('');
    const [route, setRoute] = useState<string>('');
    const { showModalTicketCreate, setShowModalTicketCreate, item, curSchedule, seatTickets } = props;

    const handleCloseModal = () => {
        setStartPoint(''), setExpected(''), setRoute(''), setShowModalTicketCreate(false);
    };

    return (
        <>
            <Modal
                show={showModalTicketCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <MultiStepFormTicket 
                    showStepNumber={true} 
                    item={item} 
                    curSchedule={curSchedule}
                    seatTickets={seatTickets} />
            </Modal>
        </>
    );
}

export default TicketCreateModal;
