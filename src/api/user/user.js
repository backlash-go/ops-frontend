import {reqGet, reqPost} from "@/api/request/api-request.js";


class UserApi {


  getInfo(params = {}) {
    return reqGet('/api/ldap/user/info', params);
  }



  Login(data) {
    return reqPost('/api/ldap/user/login', data);
  }

  logOut() {
    return reqPost('/api/ldap/user/logout');
  }


  createAccount(data) {
    return reqPost('/api/ldap/user/create',data)
  }

}


export default new UserApi();