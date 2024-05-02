<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->

<script setup>
import { onMounted } from 'vue';
import { HSCopyMarkup as HSStaticMethods } from "preline";

onMounted(() => {
    // window.addEventListener("keydown", onKeyDown)
    window.HSStaticMethods.autoInit()
});

defineProps({
    show: Boolean,

    modalId: {
        required: false,
        default: '',
        type: String
    },
})

const emit = defineEmits(['modifiedData'])

const modifiedData = () => {

    emit('modifiedData');
};
</script>

<template>
    <div
        class="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto hs-overlay-backdrop-open:bg-indigo-950/90 [--overlay-backdrop:static]">
        <div
            class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
            <div
                class="w-full max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div class="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                    <slot name='title'>Default Title</slot>

                    <button type="button" @click="$emit('close')"
                        class="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
                        :data-hs-overlay="`${modalId}`">
                        <span class="sr-only">Close</span>
                        <svg class="flex-shrink-0 size-4 text-gray-500 hover:text-red-600"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="p-4 overflow-y-auto">
                    <slot name="body">
                        Default Body
                    </slot>
                </div>
                <div
                    class="flex justify-end items-center gap-x-2 py-3 px-4 border-t bg-gray-50 dark:border-neutral-700">
                    <slot name="footer">

                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>