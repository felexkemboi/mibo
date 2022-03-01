<template>
  <div class="content" style="margin-top: 3%;margin-left:20%;">
    <div class="container is-max-desktop">
      <div class="container">
        <div class="notification is-primary">
          <grid></grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grid from './Grid.vue';

@Component({
  components: { Grid },
})

export default class Home extends Vue {}
</script>

<style scoped>
</style>
