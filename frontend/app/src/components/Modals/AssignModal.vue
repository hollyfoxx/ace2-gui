<!-- AssignModal.vue -->
<!-- 'Assign' alert action modal -->

<template>
  <BaseModal :name="this.name" header="Assign Ownership">
    <div>
      <div class="p-col"
           v-if="error">
        <Message severity="error" @close="handleError">{{error}}</Message>
      </div>
    </div>
    <div class="p-m-1 p-grid p-fluid p-formgrid p-grid">
      <div class="p-field p-col"
           v-if="!isLoading">
        <Dropdown
          v-model="selectedUser"
          :options="users"
          optionLabel="displayName"
          placeholder="Select a user"
        />
      </div>
      <div class="p-col p-offset-3"
           v-if="isLoading">
        <ProgressSpinner/>
      </div>
    </div>
    <template #footer>
      <Button
        label="Nevermind"
        icon="pi pi-times"
        @click="close"
        class="p-button-text"
      />
      <Button label="Assign" icon="pi pi-check" @click="close" />
    </template>
  </BaseModal>
</template>

<script>
import { mapState } from 'vuex';

import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';

import BaseModal from "./BaseModal";

export default {
  name: "AssignModal",
  components: { BaseModal, Button, Dropdown, Message, ProgressSpinner},

  computed: {
    name() {
      return this.$options.name;
    },
    isOpen() {
      return this.$store.getters["modals/allOpen"].includes(this.name);
    },
    ...mapState({users: state => state.users.users}),
  },

  data() {
    return {
      error: null,
      isLoading: false,
      selectedUser: null
    };
  },

  created() {
    this.loadUsers();
  },

  watch: {
    isOpen: function(oldValue, newValue) {
      if (newValue === false) {
        this.loadUsers();
      }
    }
  },

  methods: {
    async loadUsers() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('users/getAllUsers');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    close() {
      this.selectedUser = null;
      this.$store.dispatch("modals/close", this.name);
    },
  },
};
</script>
