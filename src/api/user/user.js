import {reqGet, reqPost} from "@/api/request/api-request.js";


class UserApi {


  getInfo(params = {}) {
    return reqGet('/api/ldap/user/info', params);
  }



  Login(data) {
    return reqPost('/api/ldap/user/login', data);
  }

  LogOut(data) {
    return reqPost('/api/ldap/user/logout', data);
  }

}


export default new UserApi();