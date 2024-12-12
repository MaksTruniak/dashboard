<script setup>
import Board from '~/components/Board.vue';
</script>

<template>
  <div class="dashboard-page">
    <h1>My Trello Clone</h1>
    <Board />
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 16px;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 16px;
  text-align: center;
}
</style>
