<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <span class="navbar-brand">Front VueJs</span>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/programs" class="nav-link">Programas</router-link>
      </li>
    </ul>
  </div>
</nav>
  <router-view/>
</template>

<style>
nav {
  padding: 30px;
}
</style>
