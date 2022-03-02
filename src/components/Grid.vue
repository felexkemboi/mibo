<template>
  <div class="wrapper">
    <button @click="reset()">Reset</button>
    <div id="grid-template">
      <div id="container">
        <div v-for="(i,index) in items" :key="index">
          <div  class="grid-item" :style="style(i)" @click="change(i)">{{ `${i.value}` }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import GridItem from '../types/GridItem'

@Component
export default class Grid extends Vue {

  private items: Array<GridItem> = [];

  change(i: number): void{
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

  style(i){
    return i.selected ? 'background-color: yellow' : ''
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

  itemsChanged(newVal) {
    let values = []
    for (let item of newVal) {
      values.push(item.value)
    }
    if(this.longestFibonacci(values) >= 5){
      console.log('there is a fibonacci greater than 5 here')
      //Get the indices of the array and change there color
    }
  }

  const longestFibonacci = (arr = []) => {
    const map = arr.reduce((acc, num, index) => {
        acc[num] = index
        return acc
    }, {})
    const memo = arr.map(() => arr.map(() => 0))
    let max = 0
    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
          const a = arr[i]
          const b = arr[j]
          const index = map[b - a]
          if(index < i) {
              memo[i][j] = memo[index][i] + 1
          }
          max = Math.max(max, memo[i][j])
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
:root {
  --grid-cols: 1;
  --grid-rows: 1;
}

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