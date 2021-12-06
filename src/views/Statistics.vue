<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <Tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>

    <ol class="wrapper">
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="comments">{{ item.comments }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get result() {
    const {recordList} = this;

    type Items = RecordItem[]
    type HashTableValue = { title: string, items: Items }

    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdTime!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);

    }
    return hashTable;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  interval = 'day';
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
@import "../assets/style/helper.scss";

%item {
  padding: 8px 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper {
  margin-top: 16px;
}

.title {
  @extend %item;
  background: $color-highlight;
}

.record {
  @extend %item;
  background: white;
}

::v-deep li.type-tabs-item {
  background: #f5f5f5;
  height: 52px;

  &.selected {
    background: $color-highlight;
    color: white;

    &::after {
      display: none;
    }
  }
}

.comments {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

</style>
