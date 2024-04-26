<script setup>
import DataTable from '@/components/DataTable.vue';
import Modal from '@/components/Modal.vue'
import ButtonAdd from '@/components/buttons/ButtonAdd.vue'

import { computed, ref } from 'vue';

const searchFilter = ref('');
const showModal = ref(false);

const columns = [
    {
        key: "id",
        label: "Id"
    },
    {
        key: "name",
        label: "Name"
    },
    {
        key: "description",
        label: "Description"
    },
    {
        key: "price",
        label: "Price"
    }
]
const entities = [
    { id: '01', name: 'Coffee', description: 'Coffee...', price: '4' },
    { id: '02', name: 'Chocolate', description: 'Chocolate...', price: '3' },
    { id: '03', name: 'Ice Coffee', description: 'Ice Coffee...', price: '7' }
]

const filteredData = computed(() => {
    if (searchFilter.value !== '') {
        return entities.filter(entity => entity.name.toLowerCase().includes(searchFilter.value))
    }

    return entities;
});

const handleSearch = (search) => {
    searchFilter.value = search;
}
</script>

<template>
    <div>
        <div class="min-h-screen p-8 bg-gray-50">
            <ButtonAdd />

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :show="showModal" @close="showModal = false">
                    <template #header>
                        <h3>custom header</h3>
                    </template>
                </modal>
            </Teleport>

            <h3>Product List</h3>
            <DataTable :columns="columns" :entities="filteredData" @search="handleSearch" @onEdit="onEdit"
                @onDelete="onDelete" />
        </div>
    </div>
</template>