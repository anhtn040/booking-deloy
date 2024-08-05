import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model";

export class Ticket{
    id?:number;
    seatName?:string;
    price?:string;
    eatingFee?:string;
    statusTicket?:string;
    customerName?:string;
    customerPhone?:string;
    booked?:boolean;
}