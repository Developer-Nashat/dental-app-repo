<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from "@headlessui/vue"
import * as heroIcons from "@heroicons/vue/24/outline"
import { computed } from "vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    item: Object
})

const hasActiveChild = computed(() => {
    function hasActiveItem(items) {
        return items.some(item => item.active || hasActiveItem(item.children))
    }

    return hasActiveItem(props.item.children)
}) 
</script>

<template>
    <Router-link v-if="!item.children.length"
        :class="['group flex rounded-md items-center hover:text-gray-200 py-2 px-3 text-sm', 'hover:bg-indigo-950 cursor-pointer', item.active ? 'text-white font-bold' : 'text-gray-400 font-medium']"
        :to="`${item.href}`">

        <component :class="['w-6 h-6 shrink-0 ml-2 group-hover:text-gray-300'
        , item.active ? 'text-white font-bold' : 'text-gray-400 font-medium']" :is="heroIcons[item.icon]"
            v-if="item.icon">
        </component>
        <span> {{ item.label }}</span>

    </Router-link>

    <Disclosure v-else v-slot="{ open }" :default-open="hasActiveChild">
        <DisclosureButton
            :class="['group text-right hover:text-gray-300 flex w-full rounded-md items-center py-2 px-3 text-sm hover:bg-indigo-950', open ? 'font-semibold text-white hover:text-gray-100 ' : 'font-medium text-gray-400']">
            <component
                :class="['w-6 h-6 shrink-0 ml-2 ', open ? 'text-white group-hover:text-gray-100' : 'text-gray-400 group-hover:text-gray-400']"
                :is="heroIcons[item.icon]" v-if="item.icon"></component>
            <span class="flex-1"> {{ item.label }}</span>
            <router-link :to="`${item.href}`"></router-link>

            <heroIcons.ChevronDownIcon class="transition-all duration-1000 overflow-hidden"
                :class="['w-6 h-6 shrink-0', open ? '-rotate-180 text-white' : 'text-gray-200']" />
        </DisclosureButton>

        <Transition name="slide-fade" mode="out-in">
            <DisclosurePanel class=" mr-2 ml-2 overflow-hidden">
                <NavItem v-for=" child in item.children" :item="child" :key="child.label">
                </NavItem>
            </DisclosurePanel>
        </Transition>
    </Disclosure>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-in-out;
    /* transition-delay: 0.2s; */
}

.slide-fade-leave-active {
    transition: all 0.3s;
    /* transition-delay: 0.2s; */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>