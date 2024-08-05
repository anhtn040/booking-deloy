import ClientAxios from "@/app/config/clientAxios"
import { IApiResponse } from "@/app/model"

export class OrderDTO{
    listSeat?:string[];
    orderDate?:any;
    orderId?:string
    orderCode?:string;
    orderStatus?:string;
    totalPrice?:number;
    deposit?:number;
    routeName?:string;
    brandName?:string;
    travelDate?:any;
    startTime?:any;
    paymentStatus?:string;
    brandPhone?:string;
    price?:number;
    eatingFee?:number;
    quantityEating?:number;
    quantityTicket?:number;
    giftMoney?:number;
    restMoney?:number;
}

export class Orders{
    id?:number;
    orderCode?:string;
    orderDate?:string;
    totalPrice?:number;
    deposit?:any;
    orderStatus?:string;
    restPrice?:number;
    listSeat?:string[];
    paymentStatus?:string;
}

export class DateAndTime{
    date?:any;
    time?:any;
}

export const getAllCityRoute = async (): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/routes/search`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const searchSuttle = async (data:{startPoint:string,endPoint:string,travelDate:string}): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/BUS-SERVICE/api/shuttles/search-shuttle`,data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getTicketStep = async (scheduleId:string): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/BUS-SERVICE/api/seats/shuttles?scheduleId=${scheduleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const createOrder = async (data:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('/ORDERS-SERVICE/api/orders',data)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const createPay = async (data:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post('ORDERS-SERVICE/payment/create-pay',data)
        return res.data
    } catch (error) {
        // handle err
    }
}


export const searchOrderByOrderCode = async (orderCode:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/ORDERS-SERVICE/api/orders/order?orderCode=${orderCode}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const cancelOrder = async (orderId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/ORDERS-SERVICE/api/orders/cancel?orderId=${orderId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const ApprovalOrder = async (orderId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/ORDERS-SERVICE/api/orders/approval?orderId=${orderId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getTotalMoney = async (scheduleId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/ORDERS-SERVICE/api/orders/totalMoney?scheduleId=${scheduleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const enterDeposit = async (orderId:any, deposit:any ): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.put(`/ORDERS-SERVICE/api/orders/deposit?orderId=${orderId}&deposit=${deposit}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getOrderInSchedule = async (scheduleId:any ): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/ORDERS-SERVICE/api/orders?scheduleId=${scheduleId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const getDateAndTimeByOrder = async (orderId:any ): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.get(`/ORDERS-SERVICE/api/orders/datetime?orderId=${orderId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}

export const confirmPaid = async (orderId:any): Promise<IApiResponse | undefined>=>{
    try {
        const res = await ClientAxios.post(`/ORDERS-SERVICE/api/orders/confirmPaid?orderId=${orderId}`)
        return res.data
    } catch (error) {
        // handle err
    }
}





