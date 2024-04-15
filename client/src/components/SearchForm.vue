<script setup>
const emit = defineEmits(['search'])

const search = (e) => {
    emit('search', e.target.value);
};

</script>

<template>
    <div>
        <form class="py-3 px-4 flex items-center">
            <label class="sr-only">Search</label>
            <div class="relative w-full">
                <input
                    class="bg-white border text-gray-900 text-left px-2 py-1 rounded-lg font-medium focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
                    type="text" @input="search" placeholder="search">
            </div>
        </form>
    </div>
</template>