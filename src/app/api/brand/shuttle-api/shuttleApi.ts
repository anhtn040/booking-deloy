import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model"
import { Shuttle } from "@/app/brand-owner/shuttle/page";

export class shuttleResponse {
    id?:number;
    routeName?:string;
    startTime?:string;
    endTime?:string;

}

export interface IShuttle{
    id?: string;
    startTime?: string;
    endTime?:string;
    routeId?:string;
    dropOffs: DropOff [];  
    pickUps?: PickUp [];
}

export interface ShuttleRequestUpdate{
    id?:any;
    startTime?:any;
    endTime?:any;
}

interface DropOff {
    dropOffId?: string;
    dropOffPoint?: string;
    dropOffTime?: string;
}

interface PickUp {
    pickUpId?: string;
    pickUpPoint?: string;
    pickUpTime?: string;
}

export const getAllShuttles = async (userId: any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/shuttles?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const createShuttle = async (data:IShuttle): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/BUS-SERVICE/api/shuttles',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const updateShuttle = async (data:ShuttleRequestUpdate): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.put('/BUS-SERVICE/api/shuttles',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getShuttleByRoute = async (routeId: any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/shuttles/shuttle?routeId=${routeId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getRouteUser = async (userId: any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const deleteShuttle = async (id: any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.delete(`/BUS-SERVICE/api/shuttles/shuttle?id=${id}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const searchShuttle = async (startPoint:any,endPoint:any, travelDate:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/shuttles/search-shuttle?startPoint==${startPoint}&endPoint==${endPoint}&travelDate=${travelDate}`)
        return res.data
    } catch (error) {
        // handle err
    }
}





