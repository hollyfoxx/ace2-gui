import BaseApi from './base'
import {UUID} from "../../models/base";
import {UserCreate, UserUpdate} from "../../models/user";

const api = new BaseApi();

export default
{
    endpoint: '/user/',

    // CREATE
    async createUser(user: UserCreate)
    {
        return await api.createRequest(`${this.endpoint}`, user).catch(err => {throw err});

    },

    // READ
    async getAllUsers()
    {
        return await api.readRequest(`${this.endpoint}`).catch(err => {throw err});
    },

    async getUser(uuid: UUID)
    {
        return await api.readRequest(`${this.endpoint}${uuid}`).catch(err => {throw err});
    },

    // UPDATE
    async updateUser(user: UserUpdate, uuid: UUID)
    {
        return await api.updateRequest(`${this.endpoint}${uuid}`, user).catch(err => {throw err});
    }

}