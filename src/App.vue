<template>
  <div>
    <router-view :style="autoHeight"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

let windowHeight = window.innerHeight;

@Component
export default class App extends Vue {
  windowHeight = windowHeight;
  autoHeight = {
    height: ''
  };

  getHeight(): void {
    this.autoHeight.height = windowHeight + 'px';
  }

  created(): void {
    window.addEventListener('resize', this.getHeight);
    this.getHeight();
  }

}
</script>

<style lang="scss">
@import "./assets/style/reset.scss";
@import "./assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-hei;
  background: #f5f5f5;
}
</style>
