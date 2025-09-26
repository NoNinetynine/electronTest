<template>
  <div class="container">
    <div class="head">
      <div class="head1">
        <div class="head1Btn">
          <img class="headImg" src="../../../public/left.png" alt="" />
        </div>
        <div class="head1Btn">
          <img class="headImg" src="../../../public/right.png" alt="" />
        </div>
        <div class="head1Btn">
          <img class="headImg" src="../../../public/refresh.png" alt="" />
        </div>
        <div class="head1Btn">
          <img class="headImg" src="../../../public/home.png" alt="" />
        </div>
      </div>
      <div class="head2">
        <div class="rightGroup">
          <div class="head2Btn">产品下载</div>
        </div>
        <div class="leftGroup">
          <div class="head2Btn">消息</div>
          <div class="head2Btn">精网原创</div>
          <div class="head2Btn" v-if="dataListStore.userInfo.token">
            <el-popover :width="150">
              <template #reference>
                <div class="userInfo">
                  <img :src="dataListStore.userInfo.img" alt="头像" />
                  <span class="nickname">{{
                    dataListStore.userInfo.nickname
                  }}</span>
                </div>
              </template>
              <template #default>
                <div class="userInfoBtn myAccount">我的账户</div>
                <div class="userInfoBtn coupon">优惠券</div>
                <div class="userInfoBtn myOrder">我的订单</div>
                <div class="userInfoBtn" @click="logout">退出登录</div>
              </template>
            </el-popover>
          </div>
          <div class="head2Btn" v-else @click="login">登录</div>
          <div class="head2Btn">多语言</div>
          <div class="head2Btn">市场</div>
          <div class="head2Btn">反馈帮助中心</div>
        </div>
      </div>
      <div class="head3">
        <img
          src="https://d31zlh4on95l9h.cloudfront.net/assets/heimaxunzhang/blueHomliyLink.png"
          alt="logo"
          class="logo"
          @click="router.push('/fakeLink')"
        />
        <div class="breadCrumb">
          <div @click="router.push('/fakeLink')" class="homePage">首页</div>
          <span class="separator">/</span>
          <div @click="router.push('/dbqb')" class="dbqb">夺宝奇兵</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="bodyContent">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { fakeLinkDataListStore } from "../../store/fakeLink-dataList.js";
const dataListStore = fakeLinkDataListStore();
import { useRouter } from "vue-router";
const router = useRouter();
const login = () => {
  router.push("/fakeLinkLogin");
};

const logout = () => {
  router.push("/fakeLinkLogin");
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.head {
  width: 100%;
  position: fixed;
  top: 0px;
}

.head1 {
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  align-items: center;
  color: white;
}

.head2 {
  width: 100%;
  height: 45px;
  background-color: #222222;
  display: flex;
  align-items: center;
  color: white;
}

.head3 {
  padding: 0 60px;
  width: 100%;
  height: 60px;
  color: #808080;
  display: flex;
  align-items: center;
}

.logo {
  width: 142px;
  height: 24px;
  margin-right: 100px;
  cursor: pointer;
}

.breadCrumb {
  display: flex;
}

.homePage {
  cursor: pointer;
}

.separator {
  margin: 0 5px;
}

.dbqb {
  cursor: pointer;
}

.body {
  padding: 145px 0 0 0;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}

.bodyContent {
  background-image: url("https://d31zlh4on95l9h.cloudfront.net/images/fba08457e53a11186eee9dacab51e344.png");
  background-size: 100% 100%;
  height: 100%;
  overflow: auto;
}

.headImg {
  height: 30px;
  width: 30px;
}

.head1Btn {
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head1Btn:hover {
  background-color: #d3d3d3;
}

.head2Btn {
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.head2Btn:hover {
  background-color: #333333;
}

.rightGroup {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.leftGroup {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.userInfo {
  display: flex;
  justify-content: center;
}

.nickname {
  display: flex;
  justify-content: center;
  align-items: center;
}

.userInfoBtn {
  color: #409eff;
  font-size: 14px;
  padding: 0 20px;
  white-space: nowrap;
  overflow: hidden;
  height: 34px;
  line-height: 34px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>