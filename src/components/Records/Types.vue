<template>
  <ul class="types">
    <li :class="{[classPrefix+'-item']: classPrefix, selected: value==='-'}"
        @click="selectType('-')">支出
    </li>
    <li :class="{[classPrefix+'-item']: classPrefix, selected: value==='+'}"
        @click="selectType('+')">收入
    </li>
  </ul>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  selectType(value: string): void {
    if (value !== '-' && value !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', value);
  }


}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper.scss";

.types {
  background: #f5f5f5;
  display: flex;
  text-align: center;
  font-size: 1.2em;
  > li {
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: $color-highlight;
    }
  }
}
</style>