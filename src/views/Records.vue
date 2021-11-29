<template>
  <div class="records-wrapper">
    <Number-pad @update:value="onUpdateAmount"
                @submit="saveRecords"
                @back="goBack"/>
    <div class="form-wrapper">
      <FormItem placeholder="请输入备注" @update:value="onUpdateComments"/>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    <Types :value.sync="record.type"/>
    <NavBar>记账</NavBar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Records/Number-pad.vue';
import FormItem from '@/components/Records/FormItem.vue';
import Tags from '@/components/Records/Tags.vue';
import Types from '@/components/Records/Types.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/model/recordListModel';
import tagListModel from '@/model/tagListModel';
import NavBar from '@/components/NavBar.vue';

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {NavBar, Types, Tags, FormItem, NumberPad}
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
    recordListModel.create(this.record);
  }

  goBack(): void {
    this.$router.go(-1);
  }

  @Watch('recordList')
  onRecordListChanged(): void {
    recordListModel.save();
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

.form-wrapper {
  padding: 4px 0;
}
</style>