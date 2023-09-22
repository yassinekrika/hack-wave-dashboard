import instance from "services/api";

class CommunicationService {
  getEmails(params) {
    return instance.get("/dashboard/v1/communication", {
      params,
    });
  }

  deleteEmail(communicationId) {
    return instance.delete(`/dashboard/v1/communication/${communicationId}`);
  }
}

const communicationService = new CommunicationService();

export default communicationService;