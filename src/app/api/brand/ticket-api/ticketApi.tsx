import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model";


interface SeatDTO{
    id?:any;
    price?:any;
    eatingFee?:any;
    seatName?:string;
    statusTicket?:string;
    customerName?:string;
    customerPhone?:string;
}

export const getScheduleByTravelDate = async (dateStart:any, userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/schedules/travel-date?dateStart=${dateStart}&userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getEmptySeat = async (dateStart:any, scheduleId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/seats/empty_seat?dateStart=${dateStart}&scheduleId=${scheduleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getSeatWithStatus = async (scheduleId:any,status:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/seats/status?scheduleId=${scheduleId}&status=${status}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getSeatInTicketPage = async (scheduleId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/seats?scheduleId=${scheduleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}





