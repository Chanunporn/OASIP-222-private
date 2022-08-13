<script setup>
import { ref, computed } from "vue";
import moment from "moment";
const emits = defineEmits(["delete", "save"]);
const props = defineProps({
  eventList: {
    type: Array,
  },
  categoryList: {
    type: Array,
  },
  detailList: {
    type: Object,
  },
  statusDetail: {
    type: Object,
  },
});

// Current Detail
const eventDetail = computed(() => {
  return {
    id: props.detailList.id,
    bookingName: props.detailList.bookingName,
    bookingEmail: props.detailList.bookingEmail,
    eventCategory: props.detailList.eventCategoryName,
    eventDuration: props.detailList.eventDuration,
    eventStartTime: props.detailList.eventStartTime,
    eventNotes: ref(props.detailList.eventNotes),
    status: ref(props.statusDetail),
  };
});

// contian TIME DATE TO UTC TIMEZONE
const containDate = (i) => {
  let date = moment(i).format("D MMMM YYYY");
  return date.toUpperCase();
};

const containTime = (i) => {
  let time = moment(i).utc(7).format("H:mm");
  return time;
};

const containEndTime = (time, duration) => {
  let end = moment(time).utc(7).add(duration, "m").format("H:mm");
  return end;
};

let toggleEdit = ref(false);

// close detail
const closeDetail = () => {
  eventDetail.value.status.value = false;
  toggleEdit.value = false;
};

let detailDate = ref("");
let detailTime = ref("");
// contain time date in format input date time
const containTimeDateDetail = () => {
  toggleEdit.value = true;
  detailDate.value = moment(eventDetail.value.eventStartTime).format("YYYY-MM-DD");
  detailTime.value = moment(eventDetail.value.eventStartTime).format("HH:mm");
};

// check length in note
const lenghtNoteDetail = computed(() => {
  if (eventDetail.value.eventNotes.value) {
    return eventDetail.value.eventNotes.value.length;
  } else return 0;
});

let currentDate = moment().format("YYYY-MM-DD");
let statusWarning = ref("");
let msg = ref("");

// check Edit
const checkEdit = (detail, detailDate, detailTime) => {
  if (detailDate == "") {
    msg.value = "Please choose your start date";
    statusWarning.value = "warning";
  } else if (detailTime == "") {
    msg.value = "Please choose your start time";
    statusWarning.value = "warning";
  } else {
    let indexCategory = props.categoryList
      .map((i) => i.eventCategoryName)
      .indexOf(detail.eventCategory);
    let i = `${detailDate} ${detailTime}`;
    let date = moment(i).utc().format();
    let status = ref("");
    if (date < moment().utc().format()) {
      msg.value =
        "The time you selected is in the past, please select the present or future time.";
      statusWarning.value = "warning";
    } else {
      for (let i = 0; props.eventList.length > i; i++) {
        if (props.eventList[i].id == detail.id) {
          if (
            props.eventList[i].eventNotes != detail.eventNotes.value &&
            props.eventList[i].eventStartTime == date
          ) {
            status.value = "correct";
            break;
          } else if (
            props.eventList[i].eventNotes == detail.eventNotes.value &&
            props.eventList[i].eventStartTime == date
          ) {
            status.value = "noEdit";
            break;
          } else {
            status.value = "false";
            break;
          }
        } else {
          status.value = "false";
        }
      }
      if (status.value == "correct") {
        statusWarning.value = "correct";
        emits("save", detail, date);
      } else if (status.value == "noEdit") {
        msg.value = "Please edit some fields before saving";
        statusWarning.value = "warning";
      } else {
        if (checkOverlap(detail, date, indexCategory) == true) {
          statusWarning.value = "correct";
          emits("save", detail, date);
        } else {
          msg.value =
            "The time you selected overlaps with another booking, please select another time.";
          statusWarning.value = "warning";
        }
      }
    }
  }
};

// check overlap
const checkOverlap = (detail, time, indexCategory) => {
  let status = ref(false);
  let start = moment(time).utc().format();
  let end = moment(start)
    .utc()
    .add(props.categoryList[indexCategory].eventDuration, "m")
    .format();
    // start ---- end
  for (let i = 0; props.eventList.length > i; i++) {
    if (props.eventList[i].eventCategoryName == detail.eventCategory) {
      let startList = moment(props.eventList[i].eventStartTime).utc().format();
      let endList = moment(startList)
        .utc()
        .add(props.eventList[i].eventDuration, "m")
        .format();
      if (
        (start < startList || start >= endList) &&
        (end <= startList || end > endList)
      ) {
        if (startList > start && startList < end && endList > start && endList < end) {
          status.value = false;
          break;
        } else {
          status.value = true;
        }
      } else {
        status.value = false;
        break;
      }
    } else {
      status.value = true;
    }
  }
  return status.value;
};

// delete detail in each event
const deleteEvent = (id) => {
  statusWarning.value = "";
  eventDetail.value.status.value = false;
  emits("delete", id);
};
</script>

