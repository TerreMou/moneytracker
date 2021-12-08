<template>
  <div>
    <label class="formItem" :class="classPrefix && `${classPrefix}-formItem`">
      <span class="field-name">{{ this.fieldName }}</span>
      <template v-if="type === 'date'">
        <input :type="type || 'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
      <template v-else>
        <input :type="type || 'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>

    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop() fieldName?: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;
  @Prop(String) classPrefix?: string;

  onValueChanged(value: string): void {
    this.$emit('update:value', value);
  }

  x(isoString: string): string {
    return dayjs(isoString).format('YYYY-MM-DD');
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