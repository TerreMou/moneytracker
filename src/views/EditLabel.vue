<template>
  <Layout>
    <nav-bar>编辑标签</nav-bar>
    <div class="formItem-wrapper">
      <FormItem :value="currentTag.name"
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

@Component({
  components: {NavBar, Button, FormItem},
})
export default class EditLabel extends Vue {
  get currentTag(): Tag {
    return this.$store.state.currentTag;
  }

  created(): void {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  updateTag(name: string): void {
    if (this.currentTag) {
      this.$store.commit('updateTag',
          {id: this.currentTag.id, name});
    }
  }

  removeTag(): void {
    if (this.currentTag) {
      this.$store.commit('removeTag', this.currentTag.id);
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