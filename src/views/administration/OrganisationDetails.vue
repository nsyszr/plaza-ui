<template>
  <v-layout wrap>
    <v-flex xs-10 offset-xs1 pa-0>
      <v-toolbar dense color="transparent" flat>
        <v-btn icon light @click.stop="$router.push({ name: 'administration-organisations' })">
          <v-icon color="grey lighten-1">mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="grey--text text--lighten-1">Organisations</v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <administration-organisation-details-container :uuid="uuid" />
    </v-flex>
  </v-layout>
</template>

<script>
import AdministrationOrganisationDetailsContainer from "@/containers/administration/organisation-details";
export default {
  name: "AdministrationOrganisations",
  props: ["uuid"],
  components: {
    AdministrationOrganisationDetailsContainer
  }
};
</script>
<style>
.v-toolbar__content {
  padding: 0 !important;
}
</style>