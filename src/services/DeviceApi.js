import Api from "@/services/Api";

export default {
  findAll() {
    return Api().get("/devices")
  },
  create(data) {
    return Api().post("/devices", data)
  },
  getByUuid(uuid) {
    return Api().get(`/devices/${uuid}`)
  }
}