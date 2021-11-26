<template>
  <Layout>
    <div class="tagsList">
      <router-link :to="`/labels/edit/${ tag.id }`"
                   class="tag"
                   v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="arrowRight"/>
      </router-link>
    </div>

    <div class="addTag-wrapper">
      <button @click="addTag" class="addTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/model/tagListModel';

tagListModel.fetch();

@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  addTag(): void {
    const name = window.prompt('请输入标签名');
    if (name === null) {return;} // 当用户直接点击取消的话，prompt 返回一个 null
    if (name === '') {
      window.alert('标签名不能为空');
      return;
    } else if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名重复了')
      } else if (message === 'success') {
        window.alert('标签添加成功')
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.tagsList {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg {
    width: 24px;
    height: 24px;
    color: #333;
    margin-right: 16px;
  }
}

.addTag {
  border: none;
  background: $color-highlight;
  color: white;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
}

</style>