import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
Vue.use(Router)
import Store from '@/store'
/* Layout */
import Layout from '@/layout'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',

    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // {
  //   path: '/projs',
  //   component: Layout,
  //   redirect: '/info',
  //   children: [{
  //     path: 'info',
  //     name: 'Info',
  //     component: () => import('@/views/proj'),
  //     meta: { title: '项目管理', },

  //   },
  //   {
  //     path: 'detail/:id',
  //     name: 'Detail',
  //     component: () => import('@/views/proj/detail.vue'),
  //     meta: { title: '项目详情' },
  //     hidden: true,
  //     beforeEnter: (to, from, next) => {
  //       // ...


  //       to.meta.title = `项目管理 / ${to.query.proj_name}`
  //       next()
  //     }

  //   },]
  // },

  // {
  //   path: '/proj',
  //   component: Layout,
  //   meta: { title: '项目管理', icon: 'el-icon-s-operation' },
  //   children: [
  //     // {
  //     //   path:'proj',
  //     //   name:'Proj',
  //     //   component:()=>import('@/views/jichu/proj'),
  //     //   meta:{title:'基础信息',icon:'el-icon-s-order'}
  //     // },
  //     {
  //       path: 'rpyacc',
  //       name: 'RpyAcc',
  //       component: () => import('@/views/caiwu/rpyacc'),
  //       meta: { title: '项目列表', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: 'credit',
  //       name: 'Credit',
  //       component: () => import('@/views/caiwu/credit'),
  //       meta: { title: '项目录入', icon: 'el-icon-s-order' }
  //     },


  //     {
  //       path: 'rpyplan',
  //       name: 'RpyPlan',
  //       component: () => import('@/views/caiwu/rpy'),
  //       meta: { title: '项目审核', icon: 'el-icon-s-order' }
  //     },




  //   ]
  // },
  // {
  //   path: '/cls',
  //   name: 'Cls',
  //   component: Layout,
  //   redirect: '/cls/pl',
  //   alwaysShow: true,
  //   meta: { title: '资金管理', icon: 'el-icon-refresh' },
  //   children: [
  //     {
  //       path: 'pl',
  //       name: 'Pl',
  //       component: () => import('@/views/cls/pl'),
  //       meta: { title: '款项流转', icon: 'el-icon-s-claim' }
  //     },
  //      {
  //       path: 'mt/:ptid',
  //       name: 'Mt',
  //       component: () => import('@/views/cls/mt'),
  //       meta: { title: '下款' },
  //       hidden: true,
  //       beforeEnter: (to, from, next) => {
  //         // ...


  //         to.meta.title = to.query.rec_pl_name
  //         next()
  //       }
  //     }, {
  //       path: 'sp/:mtid',
  //       name: 'Sp',
  //       component: () => import('@/views/cls/sp'),
  //       meta: { title: '走款' },
  //       hidden: true,
  //       beforeEnter: (to, from, next) => {
  //         // ...
  //         to.meta.title = from.query.rec_pl_name + ' / ' + to.query.rec_pl_name
  //         next()
  //       }
  //     },

  //   ]

  // },
  // {
  //   path: '/jichu',
  //   component: Layout,
  //   meta: { title: '基础信息', icon: 'el-icon-s-operation' },
  //   children: [
  //     {
  //       path: 'corp',
  //       name: 'Corp',
  //       component: () => import('@/views/jichu/corp'),
  //       meta: { title: '公司信息', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: 'bank',
  //       name: 'Bank',
  //       component: () => import('@/views/jichu/bank'),
  //       meta: { title: '金融机构', icon: 'el-icon-s-order' }
  //     },

  //     {
  //       path: 'fina',
  //       name: 'Fina',
  //       component: () => import('@/views/jichu/fina'),
  //       meta: { title: '品种信息', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: 'guar',
  //       name: 'Guar',
  //       component: () => import('@/views/jichu/guar'),
  //       meta: { title: '担保方式', icon: 'el-icon-s-order' }
  //     },

  //     {
  //       path: 'agmt',
  //       name: 'Agmt',
  //       component: () => import('@/views/jichu/agmt'),
  //       meta: { title: '合同信息', icon: 'el-icon-s-order' }
  //     },
  //     {
  //       path: 'rate',
  //       name: 'Rate',
  //       component: () => import('@/views/jichu/rate'),
  //       meta: { title: '基准利率', icon: 'el-icon-s-order' }
  //     }




  //   ]
  // },

  // {
  //   name: 'Acl',
  //   path: '/acl',
  //   component: Layout,
  //   redirect: '/acl/user/list',
  //   meta: {
  //     title: '权限管理',
  //     icon: 'el-icon-lock'
  //   },
  //   children: [
  //     {
  //       name: 'User',
  //       path: 'user/list',
  //       component: () => import('@/views/acl/user/list'),
  //       meta: {
  //         title: '用户管理',
  //       },
  //     },
  //     {
  //       name: 'Role',
  //       path: 'role/list',
  //       component: () => import('@/views/acl/role/list'),
  //       meta: {
  //         title: '角色管理',
  //       },
  //     },
  //     {
  //       name: 'RoleAuth',
  //       path: 'role/auth/:id',
  //       component: () => import('@/views/acl/role/roleAuth'),
  //       meta: {
  //         activeMenu: '/acl/role/list',
  //         title: '角色授权',
  //       },
  //       hidden: true,
  //     },
  //     // {
  //     //   name: 'Permission',
  //     //   path: 'permission/list',
  //     //   component: () => import('@/views/acl/permission/list'),
  //     //   meta: {
  //     //     title: '菜单管理',
  //     //   },
  //     // },
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
//异步路由
export const asyncRoutes = [
  // {
  //   path: '/projs',
  //   name: 'Projs',
  //   component: Layout,
  //   redirect: '/info',
  //   children: [{
  //     path: 'info',
  //     name: 'Info',
  //     component: () => import('@/views/proj'),
  //     meta: { title: '项目管理', },

  //   },
  //   {
  //     path: 'detail/:id',
  //     name: 'Detail',
  //     component: () => import('@/views/proj/detail.vue'),
  //     meta: { title: '项目详情' },
  //     hidden: true,
  //     beforeEnter: (to, from, next) => {
  //       // ...


  //       to.meta.title = `项目管理 / ${to.query.proj_name}`
  //       next()
  //     }

  //   },]
  // },
  {
    path: '/projs',
    name: 'Projs',
    component: Layout,
    meta: { title: '项目信息', icon: 'el-icon-s-operation' },
    children: [
      {
        path: 'corp',
        name: 'Corp',
        component: () => import('@/views/proj'),
        meta: { title: '项目管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'enter',
        name: 'Enter',
        component: () => import('@/views/proj/project'),
        meta: { title: '项目添加', icon: 'el-icon-s-order' }
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('@/views/proj/detail.vue'),
        meta: { title: '项目详情' },
        hidden: true,
        beforeEnter: (to, from, next) => {
          to.meta.title = `项目管理 / ${to.query.proj_name}`
          next()
        }
      }
    ]
  },
  {
    path: '/jichu',
    name: 'Jichu',
    component: Layout,
    meta: { title: '基础信息', icon: 'el-icon-s-operation' },
    children: [
      {
        path: 'corp',
        name: 'Corp',
        component: () => import('@/views/jichu/corp'),
        meta: { title: '公司信息', icon: 'el-icon-s-order' }
      },
      {
        path: 'bank',
        name: 'Bank',
        component: () => import('@/views/jichu/bank'),
        meta: { title: '金融机构', icon: 'el-icon-s-order' }
      },

      {
        path: 'fina',
        name: 'Fina',
        component: () => import('@/views/jichu/fina'),
        meta: { title: '品种信息', icon: 'el-icon-s-order' }
      },
      {
        path: 'guar',
        name: 'Guar',
        component: () => import('@/views/jichu/guar'),
        meta: { title: '担保方式', icon: 'el-icon-s-order' }
      },

      // {
      //   path: 'agmt',
      //   name: 'Agmt',
      //   component: () => import('@/views/jichu/agmt'),
      //   meta: { title: '合同信息', icon: 'el-icon-s-order' }
      // },
      {
        path: 'rate',
        name: 'Rate',
        component: () => import('@/views/jichu/rate'),
        meta: { title: '基准利率', icon: 'el-icon-s-order' }
      }




    ]
  },

]
//任意路由
export const renyiRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// router.beforeEach((to,from,next)=>{
//   next({to,replace:true})
// })
router.beforeEach(async (to, from, next) => {
  //判断是否已经登录了
  if (Cookies.get('vue_admin_template_token')) {
    //判断刷新后flag的状态避免进入死循环
    if (!Store.state.user.flag) {
      await Store.dispatch('user/getInfo')
      next({ ...to, replace: true })
    } else {
      next()
    }
    //判断在已经登录的情况下进入没有权限的网页跳至首页
    if (to.path == '/404') {
      next('/')
    } else next()
    next()
  } else {
    next()
  }
  //next()

})



// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
