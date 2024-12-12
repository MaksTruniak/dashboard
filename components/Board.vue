<script setup>
import {ref, watch} from 'vue';
import {useCardStore} from "~/stores/useCardStore";
import {statusEnum} from "~/enums/statusEnum";

const cardStore = useCardStore();
const {data} = storeToRefs(cardStore);


const columns = ref(statusEnum);


watch(data, (newTask) => {
  if (Array.isArray(newTask)) {
    columns.value = columns.value.map(column => {
      const filteredTask = newTask.filter(task => task.status.id === column.id);
      return {
        ...column,
        cards: filteredTask,
      };
    });
  }
}, {deep: true});

</script>

<template>
  <div class="board">
    <Column v-for="column in columns" :key="column.id" :column="column" :columns="columns"/>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  gap: 16px;
  padding: 16px;
}
</style>
