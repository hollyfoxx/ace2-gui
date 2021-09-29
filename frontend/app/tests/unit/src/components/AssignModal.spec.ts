import AssignModal from "@/components/modals/AssignModal.vue";
import {flushPromises, mount, shallowMount, VueWrapper} from "@vue/test-utils";
import store, {testVars} from "./mockStore"
import Dropdown from "primevue/dropdown";
import PrimeVue from "primevue/config";
import TheAlertActionToolbar from "@/components/Alerts/TheAlertActionToolbar.vue";
import {nextTick} from "vue";
import Vue from 'vue';
import ManageAlerts from "@/pages/Alerts/ManageAlerts.vue";
import Button from "primevue/button";
import BaseModal from "@/components/Modals/BaseModal.vue";
import Dialog from "primevue/dialog";


describe("AssignModal.vue",  () => {

    const wrapper = mount(AssignModal, {
        global: {
            plugins: [store, PrimeVue]
        }
    });
    it("renders", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("contains dropdown with loaded list of users",  async  () => {
        // console.log(document.body.innerHTML)
        // console.log(wrapper.html())
        let assign = wrapper
        // await store.dispatch('modals/open', 'AssignModal');
        console.log(wrapper.html())
        // console.log(document.body.innerHTML)
        await flushPromises();
        console.log(assign)
        console.log(assign.html())
        // testVars.errorCondition = true;
        await  assign.vm.loadUsers()
        console.log(assign.vm.users)
        await flushPromises()
        console.log(assign.isVisible())
        console.log(assign.vm.error)
        console.log(assign.vm.name)
        console.log(assign.vm.isOpen)
    });

})