import ClientAxios from "@/app/config/clientAxios";
import { IApiResponse } from "../../../model"

export class IRoute {
    id?:string;
    startPoint?:string;
    endPoint?:string;
    brandId?:string;
    userId?:string;
}


export const createRoute = async (data: IRoute | undefined): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/BUS-SERVICE/api/routes',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const updateRoute = async (data: IRoute): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.put(`/BUS-SERVICE/api/routes`, data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const deleteRoute = async (id:any, userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.delete(`/BUS-SERVICE/api/routes/${id}?userId=${userId}`)
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

export const getRoute = async (id:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes/${id}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getRouteByUserId = async (userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes/custom-name?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getReturnRoute = async (routeId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes/route-return?routeId=${routeId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getRouteCustomName = async (userId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes/?userId=${userId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getRouteToSearch = async (): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get('/BUS-SERVICE/api/routes/search')
        return res.data
    } catch (error) {
        // handle err
    }
}



