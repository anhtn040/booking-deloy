import { Tracing } from "trace_events";
import ClientAxios from "../../config/clientAxios";
import { IApiResponse } from "../../model";

interface IBrand {
  id?: number;
  name: string;
  image: string;
  phone: string;
  address: string;
  description: string;
  userId: string;
}

interface IRoute {
  id?: number;
  userId?:number;
  duration: string;
  endPoint: string;
  startPoint: string;
}

const getBrand = async (id: string): Promise<IApiResponse | undefined> => {
  try {
    const res = await ClientAxios.get(`/BUS-SERVICE/api/brand/${id}`);
    return res.data;
  } catch (error) {
  }
};

const createBrand = async (data: IBrand): Promise<IApiResponse | undefined> => {
  try {
    const res = await ClientAxios.post("/BUS-SERVICE/api/brand", data);
    return res.data;
  } catch (error) {
  }
};

const getAllRoute = async (userId: string) => {
  try {
    const res = await ClientAxios.get(`/BUS-SERVICE/api/routes?userId=${userId}`);
    return res.data;
  } catch (error) {
    
  }
};

const createRoute = async (data: IRoute) => {
  try {
    const res = await ClientAxios.post("/BUS-SERVICE/api/routes", data);
    return res.data;
  } catch (error) {
    console.log("error",error)
  }
};

const updateRoute = async (data: IRoute) => {
  try {
    const res = await ClientAxios.put("/BUS-SERVICE/api/routes", data);
    return res.data;
  } catch (error) {
    console.log("error",error)
  }
};

const deleteRoute = async (routeId: string,userId: string) => {
  try {
    const res = await ClientAxios.delete(`/BUS-SERVICE/api/routes/${routeId}?userId=${userId}`);
    return res.data;
  } catch (error) {
    console.log("error",error)
  }
};

export { getBrand, createBrand, getAllRoute, createRoute,deleteRoute,updateRoute };
