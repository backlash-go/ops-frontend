<template>
  <div>
    <el-dialog title="确认删除?" :visible.sync="isShowDialog" width="30%">


      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleResetPasswordForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!--        <el-form-item class="item-button">-->
        <!--          <el-button class="reset-item-button" type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
        <!--          <el-button class="reset-item-button" @click="resetForm('ruleForm')">重置</el-button>-->
        <!--        </el-form-item>-->
      </el-form>


      <div class="btn-line">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirm" :loading="confirmLoading">确定</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>


export default {


  name: "ResetPassword",
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
      isShowDialog: false,
      confirmLoading: false,
      ruleForm: {
        password: '',
        checkPass: ''
      },
      rules: {
        password: [
          {validator: validatePass, required: true, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, required: true, trigger: 'blur'}
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
      this.isShowDialog = false;
    },
    confirm() {

      this.$refs.ruleResetPasswordForm.validate(valid => {
        if (valid) {
          this.$emit('confirm', this.ruleForm.password, this.loading, this.closeDialog);
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