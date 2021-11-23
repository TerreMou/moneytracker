<template>
  <div class="records-wrapper">
    <Number-pad @update:value="onUpdateAmount" @submit="saveRecords"/>
    <Comments @update:value="onUpdateComments"/>
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
import model from '@/model';

type RecordItem = {
  type: string
  comments: string
  amount: number
  createdTime?: Date
  tags: string[]
}

const recordList = model.fetch();

@Component({
  components: {Types, Title, Tags, Comments, NumberPad}
})
export default class Records extends Vue {
  tags = ['食物', '购物', '出行', '其他'];
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
    const recordCopy: RecordItem = model.clone(this.record)
    recordCopy.createdTime = new Date();
    this.recordList.push(recordCopy);
  }

  @Watch('recordList')
  onRecordListChanged(): void {
    model.save(this.recordList);
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