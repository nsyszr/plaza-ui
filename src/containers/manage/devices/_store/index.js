import UserApi from "@/services/UserApiV1"
import {
    immutableUser
} from "@/models/UserV1"

// initial state
const state = {
    createDeviceDialog: false,
    devices: [{
        id: "1",
        name: "mrx-1234",
        location: "Regensburg",
        status: "ONLINE",
        serialNumber: "10203040",
        firmwareVersion: "3.7"
    }],
    dataTableHeaders: [{
            text: "Name",
            value: "name"
        },
        {
            text: "Location",
            value: "location"
        },
        {
            text: "Status",
            value: "status"
        },
        {
            text: "Serial Number",
            value: "serialNumber"
        },
        {
            text: "Firmware",
            value: "firmwareVersion"
        }
    ],
    dataTableSortBy: ["name"],
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
        commit("CREATE_DEVICE_DIALOG_TOGGLED")
    },
    findAllDevices({
        commit
    }) {
        return new Promise((resolve, reject) => {
            resolve()
        })
    },
    createDevice({
        commit
    }, device) {
        return new Promise((resolve, reject) => {
            commit("DEVICE_ADDED", device)
            resolve(device)
        })
    },
    setDataTableSortBy({
        commit
    }, data) {
        commit("DATA_TABLE_SORT_BY_UPDATED", data);
    },
    setDataTableSortDesc({
        commit
    }, data) {
        commit("DATA_TABLE_SORT_DESC_UPDATED", data);
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