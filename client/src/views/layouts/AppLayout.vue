<script setup>
import HeaderBar from '../../components/navigations/HeaderBar.vue';
import SideBar from '../../components/navigations/SideBar.vue';
// import NewSideBar from '../../components/navigations/newSideBar.vue';

</script>

<template>
    <div class="flex overflow-auto">
        <!-- <NewSideBar /> -->
        <SideBar />
        <div class="flex-col w-full">
            <HeaderBar />
            <router-view />
        </div>
    </div>
</template>