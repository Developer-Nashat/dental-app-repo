<!-- eslint-disable no-unused-vars -->
<script setup>
import DataTable from '@/components/DataTable.vue'
import Modal from '@/components/modals/Modal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue';
import ButtonAdd from '@/components/buttons/ButtonAdd.vue'

import { onMounted, computed, ref } from 'vue';
import { HSCopyMarkup as HSStaticMethods } from "preline";
import { Form, Field, ErrorMessage } from 'vee-validate';
import ProblemCatalogService from '../../services/ProblemCatalog.service';
import * as yup from 'yup'
import { useToast } from "vue-toastification";

const toast = useToast();

const title = ref('إضافة مشكلة')
const searchFilter = ref('');
const showModal = ref(false);
const ProblemCatalogs = ref({});
const problemCatalogId = ref(0);
const problemCatalogName = ref('');
const problemCatCount = ref(ProblemCatalogs.value.length)
let isAdd = false;

onMounted(async () => {
    window.HSStaticMethods.autoInit()

    ProblemCatalogs.value = await ProblemCatalogService.getAllProblemsCatalogs();
});

const showDialog = (t) => {
    showModal.value = true;
    title.value = t
    isAdd = true
}
const handleProblemCat = async () => {
    if (isAdd) {
        await ProblemCatalogService.insertProblemCatalog(problemCatalogName.value).then((response) => {
            toast.success(response.data.message)
            isAdd = false;
        }, (error) => {
            toast.error(error.response.data.message)
        })
    } else {
        await ProblemCatalogService.updateProblemCatalog(problemCatalogName.value, problemCatalogId.value).then((response) => {
            toast.success(response.data.message)
        }, (error) => {
            toast.error(error.response.data.message)
        })
    }

    ProblemCatalogs.value = await ProblemCatalogService.getAllProblemsCatalogs();
}

const handleDeleteProblemCat = async () => {
    await ProblemCatalogService.deleteProblemCatalog(problemCatalogId.value).then((response) => {
        toast.success(response.data.message)
    }, (error) => {
        toast.error(error.response.data.message)
    })

    ProblemCatalogs.value = await ProblemCatalogService.getAllProblemsCatalogs();
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

const schema = yup.object().shape({
    problemCatalogName: yup.string().required('يجب ان تدخل اسم المشكلة'),
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

const onEdit = (index) => {
    isAdd = false;
    problemCatalogId.value = ProblemCatalogs.value[index].ProblemCatalogID;
    problemCatalogName.value = ProblemCatalogs.value[index].ProblemCatalogName;
}
const onDelete = (index) => {
    problemCatalogId.value = ProblemCatalogs.value[index].ProblemCatalogID;
}
</script>

<template>
    <div>
        <div class="min-h-screen p-8 mt-10">
            <div class="pb-4 pr-1">
                <ButtonAdd data-hs-overlay="#problem-modal" @click="showDialog('إضافة مشكلة')" />
            </div>

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :modalId="'#problem-modal'" id="problem-modal" :show="showModal" @close="showModal = false"
                    @modified-data="handleProblemCat">
                    <template #title>
                        <h3 class="font-bold text-gray-800 dark:text-white">
                            {{ title }}
                        </h3>
                    </template>
                    <template #body>
                        <div class="mb-4 sm:mb-8">
                            <Form @submit="handleProblemCat" :validation-schema="schema">
                                <label for="problemCatalogName"
                                    class="block mb-2 text-sm font-medium dark:text-white">تصنيف
                                    المشكلة</label>
                                <Field type="text" v-model="problemCatalogName" name="problemCatalogName"
                                    @keyup.enter="$emit('close')"
                                    class="py-3 px-4 block w-full border bg-white focus:outline-none  border-indigo-300 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                                    placeholder="تصنيف المشكلة" />
                                <ErrorMessage name="problemCatalogName"
                                    class="mt-2 pr-2 text-sm text-red-500 dark:text-neutral-500" />
                            </Form>
                        </div>
                    </template>
                    <template #footer>
                        <button type="button" @click="$emit('close')"
                            class=" py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-400 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            data-hs-overlay="#problem-modal">
                            إلغاء
                        </button>
                        <button type="button" @click="handleProblemCat" data-hs-overlay="#problem-modal"
                            class="py-2 px-8 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                            حفظ
                        </button>
                    </template>
                </modal>
            </Teleport>

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <DeleteModal :modalId="'#delete-modal'" id="delete-modal" :show="showModal" @close="showModal = false"
                    @delete-data="handleDeleteProblemCat">
                    <template #title>
                        <p>تأكيد الحذف</p>
                    </template>
                    <template #body>
                        <p>هل انت متأكد من أنك تريد حذف تصنيف المشكلة؟</p>
                    </template>
                </DeleteModal>
            </Teleport>

            <DataTable :modalId="'#problem-modal'" :delModalId="'#delete-modal'" :columns="columns"
                :entities="filteredData" @search="handleSearch" @onEdit="onEdit" @onDelete="onDelete" />
        </div>
    </div>
</template>