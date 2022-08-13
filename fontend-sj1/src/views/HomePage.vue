<script setup>
import Home from "../components/Home.vue";
import { ref, onBeforeMount } from "vue";

// get List Event
let list = ref([]);
const getList = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
  if (res.status === 200) {
    list.value = await res.json();
  } else console.log("Not Found");
};

// get Category List
let eventCategoryList = ref([]);
const getListCategory = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`);
  res.status === 200
    ? (eventCategoryList.value = await res.json())
    : console.log("not found");
};
onBeforeMount(async () => {
  await getList();
  await getListCategory();
});
</script>

<template>
  <Home :eventList="list" :categoryList="eventCategoryList" />
</template>

<style></style>
