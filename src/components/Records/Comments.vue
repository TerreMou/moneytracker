<template>
  <div>
    <label class="comments">
      <span class="field-name">{{ this.fieldName }}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Comments extends Vue {
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
.comments {
  display: flex;
  font-size: 14px;
  align-items: center;
  background: white;

  > input {
    border: none;
    height: 40px;
    flex-grow: 1;
    padding-left: 16px;
  }
  .field-name {
    padding-left: 16px;
  }
}

</style>