import UserApi from "@/services/UserApi"
import OrganisationApi from "@/services/OrganisationApi"
import {
    immutableUser
} from "@/models/User"

// initial state
const state = {
    users: [],
    dataTableHeaders: [{
            text: "Username",
            value: "username"
        },
        {
            text: "Email Address",
            value: "emailAddress"
        },
        {
            text: "First Name",
            value: "firstName"
        },
        {
            text: "Last Name",
            value: "lastName"
        },
        {
            text: "Registered At",
            value: "registeredAt"
        }
    ],
    dataTableSortBy: ["username"],
    dataTableSortDesc: [false]
}

// getters
const getters = {
    users(state) {
        return state.users
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
    findAllUsers({
        commit
    }) {
        return new Promise((resolve, reject) => {
            UserApi.findAll()
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableUser(el))
                    commit("USERS_UPDATED", items)
                    resolve(items)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    findByOrganisationUuid({
        commit
    }, organisationUuid) {
        return new Promise((resolve, reject) => {
            OrganisationApi.findUsers(organisationUuid)
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableUser(el))
                    commit("USERS_UPDATED", items)
                    resolve(items)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    createUser({
        commit
    }, user) {
        return new Promise((resolve, reject) => {
            UserApi.create(user)
                .then(r => r.data)
                .then(data => {
                    const item = immutableUser(data)
                    commit("USER_ADDED", item)
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
    USERS_UPDATED(state, data) {
        state.users = data
    },
    USER_ADDED(state, data) {
        state.users.push(data)
        state.users.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
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