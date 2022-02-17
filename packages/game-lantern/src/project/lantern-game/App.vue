<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Tag, Picker, Popup, ActionSheet, Dialog } from 'vant';
import loaderUtil from './utils/loader'

Vue.use(Button);
Vue.use(Tag);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(ActionSheet);
Vue.use(Dialog);

const { loadJS } = loaderUtil;


export default {
  name: 'App',
  components: {
  },
  mounted() {
    // this.wxInit();
  },
  methods: {
    wxInit() {
      loadJS('http://res2.wx.qq.com/open/js/jweixin-1.6.0.js ').then(() => {
        console.log(window.wx)
      })
    }
  }
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
}
</style>
<style>
@import "./assets/css/reset.css";
</style>
