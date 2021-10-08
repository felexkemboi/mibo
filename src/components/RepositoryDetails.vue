<template>
<div class="container is-widescreen notification is-success">
  <p style="margin-left:45%;text-color:red;" class="title is-3">Title: <strong>{{ currentRepository.name }}</strong> 
</p>
  <section style="margin-top:15px;">
      <b-tabs v-model="activeTab" type="is-toggle-rounded">
          <template v-for="tab in tabs">
              <b-tab-item  :key="tab.id" :label="tab.label">

                  <div v-if="tab.id ==`commits`">
                    <section>
                      <b-table
                          :data="commits"
                          :bordered=false
                          :striped=false
                          :narrowed=false
                          :hoverable=false
                          :focusable=false
                          :mobile-cards=true>

                          <b-table-column field="id" label="ID" width="40" :td-attrs="columnTdAttrs" numeric v-slot="props">
                              {{ props.row.author ? props.row.author.login : 'Not given' }}
                          </b-table-column>

                          <b-table-column  label="Name" :td-attrs="columnTdAttrs" v-slot="props">
                              {{ props.row.commit ? props.row.commit.author.name : 'Not given' }}
                          </b-table-column>

                          <b-table-column  label="Commit Message" :td-attrs="columnTdAttrs" v-slot="props">
                              {{ props.row.commit ? props.row.commit.message : 'Not given' }}
                          </b-table-column>
                          <b-table-column  label="Commment Count" :td-attrs="columnTdAttrs" v-slot="props">
                              {{ props.row.commit ? props.row.commit.comment_count : 'Not given' }}
                          </b-table-column>

                          <b-table-column  label="Organisation Admin" :td-attrs="columnTdAttrs" v-slot="props">
                              {{  props.row.author ? props.row.author.site_admin : 'Not given' }}
                          </b-table-column>

                          <b-table-column field="date" label="Date" :th-attrs="dateThAttrs" :td-attrs="columnTdAttrs" centered v-slot="props">
                              <span class="tag is-success">
                                  {{ new Date(props.row.commit.author.date).toLocaleDateString() }}
                              </span>
                          </b-table-column>
                      </b-table>
                    </section>
                  </div>
                  <div v-if="tab.id ==`contributors`">
                    <ol type="a">
                      <li v-for="(contributor,index) in contributors" :key=index>
                        {{ contributor.login }}
                      </li>
                    </ol>                    
                  </div>
                  <div v-if="tab.id ==`branches`">
                    <ol type="a">
                      <li v-for="(branch,index) in branches" :key=index>
                        {{ branch.name }}
                      </li>
                    </ol>
                  </div>
              </b-tab-item>
          </template>
      </b-tabs>
  </section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Repository from "@/types/Repository";
import axios from 'axios';

@Component
export default class RepositoryDetails extends Vue {
  private currentRepository = {} as Repository;
  private commits:any = []
  private branches:any = []
  private contributors:any = []
  private activeTab =  'commits'
  private get baseTabs() {
              return [
                  {
                      id: 'commits',
                      label: 'Commits',
                      displayed: true,
                  },
                  {
                      id: 'contributors',
                      label: 'Contributors',
                      displayed: true,
                  },
                  {
                      id: 'branches',
                      label: 'Branches',
                      displayed: true,
                  }
              ]
  }
  private get tabs() {
    const tabs = [...this.baseTabs]
    if (this.showBooks) {
        tabs.splice(tabs.length - 2, 0, this.bookTab);
    }
    return tabs
  }
  private get bookTab() {
    return {
        id: 'books',
        label: 'Books',
        content: 'Books: Lorem ipsum dolor sit amet.',
        displayed: true,
    }
  }

  async getRepository(name:string) {
    await axios.get(`https://api.github.com/repos/holoplot/${name}`)
      .then((res) => {
        this.currentRepository = res.data;
        this.getCommits(name)
      })
      .catch((e) => {
        alert('error in loading repos' + e);
      });
  }
  dateThAttrs(column:any) {
    return column.label === 'Date' ? {
        title: 'This title is sponsored by "th-attrs" prop',
        class: 'has-text-success'
    } : null
  }

  columnTdAttrs(row:any, column:any) {
      if (row.id === 'Total') {
          if (column.label === 'ID') {
              return {
                  colspan: 4,
                  class: 'has-text-weight-bold',
                  style: {
                      'text-align': 'left !important'
                  }
              }
          } else if (column.label === 'Gender') {
              return {
                  class: 'has-text-weight-semibold'
              }
          } else {
              return {
                  style: {display: 'none'}
              }
          }
      }
      return null
  }
            
  async getCommits(name:string){
        await axios.get(`https://api.github.com/repos/holoplot/${name}/commits`)
      .then((res) => {
        this.commits = res.data.slice(0, 20);
        this.getBranches(name);
      })
      .catch((e) => {
        alert('error in loading commits' + e);
      });
  }

  async getContributors(name:string){
        await axios.get(`https://api.github.com/repos/holoplot/${name}/contributors`)
      .then((res) => {
        this.contributors = res.data;
      })
      .catch((e) => {
        alert('error in loading commits' + e);
      });
  }

  async getBranches(name:string){
      await axios.get(`https://api.github.com/repos/holoplot/${name}/branches`)
    .then((res) => {
     this.branches = res.data;
     this.getContributors(name);
    })
    .catch((e) => {
      alert('error in loading branches' + e);
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
