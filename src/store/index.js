import Vue from "vue"
import Vuex from "vuex"
import root from "./modules/root";
import createLogger from "@/utils/logger"

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== "production"

export default new Vuex.Store({
  modules: {
    root
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})