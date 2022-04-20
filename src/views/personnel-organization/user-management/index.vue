<template>


  <div>
    <el-card class shadow="always">

      <div class="event-table-search">
        <div class="event-table-search-left">
          <el-input placeholder="请输入用户名" v-model="searchContent" class="input-with-select"
                    @keyup.enter.native="searchUser">
            <!--            <el-button slot="prepend" icon="el-icon-search"></el-button>-->
          </el-input>
          <el-button class="search-button" @click="searchUser" type="primary">查询</el-button>

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
            {{ row.role }}
          </template>
        </el-table-column>


        <el-table-column
            align="center"
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleResetPassword(scope.row)">重置密码</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <Pagination
          :total="pagination.total"
          :limit.sync="pagination.page_size"
          @pagination="changePage"
          :page.sync="pagination.page">
      </Pagination>

      <create-account ref="createAccount" @confirm="createAccount"></create-account>
      <reset-password ref="resetPassword" @confirm="resetPassword"></reset-password>

    </el-card>
  </div>
</template>

<script>

import UserApi from '@/api/user/user.js';

import CreateAccount from "@/views/personnel-organization/user-management/CreateAccount.vue";
import {Message} from "element-ui";
import ResetPassword from "@/views/personnel-organization/user-management/ResetPassword.vue";

export default {
  name: "index",
  components: {ResetPassword, CreateAccount},
  data() {
    return {
      searchContent: "",
      pagination: {
        page: 1,
        page_size: 10,
        total: 0,
      },
      tableData: [],
      isLoading: false,
      resetPasswordCn: ''
    };
  },
  methods: {

    handleResetPassword(row) {
      this.resetPasswordCn = row.user_name;
      this.$refs.resetPassword.show();

    },
    resetPassword(form, loading, done) {
      console.log(form);
      console.log(loading);
      console.log(done);
      UserApi.modifyPass({password: form, cn: this.resetPasswordCn}).request()
          .then(() => {
            done();
            Message({
              message: "修改密码成功",
              type: "success",
              offset: 100,
              duration: 3000,
            });
          }).catch(() => {
        loading();
      });

    },

    handleClick(row) {
      this.$confirm('此操作将永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        UserApi.deleteUser({cn: row.user_name}).then(() => {
              this.getList();
              Message({
                message: "删除用户成功",
                type: "success",
                offset: 100,
                duration: 3500,
              });

            }
        ).catch(error => {
          console.log(error);
        });

      }).catch(() => {
      });

    },
    getList() {
      this.isLoading = true;
      let params = {
        search_name: this.searchContent,
        page: this.pagination.page,
        page_size: this.pagination.page_size
      };
      UserApi.getUserList(params).request().then(
          res => {
            const {items = [], total_count} = res.data;
            this.tableData = items;
            this.pagination.total = total_count;
            this.isLoading = false;
          }
      ).catch(() => {
        this.isLoading = false;
      });
    },
    changePage({page, limit}) {
      console.log("changePage");
      this.pagination.page = page;
      this.pagination.page_size = limit;
      this.getList();
    },
    createAccount(form, loading, done) {
      UserApi.createAccount(form).request()
          .then(() => {
            done();
            this.$message.success('创建成功');
          }).catch(() => {
        loading();
      });
    },
    searchUser() {
      console.log("aa");
      this.getList();
    }

  },

  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>


.event-table-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;

  .event-table-search-left {
    display: flex;
    align-items: center;
  }

  .search-button {
    margin-left: 20px;
  }
}


.el-button--small {
  font-size: 14px;
}


</style>