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
        :class="['group flex rounded-md items-center text-orange-200 hover:text-orange-300 py-2 px-3 text-sm', 'hover:bg-indigo-950 cursor-pointer', item.active ? 'text-orange-300 font-bold' : 'text-orange-200 font-medium']"
        :to="`${item.href}`">

        <component :class="['w-6 h-6 shrink-0 ml-2 text-orange-200 group-hover:text-orange-300'
        , item.active ? 'text-orange-100 font-bold' : 'text-orange-200 font-medium']" :is="heroIcons[item.icon]"
            v-if="item.icon"></component>
        <span> {{ item.label }}</span>

    </Router-link>

    <Disclosure v-else v-slot="{ open }" :default-open="hasActiveChild">
        <DisclosureButton
            :class="['group text-right text-orange-200 hover:text-orange-300 flex w-full rounded-md items-center py-2 px-3 text-sm hover:bg-indigo-950', open ? 'font-semibold text-orange-300 ' : 'font-medium text-orange-200']">
            <component
                :class="['w-6 h-6 shrink-0 ml-2 text-orange-200 group-hover:text-orange-300', open ? 'text-orange-400' : 'text-orange-200']"
                :is="heroIcons[item.icon]" v-if="item.icon"></component>
            <span class="flex-1"> {{ item.label }}</span>
            <router-link :to="`${item.href}`"></router-link>

            <heroIcons.ChevronDownIcon class="transition-all duration-1000 overflow-hidden"
                :class="['w-6 h-6 shrink-0', open ? '-rotate-180 text-orange-300' : 'text-orange-200']" />
        </DisclosureButton>

        <Transition name="slide-fade" mode="out-in">
            <DisclosurePanel class=" mr-2 ml-2 overflow-hidden">
                <NavItem v-for=" child in item.children" :item="child" :key="child.label">
                </NavItem>
            </DisclosurePanel>
        </Transition>
    </Disclosure>
</template>
