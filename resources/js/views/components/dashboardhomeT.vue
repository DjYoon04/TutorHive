<template>
  <div class="p-4 shadow-xl rounded-[30px] bg-white h-full">
    <div class="space-y-6 max-h-full overflow-y-auto custom-scrollbar">
      <!-- Header and Tabs -->
      <div class="border-b border-emerald-200 mx-4 sm:mx-6">
        <h1 class="mt-3 text-2xl sm:text-3xl font-bold text-emerald-800 text-center">
          Dashboard
        </h1>
        <nav class="flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-1 mt-2" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="setCurrentTab(tab.name)"
            :class="[ 
              tab.current
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-2 px-2 sm:py-4 sm:px-4 border-b-2 font-medium text-sm'
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            <component
              :is="tab.icon"
              :class="[ 
                tab.current ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-2 h-4 w-4 sm:h-5 sm:w-5'
              ]"
              aria-hidden="true"
            />
            <span class="hidden sm:inline">{{ tab.name }}</span>
          </button>
        </nav>
      </div>

      <!-- Tab Contents -->
      <div class="p-4 sm:p-6">
        <!-- Upcoming Appointments -->
        <div v-if="currentTab === 'Upcoming Appointments'" class="space-y-4 sm:space-y-6">
          <div class="bg-white shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="appointment in upcomingAppointments"
                :key="appointment.id"
                class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
              >
                <div class="flex flex-wrap items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <img :src="appointment.avatar" :alt="appointment.student" class="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                    <div>
                      <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.student }}</p>
                      <p class="text-sm text-gray-500">{{ appointment.subject }}</p>
                    </div>
                  </div>
                  <div class="mt-2 sm:mt-0 flex items-center space-x-2">
                    <p class="flex items-center text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-100 rounded-full px-2 py-1">
                      <Clock class="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1" />
                      {{ appointment.time }}
                    </p>
                    <button
                      @click="openDetailsModal(appointment)"
                      class="inline-flex items-center px-2 py-1 border text-sm rounded-full text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                    >
                      <InfoIcon class="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                      Details
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Appointment History -->
        <div v-if="currentTab === 'Appointment History'" class="space-y-4 sm:space-y-6">
          <div class="bg-white shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="appointment in pastAppointments"
                :key="appointment.id"
                class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
              >
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.subject }}</p>
                    <p class="text-sm text-gray-500">Student: {{ appointment.student }}</p>
                  </div>
                  <button
                    @click="rateAppointment(appointment.id)"
                    class="px-3 py-1 text-sm rounded-lg text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
                  >
                    <MessageSquareMore class="h-4 w-4 mr-1" />
                    Comment
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- My Students -->
        <div v-if="currentTab === 'My Students'" class="space-y-4 sm:space-y-6">
          <div class="bg-white shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="student in favoriteStudents"
                :key="student.id"
                class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
              >
                <div class="flex items-center space-x-4">
                  <img :src="student.avatar" :alt="student.student" class="h-10 w-10 sm:h-12 sm:w-12 rounded-full" />
                  <div>
                    <p class="text-sm font-medium text-emerald-600 truncate">{{ student.student }}</p>
                    <p class="text-sm text-gray-500">{{ student.subjects.join(', ') }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Appointment Details Modal -->
  <TransitionRoot appear :show="isModalVisible" as="template">
    <Dialog as="div" class="relative z-50">
      <!-- Background overlay -->
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      </TransitionChild>

      <!-- Modal container -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <!-- Modal content -->
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex justify-between items-center">
                <DialogTitle as="h2" class="text-xl font-bold text-emerald-800">
                  Appointment Details
                </DialogTitle>
                <button @click="isModalVisible = false" class="text-gray-500 hover:text-gray-700">
                  <span class="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div class="mt-4 space-y-2">
                <p><strong>Student:</strong> {{ selectedAppointment.student }}</p>
                <p><strong>Subject:</strong> {{ selectedAppointment.subject }}</p>
                <p><strong>Time:</strong> {{ selectedAppointment.time }}</p>
                <p><strong>Location:</strong> {{ selectedAppointment.location }}</p>
                <p><strong>Type:</strong> {{ selectedAppointment.type }}</p>
                <p><strong>Date:</strong> {{ selectedAppointment.date }}</p>
              </div>

              <div class="mt-6 flex justify-end space-x-4">
                <button
                  @click="isModalVisible = false"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { CalendarIcon, ClockIcon, UsersIcon, InfoIcon, MessageSquareMore, Clock } from 'lucide-vue-next';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

// Define props
defineProps({
  isModalVisible: Boolean,
  selectedAppointment: Object,
});

// Define emits
const emit = defineEmits(["close"]);


const tabs = [
  { name: "Upcoming Appointments", icon: CalendarIcon, current: true },
  { name: "Appointment History", icon: ClockIcon, current: false },
  { name: "My Students", icon: UsersIcon, current: false },
];

const currentTab = ref("Upcoming Appointments");
const isModalVisible = ref(false);
const selectedAppointment = ref({});

const upcomingAppointments = [
  { id: 1, student: "Bernie Cherry Rante", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 2, student: "Jeseca Ruelan", subject: "Calculus 1", time: "3:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
];

const pastAppointments = [
  { id: 1, subject: "Physics 1", student: "Bernie Cherry Rante", date: "2024-10-10" },
  { id: 2, subject: "Algebra 2", student: "Jeseca Ruelan", date: "2024-10-08" },
];

const favoriteStudents = [
  { id: 1, student: "Bernie Cherry Rante", subjects: ["Chemistry", "Physics"], avatar: "/placeholder.svg" },
  { id: 2, student: "Jeseca Ruelan", subjects: ["Calculus", "Algebra"], avatar: "/placeholder.svg" },
];

function setCurrentTab(tabName) {
  tabs.forEach((tab) => (tab.current = tab.name === tabName));
  currentTab.value = tabName;
}

function openDetailsModal(appointment) {
  selectedAppointment.value = appointment;
  isModalVisible.value = true;
}

function rateAppointment(id) {
  console.log("Rate appointment with ID:", id);
}
</script>

<style>
/* Add additional custom styles here if needed */
</style>
