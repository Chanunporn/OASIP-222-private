<script setup>
import ShowEventList from "../components/showEventList.vue";
import DetailEvent from "../components/DetailEvent.vue";
import moment from "moment";
import { ref, onBeforeMount } from "vue";

// get EventList
let list = ref([]);
const getList = async () => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/events`);
  if (res.status === 200) {
    list.value = await res.json();
    list.value.sort((a, b) => b.eventStartTime.localeCompare(a.eventStartTime));
  } else console.log("Not Found");
};

// get CategoryList
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

// delete Method
const deleteEvent = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${id}`, {
    method: "DELETE",
  });
  if (res.status == 200) {
    list.value = list.value.filter((list) => list.id != id);
    console.log("delete successfully");
  } else console.log("error, cannot delete");
};

// PUT Method
const updateEvent = async (detail, date) => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/events/${detail.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventStartTime: date,
      eventNotes: detail.eventNotes.value,
    }),
  });
  if (res.status == 200) {
    const update = await res.json();
    list.value.map((event) => {
      if (event.id == update.id) {
        event.eventNotes = update.eventNotes;
        event.eventStartTime = update.eventStartTime;
      }
    });
    console.log("updated successfully");
    console.log(detail);
  }
};

// Change EventList To Show Detail
let statusShowDetail = ref();
let detail = ref({});
const listToDetail = (event, status) => {
  detail.value = event;
  statusShowDetail.value = status;
};
</script>

<template>
  <div>
    <ShowEventList :eventList="list" @detail="listToDetail" />
    <DetailEvent
      :eventList="list"
      :categoryList="eventCategoryList"
      :detailList="detail"
      :statusDetail="statusShowDetail"
      @delete="deleteEvent"
      @save="updateEvent"
    />
  </div>
</template>

<style></style>
