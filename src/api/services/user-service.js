import instance from "services/api";

class UserService {
  getUsers(params) {
    return instance.get("/dashboard/v1/user", {
      params,
    });
  }

  getUser(userId) {
    return instance.get(`/dashboard/v1/user/${userId}`);
  }

  deleteUser(userId) {
    return instance.delete(`/dashboard/v1/user/${userId}`);
  }

  creatUser(user) {
    return instance.post(`/dashboard/v1/user`, user);
  }
}

const userService = new UserService();

export default userService;