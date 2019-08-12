<template>
  <v-layout wrap>
    <v-flex xs10 offset-xs1>
      <administration-users-container />
    </v-flex>
  </v-layout>
</template>

<script>
import AdministrationUsersContainer from "@/containers/administration/users";
export default {
  name: "AdministrationUsers",
  components: {
    AdministrationUsersContainer
  }
};
</script>