import {BaseApi, BaseModel, UUID} from './base'

interface UserBase extends BaseModel {
    defaultAlertQueue?: string
    displayName?: string
    email?: string
    enabled?: boolean
    roles?: Array<string>
    timezone?: string
    username?: string
}

interface UserCreate extends UserBase {
    password: string
    uuid: UUID
}

interface UserRead extends UserBase {
    // todo: change to AlertQueueRead
    defaultAlertQueue: string
    // todo: change to UserRoleRead
    roles: Array<string>
    uuid: UUID
}

interface UserUpdate extends UserBase {
    defaultAlertQueue?: string
    displayName?: string
    email?: string
    enabled?: boolean
    password?: string
    roles?: Array<string>
    timezone?: string
    username?: string
}

export default
{
    endpoint: '/user/',

    async createUser(user: UserCreate)
    {
        const api = new BaseApi()
        const response = await api.createRequest(`${this.endpoint}`, user)
        if (response && response.status === 200) {
            return response.data;
        }
    },

    async getAllUsers()
    {
        const api = new BaseApi()
        const response = await api.readRequest(`${this.endpoint}`)
        if (response && response.status === 200) {
            return response.data;
        }
    },

    async getUser(uuid: UUID)
    {
        const api = new BaseApi()
        const response = await api.readRequest(`${this.endpoint}${uuid}`)
        if (response && response.status === 200) {
            // todo? validate
            // todo? transform response data into AlertRead object?
            return response.data;
        }
    },

    async updateUser(user: UserUpdate, uuid: UUID)
    {
        const api = new BaseApi()
        const response = await api.updateRequest(`${this.endpoint}${uuid}`, user)
        if (response && response.status === 200) {
            return response.data;
        }
    }

}