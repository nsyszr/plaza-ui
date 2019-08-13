<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="pa-4">
      <v-card-title primary-title class="pa-4">Add new device</v-card-title>

      <v-card-text
        class="pa-4"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
      <v-card-actions class="pa-4">
        <v-btn
          color="primary"
          block
          depressed
          @click="dialog = false; $emit('create', {id:'2',name:'test',status:'REGISTERED'})"
        >Create Device</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "ManageDevicesContainer",
  props: {
    value: Boolean
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>