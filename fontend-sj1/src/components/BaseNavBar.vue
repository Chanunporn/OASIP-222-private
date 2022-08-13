<script setup></script>
<template>
  <div class="font-poppin">
    <!-- Navbar Vertical -->
    <div class="justify-start items-start h-screen bg-[#fffff] shadow-xl w-64">
      <div class="justify-start px-6 pt-6 items-center space-x-3 flex">
        <span class="p-2 bg-[#303b49] rounded-lg">
          <img src="../../public/images/icon/schedule.png" class="w-7" />
        </span>
        <p class="text-2xl font-[200] leading-10 text-gray-900 ml-2">OASIP-sj1</p>
      </div>

      <div class="flex justify-start items-center px-6">
        <div class="flex justify-start flex-col w-full space-y-1 items-start py-5">
          <router-link
            :to="{ name: 'HomePage' }"
            class="flex justify-start items-center space-x-6 transition duration-500 hover:text-white hover:bg-[#001633] text-[#021D3F] rounded px-3 py-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="18"
              height="18"
              stroke-width="1.5"
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 273.163 273.163"
            >
              <g>
                <g>
                  <path
                    d="M139.626,56.934c-2.132-2.089-5.553-2.061-7.658,0.054l-92.236,93.372    c-1.017,1.017-0.903,2.399-0.903,3.835v97.903c0,3.008,1.077,9.187,4.079,9.187h188.556c3.002,0,3.171-6.179,3.171-9.187v-97.903    c0-1.469,0.544-2.866-0.506-3.889L139.626,56.934z M223.758,250.407h-52.123h-71.616H49.708v-93.965l85.72-87.961l88.33,88.004    V250.407z"
                  />
                  <path
                    d="M271.578,145.825L139.681,13.476c-1.023-1.028-2.497-1.534-3.873-1.599    c-1.452,0.005-3.242,0.593-4.259,1.632L82.342,63.162V34.194c0-2.997-1.643-1.349-4.645-1.349H45.068    c-3.002,0-6.239-1.648-6.239,1.354v73.232L1.463,145.852c-2.105,2.148-1.871,5.586,0.267,7.696    c2.143,2.105,5.684,2.072,7.794-0.071l39.335-39.972l0.033-0.005l86.949-88.456l128.025,128.46    c1.061,1.066,2.464,1.599,3.856,1.599c1.387,0,2.779-0.528,3.84-1.588C273.688,151.395,273.699,147.957,271.578,145.825z     M49.708,43.723h21.756v30.508L49.708,96.362V43.723z"
                  />
                </g>
              </g>
            </svg>
            <p class="text-base leading-4">Home</p>
          </router-link>
          <router-link
            :to="{ name: 'EventPage' }"
            class="flex justify-start items-center space-x-6 transition duration-500 hover:text-white hover:bg-[#001633] text-[#021D3F] rounded px-3 py-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <rect x="4" y="4" width="6" height="6" rx="1"></rect>
              <rect x="14" y="4" width="6" height="6" rx="1"></rect>
              <rect x="4" y="14" width="6" height="6" rx="1"></rect>
              <rect x="14" y="14" width="6" height="6" rx="1"></rect>
            </svg>
            <p class="text-base leading-4">Schedule</p>
          </router-link>
          <router-link
            :to="{ name: 'CategoryPage' }"
            class="flex justify-start items-center space-x-6 transition duration-500 hover:text-white hover:bg-[#001633] text-[#021D3F] rounded px-3 py-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-stack"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="12 4 4 8 12 12 20 8 12 4" />
              <polyline points="4 12 12 16 20 12" />
              <polyline points="4 16 12 20 20 16" />
            </svg>
            <p class="text-base leading-4">Category</p>
          </router-link>
          <router-link
            :to="{ name: 'AddPage' }"
            class="flex justify-start items-center space-x-6 transition duration-500 hover:text-white hover:bg-[#001633] text-[#021D3F] rounded px-3 py-2 w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="18"
              height="18"
              stroke-width="1.5"
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 251.882 251.882"
            >
              <g>
                <path
                  d="M215.037,36.846c-49.129-49.128-129.063-49.128-178.191,0c-49.127,49.127-49.127,129.063,0,178.19   c24.564,24.564,56.83,36.846,89.096,36.846s64.531-12.282,89.096-36.846C264.164,165.909,264.164,85.973,215.037,36.846z    M49.574,202.309c-42.109-42.109-42.109-110.626,0-152.735c21.055-21.054,48.711-31.582,76.367-31.582s55.313,10.527,76.367,31.582   c42.109,42.109,42.109,110.626,0,152.735C160.199,244.417,91.683,244.417,49.574,202.309z"
                />
                <path
                  d="M194.823,116.941h-59.882V57.059c0-4.971-4.029-9-9-9s-9,4.029-9,9v59.882H57.059c-4.971,0-9,4.029-9,9s4.029,9,9,9h59.882   v59.882c0,4.971,4.029,9,9,9s9-4.029,9-9v-59.882h59.882c4.971,0,9-4.029,9-9S199.794,116.941,194.823,116.941z"
                />
              </g>
            </svg>
            <p class="text-base leading-4">Add Event</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #ffffff;
  background-color: #001633;
}
</style>
