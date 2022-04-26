<template>
  <div>
    <el-dialog title="编辑用户信息" :visible.sync="isShowDialog" width="30%">

      <el-form
          label-width="100px"
          label-position="right"
          ref="editUserInfoFormRef"
          :model="editUserInfoForm"
          :rules="editUserInfoFormRules">


        <el-form-item label-width="120px" label="全名" prop="display_name">
          <el-input v-model="editUserInfoForm.display_name" placeholder="席贤斌"></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="邮箱" prop="mail">
          <el-input v-model="editUserInfoForm.mail" placeholder="xixb@corp.langzhihe.com"></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="员工类型" prop="employee_type">
          <el-select v-model.trim="editUserInfoForm.employee_type"
                     style="width: 100%"
                     multiple
                     placeholder="请至少选择一个other类型">
            <el-option
                v-for="item in EMPLOYEE_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>

        </el-form-item>


        <el-form-item label-width="120px" label="员工角色" prop="role">

          <el-select v-model.trim="editUserInfoForm.role"
                     style="width: 100%"
                     multiple
                     placeholder="请至少选择一个guest角色">
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


import {ROLES_TYPE, EMPLOYEE_TYPE} from "@/common/constant.js";

import UserApi from '@/api/user/user.js';


export default {
  name: "editUserInfo",
  props: {
    Cname: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      ROLES_TYPE,
      EMPLOYEE_TYPE,
      isShowDialog: false,
      confirmLoading: false,
      editUserInfoForm: {
        mail: '',
        display_name: '',
        employee_type: ['other'],
        role: [],
      },
      editUserInfoFormRules: {
        cn: [
          {required: true, message: '用户名', trigger: 'blur'},
          {min: 3, max: 28, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 3, max: 28, message: '长度在 1 到 18 个字符', trigger: 'blur'}
        ],
        given_name: [
          {required: true, message: '请输入名', trigger: 'blur'},
          {min: 1, max: 18, message: '长度在 1 到 18 个字符', trigger: 'blur'}
        ],
        display_name: [
          {required: true, message: '请输入真实全名', trigger: 'blur'},
          {min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur'}
        ],
        employee_type: [
          {type: 'array', required: true, message: '请至少选择一个other类型', trigger: 'change'}
        ],
        role: [
          {type: 'array', required: true, message: '请至少选择一个guest角色', trigger: 'change'}
        ],
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
      this.$refs.editUserInfoFormRef.resetFields();
      this.isShowDialog = false;
    },
    confirm() {
      this.$refs.editUserInfoFormRef.validate(valid => {
        if (valid) {
          const form = {
            ...this.editUserInfoForm,
            cn: this.Cname
          };
          this.$emit('confirm', form, this.loading, this.closeDialog);
        }
      });

    },
    getModifyUserInfo() {
      this.$nextTick(() => {
        let data = {cn: this.Cname};
        UserApi.getModifyUserInfo(data).request().then((res) => {
          this.editUserInfoForm.display_name = res.data.display_name;
          this.editUserInfoForm.employee_type = res.data.employee_type.split(",");
          this.editUserInfoForm.mail = res.data.email;
          this.editUserInfoForm.role = res.data.role;

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