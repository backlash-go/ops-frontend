<template>


  <div>
    <el-card class shadow="always">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item class="item-button">
          <el-button class="reset-item-button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button class="reset-item-button" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script>

import UserApi from '@/api/user/user.js';
import {Message} from "element-ui";

export default {
  name: "ModifyPassword",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      if (value.length < 6) {
        callback(new Error('密码长度不能小于6!'));
      }

      callback();

    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于6!'));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          {validator: validatePass,required: true, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, required: true,trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            password: this.ruleForm.password,
            cn: this.$store.getters.name
          };
          UserApi.modifyPass(data).request().then(() => {
            Message({
              message: "密码修改成功",
              type: "success",
              offset: 100,
              duration: 3500,
            });
            this.$refs[formName].resetFields();
          }).catch(error => {
            this.$refs[formName].resetFields();
            console.log(error);
          });
        } else {
          Message({
            message: "修改密码失败或者验证不通过",
            type: "error",
            offset: 100,
            duration: 3500,
          });
          this.$refs[formName].resetFields();

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
//::v-deep .el-select {
//  width: 100%;
//}

::v-deep .el-input__inner {
  width: 400px;
}


::v-deep .el-form-item {

  display: flex;
  justify-content: center;
  margin-right: 180px;


  .el-form-item__content {
    margin-left: 10px !important;
  }

}

.reset-item-button {
  margin-left: 90px;
}

//.item-button {
//  display: flex;
//  justify-content: space-between;
//}


</style>