import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import AppMain from '@/layout/components/AppMain'

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
    icon: 'svg-name'             the icon show in the sidebar
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
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
    }]
  },
  {
    path: '/productLine',
    component: Layout,
    children: [
      {
        path: '/productLine/index',
        name: 'Product Line',
        component: () => import('@/views/productLine/index'),
        meta: { title:'Product Line', icon: 'line' ,role: ['111']}
      }
    ]
  },
  {
    path: '/workflow',
    component: Layout,
    children: [
      {
        path: '/workflow/index',
        name: 'WorkFlow',
        component: () => import('@/views/workflow/index'),
        meta: { title:'Workflow', icon: 'workflow' ,role: ['111']}
      }
    ]
  },
  {
    path: '/task',
    component: Layout,
    name: 'taskManagement',
    meta: { title: 'taskManagement', icon: 'taskmanege' },
    children: [
      {
        path: 'index',
        name: 'Task',
        component: () => import('@/views/task/history/index'),
        meta: { title:'Task', icon: 'taskline' }
      },
      {
        path: '/details/index',
        hidden: true, // 不在侧边栏线上
        name: 'taskDetails',
        component: () => import('@/views/task/details/index'),
        meta: { title:'taskDetails', icon: 'tasknow' }
      },
      {
        path: '/tasktransfes/index',
        hidden: true, // 不在侧边栏线上
        name: 'tasktransfes',
        component: () => import('@/views/task/tasktransfes/index'),
        meta: { title:'tasktransfes', icon: 'tasknow' }
      },
      {
        path: '/step/index',
        hidden: true, // 不在侧边栏线上
        name: 'taskstep',
        component: () => import('@/views/task/step/index'),
        meta: { title:'tasktransfes', icon: 'tasknow' }
      }
    ]
  },
  {
    path: '/scripts',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Script',
        component: () => import('@/views/script/index'),
        meta: { title: 'Script', icon: 'python' }
      }
    ]
  },
  {
    path: '/material',
    component: Layout,
    name: 'Material',
    meta: { title: 'Material', icon: 'barcode' },
    redirect: '/material/list',
    children: [{
      path: 'list',
      name: 'materialList',
      component: () => import('@/views/material/index'),
      meta: { title: 'Material', icon: 'barcode', noCache: true, affix: true }
    }]
  },
  {
    path: '/device',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Device',
        component: () => import('@/views/device/index'),
        meta: { title: 'device', icon: 'device' }
      }
    ]
  },
  {
    path: '/notification',
    component: Layout,
    name: 'Notification',
    meta: { title: 'Notification', icon: 'message' }
  },
  {
    path: '/debug',
    component: Layout,
    name: 'Debug',
    meta: { title: 'Debug', icon: 'bug' },
    children: [
      {
        path: '/task/createtask/index',
        name: 'StepOperation',
        component: () => import('@/views/task/createtask/index'),
        meta: { title:'StepOperation', icon: 'test'}
      },
      {
        path: 'index',
        name: 'DeviceDebug',
        component: () => import('@/views/dbg/index'),
        meta: { title: 'DeviceDebug', icon: 'taskdug' }
      }
    ]
  },
  {
    path: '/management',
    component: Layout,
    name: 'Management',
    meta: { title: 'Management', icon: 'setting' },
    children: [
      {
        path: 'productLine',
        name: 'Product Line Management',
        component: () => import('@/views/management/productLine/index'),
        meta: { title: 'Product Line Management', icon: 'productLine' }
      },
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/management/device/index'),
        meta: { title: 'Device Management', icon: 'device' }
      },
      {
        path: 'brand',
        name: 'Brand',
        component: () => import('@/views/management/material/brand/index'),
        meta: { title: 'Material Brand', icon: 'brand' }
      },
      {
        path: 'category',
        name: 'MaterialCategory',
        component: () => import('@/views/management/material/category/index'),
        meta: { title: 'Material Category', icon: 'category' }
      },
      {
        path: 'type',
        name: 'MaterialType',
        component: () => import('@/views/management/material/type/index'),
        meta: { title: 'Material Type', icon: 'type' }
      },
      {
        path: 'materialList',
        name: 'MaterialList',
        component: () => import('@/views/management/material/material/index'),
        meta: { title: 'Material List', icon: 'barcode' }
      },
      {
        path: '/hotelCytomat',
        name: 'hotelCytomat',
        component: () => import('@/views/management/hotel/index'),
        meta: { title: 'hotelOrCytomat', icon: 'hotel' }
      },
      {
        path: '/interactivehotel',
        name: 'interactivehotel',
        component: () => import('@/views/management/interactivehotel/index'),
        meta: { title: 'interactivehotel', icon: 'interactivehotel' }
      },
      {
        path: '/DeviceMesa',
        name: 'deviceMesa',
        component: () => import('@/views/management/devicemesa/index'),
        meta: { title: 'deviceMesa', icon: 'mesa' }
      },
      {
        path: '/RobotQueue',
        name: 'robotQueue',
        component: () => import('@/views/management/robotQueue/index'),
        meta: { title: 'robotQueue', icon: 'robotqueue' }
      },
      // {
      //   path: '/log',
      //   name: 'Log',
      //   component: () => import('@/views/management/log/index'),
      //   meta: { title: 'log', icon: 'log' }
      // },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/management/user/role'),
        meta: { title: 'Role', icon: 'peoples' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/management/user/user'),
        meta: { title: 'User', icon: 'user' }
      },
      {
        path: 'errorDocs',
        name: 'Error Docs',
        component: () => import('@/views/management/errorDoc'),
        meta: { title: 'Error Docs', icon: 'documentation' }
      },
      {
        path: '/tirective',
        name: 'tirective',
        component: () => import('@/views/management/tirective/index'),
        meta: { title: 'tirective', icon: 'documentation' }
      }
    ]
  },
  {
    path: '/errorDoc',
    component: AppMain,
    children: [
      {
        path: ':locale/detail/:code',
        name: 'Detail',
        component: () => import('@/views/management/errorDoc/detail.vue')
      }
    ]
  },
  {
    path: '/kafka',
    component: Layout,
    name: 'Kafka',
    meta: { title:'Kafka',icon:'notification'},
    children: [
      {
        path: '/kafka/receive/index',
        name: 'Receive',
        component: () => import('@/views/kafka/receive/index'),
        meta: { title:'Receive', icon: 'receive'}
      },
      {
        path: '/kafka/send/index',
        name: 'Send',
        component: () => import('@/views/kafka/send/index'),
        meta: { title: 'Send', icon: 'sendinfo'}
      },
      {
        path: '/kafka/index',
        name: 'SendKafka',
        component: () => import('@/views/kafka/index'),
        meta: { title: 'SendKafka', icon: 'send' }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    children: [{
      path: 'about',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: { title: 'about', icon: 'dashboard', noCache: true, affix: true }
    }]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'external Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
