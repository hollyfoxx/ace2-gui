import Vuex from 'vuex';
import alerts from '@/store/alerts';
import {UUID} from "../../../../models/base";
import {AlertRead} from "../../../../models/alert";
import axiosInstance from '@/../services/api/axios';
import mock = jest.mock;
const actions = alerts.actions;
const mutations = alerts.mutations;

let mockAlertCreate = {
    queue: 'default',
    type: 'MockType',
    uuid: 'uuid1',
    version: 'VersionId1',
    eventTime: new Date(),
    name: 'MockAlert'
};

let mockAlertRead = {
    analysis: {},
    insertTime: new Date(),
    queue: 'default',
    type: 'MockType',
    uuid: 'uuid1',
    comments: [],
    directives: [],
    threats: [],
    tags: [],
    version: 'VersionId1',
    eventTime: new Date(),
    instructions: 'MockInstructions',
    name: 'MockAlert'
};

describe('alerts Mutations', () => {
    it('will set the openAlert state value to a given alert object', () => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations});


        store.commit('SET_OPEN_ALERT', mockAlertRead);
        expect(state.openAlert).toEqual(mockAlertRead);

    });
    it('will add a list of queried alerts to the queriedAlerts list', () => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations});


        store.commit('SET_QUERIED_ALERTS', [mockAlertRead, mockAlertRead]);
        expect(state.queriedAlerts.length).toBe(2);

    });
    it('will set the lastGetAll timestamp to the current time', () => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations});

        let before_time = new Date().getTime();
        store.commit('SET_QUERY_TIMESTAMP');
        let after_time = new Date().getTime();
        expect(state.lastQueriedAlertsTime).toBeGreaterThanOrEqual(before_time);
        expect(state.lastQueriedAlertsTime).toBeLessThanOrEqual(after_time);
    });
})

describe('alerts Actions', () => {
    let mockRequest: jest.SpyInstance;

    beforeEach(() => {
        mockRequest = jest.spyOn(axiosInstance, 'request');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('will request to create an alert with a given AlertCreate object, and set the openAlert to result on success', async() => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations, actions});
        const result = {
            status: 200,
            data: mockAlertRead
        };
        mockRequest.mockImplementation(() => Promise.resolve(result));
        await store.dispatch('createAlert', mockAlertCreate);

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest.mock.calls.length).toEqual(1);

        expect(state.openAlert).toEqual(mockAlertRead);

    });

    // The getAlerts API call is not implemented right now, so this test won't work yet
    // it('will fetch query for alerts and update state variables upon queryAlerts action', async() => {
    //     let queriedAlerts: AlertRead[] = Array();
    //     let state = {
    //         openAlert: null,
    //         lastQueriedAlertsTime: null,
    //         queriedAlerts: queriedAlerts
    //     };
    //     const store = new Vuex.Store({state, mutations, actions});
    //     const result = {
    //         status: 200,
    //         data: [mockAlertRead, mockAlertRead]
    //     };
    //     mockRequest.mockImplementation(() => Promise.resolve(result));
    //
    //     let before_time = new Date().getTime();
    //     await store.dispatch('queryAlerts', {query: 'default'});
    //     let after_time = new Date().getTime();
    //
    //     expect(mockRequest).toHaveBeenCalled();
    //     expect(mockRequest.mock.calls.length).toEqual(1);
    //
    //     expect(state.queriedAlerts[0]).toEqual(mockAlertRead);
    //     expect(state.queriedAlerts.length).toEqual(2);
    //
    //     expect(state.lastQueriedAlertsTime).toBeGreaterThanOrEqual(before_time);
    //     expect(state.lastQueriedAlertsTime).toBeLessThanOrEqual(after_time);
    //
    // });

    it('will make fetch alert data given an alert ID', async() => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations, actions});
        const result = {
            status: 200,
            data: mockAlertRead
        };
        mockRequest.mockImplementation(() => Promise.resolve(result));
        await store.dispatch('openAlert', 'uuid1');

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest.mock.calls.length).toEqual(1);

        expect(state.openAlert).toEqual(mockAlertRead);

    });

    it('will make a request to update an alert given the UUID and update data upon the updateAlert action', async() => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations, actions});
        const result = {
            status: 200
        };
        mockRequest.mockImplementation(() => Promise.resolve(result));
        await store.dispatch('updateAlert', {oldAlertUUID: 'uuid1', updateData: {disposition: 'test'}});

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest.mock.calls.length).toEqual(1);

        // None of these should be changed
        expect(state.openAlert).toBeNull();
        expect(state.queriedAlerts).toEqual(queriedAlerts);
        expect(state.lastQueriedAlertsTime).toBeNull();

    });

    it('will make multiple reqs to update multiple alerts given a list of UUIDS and update data upon the updateAlerts action', async() => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations, actions});
        const result = {
            status: 200
        };
        mockRequest.mockImplementation(() => Promise.resolve(result));
        await store.dispatch('updateAlerts', {oldAlertUUIDs: ['uuid1', 'uuid2'], updateData: {disposition: 'test'}});

        expect(mockRequest).toHaveBeenCalled();
        expect(mockRequest.mock.calls.length).toEqual(2);

        // None of these should be changed
        expect(state.openAlert).toBeNull();
        expect(state.queriedAlerts).toEqual(queriedAlerts);
        expect(state.lastQueriedAlertsTime).toBeNull();

    });

    it('will throw an error when a request fails in any action', async() => {
        let queriedAlerts: AlertRead[] = Array();
        let state = {
            openAlert: null,
            lastQueriedAlertsTime: null,
            queriedAlerts: queriedAlerts
        };
        const store = new Vuex.Store({state, mutations, actions});
        const result = {
            status: 403,
            statusText: 'mockError'
        };
        mockRequest.mockImplementation(() => Promise.resolve(result));

        await expect(store.dispatch('createAlert')).rejects.toEqual(new Error('create failed: 403: mockError'))
        await expect(store.dispatch('openAlert')).rejects.toEqual(new Error('fetch failed: 403: mockError'))
        await expect(store.dispatch('updateAlert', {oldAlertUUID: 'uuid1', updateData: {disposition: 'test'}})).rejects.toEqual(new Error('update failed: 403: mockError'))
        await expect(store.dispatch('updateAlerts', {oldAlertUUIDs: ['uuid1'], updateData: {disposition: 'test'}})).rejects.toEqual(new Error('update failed: 403: mockError'))

    });
})


