import DeviceApi from "@/services/DeviceApi"
import {
    immutableDevice
} from "@/models/Device"

// initial state
const state = {
    createDeviceDialog: false,
    devices: [],
    dataTableHeaders: [{
            text: 'Name',
            value: 'name'
        },
        {
            text: 'Location',
            value: 'location'
        },
        {
            text: 'Status',
            value: 'status'
        },
        {
            text: 'Last Message At',
            value: 'session.lastMessageAt'
        },
        {
            text: 'Serial Number',
            value: 'serialNumber'
        },
        {
            text: 'Firmware',
            value: 'details.firmware.version'
        },
        {
            text: 'Model',
            value: 'details.hardware.model'
        }
    ],
    dataTableSortBy: ['name'],
    dataTableSortDesc: [false]
}

// getters
const getters = {
    createDeviceDialog(state) {
        return state.createDeviceDialog
    },
    devices(state) {
        return state.devices
    },
    // Computed table headers for data list
    dataTableHeaders(state) {
        return state.dataTableHeaders;
    },
    dataTableSortBy(state) {
        return state.dataTableSortBy;
    },
    dataTableSortDesc(state) {
        return state.dataTableSortDesc;
    }
}

// actions
const actions = {
    toggleCreateDeviceDialog({
        commit
    }) {
        commit('CREATE_DEVICE_DIALOG_TOGGLED')
    },
    findAllDevices({
        commit
    }) {
        return new Promise((resolve, reject) => {
            DeviceApi.findAll()
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableDevice(el))
                    commit("DEVICES_UPDATED", items)
                    resolve(items)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    createDevice({
        commit
    }, device) {
        return new Promise((resolve, reject) => {
            DeviceApi.create(device)
                .then(r => r.data)
                .then(data => {
                    const item = immutableDevice(data)
                    commit("DEVICE_ADDED", item)
                    resolve(item)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    setDataTableSortBy({
        commit
    }, data) {
        commit('DATA_TABLE_SORT_BY_UPDATED', data);
    },
    setDataTableSortDesc({
        commit
    }, data) {
        commit('DATA_TABLE_SORT_DESC_UPDATED', data);
    }
}

// mutations
const mutations = {
    CREATE_DEVICE_DIALOG_TOGGLED(state) {
        state.createDeviceDialog = !state.createDeviceDialog;
    },
    DEVICES_UPDATED(state, data) {
        state.devices = data
    },
    DEVICE_ADDED(state, data) {
        state.devices.push(data)
        state.devices.sort((a, b) => a.name.localeCompare(b.name))
    },
    DATA_TABLE_SORT_BY_UPDATED(state, data) {
        state.dataTableSortBy = data
    },
    DATA_TABLE_SORT_DESC_UPDATED(state, data) {
        state.dataTableSortDesc = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}