<template>
  <div>
    <el-dialog title="创建LDAP账号" :visible.sync="isShowDialog" width="30%">

      <el-form
          label-width="100px"
          label-position="right"
          ref="createAccountFormRef"
          :model="createAccountForm"
          :rules="createAccountFormRules">

        <el-form-item label-width="120px" label="用户名" prop="cn">
          <el-input v-model="createAccountForm.cn"></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="姓氏" prop="sn">
          <el-input v-model="createAccountForm.sn"></el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="邮箱" prop="mail">
          <el-input v-model="createAccountForm.mail"></el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="名字" prop="given_name">
          <el-input v-model="createAccountForm.given_name"></el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="全名" prop="display_name">
          <el-input v-model="createAccountForm.display_name"></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="密码" prop="user_password">
          <el-input v-model="createAccountForm.user_password"></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="员工类型" prop="employee_type">
          <el-select v-model.trim="createAccountForm.employee_type"
                     style="width: 100%"
                     multiple
                     placeholder="请选择员工类型">
            <el-option
                v-for="item in EMPLOYEE_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>

        </el-form-item>


        <el-form-item label-width="120px" label="员工角色" prop="roles">

          <el-select v-model.trim="createAccountForm.roles"
                     style="width: 100%"
                     multiple
                     placeholder="请选择员工角色">
            <el-option
                v-for="item in ROLE_TYPE"
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


import {ROLE_TYPE, EMPLOYEE_TYPE} from "@/common/constant.js";

export default {
  name: "CreateAccount",
  data() {
    return {
      ROLE_TYPE,
      EMPLOYEE_TYPE,
      isShowDialog: false,
      confirmLoading: false,
      createAccountForm: {
        cn: '',
        sn: '',
        mail: '',
        given_name: '',
        display_name: '',
        employee_type: ['other'],
        roles: ['guest'],
        user_password: ''
      },
      createAccountFormRules: {
        cn: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 1, max: 8, message: '长度在 1 到 8 个字符', trigger: 'blur'}
        ],
        sn: [
          {required: true, message: '请输入姓', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
        ],
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 3, max: 28, message: '长度在 3 到 9 个字符', trigger: 'blur'}
        ],
        given_name: [
          {required: true, message: '请输入名', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 9 个字符', trigger: 'blur'}
        ],
        display_name: [
          {required: true, message: '请输入真实全名', trigger: 'blur'},
          {min: 3, max: 8, message: '长度在 3 到 9 个字符', trigger: 'blur'}
        ],
        employee_type: [
          {type: 'array', required: true, message: '请至少选择一个员工类型', trigger: 'change'}
        ],
        roles: [
          {type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change'}
        ],
        user_password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur'}

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
      this.$refs.createAccountFormRef.resetFields();
      this.isShowDialog = false;
    },
    confirm() {
      this.$refs.createAccountFormRef.validate(valid => {
        if (valid) {
          const form = {
            ...this.createAccountForm,
          }
          this.$emit('confirm',form,this.loading,this.closeDialog)
        }
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