<template>
  <ul class="tags">
    <li v-for="tag in tagList" :key="tag.id"
        :class=" {selected: selectedTags.indexOf(tag)>=0} "
        @click="toggle(tag)">
      {{ tag.name }}
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
import {Component} from 'vue-property-decorator';

@Component({
  computed: {
    tagList() {
      // TODO
      // return this.$store.fetchTags();
      return []
    }
  }
})
export default class Tags extends Vue {
  selectedTags: string[] = [];

  toggle(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  addTag(): void {
    const name = window.prompt('请输入标签名');
    if (name === null) {return;} // 当用户直接点击取消的话，prompt 返回一个 null
    if (name === '') {
      return window.alert('标签名不能为空');
    } else {
      // TODO
      // store.createTag(name);
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
  flex-grow: 1;
  padding: 16px;
  font-size: 14px;
  background: white;

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