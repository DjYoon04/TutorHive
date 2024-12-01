<template>
  <div class="space-y-4">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <a
          v-for="tab in tabs"
          :key="tab.name"
          :href="tab.href"
          :class="[
            tab.current
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'whitespace-nowrap border-b-2 pb-4 pt-2 px-1 text-sm font-medium'
          ]"
          @click.prevent="setCurrentTab(tab.name)"
        >
          {{ tab.name }}
        </a>
      </nav>
    </div>

    <div v-if="currentTab === 'Upcoming Sessions'" class="space-y-3">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <h3 class="text-lg font-semibold mb-4">Today's Sessions</h3>
        <div class="space-y-4">
          <div
            v-for="session in upcomingSessions"
            :key="session.id"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="mb-2 sm:mb-0">
              <p class="font-medium">{{ session.tutor }}</p>
              <p class="text-sm text-gray-500">{{ session.subject }}</p>
              <p class="text-sm text-gray-500">{{ session.time }}</p>
            </div>
            <div class="relative">
              <button
                @click="openDetailsModal(session)"
                class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
              >
                <InfoIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentTab === 'Session History'" class="space-y-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <h3 class="text-lg font-semibold mb-4">Past Sessions</h3>
        <div class="space-y-4">
          <div v-for="session in pastSessions" :key="session.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="font-medium">{{ session.subject }}</p>
              <p class="text-sm text-gray-500">Tutor: {{ session.tutor }}</p>
              <p class="text-sm text-gray-500">Date: {{ session.date }}</p>
            </div>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-1 px-4 rounded w-full sm:w-auto">
              Rate
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentTab === 'My Tutors'" class="space-y-4">
      <div class="bg-white shadow rounded-lg p-4 sm:p-6">
        <h3 class="text-lg font-semibold mb-4">Previous Tutors</h3>
        <div class="space-y-4">
          <div v-for="tutor in favoriteTutors" :key="tutor.id" class="flex items-center space-x-4">
            <img :src="tutor.avatar" :alt="tutor.name" class="h-10 w-10 rounded-full" />
            <div>
              <p class="font-medium">{{ tutor.name }}</p>
              <p class="text-sm text-gray-500">{{ tutor.subjects.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="isModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-6">
      <h3 class="text-lg font-semibold mb-4">Session Details</h3>
      <p><strong>Tutor:</strong> {{ selectedSession.tutor }}</p>
      <p><strong>Subject:</strong> {{ selectedSession.subject }}</p>
      <p><strong>Location:</strong> {{ selectedSession.location }}</p>
      <p><strong>Type:</strong> {{ selectedSession.type }}</p>
      <p><strong>Time:</strong> {{ selectedSession.time }}</p>
      <div class="mt-4">
        <button
          @click="isModalVisible = false"
          class="px-4 py-2 text-sm text-white bg-emerald-600 rounded hover:bg-emerald-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { InfoIcon } from 'lucide-vue-next';

// Static data
const tabs = [
  { name: "Upcoming Sessions", href: "#", current: true },
  { name: "Session History", href: "#", current: false },
  { name: "My Tutors", href: "#", current: false },
];

const upcomingSessions = [
  { id: 1, tutor: "Jelli Uayan", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call" },
  { id: 2, tutor: "Jera Acero", subject: "Calculus 1", time: "3:30 PM", location: "Library", type: "In-person" },
];

const pastSessions = [
  { id: 1, subject: "Physics 1", tutor: "Jelli Uayan", date: "2024-10-10" },
  { id: 2, subject: "Algebra 2", tutor: "Juan Dela Cruz", date: "2024-10-08" },
];

const favoriteTutors = [
  { id: 1, name: "Jelli Uayan", subjects: ["Chemistry", "Physics"], avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Jera Acero", subjects: ["Calculus", "Algebra"], avatar: "/placeholder.svg?height=40&width=40" },
];

const currentTab = ref("Upcoming Sessions");
const isModalVisible = ref(false);
const selectedSession = ref(null);

const setCurrentTab = (tabName) => {
  tabs.forEach((tab) => {
    tab.current = tab.name === tabName;
  });
  currentTab.value = tabName;
};

const openDetailsModal = (session) => {
  selectedSession.value = session;
  isModalVisible.value = true;
};
</script>