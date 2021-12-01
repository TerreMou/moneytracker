<template>
  <div class="records-wrapper">
    <Number-pad @update:value="onUpdateAmount"
                @submit="saveRecords"
                @back="goBack"/>
    <div class="form-wrapper">
      <FormItem placeholder="请输入备注" @update:value="onUpdateComments"/>
    </div>
    <Tags/>
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
import {Component} from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {NavBar, Types, Tags, FormItem, NumberPad},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Records extends Vue {
  record: RecordItem = {
    type: '-', tags: [], comments: '', amount: 0
  };

  created(): void {
    this.$store.commit('fetchRecords')
  }

  onUpdateComments(value: string): void {
    this.record.comments = value;
  }

  onUpdateAmount(value: string): void {
    this.record.amount = parseFloat(value);
  }

  saveRecords(): void {
    this.$store.commit('createRecord', this.record);
  }

  goBack(): void {
    this.$router.go(-1);
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