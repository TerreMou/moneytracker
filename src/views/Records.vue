<template>
  <div class="records-wrapper">
    <Number-pad @update:value="onUpdateAmount"
                @submit="saveRecords"
                @back="goBack"/>
    <Comments placeholder="请输入备注" @update:value="onUpdateComments"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type"/>
    <Title/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Records/Number-pad.vue';
import Comments from '@/components/Records/Comments.vue';
import Tags from '@/components/Records/Tags.vue';
import Types from '@/components/Records/Types.vue';
import Title from '@/components/Records/Title.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/model/recordListModel';
import tagListModel from '@/model/tagListModel';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {Types, Title, Tags, Comments, NumberPad}
})
export default class Records extends Vue {
  tags = tagList;
  recordList = recordList;
  record: RecordItem = {
    type: '-', tags: [], comments: '', amount: 0
  };

  onUpdateTags(value: string[]): void {
    this.record.tags = value;
  }

  onUpdateComments(value: string): void {
    this.record.comments = value;
  }

  onUpdateAmount(value: string): void {
    this.record.amount = parseFloat(value);
  }

  saveRecords(): void {
    const recordCopy: RecordItem = recordListModel.clone(this.record)
    recordCopy.createdTime = new Date();
    this.recordList.push(recordCopy);
  }

  goBack(): void {
    this.$router.go(-1);
  }

  @Watch('recordList')
  onRecordListChanged(): void {
    recordListModel.save(this.recordList);
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.records-wrapper {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
}

</style>