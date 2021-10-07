<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation" style="margin-top: 1%;margin-left:40%;">
      <div class="navbar-menu">
        <div class="navbar-start">
          <a href="/" class="navbar-item"><h5>Home </h5></a>
        </div>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>
