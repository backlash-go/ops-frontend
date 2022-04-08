<template>


  <div>

    <el-card class shadow="always">

      <div class="event-table-search">
        <div class="event-table-search-left">
          <el-input placeholder="请输入用户名" v-model="searchContent" class="input-with-select">
            <el-button slot="prepend" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div class="event-table-search-right">
          <el-button type="primary" @click="$refs.createAccount.show()">创建用户</el-button>
        </div>

      </div>

      <!--      table-->

      <el-table

          v-loading="isLoading"
          border
          stripe
          :data="tableData"
          style="width: 100%">

        <el-table-column label="用户名" align="center">
          <template slot-scope="{row}">
            {{ row.user_name }}
          </template>
        </el-table-column>


        <el-table-column label="显示名" align="center">
          <template slot-scope="{row}">
            {{ row.display_name }}
          </template>
        </el-table-column>


        <el-table-column label="邮箱" align="center">
          <template slot-scope="{row}">
            {{ row.email }}
          </template>
        </el-table-column>


        <el-table-column label="角色" align="center">
          <template slot-scope="{row}">
            {{ row.roles }}
          </template>
        </el-table-column>


        <el-table-column
            align="center"
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">重置密码</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <create-account ref="createAccount" @confirm="createAccount"></create-account>

    </el-card>
  </div>
</template>

<script>

import UserApi from '@/api/user/user.js';

import CreateAccount from "@/views/personnel-organization/user-management/CreateAccount.vue";

export default {
  name: "index",
  components: {CreateAccount},
  data() {
    return {
      searchContent: "",
      tableData: [{
        user_name: 'xixb',
        display_name: '席贤斌',
        email: 'xixb@qq.com',
        roles: ['admin', 'guest']
      }, {
        user_name: 'xixb',
        display_name: '席贤斌',
        email: 'xixb@qq.com',
        roles: ['admin', 'guest']


      }, {
        user_name: 'xixb',
        display_name: '席贤斌',
        email: 'xixb@qq.com',
        roles: ['admin', 'guest']

      }, {
        user_name: 'xixb',
        display_name: '席贤斌',
        email: 'xixb@qq.com',
        roles: ['admin', 'guest']

      }],
      isLoading: false

    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    createAccount(form, loading, done) {
      UserApi.createAccount(form).request()
          .then(() => {
            done();
            this.$message.success('创建成功');
          }).catch(() => {
        loading();
      });
    }
  },

  created() {
    // console.log(this.$refs.createAccount.$refs)
  }
};
</script>

<style lang="scss" scoped>


.event-table-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}


.el-button--small {
  font-size: 14px;
}
</style>