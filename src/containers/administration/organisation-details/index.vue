<template>
  <v-card flat>
    <v-card-title class="pl-0 pr-0 pt-0 pb-8">
      {{organisation.name}} ({{organisation.countryCode}})
      <!-- <v-spacer></v-spacer>
      <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" outlined hide-details></v-text-field>-->
    </v-card-title>
    <v-tabs>
      <v-tab>Details</v-tab>
      <v-tab>Users</v-tab>
      <v-tab>Accounts</v-tab>
      <v-tab>Billing Adresses</v-tab>
      <v-tab-item>
        <details-form
          :organisation="organisationForm"
          v-on:update="updateOrganisation(organisationForm)"
          class="mt-4"
        />
      </v-tab-item>
      <v-tab-item>
        <user-list
          :users="users"
          :headers="usersDataTableHeaders"
          :sort-by="usersDataTableSortBy"
          :sort-desc="userDataTableSortDesc"
          class="mt-4"
        />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store";
import DetailsForm from "./_components/DetailsForm";
import RolesForm from "./_components/RolesForm";
import UserList from "./_components/UserList";
import { Organisation } from "@/models/OrganisationV1";
export default {
  name: "AdministrationOrganisationDetailsContainer",
  props: {
    uuid: String
  },
  components: {
    DetailsForm,
    RolesForm,
    UserList
  },
  data: () => {
    return {
      organisationForm: new Organisation()
    };
  },
  computed: {
    ...mapGetters({
      organisation: "$_administration_organisation_details/organisation",
      users: "$_administration_organisation_details/users",
      usersDataTableHeaders:
        "$_administration_organisation_details/usersDataTableHeaders",
      usersDataTableSortBy:
        "$_administration_organisation_details/usersDataTableSortBy",
      userDataTableSortDesc:
        "$_administration_organisation_details/usersDataTableSortDesc"
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
      getOrganisationDetails:
        "$_administration_organisation_details/getOrganisationDetails",
      updateOrganisation:
        "$_administration_organisation_details/updateOrganisation",
      setDataTableSortBy:
        "$_administration_organisation_details/setDataTableSortBy",
      setDataTableSortDesc:
        "$_administration_organisation_details/setDataTableSortDesc"
    })
  },
  created() {
    const STORE_KEY = "$_administration_organisation_details";
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted() {
    this.getOrganisationDetails(this.uuid).then(() => {
      this.organisationForm = Object.assign({}, this.organisation);
    });
  }
};
</script>