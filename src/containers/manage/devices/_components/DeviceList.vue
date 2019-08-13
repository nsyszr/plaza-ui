<template>
  <v-card flat>
    <v-card-title class="pl-0 pr-0 pt-0 pb-8">
      Devices
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        outlined
        hide-details
      ></v-text-field>
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
      <!-- <template v-slot:item.validated="{ item }">
        <v-icon small v-show="item.validated" color="success">mdi-check</v-icon>
      </template>-->
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: 'DeviceList',
  props: {
    devices: Array,
    headers: Array,
    sortBy: [String, Array],
    sortDesc: [String, Array]
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style>
</style>
