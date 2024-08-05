import ClientAxios from "../../../config/clientAxios"
import { IApiResponse } from "../../../model"

export class IBrand {
    name?:string;
    description?:string;
    phone?:string;
    image?:string;
    address?:string;
}

const saveBrandApi = async (data: any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/BUS-SERVICE/api/brand',data)
        return res.data
    } catch (error) {
        // handle err
    }
}
export {saveBrandApi};