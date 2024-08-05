import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model"

export class IPickUp {
    id?:number;
    pickUpPoint?: any;
    pickUpTime?: any;
    pickUpId?: number
}
export class IDropOff{
    id?:number;
    dropOffPoint?:any;
    dropOffTime?:any;
    dropOffId?: number
}

export const addPickUp = async (shuttleId:any, data:IPickUp): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.put(`/BUS-SERVICE/api/pick-up?shuttleId=${shuttleId}`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const addDropOff = async (shuttleId:any, data:IDropOff): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.put(`/BUS-SERVICE/api/drop-off?shuttleId=${shuttleId}`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getAllPickUp = async (shuttleId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/pick-up/all?shuttleId=${shuttleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getAllDropOff = async (shuttleId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/drop-off/all?shuttleId=${shuttleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const updatePickUp = async (data:IPickUp): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/pick-up`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const updateDropOff = async (data:IDropOff): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/drop-off`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const deletePickUp = async (id:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.delete(`/BUS-SERVICE/api/pick-up?id=${id}`,)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const deleteDropOff = async (id:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.delete(`/BUS-SERVICE/api/drop-off?id=${id}`,)
        return res.data
    } catch (error) {
        // handle err
    }
}


