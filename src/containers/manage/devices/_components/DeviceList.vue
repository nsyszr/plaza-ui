<template>
  <v-card flat>
    <v-card-title class="pl-0 pr-0 pt-0 pb-8">
      Devices
      <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" outlined hide-details></v-text-field>
    </v-card-title>
    <v-data-table
      :items="devices"
      :headers="headers"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      multi-sort
      :search="search"
      class="elevation-0 nsys-data-table"
      hide-default-footer
    >
      <template v-slot:item.status="{ item }">
        <v-chip small :color="statusColor(item.status)" dark>{{item.status}}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "DeviceList",
  props: {
    devices: Array,
    headers: Array,
    sortBy: [String, Array],
    sortDesc: [String, Array]
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    statusColor: function(val) {
      if (val === "registered") return "light-blue";
      if (val === "online") return "light-green";
      return "grey";
    }
  }
};
</script>

<style>
</style>
