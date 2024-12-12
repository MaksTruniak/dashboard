import { defineStore } from 'pinia';
import {type Card} from '@/types/card'

export const useCardStore = defineStore('card', {
    state: () => ({
        data: [] as Card[],
    }),

    actions: {
        setData(newData: Card) {
            const existingCardIndex = this.data.findIndex((item) => item.id === newData.id.value);

            if (existingCardIndex !== -1) {
                this.data[existingCardIndex] = newData;
            } else {
                this.data.push(newData);
            }
        },
        deleteData(id: any){
            this.data = this.data.filter(item => item.id !== id.value)
        }
    },
});
