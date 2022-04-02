<template>
  <div>
    this is test

    {{ tk }}


    <div>
      <button @click="test">点击</button>
    </div>


    <div>
      <button @click="requestAxios">点击222</button>
    </div>


    {{
      device + "sad"
    }}

    <div>{{name}}</div>

    <div>{{fixedHeader}}</div>
  </div>

</template>


<script>


import Vue from 'vue';
import Cookies from 'js-cookie';
import {Notification} from 'element-ui';

import UserApi from '@/api/user/user';
import {reqGet} from "@/api/request/api-request.js";

import testMixin from "@/views/test/mixin/testMixin.js";
import {mapState} from 'vuex';
import {constantRoutes} from "@/router";

export default {
  name: 'Test',
  mixins: [testMixin],
  computed: {
    tk() {
      return this.$store.state.user.token;
    },
    ...mapState({
      device: state => state.app.device,
      // fixedHeader: state => state.settings.fixedHeader,
    }),
    name() {
      return "sssss"
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
  },
  methods: {
    test() {
      // Vue.ls.set(
      //     "Access-Token",
      //     '830b6b9c-a4f1-14532-aad3-6289ca914693',
      // );
      Cookies.set('sidebarStatus', 0);


      console.log(typeof Cookies.get('sidebarStatus'));
      console.log(Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true);


      Notification.error("err");

      this.$message('这是一条消息提示');
    },
    requestAxios() {
      console.log("sadsads");

      reqGet('/api/get/userInfo', {name: "xxa", age: 200}).request();
    }
  },
  created() {
    console.log(process.env.VUE_APP_API_BASE_URL);

    // let state = {
    //   routes: constantRoutes
    // }
    // console.log(state.routes)
    // this.$store.commit('permission/SET_ROUTES',constantRoutes)
    // console.log(this.$store.state.permission.routes)
    // console.log(this.$store.state.permission.age)


    console.log(this.$route.matched.filter(item => item.meta && item.meta.title));
  }

};
</script>

<style scoped>

</style>