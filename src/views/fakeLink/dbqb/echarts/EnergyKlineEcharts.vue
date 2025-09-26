<template>
  <div ref="qxnlzhqEchartsRef" id="qxnlzhqEcharts"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, toRef, reactive, watch } from "vue";
import * as echarts from "echarts";
import { ElMessageBox, ElMessage } from "element-plus";
import { fakeLinkDataListStore } from "../../../../store/fakeLink-dataList";
const dataListStore = fakeLinkDataListStore();
defineExpose({ initQXNLZHEcharts });

let qxnlzhqEchartsRef = ref(null);
let qxnlzhqEchartsInstance = null;

let regions = reactive([]);
let markLineRegions = reactive([]);
const dataMax = ref(null);
// 设置区域名称 位置
function getNameTop(min, max, regionMin, regionMax, regionMiidle) {
  console.log(
    "min",
    min,
    "max",
    max,
    "regionMin",
    regionMin,
    "regionMax",
    regionMax,
    "regionMiidle",
    regionMiidle
  );

  // max = Math.min(max, regionMax)
  // min = Math.max(min, regionMin)

  // 获取整个图表的高度
  const chartHeight = qxnlzhqEchartsInstance.getHeight();
  const topHeight = 40;
  const bottomHeight = 60;
  const xDateFontSize = window.innerHeight > 769 ? 12 + 5 : 9 + 5;
  const noHeight = topHeight + bottomHeight + xDateFontSize;
  console.log(
    "%",
    ((max - Number(regionMiidle)) / (max - min)) * (chartHeight - noHeight)
  );
  console.log("chartHeight", chartHeight);
  // 60: 为x轴占的高度，20: 向上偏移量让文字向上移动
  return (
    ((max - Number(regionMiidle)) / (max - min)) * (chartHeight - noHeight)
  );
  // return chartHeight - noHeight
}
// 设置区域最大值 位置
function getNumberTop(min, max, regionMax) {
  // 获取整个图表的高度
  const chartHeight = qxnlzhqEchartsInstance.getHeight();
  // 60: 为x轴占的高度
  return ((max - Number(regionMax)) / (max - min)) * (chartHeight - 60);
  // return 10
}

// 生成图形标注（核心逻辑）
const generateGraphics = (min, max) => {
  // console.log('regions', regions)
  let regionMin;
  let regionMax;
  for (let i = 0; i < regions.length; i++) {
    if (i == 0) {
      regionMin = Number(regions[i].min);
      regionMax = Number(regions[i].max);
    } else {
      regionMin = Math.min(regionMin, Number(regions[i].min));
      regionMax = Math.max(regionMax, Number(regions[i].max));
    }
    // console.log('regionMin', regionMin, 'regionMax', regionMax)
  }

  return regions.flatMap((region) => {
    // console.log(region)
    if (!region.min || !region.max) return [];

    const middleY = (Number(region.min) + Number(region.max)) / 2;
    // const safeY = Math.max(min, Math.min(middleY, max * 0.99))
    const safeY = (Math.max(min, region.min) + Math.min(max, region.max)) / 2;
    // 检查区域是否完全可见
    const isFullyVisible = region.min >= min && region.max <= max;
    // 检查区域是否部分可见
    const isPartiallyVisible =
      region.min < max && region.max > min && !isFullyVisible;

    // 计算区域在图表中的实际像素高度
    const chartHeight = qxnlzhqEchartsInstance
      ? qxnlzhqEchartsInstance.getHeight()
      : 400;
    const visibleRegionMin = Math.max(region.min, min);
    const visibleRegionMax = Math.min(region.max, max);
    const regionPixelHeight =
      ((visibleRegionMax - visibleRegionMin) / (max - min)) *
      (chartHeight - 60);

    // 设置最小高度阈值，区域太小时不显示名称
    const minHeightThreshold = 5; // 像素
    const shouldShowName = regionPixelHeight >= minHeightThreshold;

    const graphics = [];
    // 区域名称（中间位置）- 只有在区域足够大时才显示
    if ((isFullyVisible || isPartiallyVisible) && shouldShowName) {
      graphics.push({
        type: "text",
        left: region.left,
        right: region.right,
        top:
          window.innerWidth > 769
            ? 40 + getNameTop(min, max, regionMin, regionMax, safeY) - 6
            : 40 + getNameTop(min, max, regionMin, regionMax, safeY) - 4.5,
        // top: 40 + (607 - 40 - 60-15),
        style: {
          text: region.name,
          fill: region.fontColor,
          fontSize: window.innerWidth > 769 ? 12 : 9,
          fontWeight: "bold",
          // 关键：使用垂直居中对齐
          textVerticalAlign: "middle",
        },
        z: 2,
      });
    }
    return graphics;
  });
};

