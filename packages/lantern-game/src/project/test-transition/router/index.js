export default [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/index/index'),
  },
];
