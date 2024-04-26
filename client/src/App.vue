<script setup>
import { onMounted } from 'vue';
import { HSCopyMarkup as HSStaticMethods } from "preline";

onMounted(() => {
  window.HSStaticMethods.autoInit()
});
</script>

<template>
  <div class="bg-gray-100">
    <router-view />
  </div>
</template>