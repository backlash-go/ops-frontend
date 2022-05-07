import {reqGet, reqPost, reqDelete} from "@/api/request/api-request.js";


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
    return reqPost('/api/ldap/user/create', data);
  }

  modifyPass(data) {
    return reqPost('/api/ldap/user/modify-password', data);
  }

  getUserList(params) {
    return reqGet('/api/ldap/user/list-info', params);
  }

  deleteUser(data) {
    return reqDelete('/api/ldap/user/delete', data);
  }

  getModifyUserInfo(params) {
    return reqGet('/api/ldap/user/modify/info', params);
  }

  editUserInfo(data) {
    return reqPost('/api/ldap/user/modify/userInfo', data);
  }


}


export default new UserApi();