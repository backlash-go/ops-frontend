<template>
  <div>{{ iconClass }}</div>
</template>



<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }

  }
};
</script>

<style scoped>

</style>