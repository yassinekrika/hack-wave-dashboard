import instance from "services/api";

class CommonService {
  /**
   * Get all
   */

   getCities() {
    return instance.get("/common/v1/static/cities");
  }

   getTowns() {
    return instance.get("/common/v1/static/towns");
  }
}

const commonSerive = new CommonService();

export default commonSerive;