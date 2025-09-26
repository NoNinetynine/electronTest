<template>
  <div class="energyconverter">
    <div>
      <smallTitle titleKey="情绪能量转化器" />
    </div>
    <!-- k线图部分 -->
    <div class="pricePrediction">
      <section class="price-Prediction">
        <div class="CanvsbackgroundImg">
          <div class="trapezoid" ref="stockNameContainer">
            <el-scrollbar v-if="isTextOverflow" class="stock-scrollbar">
              <div class="stock-marquee" :data-text="StockInformation.Name">
                <span
                  class="stock-name stock-name1"
                  style="white-space: nowrap; cursor: pointer"
                  >{{ StockInformation.Name }} {{ StockInformation.Code }}</span
                >
              </div>
            </el-scrollbar>
            <span
              v-else
              class="stock-name stock-name1"
              style="white-space: nowrap; cursor: pointer"
              >{{ StockInformation.Name }} {{ StockInformation.Code }}</span
            >
          </div>
          <!-- k线图部分图纸 -->
          <EnergyKlineEcharts class="k"></EnergyKlineEcharts>
        </div>
      </section>
    </div>
    <div class="smtcTitle">
      <smallTitle titleKey="功能介绍" />
    </div>
    <div class="emotionDecoder" style="color: white">
      <div class="functionIntroduce" :class="currentLang">
        <ol>
          <li>
            <span class="area1" style="color: #ff9f9f">情绪冰点区</span
            ><span class="area1text"
              >：市场极度悲观绝望后的末端。恐慌弥漫，投资者信心崩溃，普遍绝望，对利好麻木，对利空极度敏感，“割肉”离场意愿强烈。</span
            >
          </li>
          <li>
            <span class="area2" style="color: #ffcb75">认知潜伏区</span
            ><span class="area2text"
              >：聪明资金建仓期，此时股票会呈现抗跌性但缺乏上涨动力。市场情绪低迷、悲观、缺乏信心，负面解读占主导，潜在利好逻辑被忽视或质疑。</span
            >
          </li>
          <li>
            <span class="area3" style="color: #d7e95d">多空消化区</span
            ><span class="area3text"
              >：市场从单边下跌转向震荡企稳，多空力量从失衡转向初步平衡。恐慌情绪缓解，但信心依然脆弱，多空分歧加大，观望气氛浓厚。对利好利空反应不一。</span
            >
          </li>
          <li>
            <span class="area4" style="color: #a0f56f">共识加速区</span
            ><span class="area4text"
              >：市场或个股形成上涨共识，进入主升浪。乐观情绪快速升温并扩散，信心高涨，看多成为主流，投资者追涨意愿强烈，对利空选择性忽视或解读为利好。</span
            >
          </li>
          <li>
            <span class="area5" style="color: #87f3cd">情绪临界区</span
            ><span class="area5text"
              >：市场情绪达到极度亢奋、非理性的顶峰，上涨动能接近衰竭的临界点。狂热、贪婪情绪主导，估值体系失效，风险意识被抛诸脑后。</span
            >
          </li>
          <li>
            <span class="area6" style="color: #51c3f9">杠杆失衡区</span
            ><span class="area6text"
              >：市场系统脆弱性急剧上升，价格波动被显著放大。情绪高度敏感且脆弱，波动剧烈引发恐慌。参与者普遍焦虑，对下跌的耐受度极低。</span
            >
          </li>
          <li>
            <span class="area7" style="color: #d0a7ff">情绪熔断区</span
            ><span class="area7text"
              >：市场在极端负面情绪和恐慌抛售下，触发交易机制熔断或出现类似熔断效应的流动性瞬间枯竭状态。极度恐慌、绝望、非理性，信心彻底崩溃。</span
            >
          </li>
        </ol>
      </div>
    </div>

    <div class="smtcTitle">
      <smallTitle titleKey="功能亮点" />
    </div>
    <div class="emotionDecoder" style="color: white">
      <div class="functionlight">
        <span
          class="lighttitle"
          :style="{
            color: '#f8e71c',
            whiteSpace: isChineseLanguage ? 'nowrap' : 'normal',
          }"
          >实现“财富裂变”的“情绪炼金炉”！</span
        >
        <br />

        <span class="content">
          股市中蕴藏着巨大的情绪能量，恐惧与贪婪的碰撞产生市场波动势能，股市本质是亿万股民的情绪熔炉。情绪能量转化器，首次运用行为金融物理模型，将多空情绪的对冲转化为可定向输出的交易动能，通过“情绪炼金炉”将这种交易动能划分为七种反应堆，让每一场情绪风暴都成为你财富裂变的催化剂！
        </span>
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import { ElMessage } from "element-plus";
import EnergyKlineEcharts from "./echarts/EnergyKlineEcharts.vue";
import { fakeLinkDataListStore } from "../../../store/fakeLink-dataList";
const dataListStore = fakeLinkDataListStore();
import smallTitle from "../component/smallTitle.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const StockInformation = ref({});
const apiLoaded = ref(false);
// 监听窗口大小变化
onMounted(async () => {
  await Promise.all([
    dataListStore.fetchChartData(),
    dataListStore.getAiEmotinData(),
  ]);

  StockInformation.value = dataListStore.AiEmotinData.StockInformation;
});
</script>

