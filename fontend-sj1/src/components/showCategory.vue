<script setup>
import { ref, computed } from "vue";
const emit = defineEmits(["save"]);
const prop = defineProps({
  categoryList: {
    type: Array,
    default: [],
  },
});

// Change To Open Edit In Category List
let categoryEdit = ref();
const changeToEdit = (category) => {
  categoryEdit.value = category;
};

// Current Category
const categoryCurrent = computed(() => {
  return {
    id: categoryEdit.value.id,
    eventCategoryName: ref(categoryEdit.value.eventCategoryName),
    eventDuration: categoryEdit.value.eventDuration,
    eventCategoryDescription: ref(categoryEdit.value.eventCategoryDescription),
  };
});

// check lenght in Note and Name
const lenghtNoteCategory = computed(() => {
  if (categoryCurrent.value.eventCategoryDescription.value) {
    return categoryCurrent.value.eventCategoryDescription.value.length;
  } else return 0;
});

const lenghtNameCategory = computed(() => {
  if (categoryCurrent.value.eventCategoryName.value) {
    return categoryCurrent.value.eventCategoryName.value.length;
  } else return 0;
});

let showEditCategory = ref(false);

let statusWarning = ref("");
let msg = ref("");

// Check Edit
const checkEditCategory = (category) => {
  if (category.eventCategoryName.value.trim() == "") {
    msg.value = "Must have category name before edit.";
    statusWarning.value = "warning";
  } else if (category.eventDuration === "") {
    msg.value = "Must have category duration before edit.";
    statusWarning.value = "warning";
  } else if (category.eventDuration < 1 || category.eventDuration > 480) {
    msg.value = "Event category duration must between 1 to 480";
    statusWarning.value = "warning";
  } else {
    let status = ref("true");
    for (let i = 0; i < prop.categoryList.length; i++) {
      if (
        prop.categoryList[i].eventCategoryName.trim().toLowerCase() ==
        category.eventCategoryName.value.trim().toLowerCase()
      ) {
        if (
          (prop.categoryList[i].eventCategoryDescription !=
            category.eventCategoryDescription.value ||
            prop.categoryList[i].eventDuration != category.eventDuration) &&
          prop.categoryList[i].id == category.id
        ) {
          status.value = "true";
        } else if (
          prop.categoryList[i].eventCategoryDescription ==
            category.eventCategoryDescription.value &&
          prop.categoryList[i].eventDuration == category.eventDuration &&
          prop.categoryList[i].id == category.id
        ) {
          status.value = "noEdit";
          break;
        } else {
          status.value = "false";
          break;
        }
      } else {
        status.value = "true";
      }
    }
    if (status.value == "false") {
      msg.value = "Category name require unique";
      statusWarning.value = "warning";
    } else if (status.value == "noEdit") {
      msg.value = "Please edit some fields before saving";
      statusWarning.value = "warning";
    } else {
      statusWarning.value = "correct";
      emit("save", category);
    }
  }
};
</script>

