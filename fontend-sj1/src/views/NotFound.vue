<script setup>
import { useRouter } from "vue-router";
const appRouter = useRouter();
const goHome = () => {
  appRouter.push({ name: "HomePage" });
};
</script>
<template>
  <div class="font-poppin">
    <div class="mt-40">
      <img
        src="../../public/images/illustration/notfound.png"
        class="w-4/12 h-max mx-auto"
      />
      <p class="text-center font-semibold text-gray-400 text-xl py-5">Page Not Found</p>

      <div
        @click="goHome()"
        class="w-max mx-auto text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-10 py-2.5 hover:text-gray-900 cursor-pointer"
      >
        Go To Home Page
      </div>
    </div>
  </div>
</template>
<style scoped></style>
