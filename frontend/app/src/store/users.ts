import user from "../../services/api/users"
import {UserRead} from "../../models/user"
import {CommitFunction} from "@/store/index";

const store =  {
    namespaced: true,

    state: {
        // last time all users were fetched
        lastGetAll: null,
        // all users
        users: Array()
    },
    getters: {
        users: (state: { users: UserRead[] }) =>
            state.users,
    },
    mutations: {
        SET_USERS (state: { users: UserRead[], lastGetAll: number }, users: UserRead[]) {
            state.users = users;
        },
        SET_GET_ALL_TIMESTAMP(state: {  users: UserRead[], lastGetAll: number }) {
            state.lastGetAll = new Date().getTime();
        }
    },

    actions: {
        getAllUsers ({ commit }: CommitFunction) {
            return user.getAllUsers()
            .then(users => {
                commit('SET_USERS', users);
                commit('SET_GET_ALL_TIMESTAMP');
            })
            .catch(error => {throw error});
        }
    }
};

export default store;