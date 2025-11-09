import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },

    // Halaman autentikasi
    {
      path: '/auth',
      name: 'pilih-login',
      component: () => import('../views/auth/PilihLoginView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/login-user',
      name: 'login-user',
      component: () => import('../views/LoginUserView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/login-shelter',
      name: 'login-shelter',
      component: () => import('../views/auth/LoginShelterView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register-user',
      name: 'register-user',
      component: () => import('../views/RegistrasiUserView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/register-shelter',
      name: 'register-shelter',
      component: () => import('../views/auth/RegistrasiShelterView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/forgot-password-user',
      name: 'forgot-password-user',
      component: () => import('../views/auth/LupaPasswordUserView.vue'),
      meta: { layout: 'auth' }
    },
    {
      path: '/forgot-password-shelter',
      name: 'forgot-password-shelter',
      component: () => import('../views/auth/LupaPasswordShelterView.vue'),
      meta: { layout: 'auth' }
    },

    { path: '/adopsi', name: 'adopsi', component: () => import('../views/AdopsiView.vue') },
    
    {
      path: '/adopsi/:id',
      name: 'adopsi-detail',
      component: () => import('../views/FormAdopsiView.vue')
    },

    { path: '/donasi', name: 'donasi', component: () => import('../views/DonasiView.vue') },
    { 
      path: '/donasi/:id', 
      name: 'donasi-detail',
      component: () => import('../views/DonasiDetailView.vue')
    },
    {
      path: '/pembayaran/:id',
      name: 'pembayaran-donasi',
      component: () => import('../views/PembayaranDonasiView.vue')
    },
    { path: '/lapor', name: 'lapor', component: () => import('../views/LaporView.vue') },
    { path: '/form-lapor', name: 'form-lapor', component: () => import('../views/FormLaporView.vue') },
    { path: '/peringkat', name: 'peringkat', component: () => import('../views/PeringkatView.vue') },
    { path: '/rawat-kucing', name: 'rawat-kucing', component: () => import('../views/RawatKucingView.vue') },
    { path: '/profil', name: 'profil', component: () => import('../views/ProfilView.vue') }
  ]
})

export default router
