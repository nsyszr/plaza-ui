import Api from "@/services/Api";

export default {
  findAll() {
    return Api().get("/users")
  },
  create(data) {
    return Api().post("/users", data)
  },
  getByUuid(uuid) {
    return Api().get(`/users/${uuid}`)
  }
}