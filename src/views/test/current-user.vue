<template>
 <span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
</template>

<script>
export default {
  name: "current-user",
  data() {
    return {
      user: {
        lastName: "lassss",
        firstName: "firss"
      }
    };
  }
};
</script>

<style scoped>

</style>