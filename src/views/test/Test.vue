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

    <div>{{ name }}</div>

    <div>{{ fixedHeader }}</div>


    <div>-----------------------------</div>


    <current-user>
      <template v-slot:default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </current-user>



    <div>++++++++++++++++++++++++</div>


    <el-pagination
    :background="background"
    :page-size.sync="pageSize"
    :page-sizes="pageSizes"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    >
    </el-pagination>



  </div>

</template>


<script>


import Vue from 'vue';
import Cookies from 'js-cookie';
import {Notification} from 'element-ui';

import {reqGet} from "@/api/request/api-request.js";

import testMixin from "@/views/test/mixin/testMixin.js";
import {mapState} from 'vuex';
import {constantRoutes} from "@/router";
import CurrentUser from "@/views/test/current-user.vue";

import { Message } from 'element-ui';


import UserApi from '@/api/user/user.js'


export default {
  props: {
    // total: {
    //   required: true,
    //   type: Number
    // },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30];
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    }
  },


  name: 'Test',
  components: {CurrentUser},
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
      return "sssss";
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },

    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        console.log("aaaa")
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      }
    }
  },
  methods: {

    handleCurrentChange(v) {
      console.log(v)
    },

    handleSizeChange(v) {
      console.log(v)
    },
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

      // reqGet('/api/get/userInfo', {name: "xxa", age: 200}).request();
      UserApi.modifyPass({password: "test10",cn: "test10"})


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