<style scoped lang="less">
.energyconverter {
  border: 1px solid rgba(28, 99, 206, 0.8);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-height: 100%;
  //   height: 100%;
  width: 69%;
  margin: 0vw auto;
  margin-top: 20px;
}
/* 标题样式 */
.title {
  color: white;
  text-align: center;
  margin-top: 1vw;
  margin-bottom: 2vw;
  font-size: 2vw;
}

/* 功能介绍样式 */
.functionIntroduce {
  width: 100%;

  font-size: 1.6vw;

  position: relative;
  line-height: 1.8;
  margin-bottom: 0.8rem;

  ol {
    padding-left: 2.5rem;
    margin: 0;
    counter-reset: item;

    @media (max-width: 768px) {
      padding-left: 1.5rem;
    }
  }

  li {
    @media (min-width: 769px) and (max-width: 1024px) {
      padding: 0.8rem 1rem;
      font-size: 1.5rem !important;
    }
    @media (max-width: 768px) {
      padding: 0.3rem 0.8rem;
    }
  }

  .area {
    display: inline-block;
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    font-weight: bold;
    margin-right: 0.8rem;
    position: relative;
    z-index: 12;
    letter-spacing: 0.5px;

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: 6rem !important;
    }

    @media (max-width: 768px) {
      font-size: clamp(1rem, 3.5vw, 1.2rem);
      display: block;
    }
  }

  .text {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);

    color: rgba(255, 255, 255, 0.95);
    position: relative;
    z-index: 12;
    letter-spacing: 0.5px;

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: clamp(1.2rem, 2.8vw, 1.4rem);
      line-height: 1.6;
    }

    @media (max-width: 768px) {
      font-size: clamp(0.9rem, 3vw, 1.1rem);
      display: block;
      line-height: 1.4;
    }
  }

  br {
    margin-top: 0.8rem;
    display: block;
    content: "";
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1.5rem 1.2rem;
  }
}

.functionlight {
  width: 100%;
  padding: 2rem;
  position: relative;

  .lighttitle {
    display: block;
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    margin-top: -0.5rem;
    line-height: 1.5;
    letter-spacing: 0.8px;
    text-align: center;
    width: 100%;
    font-weight: bold;

    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: clamp(1.5rem, 3.2vw, 1.9rem);
      margin-bottom: 0.5rem;
      letter-spacing: 0.6px;
    }
    @media (max-width: 768px) {
      font-size: clamp(1rem, 3.5vw, 1.3rem);
      margin-bottom: 0.8rem;
      letter-spacing: 0.5px;
      padding: 0rem !important;
      word-break: break-word;
    }
  }

  .content {
    display: block;
    font-size: 1.6vw;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 0.8rem;
    text-indent: 2em;
    @media (min-width: 769px) and (max-width: 1024px) {
      font-size: clamp(1.2rem, 2.8vw, 1.4rem);
      line-height: 1.5;
      padding: 0.8rem 0.5rem;
      text-align: justify;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.3rem 0.5rem;
      text-align: justify;
    }
  }

  br {
    margin-top: 0.8rem;
    display: block;
    content: "";
  }

  /* 响应式调整 - 平板设备 */
  @media (min-width: 769px) and (max-width: 1024px) {
    padding: 1.5rem 1.2rem;
  }

  /* 响应式调整 - 手机设备 */
  @media (max-width: 768px) {
    padding: 1.2rem 0.8rem;
  }
}

