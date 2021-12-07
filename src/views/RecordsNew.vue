<template>
  <Layout class-prefix="layout">

    <Number-pad @update:value="onUpdateAmount"
                @submit="saveRecords"
                @back="goBack"/>
    <div class="form-wrapper">
      <FormItem placeholder="请输入备注"
                :value.sync="record.comments"/>
    </div>
    <div class="tags-wrapper">
      <Tags @update:value="record.tags = $event"/>
    </div>
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"/>
    <NavBar>记账</NavBar>


  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Records/Number-pad.vue';
import FormItem from '@/components/Records/FormItem.vue';
import Tags from '@/components/Records/Tags.vue';
import {Component} from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, NavBar, Tags, FormItem, NumberPad},
})
export default class Records extends Vue {
  record: RecordItem = {
    type: '-', tags: [], comments: '', amount: 0
  };

  recordTypeList = recordTypeList;

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  created(): void {
    this.$store.commit('fetchRecords');
  }

  onUpdateComments(value: string): void {
    this.record.comments = value;
  }

  onUpdateAmount(value: string): void {
    this.record.amount = parseFloat(value);
  }

  saveRecords(): void {
    if (!this.record.tags || this.record.tags.length === 0) {
      window.alert('请至少选择一个标签');
      return;
    }

    this.$store.commit('createRecord', this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert('已保存');
      this.record.comments = '';
    }
  }

  goBack(): void {
    this.$router.go(-1);
  }
}

</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

}

.form-wrapper {
  padding: 4px 0;
}

.tags-wrapper {
  flex-grow: 1;
  background: white;
}
</style>