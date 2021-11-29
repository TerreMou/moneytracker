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
      <Button @click="createTag" class="addTag">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/model/tagListModel';
import Button from '@/components/Button.vue';

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  tags = window.tagList;

  createTag(): void {
    const name = window.prompt('请输入标签名');
    if (name === null) {return;} // 当用户直接点击取消的话，prompt 返回一个 null
    if (name === '') {
      window.alert('标签名不能为空');
      return;
    } else if (name) {
      window.createTag(name);
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
.addTag-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}


</style>