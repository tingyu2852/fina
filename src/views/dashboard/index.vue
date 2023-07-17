<template>
  <div class="dashboard-container">
    <el-card>
      <div style="text-align: center;margin: 20px;font-size: 20px;">年度统计</div>
      <div id="wx" style="width: 100%; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as echarts from "echarts";
//const dayjs = require('dayjs/locale/zh-cn')
import * as dayjs from "dayjs";
const updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);
dayjs.locale("zh-cn");
// dayjs.updateLocale('zh-cn',{
//   weekStarts:1,
// })
export default {
  name: "Dashboard",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      data: [
        "你好",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "你好",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "你好",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
        "你好",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      asd: [
        1, 3, 2, 20, 1, 0, 0, 1, 10, 2, 20, 1, 0, 0, 1, 10, 2, 20, 1, 0, 0, 1,
        10, 2, 20, 1, 0, 0,
      ],
      timeObj: {
        start_time: "",
        end_time: "",
      },
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  mounted() {
    console.log(echarts);
    this.wxTu();
  },
  methods: {
    wxTu() {
      var chartDom = document.getElementById("wx");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
  legend: {},
  tooltip: {},
  dataset: {
    source: [
      ['product', '总金额', '本金', '利息'],
      ['2021年', 100000000, 90000000, 10000000],
      ['2022年', 136548451,  100000000, 36548451],
      ['2023年', 136548451,  100000000, 36548451]
    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
      myChart.setOption(option);
    },
    
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
