<script setup>
import SearchForm from "@/components/SearchForm.vue"
import * as heroIcons from "@heroicons/vue/24/outline"
import { computed, ref } from "vue";

let page = ref(1);
const perPage = 10;

const props = defineProps({
  columns: {
    required: true
  },
  entities: {
    type: Array,
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

const emit = defineEmits(['onEdit', 'onDelete', 'search'])

const onEdit = (entity) => {
  emit('onEdit', entity);
}

const onDelete = (entity) => {
  emit('onDelete', entity);
}

const handleSearch = (search) => {
  emit('search', search)
}
const paginatedData = computed(() => {

  let result = [];
  for (const entity in props.entities)
    result.push([props.entities[entity]]);
  result = result.slice((page.value - 1) * perPage, page.value * perPage)

  // console.log("Result Length = " + result.length);
  // console.log(result);
  // console.log(result);
  // console.log(props.entities);

  return result
}
);

const fromJson = (val, name) => {
  const data = JSON.parse(JSON.stringify(val)); 
  return data[0][name];
}
</script>

<template>

  <div class="relative bg-white border rounded-lg">
    <div class="flex items-center justify-between">
      <!-- Search Bar -->
      <p class="pr-4 font-semibold text-indigo-700">عدد الصفوف
        <span>{{ paginatedData.length }}</span>
      </p>
      <SearchForm @search="handleSearch" />
    </div>
    <table class="w-full text-sm text-right text-gray-500">
      <thead class="text-gray-900 uppercase bg-indigo-100">
        <tr>
          <slot v-for="(column, index) in columns" :name="`header_${column.key}`" :header="column">
            <th class="px-4 py-3 font-bold" :key="index">
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
      <tr class="border-b" v-for="(entity, index) in paginatedData" :key="`entity.${index}`">
        <slot v-for="(column, index) in columns" :name="`column_${column.key}`" :entity="entity">
          <td class="px-4 py-3 text-gray-900"
            :class="[column.isBold === true ? 'font-bold' : 'font-medium', column.isNumber === true ? 'text-left' : '']"
            :key="`column.${index}`">
            <!-- {{ entity[index] }} -->
            <!-- {{ paginatedData[index] }} -->
            <!-- {{ entity[index] }} -->
            {{ fromJson(entity, column.key) }}
          </td>
        </slot>
        <slot name="column_actions" :entity="entity" v-if="isActions">
          <td class="flex items-center justify-end px-4 py-3">
            <button :data-hs-overlay="`${modalId}`" class="mx-3 rounded-full active:bg-violet-100 h-7 w-7"
              @click="onEdit(index)">
              <heroIcons.PencilIcon
                class="px-1 border rounded-full cursor-pointer h-7 w-7 text-violet-6500 border-violet-500 hover:text-violet-700 hover:border-violet-700 active:border-violet-700 active:border-2">
              </heroIcons.PencilIcon>
            </button>
            <button :data-hs-overlay="`${delModalId}`" class="mx-3 rounded-full active:bg-red-100 h-7 w-7 "
              @click="onDelete(index)">
              <heroIcons.TrashIcon
                class="px-1 text-red-500 border border-red-500 rounded-full cursor-pointer h-7 w-7 hover:text-red-600 hover:border-red-600 active:border-red-700 active:border-2">
              </heroIcons.TrashIcon>
            </button>
          </td>

        </slot>
      </tr>
    </table>
  </div>
</template>