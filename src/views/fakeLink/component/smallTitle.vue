<template>
  <header class="title">
    <div class="title-text" :style="fontSize">
      <img
        v-if="props.colorBgc"
        :src="titleLeft"
        alt=""
        class="title-text-img"
      />
      <div v-if="props.colorBgc">{{ props.titleKey }}</div>
      <img
        v-if="props.colorBgc"
        :src="titleRight"
        alt=""
        class="title-text-img"
      />
      <img v-if="!props.colorBgc" :src="left" alt="" class="title-text-img" />
      <div v-if="!props.colorBgc">{{ props.titleKey }}</div>
      <img v-if="!props.colorBgc" :src="right" alt="" class="title-text-img" />
    </div>
    <div class="title-line">
      <img :src="bigLine" class="title-line-img" />
    </div>
  </header>
</template>

<script setup>
import { defineProps, computed } from "vue";

import right from "../../../assets/img/smallTitle/右.png";
import left from "../../../assets/img/smallTitle/左.png";
import titleRight from "../../../assets/img/smallTitle/title-jn-right.png";
import titleLeft from "../../../assets/img/smallTitle/title-jn-left.png";
import bigLine from "../../../assets/img/smallTitle/BigLine.png";

// 定义 props 接收传入的标题
const props = defineProps({
  titleKey: {
    type: String,
    required: true,
  },
  colorBgc: {
    type: String,
    required: true,
  },
});
// 定义 fontSize 的类型，并确保 computed 返回正确的类型
const fontSize = computed(() => {
  // 简体或者繁体
  if (window.innerWidth < 768) {
    return { fontSize: "3.5vw" };
  } else {
    return { fontSize: "1.5vw" };
  }
});
</script>

<style scoped lang="less">
.title {
  position: relative;
  .title-text {
    font-size: 3vw;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    color: white;
    .title-text-img {
      width: 10%;
    }
  }
  .title-line {
    text-align: center;
    position: absolute;
    bottom: -1vw;
    left: 50%; /* 将左边距设置为 50% */
    transform: translateX(-50%); /* 使用 transform 来将元素水平居中 */
    width: 85%;
    .title-line-img {
      width: 100%;
      height: auto;
    }
  }
}
@media (min-width: 768px) {
  .title-text-img {
    width: 6% !important;
  }
}
</style>