const klineData = ref();
const qxnlzhqData = ref();

const fetchData = async () => {
  // 深拷贝数据
  qxnlzhqData.value = dataListStore.AiEmotinData.QXNLZHQ;
  klineData.value = dataListStore.AiEmotinData.KLine20;
  initQXNLZHEcharts(klineData.value, qxnlzhqData.value);
};

function initQXNLZHEcharts(kline, qxnlzhqData) {
  console.log("初始化图表");
  // 测试数据 ！！！ 删掉
  // qxnlzhqData.topxh = ['2025/07/22', '2025/07/22']
  // qxnlzhqData.lowxh = ['2025/07/02', '2025/07/02']
  // qxnlzhqData.qixh = ['2025/07/08', '2025/07/08']

  if (!qxnlzhqEchartsRef.value) {
    console.log("DOM 元素未准备好，无法初始化 ECharts");
    return;
  }
  if (qxnlzhqEchartsInstance) {
    qxnlzhqEchartsInstance.dispose();
  }
  // 数据
  let mixData = [];
  if (!Array.isArray(kline)) {
    console.log("不是");
  }
  kline.forEach((element) => {
    let date = element[0];
    let value = [element[1], element[2], element[3], element[4]];
    mixData.push({
      date,
      value,
    });
  });

  // 动态区域配置
  // dd到zc 低吸区------情绪冰点区 ； zc到ht 关注区------认知潜伏区； ht到qs 回调区------多空消化区 ； qs到tp 拉升区------共识加速区；
  // tp到js 突破区------情绪临界区 ； js到yl 警示区-------杠杆失衡区 ； yl到gg 风险区-------情绪熔断区；
  regions = [
    {
      min: qxnlzhqData.dd,
      max: qxnlzhqData.zc,
      name: "情绪冰点区",
      color: "#F5D6FF",
      fontColor: "#A7691C",
      fontSize: window.innerWidth > 769 ? 12 : 9,
      NumberColor: "white",
      left: null,
      right: "7%",
    },
    {
      min: qxnlzhqData.zc,
      max: qxnlzhqData.ht,
      name: "认知潜伏区",
      color: "#FFF6C4",
      fontColor: "#A7691C",
      NumberColor: "white",
      left: null,
      right: "7%",
    },
    {
      min: qxnlzhqData.ht,
      max: qxnlzhqData.qs,
      name: "多空消化区",
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: "#D7FF9B" },
          { offset: 1, color: "#CEFF85" },
        ],
      },
      fontColor: "#A7691C",
      NumberColor: "white",
      left: null,
      right: "7%",
    },
    {
      min: qxnlzhqData.qs,
      max: qxnlzhqData.tp,
      name: "共识加速区",
      color: "#FFDC8F",
      fontColor: "#A7691C",
      NumberColor: "white",
      left: null,
      right: "7%",
    },
    {
      min: qxnlzhqData.tp,
      max: qxnlzhqData.js,
      name: "情绪临界区",
      color: "#FFC0AA",
      fontColor: "#A7691C",
      NumberColor: "white",
      left: window.innerWidth > 769 ? "32%" : "42%",
      right: null,
    },
  ];
  // gg yl为-1  不绘制部分图表
  if (Number(qxnlzhqData.yl) != -1) {
    regions.push({
      min: qxnlzhqData.js,
      max: qxnlzhqData.yl,
      name: "杠杆失衡区",
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: "#FEA474" },
          { offset: 1, color: "#FFAAF6" },
        ],
      },
      fontColor: "#A7691C",
      NumberColor: "white",
      left: window.innerWidth > 769 ? "32%" : "42%",
      right: null,
    });
  }
  if (Number(qxnlzhqData.gg) != -1) {
    regions.push({
      min: qxnlzhqData.yl,
      max: qxnlzhqData.gg,
      name: "情绪熔断区",
      color: {
        type: "linear",
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          { offset: 0, color: "#F66475" },
          { offset: 1, color: "#FFB98E" },
        ],
      },
      fontColor: "#A7691C",
      NumberColor: "white",
      left: window.innerWidth > 769 ? "32%" : "42%",
      right: null,
    });
  }

  // 计算动态的y轴范围
  const priceValues = kline.flatMap((item) => [
    item[1],
    item[2],
    item[3],
    item[4],
  ]);
  const dataMin = Math.min(...priceValues);
  const dataMax = Math.max(...priceValues);
  // 计算止盈止损价格
  const stopProfitPrice = Number(qxnlzhqData.cc) * 1.05; // 止盈价
  const stopLossPrice = Number(qxnlzhqData.cc) * 0.97; // 止损价
  // 确定起始和结束位置
  const startIndex = Math.max(0, mixData.length - 17);
  // 创建完整数据数组
  const takeProfitData = new Array(mixData.length).fill(null);
  const stopLossData = new Array(mixData.length).fill(null);
  // 填充显示区域的数据
  for (var i = startIndex; i < mixData.length; i++) {
    takeProfitData[i] = stopProfitPrice;
    stopLossData[i] = stopLossPrice;
  }

  // topxh、lowxh、qixh 对应k线染色
  // 创建中间区域数据
  const topMiddleRangeData = [];
  const topMiddleRangeData1 = [];
  const lowMiddleRangeData = [];
  const lowMiddleRangeData1 = [];
  const markPointData = [];
  const qixhData = ref([]);
  const topData = ref([]);
  const lowData = ref([]);
  const maxKlineData = {
    data: {
      value: [0, 0, 0, 0],
    },
  };
  const lastKlineData = {
    data: {
      value: [0, 0, 0, 0],
    },
  };

  let markLineMax = Math.max(
    dataMax * 1.02,
    stopProfitPrice * 1.02,
    qxnlzhqData.cc,
    qxnlzhqData.dd,
    qxnlzhqData.gg,
    qxnlzhqData.ht,
    qxnlzhqData.js,
    qxnlzhqData.qs,
    qxnlzhqData.tp,
    qxnlzhqData.yl,
    qxnlzhqData.zc
  );

  markLineRegions = regions.filter((region) => {
    return region.max <= markLineMax;
  });

  console.log("markLineMax", markLineMax, "markLineRegions", markLineRegions);

  mixData.forEach((item, index) => {
    const [open, close, low, high] = item.value;
    const rangeHeight = high - low;
    const noneItem = { date: item.date, value: [null, null, null, null] };
    // const middleThirdStart = low + rangeHeight * (1/3);
    // const middleThirdEnd = low + rangeHeight * (2/3);

    let color = null;

    // 获取最高价的K线数据和最后一根K线数据
    if (maxKlineData == null || maxKlineData.data.value[3] < high) {
      maxKlineData.data = item;
      maxKlineData.index = index;
    }
    lastKlineData.data = item;
    lastKlineData.index = index;

    let isTopxh = false;
    let isLowxh = false;

    if (qxnlzhqData.topxh.includes(item.date)) {
      topData.value.push({
        date: item.date,
        value: [item.value[0], item.value[1], item.value[0], item.value[1]],
      });
      color = "#000000"; // 黑色
      isTopxh = true;
    } else {
      topData.value.push(noneItem);
    }
    if (qxnlzhqData.lowxh.includes(item.date)) {
      lowData.value.push({
        date: item.date,
        value: [item.value[0], item.value[1], item.value[0], item.value[1]],
      });
      color = "#001EFF"; // 蓝色
      isLowxh = true;
    } else {
      lowData.value.push(noneItem);
    }
    if (qxnlzhqData.qixh.includes(item.date)) {
      console.log("item", item);
      qixhData.value.push({
        date: item.date,
        value: [item.value[0], item.value[1], item.value[0], item.value[1]],
      });
    } else {
      qixhData.value.push(noneItem);
    }

    // 添加TOP中间区域数据
    if (isTopxh) {
      topMiddleRangeData.push({
        value: [index, close > open ? close - open : open - close],
        itemStyle: {
          color: color,
        },
      });
      topMiddleRangeData1.push({
        value: [index, close > open ? open : close],
        itemStyle: {
          color: "transparent",
        },
      });
      lowMiddleRangeData.push(null);
      lowMiddleRangeData1.push(null);
    } else if (isLowxh) {
      lowMiddleRangeData.push({
        value: [index, close > open ? close - open : open - close],
        itemStyle: {
          color: "#001EFF",
        },
      });
      lowMiddleRangeData1.push({
        value: [index, close > open ? open : close],
        itemStyle: {
          color: "transparent",
        },
      });
      console.log("lowMiddleRangeData", lowMiddleRangeData);
      console.log("lowMiddleRangeData111111", lowMiddleRangeData1);

      topMiddleRangeData.push(null);
      topMiddleRangeData1.push(null);
    } else {
      topMiddleRangeData.push(null);
      topMiddleRangeData1.push(null);
      lowMiddleRangeData.push(null);
      lowMiddleRangeData1.push(null);
    }
  });

  // console.log('maxKlineData', maxKlineData)
  // console.log('lastKlineData', lastKlineData)

  markPointData.push({
    name: `${Number(maxKlineData.data.value[3]).toFixed(2)}`,
    coord: [maxKlineData.index, maxKlineData.data.value[3]],
    itemStyle: {
      color: "rgba(0,0,0,0)", // 标记点透明
    },
    label: {
      show: true,
      position: "top",
      formatter: `${Number(maxKlineData.data.value[3]).toFixed(2)}`,
      textStyle: {
        color: "#2171DD",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        textBorderColor: "#FFFFFF",
        textBorderWidth: 2,
        fontWeight: "bold",
      },
    },
  });

  markPointData.push({
    name: `${Number(lastKlineData.data.value[3]).toFixed(2)}`,
    coord: [lastKlineData.index, lastKlineData.data.value[2]],
    itemStyle: {
      color: "rgba(0,0,0,0)", // 标记点透明
    },
    label: {
      show: true,
      position: "bottom",
      formatter: `${Number(lastKlineData.data.value[1]).toFixed(2)}`,
      textStyle: {
        color: "#3B8F08",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        textBorderColor: "#FFFFFF",
        textBorderWidth: 2,
        fontWeight: "bold",
      },
    },
  });

  // 创建带有 backgroundSize 的图案
  function createPatternWithSize(gradient, size) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // 解析 backgroundSize (例如: '60px 100%')
    const [width, height] = size.split(" ");
    canvas.width = parseInt(width) || 60;
    canvas.height = parseInt(height) || 60; // 固定高度或根据需要调整

    // 创建渐变
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0.24, "rgba(0,0,0,0)");
    grad.addColorStop(0.25, "rgba(255,255,255,0.7)");
    grad.addColorStop(0.26, "rgba(0,0,0,0)");
    grad.addColorStop(0.74, "rgba(0,0,0,0)");
    grad.addColorStop(0.75, "rgba(255,255,255,0.7)");
    grad.addColorStop(0.76, "rgba(0,0,0,0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  }

  // 定义额外的区域
  const addWhiteRegions = [];
  regions.forEach((item) => {
    if (
      item.name == "情绪熔断区" ||
      item.name == "情绪临界区" ||
      item.name == "情绪冰点区"
    ) {
      addWhiteRegions.push({
        name: item.name,
        min: item.min,
        max: item.max,
        backgroundSize: "10px 10px ",
      });
    }
  });

  // 动态生成图例数据
  const legendData = [];
  const legendSelected = {};

  // 检查是否存在TOP数据
  const hasTopData = qxnlzhqData.topxh && qxnlzhqData.topxh.length > 0;
  if (hasTopData) {
    legendData.push({
      name: "TOP",
      textStyle: {
        color: "#000000",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        textBorderColor: "#FFFFFF",
        textBorderWidth: 2,
        fontWeight: "bold",
      },
    });
    legendSelected.TOP = true;
  }

  // 检查是否存在LOW数据
  const hasLowData = qxnlzhqData.lowxh && qxnlzhqData.lowxh.length > 0;
  if (hasLowData) {
    legendData.push({
      name: "LOW",
      textStyle: {
        color: "#001EFF",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        textBorderColor: "#FFFFFF",
        textBorderWidth: 2,
        fontWeight: "bold",
      },
    });
    legendSelected.LOW = true;
  }

  // 检查是否存在起数据
  const hasQixhData = qxnlzhqData.qixh && qxnlzhqData.qixh.length > 0;
  if (hasQixhData) {
    legendData.push({
      name: "起",
      textStyle: {
        color: "#249409",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        textBorderColor: "#FFFFFF",
        textBorderWidth: 2,
        fontWeight: "bold",
      },
    });
    legendSelected.起 = true;
  }

  // 初始化图表
  qxnlzhqEchartsInstance = echarts.init(qxnlzhqEchartsRef.value);
  let option;
  // 设置图表配置
  option = {
    legend: {
      data: legendData,
      selected: legendSelected,
      top: window.innerWidth > 768 ? "0%" : "1%",
      textStyle: {
        fontSize: window.matchMedia("(max-width: 767px)").matches ? 9 : 12,
      },
    },
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        lineStyle: {
          color: "grey",
          width: 1,
          type: "dashed",
        },
        label: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "#fff",
          borderColor: "#fff",
          borderWidth: 1,
        },
      },
      backgroundColor: "rgba(232, 232, 242, 0.87)",
      borderColor: "#fff",
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      position: function (point, params, dom, rect, size) {
        // 检测是否为手机端
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const tooltipWidth = size.contentSize[0];
        const tooltipHeight = size.contentSize[1];
        const chartWidth = size.viewSize[0];
        const chartHeight = size.viewSize[1];

        let x = point[0];
        let y = point[1];

        if (isMobile) {
          // 手机端：确保tooltip完全在图表内显示
          // 水平位置调整
          if (x + tooltipWidth > chartWidth - 10) {
            x = chartWidth - tooltipWidth - 10;
          }
          if (x < 10) {
            x = 10;
          }

          // 垂直位置调整：确保不被遮挡，优先显示在下方
          if (y - tooltipHeight - 20 < 0) {
            // 如果上方空间不足，显示在下方
            y = y + 20;
            if (y + tooltipHeight > chartHeight - 60) {
              // 如果下方也不够，显示在中间偏上位置
              y = Math.max(20, chartHeight - tooltipHeight - 60);
            }
          } else {
            // 上方有足够空间，显示在上方
            y = y - tooltipHeight - 20;
          }
        } else {
          // 桌面端：保持原有逻辑
          if (x + tooltipWidth > chartWidth - 20) {
            x = x - tooltipWidth - 20;
          } else {
            x = x + 20;
          }

          if (y - tooltipHeight < 20) {
            y = y + 20;
          } else {
            y = y - tooltipHeight - 20;
          }
        }

        return [x, y];
      },
      formatter: function (params) {
        if (!params || params.length === 0) return "";

        let result = `<div style="font-weight: bold; color: black; margin-bottom: 8px;">${params[0].name}</div>`;

        params.forEach((param, index) => {
          // console.log('参数索引:', index, '系列:', param)
          let value = param.value;
          let color = param.color;

          if (param.seriesType === "candlestick") {
            const openN = "开盘价";
            const closeN = "收盘价";
            const lowN = "最低价";
            const highN = "最高价";
            const zhangdie = "涨跌";

            let openPrice = value[1]; // 开盘价
            let closePrice = value[2]; // 收盘价
            let lowPrice = value[3]; // 最低价
            let highPrice = value[4]; // 最高价

            // 检查数据有效性
            if (
              typeof openPrice !== "number" ||
              typeof closePrice !== "number" ||
              typeof lowPrice !== "number" ||
              typeof highPrice !== "number"
            ) {
              return "";
            }

            let priceChange;
            let changePercent;
            if (param.data[0] != 0) {
              // console.log(
              // 	'preDayDate',
              // 	kline[param.data[0] - 1][0],
              // 	'preDayClosePrice',
              // 	kline[param.data[0] - 1][2]
              // )
              // console.log('paramDate', param.name, 'paramClosePrice', closePrice)

              let preClosePrice = kline[param.data[0] - 1][2]; //昨日收盘价;
              priceChange = closePrice - preClosePrice;
              changePercent = ((priceChange / preClosePrice) * 100).toFixed(2);
            }
            let changeColor = priceChange >= 0 ? "#32B520" : "#D8001B";
            result += `<div style="margin-bottom: 6px;">`;
            // result += `<div style="color: #fff; font-weight: bold;">${param.seriesName}</div>`
            result += `<div style="color: black;">${openN}: ${openPrice.toFixed(
              2
            )}</div>`;
            result += `<div style="color: black;">${closeN}: ${closePrice.toFixed(
              2
            )}</div>`;
            result += `<div style="color: black;">${lowN}: ${lowPrice.toFixed(
              2
            )}</div>`;
            result += `<div style="color: black;">${highN}: ${highPrice.toFixed(
              2
            )}</div>`;
            if (param.data[0] != 0) {
              result += `<div style="color: ${changeColor};">${zhangdie}: ${
                priceChange >= 0 ? "+" : ""
              }${priceChange.toFixed(2)} (${changePercent}%)</div>`;
              result += `</div>`;
            }
          } else if (
            param.seriesName === "止盈线" &&
            value !== null &&
            value !== undefined &&
            typeof value === "number"
          ) {
            result += `<div style="color: #FF0000; margin-bottom: 4px;">${
              param.seriesName
            }: ${value.toFixed(2)}</div>`;
          } else if (
            param.seriesName === "止损线" &&
            value !== null &&
            value !== undefined &&
            typeof value === "number"
          ) {
            result += `<div style="color: #001EFF; margin-bottom: 4px;">${
              param.seriesName
            }: ${value.toFixed(2)}</div>`;
          }
        });

        return result;
      },
    },
    dataZoom: [
      {
        top: window.innerWidth <= 768 ? "86%" : "",
        type: "slider",
        xAxisIndex: 0,
        start: 0,
        end: 100,
        show: true,
        bottom: 40,
        height: 20,
        borderColor: "#fff",
        fillerColor: "rgba(255, 255, 255, 0.2)",
        handleStyle: {
          color: "#fff",
          borderColor: "#A7691C",
        },
        textStyle: {
          color: "#A7691C",
          fontSize: window.innerWidth > 769 ? 12 : 9,
        },
      },
      {
        type: "inside",
        xAxisIndex: 0,
        start: 0,
        end: 100,
        zoomOnMouseWheel: true,
        moveOnMouseMove: true,
        moveOnMouseWheel: false,
      },
    ],
    xAxis: {
      type: "category",
      data: mixData.map((item) => item.date),
      axisLabel: {
        rotate: 0, // 取消倾斜角度
        color: "#A7691C",
        interval: "auto", // 自动计算显示间隔，只显示部分日期但覆盖所有范围
        fontSize: window.innerWidth > 769 ? 12 : 9,
        showMaxLabel: true,
      },
      axisLine: {
        // show: false,
        onZero: false,
        lineStyle: {
          color: "#A7691C", // x轴线颜色
        },
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      scale: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#A7691C", // x轴线颜色
          // width: 1
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        // 刻度标签
        show: true,
        color: "#A7691C",
        fontSize: window.innerWidth > 769 ? 12 : 9,
        formatter: function (value) {
          return parseFloat(value.toFixed(2)).toString();
        },
      },
      axisTick: {
        // 刻度线
        show: true,
        color: "white",
      },
      // min:
      // 	qxnlzhqData.dd < stopLossPrice * 0.98
      // 		? Math.floor(qxnlzhqData.dd)
      // 		: Math.floor(stopLossPrice * 0.98),
      // max: Math.round(
      // 	Math.max(
      // 		Math.ceil(dataMax * 1.02),
      // 		qxnlzhqData.yl > 0 ? qxnlzhqData.yl : Math.ceil(dataMax * 1.02),
      // 		stopProfitPrice * 1.02
      // 	)
      // )
      min: Math.min(qxnlzhqData.dd, stopLossPrice * 0.98),
      max: Math.max(
        dataMax * 1.02,
        stopProfitPrice * 1.02,
        qxnlzhqData.cc,
        qxnlzhqData.dd,
        qxnlzhqData.gg,
        qxnlzhqData.ht,
        qxnlzhqData.js,
        qxnlzhqData.qs,
        qxnlzhqData.tp,
        qxnlzhqData.yl,
        qxnlzhqData.zc
      ),
    },
    // 自定义区域名称和区域范围值 位置
    // graphic: generateGraphics(
    // 	qxnlzhqData.dd < stopLossPrice * 0.98
    // 		? Math.floor(qxnlzhqData.dd)
    // 		: Math.floor(stopLossPrice * 0.98),
    // 	Math.max(
    // 		Math.ceil(dataMax * 1.02),
    // 		qxnlzhqData.yl > 0 ? qxnlzhqData.yl : Math.ceil(dataMax * 1.02),
    // 		stopProfitPrice * 1.02
    // 	)
    // ),
    graphic: generateGraphics(
      Math.min(qxnlzhqData.dd, stopLossPrice * 0.98),
      Math.max(
        dataMax * 1.02,
        stopProfitPrice * 1.02,
        qxnlzhqData.cc,
        qxnlzhqData.dd,
        qxnlzhqData.gg,
        qxnlzhqData.ht,
        qxnlzhqData.js,
        qxnlzhqData.qs,
        qxnlzhqData.tp,
        qxnlzhqData.yl,
        qxnlzhqData.zc
      )
    ),
    series: [
      {
        type: "candlestick",
        data: mixData.map((item) => item.value),
        z: 3,
        clip: true,
        markPoint: {
          symbol: "circle",
          symbolSize: 10,
          data: markPointData,
          z: 5, // 确保标记显示在最上层
        },
        itemStyle: {
          // 阳线样式（收盘 > 开盘）
          // color: '#14b143',     // 开盘价 < 收盘价时为绿色
          color: "#00AAFF",
          color0: "#FF007F", // 开盘价 > 收盘价时为红色
          borderColor: "#00AAFF", // 阳线边框色（绿）
          borderColor0: "#FF007F", // 阴线边框色（红）
          // borderWidth: 1.5
        },
        // 实现 分区域背景色
        markArea: {
          silent: true,
          data: [
            ...regions.map((region) => [
              {
                x: window.innerWidth > 769 ? "30%" : "40%",
                yAxis: region.min,
                itemStyle: {
                  color: region.color,
                  // color:'#000'
                },
              },
              { x: "95%", yAxis: region.max },
            ]),
            ...addWhiteRegions.map((region) => [
              {
                x: "30%",
                yAxis: region.min,
                itemStyle: {
                  color: {
                    image: createPatternWithSize(
                      region.color,
                      region.backgroundSize
                    ),
                    repeat: "repeat",
                  },
                },
              },
              { x: "95%", yAxis: region.max },
            ]),
          ],
          markPoint: {
            symbol: "circle",
            symbolSize: 10,
            data: markPointData,
            z: 5, // 确保标记显示在最上层
          },
        },
        // 添加markLine实现顶部边框
        markLine: {
          silent: true,
          symbol: "none",
          data: [
            ...markLineRegions.map((region) => [
              {
                name: `${Number(region.max).toFixed(2)}`,
                x: window.innerWidth > 769 ? "30%" : "40%",
                yAxis: region.max, // 只在区域顶部画线
                label: {
                  // show: true,
                  position: "start",
                  color:
                    region.name == "情绪冰点区" ||
                    region.name == "多空消化区" ||
                    region.name == "认知潜伏区"
                      ? "#A7691C"
                      : "#FF007F",
                  fontSize: window.innerWidth > 769 ? 12 : 9,
                  fontWeight: "bold",
                },
                lineStyle: {
                  color: "#FFFFFF",
                  width: 2,
                  type: "dashed",
                },
              },
              {
                x: "95%",
                yAxis: region.max,
              },
            ]),
            [
              {
                name: `止盈${stopProfitPrice.toFixed(2)}`,
                x: "60%",
                yAxis: stopProfitPrice,
                label: {
                  position: "start",
                  fontSize: window.innerWidth > 769 ? 13 : 9,
                  fontWeight: "bold",
                  color: "#FF0000",
                  textBorderColor: "#FFFFFF",
                  textBorderWidth: 2,
                },
                lineStyle: {
                  color: "#FF0000",
                  width: 2,
                  type: "solid",
                },
              },
              {
                x: "95%",
                yAxis: stopProfitPrice,
              },
            ],
            [
              {
                name: `止损${stopLossPrice.toFixed(2)}`,
                x: "60%",
                yAxis: stopLossPrice,
                label: {
                  position: "start",
                  fontSize: window.innerWidth > 769 ? 13 : 9,
                  fontWeight: "bold",
                  color: "#001EFF",
                  textBorderColor: "#FFFFFF",
                  textBorderWidth: 2,
                },
                lineStyle: {
                  color: "#001EFF",
                  width: 2,
                  type: "solid",
                },
              },
              {
                x: "95%",
                yAxis: stopLossPrice,
              },
            ],
          ],
        },
      },

      {
        name: "起",
        type: "candlestick",
        data: qixhData.value.map((item) => item.value),
        itemStyle: {
          color: "#87FF6B",
          color0: "#87FF6B",
          borderColor: "#87FF6B",
          borderColor0: "#87FF6B",
        },
        gridIndex: 0,
        z: 4,
        tooltip: {
          show: false,
        },
      },
      {
        name: "TOP",
        type: "candlestick",
        data: topData.value.map((item) => item.value),
        itemStyle: {
          color: "#000",
          color0: "#000",
          borderColor: "#000",
          borderColor0: "#000",
        },
        gridIndex: 0,
        z: 4,
        tooltip: {
          show: false,
        },
      },
      {
        name: "LOW",
        type: "candlestick",
        data: lowData.value.map((item) => item.value),
        itemStyle: {
          color: "#001EFF",
          color0: "#001EFF",
          borderColor: "#001EFF",
          borderColor0: "#001EFF",
        },
        gridIndex: 0,
        z: 4,
        tooltip: {
          show: false,
        },
      },
    ],
    // 修改grid配置，添加响应式设置
    grid: {
      // 根据屏幕宽度动态调整
      left: window.innerWidth <= 768 ? "2%" : "5%", // 手机端增加左边距
      right: window.innerWidth <= 768 ? "8%" : "8%", // 手机端增加右边距
      // top: window.innerWidth <= 768 ? '2' : '10',
      top: window.innerWidth <= 768 ? "40" : "40",
      // top: '10',
      bottom: "60",
      containLabel: true, // 改为true确保标签完全显示
      width: "auto", // 改为auto让系统自动计算
      height: "auto",
      overflow: "hidden",
    },
  };
  // 应用配置
  qxnlzhqEchartsInstance.setOption(option);

  // 防抖函数，避免频繁触发resize
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // 监听窗口大小变化，调整图表尺寸
  const resizeHandler = debounce(() => {
    if (qxnlzhqEchartsInstance && !qxnlzhqEchartsInstance.isDisposed()) {
      try {
        qxnlzhqEchartsInstance.resize();
        console.log("情绪能量转化器图表已重新调整大小");
      } catch (error) {
        console.error("情绪能量转化器图表resize失败:", error);
      }
    }
  }, 100); // 100ms防抖延迟

  // 移除之前的监听器（如果存在）
  if (window.emoEnergyConverterResizeHandler) {
    window.removeEventListener(
      "resize",
      window.emoEnergyConverterResizeHandler
    );
  }

  // 添加新的监听器
  window.addEventListener("resize", resizeHandler);

  // 存储resize处理器以便后续清理
  window.emoEnergyConverterResizeHandler = resizeHandler;

  // 添加容器大小监听器
  if (qxnlzhqEchartsRef.value && window.ResizeObserver) {
    const containerObserver = new ResizeObserver(
      debounce(() => {
        if (qxnlzhqEchartsInstance && !qxnlzhqEchartsInstance.isDisposed()) {
          try {
            qxnlzhqEchartsInstance.resize();
            console.log("情绪能量转化器容器大小变化，图表已调整");
          } catch (error) {
            console.error("情绪能量转化器容器resize失败:", error);
          }
        }
      }, 100)
    );

    containerObserver.observe(qxnlzhqEchartsRef.value);
    window.emoEnergyConverterContainerObserver = containerObserver;
  }
}

