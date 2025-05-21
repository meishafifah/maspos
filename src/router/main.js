import HomeView from '@/views/home/index.vue'
import UserView from '@/views/user/index.vue'
import UserCreateView from '@/views/user/create.vue'
import UserUpdateView from '@/views/user/update.vue'

import DashboardLayout from '@/layouts/DashboardLayout.vue';

// middleware
import AuthMiddleware from '@/middleware/auth.middleware.js';

export default [{
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
      layout: DashboardLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user',
    name: 'user',
    component: UserView,
    meta: {
      title: 'User',
      layout: DashboardLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: UserCreateView,
    meta: {
      title: 'User Create',
      layout: DashboardLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/user/update',
    name: 'user.update',
    component: UserUpdateView,
    meta: {
      title: 'User Update',
      layout: DashboardLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: '/category',
    name: 'CategoryIndex',
    component: () => import('@/views/category/index.vue'),
    meta: {
      title: 'Kategori Produk',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/category/update/:id',
    name: 'CategoryUpdate',
    component: () => import('@/views/category/update.vue'),
    meta: {
      title: 'Edit Kategori',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/product',
    name: 'ProductIndex',
    component: () => import('@/views/product/index.vue'),
    meta: {
      title: 'Produk',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/product/update/:id',
    name: 'ProductUpdate',
    component: () => import('@/views/product/update.vue'),
    meta: {
      title: 'Edit Produk',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/cart',
    name: 'CartIndex',
    component: () => import('@/views/cart/index.vue'),
    meta: {
      title: 'Keranjang',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
  {
    path: '/transaction',
    name: 'TransactionPage',
    component: () => import('@/views/cart/transaction.vue'),
    meta: {
      title: 'Transaksi',
      layout: DashboardLayout,
      middleware: [AuthMiddleware]
    },
  },
]
