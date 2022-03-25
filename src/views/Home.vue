<template>
  <div>
    home
    <div>
      <svg-icon iconClass="eye"></svg-icon>
    </div>

       <div>
         sad
         <div>
           <Rend  icon="dashboard" level="1"></Rend>
         </div>
       </div>
  </div>
</template>


<script>

import Rend from "@/views/Rend.vue";

export default {
  name: "Home",
  components: {
    Rend
  }
};
</script>

<style scoped>

</style>