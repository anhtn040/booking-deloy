import axios from 'axios';
import { API_ENDPOINT } from '../constant';

const ClientAxios = axios.create({ baseURL: API_ENDPOINT });

export default ClientAxios;