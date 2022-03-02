<template>
  <div id="app">
    <div class="mt-3">
      <div class="container content">
        <div class="card">
          <div class="card-content">
            <div class="header">
              <button @click="reset()" class="button is-primary centre" style="margin-bottom:10px;">Reset</button>
            </div>
            <div id="grid-template">
              <div id="container">
                <div v-for="(i,index) in items" :key="index">
                  <div  class="grid-item" :style="style(i.selected)" @click="change(i)">{{ `${i.value}` }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import GridItem from '@/types/GridItem'

@Component
export default class App extends Vue {
  private items: Array<GridItem> = [];

  change(i: GridItem): void {
    for (let item of this.items) {
      if(item.row == i.row || item.column == i.column){
        this.items = this.items.map(obj => obj.key === item.key ? { ...obj, value: obj.value + 1, selected: true } : obj);
      }
    }

    setTimeout(() => {
      for (let item of this.items) {
        if(item.row == i.row || item.column == i.column){
          this.items = this.items.map(obj => obj.key === item.key ? { ...obj, selected: false } : obj);
        }
      }; 
    }, 200);
  }

  style(selected: boolean){
    return selected ? 'background-color: yellow' : ''
  }

  reset(){
    for (let i = 1; i <= 50; i++) {
        let item = this.items.findIndex(item => item.key == i);
        this.items[item].value = 0
    }
  }

  @Watch('items', { 
      immediate: true, deep: true 
  })

  itemsChanged(newVal: Array<GridItem>) {
    let values = []
    for (let item of newVal) {
      values.push(item.value)
    }
    if(this.longestFibonacci(values) >= 5){
      console.log('there is a fibonacci greater than 5 here')
      //Get the indices of the array and change there color
    }
  }

  longestFibonacci = (arr:number[]) => {
    const map = arr.reduce((acc: any, num, index: any) => {
        acc[num] = index
        return acc
    }, {})
    const inner = arr.map(() => arr.map(() => 0))
    let max = 0
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
          const a = arr[i]
          const b = arr[j]
          const index = map[b - a]
          if(index < i) {
            inner[i][j] = inner[index][i] + 1
          }
          max = Math.max(max, inner[i][j])
        }
    }
    return max > 0 ? max + 2 : 0
  };


  mounted() {
    for (let i = 1; i <= 50; i++) {
      let row = 0
      let column = 0

      if(i <= 10){
        row = 1;
        column = i;
      }else if(i <= 20){
        row = 2;
        column = i - 10;
      }else if(i <= 30){
        row = 3;
        column = i - 20;
      }else if(i <= 40){
        row = 4;
        column = i - 30;
      }else if(i <= 50){
        row = 5;
        column = i - 40;
      }

      this.items.push({
        key: i,
        value: 0,
        row: row,
        column: column,
        selected: false
      });
    }
  }
}
</script>

<style scoped>
#container {
  display: grid;
  grid-gap: 1em;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
}
.grid-item {
  padding: 1em;
  border: 1px solid #ddd;
}
</style>
