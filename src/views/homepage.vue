<template>
  <h1 style="width: 100%; text-align: center; margin: 20px 0px 10px 0px">
    练习首页
  </h1>
  <div class="version-info">版本: {{ appVersion }}</div>
  <el-divider>
    <el-icon><star-filled /></el-icon>
  </el-divider>
  <div class="btns">
    <div
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      class="btn"
      @click="router.push(button.path)"
    >
      {{ button.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const appVersion = ref("");

const buttons = [
  { type: "primary", text: "转盘", path: "/hxl_dzp1" },
  { type: "success", text: "动画", path: "/animation" },
  { type: "success", text: "作业", path: "/homework" },
  { type: "success", text: "日历", path: "/calendar" },
  { type: "success", text: "3D1", path: "/3D1" },
  { type: "success", text: "HomilyLink", path: "/fakeLink" },
  { type: "success", text: "aiGod", path: "/aiGod" },
];

// 获取应用版本
const getAppVersion = async () => {
  try {
    // 如果在 Electron 环境中
    if (window.require) {
      const { ipcRenderer } = window.require("electron");
      // 可以通过 IPC 从主进程获取版本
      appVersion.value = await ipcRenderer.invoke("get-app-version");
    } else {
      // 在开发环境中，可以直接从 package.json 获取
      const response = await fetch("/package.json");
      const packageInfo = await response.json();
      appVersion.value = packageInfo.version;
    }
  } catch (error) {
    // 如果获取失败，使用默认版本
    appVersion.value = "1.0.0";
  }
};

onMounted(() => {
  getAppVersion();
});
</script>

<style scoped>
.version-info {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.btns {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.btn {
  width: 100%;
  height: auto;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
</style>
<style></style>