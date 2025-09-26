<template>
  <div class="container">
    <div class="loginContainer">
      <img
        class="backgroundImg"
        src="https://d31zlh4on95l9h.cloudfront.net/assets/registerHw.png"
        alt=""
      />
      <div class="loginWindow">
        <input type="text" class="username" v-model="userInfo.username" />
        <input type="password" class="password" v-model="userInfo.password" />
        <div class="policy">
          <el-checkbox-group v-model="agree">
            <el-checkbox value="1" />
          </el-checkbox-group>
          <span class="hasAgreed">我已阅读并同意</span>
          <span class="privacy">隐私条款</span>
        </div>
        <div class="login" @click="login">登录</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { fakeLinkDataListStore } from "../../store/fakeLink-dataList";
const fakeLinkDataStore = fakeLinkDataListStore();

const router = useRouter();
const agree = ref([]);
const userInfo = ref({
  username: "",
  password: "",
});

const login = () => {
  if (!userInfo.value.username) {
    ElMessage.error("请输入用户名");
    return;
  }
  if (!userInfo.value.password) {
    ElMessage.error("请输入密码");
    return;
  }
  if (agree.value.length !== 1) {
    ElMessage.error("请同意协议");
    return;
  }

  const res = fakeLinkDataStore.getUserInfo(
    userInfo.value.username,
    userInfo.value.password
  );
  if (res == 200) {
    ElMessage.success("登录成功");
    router.push("fakeLink");
  } else {
    ElMessage.error("用户名或密码不正确");
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-image: url("https://cdn.legu168.com/jtzy/Product/pcjingwang/images/login_bg_7584f6a.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  /* padding-top: 100px; */
}

.loginContainer {
  position: relative;
  display: flex;
  /* width: 100%; */
  /* height: 50%; */
  justify-content: center;
  padding-top: 30px;
}

.backgroundImg {
  width: 630px;
  height: auto;
  position: absolute;
}

.loginWindow {
  margin-top: 230px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 28px 50px;
  width: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.username {
  width: 300px;
  height: 38px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  outline: none;
}

.username:focus {
  border: 1px solid #409eff; /* 聚焦时的边框颜色 */
}

.password {
  width: 300px;
  height: 38px;
  margin-bottom: 10px;
  box-sizing: border-box;
  font-size: 16px;
  padding-left: 10px;
  border: 1px solid rgb(221, 221, 221);
  outline: none;
}

.password:focus {
  border: 1px solid #409eff; /* 聚焦时的边框颜色 */
}

.policy {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.hasAgreed {
  margin-right: 5px;
}

.privacy {
  color: rgb(64, 101, 153);
  cursor: pointer;
}

.privacy:hover {
  color: red;
}

.login {
  width: 100%;
  height: 38px;
  color: white;
  background-color: rgb(248, 89, 89);
  font-size: 18px;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>