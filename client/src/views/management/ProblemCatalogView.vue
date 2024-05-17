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
let isAdd = false;

onMounted(async () => {
    await window.HSStaticMethods.autoInit()

    ProblemCatalogs.value = await ProblemCatalogService.getAllProblemsCatalogs();
    console.log(typeof ProblemCatalogs.value)
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
        label: "رقم التصنيف",
        isBold: false,
        isNumber: false
    },
    {
        key: "ProblemCatalogName",
        label: "تصنيف المشكلة",
        isBold: true,
        isNumber: false
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
    <div class="min-h-screen mt-16">
        <div class="px-8 py-4">

            <div class="flex justify-between px-1 pb-4 item-center">
                <h1 class="text-2xl font-semibold leading-relaxed text-indigo-700">تصنيف المشاكل</h1>

                <ButtonAdd data-hs-overlay="#problem-modal" @click="showDialog('إضافة مشكلة')" />
            </div>

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <modal :modalId="'#problem-modal'" id="problem-modal" @close="showModal = false"
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
                                    class="block w-full px-4 py-3 text-sm bg-white border border-indigo-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                                    placeholder="تصنيف المشكلة" />
                                <ErrorMessage name="problemCatalogName"
                                    class="pr-2 mt-2 text-sm text-red-500 dark:text-neutral-500" />
                            </Form>
                        </div>
                    </template>
                    <template #footer>
                        <button type="button" @click="$emit('close')"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-400 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            data-hs-overlay="#problem-modal">
                            إلغاء
                        </button>
                        <button type="button" @click="handleProblemCat" data-hs-overlay="#problem-modal"
                            class="inline-flex items-center px-8 py-2 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg gap-x-2 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none">
                            حفظ
                        </button>
                    </template>
                </modal>
            </Teleport>

            <Teleport to="body">
                <!-- use the modal component, pass in the prop -->
                <DeleteModal :modalId="'#delete-modal'" id="delete-modal" @close="showModal = false"
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