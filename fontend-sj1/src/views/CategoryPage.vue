<script setup>
import Category from "../components/showCategory.vue";
import { ref, computed, onBeforeMount } from "vue";

// get CategoryList
let eventCategoryList = ref([]);
const getListCategory = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/categories`);
  if (res.status === 200) {
    eventCategoryList.value = await res.json();
    eventCategoryList.value.sort((a, b) => b.id - a.id);
  }
};
onBeforeMount(async () => {
  await getListCategory();
});

// PUT Method
const updateCategory = async (category) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/categories/${category.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventCategoryName: category.eventCategoryName.value.trim(),
      eventDuration: category.eventDuration,
      eventCategoryDescription: category.eventCategoryDescription.value,
    }),
  });
  if (res.status == 200) {
    const update = await res.json();
    eventCategoryList.value.map((categoryList) => {
      if (categoryList.id == update.id) {
        categoryList.eventCategoryName = update.eventCategoryName;
        categoryList.eventDuration = update.eventDuration;
        categoryList.eventCategoryDescription = update.eventCategoryDescription;
      }
    });
    console.log("updated successfully");
  }
};
</script>

<template>
  <Category :categoryList="eventCategoryList" @save="updateCategory" />
</template>

<style></style>
