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

type Result = { title: string, total?: number, items: RecordItem[] }[]

@Component({
  components: {Tabs, Chart},
})
export default class Statistics extends Vue {

  mounted() {
    (this.$refs.chartWrapper as HTMLDivElement).scrollLeft = 9999;
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

  get x() {
    return {
      grid: {
        left: 0,
        right: 0,
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
        data: [100, 200, 300, 400, 200, 100, 900],
        type: 'line',
        symbolSize: 12,
        itemStyle: {borderWidth: 1, color: '$color-line'},
        // symbol: 'circle',
      }],
      tooltip: {
        show: true,
        position: 'top',
        formatter: '{c}',
        // triggerOn: 'click',
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
