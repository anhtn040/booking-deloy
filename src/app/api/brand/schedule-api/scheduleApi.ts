import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model";


export class ScheduleDTO{
    id?:number;
    startTime?:string;
    routeName?:string;
    shuttleId?:number;
}



export class Schedule{
    id?:number;
    dateStart?:string;
    startTime?:any;
    busName?:string;
    price?:number;
    seats?:number;
    eatingFee?:number;
    emptySeats?:number;
    travelDate?:string;
    routeName?:string;
    busId?:number;
    shuttleId?:any
}


export class ScheduleAvailable{
    emptySeats?:number;
    shuttleId?:number;
    scheduleId?:number;
    price?:number;
    seats?:number;
    eatingFee?:number;
    image?:string;
    brandName?:string;
    type?:string;
    busId?:string;
    startTime?:any;
    endTime?:any;
    routeId?:number;
    startPoint?:string;
    endPoint?:string;
}


export const getAllSchedule = async (routeId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/schedules?routeId=${routeId}`,)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const createSchedule = async (data:Schedule): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/schedules`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const updateSchedule = async (data:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/schedules`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}
export const getScheduleByTravelDate = async (dateStart:any, userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/schedules/travel-date?dateStart=${dateStart}&userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getAllRoutes = async (userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getShuttleByRoute = async (routeId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/shuttles/shuttle?routeId=${routeId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getScheduleByRoute = async (routeId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/schedules?routeId=${routeId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getBusForDropDownByTravelDateForUpdate = async (userId:any, travelDate:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/bus/dropdown1?travelDate=${travelDate}&userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getBusForDropDownByTravelDate = async (userId:any, dateStart:any, dateEnd:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/bus/dropdown?userId=${userId}&dateStart=${dateStart}&dateEnd=${dateEnd}`)
        return res.data
    } catch (error) {
        // handle err
    }
}















