<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogOverlay } from '@headlessui/vue'
import AppLogo from "@/components/App-Logo.vue"
import NavItem from "@/components/navigations/NavItem.vue"
import * as heroIcons from "@heroicons/vue/24/outline"
import { sidebar } from '../../stores/sidebarIsOpen';
import navItems from '../../navItems';

</script>

<template>
    <div class="flex min-h-screen">

        <!-- Mobile sidebar -->
        <TransitionRoot :show="sidebar.isOpened">
            <Dialog as="div" @close="sidebar.setIsOpened(false)" class="fixed inset-0 z-40 md:hidden">
                <TransitionChild as="template" enter="transaction ease-in-out duration-200 transform"
                    enter-from="translate-x-full" enter-to="-translate-x-0"
                    leave="transaction ease-in-out duration-200 transform" leave-from="-translate-x-0"
                    leave-to="translate-x-full">
                    <div
                        class="relative z-10 flex flex-col h-full py-4 border-r border-indigo-300 bg-gradient-to-t from-indigo-600 via-indigo-800 to-indigo-900 md:hidden w-72 shrink-0">
                        <button @click="sidebar.setIsOpened(false)"
                            class="absolute flex items-center justify-center w-10 h-10 rounded-full top-2 right-2 focus:outline-none focus:ring-2 focus: ring-gray-600"
                            type="button" value="Close sidebar">
                            <heroIcons.XMarkIcon class="w-6 h-6" />
                        </button>
                        <!-- Put Logo here -->
                        <div class="px-6 pt-8 pb-4">
                            <router-Link class="inline-block" to="/">
                                <AppLogo class="w-48 h-9" />
                            </router-Link>
                        </div>

                        <div class="flex-1 overflow-y-auto">
                            <nav aria-label class="px-2 mt-2">
                                <NavItem :item="item" v-for="item in navItems" :key="item.label">
                                </NavItem>
                            </nav>
                        </div>
                    </div>
                </TransitionChild>
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-200"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-200"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-50"></DialogOverlay>
                </TransitionChild>
            </Dialog>
        </TransitionRoot>

        <!-- Desktop Sidebar -->
        <div
            class="hidden w-64 py-4 border-l border-gray-600 bg-gradient-to-t from-indigo-600 via-indigo-800 to-indigo-900 md:block shrink-0">

            <!-- Put Logo here -->
            <div class="px-4"><router-Link class="inline-block" to="/">
                    <AppLogo class="w-48 h-9" />
                </router-Link></div>

            <div>
                <nav aria-label class="px-2 mt-2">
                    <NavItem :item="item" v-for="item in navItems" :key="item.label">
                    </NavItem>
                </nav>
            </div>
        </div>
    </div>
</template>