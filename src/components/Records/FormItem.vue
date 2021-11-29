<template>
  <div>
    <label class="formItem">
      <span class="field-name">{{ this.fieldName }}</span>
      <input type="text" v-model="value" :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  value = '';

  @Prop() fieldName?: string;
  @Prop() placeholder?: string;

  @Watch('value')
  onValueChanged(value:string):void {
    this.$emit('update:value', value)
  }
}


</script>

<style lang="scss" scoped>
.formItem {
  display: flex;
  font-size: 16px;
  align-items: center;

  > input {
    border: none;
    height: 40px;
    flex-grow: 1;
    padding-left: 16px;
    background: transparent;
  }
  .field-name {
    padding-left: 16px;
  }
}

</style>