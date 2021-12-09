<template>
  <div class="wrapper" ref="wrapper">chart</div>
</template>

<script lang="ts">
import Vue from 'vue';
import echarts, {EChartOption} from 'echarts';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption;
  chart?: echarts.ECharts;

  mounted() {
    if (this.options === undefined) {
      console.error('options 为空');
      return;
    }
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: EChartOption): void {
    if (this.chart) {
      this.chart.setOption(newValue);
    }
  }


}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>