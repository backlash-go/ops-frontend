import {reqGet, reqPost, reqDelete} from "@/api/request/api-request.js";


class PowerApi {

  getPowerInfoList(params = {}) {
    return reqGet('/api/permission/list-info', params);
  }



  getPowerInfo(params = {}) {
    return reqGet('/api/permission/info', params);
  }

  createApi(data) {
    return reqPost('/api/permission/create', data);
  }


  deleteApi(data) {
    return reqDelete('/api/permission/delete', data);
  }

  editApiInfo(data) {
    return reqPost('/api/permission/modify', data);
  }



}


export default new PowerApi();