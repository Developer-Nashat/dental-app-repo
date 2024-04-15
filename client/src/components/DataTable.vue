<script setup>
import SearchForm from "@/components/SearchForm.vue"
import * as heroIcons from "@heroicons/vue/24/outline"


 defineProps({
    columns: {
        required: true
    },
    entities: {
        required: true
    },
    isActions: {
        required: false,
        default: true,
        type: Boolean
    }
})

const emit = defineEmits(['onEdit', 'onDelete','search'])

const onEdit = (entity) => {
    emit('onEdit', entity);
}

const onDelete = (entity) => {
    emit('onDelete', entity);
}

const handleSearch = (search) => {
    emit('search', search)
} 
</script>

<template>
  <div class="relative bg-white border rounded-lg">
    <div class="flex items-center justify-end">
        <!-- Search Bar -->
        <SearchForm @search="handleSearch"/>
    </div>
      <table class="w-full text-sm text-right text-gray-500">
        <thead class="text-gray-900 uppercase bg-indigo-100">
        <tr>
            <slot v-for="(column, index) in columns" :name="`header_${column.key}`" :header="column">
                <th class="px-4 py-3" :key="index" 
                 :class="[index == 1 ? 'font-bold' : 'font-medium']">
                    {{ column.label }}
                </th>
            </slot>
            <slot name="header.action" v-if="isActions">
                <th class="px-4 py-3">
                    <span class="sr-only">Action</span>
                </th>
            </slot>
        </tr>
    </thead>
        <tr class="border-b" v-for="(entity, index) in entities" :key="`entity.${index}`">
            <slot v-for="(column, index) in columns" :name="`column_${column.key}`" :entity="entity">
                <td class="px-4 py-3 text-gray-900" :class="[index === 1 ? 'font-bold' : 'font-medium']" :key="`column.${index}`">
                    {{ entity[column.key] }}
                </td>
            </slot>
            <slot name="column_actions" :entity="entity" v-if="isActions">
                <td class="flex items-center justify-end px-4 py-3">
                    <button class="mx-3 active:bg-violet-100 h-7 w-7 rounded-full" @click="onEdit(entity)">
                        <heroIcons.PencilIcon class="px-1 h-7 w-7 rounded-full border cursor-pointer text-violet-6500 border-violet-500 hover:text-violet-700 hover:border-violet-700 active:border-violet-700 active:border-2"> </heroIcons.PencilIcon>
                    </button>
                 <button class="mx-3 active:bg-red-100 h-7 w-7 rounded-full " @click="onDelete(entity)">
                        <heroIcons.TrashIcon class="px-1 h-7 w-7 rounded-full border cursor-pointer text-red-500 border-red-500 hover:text-red-600 hover:border-red-600 active:border-red-700 active:border-2"> </heroIcons.TrashIcon>
                    </button>
                </td>

            </slot>
        </tr>
    </table>
  </div>
</template>