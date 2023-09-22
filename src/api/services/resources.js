import instance from "services/api";

class ResourceService {
  getResources(params) {
    return instance.get("/dashboard/v1/subject", {
      params,
    });
  }

  deleteResource(userId) {
    return instance.delete(`/dashboard/v1/subject/${userId}`);
  }

  createResource(user) {
    return instance.post(`/dashboard/v1/subject`, user);
  }
}

const resourceService = new ResourceService();

export default resourceService;