<template>
  <div class="font-poppin">
    <!-- Show Detail -->
    <div
      v-if="eventDetail.status.value == true"
      class="bg-opacity items-center justify-center flex transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
    >
      <div class="mx-auto w-full max-w-4xl h-max">
        <div class="relative bg-white rounded-lg shadow p-10">
          <div class="p-5 space-y-6" v-if="toggleEdit == false">
            <div>
              <h1 class="text-gray-900 font-bold text-[40px]">
                {{ eventDetail.eventCategory }}
              </h1>
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

            <div class="grid grid-cols-2 gap-5">
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Name</p>
                  <p class="text-xl font-medium leading-3 text-gray-900">
                    {{ eventDetail.bookingName }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Date</p>
                  <p class="text-xl font-semibold leading-3 text-gray-900">
                    {{ containDate(eventDetail.eventStartTime) }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Email</p>
                  <p class="text-xl font-medium leading-3 text-gray-900">
                    {{ eventDetail.bookingEmail }}
                  </p>
                </div>
              </div>

              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Time</p>
                  <p class="text-xl font-medium leading-3 text-gray-900">
                    {{ containTime(eventDetail.eventStartTime) }} -
                    {{
                      containEndTime(
                        eventDetail.eventStartTime,
                        eventDetail.eventDuration
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex space-x-3">
              <div class="pt-[10px]">
                <p class="text-lg leading-none text-gray-800 pb-2">Note</p>
              </div>
            </div>
            <hr class="border-gray-400" />
            <div class="px-5">
              <p
                class="text-lg font-medium text-gray-900 leading-6"
                v-if="eventDetail.eventNotes.value"
              >
                {{ eventDetail.eventNotes.value }}
              </p>
              <p class="text-lg font-medium leading-3 text-gray-900" v-else>
                No Description
              </p>
            </div>
            <hr class="border-gray-400" />
            <div class="grid grid-cols-2 gap-8">
              <button
                @click="containTimeDateDetail"
                class="text-white bg-sky-600 hover:bg-sky-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              >
                edit
              </button>
              <button
                class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                @click="statusWarning = 'delete'"
              >
                delete
              </button>
            </div>
          </div>

          <!-- Show Edit in Event Detail -->
          <div class="p-5 space-y-6" v-else>
            <div>
              <h1 class="text-gray-900 font-bold text-[40px]">Editing Event</h1>
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
            <div class="flex space-x-3">
              <div class="pt-[2px]">
                <p class="text-base leading-none text-gray-500 pb-2">Category</p>
                <p class="text-xl font-medium leading-3 text-gray-900">
                  {{ eventDetail.eventCategory }}
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Name</p>
                  <p class="text-xl font-medium leading-3 text-gray-900">
                    {{ eventDetail.bookingName }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Email</p>
                  <p class="text-xl font-medium leading-3 text-gray-900">
                    {{ eventDetail.bookingEmail }}
                  </p>
                </div>
              </div>
              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Date</p>
                  <input
                    class="p-2 border-b border-gray-400 leading-4 text-base placeholder-gray-600 w-80 h-max"
                    type="date"
                    placeholder="date"
                    v-model="detailDate"
                    :min="currentDate"
                  />
                </div>
              </div>

              <div class="flex space-x-3">
                <div class="pt-[2px]">
                  <p class="text-base leading-none text-gray-500 pb-2">Time</p>
                  <input
                    class="p-2 border-b border-gray-400 leading-4 text-base placeholder-gray-600 w-80 h-max"
                    type="time"
                    placeholder="time"
                    v-model="detailTime"
                  />
                </div>
              </div>
            </div>
            <div class="space-x-3">
              <div class="py-[10px] pb-4">
                <p class="text-lg leading-none text-gray-800 pb-2">Note</p>
                <textarea
                  class="px-2 border-b border-gray-400 leading-6 text-base placeholder-gray-600 py-4 w-full h-max"
                  type="text"
                  placeholder="Note"
                  maxlength="500"
                  v-model="eventDetail.eventNotes.value"
                />
                <p class="float-right text-sm font-light leading-6">
                  {{ lenghtNoteDetail }} / 500
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-5">
              <button
                @click="checkEdit(eventDetail, detailDate, detailTime)"
                class="text-white bg-emerald-600 hover:bg-emerald-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              >
                save
              </button>
              <button
                class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                @click="toggleEdit = false"
              >
                cancel
              </button>
            </div>
          </div>

          <button
            @click="closeDetail()"
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

      <!-- alert -->
      <div
        class="bg-opacity items-center justify-center flex transition duration-150 ease-in-out z-[99] absolute top-0 right-0 bottom-0 left-0"
        v-if="statusWarning != ''"
      >
        <div class="mx-auto w-full max-w-lg h-max">
          <div>
            <div class="relative bg-white rounded-lg shadow p-10">
              <div v-show="statusWarning == 'delete'">
                <div class="p-6 text-center">
                  <svg
                    class="mx-auto mb-4 w-14 h-14 text-rose-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete<br /><span>{{
                      eventDetail.eventCategory
                    }}</span
                    ><br /><span
                      >{{ containDate(eventDetail.eventStartTime) }},
                      {{ containTime(eventDetail.eventStartTime) }} ?</span
                    >
                  </h3>
                  <button
                    @click="deleteEvent(eventDetail.id)"
                    class="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  >
                    Delete
                  </button>
                  <button
                    @click="statusWarning = ''"
                    class="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-500 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
                    Update Event Complete
                  </h3>

                  <button
                    @click="(statusWarning = ''), (toggleEdit = false)"
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
  </div>
</template>

<style></style>
