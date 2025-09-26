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
    </div>
    <div class="body">
      <el-container>
        <el-aside width="150px">
          <img
            src="https://d31zlh4on95l9h.cloudfront.net/assets/homily-jingwangHw.png"
            alt="logo"
            class="logo"
          />
          <div
            v-for="item in leftList"
            :key="item"
            class="leftItem"
            :class="{ leftItemActive: nowLeftItem == item }"
            @click="clickLeftItem(item)"
          >
            {{ item }}
          </div>
        </el-aside>
        <el-main class="bodyMain">
          <div class="oneLine">
            <el-carousel
              height="150px"
              direction="vertical"
              :autoplay="true"
              indicator-position="outside"
            >
              <el-carousel-item v-for="item in middleList" :key="item">
                <img :src="item.img" alt="" class="carouselImg" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="twoLine">
            <div class="search">
              <input
                type="text"
                class="searchBox"
                placeholder="请输入要搜索的内容"
              />
              <div class="searchBtn">搜索</div>
            </div>
            <div class="dbqb">
              <div class="dbqbTitle">夺宝奇兵</div>
              <img
                class="dbqbUrl"
                src="https://d31zlh4on95l9h.cloudfront.net/images/4abaf213-6ced-4605-aca7-d7ff97c4d311.gif"
                alt=""
                @click="toDbqb"
              />
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { fakeLinkDataListStore } from "../../store/fakeLink-dataList.js";
const dataListStore = fakeLinkDataListStore();
import { useRouter } from "vue-router";
const router = useRouter();
const leftList = ref([
  "关注",
  "推荐",
  "频道",
  "资讯",
  "轻松一刻",
  "公司达人动态",
  "剧场",
  "任务中心",
  "静态专区",
  "视频",
  "心愿池",
  "电子书",
  "弘历软件",
  "征文",
  "Homily Chart",
  "炒股心理",
  "技术分析新得",
  "更多",
]);

const middleList = ref([
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dcoq046ryswk8p0qyj36t.jpg",
    name: "今日直播",
  },
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dco901dbcdjc7b04pl1k3.jpg",
    name: "智见未来",
  },
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dco7vaxmzf8e6v0o0yu14.jpg",
    name: "课程安排",
  },
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dcktw5n7cy7a17zrvf0cv.jpg",
    name: "财神香港",
  },
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dco8a40jtj9v6y0lba30k.png",
    name: "情绪周期",
  },
  {
    img: "https://d31zlh4on95l9h.cloudfront.net/images/5iujc501000dcncaw58dwlt5603ezwpz.jpg",
    name: "MY线下",
  },
]);

const login = () => {
  router.push("/fakeLinkLogin");
};

const logout = () => {
  router.push("/fakeLinkLogin");
};

const nowLeftItem = ref("推荐");
const clickLeftItem = (item) => {
  nowLeftItem.value = item;
  console.log(item);
};

const carouselRef = ref(null);

onMounted(async () => {
  await nextTick();
  // 获取所有指示器按钮
  const indicators = document.querySelectorAll(".el-carousel__button");

  // 为每个指示器添加对应的名称
  indicators.forEach((button, index) => {
    console.log(button);
    if (middleList.value[index]) {
      // 或者直接设置文本内容
      button.textContent = middleList.value[index].name;
    }
  });
});

const toDbqb = () => {
  router.push("/dbqb");
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
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

.body {
  padding: 100px 380px 0 380px;
  box-sizing: border-box;
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
/* .userInfoBtn:hover{

} */

.myAccount {
}

.logo {
  width: 80%;
  /* height: 100%; */
}

.leftItem {
  width: 80%;
  height: 38px;
  line-height: 38px;
  border-radius: 4px;
  font-size: 16px;
  color: black;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5px;
}

.leftItem:hover {
  background-color: rgb(69, 131, 254);
  color: white;
}

.leftItemActive {
  background-color: rgb(69, 131, 254);
  color: white;
}

.bodyMain {
  padding: 0;
  display: flex;
}

.oneLine {
  /* border: 1px solid red; */
  width: 65%;
}

.carouselImg {
  width: 100%;
  height: 300px;
}

.twoLine {
  /* border: 1px solid blue; */
  width: 35%;
}

.search {
  width: 100%;
  height: 44px;
  display: flex;
  background-color: rgba(142, 142, 142, 0.05);
  font-size: 16px;
}

.searchBox {
  background-color: rgba(245, 246, 247);
  width: 78%;
  padding: 10px;
  border: 0.2px #76767618 solid;
  font-size: 14px;
  color: rgb(85, 85, 85) !important;
  outline: none;
}

.searchBox:hover {
  border: 1px solid #409eff;
}

.searchBox:focus {
  border: 1px solid #409eff; /* 聚焦时的边框颜色 */
}

.searchBtn {
  color: white;
  background-color: rgb(32, 142, 218);
  cursor: pointer;
  margin-left: auto;
  width: 22%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dbqb {
  box-sizing: border-box;
  width: 100%;
  padding: 15px;
  font-size: 14px;
  margin-top: 15px;
  border-radius: 4px;
  background-color: rgba(142, 142, 142, 0.05);
}

.dbqbTitle {
  font-size: 18px;
  color: rgb(34, 34, 34);
  font-weight: bold;
  margin-bottom: 30px;
}

.dbqbUrl {
  width: 100%;
}
</style>

<style>
.el-carousel--vertical {
  display: flex;
}

.el-carousel__container {
  width: 91%;
  height: 300px !important;
}

.el-carousel__indicators--outside {
  background-color: black;
  width: 9%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.el-carousel__indicator--vertical {
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  color: white;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 0;
  transition: all 0.3s ease-out;
  /* background-color: rgb(0, 0, 0) !important; */
  overflow: hidden;
}

/* .el-carousel__indicator--vertical .el-carousel__button{

} */

.el-carousel__button {
  margin: 0;
  height: 100% !important;
  width: 100% !important;
  border-radius: 0 !important;
  color: white;
  outline: none;
}

.el-carousel__indicators--outside button {
  opacity: 1 !important;
  background-color: transparent !important;
}

.is-active {
  background-color: #fa2c19;
}

button {
  outline: none;
}
</style>