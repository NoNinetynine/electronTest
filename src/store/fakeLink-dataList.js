import { defineStore } from "pinia";
import { ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
import { dataListAPI, aiEmotionAPI } from "../api/dataAPI";
import { version } from "less";

export const fakeLinkDataListStore = defineStore(
  "fakeLinkDataListStore",
  () => {
    const userInfo = ref({});

    const getUserInfo = (username, password) => {
      if (username == "hxl") {
        userInfo.value.nickname = "NikooooHong";
        userInfo.value.img =
          "https://d31zlh4on95l9h.cloudfront.net/images/9a431843b182c64a05fa3c8f6772b8a4.png";
        userInfo.value.token = "DairyQueen";

        return 200;
      } else {
        return 400;
      }
    };

    const getMarket = () => {
      let market = "";
      const queryMarket = getQueryVariable("market");
      if (queryMarket) {
        if (
          typeof queryMarket === "string" &&
          [
            "sg",
            "my",
            "in",
            "hk",
            "th",
            "vi",
            "usa",
            "can",
            "gb",
            "cn",
          ].includes(queryMarket)
        ) {
          return (market = queryMarket);
        } else {
          switch (queryMarket) {
            case "SGX":
              return (market = "sg");
            case "BMB":
              return (market = "my");
            case "IDX":
              return (market = "in");
            case "HKEX":
              return (market = "hk");
            case "SET":
              return (market = "th");
            case "HN":
              return (market = "vi");
            case "HONSE":
              return (market = "vi");
            case "AMERA":
              return (market = "usa");
            case "NYSE":
              return (market = "usa");
            case "NASDAQ":
              return (market = "usa");
            case "DLD":
              return (market = "can");
            case "DLDCY":
              return (market = "can");
            case "GINDEX":
              return (market = "gb");
            case "BZ":
              return (market = "cn");
            case "SH":
              return (market = "cn");
            case "SZ":
              return (market = "cn");
            default:
              return "无市场数据";
          }
        }
      } else {
        return (market = "");
      }
    };

    const getQueryVariable = (variable) => {
      const query = window.location.search.substring(1);
      const vars = query.split("&");
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] === variable) {
          return pair[1];
        }
      }
      return "";
    };

    const dataList = ref({});
    const brainDataList = ref(null);
    const swordDataList = ref(null);
    const priceDataList = ref(null);
    const timeDataList = ref(null);
    const showALLData = ref(null);
    const HomePage = ref(null);
    const AIBull = ref(null);
    const AIGoldBull = ref(null);
    const AIRadar = ref(null);
    const fetchChartData = async () => {
      const getMarketString = localStorage.getItem("localMarket");
      const getCodeString = localStorage.getItem("localCode");
      try {
        const res = await dataListAPI({
          token:
            "8Csj5VVX1UbIb4C3oxrnbZi0+fEeMx8pywnIlrmTm45Cb/EllzWACLto9J9+fCFsfdgBOvKvyY94FvqlvM0",
          market: getMarket() || getMarketString || "gb",
          code: getQueryVariable("code") || getCodeString || "NDX",
          language: "cn",
          brainPrivilegeState: 1,
          swordPrivilegeState: 1,
          stockForecastPrivilegeState: 1,
          spaceForecastPrivilegeState: 1,
          aibullPrivilegeState: 1,
          aigoldBullPrivilegeState: 1,
          airadarPrivilegeState: 1,
          marketList: ["usa", "sg", "my", "hk", "cn", "can", "vi", "th", "in"],
        });
        // 将涨跌幅改为保留两位小数
        let zhangFu = res.data.HomePage.StockInformation.ZhangFu;
        let head = zhangFu[0];
        let tail = zhangFu[zhangFu.length - 1];
        if (zhangFu && zhangFu.length > 2) {
          zhangFu = zhangFu.slice(1, -1); // 去掉开头一位和结尾一位
        }
        zhangFu = Number(zhangFu).toFixed(2);
        zhangFu = head + zhangFu + tail;
        res.data.HomePage.StockInformation.ZhangFu = zhangFu;
        res.data.ShowAll.StockInformation.ZhangFu = zhangFu;
        console.log("res", res);
        brainDataList.value = res.data.Brain;
        swordDataList.value = res.data.Sword;
        priceDataList.value = res.data.StockForecast;
        timeDataList.value = res.data.SpaceForecast;
        showALLData.value = res.data.ShowAll;
        HomePage.value = res.data.HomePage;
        AIBull.value = res.data.AIBull;
        AIGoldBull.value = res.data.AIGoldBull;
        AIRadar.value = res.data.AIRadar;
        dataList.value = res.data; // 返回获取到的数据
      } catch (error) {
        console.error("获取图表数据出错:", error);
      }
    };

    const AiEmotinData = ref({});
    // 调用aiEmotionAPI获取数据
    const getAiEmotinData = async () => {
      const getMarketString = localStorage.getItem("localMarket");
      const getCodeString = localStorage.getItem("localCode");
      console.log(getMarketString, getCodeString);
      try {
        const res = await aiEmotionAPI({
          token:
            "8Csj5VVX1UbIb4C3oxrnbZi0+fEeMx8pywnIlrmTm45Cb/EllzWACLto9J9+fCFsfdgBOvKvyY94FvqlvM0",
          market: getMarketString || "gb",
          code: getCodeString || "NDX",
          language: "cn",
          version: "1",
        });

        // 处理响应数据
        if (res.data) {
          AiEmotinData.value = res.data;
        }
      } catch (error) {
        console.error("获取图表数据出错:", error);
      } finally {
        console.log("数据获取过程结束");
      }
    };

    return {
      userInfo,
      getUserInfo,
      dataList,
      HomePage,
      fetchChartData,
      AiEmotinData,
      getAiEmotinData,
    };
  },
  {
    persist: {
      key: "userInfo",
      storage: sessionStorage,
      paths: ["expireData"],
    },
  }
);
