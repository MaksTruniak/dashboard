<script setup>
import {ModalCard} from "#components";
import {useModal} from "#ui/composables/useModal";

const modal = useModal();

defineProps(['card', 'columnId']);

function openModal(data) {
  modal.open(ModalCard, {
    data: data,
    onClose() {
      modal.close()
    }
  })
}
</script>

<template>
  <UCard class="item-card bg-white rounded-md shadow-sm">
    <div class="flex justify-between items-center">
      <span class="item-card__text">{{ card.titleTask }}</span>
      <UButton
          icon="i-heroicons-pencil"
          size="sm"
          color="primary"
          square
          variant="solid"
          @click="openModal({edit:card})"
      />
    </div>
  </UCard>
</template>

<style scoped>
.item-card {
  &:not(:last-child) {
    margin-bottom: 15px;
  }
  &__text{
    word-break: break-all;
    display: block;
    width: calc(100% - 46px);
  }
}
</style>
