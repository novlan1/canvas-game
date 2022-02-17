import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import App from './App.vue';
import routerList from './router/index';
import 'element-ui/lib/theme-chalk/index.css';
// import { getPassportUrl } from './utils/passport';
// import { post } from './utils/post';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routerList,
});

function beforeStart(router) {
  router.beforeEach((to, from, next) => {
    const token = sessionStorage.getItem('a-token');
    // const rtx = sessionStorage.getItem('rtx');
    // console.log('from', from);
    // console.log('to', to);


    if (to.query.code) {
      // console.log('code', to.query.code);
      post({
        url: '/api/login',
        data: {
          code: to.query.code,
        },
      }).then((res) => {
        if (res.token) {
          // next({
          //   path: '/index',
          //   query: '',
          // });
          window.location.replace(`${location.origin + location.pathname}`);
        }
      });
    } else if (!token) {
      window.location.href = getPassportUrl();
    } else {
      next();
    }
  });
}

// beforeStart(router);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
