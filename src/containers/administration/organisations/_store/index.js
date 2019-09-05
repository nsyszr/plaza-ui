import OrganisationApi from "@/services/OrganisationApi"
import {
    immutableOrganisation
} from "@/models/Organisation"

// initial state
const state = {
    organisations: [],
    dataTableHeaders: [{
            text: "Name",
            value: "name"
        },
        {
            text: "Customer #",
            value: "customerNumber"
        },
        {
            text: "City",
            value: "city"
        },
        {
            text: "Country Code",
            value: "countryCode"
        },
        {
            text: "Validated",
            value: "validated"
        }
    ],
    dataTableSortBy: ["name"],
    dataTableSortDesc: [false]
}

// getters
const getters = {
    organisations(state) {
        return state.organisations
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
    findAllOrganisations({
        commit
    }) {
        return new Promise((resolve, reject) => {
            OrganisationApi.findAll()
                .then(r => r.data)
                .then(data => {
                    const items = data.members.map(el => immutableOrganisation(el))
                    commit("ORGANISATIONS_UPDATED", items)
                    resolve(items)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    createOrganisation({
        commit
    }, organisation) {
        return new Promise((resolve, reject) => {
            OrganisationApi.create(organisation)
                .then(r => r.data)
                .then(data => {
                    const item = immutableOrganisation(data)
                    commit("ORGANISATION_ADDED", item)
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
    ORGANISATIONS_UPDATED(state, data) {
        state.organisations = data
    },
    ORGANISATION_ADDED(state, data) {
        state.organisations.push(data)
        state.organisations.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
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