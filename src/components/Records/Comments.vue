<template>
  <div>
    <label class="comments">
      <input type="text" v-model="value" placeholder="备注">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Comments extends Vue {
  value = '';
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

  > input {
    border: none;
    height: 40px;
    flex-grow: 1;
    padding-left: 16px;
    background: #f8f9f9;
  }
}

</style>