<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import * as heroIcons from "@heroicons/vue/24/outline"
import { sidebar } from '../../stores/sidebarIsOpen';

</script>
<template>
    <div
        class="flex justify-between md:justify-end px-3 items-center md:px-6 md:space-x-6 space-x-3 bg-white border-b shadow-sm h-12 mr-64">
        <button type="button" value="open Sidebar" @click="sidebar.setIsOpened(true)"
            class="flex-shrink-0 flex items-center justify-center md:hidden">
            <heroIcons.Bars3Icon class="h-6 w-6"></heroIcons.Bars3Icon>
        </button>
        <Menu as="div" class="relative">
            <MenuButton
                class="focus:border-indigo-700 focus:ring-1 focus:ring-offset-1 focus:ring-indigo-700 rounded-full">
                <heroIcons.UserCircleIcon class="text-indigo-700 w-8 h-8 rounded-full"></heroIcons.UserCircleIcon>
            </MenuButton>
            <Transition name="slide-fade">
                <MenuItems
                    class="origin-top-left focus:border-indigo-700 absolute left-0 bg-white rounded-md shadow-lg border w-48 mt-2 z-20">
                    <MenuItem v-slot="{ active }">
                    <router-link to="/profile" :class="{ 'bg-indigo-100 font-semibold': active }"
                        class="block px-4 py-2 text-sm text-indigo-700 rounded-md">Profile</router-link>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <router-link to="/logout" :class="{ 'bg-indigo-100 font-semibold': active }"
                        class="block px-4 py-2 text-sm text-indigo-700 rounded-md">Logout</router-link>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    </div>
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