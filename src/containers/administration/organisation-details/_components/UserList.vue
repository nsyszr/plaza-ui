<template>
  <v-data-table
    :items="users"
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
</template>

<script>
export default {
  name: "OrganisationUserList",
  props: {
    users: Array,
    headers: Array,
    sortBy: [String, Array],
    sortDesc: [String, Array]
  },
  data: () => {
    return {
      search: ""
    };
  }
};
</script>

<style>
</style>
