import Vuex from 'vuex';
import modals from '@/store/modals';
const actions = modals.actions;
const mutations = modals.mutations;
const getters = modals.getters;


describe('modals Getters', () => {
    it('will return empty list of open IDs when no modals are open', () => {
        let open = Array();
        let state = {open: open};
        const store = new Vuex.Store({state, mutations, getters});

        expect(store.getters["allOpen"]).toStrictEqual([]);

    });
    it('will return null when there is no open/active modals', () => {
        let open = Array();
        let state = {open: open};
        const store = new Vuex.Store({state, mutations, getters});

        expect(store.getters["active"]).toBeNull();

    });
    it('will return list of all currently open modals when there are open modals', () => {
        let open = ['modal1', 'modal2'];
        let state = {open: open};
        const store = new Vuex.Store({state, mutations, getters});

        expect(store.getters["allOpen"]).toStrictEqual(open);
    });
    it('will return the name of the currently active modal (first in the list)', () => {
        let open = ['modal1', 'modal2'];
        let state = {open: open};
        const store = new Vuex.Store({state, mutations, getters});

        expect(store.getters["active"]).toBe('modal1');
    });
})

describe('modals Mutations', () => {
    it('will add a new modal to the front of the open list', () => {
        let open = Array();
        let state = {open: open};
        const store = new Vuex.Store({state, mutations});

        store.commit('OPEN', 'modal1');
        expect(state.open.length).toBe(1);
        store.commit('OPEN', 'modal2');
        expect(state.open.length).toBe(2);
        expect(state.open[0]).toBe('modal2');

    });
    it('will remove the given modal from the open list', () => {
        let open = ['modal1', 'modal2'];
        let state = {open: open};
        const store = new Vuex.Store({state, mutations});

        store.commit('CLOSE', 'modal2');
        expect(state.open.length).toBe(1);
        store.commit('CLOSE', 'modal1');
        expect(state.open.length).toBe(0);
    });

})

describe('modals Actions', () => {
    it('will add a new modal to the front of the open list upon the open action', () => {
        let open = Array();
        let state = {open: open};
        const store = new Vuex.Store({actions, getters, state, mutations});

        store.dispatch('open', 'modal1');
        expect(state.open.length).toBe(1);
        expect(state.open[0]).toBe('modal1');
        store.dispatch('open', 'modal2');
        expect(state.open.length).toBe(2);
        expect(state.open[0]).toBe('modal2');

    });
    it('will remove the given modal from the open list upon the close action', () => {
        let state = {open: ['modal1']};
        const store = new Vuex.Store({actions, getters, state, mutations});

        store.dispatch('close', 'modal1');
        expect(state.open.length).toBe(0);
    });
})


