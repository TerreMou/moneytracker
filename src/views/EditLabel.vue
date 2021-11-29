<template>
  <Layout>
    <nav-bar>编辑标签</nav-bar>
    <div class="formItem-wrapper">
      <FormItem :value="tag.name" field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/model/tagListModel';
import FormItem from '@/components/Records/FormItem.vue';
import Button from '@/components/Button.vue';
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {NavBar, Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: {id: string, name: string} = undefined;

  created(): void {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(tag => tag.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/404');
    }

  }
}
</script>

<style lang="scss" scoped>
.formItem-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
</style>