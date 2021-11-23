<template>
  <div class="title">
    <div class="backspace" @click="goBack">
      <Icon name="goBack"/>
    </div>
    <div class="pageTitle">记账</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Title extends Vue {
  goBack(): void {
    this.$router.go(-1);
    console.log(this);
  }
}
</script>

<style lang="scss" scoped>
.title {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;

  > .backspace {
    > .icon {
      height: 28px;
      width: 28px;
    }
  }
  > .pageTitle {
    position: absolute;
    width: 60px;
    top: 0;
    left: 50%;
    margin-left: -30px;
    font-size: 1.2em;
    text-align: center;
  }
}
</style>