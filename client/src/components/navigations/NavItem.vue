<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from "@headlessui/vue"
import * as heroIcons from "@heroicons/vue/24/outline"
import { computed } from "vue";
import SvgIcon from '../../components/svgIcon.vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    item: Object
})

const hasActiveChild = computed(() => {
    function hasActiveItem(items) {
        return items.some(item => item.active || hasActiveItem(item.children))
        // return items.some(item => item.active)
    }

    return hasActiveItem(props.item.children)
}) 
</script>

<template>
    <Router-link v-if="!item.children.length"
        :class="['group flex rounded-md items-center hover:text-gray-200 py-2 px-3 text-sm', 'hover:bg-indigo-950 cursor-pointer', item.active ? 'text-white font-bold' : 'text-indigo-200 font-medium']"
        :to="`${item.href}`">
        <SvgIcon :style="['shrink-0 ml-2 group-hover:text-indigo-200'
        , item.active ? 'text-white font-bold' : 'text-indigo-300 font-medium']" :name="item.icon" v-if="item.icon">
        </SvgIcon>
        <span class="mr-2"> {{ item.label }}</span>

    </Router-link>

    <Disclosure v-else v-slot="{ open }" :default-open="hasActiveChild">
        <DisclosureButton
            :class="['group text-right hover:text-indigo-300 flex w-full rounded-md items-center py-2 px-3 text-sm hover:bg-indigo-950', open ? 'font-semibold text-white hover:text-gray-100 ' : 'font-medium text-indigo-200']">
            <SvgIcon
                :style="['shrink-0 ml-2 ', open ? 'text-white group-hover:text-indigo-100' : 'text-indigo-300 group-hover:text-indigo-400']"
                :name="item.icon" v-if="item.icon">
            </SvgIcon>
            <span class="flex-1 mr-2"> {{ item.label }}</span>
            <router-link :to="`${item.href}`"></router-link>

            <heroIcons.ChevronDownIcon class="overflow-hidden transition-all duration-500 ease-in-out"
                :class="['w-6 h-6 shrink-0', open ? '-rotate-180 text-white' : 'text-gray-200']" />
        </DisclosureButton>

        <Transition name="slide-fade" mode="out-in">
            <DisclosurePanel class="overflow-hidden ">
                <NavItem v-for=" child in item.children" :item="child" :key="child.label">
                </NavItem>
            </DisclosurePanel>
        </Transition>
    </Disclosure>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-in-out;
    /* transition-delay: 0.2s; */
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>