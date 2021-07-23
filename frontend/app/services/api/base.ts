import {AxiosRequestConfig} from "axios";
import instance from "./axios";
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

type Method = 'GET' | 'DELETE' | 'POST' | 'PATCH'

class BaseApi {
    SUCCESS_RESPONSE_CODES = [200, 201, 202, 203, 204, 205, 206]

    formatIncomingData(data: Record<string, any>) {
        return camelcaseKeys(data, {deep: true})
    }

    formatOutgoingData(data: Record<string, any>) {
        return snakecaseKeys(data);
    }

    methodDict = {
        'POST': 'create',
        'GET': 'fetch',
        'PATCH': 'update',
        'DELETE': 'delete',
    }


     protected async baseRequest(url: string, method: Method, data?: Record<string, any>) {
         const config: AxiosRequestConfig = {
             'url': url,
             'method': method,
         };

         if (data) {
             config['data'] = this.formatOutgoingData(data);
         }

         const response = await instance
            .request(config)
            .catch((error) => {
                throw error;
            });

         if (response) {
             if (this.SUCCESS_RESPONSE_CODES.includes(response.status)) {
                 if (Array.isArray(response.data)) {
                     return response.data.map(this.formatIncomingData);
                 }
                 return this.formatIncomingData(response.data);
             }
             throw new Error(`${this.methodDict[method]} failed: ${response.status}: ${response.statusText}`);
         }
         throw new Error(`${this.methodDict[method]} failed!`);

    }

     async createRequest(url: string, data?: Record<string, any>) {
        return await this.baseRequest(url, 'POST', data);
    }

    async readRequest(url: string) {
        return await this.baseRequest(url, 'GET');
    }

    async updateRequest(url: string, data?: Record<string, any>) {
        return await this.baseRequest(url, 'PATCH', data);
    }

}

const api = new BaseApi();
export default api;