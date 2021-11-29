<template>
  <ul class="types">
    <li :class="value === '-' && 'selected'"
        @click="selectType('-')">支出
    </li>
    <li :class="value === '+' && 'selected'"
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
  selectType(value: string): void {
    if (value !== '-' && value !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', value)
  }


}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper.scss";

.types {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  background: white;

  > li {
    border: 1px solid #020202;
    border-radius: 3px;
    width: 20%;

    &.selected {
      background: $color-highlight;
    }
  }
}

</style>