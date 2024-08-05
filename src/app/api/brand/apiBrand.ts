import ClientAxios from "../../config/clientAxios"
import { IApiResponse } from "../../model"

interface IBus {
    id : number,
    description:string,
    identityCode:string,
    name:string,
    seats:number,
    typeId:number,
    brandId:number
}

const saveBusApi = async (data: IBus): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/BUS-SERVICE/api/bus',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

const allBusApi = async (): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get('/BUS-SERVICE/api/bus/all')
        return res.data
    } catch (error) {
        // handle err
    }
}

const getBusIdApi = async (id:number): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`BUS-SERVICE/api/bus/${id}`)
        return res.data
    } catch (error) {
        // handle err
    }
}





export {saveBusApi}
export {allBusApi}
export {getBusIdApi}
