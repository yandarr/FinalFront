import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'
import HomeView from '../views/HomeView.vue'

import ListPrograms from '../views/programs/ListPrograms.vue'
import CreatePrograms from '../views/programs/CreateProgram.vue'
import EditPrograms from '../views/programs/EditProgram.vue'
import ShowPrograms from '../views/programs/ShowProgram.vue'

import ListSubjects from '../views/subjects/ListSubjects.vue'
import CreateSubject from '../views/subjects/CreateSubject.vue'
import EditSubject from '../views/subjects/EditSubject.vue'
import ShowSubject from '../views/subjects/ShowSubject.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/programs',
    name: 'programs',
    component: ListPrograms
  },
  {
    path: '/programs/create',
    name: 'create programs',
    component: CreatePrograms
  },
  {
    path: '/programs/edit/:id',
    name: 'edit programs',
    component: EditPrograms
  },
  {
    path: '/programs/show/:id',
    name: 'show programs',
    component: ShowPrograms
  },
  {
    path: '/subjects/:id',
    name: 'list subjects',
    component: ListSubjects
  },
  {
    path: '/subjects/:id/create',
    name: 'create subjects',
    component: CreateSubject
  },
  {
    path: '/subjects/edit/:id',
    name: 'edit subjects',
    component: EditSubject,
    props: true
  },
  {
    path: '/subjects/show/:id',
    name: 'show subjects',
    component: ShowSubject
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
