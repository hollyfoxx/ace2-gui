import api from './base'
import {UUID} from '../../models/base'
import {AlertCreate, AlertUpdate} from '../../models/alert'

export default
{
    endpoint: '/alert/',

    // CREATE
    async createAlert(alert: AlertCreate)
    {
        return await api.createRequest(`${this.endpoint}`, alert).catch(err => {throw err});
    },

    // READ
    async getAlert(uuid: UUID)
    {
        return await api.readRequest(`${this.endpoint}${uuid}`).catch(err => {throw err});
    },

    async getAlerts(filters: Record<string, unknown>)
    {
        throw Error("Not implemented")
    },

    // UPDATE
    async updateAlert(alert: AlertUpdate, uuid: UUID)
    {
        return await api.updateRequest(`${this.endpoint}${uuid}`, alert).catch(err => {throw err});
    }

}