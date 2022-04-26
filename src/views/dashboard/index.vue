<template>

  <div>平台介绍, 提供用户自行修改密码</div>

</template>

<script>


import store from '@/store';
import {reqGet} from "@/api/request/api-request.js";

export default {
  name: "index",
  created() {

  },
  methods: {
    req() {
      reqGet("/api/ldap/health").request();
    }
  }
};
</script>

<style scoped>

</style>