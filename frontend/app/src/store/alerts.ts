import alert from "../../services/api/alerts"
import {AlertCreate, AlertRead} from "../../models/alert"
import {CommitFunction} from "@/store/index";
import {UUID} from "../../models/base";

const store =  {
    namespaced: true,

    state: {
        // currently opened alert
        openAlert: null,
        // last time alerts were fetched with current filter settings
        lastQueriedAlerts: null,
        // all alerts returned from current filter settings
        queriedAlerts: []
    },

    mutations: {
        SET_OPEN_ALERT(state: {openAlert: AlertRead}, alert: AlertRead){
            state.openAlert = alert;
        },
        SET_QUERIED_ALERTS(state: { queried_alerts: AlertRead[] }, alerts: AlertRead[]) {
            state.queried_alerts = alerts;
        },
        SET_QUERY_TIMESTAMP(state: { lastQueriedAlerts: number }) {
            state.lastQueriedAlerts = new Date().getTime();
        }
    },

    actions: {
        createAlert({commit} : CommitFunction, newAlert: AlertCreate) {
            return alert.createAlert(newAlert)
                .then(alert => {
                    commit('SET_OPEN_ALERT', alert);
                    //may have to return id?
                })
                .catch(error => {throw error});
        },
        queryAlerts({commit} : CommitFunction, queryFilters: Record<string, unknown>) {
            return alert.getAlerts(queryFilters)
                .then(alerts => {
                    commit('SET_USERS', alerts);
                    commit('SET_QUERY_TIMESTAMP');
                })
                .catch(error => {throw error});
        },
        openAlert({commit} : CommitFunction, alertUUID: UUID) {
            return alert.getAlert(alertUUID)
                .then(alert => {
                    commit('SET_OPEN_ALERT', alert);
                })
                .catch(error => {throw error});
        },
        updateAlert({commit} : CommitFunction, payload: {oldAlert: AlertRead, updateData: Record<string, unknown>}) {
            const updatedAlert = Object.assign(payload.oldAlert, payload.updateData);
            return alert.updateAlert(updatedAlert, payload.oldAlert.uuid)
                .catch(error => {throw error});
        },
        updateAlerts({commit} : CommitFunction, payload: {oldAlerts: AlertRead[], updateData: Record<string, unknown>}) {
            // I have no idea if this is the right way to do this
            // but basically pushing all the requests to update into an array
            const promises = [];
            for (let i = 0; i < payload.oldAlerts.length; i++) {
                const updatedAlert = Object.assign(payload.oldAlerts[i], payload.updateData);
                promises.push(alert.updateAlert(updatedAlert, updatedAlert.uuid));
            }

            // and then all of those requests are resolved here
            return Promise.all(promises)
                .catch(error => {throw error});

            // reason enough to have an updateMultiple in api?
        }

    }
};

export default store;