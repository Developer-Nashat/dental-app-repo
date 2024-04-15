<script setup>
import HeaderBar from '../../components/navigations/HeaderBar.vue';
import SideBar from '../../components/navigations/SideBar.vue'; 
</script>

<template>
    <div class="flex overflow-auto">
        <SideBar />
        <div class="flex-col w-full">
            <HeaderBar />
            <router-view />
        </div>
    </div>
</template>