<template>
  <div id="app">
        <b-navbar class="fixed-top">
        <template #start>
            <b-navbar-item tag="div" style="margin-left:450px;">
                <div class="buttons centre">
                    <a class="button is-primary">
                        <strong>
                           <a href="/" class="navbar-item"><h5>Home </h5></a>
                        </strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

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
