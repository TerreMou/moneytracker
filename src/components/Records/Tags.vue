<template>
  <ul class="tags">
    <li v-for="tag in dataSource" :key="tag"
        :class=" {selected: selectedTags.indexOf(tag)>=0} "
        @click="toggle(tag)">
      {{ tag }}
    </li>
    <li>
      <button @click="addTag" class="add">
        <Icon name="add"/>
      </button>
    </li>
  </ul>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  addTag() {
    const name = window.prompt('请输入标签名');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) {
      this.$emit('update:dataSource',[...this.dataSource, name]);
    }
  }

}

</script>

<style lang="scss" scoped>
@import "../../assets/style/helper.scss";

.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 12px 4px;
  flex-grow: 1;
  padding: 12px;
  font-size: 14px;

  > li {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    padding: 0 16px;
    margin-right: 20px;
    margin-top: 4px;
    border-radius: 50%;
    background: #d5d8dc;

    &.selected {
      background: $color-highlight;
      color: white;
    }

  }

  .add {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    color: #333;

    > .icon {
      width: 28px;
      height: 28px;
    }
  }
}

</style>