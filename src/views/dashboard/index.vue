<template>


  <div>dashboard index


    <div>
      <button @click="req">发送请求</button>
    </div>
  </div>
</template>

<script>


import store from '@/store'
import {reqGet} from "@/api/request/api-request.js";
export default {
  name: "index",
  created() {
    console.log(store.getters)

    console.log(store.state.user)
  },
  methods: {
    req() {
      reqGet("/api/ldap/health").request()
    }
  }
};
</script>

<style scoped>

</style>