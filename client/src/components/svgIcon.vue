<script setup>
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    style: {
        type: [Array, Object]
    }
})
const dynamicComponent = computed(() => {
    const name = props.name;

    return defineAsyncComponent(() => import(`./icons/${name}.vue`));
});
</script>

<template>
    <component :is="dynamicComponent" :class="'style'" />
</template>