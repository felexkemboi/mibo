<template>
  <div class="content" style="margin-top: 3%;margin-left:20%;">
    <div class="container is-max-desktop">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <h4  class="navbar-item">Holoplot’s (public) Repositories</h4>
        </div>
      </nav>
      <div class="container">
        <div class="notification is-primary">
          <ol type="1">
            <li v-for="(repository, index) in repositories" :key="index">
                <router-link :to="'/repository/' + repository.name">{{ repository.name }}</router-link>
            </li>
          </ol>
        </div>
      </div>
    <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Repository from "@/types/Repository";
import axios from 'axios';

@Component
export default class RepositoryList extends Vue {
  private repositories: Repository[] = [];

  async getRepositories() {
    await axios.get('https://api.github.com/users/holoplot/repos')
      .then((res) => {
        //this.$store.dispatch('setRepos', res.data);
        this.repositories = res.data;
      })
      .catch((e) => {
        alert('error in loading repos' + e);
      });
  }


  mounted() {
    this.getRepositories();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
