<script setup>
import HeaderBar from '../../components/navigations/HeaderBar.vue';
import SideBar from '../../components/navigations/SideBar.vue';
// import NewSideBar from '../../components/navigations/newSideBar.vue';

</script>

<template>
    <div class="flex overflow-auto">
        <!-- <NewSideBar /> -->
        <SideBar />
        <div class=" flex-col w-full">
            <HeaderBar class="fixed top-0 left-0 right-0 z-20" />
            <router-view />
        </div>
    </div>
</template>