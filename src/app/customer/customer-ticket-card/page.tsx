'use client'
import { Accordion, AccordionItem } from "@nextui-org/react";
import "../../style/customer.css"
import { useState } from "react";
import OrderTicket from "@/components/data/modal.order-ticket";
const CustomerTicketCard = (props:any) => {
    const {item} = props
    const [showOrderModal, setShowOrderModal] = useState<boolean>(false)
    return (
        <>
            <div className="bg-white border rounded-md shadow-md mb-6 hover:shadow-2xl p-4">
                <div className="ticket-header w-full flex mb-4">
                    <div className="ticket-note flex-1 mr-2">
                        <div
                            className="notification-tag inline-block relative mr-6 px-[6px] py-[3px] bg-[#007AFF] text-[#007AFF]">
                            <span className="text-white text-xs">Thông báo</span>
                        </div>
                        <div className="link inline-block text-[#007AFF] text-sm cursor-pointer underline">
                            Giá vé chưa bao ăn
                        </div>
                    </div>
                </div>
                <div className="ticket-container bg-white min-h-[180px]">
                    <div className="ticket-body flex">
                        <div
                            className="image bg-gradient-to-t relative w-[150px] h-[150px] bg-cover bg-center bg-no-repeat mr-4 rounded">
                            <img className="h-full w-full object-center-center object-cover"
                                src={item?.image}
                                alt="image nha xe" />
                            <img className="w-full h-auto absolute bottom-0 left-0" />
                            <div className="confirm-ticket">
                                <svg className="TicketPC__ConfirmSVG-sc-1mxgwjh-5 kwcYbw" width="14" height="12"
                                    viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M13.666 2v2.667c-.733 0-1.333.6-1.333 1.333 0 .734.6 1.334 1.333 1.334V10c0 .734-.6 1.334-1.333 1.334H1.666c-.733 0-1.333-.6-1.333-1.334V7.334a1.333 1.333 0 0 0 .006-2.667V2C.34 1.26.933.667 1.666.667h10.667c.733 0 1.333.593 1.333 1.333zM6.391 8.965c-.016.125.07.235.182.235a.18.18 0 0 0 .16-.103l.244-.475c.301-.586.832-1.619 1.595-3.098.07-.167 0-.235-.128-.235H7.322l.287-2.254c.016-.125-.07-.235-.182-.235a.183.183 0 0 0-.16.103l-.972 1.899c-.337.657-.616 1.2-.835 1.632l-.001.002c-.016.025-.173.275.1.275h1.12L6.39 8.965z"
                                        fill="#fff"></path>
                                </svg>
                                Xác nhận tức thì
                                <div className="point"></div>
                            </div>
                        </div>

                        <div className="ticket-rightbody relative min-h-[150px]">
                            <div className="trip-info text-[#484848] text-sm">
                                <div className="bus-info flex items-center">
                                    <div className="bus-name text-base text-[#484848] font-bold mr-2">{item?.brandName}</div>
                                </div>
                                <div className="seat-type mb-5 mt-[10px] flex items-center">
                                    <div className="mr-2">Xe {item?.seats} {item?.type}</div>
                                    <div className="sponsored flex items-center m-0">
                                        <div className="icon text-[#858585] mr-1">
                                            <img src="https://storage.googleapis.com/fe-production/svgIcon/badge-sponsor.svg
                                        " alt="" className="sponsored-icon w-4 h-4 align-middle border-none" />
                                        </div>
                                        <div className="headline-text text-sm font-normal text-[#858585] p-0 m-0">
                                            Tài trợ
                                        </div>
                                    </div>
                                </div>
                                <div className="from-to flex items-center text-[#707070]">
                                    <svg className="ticket_location_route h-[74px] w-3" xmlns="http://www.w3.org/2000/svg"
                                        width="14" height="74" viewBox="0 0 14 74">
                                        <path fill="none" stroke="#787878" stroke-linecap="round" stroke-width="2"
                                            stroke-dasharray="0 7" d="M7 13.5v46"></path>
                                        <g fill="none" stroke="#484848" stroke-width="3">
                                            <circle cx="7" cy="7" r="7" stroke="none"></circle>
                                            <circle cx="7" cy="7" r="5.5"></circle>
                                        </g>
                                        <path
                                            d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                                            fill="#787878"></path>
                                    </svg>

                                    <div className="from-to-content relative ml-[9px] h-[74px]">
                                        <div className="content from top-0 absolute">
                                            <div className="hour text-[#484848] text-xl font-bold">{item?.startTime}</div>
                                            <div className="place w-40 text-[#484848] truncate">• {item?.startPoint}</div>
                                        </div>

                                        <div className="content to absolute bottom-[2px]">
                                            <div className="hour text-[#484848] text-xl font-bold">{item?.endTime}</div>
                                            <div className="place w-40 text-[#484848] truncate">• {item?.endPoint}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fare-info absolute top-0 right-0 w-[52%] text-right">
                                <div>
                                    <div
                                        className="fare flex text-xl text-[#2474e5] items-baseline font-bold justify-end mb-1">
                                        <div>{item?.price}</div>
                                    </div>
                                    <div className="fareSmall flex items-baseline justify-end mb-1">
                                        <div className="small text-sm text-[#707070] line-through font-normal"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="detail-action absolute bottom-0 right-0">
                                <div className="info mb-2">
                                    <div className="seat-available text-right text-base text-[#484848]">
                                        Còn {item?.emptySeats} chỗ trống
                                    </div>
                                </div>
                                <div className="action flex items-end float-right">
                                    <div>
                                        <button className="btn-booking p-2 bg-[#ffc700] hover:bg-[#e6be2e]" onClick={() => setShowOrderModal(true)}>
                                            <div className="text-[#484848] font-medium rounded-sm border-none py-4 px-2 h-[35px]">Chọn chuyến</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <OrderTicket
                    showModalOrderTicket={showOrderModal}
                    setShowModalOrderTicket={setShowOrderModal}
                    item={item}
                />
            </div>
        </>
    )
}

export default CustomerTicketCard;