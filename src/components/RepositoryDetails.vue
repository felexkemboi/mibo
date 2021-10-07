<template>
  <div class="edit-form">
    <h4>Tutorial</h4>
      <!-- {{ repository }} -->
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentRepository.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentRepository.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentRepository.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentRepository.published"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2">
      Delete
    </button>

    <button type="submit" class="badge badge-success">
      Update
    </button>
    <!-- <p>{{ message }}</p> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Repository from "@/types/Repository";
import axios from 'axios';

@Component
export default class RepositoryDetails extends Vue {
  private currentRepository = {} as Repository;
  private commits:any = {}

  async getRepository(name:string) {
    await axios.get(`https://api.github.com/repos/holoplot/${name}`)
      .then((res) => {
        //this.$store.dispatch('setRepos', res.data);
        //console.log(res.data);
        this.currentRepository = res.data;
        this.getCommits(name)
      })
      .catch((e) => {
        alert('error in loading repos' + e);
      });
  }

  async getCommits(name:string){
        await axios.get(`https://api.github.com/repos/holoplot/${name}/commits`)
      .then((res) => {
        //this.$store.dispatch('setRepos', res.data);
        //console.log(res.data);
        this.commits = res.data.slice(0, 20);
        console.log(this.commits);
      })
      .catch((e) => {
        alert('error in loading commits' + e);
      });
  }


  mounted() {
    this.getRepository(this.$route.params.name);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
