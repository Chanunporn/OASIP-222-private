<script setup>
import BaseNavBar from "./components/BaseNavBar.vue";
</script>

<template>
  <div class="flex">
    <BaseNavBar></BaseNavBar>
    <router-view class="h-screen overflow-auto w-full"></router-view>
  </div>
</template>

<style></style>
