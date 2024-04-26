<script setup>
import DataTable from '@/components/DataTable.vue'
import Modal from '@/components/Modal.vue'
import ButtonAdd from '@/components/buttons/ButtonAdd.vue'

import { onMounted, computed, ref } from 'vue';
import { HSCopyMarkup as HSStaticMethods } from "preline";
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup'

onMounted(() => {
    window.HSStaticMethods.autoInit()
});

const title = ref('إضافة مشكلة')
const searchFilter = ref('');
const showModal = ref(false);

const ModelId = ref('#problem-model');

const showDialog = (t) => {
    showModal.value = true;
    title.value = t
}

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
    { id: '01', name: 'Coffee', description: 'Coffee...', price: '433.03' },
    { id: '02', name: 'Chocolate', description: 'Chocolate...', price: '344.44' },
    { id: '03', name: 'Ice Coffee', description: 'Ice Coffee...', price: '743,4' }
]

const name = ref('');
const descraption = ref('');
const price = ref(0.0);


const schema = yup.object().shape({
    name: yup.string().required('يجب ان تدخل اسم المشكلة'),
});

const filteredData = computed(() => {
    if (searchFilter.value !== '') {
        return entities.filter(entity => entity.name.toLowerCase().includes(searchFilter.value))
    }

    return entities;
});

const handleSearch = (search) => {
    searchFilter.value = search;
}

const onEdit = (edit) => {
}
</script>

<template>
    <div>
        <div class="min-h-screen p-8">
            <ButtonAdd data-hs-overlay="#problem-modal" @click="showDialog('إضافة مشكلة')" />

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :modalId="'#problem-modal'" id="problem-modal" :show="showModal" @close="showModal = false">
                    <template #title>
                        {{ title }}
                    </template>
                    <template #body>
                        <h3>Data</h3>
                    </template>
                </modal>
            </Teleport>

            <h3>Problems List</h3>

            <DataTable :modalId="'#problem-modal'" :columns="columns" :entities="filteredData" @search="handleSearch"
                @onEdit="onEdit" @onDelete="onDelete" />
        </div>
    </div>
</template>