import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'

export default new Router({
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})
