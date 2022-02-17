<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import { Button, Tag, Picker, Popup, ActionSheet } from 'vant';

Vue.use(Button);
Vue.use(Tag);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(ActionSheet);

export default {
  name: 'App',
  components: {
  },
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
</style>
