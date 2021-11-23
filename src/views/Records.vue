<template>
  <div class="records-wrapper">
    <Number-pad @update:value="onUpdateAmount" @submit="saveRecords"/>
    <Comments @update:value="onUpdateComments"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="recordAll.type"/>
    {{ recordAll }}
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

type RecordAll = {
  type: string
  tags: string[]
  comments: string
  amount: number
}

@Component({
  components: {Types, Title, Tags, Comments, NumberPad}
})
export default class Records extends Vue {
  tags = ['食物', '购物', '出行', '其他'];
  recordList: RecordAll[] = [];
  recordAll: RecordAll = {type: '-', tags: [], comments: '', amount: 0};

  onUpdateTags(value: string[]): void {
    this.recordAll.tags = value;
  }

  onUpdateComments(value: string): void {
    this.recordAll.comments = value;
  }

  onUpdateAmount(value: string): void {
    this.recordAll.amount = parseFloat(value);
  }

  saveRecords():void {
    const recordCopy = JSON.parse(JSON.stringify((this.recordAll)))
    this.recordList.push(recordCopy);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordListChanged():void {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList))
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