/* k线图部分 样式*/
.pricePrediction {
  color: white;

  .price-Prediction {
    position: relative;

    /* 标题 */
    .trapezoid {
      position: absolute;
      top: 9%;
      left: 7%;
      color: #a7691c;
      font-weight: bold;
      font-size: 2vw;
      z-index: 999;
    }

    /* 滚动条样式 */
    .stock-scrollbar {
      width: 70%;
      height: auto;
    }

    .stock-marquee {
      display: inline-block;
      white-space: nowrap;
      animation: marquee 10s linear infinite;
      position: relative;
    }

    .stock-marquee::after {
      content: "　　" attr(data-text); /* 使用全角空格让中间空出来 */
      position: absolute;
      left: 100%;
      white-space: nowrap;
      color: #a7691c;
    }

    @keyframes marquee {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-120%);
      }
    }

    .scrollbar-flex-content {
      display: flex;
      width: 130px;
    }

    .stock-name {
      /* margin-top: 5px; */
      /* display: flex; */
      width: 100%;
      cursor: pointer;
      white-space: nowrap;
      text-align: center;
      /* align-items: center; */
      /* justify-content: center; */
    }

    /* 背景 */
    .CanvsbackgroundImg {
      background-image: url("https://d31zlh4on95l9h.cloudfront.net/images/892dc6e2755ecc9cf6fb41561c287acf.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 44vw;
      max-width: 95%; // 添加这行，限制最大宽度
      padding: 20px 0px; // 减少左右内边距，从 10px 改为 5px
      box-sizing: border-box; // 改为 border-box 以包含内边距
      position: relative;
      margin: 3vw auto 5vw auto; // 添加 auto 实现水平居中
      // margin-left: 30px; // 删除固定左边距
      // margin-right: 30px; // 删除固定右边距
    }
  }
}

.smtcTitle {
  margin-top: -1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 5;

  /* 响应式调整 */
  @media (max-width: 768px) {
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
  }
}

