<template>
  <organisation-list
    :organisations="organisations"
    :headers="headers"
    :sortBy="sortBy"
    :sortDesc="sortDesc"
  />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import store from "./_store";
import OrganisationList from "./_components/OrganisationList";
export default {
  name: "AdministrationOrganisationsContainer",
  components: {
    OrganisationList
  },
  computed: {
    ...mapGetters({
      organisations: "$_administration_organisations/organisations",
      dataTableHeaders: "$_administration_organisations/dataTableHeaders",
      dataTableSortBy: "$_administration_organisations/dataTableSortBy",
      dataTableSortDesc: "$_administration_organisations/dataTableSortDesc"
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
      findAllOrganisations:
        "$_administration_organisations/findAllOrganisations",
      setDataTableSortBy: "$_administration_organisations/setDataTableSortBy",
      setDataTableSortDesc:
        "$_administration_organisations/setDataTableSortDesc"
    })
  },
  created() {
    const STORE_KEY = "$_administration_organisations";
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store);
    }
  },
  mounted() {
    this.findAllOrganisations();
  }
};
</script>