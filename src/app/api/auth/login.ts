import ClientAxios from "../../config/clientAxios"
import { IApiResponse } from "../../model"

interface ILogIn {
    phoneNumber: string,
    password: string
}

const loginApi = async (data: ILogIn): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/ORDERS-SERVICE/api/auth/sign-in',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export {loginApi}