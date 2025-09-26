<template>
  <div>
    <el-button type="primary" @click="goBack">返回首页</el-button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.push("/homepage");
};
</script>

<style scoped>
</style>