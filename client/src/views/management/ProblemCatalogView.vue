<script setup>
import DataTable from '@/components/DataTable.vue'
import Modal from '@/components/modals/Modal.vue'
import ButtonAdd from '@/components/buttons/ButtonAdd.vue'

import { onMounted, computed, ref } from 'vue';
import { HSCopyMarkup as HSStaticMethods } from "preline";
import { Form, Field, ErrorMessage } from 'vee-validate';
import ProblemCatalogService from '../../services/ProblemCatalog.service';
import * as yup from 'yup'

const title = ref('إضافة مشكلة')
const searchFilter = ref('');
const showModal = ref(false);
const ProblemCatalogs = ref({});
const problemCatalogName = ref('');

onMounted(async () => {
    window.HSStaticMethods.autoInit()

    ProblemCatalogs.value = await ProblemCatalogService.getAllProblemsCatalogs();


});

const showDialog = (t) => {
    showModal.value = true;
    title.value = t
}
const handleProblemCat = (isAdd) => {
    if (isAdd) {
        const result = ProblemCatalogService.insertProblemCatalog(problemCatalogName)

        console.log(result)
    }
}

const columns = [
    {
        key: "ProblemCatalogID",
        label: "رقم تصنيف المشكلة"
    },
    {
        key: "ProblemCatalogName",
        label: "تصنيف المشكلة"
    }
]
const entities = [
    { id: '01', name: 'Coffee', description: 'Coffee...', price: '433.03' },
    { id: '02', name: 'Chocolate', description: 'Chocolate...', price: '344.44' },
    { id: '03', name: 'Ice Coffee', description: 'Ice Coffee...', price: '743,4' }
]

const schema = yup.object().shape({
    problemName: yup.string().required('يجب ان تدخل اسم المشكلة'),
});

const filteredData = computed(() => {
    if (searchFilter.value !== '') {
        return ProblemCatalogs.value.filter(ProblemCatalog => ProblemCatalog.ProblemCatalogName.toLowerCase().includes(searchFilter.value))
    }

    return ProblemCatalogs.value;
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
                        <h3 class="font-bold text-gray-800 dark:text-white">
                            {{ title }}
                        </h3>
                    </template>
                    <template #body>
                        <Form @submit="handleProblemCat(true)" :validation-schema="schema">
                            <div class="mb-4 sm:mb-8">
                                <label for="problem-name" class="block mb-2 text-sm font-medium dark:text-white">تصنيف
                                    المشكلة</label>
                                <Field type="text" id="problem-name" v-model="problemCatalogName"
                                    name="problemCatalogName"
                                    class="py-3 px-4 block w-full border bg-white focus:outline-none  border-indigo-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                                    placeholder="تصنيف المشكلة" />
                                <ErrorMessage name="problem-name"
                                    class="mt-2 pr-2 text-sm text-red-500 dark:text-neutral-500" />
                            </div>
                        </Form>
                    </template>
                </modal>
            </Teleport>

            <h3>Problems List</h3>

            <DataTable :modalId="'#problem-modal'" :columns="columns" :entities="filteredData" @search="handleSearch"
                @onEdit="onEdit" @onDelete="onDelete" />
        </div>
    </div>
</template>