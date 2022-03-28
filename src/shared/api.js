import axios from "axios";
import { apiUrl } from "../elements/testApiUrl";

// 사용자 정의 인스턴스 기본 설정 참고 (https://yamoo9.github.io/axios/guide/config-defaults.html#%EA%B8%80%EB%A1%9C%EB%B2%8C-axios-%EA%B8%B0%EB%B3%B8-defaults-%EC%84%A4%EC%A0%95)
const instance = axios.create({
  baseURL: apiUrl,
  headers: {
    "content-type": "application/json;charset=UTF-8", // 자바스크립트는 json형태로 받아와야 한다.
    accept: "application/json",
  },
});
// Tip. html form 태그를 사용하여 post 방식으로 요청하거나, jQuery의 ajax 등의 요철을 할때
// default Content-Type은 'application/json,'이 아니라 'application/x-www-form-urlencoded'다.

// interceptors의 역할 => then이나 catch로 처리되기 전
// 요청(request)이나 응답(response)을 가로채 어떠한 작업을 수행할 수 있게 한다. 참고 (https://yamoo9.github.io/axios/guide/interceptors.html)

instance.interceptors.request.use(function (config) {
  const accessToken = sessionStorage.token;
  if (accessToken) {
    config.headers.common["Authorization"] = `${accessToken}`; // header에 토큰값을 넣는다 => header에 토큰값이 있어 앞으로 request를 자유자재로 할 수 있다.
    return config;
  }
});

// 데이터 요청 to 서버
export const apis = {
  // ==================== post api ====================//
  getpost: (page) =>
    instance.get(
      `/post/get/check?page=${page}&size=10&sortBy=createdAt&isAsc=false`
    ),

  getpostnocheck: (page) =>
    instance.get(
      `/post/get/nocheck?page=${page}&size=10&sortBy=createdAt&isAsc=false`
    ),

  onepost: (pid) => instance.get(`/post/get/detail/${pid}`),

  delpost: (pid) => instance.delete(`/islogin/post/delete/${pid}`),

  likepost: (uid, pid) =>
    instance.post(`/islogin/post/create/like`, {
      uid: uid,
      pid: pid,
    }),

  // ==================== answer api ====================//
  getanswer: (pid) => instance.get(`/answer/get/${pid}`),
  delanswer: (answsrId) =>
    instance.delete(`/islogin/answer/delete/${answsrId}`, {
      answsrId: answsrId,
    }),
  chooseAnswer: (uid, pid, answerId, answerUid) =>
    instance.post(`/islogin/answer/create/like`, {
      uid: uid,
      pid: pid,
      answerId: answerId,
      answerUid: answerUid,
    }),

  totalRanking: () => instance.get(`/user/get/ranking/total`),
  monthRanking: () => instance.get(`/user/get/ranking/month`),
  weekRanking: () => instance.get(`/user/get/ranking/weekend`),
  mytotalRanking: () => instance.get(`/islogin/get/myranking/total`),
  mymonthRanking: () => instance.get(`/islogin/get/myranking/month`),
  myweekRanking: () => instance.get(`/islogin/get/myranking/weekend`),

  myalarm: () => instance.get(`/islogin/get/alarm`),
  myalarmdel: (alarmId) => instance.delete(`/islogin/delete/alarm/${alarmId}`),
  mylikepost: (page) =>
    instance.get(
      `/islogin/post/get/like?page=${page}&size=10&sortBy=createdAt&isAsc=false`
    ),

  prechat: () => instance.get(`/mainchat/get/main`),
  prepostchat: (pid) => instance.get(`/postchat/get/${pid}`),
};
