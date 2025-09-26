import request from "../utils/request";

const APIurl = import.meta.env.VITE_APP_API_BASE_URL;

//数据接口
export const dataListAPI = function (params) {
  // URLSearchParams只接受全部字符串的数据
  // 将传入数据转化成字符串
  const StringParams = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
  return request({
    url: `${APIurl}/api/brain/data`,
    method: "post",
    data: StringParams,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

// ai情绪大模型的接口
export const aiEmotionAPI = function (params) {
  return request({
    url: `${APIurl}/api/aiEmotion/client/getAiEmotionData`,
    method: "post",
    data: params,
  });
};
