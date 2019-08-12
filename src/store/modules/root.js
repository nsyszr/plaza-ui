// initial state
import {
    SUCCESS,
    CLEAR_SUCCESS,
    ERROR,
    CLEAR_ERROR,
} from "../mutation-types"

const state = {
    error: undefined,
    success: undefined
}

// getters
const getters = {
    hasError(state) {
        return state.error !== undefined
    },
    error(state) {
        return state.error
    },
    success(state) {
        return state.success
    }
}

// actions
const actions = {
    setError({
        commit
    }, data) {
        var error = "An unknown error occurred. Please contact support."
        if (data.hint !== undefined) {
            error = data.hint
        } else if (data.description !== undefined) {
            error = data.description
        } else if (data.error !== undefined) {
            error = data.error
        } else if (data.message !== undefined) {
            error = data.message
        }
        commit(ERROR, error)
    },
    clearError({
        commit
    }) {
        commit(CLEAR_ERROR)
    },
    setSuccess({
        commit
    }, data) {
        commit(SUCCESS, data)
    },
    clearSuccess({
        commit
    }) {
        commit(CLEAR_SUCCESS)
    }
}

// mutations
const mutations = {
    [ERROR](state, data) {
        state.error = data
    },
    [CLEAR_ERROR](state) {
        state.error = undefined
    },
    [SUCCESS](state, data) {
        state.success = data
    },
    [CLEAR_SUCCESS](state) {
        state.success = undefined
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}