<template>
  <Layout>
    <nav-bar>编辑标签</nav-bar>
    <div class="formItem-wrapper">
      <FormItem :value="tag.name"
                @update:value="updateTag"
                field-name="标签名" placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="removeTag">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Records/FormItem.vue';
import Button from '@/components/Button.vue';
import NavBar from '@/components/NavBar.vue';
import store from '@/store/index2';

@Component({
  components: {NavBar, Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: Tag = undefined;

  created(): void {
    this.tag = store.findTag(this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }
  updateTag(name: string):void {
    if (this.tag) {
      store.updateTag(this.tag.id, name)
    }
  }
  removeTag():void {
    if (this.tag) {
      if(store.removeTag(this.tag.id)) {
        this.$router.back();
      } else {
        window.alert('删除失败')
      }
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