watch(
  () => dataListStore.AiEmotinData,
  (newVal) => {
    fetchData();
  },
  {
    deep: true, // 深度监听内部属性变化
    immediate: true, // 立即执行一次（可选）
  }
);

onMounted(() => {
  console.log("打开echarts页");
  fetchData();
});

onBeforeUnmount(() => {
  // 组件卸载时销毁图表
  if (qxnlzhqEchartsInstance) {
    qxnlzhqEchartsInstance.dispose();
    qxnlzhqEchartsInstance = null;
  }

  // 移除窗口resize监听器
  if (window.emoEnergyConverterResizeHandler) {
    window.removeEventListener(
      "resize",
      window.emoEnergyConverterResizeHandler
    );
    window.emoEnergyConverterResizeHandler = null;
  }

  // 清理容器观察器
  if (window.emoEnergyConverterContainerObserver) {
    window.emoEnergyConverterContainerObserver.disconnect();
    window.emoEnergyConverterContainerObserver = null;
  }
});
</script>
<style scoped>
#qxnlzhqEcharts {
  /* 改为居中显示，留适当边距 */
  width: 85%;
  /* 从80%调整为90%，增加显示区域 */
  height: 650px;

  /* 调整电脑端高度为300px */
  margin: 0 auto;
  /* 居中显示，替换margin-left: 7rem */
  box-sizing: border-box;
  margin-top: 6rem;
  overflow: hidden;
  padding-top: 38px;

  /* 添加内边距 */
}

/* 平板端适配 */
@media only screen and (max-width: 1024px) and (min-width: 769px) {
  #qxnlzhqEcharts {
    width: 90%;
    height: 60vw;
    max-height: 400px;
    /* padding: 8px; */
    padding: 60px 0px 5px 0px;
  }
}

/* 手机端适配样式 */
@media only screen and (max-width: 768px) {
  #qxnlzhqEcharts {
    width: 90%;
    /* 从100%调整为98%，留小边距 */
    height: 90vw;
    /* 从80vw增加到85vw，提供更多显示空间 */
    max-height: 450px;
    /* 添加最大高度限制 */
    min-height: 80vw;
    /* 添加最小高度保证 */
    margin: 5px auto;
    /* 居中并留小边距 */
    padding: 80px 0px 10px 0px;
  }
}

/* 小屏幕进一步优化 */
@media only screen and (max-width: 480px) {
  #qxnlzhqEcharts {
    width: 90%;
    height: 120vw;
    max-height: 100%;
    padding: 80px 0px 10px 0px;
  }
}
</style>
