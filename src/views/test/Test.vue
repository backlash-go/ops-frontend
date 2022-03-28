<template>
  <div>
       this is test

    {{tk}}


    <div>
      <button @click="test">点击</button>
    </div>
  </div>
</template>


<script>


import Vue from 'vue';
import Cookies from 'js-cookie'
import { Notification } from 'element-ui';


export default {
  name: 'Test',
  computed: {
    tk() {
      return this.$store.state.user.token
    }
  },
  methods: {
    test() {
      // Vue.ls.set(
      //     "Access-Token",
      //     '830b6b9c-a4f1-14532-aad3-6289ca914693',
      // );
      Cookies.set('sidebarStatus', 0)


      console.log(typeof Cookies.get('sidebarStatus'));
      console.log(Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true);


      Notification.error("err")

      this.$message('这是一条消息提示');
    }
  }

};
</script>

<style scoped>

</style>