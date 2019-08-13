<template>
  <v-layout wrap>
    <v-flex
      xs10
      offset-xs1
    >
      <device-list
        :devices="devices"
        :headers="headers"
        :sortBy="sortBy"
        :sortDesc="sortDesc"
      />
      <add-device-dialog
        v-model="createDeviceDialog"
        v-on:create="createDevice"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from './_store'
import DeviceList from './_components/DeviceList'
import AddDeviceDialog from './_components/AddDeviceDialog'

export default {
  name: 'ManageDevicesContainer',
  components: {
    DeviceList,
    AddDeviceDialog
  },
  computed: {
    ...mapGetters({
      _createDeviceDialog: '$_manage_devices/createDeviceDialog',
      devices: '$_manage_devices/devices',
      dataTableHeaders: '$_manage_devices/dataTableHeaders',
      dataTableSortBy: '$_manage_devices/dataTableSortBy',
      dataTableSortDesc: '$_manage_devices/dataTableSortDesc'
    }),
    headers() {
      return this.dataTableHeaders
    },
    sortBy: {
      get() {
        return this.dataTableSortBy
      },
      set(val) {
        this.setDataTableSortBy(val)
      }
    },
    sortDesc: {
      get() {
        return this.dataTableSortDesc
      },
      set(val) {
        this.setDataTableSortDesc(val)
      }
    },
    createDeviceDialog: {
      get() {
        return this._createDeviceDialog
      },
      set(val) {
        this.toggleCreateDeviceDialog()
        if (val === false) {
          this.$router.replace({ name: 'manage-devices' })
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.query.create !== undefined && to.query.create === true) {
        this.toggleCreateDeviceDialog()
      } else if (to.query.create !== undefined && to.query.create === true &&
        from.query.create !== undefined && from.query.create === true) {
        this.$router.replace({ name: 'manage-devices' })
      }
    }
  },
  methods: {
    ...mapActions({
      toggleCreateDeviceDialog: '$_manage_devices/toggleCreateDeviceDialog',
      findAllDevices: '$_manage_devices/findAllDevices',
      _createDevice: '$_manage_devices/createDevice',
      setDataTableSortBy: '$_manage_devices/setDataTableSortBy',
      setDataTableSortDesc: '$_manage_devices/setDataTableSortDesc'
    }),
    createDevice(val) {
      this._createDevice(Object.assign({}, val))
    }
  },
  created() {
    const STORE_KEY = '$_manage_devices';
    // eslint-disable-next-line no-underscore-dangle
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      this.$store.registerModule(STORE_KEY, store)
    }
  },
  mounted() {
    this.findAllDevices()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.query.create !== undefined &&
        (to.query.create === 'true' || to.query.create === true)) {
        vm.toggleCreateDeviceDialog()
      }
    })
  }
}
</script>

<style>
.v-dialog {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
</style>
