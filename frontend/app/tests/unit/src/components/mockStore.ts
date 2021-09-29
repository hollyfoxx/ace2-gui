import {createStore} from "vuex";
import {CommitFunction} from "@/store";
import alerts from '@/store/alerts';
import users from '@/store/users';
import modals from "@/store/modals";
import selectedAlerts from "@/store/selectedAlerts";
import {AlertCreate} from "../../../../models/alert";
import alert from "../../../../services/api/alerts";
import {UUID} from "../../../../models/base";

const alertsState = alerts.state;
const alertsMutations = alerts.mutations;

const usersState = users.state;
const usersGetters = users.getters;
const usersMutations = users.mutations;

export class testVars {
    public static errorCondition: boolean = false
}

const alertsStore = {
    namespaced: true,
    state: alertsState,
    mutations: alertsMutations,
    actions: {
        createAlert({commit} : CommitFunction, newAlert: AlertCreate) {
            return Promise.resolve<Array<string> | Error>(['Alice', 'Bob']);
        },
        queryAlerts({commit} : CommitFunction, queryFilters: Record<string, unknown>) {
            return Promise.resolve<Array<string> | Error>(['Alice', 'Bob']);
        },
        openAlert({commit} : CommitFunction, alertUUID: UUID) {
            return Promise.resolve<Array<string> | Error>(['Alice', 'Bob']);
        },
        updateAlert({commit} : CommitFunction, payload: {oldAlertUUID: UUID, updateData: Record<string, unknown>}) {
            return Promise.resolve<Array<string> | Error>(['Alice', 'Bob']);
        },
        updateAlerts({commit} : CommitFunction, payload: {oldAlertUUIDs: UUID[], updateData: Record<string, unknown>}) {
           return Promise.resolve<Array<string> | Error>(['Alice', 'Bob']);
        }
    }
}

const usersStore = {
    namespaced: true,

    state: usersState,
    getters: usersGetters,
    mutations: usersMutations,

    actions: {
        getAllUsers({commit}: CommitFunction) {
            let promise = Promise.resolve<Array<string>|Error>(['Alice', 'Bob']);

            if (testVars.errorCondition) {
                promise = Promise.reject(new Error('Call failed'));
            }
            return promise
                .then(users => {
                    commit('SET_USERS', users);
                    commit('SET_GET_ALL_TIMESTAMP');
                })
                .catch(error => {
                    throw error
                });
        }
    }
}

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: { modals: modals, users: usersStore, selectedAlerts: selectedAlerts },
});

