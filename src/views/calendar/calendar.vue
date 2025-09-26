<template>
  <backBtn></backBtn>

  <div class="bk">
    <div class="bk1">
      <div class="border1">
        <div class="title">
          <img :src="biaoti" alt="标题" class="titleImg" />
          <div class="titleContent">
            {{ calendarDate }}
          </div>
        </div>
        <div class="secondTitle">
          <div v-for="item in week" :key="item" class="secondTitleItems">
            <div class="secondTitleItem">{{ item }}</div>
          </div>
        </div>
        <div class="calendar">
          <div v-for="row in 5" :key="row" class="calendarCol">
            <div
              v-for="item in currentData.slice((row - 1) * 7, row * 7)"
              :key="item"
              class="calendarRow"
            >
              <div
                class="calendarItem"
                :style="{ backgroundColor: item.color }"
              >
                <div v-if="item.month" class="month">
                  <div class="monthContent">
                    {{ months[item.month - 1] }}
                  </div>
                </div>
                <div class="calendarItemTitle">{{ item.day }}</div>
                <div
                  class="calendarItemContent"
                  v-if="item.stock_temperature == ''"
                >
                  <img :src="suoding" alt="锁定" class="ciImg" />
                </div>
                <div
                  class="calendarItemContent"
                  v-else-if="item.stock_temperature == '休市'"
                >
                  休市
                </div>
                <div class="calendarItemContent" v-else>
                  {{ item.market_temperature }} | {{ item.stock_temperature }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import biaoti from "../../assets/img/标题.png";
import jiaobiao from "../../assets/img/角标.png";
import suoding from "../../assets/img/锁定.png";
import moment from "moment";
import backBtn from '../commponent/backBtn.vue'

const color = ref([
  "#32A3FF",
  "#2BD977",
  "#A239FF",
  "#FF7945",
  "#FF5289",
  "#5791CB",
]);

const months = ref([
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
]);

const calendarDate = ref(moment().format("YYYY年M月"));
const week = ref(["周一", "周二", "周三", "周四", "周五", "周六", "周日"]);
const currentData = ref([]);
const fetchData = async () => {
  try {
    const response = await axios.post(
      // 'https://api.homilychart.com/link/api/aiEmotion/client/getAiEmotionData',
      //   `${apiUrl}/api/aiEmotion/client/getAiEmotionData`,
      "http://39.101.133.168:8828/link/api/aiEmotion/client/getAiEmotionData",
      {
        token:
          "pCtw6AYK0EHAaIexoFHsbZjtsfEAIhcmwkCFm6uKko8VPfMvyDiODL9v9c0veic9fIpQbvT8zN4sH/Si6Q",
        market: "usa",
        code: "AAPL",
        language: "cn",
        version: "1",
        // token:
        // 	'oikn6FZW1BTIb4C3rRXnbZi0+fEeMx8pywnIlrmTwN4SbPUkxGnUWug7+5p9KiY7e9lWYvSoydZ+Ra/wuMA',
        // code: '1295',
        // market: 'my',
        // language: 'cn',
        // version: '2'
      }
      // {
      // 	headers: { 'Content-Type': 'application/json' }
      // }
    );

    console.log(response.data);
    if (response.data.code === 200) {
      const WDRL = response.data.data.WDRL ? response.data.data.WDRL : [];
      currentData.value = JSON.parse(JSON.stringify(WDRL));
      for (let i = 0; i < currentData.value.length; i++) {
        const day = moment(currentData.value[i].date).date();
        currentData.value[i].day = day;
        if (i == 0 || day == 1) {
          currentData.value[i].month =
            moment(currentData.value[i].date).month() + 1;
        }
        const tp = currentData.value[i].stock_temperature;
        if (tp == "" || tp == null || tp == "休市") {
          currentData.value[i].color = color.value[5];
        } else {
          if (tp <= "20") {
            currentData.value[i].color = color.value[0];
          } else if (parseInt(tp) <= "50") {
            currentData.value[i].color = color.value[1];
          } else if (parseInt(tp) <= "70") {
            currentData.value[i].color = color.value[2];
          } else if (parseInt(tp) <= "90") {
            currentData.value[i].color = color.value[3];
          } else {
            currentData.value[i].color = color.value[4];
          }
        }
      }
      console.log(currentData.value);
    } else {
      console.log("请求失败1");
    }
  } catch (error) {
    console.log(error);
    console.log("请求失败2");
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
@font-face {
  font-family: "方正新综艺简体";
  src: url("../../assets/fonts/方正新综艺简体.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.title {
  width: 100%;
}

.titleImg {
  width: 100%;
  margin-top: 10px;
  position: relative;
}

.titleContent {
  font-family: "方正新综艺简体";
  font-size: 2vw;
  color: #00ffff;
  position: absolute;
  top: 15px;
  left: 30px;
}

.secondTitle {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: center;
}

.secondTitleItems {
  /* width: 100%; */
  height: 100%;
  display: flex;
}

.secondTitleItem {
  border: 1px solid #03a7ce;
  background-color: #0b3c73;
  width: 6vw;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar {
  margin-top: 30px;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.calendarCol {
  /* width: 100%; */
  height: 100%;
  display: flex;
  justify-content: center;
}

.calendarRow {
  /* width: 100%; */
  height: 100%;
}
.calendarItem {
  border: 1px solid #0060af;
  width: 6vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  color: #ffffff;
  position: relative;
}

.month {
  position: absolute;
  background-image: url("../../assets/img/角标.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 4.5vw;
  height: 4vw;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  top: -2vw;
  right: -1vw;
}

.monthContent {
  margin-top: 0.8vw;
}

.calendarItemTitle {
  width: 100%;
  text-align: center;
  font-weight: bold;
}

.calendarItemContent {
  width: 100%;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.ciImg {
  width: 35%;
}

.bk {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.bk1 {
  background-color: #192ca0;
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}

.border1 {
  border: 2px solid #14bddb;
  background-color: #1f669e;
  width: 45vw;
  height: 44vw;
  border-radius: 1%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0px; */
}

.border1::before {
  content: "";
  position: absolute;
  top: -2.5px;
  left: -2.5px;
  width: 20px;
  height: 20px;
  border-top: 3px solid #00ffff; /* 左上角颜色 */
  border-left: 3px solid #00ffff;
  border-top-left-radius: 8px;
}

.border1::after {
  content: "";
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 20px;
  height: 20px;
  border-bottom: 3px solid #00ffff; /* 右下角颜色 */
  border-right: 3px solid #00ffff;
  border-bottom-right-radius: 8px;
}
</style>