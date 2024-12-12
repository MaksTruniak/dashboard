import { ref } from 'vue';
import {type Status } from '@/types/status'

export const statusEnum = ref<Status[]>([
    { id: 'isToDo', title: 'To Do' },
    { id: 'isInProgress', title: 'In Progress' },
    { id: 'isDone', title: 'Done' }
]);