<template>
  <div class="font-poppin">
    <div>
      <!-- Category List -->
      <div class="px-6 py-12 mx-auto w-10/12">
        <div class="py-10 px-5 space-y-2">
          <h1 class="text-[64px] font-bold text-gray-900 uppercase">Category</h1>
          <svg
            width="276"
            height="3"
            viewBox="0 0 276 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg%22%3E"
          >
            <rect width="256" height="3" rx="1.5" fill="#4299E1" />
            <rect x="262" width="14" height="3" rx="1.5" fill="#4299E1" />
          </svg>
        </div>

        <div class="grid grid-cols-2 gap-5" v-if="categoryList != 0">
          <div
            v-for="(category, index) in categoryList"
            :key="index"
            class="w-10/12 p-10 h-max bg-white shadow-xl rounded"
          >
            <p
              class="mt-1 text-xs leading-none font-light text-white py-1 px-5 bg-gray-900 rounded-full w-max float-right"
            >
              {{ category.eventDuration }} MIN
            </p>

            <div class="px-2">
              <svg class="w-8 h-8" viewBox="0 0 30 30" fill="none">
                <path
                  d="M27.3633 7.08984H26.4844V6.21094C26.4844 4.75705 25.3015 3.57422 23.8477 3.57422H4.39453C2.94064 3.57422 1.75781 4.75705 1.75781 6.21094V21.1523H0.878906C0.393516 21.1523 0 21.5459 0 22.0312V23.7891C0 25.2429 1.18283 26.4258 2.63672 26.4258H27.3633C28.8172 26.4258 30 25.2429 30 23.7891V9.72656C30 8.27268 28.8172 7.08984 27.3633 7.08984ZM3.51562 6.21094C3.51562 5.72631 3.9099 5.33203 4.39453 5.33203H23.8477C24.3323 5.33203 24.7266 5.72631 24.7266 6.21094V7.08984H20.332C18.8781 7.08984 17.6953 8.27268 17.6953 9.72656V21.1523H3.51562V6.21094ZM1.75781 23.7891V22.9102H17.6953V23.7891C17.6953 24.0971 17.7489 24.3929 17.8465 24.668H2.63672C2.15209 24.668 1.75781 24.2737 1.75781 23.7891ZM28.2422 23.7891C28.2422 24.2737 27.8479 24.668 27.3633 24.668H20.332C19.8474 24.668 19.4531 24.2737 19.4531 23.7891V9.72656C19.4531 9.24193 19.8474 8.84766 20.332 8.84766H27.3633C27.8479 8.84766 28.2422 9.24193 28.2422 9.72656V23.7891Z"
                  fill="#2D3748"
                />
                <path
                  d="M24.7266 21.1523H22.9688C22.4834 21.1523 22.0898 21.5459 22.0898 22.0312C22.0898 22.5166 22.4834 22.9102 22.9688 22.9102H24.7266C25.212 22.9102 25.6055 22.5166 25.6055 22.0312C25.6055 21.5459 25.212 21.1523 24.7266 21.1523Z"
                  fill="#4299E1"
                />
                <path
                  d="M23.8477 12.3633C24.3331 12.3633 24.7266 11.9698 24.7266 11.4844C24.7266 10.999 24.3331 10.6055 23.8477 10.6055C23.3622 10.6055 22.9688 10.999 22.9688 11.4844C22.9688 11.9698 23.3622 12.3633 23.8477 12.3633Z"
                  fill="#4299E1"
                />
              </svg>
            </div>
            <h1 class="mt-4 text-xl font-semibold text-gray-800">
              {{ category.eventCategoryName }}
            </h1>

            <p class="mt-2 text-gray-500" v-if="category.eventCategoryDescription">
              {{ category.eventCategoryDescription }}
            </p>
            <p class="mt-2 text-gray-500" v-else>No Description</p>
            <p
              @click="changeToEdit(category), (showEditCategory = true)"
              class="mt-4 shadow-lg text-sm font-light text-white bg-gray-900 rounded-full w-max py-1 px-10 cursor-pointer transition duration-500 ease-in-out hover:scale-105"
            >
              Edit
            </p>
          </div>
        </div>

        <!-- Empty Category -->
        <div v-else>
          <div class="mx-auto py-20">
            <div class="w-10/12 h-max rounded mx-auto">
              <img
                src="../../public/images/illustration/noevent.png"
                class="w-4/12 mx-auto"
              />
              <h1 class="text-center font-semibold text-lg text-gray-400 py-5">
                No Category
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Category -->
    <div
      v-if="showEditCategory == true && categoryCurrent != ''"
      class="bg-opacity items-center justify-center flex transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
    >
      <div class="mx-auto w-full max-w-4xl h-max">
        <div class="relative bg-white rounded-lg shadow p-10">
          <div class="p-5 space-y-6">
            <div>
              <h1 class="text-gray-900 font-bold text-[40px]">Edit Category</h1>
              <svg
                width="276"
                height="3"
                viewBox="0 0 276 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg%22%3E"
              >
                <rect width="256" height="3" rx="1.5" fill="#4299E1" />
                <rect x="262" width="14" height="3" rx="1.5" fill="#4299E1" />
              </svg>
            </div>

            <div class="flex space-x-20">
              <div class="space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Category Name</p>
                  <input
                    class="p-2 border-b border-gray-400 leading-6 text-base placeholder-gray-600 w-80 h-max"
                    type="text"
                    placeholder="Category Name"
                    maxlength="100"
                    v-model="categoryCurrent.eventCategoryName.value"
                  />
                  <p class="text-right text-sm font-normal leading-8">
                    {{ lenghtNameCategory }} / 100
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Duration</p>
                  <input
                    class="p-2 border-b border-gray-400 leading-6 text-base placeholder-gray-600 w-80 h-max"
                    type="number"
                    placeholder="Duration"
                    v-model="categoryCurrent.eventDuration"
                  />
                </div>
              </div>
            </div>
            <div class="space-x-3">
              <div class="pt-[10px] pb-4">
                <p class="text-lg leading-none text-gray-800 pb-2">Note</p>
                <textarea
                  class="px-2 border-b border-gray-400 leading-6 text-base placeholder-gray-600 py-4 w-full h-max"
                  type="text"
                  placeholder="Note"
                  maxlength="500"
                  v-model="categoryCurrent.eventCategoryDescription.value"
                />
                <p class="float-right text-sm font-light leading-6">
                  {{ lenghtNoteCategory }} / 500
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-8">
              <button
                @click="checkEditCategory(categoryCurrent)"
                class="text-white bg-emerald-600 hover:bg-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              >
                save
              </button>
              <button
                class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                @click="showEditCategory = false"
              >
                cancel
              </button>
              <button
                @click="showEditCategory = false"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert -->
    <div
      class="bg-opacity items-center justify-center flex transition duration-150 ease-in-out z-[99] absolute top-0 right-0 bottom-0 left-0"
      v-if="statusWarning != ''"
    >
      <div class="mx-auto w-full max-w-lg h-max">
        <div>
          <div class="relative bg-white rounded-lg shadow p-10">
            <div v-show="statusWarning == 'warning'">
              <div class="p-6 text-center">
                <img src="../../public/images/icon/error.png" class="mx-auto py-4" />
                <h3 class="mb-5 text-lg font-normal text-gray-500">{{ msg }}</h3>

                <button
                  @click="statusWarning = ''"
                  class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-10 py-2.5 hover:text-gray-900"
                >
                  OK
                </button>
              </div>
            </div>
            <div v-show="statusWarning == 'correct'">
              <div class="p-6 text-center">
                <img
                  src="../../public/images/icon/check-mark.png"
                  class="w-16 mx-auto py-4"
                />
                <h3 class="mb-5 text-lg font-normal text-gray-500">
                  Update Category Complete
                </h3>

                <button
                  @click="(statusWarning = ''), (showEditCategory = false)"
                  class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-10 py-2.5 hover:text-gray-900"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
