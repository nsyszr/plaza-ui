<template>
  <user-list :users="users" :headers="headers" :sortBy="sortBy" :sortDesc="sortDesc" />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store";
import UserList from "./_components/UserList";
export default {
  name: "AdministrationUsersContainer",
  props: {
    organisationUuid: String
  },
  components: {
    UserList
  },
  computed: {
    ...mapGetters({
      users: "$_administration_users/users",
      dataTableHeaders: "$_administration_users/dataTableHeaders",
      dataTableSortBy: "$_administration_users/dataTableSortBy",
      dataTableSortDesc: "$_administration_users/dataTableSortDesc"
    }),
    headers: function() {
      return this.dataTableHeaders;
    },
    sortBy: {
      get() {
        return this.dataTableSortBy;
      },
      set(val) {
        this.setDataTableSortBy(val);
      }
    },
    sortDesc: {
      get() {
        return this.dataTableSortDesc;
      },
      set(val) {
        this.setDataTableSortDesc(val);
      }
    }
  },
  methods: {
    ...mapActions({
      findAllUsers: "$_administration_users/findAllUsers",
      findByOrganisationUuid: "$_administration_users/findByOrganisationUuid",
      setDataTableSortBy: "$_administration_users/setDataTableSortBy",
      setDataTableSortDesc: "$_administration_users/setDataTableSortDesc"
    })
  },
  created() {
    const STORE_KEY = "$_administration_users";
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted() {
    if (this.organisationUuid !== undefined) {
      this.findByOrganisationUuid(this.organisationUuid);
    } else {
      this.findAllUsers();
    }
  }
};
</script>