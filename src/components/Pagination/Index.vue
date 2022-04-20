<template>


  <div :class="{'hidden': hidden}" class="pagination-container">
    <!-- v-bind="$attrs" <Pagination attr='xxx'>会把组件的属性 带入 <el-pagination attr='xxx'>  -->

    <el-pagination
        :background="background"
        :page-size.sync="pageSize"
        :page-sizes="pageSizes"
        :total="total"
        :layout="layout"
        :current-page.sync="currentPage"
        v-bind="$attrs"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">

    </el-pagination>

  </div>

</template>

<script>
import {scrollTo} from '../_util/scroll-to';


export default {
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    scrollTop: { // 暂时仅支持滚动顶部距离，不支持#id
      type: Number,
      default: 0
    }


  },
  data() {
    return {
      name: "pagination"
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // if (this.currentPage * val > this.total) {
      //   return;
      // }
      this.$emit('pagination', {page: this.currentPage, limit: val});
      if (this.autoScroll) {
        scrollTo(this.scrollTop, 800);
      }
    },
    handleCurrentChange: function (val) {
      this.$emit('pagination', {page: val, limit: this.pageSize});
      if (this.autoScroll) {
        scrollTo(this.scrollTop, 800);
      }
    },

    add() {
      let a = this.title;
      a += "1";
      this.$emit("update:title", a);

    },
    send() {
      // this.$emit("update:title", this.title);
    }
  }
};
</script>

<style scoped>

.pagination-container {
  background: #fff;
  text-align: right;
  margin-top: 30px;
}

.pagination-container.hidden {
  display: none;
}

</style>