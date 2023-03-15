import App from './App'

// #ifndef VUE3
import Vue from 'vue'
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';
/*引入weui库*/
//import 'weui-miniprogram/miniprogram_dist/weui-wxss/dist/style/weui.wxss';
//import 'vant-weapp/dist/common/index.wxss';
//import "vant-weapp/dist/common/index.wxss"; //引入vant的样式文件

Vue.config.productionTip = false
App.mpType = 'app'
//Vue.use(ElementUI);

try {
  function isPromise(obj) {
    return (
      !!obj &&
      (typeof obj === "object" || typeof obj === "function") &&
      typeof obj.then === "function"
    );
  }

  // 统一 vue2 API Promise 化返回格式与 vue3 保持一致
  uni.addInterceptor({
    returnValue(res) {
      if (!isPromise(res)) {
        return res;
      }
      return new Promise((resolve, reject) => {
        res.then((res) => {
          if (res[0]) {
            reject(res[0]);
          } else {
            resolve(res[1]);
          }
        });
      });
    },
  });
} catch (error) { }

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif