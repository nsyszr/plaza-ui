<template>
  <v-layout wrap>
    <v-flex xs10 offset-xs1>
      <manage-devices-container />
    </v-flex>
  </v-layout>
</template>

<script>
import ManageDevicesContainer from "@/containers/manage/devices";
export default {
  name: "ManageDevices",
  components: {
    ManageDevicesContainer
  }
};
</script>