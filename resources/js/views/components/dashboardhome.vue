<template>
  <div class="border-b border-emerald-200">
    <nav class="flex space-x-1" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="setCurrentTab(tab.name)"
        :class="[
          tab.current
            ? 'border-emerald-500 text-emerald-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
        ]"
        :aria-current="tab.current ? 'page' : undefined"
      >
        <component
          :is="tab.icon"
          :class="[tab.current ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-2 h-5 w-5']"
          aria-hidden="true"
        />
        <span>{{ tab.name }}</span>
      </button>
    </nav>
  </div>

  <div class="p-6">
    <div v-if="currentTab === 'Upcoming Appointments'" class="space-y-6">
      <h2 class="text-2xl font-semibold text-gray-900">Today's Appointments</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="appointment in upcomingAppointments" :key="appointment.id">
            <div class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img :src="appointment.avatar" :alt="appointment.tutor" class="h-12 w-12 rounded-full" />
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.tutor }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.subject }}</p>
                  </div>
                </div>
                <div class="ml-2 flex-shrink-0 flex">
                  <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800 py-1">
                    <ClockIcon class="flex-shrink-0 mr-1.5 py-auto h-5 w-5 text-teal-400" aria-hidden="true" />
                    {{ appointment.time }}
                  </p>
                  <div class="mx-2">
                    <button
                      @click="openDetailsModal(appointment)"
                      class="justify-end inline-flex items-center py-1 border border-transparent text-sm leading-4 font-medium rounded-full text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <InfoIcon class="mx-1 h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="currentTab === 'Appointment History'" class="space-y-6">
      <h2 class="text-2xl font-semibold text-gray-900">Past Appointments</h2>
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="appointment in pastAppointments" :key="appointment.id">
            <div class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.subject }}</p>
                  <p class="text-sm text-gray-500">Tutor: {{ appointment.tutor }}</p>
                </div>
                <button
                  @click="rateAppointment(appointment.id)"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <StarIcon class="mr-2 h-4 w-4" aria-hidden="true" />
                  Rate
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>


    <div v-if="currentTab === 'Recent Tutors'" class="space-y-6">
          <h2 class="text-2xl font-semibold text-gray-900">Recent Tutors</h2>
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li v-for="tutor in favoriteTutors" :key="tutor.id" class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out">
                <div class="flex items-center space-x-4">
                  <img :src="tutor.avatar" :alt="tutor.name" class="h-12 w-12 rounded-full" />
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-emerald-600 truncate">{{ tutor.name }}</p>
                    <p class="text-sm text-gray-500">{{ tutor.subjects.join(', ') }}</p>
                  </div>
                  <div>
                    <button
                      @click="contactTutor(tutor.id)"
                      class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                      <MessageSquareIcon class="mr-2 h-4 w-4" aria-hidden="true" />
                      Contact
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>  

  </div>

  <teleport to="body">
    <transition name="modal">
      <div v-if="isModalVisible" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CalendarIcon class="h-6 w-6 text-emerald-600" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Appointment Details
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500"><strong>Tutor:</strong> {{ selectedAppointment.tutor }}</p>
                    <p class="text-sm text-gray-500"><strong>Subject:</strong> {{ selectedAppointment.subject }}</p>
                    <p class="text-sm text-gray-500"><strong>Location:</strong> {{ selectedAppointment.location }}</p>
                    <p class="text-sm text-gray-500"><strong>Type:</strong> {{ selectedAppointment.type }}</p>
                    <p class="text-sm text-gray-500"><strong>Time:</strong> {{ selectedAppointment.time }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                @click="closeModal"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from "vue";
import { CalendarIcon, ClockIcon, UsersIcon, InfoIcon, StarIcon, MessageSquareIcon } from "lucide-vue-next";

const tabs = [
  { name: "Upcoming Appointments", icon: CalendarIcon, current: true },
  { name: "Appointment History", icon: ClockIcon, current: false },
  { name: "Recent Tutors", icon: UsersIcon, current: false },
];

const currentTab = ref("Upcoming Appointments");
const isModalVisible = ref(false);
const selectedAppointment = ref(null);

const upcomingAppointments = [
  { id: 1, tutor: "Jelli Uayan", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call" },
];

const pastAppointments = [
  { id: 1, subject: "Physics 1", tutor: "Jelli Uayan", date: "2024-10-10" },
];

const favoriteTutors = [
  { id: 1, name: "Jelli Uayan", subjects: ["Chemistry", "Physics"], avatar: "/placeholder.svg?height=48&width=48" },
  { id: 2, name: "Jera Acero", subjects: ["Calculus", "Algebra"], avatar: "/placeholder.svg?height=48&width=48" },
];

const setCurrentTab = (tabName) => {
  currentTab.value = tabName;
  tabs.forEach((tab) => (tab.current = tab.name === tabName));
};

const openDetailsModal = (appointment) => {
  selectedAppointment.value = appointment;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const rateAppointment = (appointmentId) => {
  console.log("Rate appointment with ID:", appointmentId);
};
</script>
