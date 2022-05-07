<template>
  <div>
    <el-dialog title="添加接口" :visible.sync="isShowDialog" width="30%">

      <el-form
          label-width="100px"
          label-position="right"
          ref="createApiFormRef"
          :model="createApiForm"
          :rules="createApiFormRules">

        <el-form-item label-width="120px" label="接口名称" prop="api">
          <el-input v-model="createApiForm.api" placeholder=""></el-input>
        </el-form-item>


        <el-form-item label-width="120px" label="接口说明" prop="name">
          <el-input v-model="createApiForm.name" placeholder=""></el-input>
        </el-form-item>

        <el-form-item label-width="120px" label="接口角色" prop="role">

          <el-select v-model.trim="createApiForm.role"
                     style="width: 100%"
                     multiple
                     placeholder="请至少选择一个角色">
            <el-option
                v-for="item in ROLES"
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


import {ROLES} from "@/common/constant.js";

export default {
  name: "CreateApi",
  data() {
    return {
      ROLES,
      isShowDialog: false,
      confirmLoading: false,
      createApiForm: {
        api: '',
        name: '',
        role: [],
      },
      createApiFormRules: {
        api: [
          {required: true, message: '请输入接口名称', trigger: 'blur'},
          {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入接口说明', trigger: 'blur'},
          {min: 1, max: 40, message: '长度在 1 到 40 个字符', trigger: 'blur'}
        ],
        role: [
          {type: 'array', required: true, message: '请至少选择一个角色类型', trigger: 'change'}
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
      this.$refs.createApiFormRef.resetFields();
      this.isShowDialog = false;
    },
    confirm() {
      this.$refs.createApiFormRef.validate(valid => {
        if (valid) {
          const form = {
            ...this.createApiForm,
          };
          this.$emit('confirm', form, this.loading, this.closeDialog);
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