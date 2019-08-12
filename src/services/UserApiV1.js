import Api from "@/services/Api";

export default {
  findAll() {
    return Api().get("/v1/users")
  },
  create(data) {
    return Api().post("/v1/users", data)
  },
  getByUuid(uuid) {
    return Api().get(`/v1/users/${uuid}`)
  }
}