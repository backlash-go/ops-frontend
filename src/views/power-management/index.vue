<template>


  <div>
    <el-card class shadow="always">
      <div class="event-table-search">
        <div class="event-table-search-left">
          <el-input placeholder="请输入接口路径" v-model="searchContent" class="input-with-select"
                    @keyup.enter.native="searchPower">
            <!--            <el-button slot="prepend" icon="el-icon-search"></el-button>-->
          </el-input>
          <el-button class="search-button" @click="searchPower" type="primary">查询</el-button>

        </div>

        <div class="event-table-search-right">
          <el-button type="primary" @click="$refs.createApi.show()">添加接口</el-button>
        </div>
      </div>

      <!--      table-->

      <el-table
          v-loading="isLoading"
          border
          stripe
          :data="tableData"
          style="width: 100%">

        <el-table-column label="接口" align="center">
          <template slot-scope="{row}">
            {{ row.api }}
          </template>
        </el-table-column>


        <el-table-column label="接口说明" align="center">
          <template slot-scope="{row}">
            {{ row.name }}
          </template>
        </el-table-column>


        <el-table-column label="接口权限" align="center">
          <template slot-scope="{row}">
            {{ row.role }}
          </template>
        </el-table-column>


        <el-table-column
            align="center"
            fixed="right"
            label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditApi(scope.row)">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <Pagination
            :total="pagination.total"
            :limit.sync="pagination.page_size"
            @pagination="changePage"
            :page.sync="pagination.page">
        </Pagination>
      </div>
      <create-api ref="createApi" @confirm="createApi"></create-api>
      <edit-api-info ref="editApiInfo" :permission-id="Id"  @confirm="editApiInfo"></edit-api-info>

    </el-card>
  </div>
</template>

<script>

import UserApi from '@/api/user/user.js';
import PowerApi from '@/api/power/power.js';

import CreateAccount from "@/views/personnel-organization/user-management/CreateAccount.vue";
import {Message} from "element-ui";
import ResetPassword from "@/views/personnel-organization/user-management/ResetPassword.vue";
import CreateApi from "@/views/power-management/CreateApi.vue";
import EditApiInfo from "@/views/power-management/EditApiInfo.vue";

export default {
  name: "index",
  components: {EditApiInfo, CreateApi, ResetPassword, CreateAccount},
  data() {
    return {
      Id: 0,
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

    handleEditApi(row) {
      this.$refs.editApiInfo.show();
      this.$refs.editApiInfo.getModifyApiInfo();
      this.Id = row.id;
    },

    handleResetPassword(row) {
      this.resetPasswordCn = row.user_name;
      this.$refs.resetPassword.show();
    },
    resetPassword(form, loading, done) {
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
      this.$confirm('此操作将永久删除该接口?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        PowerApi.deleteApi({id: row.id}).then(() => {
              this.getPowerList();
              Message({
                message: "删除接口成功",
                type: "success",
                offset: 100,
                duration: 3000,
              });
            }
        ).catch(error => {
          console.log(error);
        });
      }).catch(() => {
      });

    },
    getPowerList() {
      this.isLoading = true;
      let params = {
        search_name: this.searchContent,
        page: this.pagination.page,
        page_size: this.pagination.page_size
      };
      PowerApi.getPowerInfoList(params).request().then(
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


    editApiInfo(form, loading, done) {
      PowerApi.editApiInfo(form).request().then(() => {
        done();
        this.getPowerList();
        Message({
          message: "更新接口信息成功",
          type: "success",
          offset: 100,
          duration: 3000,
        });
      }).catch(error => {
        console.log(error);
        loading();
      });
    },

    changePage({page, limit}) {
      this.pagination.page = page;
      this.pagination.page_size = limit;
      this.getPowerList();
    },
    createApi(form, loading, done) {
      PowerApi.createApi(form).request()
          .then(() => {
            done();
            this.getPowerList();
            this.$message.success('创建成功');
          }).catch(() => {
        loading();
      });
    },
    searchPower() {
      this.getPowerList();
    }

  },

  created() {
    this.getPowerList();
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

.pagination {
  display: flex;
  justify-content: center;
}


</style>