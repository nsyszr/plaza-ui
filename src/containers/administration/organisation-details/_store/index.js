import OrganisationApi from "@/services/OrganisationApiV1"
import {
    Organisation,
    immutableOrganisation
} from "@/models/OrganisationV1"
import {
    immutableUser
} from "@/models/UserV1"
import {
    ERROR
} from '@/store/mutation-types';

// initial state
const state = {
    organisation: new Organisation(),
    suppliers: [],
    users: [],
    usersDataTableHeaders: [{
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
    usersDataTableSortBy: ["username"],
    usersDataTableSortDesc: [false]
}

// getters
const getters = {
    organisation(state) {
        return state.organisation
    },
    users(state) {
        return state.users
    },
    suppliers(state) {
        return state.suppliers
    },
    usersDataTableHeaders(state) {
        return state.usersDataTableHeaders;
    },
    usersDataTableSortBy(state) {
        return state.usersDataTableSortBy;
    },
    usersDataTableSortDesc(state) {
        return state.usersDataTableSortDesc;
    }
}

// actions
const actions = {
    getOrganisationDetails({
        commit
    }, uuid) {
        return new Promise((resolve, reject) => {
            OrganisationApi.getByUuid(uuid)
                .then(r => r.data)
                .then(data => {
                    const item = immutableOrganisation(data)
                    commit("SET_ORGANISATION", item)
                    return OrganisationApi.findUsers(item.uuid)
                })
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableUser(el))
                    commit("SET_USERS", items)
                    return OrganisationApi.findAllSuppliers();
                })
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableOrganisation(el)).filter(el => {
                        return el.uuid != uuid;
                    })
                    commit("SET_SUPPLIERS", items)
                    resolve()
                })
                .catch(err => {
                    commit(ERROR, err, {
                        root: true
                    })
                    reject(err)
                })
        })
    },
    updateOrganisation({
        commit
    }, data) {
        return new Promise((resolve, reject) => {
            OrganisationApi.update(data)
                .then(r => r.data)
                .then(data => {
                    const item = immutableOrganisation(data)
                    commit("SET_ORGANISATION", item)
                    resolve()
                })
                .catch(err => {
                    commit(ERROR, err.response.data, {
                        root: true
                    })
                    reject(err)
                })
        })
    },
    setUserDataTableSortBy({
        commit
    }, data) {
        commit("USERS_DATA_TABLE_SORT_BY_UPDATED", data);
    },
    setUsersDataTableSortDesc({
        commit
    }, data) {
        commit("USERS_DATA_TABLE_SORT_DESC_UPDATED", data);
    }
}

// mutations
const mutations = {
    SET_ORGANISATION(state, data) {
        state.organisation = data
    },
    SET_USERS(state, data) {
        state.users = data
    },
    SET_SUPPLIERS(state, data) {
        state.suppliers = data
    },
    USERS_DATA_TABLE_SORT_BY_UPDATED(state, data) {
        state.usersDataTableSortBy = data
    },
    USERS_DATA_TABLE_SORT_DESC_UPDATED(state, data) {
        state.usersDataTableSortDesc = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}