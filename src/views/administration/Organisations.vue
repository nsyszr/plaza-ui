<template>
  <v-layout wrap>
    <v-flex xs10 offset-xs1>
      <administration-organisations-container />
    </v-flex>
  </v-layout>
</template>

<script>
import AdministrationOrganisationsContainer from "@/containers/administration/organisations";
export default {
  name: "AdministrationOrganisations",
  components: {
    AdministrationOrganisationsContainer
  }
};
</script>