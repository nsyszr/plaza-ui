import Api from "@/services/Api";

export default {
  findAll() {
    return Api().get("/organisations")
  },
  findAllSuppliers() {
    return Api().get("/organisations?suppliersOnly=true")
  },
  create(data) {
    return Api().post("/organisations", data)
  },
  getByUuid(uuid) {
    return Api().get(`/organisations/${uuid}`)
  },
  findUsers(uuid) {
    return Api().get(`/organisations/${uuid}/users`)
  },
  update(data) {
    return Api().put(`/organisations/${data.uuid}`, data)
  }
}