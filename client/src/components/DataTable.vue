<script setup>
import SearchForm from "@/components/SearchForm.vue"
import * as heroIcons from "@heroicons/vue/24/outline"
import { ref } from 'vue'
import { useOffsetPagination } from '@vueuse/core'

 const props = defineProps({
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
     },

     modalId: {
        required: false,
        default: '',
        type: String
     },

       delModalId: {
        required: false,
        default: '',
        type: String
     }
 }) 

const data = ref([])
const {
  currentPage,
  currentPageSize,
  pageCount,
  isFirstPage,
  isLastPage,
  prev,
  next,
} = useOffsetPagination({
  total: props.entities.length,
  page: 1,
  pageSize: 10,
  onPageChange: fetchData,
  onPageSizeChange: fetchData,
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

function fetchData({ currentPage, currentPageSize }) {
  fetch(currentPage, currentPageSize).then((responseData) => {
    data.value = responseData
  })
}

 const fetch = (page, pageSize) =>{
  return new Promise ((resolve, reject) => {
    const start = (page - 1) * pageSize
      const end = start + pageSize
     
    resolve(props.entities.slice(start, end))
  })
}
</script>

<template>
     <!-- <div class="gap-x-4 gap-y-2 grid-cols-2 inline-grid items-center">
    <div opacity="50">
      total:
    </div>
    <div>{{ entities.length }}</div>
    <div opacity="50">
      pageCount:
    </div>
    <div>{{ pageCount }}</div>
    <div opacity="50">
      currentPageSize:
    </div>
    <div>{{ currentPageSize }}</div>
    <div opacity="50">
      currentPage:
    </div>
    <div>{{ currentPage }}</div>
    <div opacity="50">
      isFirstPage:
    </div>
    <div>{{ isFirstPage }}</div>
    <div opacity="50">
      isLastPage:
    </div>
    <div>{{ isLastPage }}</div>
  </div>
  <div class="my-4">
    <button :disabled="isFirstPage" @click="prev">
      prev
    </button>
    <button
      v-for="item in pageCount"
      :key="item"
      :disabled="currentPage === item"
      @click="currentPage = item"
    >
      {{ item }}
    </button>
    <button :disabled="isLastPage" @click="next">
      next
    </button>
  </div> -->

  <div class="relative bg-white border rounded-lg">
    <div class="flex items-center justify-between">
        <!-- Search Bar -->
        <p class="font-semibold pr-4 text-gray-700" >عدد الصفوف 
            <span>{{ entities.length }}</span>
        </p>
        <SearchForm @search="handleSearch"/> 
    </div>
      <table class="w-full text-sm text-right text-gray-500">
        <thead class="text-gray-900 uppercase bg-indigo-100">
        <tr>
            <slot v-for="(column, index) in columns" :name="`header_${column.key}`" :header="column">
                <th class="px-4 py-3 font-bold" :key="index" >
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
                <td class="px-4 py-3 text-gray-900" 
                :class="[column.isBold === true ? 'font-bold' : 'font-medium', column.isNumber === true ? 'text-left':'']" :key="`column.${index}`">
                    {{ entity[column.key] }}
                </td>
            </slot>
            <slot name="column_actions" :entity="entity" v-if="isActions">
                <td class="flex items-center justify-end px-4 py-3">
                    <button :data-hs-overlay="`${modalId}`" class="mx-3 active:bg-violet-100 h-7 w-7 rounded-full" @click="onEdit(index)">
                        <heroIcons.PencilIcon class="px-1 h-7 w-7 rounded-full border cursor-pointer text-violet-6500 border-violet-500 hover:text-violet-700 hover:border-violet-700 active:border-violet-700 active:border-2"> </heroIcons.PencilIcon>
                    </button>
                 <button :data-hs-overlay="`${delModalId}`" class="mx-3 active:bg-red-100 h-7 w-7 rounded-full " @click="onDelete(index)">
                        <heroIcons.TrashIcon class="px-1 h-7 w-7 rounded-full border cursor-pointer text-red-500 border-red-500 hover:text-red-600 hover:border-red-600 active:border-red-700 active:border-2"> </heroIcons.TrashIcon>
                    </button>
                </td>

            </slot>
        </tr>
    </table>
  </div>
</template>