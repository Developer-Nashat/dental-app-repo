<script setup>
const emit = defineEmits(['search'])

const search = (e) => {
    emit('search', e.target.value);
};

</script>

<template>
    <div>
        <form class="py-3 px-4 flex items-center">
            <label for="search" class="sr-only">بحث</label>
            <div class="relative w-full">
                <input id="search"
                    class="bg-white border w-72 text-gray-900 text-right pr-10 pl-4 py-1 rounded-lg font-medium focus:outline-none focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300"
                    type="text" @input="search" placeholder="بحث">
                <div class="absolute inset-y-0 right-0 pr-3  
                    flex items-center  
                    pointer-events-none">
                    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="#94a3b8" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15C11.381 15 12.6296 14.4415 13.5355 13.5355C14.4415 12.6296 15 11.381 15 10C15 7.23858 12.7614 5 10 5ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 11.5719 16.481 13.0239 15.6063 14.1921L20.7071 19.2929C21.0976 19.6834 21.0976 20.3166 20.7071 20.7071C20.3166 21.0976 19.6834 21.0976 19.2929 20.7071L14.1921 15.6063C13.0239 16.481 11.5719 17 10 17C6.13401 17 3 13.866 3 10Z"
                            fill="#94a3b8" />
                    </svg>
                </div>
            </div>
        </form>
    </div>
</template>