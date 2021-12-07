<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)" @click="select(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String)
  readonly value!: string;
  @Prop(String)
  classPrefix?: string;

  liClass(item: DataSourceItem): unknown {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    };
  }

  select(item: DataSourceItem): void {
    this.$emit('update:value', item.value);
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.tabs {
  background: #f5f5f5;
  display: flex;
  text-align: center;
  font-size: 1.2em;

  > li {
    width: 50%;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected {
      background: $color-highlight;
      color: white;
    }
  }
}
</style>