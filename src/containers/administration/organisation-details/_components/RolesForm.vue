<template>
  <v-card flat class="nsys-card-form pl-2 pr-2">
    <v-card-title class="pb-0">
      <h2 class="nsys-title">Roles</h2>
    </v-card-title>
    <v-form v-model="valid" lazy-validation>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-checkbox
            v-model="organisation.roles"
            label="Platform Operator"
            value="PLATFORM_OPERATOR"
            class="mx-2"
          ></v-checkbox>
          <v-checkbox v-model="organisation.roles" label="Supplier" value="SUPPLIER" class="mx-2"></v-checkbox>
          <v-checkbox v-model="organisation.roles" label="Customer" value="CUSTOMER" class="mx-2"></v-checkbox>
          <v-flex xs12>
            <v-btn
              :disabled="dirty===false || valid === false"
              block
              depressed
              large
              color="primary"
              @click="$emit('update')"
            >Save Changes</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "DetailsForm",
  props: {
    organisation: Object
  },
  data: () => {
    return {
      valid: false,
      dirty: false
    };
  },
  watch: {
    organisation: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal.roles) === JSON.stringify(oldVal.roles)) {
          this.dirty = true;
        }
      },
      deep: true
    }
  }
};
</script>

<style>
</style>
