<template>
  <v-card flat class="nsys-card-form pl-2 pr-2">
    <v-card-title class="pb-0">
      <h2 class="nsys-title">Organisational Data</h2>
    </v-card-title>
    <v-form v-model="valid" lazy-validation>
      <v-container fluid>
        <v-row>
          <v-checkbox
            v-model="organisation.roles"
            label="Customer"
            value="CUSTOMER"
            class="pl-2 mx-2"
          ></v-checkbox>
          <v-checkbox v-model="organisation.roles" label="Supplier" value="SUPPLIER" class="mx-2"></v-checkbox>
          <v-checkbox v-model="organisation.roles" label="Reseller" value="RESELLER" class="mx-2"></v-checkbox>
          <v-checkbox v-model="organisation.roles" label="Broker" value="BROKER" class="mx-2"></v-checkbox>
          <v-checkbox
            v-model="organisation.roles"
            label="Platform Operator"
            value="PLATFORM_OPERATOR"
            class="mx-2"
            disabled
          ></v-checkbox>
          <v-col cols="12" v-if="organisation.roles && organisation.roles.indexOf('PLATFORM_OPERATOR') === -1">
            <v-switch
              v-model="organisation.validated"
              label="Validated"
              color="success"
              class="mt-0 pt-0"
              hide-details
            ></v-switch>
          </v-col>
          <v-col
            cols="12"
            v-if="organisation.roles && organisation.roles.indexOf('PLATFORM_OPERATOR') === -1"
          >
            <v-select
              v-model="organisation.supplierUuid"
              :items="suppliers"
              :item-text="supplierText"
              item-value="uuid"
              label="Supplier"
              outlined
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="organisation.customerNumber"
              label="Customer Number"
              outlined
              hide-details
              required
              background-color="#ffffff"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" align-self="center">
            <v-text-field
              v-model="organisation.vatNumber"
              label="VAT Number"
              outlined
              hide-details
              required
              background-color="#ffffff"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="organisation.name"
              label="Name"
              :rules="nameRules"
              outlined
              :hide-details="valid"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="organisation.emailAddress"
              label="Email Address"
              :rules="emailAddressRules"
              outlined
              :hide-details="valid"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="organisation.phoneNumber"
              label="Phone Number"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="8">
            <v-text-field v-model="organisation.address1" label="Address" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="organisation.address2"
              label="Address Extension"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              v-model="organisation.postalCode"
              label="Postal Code"
              outlined
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="9">
            <v-text-field v-model="organisation.city" label="City" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="organisation.countryCode" label="Country" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="organisation.state" label="State" outlined hide-details></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn
              :disabled="dirty===false || valid === false"
              block
              depressed
              large
              color="primary"
              @click="$emit('update')"
            >Save Changes</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DetailsForm",
  props: {
    organisation: Object
  },
  data: () => {
    return {
      valid: false,
      dirty: false,
      nameRules: [
        v => !!v || "Name is required"
        // v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      emailAddressRules: [
        // v => !!v || 'E-mail is required',
        v => {
          if (v && v.length > 0) {
            return /.+@.+\..+/.test(v) || "Email address must be valid";
          }
          return false;
        }
      ]
    };
  },
  methods: {
    supplierText: item => item.name + " (" + item.countryCode + ")"
  },
  computed: {
    ...mapGetters({
      suppliers: "$_administration_organisation_details/suppliers"
    })
  },
  watch: {
    organisation: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
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
