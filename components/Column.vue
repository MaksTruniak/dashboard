<script setup>
import { useModal } from "#ui/composables/useModal";
import { defineProps } from 'vue';
import { ModalCard } from '#components';
import {statusEnum} from "~/enums/statusEnum";
import draggable from 'vuedraggable';

const props = defineProps(['columns', 'column', 'boardState']);

const modal = useModal();

const statusesStatic = statusEnum

const openModal = (data) => {
  modal.open(ModalCard, {
    data: data,
    onClose() {
      modal.close();
    }
  });
};

const updateTaskStatus = () => {
  props.columns.forEach((column) => {
    column.cards.forEach((task) => {
      task.status = statusesStatic.value.find(item => item.id === column.id);
    });
  });
};

</script>

<template>
  <div class="column">
    <h3>{{ column.title }}</h3>
    <div class="cards mt-4 mb-4">
      <draggable
          v-model="column.cards"
          group="tasks"
          @end="updateTaskStatus"
          class="task-list"
          item-key="id"
      >
        <template #item="{ element }">
          <Card
              :key="element.id"
              :card="element"
              :columnId="column.id"
          />
        </template>
      </draggable>
    </div>
    <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        label="Add a card"
        square
        variant="solid"
        class="pr-3"
        @click="openModal(column)"
    />
  </div>
</template>

<style scoped>
.column {
  background: #f4f5f7;
  border-radius: 8px;
  padding: 16px;
  width: 300px;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
