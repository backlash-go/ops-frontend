<template>


  <div class="wrapper">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :unique-opened="false"
          :active-text-color="variables.menuActiveText"
          :collapse-transition="false"
          mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>

  </div>


</template>

<script>

import SidebarItem from './SidebarItem';

import variables from '@/styles/variables.scss'
import {mapGetters} from 'vuex'

import {constantRoutes} from "@/router";


export default {
  name: "index",
  components: {SidebarItem},
  computed: {
    variables() {
      return variables
    },
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      return this.$store.state.permission.routes;
    },
  }
};
</script>

<style lang="scss" scoped>


</style>



