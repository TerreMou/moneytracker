<template>
  <div class="nav">
    <router-link to="/labels">明细</router-link>
    |
    <router-link to="/statistics">统计</router-link>
    |
    <router-link to="/myself">我的</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
  .nav {
    border: 1px solid red;
  }
</style>