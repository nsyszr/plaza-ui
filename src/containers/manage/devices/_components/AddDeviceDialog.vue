<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card class="pa-4">
      <v-card-title primary-title class="pa-4">Add new device</v-card-title>

      <v-card-text class="pa-4">
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" class="pl-0 pr-0 pt-0 pb-4">
                <small
                  style="text-transform: uppercase; font-weight: bold;"
                >Assign device to project</small>
              </v-col>
              <v-col cols="12" class="pl-0 pr-0 pt-0 pb-0">
                <v-select :items="projects" label="Project" required outlined>
                  <template slot="selection" slot-scope="data">
                    <v-icon left>mdi-google-circles-extended</v-icon>
                    {{ data.item }}
                  </template>
                  <template slot="item" slot-scope="data">
                    <v-icon left>mdi-google-circles-extended</v-icon>
                    {{ data.item }}
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" class="pl-0 pr-2 pt-0 pb-4">
                <small
                  style="text-transform: uppercase; font-weight: bold;"
                >Select the device family</small>
              </v-col>
              <v-col cols="12" class="pl-0 pr-2 pt-0 pb-4">
                <v-select
                  v-model="device.family"
                  :items="deviceFamilies"
                  item-text="text"
                  item-value="value"
                  label="Device Family"
                  outlined
                  hide-details
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" class="pl-0 pr-2 pt-0 pb-4">
                <small
                  style="text-transform: uppercase; font-weight: bold;"
                >Select a name for the new device</small>
              </v-col>
              <v-col cols="12" sm="6" class="pl-2 pr-0 pt-0 pb-4">
                <small
                  style="text-transform: uppercase; font-weight: bold;"
                >Specify serial number of the device</small>
              </v-col>
              <v-col cols="12" sm="6" class="pl-0 pr-2 pt-0 pb-0">
                <v-text-field
                  label="Enter device name"
                  v-model="device.name"
                  :rules="deviceNameRules"
                  required
                  outlined
                >
                  <v-icon slot="append" color="success" v-if="deviceNameValid">mdi-check</v-icon>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" class="pl-2 pr-0 pt-0 pb-0">
                <v-text-field
                  label="Enter device serial number"
                  v-model="device.serialNumber"
                  :rules="deviceSerialNumberRules"
                  required
                  outlined
                >
                  <v-icon slot="append" color="success" v-if="deviceSerialNumberValid">mdi-check</v-icon>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-btn
          color="primary"
          block
          depressed
          :disabled="!valid"
          @click="$emit('create', device);dialog = false;"
        >Create Device</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AddDeviceDialog",
  props: {
    value: Boolean
  },
  data() {
    return {
      valid: false,
      device: { name: null, serialNumber: null, status: "REGISTERED" },
      deviceNameValid: false,
      deviceNameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 2) || "Name must be at least 2 characters"
      ],
      deviceSerialNumberValid: false,
      deviceSerialNumberRules: [v => !!v || "Serial number is required"],
      deviceFamilies: [
        { value: "icomos", text: "icom OS Router (MRX/MRO, SCR/ECR)" },
        { value: "insysos", text: "INSYS OS Router (MoRoS, EBW, IMON" }
      ],
      projects: ["INSYS #1"]
    };
  },
  watch: {
    value() {
      this.device = Object.assign({}, { name: null, serialNumber: null });
      // If modal is visible the very first time, the $refs.form variable is not defined.
      if (this.$refs.form !== undefined) {
        this.$refs.form.resetValidation();
      }
    },
    "device.name"(val) {
      var valid = true;
      this.deviceNameRules.forEach(fn => {
        if (fn(val) !== true) {
          valid = false;
        }
      });
      this.deviceNameValid = valid;
    },
    "device.serialNumber"(val) {
      var valid = true;
      this.deviceSerialNumberRules.forEach(fn => {
        if (fn(val) !== true) {
          valid = false;
        }
      });
      this.deviceSerialNumberValid = valid;
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>
