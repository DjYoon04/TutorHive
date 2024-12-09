<template>
  <div class="bg-white rounded-[30px] shadow-xl overflow-hidden h-full max-h-full pb-24">
     <h1 class="mt-4 text-2xl sm:text-3xl font-bold text-emerald-800 text-center">
          Dashboard
        </h1>
    
      <!-- Header and Tabs -->
      <div class="mx-4 sm:mx-6 overflow-y-auto">
        <nav class="flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-1 mt-2" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            @click="setCurrentTab(tab.name)"
            :class="[ 
              currentTab === tab.name
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'group inline-flex items-center py-2 px-2 sm:py-4 sm:px-4 border-b-2 font-medium text-sm'
            ]"
            :aria-current="currentTab === tab.name ? 'page' : undefined"
          >
            <component
              :is="tab.icon"
              :class="[ 
                currentTab === tab.name ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500',
                'mr-2 h-4 w-4 sm:h-5 sm:w-5'
              ]"
              aria-hidden="true"
            />
            <span class="hidden sm:inline">{{ tab.name }}</span>
          </button>
        </nav>
      </div>

      <!-- Tab Contents -->
      <div class="p-4 sm:p-6 overflow-y-auto max-h-full [&::-webkit-scrollbar]:w-2">
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
                    <img 
                      :src="getAvatarUrl(appointment.student)" 
                      :alt="appointment.student" 
                      class="h-12 w-12 rounded-full"
                    />
                    <div>
                      <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.student }}</p>
                      <p class="text-sm text-gray-500">{{ appointment.subject }}</p>
                    </div>
                  </div>
                  <div class="mt-2 sm:mt-0 flex items-center space-x-2">
                    <p class="flex items-center text-xs sm:text-sm font-semibold text-teal-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 rounded-full px-2 py-1 cursor-pointer shadow-sm">
                      <Clock class="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1" />
                      {{ appointment.time }}
                    </p>
                    <button
                      @click="openDetailsModal(appointment)"
                      class="inline-flex items-center px-1 py-1 border text-sm rounded-full text-teal-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 shadow-sm hover:bg-emerald-200 transition ease-in-out hover:scale-110"
                    >
                      <InfoIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                     
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
                      @click="openDetailsModal(appointment)"
                      class="inline-flex items-center px-1 py-1 border text-sm rounded-full text-teal-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 shadow-sm hover:bg-emerald-200 transition ease-in-out hover:scale-110"
                    >
                      <InfoIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                     
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
        <div class="flex items-center flex-wrap sm:flex-nowrap">
          <img 
            :src="getAvatarUrl(student.student)"
            :alt="student.student"
            class="h-12 w-12 rounded-full"
          />
          <div class="ml-4">
            <p class="text-sm font-medium text-emerald-600 truncate">{{ student.student }}</p>
            <p class="text-sm text-gray-500">{{ student.subjects.join(', ') }}</p>
          </div>
          <button
            @click="rateAppointment(appointment.id)"
            class="ml-auto mt-2 sm:mt-0 px-3 py-2 sm:py-1 text-sm sm:text-base rounded-lg text-cyan-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 hover:bg-emerald-200 flex items-center font-medium transition ease-in-out hover:scale-105 shadow-md w-full sm:w-auto justify-center sm:justify-start">
            <MessageCircle class="h-4 w-4 mr-1" />
            Comment
          </button>
        </div>
      </li>
    </ul>
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
                <p><strong>Student:</strong> {{ selectedAppointment?.student }}</p>
                <p><strong>Subject:</strong> {{ selectedAppointment?.subject }}</p>
                <p><strong>Time:</strong> {{ selectedAppointment?.time }}</p>
                <p><strong>Location:</strong> {{ selectedAppointment?.location }}</p>
                <p><strong>Type:</strong> {{ selectedAppointment?.type }}</p>
                <p><strong>Date:</strong> {{ selectedAppointment?.date }}</p>
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
import { ref } from 'vue';
import { CalendarIcon, ClockIcon, UsersIcon, InfoIcon, MessageCircle, Clock } from 'lucide-vue-next';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

// State
const currentTab = ref("Upcoming Appointments");
const isModalVisible = ref(false);
const selectedAppointment = ref(null);

const upcomingAppointments = [
  { id: 1, student: "Bernie Cherry Rante", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 2, student: "Jeseca Ruelan", subject: "Calculus 1", time: "3:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
  { id: 3, student: "Kurt Reserva", subject: "Mathematics", time: "5:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 4, student: "Runard Ramos", subject: "Physics", time: "1:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
  { id: 5, student: "Lawrence Sabrido", subject: "Advanced Physics", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 6, student: "Glomer Celestino", subject: "Science", time: "4:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
  { id: 7, student: "Mark Taglucop", subject: "English", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 8, student: "Marc Ybiernas", subject: "Physical Education", time: "1:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
  { id: 9, student: "Cyrel Rollo", subject: "Earth Science", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12", avatar: "/placeholder.svg" },
  { id: 10, student: "Drandreb Reyes", subject: "Calculus 2", time: "2:30 PM", location: "Library", type: "In-person", date: "2024-12-11", avatar: "/placeholder.svg" },
];

const pastAppointments = [
  { id: 1, subject: "Physics 1", student: "Bernie Cherry Rante", date: "2024-10-10" },
  { id: 2, subject: "Algebra 2", student: "Jeseca Ruelan", date: "2024-10-08" },
];

const favoriteStudents = [
  { id: 1, student: "Bernie Cherry Rante", subjects: ["Chemistry", "Physics"], avatar: "/placeholder.svg" },
  { id: 2, student: "Jeseca Ruelan", subjects: ["Calculus", "Algebra"], avatar: "/placeholder.svg" },
];

// Tabs data
const tabs = [
  { name: 'Upcoming Appointments', icon: CalendarIcon },
  { name: 'Appointment History', icon: ClockIcon },
  { name: 'My Students', icon: UsersIcon },
];

// Methods
function setCurrentTab(tabName) {
  currentTab.value = tabName;
}

function getAvatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
}

function openDetailsModal(appointment) {
  selectedAppointment.value = appointment;
  isModalVisible.value = true;
}

function rateAppointment(appointmentId) {
  // Handle rating the appointment (e.g., open a rating modal or form)
  console.log(`Rating appointment with ID: ${appointmentId}`);
}
</script>

<style scoped>

</style>