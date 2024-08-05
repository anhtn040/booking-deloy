import { ReactNode, useState } from "react";
import { listSeats } from "../data/filter-data";
import "../../app/style/customer.css";
interface Ipros {
  formData: any;
  handleInput: any;
  handleNextStep: any;
  tickets: any;
  setTicketChoosenIds:any
  ticketChoosenIds:any
  totalPrice:any
  setTotalPrice:any
}
interface Seat {
  id: any;
  status: string;
  price: string;
  seatName: string;
}

const StepTicketList = (props: Ipros) => {
  const { formData, handleInput, handleNextStep, tickets,setTicketChoosenIds,ticketChoosenIds,totalPrice,setTotalPrice } = props;

  const onClickTicket = (ticket:any)=>{
    if(ticket.status === '1') return 
    if(ticketChoosenIds?.length >5) {
        return
    }
    let newIds = []
    if(ticketChoosenIds.includes(ticket.id)){
         newIds = [...ticketChoosenIds.filter((id:any)=> id !== ticket.id)]
    }
    else {
        if(ticketChoosenIds?.length === 5) return
        newIds = [...ticketChoosenIds,ticket.id]
    }
    setTicketChoosenIds(newIds)
    onLoadToTalPrice(newIds)
  }

  const onLoadToTalPrice = (ids: any[])=>{
    let total = 0
    for(let ticketChilds of tickets){
        for(let tick of ticketChilds){
        if(ids.includes(tick.id)) total += tick.price
        }
    }
    setTotalPrice(total)
  }

  return (
    <>
      <div>Chỗ mong muốn</div>
      <div className="seat-container mt-7 px-16">
        <div className="legend-container">
          <h2>Chú thích</h2>
          <div className="legend">
            <p>
              <span className="selected-legend"></span> Ghế Đang Chọn
            </p>
            <p>
              <span className="booked-legend"></span> Ghế Đã Đặt
            </p>
            <p>
              <span className="available-legend"></span> Ghế Còn Trống
            </p>
          </div>
        </div>
        {/* seatSize <=4 */}
        {tickets?.length <= 4 && (
          <div className="seat-grid">
            <div>
              <div className="text-center">Tầng dưới</div>
              <div className="column-group col-a mx-4">
                <div className="seat-col">
                  {tickets[0]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                  {tickets[2]?.map((seat:any) => (
                     seat.status === '1' ?
                     <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                     :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-center">Tầng trên</div>
              <div className="column-group col-a mx-4">
                <div className="seat-col" >
                  {tickets[1]?.map((seat:any) => (
                     seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                  {tickets[3]?.map((seat:any) => (
                     seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* seatSize 6 */}
        {tickets?.length == 6 && (
          <div className="seat-grid">
            <div>
              <div className="text-center">Tầng dưới</div>
              <div className="column-group col-b mx-4">
                <div className="seat-col">
                {tickets[0]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                {tickets[2]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                {tickets[4]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="text-center">Tầng trên</div>
              <div className="column-group col-b mx-4">
                <div className="seat-col">
                {tickets[1]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                {tickets[3]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
                <div className="seat-col">
                {tickets[5]?.map((seat:any) => (
                    seat.status === '1' ?
                    <button className="seat" style={{backgroundColor:'#4c4c4c'}} disabled={true}>{seat?.seatName}</button>
                    :  <button className="seat" style={{backgroundColor: ticketChoosenIds.includes(seat.id) ? '#7bc47f' :'#dddddd'}} onClick={()=>{onClickTicket(seat)}}>{seat?.seatName}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="info-panel flex ">
        <div className="selected-seats">
          <h3>Ghế:</h3>
          <ul>
            {/* {listSelected.map((seat) => (
                            <li>{seat?.seatName}
                            </li>
                        ))} */}
          </ul>
        </div>
        <div className="total-price flex mt-[20px]">
          <p>Tổng cộng:</p>
          <div>{totalPrice}</div>
          <button className="button-next ml-[10px]" onClick={handleNextStep}>
            Tiếp tục
          </button>
        </div>
      </div>
    </>
  );
};
export default StepTicketList;
