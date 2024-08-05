import ClientAxios from "../../../config/clientAxios"
import { IApiResponse } from "../../../model"

export interface IBus {
    busType?:string,
    description?:string,
    id?:string,
    identityCode?:string,
    name?:string,
    seats?:string
}
export interface IBusRequest {
    typeId?:string,
    description?:string,
    id?:string,
    identityCode?:string,
    name?:string,
    seats?:string
}

export const createOrUpdate = async (data: IBus | undefined): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/BUS-SERVICE/api/bus',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

const allBusApi = async (userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/bus/all?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const deleteBus = async (id:number): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.delete(`BUS-SERVICE/api/bus/${id}`)
        return res.data
    } catch (error) {
        // handle err
    }
}
export const getBus = async (id:number): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`BUS-SERVICE/api/bus/${id}`)
        return res.data
    } catch (error) {
        // handle err
    }
}





export {allBusApi}
