<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="x"/>
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span class="total-amount">￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="comments">{{ item.comments }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>

  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';
import _ from 'lodash';

type Result = { title: string, total?: number, items: RecordItem[] }[]

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {

  mounted(): void {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  tagString(tags: Tag[]): string {
    return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
  }

  beautify(string: string): string {
    const now = dayjs();
    const day = dayjs(string);
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get y(): { date:string,value:number }[] {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today)
          .subtract(i, 'day').format('YYYY-MM-DD');
      const found = _.find(this.recordList, {
        createdTime: dateString
      });
      array.push({
        date: dateString, value: found ? found.amount : 0
      });
    }
    array.sort((a, b) => { //字符串只能比较大小，不能相减
      if (a.date > b.date) {
        return 1;
      } else if (a.date === b.date) {
        return 0;
      } else {
        return -1;
      }
    });
    return array;
  }

  get x() {
    const keys = this.y.map(item => item.date);
    const values = this.y.map(item => item.value);
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true, // 横轴刻度和坐标对齐
        },
        axisLine: {
          lineStyle: {color: '#666'}
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: values,
        type: 'line',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '$color-line'},
        // symbol: 'circle',
      }],
      tooltip: {
        show: true,
        position: 'top',
        formatter: '{c}',
        triggerOn: 'click',
      },
    };
  }

  get recordList(): RecordItem[] {
    return this.$store.state.recordList;
  }

  get groupedList(): Result {

    const {recordList} = this;

    const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdTime).valueOf() - dayjs(a.createdTime).valueOf());
    if (newList.length === 0) {return [] as Result; }
    const result: Result = [{title: dayjs(newList[0].createdTime).format('YYYY-M-D'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdTime), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdTime).format('YYYY-M-D'), items: [current]});
      }
    }
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  recordTypeList = recordTypeList;
}
</script>

<style scoped lang="scss">
@import "../assets/style/helper.scss";

.chart {
  width: 430%;

  &-wrapper {
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.noResult {
  padding: 16px;
  text-align: center;
}

%item {
  padding: 8px 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  @extend %item;
  background: #f5f5f5;

  .total-amount {
    color: $color-highlight;
  }
}

.record {
  @extend %item;
  background: white;
}

//::v-deep li.type-tabs-item {
//  background: #f5f5f5;
//  height: 52px;
//
//  &.selected {
//    background: $color-highlight;
//    color: white;
//
//    &::after {
//      display: none;
//    }
//  }
//}

.comments {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

</style>
