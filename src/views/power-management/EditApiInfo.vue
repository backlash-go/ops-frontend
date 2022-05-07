<template>
  <div>
    <el-dialog title="编辑用户信息" :visible.sync="isShowDialog" width="30%">

      <el-form
          label-width="100px"
          label-position="right"
          ref="editApiInfoFormRef"
          :model="editApiInfoForm"
          :rules="editApiInfoFormRules">

        <el-form-item label-width="120px" label="接口名称" prop="api">
          <el-input v-model="editApiInfoForm.api" placeholder=""></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="接口说明" prop="name">
          <el-input v-model="editApiInfoForm.name" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="接口角色" prop="role">

          <el-select v-model.trim="editApiInfoForm.role"
                     style="width: 100%"
                     multiple
                     placeholder="请至少选择一个角色">
            <el-option
                v-for="item in ROLES_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="btn-line">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="confirmLoading">确定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>


import {ROLES_TYPE} from "@/common/constant.js";

import PowerApi from '@/api/power/power.js';


export default {
  name: "editApiInfo",
  props: {
    permissionId: {
      type: Number,
      default: "",
    }
  },
  data() {
    return {
      ROLES_TYPE,
      isShowDialog: false,
      confirmLoading: false,
      editApiInfoForm: {
        api: '',
        name: '',
        role: [],
      },
      editApiInfoFormRules: {
        api: [
          {required: true, message: '用户名', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 3, max: 28, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
        // role: [
        //   {type: 'array', required: true, message: '请至少选择一个guest角色', trigger: 'change'}
        // ],
      }

    };
  },
  methods: {
    show() {
      this.isShowDialog = true;
    },
    loading() {
      this.confirmLoading = false;
    },
    closeDialog() {
      this.loading();
      this.$refs.editApiInfoFormRef.resetFields();
      this.isShowDialog = false;
    },
    confirm() {
      this.$refs.editApiInfoFormRef.validate(valid => {
        if (valid) {
          const form = {
            ...this.editApiInfoForm,
            id: this.permissionId
          };
          this.$emit('confirm', form, this.loading, this.closeDialog);
        }
      });

    },
    getModifyApiInfo() {
      this.$nextTick(() => {
        let data = {id: this.permissionId};
        PowerApi.getPowerInfoList(data).request().then((res) => {
          let result = res.data.items.filter(item => item.id === this.permissionId)[0];
          this.editApiInfoForm.api = result.api;
          this.editApiInfoForm.name = result.name;
          if (result.role){
            this.editApiInfoForm.role = result.role.split(",");
          }else {
            this.editApiInfoForm.role = result.role
          }

        }).catch(error => console.log(error));
      });
    }

  },
  created() {
  }
};
</script>

<style lang="scss" scoped>


.btn-line {
  margin-left: 60px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>