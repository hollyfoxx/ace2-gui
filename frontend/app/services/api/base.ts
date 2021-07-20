import axios from "axios";
import {AxiosRequestConfig, Method} from "axios";
import instance from "./axios";


export class BaseApi {

     protected async baseRequest(url: string, method: Method, data?: BaseModel) {
         const config: AxiosRequestConfig = {
             'url': url,
             'method': method,
         };

         if (data) {
             config['data'] = data;
         }

         console.log(instance.defaults.headers);

        return await instance
            .request(config)
            .catch((error) => {
                console.error(error);
            });

    }

     async createRequest(url: string, data?: BaseCreate) {
        return await this.baseRequest(url, 'POST', data);
    }

    async readRequest(url: string) {
        return await this.baseRequest(url, 'GET');
    }

    async updateRequest(url: string, data?: BaseUpdate) {
        return await this.baseRequest(url, 'PATCH', data);
    }

}

export type UUID = string

export interface BaseModel {
    directives: Array<string>
    tags: Array<string>
    threat_actor?: string
    threats: Array<string>
    version: UUID

}

export interface BaseCreate extends BaseModel {
    uuid: UUID
}

export interface BaseRead extends BaseModel {
    // todo: create interfaces for each of these (comment, directive, tag, etc.)
    // update Array<string> to be like Array<CommentRead> for each
    comments: Array<string>
    directives: Array<string>
    tags: Array<string>
    threatActor?: string
    threats: Array<string>
    uuid: UUID
}

export interface BaseUpdate extends BaseModel {
    directives: Array<string>
    tags: Array<string>
    threats: Array<string>
    version: UUID
}
