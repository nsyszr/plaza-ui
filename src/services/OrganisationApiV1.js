import Api from "@/services/Api";

export default {
  findAll() {
    return Api().get("/v1/organisations")
  },
  findAllSuppliers() {
    return Api().get("/v1/organisations?suppliersOnly=true")
  },
  create(data) {
    return Api().post("/v1/organisations", data)
  },
  getByUuid(uuid) {
    return Api().get(`/v1/organisations/${uuid}`)
  },
  findUsers(uuid) {
    return Api().get(`/v1/organisations/${uuid}/users`)
  },
  update(data) {
    return Api().put(`/v1/organisations/${data.uuid}`, data)
  }
}