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
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import {TagHelper} from '@/mixins/TagHelper';

@Component({
  components: {Button},
  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  beforeCreate(): void {
    this.$store.commit('fetchTags');
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