/* 情绪解码器解释样式 - 响应式优化 */
.emotionDecoder {
  /* 透明背景，方形边框样式 */
  background-image: url("https://d31zlh4on95l9h.cloudfront.net/images/03e7df3bde2e80f71718b25fee3d4b98.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: auto;
  position: relative;
  display: flex;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  /* 确保左右边距完全相等 */
  width: 92%;
  max-width: 1200px;
  margin: clamp(1.5rem, 4vw, 3rem) auto;
  /* 使用 auto 确保左右边距相等 */
  letter-spacing: 0.5px;
  // min-height: 220px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;

  /* 响应式调整 */
  @media (max-width: 768px) {
    padding: clamp(1rem, 2vw, 1.5rem);
    width: 95%;
    min-height: 180px;
    margin: clamp(1rem, 2vw, 1.5rem) auto;
  }

  .box {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    gap: clamp(1.5rem, 3vw, 2.5rem);
    position: relative;
    z-index: 5;

    /* 响应式调整 */
    @media (max-width: 768px) {
      flex-direction: column;
      gap: clamp(1rem, 2vw, 1.5rem);
    }
  }

  // .message1,
  // .message2 {
  // 	color: white;
  // 	padding: clamp(0.75rem, 1.5vw, 1.5rem);
  // 	position: relative;
  // 	flex: 1;
  // 	border-radius: 4px;
  // 	background: rgba(255, 255, 255, 0.05);
  // 	backdrop-filter: blur(10px);

  // }

  .message1-en {
    margin-left: 10px !important;
  }

  .title1-en,
  .title2-en {
    font-size: clamp(0.875rem, 1.2vw, 1.125rem);
    color: #f8e71c;
    font-weight: 600;
    margin-bottom: clamp(0.5rem, 1vw, 1rem);
    letter-spacing: 0.3px;
  }

  .message2-en {
    color: white;
    padding: clamp(0.75rem, 1.5vw, 1.5rem);
    font-size: clamp(0.75rem, 1vw, 0.95rem);
    line-height: 1.6;
  }

  .cycle-stage-table {
    margin-top: clamp(1rem, 2vw, 2rem);
    width: 100%;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(74, 144, 226, 0.3);

      th,
      td {
        padding: clamp(0.75rem, 1.5vw, 1rem);
        text-align: center;
        border: 1px solid rgba(74, 144, 226, 0.2);
        color: white;
        font-size: clamp(0.8rem, 1vw, 1rem);
        line-height: 1.4;
      }

      th {
        background: rgba(74, 144, 226, 0.3);
        color: white;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      tbody tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }

      tbody tr:hover {
        background: rgba(74, 144, 226, 0.1);
        transition: background 0.3s ease;
      }

      td:first-child {
        font-weight: 600;
        color: white;
      }
    }
  }

  /* 温度区间表格样式 */
  .temperature-table {
    margin-top: clamp(1rem, 2vw, 2rem);
    width: 100%;
    overflow-x: auto;

    table {
      width: 100%;
      border-collapse: collapse;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid rgba(74, 144, 226, 0.3);

      th,
      td {
        padding: clamp(0.75rem, 1.5vw, 1rem);
        text-align: center;
        border: 1px solid rgba(74, 144, 226, 0.2);
        color: white;
        font-size: clamp(0.8rem, 1vw, 1rem);
        line-height: 1.4;
      }

      th {
        background: rgba(74, 144, 226, 0.3);
        color: white;
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      tbody tr:nth-child(even) {
        background: rgba(255, 255, 255, 0.02);
      }

      tbody tr:hover {
        background: rgba(74, 144, 226, 0.1);
        transition: background 0.3s ease;
      }

      td:first-child {
        font-weight: 600;
        color: white;
      }
    }
  }
}

/* 在当前组件的style标签中添加以下代码 */
:deep(.echarts-container) {
  background-color: #ffffff !important; // 修改为你想要的背景颜色
}

/* pc端 */
/* 媒体查询（与原页面保持一致） */
@media (min-width: 768px) {
}

@media (min-width: 768px) and (max-width: 1024px) {
}

/* 大屏幕设备响应式 - message1和message2竖着排 */
@media (min-width: 1025px) {
  .emotionDecoder {
    .box {
      flex-direction: column;
      gap: clamp(1rem, 2vw, 2rem);
    }
  }
}

/* 平板设备响应式 */
@media (max-width: 1024px) {
  .emotionDecoder {
    // margin: clamp(0.75rem, 2vw, 1.5rem);
    // padding: clamp(0.75rem, 1.5vw, 1.5rem);

    .box {
      flex-direction: column;
      gap: clamp(0.75rem, 1.5vw, 1.25rem);
    }
  }
}

/* 移动设备响应式 */
@media (max-width: 768px) {
  .functionIntroduce {
    font-size: 0.9rem !important;
    padding: 0 !important;
    padding-left: 0rem !important;

    /* 非中文语言在移动设备上的上下边距 */
    &.en,
    &.th,
    &.kr {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;

      /* 确保英文版本与中文版本字体大小一致 */
      .area1,
      .area2,
      .area3,
      .area4,
      .area5,
      .area6,
      .area7 {
        font-size: clamp(1rem, 3.5vw, 1.2rem) !important;
      }

      .area1text,
      .area2text,
      .area3text,
      .area4text,
      .area5text,
      .area6text,
      .area7text {
        font-size: clamp(0.9rem, 3vw, 1.1rem) !important;
      }
    }
  }
  .pricePrediction .price-Prediction {
    margin-bottom: 2rem;

    .trapezoid {
      font-size: 25px !important;
      text-align: center;
      top: 4.5%;

      .scrollbar-flex-content {
        display: flex;
        width: 260px;
      }
    }

    .CanvsbackgroundImg {
      background-image: url(https://d31zlh4on95l9h.cloudfront.net/images/a3db9928e5e0b50e781ada5d4fa8dc43.png);
      // padding: 40vw 5vw;
      margin-top: 5vw !important;
      background-size: 100% 100%;
      width: 100%;
      max-width: 95%;
      height: 120vw;
    }
  }

  .emotionDecoder {
    margin-bottom: 2rem;

    .box {
      flex-direction: column;
      gap: 1rem;
    }

    .message1-en {
      margin-left: 20px !important;
    }

    .title1-en,
    .title2-en {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    .message2-en {
      font-size: 0.875rem;
      padding: 0.75rem;
      margin: 0.5rem 0;
    }
  }

  .title {
    font-size: 4vw !important;
  }

  .title1 {
    font-size: 2.8vw !important;
  }

  .title1-en {
    font-size: 2.8vw !important; /* 统一与中文版本相同的字体大小 */
    top: -20px !important;
  }

  .message2 {
    font-size: 3vw !important;
  }

  .message2-en {
    font-size: 3vw !important;
    margin: 35px 0px 20px 0px !important;
  }

  /* 获取报告图按钮样式 */
  // .getReport {
  // 	height: 25vw;
  // 	bottom: -5vw;
  // }

  .title2 {
    font-size: 2.8vw !important;
    // margin-top: -4%;
  }

  .title2-en {
    font-size: 2.8vw !important; /* 统一与中文版本相同的字体大小 */
    // margin-top: -4%;
  }
}

/* 小屏幕设备响应式 */
@media (max-width: 480px) {
  .pricePrediction {
    .price-Prediction {
      .trapezoid {
        font-size: 25px !important;
        text-align: center;
      }
    }
  }

  .emotionDecoder {
    .message1,
    .message2 {
      padding: 0.5rem;
    }

    .message2-en {
      font-size: 0.8rem;
    }

    .cycle-stage-table {
      margin: 0.5rem 0;

      table {
        th,
        td {
          padding: 0.5rem 0.25rem;
          font-size: 0.75rem;
          line-height: 1.3;
        }

        th {
          font-size: 0.8rem;
        }
      }
    }

    /* 移动端表格样式 */
    .temperature-table {
      margin: 0.5rem 0;

      table {
        th,
        td {
          padding: 0.5rem 0.25rem;
          font-size: 0.75rem;
          line-height: 1.3;
        }

        th {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
