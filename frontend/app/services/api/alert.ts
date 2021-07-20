import {BaseApi, BaseModel, BaseCreate, BaseRead, BaseUpdate, UUID} from './base'


interface AlertBase extends BaseModel{
    description?: string
    eventTime: Date
    instructions: string
    name: string
    owner?: string
    queue: string
    tool?: string
    toolInstance?: string
    type: string

}
interface AlertCreate extends BaseCreate, AlertBase {
    uuid: UUID
}

// todo
// this may not actually be necessary
// format response object into this? idk
interface AlertRead extends BaseRead, AlertBase {
    // todo: change to AnalysisRead
    analysis: Record<string, unknown>
    // todo: change to AlertDispositionRead
    disposition?: string
    dispositionTime?: Date
    // todo: change to UserRead
    dispositionUser?: string
    eventUuid?: UUID
    insertTime: Date
    // todo: change to UserRead
    owner?: string
    // todo: change to AlertQueueRead
    queue: string
    // todo: change to AlertToolRead
    tool?: string
    // todo: change to AlertToolInstanceRead
    tool_instance?: string
    // todo: change to AlertTypeRead
    type: string
    uuid: UUID

}

interface AlertUpdate extends BaseUpdate, AlertBase{
    disposition?: string
    eventUuid?: UUID
    queue: string
    type: string
}

export default
{
    endpoint: '/alert/',

    async createAlert(alert: AlertCreate)
    {
        const api = new BaseApi()
        const response = await api.createRequest(`${this.endpoint}`, alert)
        if (response && response.status === 200) {
            return response.data;
        }
    },

    async getAlert(uuid: UUID)
    {
        const api = new BaseApi()
        const response = await api.readRequest(`${this.endpoint}${uuid}`)
        if (response && response.status === 200) {
            // todo? validate
            // todo? transform response data into AlertRead object?
            return response.data;
        }
    },

    async updateAlert(alert: AlertUpdate, uuid: UUID)
    {
        const api = new BaseApi()
        const response = await api.updateRequest(`${this.endpoint}${uuid}`, alert)
        if (response && response.status === 200) {
            return response.data;
        }
    }

}