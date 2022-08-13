<script setup>
import { ref, computed } from "vue";
import moment from "moment";
import { useRouter } from "vue-router";
const emit = defineEmits(["add"]);
const prop = defineProps({
  listCategory: {
    type: Array,
    default: [],
  },
  listEvent: {
    type: Array,
    default: [],
  },
});
// go to EventPage
const appRouter = useRouter();
const goEvent = () => {
  appRouter.push({ name: "EventPage" });
};

// Contain Date Time to UTC TIMEZONE
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

let type = ref(null);
let duration = ref(0);
let date = ref("");
let time = ref("");
let currentDate = moment().format("YYYY-MM-DD");

// get duration in Each listCategory
const durationFromSelect = (i) => {
  duration.value = prop.listCategory[i.target.value].eventDuration;
};

// take data in input
const event = computed(() => {
  return {
    bookingName: ref(""),
    bookingEmail: "",
    eventCategory: type.value,
    eventStartTime: {
      date: date.value,
      time: time.value,
    },
    eventNotes: ref(""),
  };
});

let statusWarning = ref("");
let msg = ref("");
// check add
let checkEvent = (event) => {
  if (event.bookingName.value.trim() == "") {
    msg.value = "Please fill your name";
    statusWarning.value = "warning";
  } else if (event.bookingEmail == "") {
    msg.value = "Please fill your email";
    statusWarning.value = "warning";
  } else if (
    !event.bookingEmail.match(
      /^([a-zA-Z0-9._-])+@\w+([a-zA-Z0-9._-])*(\.[a-zA-Z0-9_-]{2,10})+$/
    )
  ) {
    msg.value = "Please provide a valid email address";
    statusWarning.value = "warning";
  } else if (event.eventCategory == null) {
    msg.value = "Please choose your category";
    statusWarning.value = "warning";
  } else if (event.eventStartTime.date == "") {
    msg.value = "Please choose your start date";
    statusWarning.value = "warning";
  } else if (event.eventStartTime.time == "") {
    msg.value = "Please choose your time";
    statusWarning.value = "warning";
  } else {
    let i = `${event.eventStartTime.date} ${event.eventStartTime.time}`;
    let date = moment(i).utc().format();
    let duration = prop.listCategory[event.eventCategory].eventDuration;
    if (date < moment().utc().format()) {
      msg.value =
        "The time you selected is in the past, please select the present or future time.";
      statusWarning.value = "warning";
    } else {
      if (checkOverlap(event, date, duration) == true) {
        statusWarning.value = "correct";
        emit("add", event, date);
      } else {
        msg.value =
          "The time you selected overlaps with another booking, please select another time.";
        statusWarning.value = "warning";
      }
    }
  }
};
// check overlap
const checkOverlap = (event, time, duration) => {
  let status = ref(false);
  let start = moment(time).utc().format();
  let end = moment(start).utc().add(duration, "m").format();
  for (let i = 0; prop.listEvent.length > i; i++) {
    if (
      prop.listEvent[i].eventCategoryName ==
      prop.listCategory[event.eventCategory].eventCategoryName
    ) {
      let startList = moment(prop.listEvent[i].eventStartTime).utc().format();
      let endList = moment(startList)
        .utc()
        .add(prop.listEvent[i].eventDuration, "m")
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

let timeSlot = ref([]);
const showTimeSlot = () => {
  let addTime = moment(event.value.eventStartTime.date).format("YYYY-MM-DD");
  let category = event.value.eventCategory;
  timeSlot.value = [];
  prop.listEvent.forEach((event) => {
    if (addTime == moment(event.eventStartTime).format("YYYY-MM-DD")) {
      if (category != undefined) {
        if (prop.listCategory[category].eventCategoryName == event.eventCategoryName) {
          timeSlot.value.push(event);
        }
      }
    }
  });
};

let statusTyepTime = ref(true);
const peerTypeTime = () => {
  if (event.value.eventStartTime.time != "") {
    statusTyepTime.value = false;
  } else {
    statusTyepTime.value = true;
  }
};
</script>
<template>
  <div class="font-poppin">
    <!-- Add Event -->
    <div class="py-16 px-44">
      <div class="w-full">
        <div class="py-6 px-2 space-y-2">
          <h1 class="text-[64px] font-bold text-gray-900 uppercase">booking event</h1>
        </div>
        <div class="w-full space-y-8">
          <div class="flex space-x-10">
            <div class="w-full space-y-2">
              <input
                class="px-2 border-b border-gray-200 text-base placeholder-gray-600 py-4 w-full leading-4 peer"
                type="text"
                placeholder="Name"
                v-model="event.bookingName.value"
                maxlength="100"
                required
              />
              <p
                class="text-red-500 text-sm invisible peer-invalid:visible float-left leading-4"
              >
                * Please fill your name
              </p>
              <p class="float-right text-sm leading-4 text-gray-600">
                {{ event.bookingName.value.length }} / 100
              </p>
            </div>
            <div class="w-full">
              <input
                class="px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full peer"
                type="email"
                placeholder="Email"
                v-model="event.bookingEmail"
                required
              />
              <p class="text-red-500 text-sm py-1 invisible peer-invalid:visible">
                * Please provide a valid email address
              </p>
            </div>
          </div>
          <div class="flex space-x-10">
            <select
              v-model="event.eventCategory"
              class="px-1 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full cursor-pointer"
              @change="durationFromSelect($event), showTimeSlot()"
            >
              <option value="null" disabled>Category</option>
              <option :value="parseInt(0)">Project-Management-Clinic</option>
              <option :value="parseInt(1)">Dev-Ops-Clinic</option>
              <option :value="parseInt(2)">Database-Clinic</option>
              <option :value="parseInt(3)">Client-Side-Clinic</option>
              <option :value="parseInt(4)">Server-Side-Clinic</option>
            </select>

            <p
              class="px-1 border-b border-gray-200 text-left leading-4 text-base text-gray-600 py-4 w-full"
              v-show="duration != 0"
            >
              Duration : {{ duration }} Minutes
            </p>
          </div>
          <span
            class="text-red-500 text-sm py-1"
            v-show="event.eventCategory == undefined"
          >
            * Please choose your category
          </span>
          <div class="space-y-2 w-full">
            <textarea
              class="px-2 border-b border-gray-200 text-base placeholder-gray-600 py-4 w-full leading-6"
              type="text"
              placeholder="Note"
              v-model="event.eventNotes.value"
              maxlength="500"
            />
            <p class="float-right text-sm leading-4 text-gray-600">
              {{ event.eventNotes.value.length }} / 500
            </p>
          </div>
          <div class="flex space-x-10">
            <div class="w-full">
              <p
                class="px-2 border-gray-200 leading-4 text-lg py-4 w-full text-[#021D3F]"
              >
                Date
              </p>
              <input
                class="px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full cursor-pointer"
                type="date"
                placeholder="Date"
                v-model="event.eventStartTime.date"
                :min="currentDate"
                @change="showTimeSlot()"
              />
              <span
                class="text-red-500 text-sm py-1"
                v-show="event.eventStartTime.date == ''"
              >
                * Please choose your date
              </span>
            </div>
            <div class="w-full">
              <p
                class="px-2 border-gray-200 leading-4 text-lg py-4 w-full text-[#021D3F]"
              >
                Time
              </p>
              <input
                class="px-2 border-b border-gray-200 leading-4 text-base placeholder-gray-600 py-4 w-full cursor-pointer"
                type="time"
                placeholder="Date"
                v-model="event.eventStartTime.time"
                @change="peerTypeTime"
              /><span class="text-red-500 text-sm py-1" v-show="statusTyepTime == true">
                * Please choose your time
              </span>
            </div>
          </div>
        </div>
        <div
          class="mt-10"
          v-show="event.eventCategory != null && event.eventStartTime.date != ''"
        >
          <p
            class="px-2 border-gray-200 leading-4 text-base font-semibold py-4 w-full text-[#021D3F]"
          >
            The time period that is already booked in
            {{ containDate(event.eventStartTime.date) }}
          </p>
          <div
            class="py-5 px-10 border-y-2 border-gray-200 grid grid-cols-3 gap-8 overflow-y-scroll h-20"
            v-if="timeSlot.length != 0"
          >
            <div v-for="(slot, index) in timeSlot" :key="index">
              <div class="flex">
                <p class="px-4 text-4xl font-semibold text-red-600">{{ index + 1 }}</p>
                <div>
                  <p class="leading-4 text-gray-900 font-sm font-semibold">
                    {{ slot.eventCategoryName }}
                  </p>
                  <p class="pt-2 leading-4 text-gray-900 font-lg font-light">
                    {{ containTime(slot.eventStartTime) }} -
                    {{ containEndTime(slot.eventStartTime, slot.eventDuration) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="border-y border-gray-400 py-5">
            <img
              src="../../public/images/illustration/nooverlap.png"
              class="w-2/12 h-max mx-auto"
            />
            <p class="text-center font-semibold text-gray-400">
              You can booking this time
            </p>
          </div>
        </div>
        <button
          class="mt-8 text-base font-medium leading-4 py-4 w-full text-white bg-[#153053] transition duration-500 ease-in-out hover:bg-blue-700"
          @click="checkEvent(event)"
        >
          Add Meeting
        </button>
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
                <h3 class="mb-5 text-lg font-normal text-gray-500">Add Event Complete</h3>

                <button
                  @click="(statusWarning = ''), goEvent()"
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
