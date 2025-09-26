<script setup>
import { ref, onMounted } from "vue";
import backBtn from "../commponent/backBtn.vue";

const showPopup = ref(false);
const popupMessage = ref("");
const totalScore = ref(4000); // 初始分数
const myLucky = ref();
// 新增状态
const spinCount = ref(0);
const isSpinning = ref(false);
// 新增变量记录基础分数
//const baseScore = 4000
const wheelConfig = ref({});
const prizes = ref([
  {
    fonts: [
      { text: "-199", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#FAF9F0",
  }, //0
  {
    fonts: [
      { text: "-55", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#F5D7AD",
  }, //1
  {
    fonts: [
      { text: "+200", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#FAF9F0",
  }, //2
  {
    fonts: [
      { text: "-88", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#F5D7AD",
  }, //3
  {
    fonts: [
      { text: "-11", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#FAF9F0",
  }, //4
  {
    fonts: [
      { text: "-299", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#F5D7AD",
  }, //5
  {
    fonts: [
      { text: "+200", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#FAF9F0",
  }, //6
  {
    fonts: [
      { text: "-66", top: "10%", fontColor: "#FF2C29", fontSize: "40px" },
    ],
    background: "#F5D7AD",
  }, //7
]);
const blocks = ref([{ padding: "13px", background: "	#FF2A00" }]);
const buttons = ref([
  { radius: "50%", background: "#617df2" },
  { radius: "45%", background: "#afc8ff" },
  {
    radius: "40%",
    background: "#869cfa",
    pointer: true,
    fonts: [{ text: "开始\n抽奖", top: "-20px" }],
  },
]);

//自定义数组
const customOrder = ref([0, 4, 3, 1, 2, 4, 5, 7, 3, 4, 0]);
let orderIndex = 0;

function startCallback() {
  // 检查转动条件和次数
  if (spinCount.value >= 11) {
    // 从0开始计数，11表示第12次
    alert("已达最大转动次数！");
    return;
  }

  isSpinning.value = true;
  spinCount.value++;
  // 重置为初始分数
  //totalScore.value = baseScore
  // 调用抽奖组件的play方法开始游戏
  myLucky.value.play();
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    //
    console.log(orderIndex, "orderIndex");

    const index = orderIndex;

    console.log(customOrder.value[index], "custome");
    // 调用stop停止旋转并传递中奖索引
    myLucky.value.stop(customOrder.value[index]);
    //更新指针(循环)
    orderIndex = (index + 1) % customOrder.value.length;
  }, 3000);
}
const scoreAnimation = ref(false);

// 抽奖结束end回调
function endCallback(prize) {
  const result = Number(prize.fonts[0].text);
  console.log(prize.fonts[0].text);
  // 更新总分
  setTimeout(() => {
    totalScore.value = totalScore.value + result;
  }, 1000);

  // 触发动画
  animateScoreChange();
  // 先清空文字
  popupMessage.value = "";
  showPopup.value = true;
  // 设置弹窗内容
  setTimeout(() => {
    popupMessage.value = `${result}金币`;
  }, 1000); //  <---  正确的用法

  showPopup.value = true;
  // 3秒后隐藏弹窗
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
}
// 添加分数变化动画方法
const animateScoreChange = () => {
  scoreAnimation.value = true;
  setTimeout(() => {
    scoreAnimation.value = false;
  }, 3000);
};

onMounted(() => {
  console.log(import.meta.env.MODE, "1111");
  console.log(process.env.NODE_ENV, "2222");
});
</script>

<template>
  <backBtn></backBtn>

  <div style="display: flex; height: 100%; width: 100%">
    <el-card class="manageCard"> 管理台 </el-card>
    <el-card class="wheelCard">
      <div class="luckyWheel">
        <LuckyWheel
          class="lucky"
          ref="myLucky"
          width="434px"
          height="434px"
          :default-config="wheelConfig"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback"
        />
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.el-card {
  margin: 20px;
}

.manageCard {
  width: auto;
  flex: 1;
}
</style>