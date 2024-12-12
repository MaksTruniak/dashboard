<script setup lang="ts">
import {ref} from 'vue';
import {useCardStore} from "~/stores/useCardStore";
import {peopleEnum} from "~/enums/peopleEnum";
import {statusEnum} from "~/enums/statusEnum";
import {priorityEnum} from "~/enums/priorityEnum";
import {type Card} from '@/types/card'
import {generateUUID} from '@/utils/uuid';

const cardsStore = useCardStore();
const props = defineProps(['data'])
const emit = defineEmits(['close']);

const idTask = ref<any>('')
const title = ref<string>('')
const description = ref<string>('')
const selectedResponsibleTask = ref<string>('')
const selectedExecutorTask = ref<string>('')
const selectedStatus = ref<object>({})
const selectedPriority = ref<string>('')


const people = peopleEnum
const statusesStatic = statusEnum
const priority = priorityEnum
const taskId = generateUUID();


function onClose() {
  emit('close')
}

const updateStatus = () => {
  if (props.data.edit) {
    let {titleTask, descriptionTask, responsibleTask, executorTask, status, priority, id} = props.data.edit
    idTask.value = id
    title.value = titleTask
    description.value = descriptionTask
    selectedResponsibleTask.value = responsibleTask
    selectedExecutorTask.value = executorTask
    selectedStatus.value = status
    selectedPriority.value = priority
  } else {
    const foundStatus = statusesStatic.value.find(itemStatus => itemStatus.id === props.data.id);
    if (foundStatus) {
      selectedStatus.value = foundStatus;
    }
  }
}

updateStatus()

const saveTask = () => {
  const id = ref(props.data.edit ? idTask : taskId)
  let data: Card = {
    id: id,
    titleTask: title.value,
    descriptionTask: description.value,
    responsibleTask: selectedResponsibleTask.value,
    executorTask: selectedExecutorTask.value,
    status: selectedStatus.value,
    priority: selectedPriority.value
  }
  cardsStore.setData(data);
  onClose()
};

const deleteTask = () => {
  cardsStore.deleteData(idTask)
  onClose()
}
</script>

<template>
  <UModal :ui="{width: 'lg:max-w-4xl'}">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          {{ props.data.edit ? 'Edit a card' : 'Add a card' }}
          <UButton color="gray"
                   variant="ghost"
                   icon="i-heroicons-x-mark-20-solid"
                   class="-my-1"
                   @click="onClose"
          />
        </div>
      </template>
      <div class="space-y-2">
        <UInput v-model="title" placeholder="Title"/>
        <UTextarea v-model="description" placeholder="Description"/>
        <USelectMenu v-model="selectedResponsibleTask" placeholder="Responsible person" :options="people"/>
        <USelectMenu v-model="selectedExecutorTask" placeholder="Executor of the task" :options="people"/>
        <USelectMenu v-model="selectedStatus" placeholder="Status" :options="statusesStatic"
                     option-attribute="title"/>
        <USelectMenu v-model="selectedPriority" placeholder="Priority" :options="priority"/>
      </div>
      <div class="flex justify-between mt-4">
        <UButton
            :icon="props.data.edit ? 'i-heroicons-pencil' : 'i-heroicons-plus'"
            size="sm"
            color="primary"
            :label="props.data.edit ? 'Edit a card' : 'Add a card'"
            square
            variant="solid"
            class="pr-3"
            @click="saveTask()"
        />
        <UButton v-if="props.data.edit"
                 icon="i-heroicons-trash"
                 size="sm"
                 color="red"
                 label="Delete a card"
                 square
                 variant="solid"
                 class="pr-3"
                 @click="deleteTask()"
        />
      </div>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>