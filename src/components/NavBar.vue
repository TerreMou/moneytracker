<template>
  <div class="nav-bar">
    <div class="backspace" @click="goBack">
      <Icon name="goBack"/>
    </div>
    <div class="pageTitle">
      <slot/>
    </div>
    <div class="right-placeholder"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Title extends Vue {
  goBack(): void {
    this.$router.go(-1);
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  padding: 12px 8px;
  background: $color-background;
  justify-content: space-between;
  color: white;

  > .backspace {
    height: 28px;
    width: 28px;

    > .icon {
      height: 28px;
      width: 28px;
    }
  }

  > .pageTitle {
    font-size: 1.2em;
  }

  > .right-placeholder {
    height: 28px;
    width: 28px;
  }
}
</style>