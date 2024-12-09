<template>
  <div class="flex h-screen flex-col">
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar for larger screens -->
      <aside class="w-60 border-r bg-cyan-50/40 px-3 sm:px-8 pt-10 flex-col hidden lg:flex">
        <div class="flex items-center space-x-4">
          <span class="font-bold text-2xl text-gray-700">TutorHive</span>
        </div>
        <nav class="space-y-2 mt-6">
          <a
            v-for="item in navItems"
            :key="item.name"
            href="#"
            class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200"
            :class="{ 'bg-gray-200': currentSection === item.section }"
            @click.prevent="currentSection = item.section"
          >
            <component :is="item.icon" class="h-5 w-5" />
            <span>{{ item.name }}</span>
          </a>
        </nav>
        <div class="mt-44">
          <button
            @click="isProfileOpen = true"
            class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 w-full"
          >
            <SettingsIcon class="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Mobile header -->
        <header class="lg:hidden bg-cyan-50/40 p-4 flex justify-between items-center">
          <span class="font-bold text-xl text-gray-700">TutorHive</span>
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-gray-600">
            <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XIcon v-else class="h-6 w-6" />
          </button>
        </header>

        <!-- Mobile menu -->
        <nav v-if="isMobileMenuOpen" class="lg:hidden bg-cyan-50/40 p-4 overflow-y-auto">
          <div class="flex flex-col items-center mb-6">
            <div class="relative h-20 w-20 rounded-full overflow-hidden mb-2">
              <img
                :src="Studentimg"
                alt="Profile picture"
                class="h-full w-full object-cover"
              />
            </div>
            <h2 class="text-lg font-semibold">Bernie Cherry D. Rante</h2>
            <p class="text-sm text-gray-500">Student</p>
          </div>
          <div class="space-y-2">
            <a
              v-for="item in navItems"
              :key="item.name"
              href="#"
              class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200"
              :class="{ 'bg-gray-200': currentSection === item.section }"
              @click.prevent="currentSection = item.section; isMobileMenuOpen = false"
            >
              <component :is="item.icon" class="h-5 w-5" />
              <span>{{ item.name }}</span>
            </a>
            <button
              @click="isProfileOpen = true; isMobileMenuOpen = false"
              class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-200 w-full"
            >
              <SettingsIcon class="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <main class="flex-1 overflow-y-auto p-4 sm:p-6">
          <!--Dashboard-->
          <template v-if="currentSection === 'dashboard'">
            <h1 class="mt-3 text-3xl sm:text-3xl font-bold sm:mb-2 text-emerald-800 flex-center">Dashboard</h1>
            <div class="space-y-4 mt-4"> 
              <div>
                <dashboardhome />
              </div>
            </div>
          </template>

          <!--Profile-->
          <template v-if="currentSection === 'profile'">
            <StudentProfile />
          </template>

          <!--Schedule-->
          <template v-if="currentSection === 'appointments'">
            <appointments /> 
          </template>

          <!--Find a tutor-->
          <template v-if="currentSection === 'findatutor'">
            <div class="mx-auto max-w-6xl">
              <FindATutor />
            </div>
          </template>
        </main>
      </div>
    </div>

    <!-- Profile settings modal -->
    <div v-if="isProfileOpen" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isProfileOpen = false"></div>
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl">
              <div class="flex-1 h-0 overflow-y-auto">
                <header class="p-6 flex justify-between items-center">
                  <h2 class="text-lg font-medium text-gray-900">Profile Settings</h2>
                  <button @click="isProfileOpen = false" class="text-gray-400 hover:text-gray-500">
                    <XIcon class="h-6 w-6" />
                  </button>
                </header>
                <div class="flex flex-col items-center p-6">
                  <div class="relative h-32 w-32 rounded-full overflow-hidden">
                    <img
                      :src="Studentimg"
                      alt="Profile picture"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <h2 class="mt-4 text-xl font-semibold">Bernie Cherry D. Rante</h2>
                  <p class="text-sm text-gray-500">Student</p>
                </div>
                <!-- Navigation -->
                <nav class="mt-6 px-6">
                  <ul class="space-y-2">
                    <li>
                      <button
                        @click="openChangePassword"
                        class="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <LockIcon class="h-5 w-5" />
                        <span>Change Password</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="openHelpSupport"
                        class="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <HelpCircleIcon class="h-5 w-5" />
                        <span>Help & Support</span>
                      </button>
                    </li>
                    <li>
                      <button
                        @click="logOut"
                        class="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <LogOutIcon class="h-5 w-5" />
                        <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

    <!-- Change Password Modal -->
    <div v-if="isChangePasswordOpen" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isChangePasswordOpen = false"></div>
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl">
              <header class="p-6 flex justify-between items-center">
                <button @click="isChangePasswordOpen = false; isProfileOpen = true" class="text-gray-600 hover:text-gray-800">
                  <ArrowLeftIcon class="h-5 w-5" />
                </button>
                <h2 class="text-lg font-medium text-gray-900">Change Password</h2>
                <button @click="isChangePasswordOpen = false" class="text-gray-400 hover:text-gray-500">
                  <XIcon class="h-6 w-6" />
                </button>
              </header>
              <div class="flex-1 h-0 overflow-y-auto p-6">
                <form @submit.prevent="changePassword">
                  <div class="space-y-4">
                    <div>
                      <label for="currentPassword" class="block text-sm font-medium text-gray-700">Current Password</label>
                      <input type="password" id="currentPassword" v-model="passwordForm.currentPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                      <label for="newPassword" class="block text-sm font-medium text-gray-700">New Password</label>
                      <input type="password" id="newPassword" v-model="passwordForm.newPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                    <div>
                      <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input type="password" id="confirmPassword" v-model="passwordForm.confirmPassword" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </div>
                  </div>
                  <div class="mt-6">
                    <button type="submit" class="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- Help & Support Modal -->
    <div v-if="isHelpSupportOpen" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isHelpSupportOpen = false"></div>
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl">
              <header class="p-6 flex justify-between items-center">
                <button @click="isHelpSupportOpen = false; isProfileOpen = true" class="text-gray-600 hover:text-gray-800">
                  <ArrowLeftIcon class="h-5 w-5" />
                </button>
                <h2 class="text-lg font-medium text-gray-900">Help & Support</h2>
                <button @click="isHelpSupportOpen = false" class="text-gray-400 hover:text-gray-500">
                  <XIcon class="h-6 w-6" />
                </button>
              </header>
              <div class="flex-1 h-0 overflow-y-auto p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-4">Frequently Asked Questions</h3>
                <ul class="space-y-4">
                  <li>
                    <h4 class="text-base font-medium text-gray-900">How do I book a tutor?</h4>
                    <p class="mt-1 text-sm text-gray-500">You can book a tutor by navigating to the "Find a Tutor" section and selecting an available time slot.</p>
                  </li>
                  <li>
                    <h4 class="text-base font-medium text-gray-900">How do I cancel a session?</h4>
                    <p class="mt-1 text-sm text-gray-500">To cancel a session, go to your "Appointments" and click on the cancel button next to the relevant session.</p>
                  </li>
                  <li>
                    <h4 class="text-base font-medium text-gray-900">How can I contact support?</h4>
                    <p class="mt-1 text-sm text-gray-500">For additional support, please email us at support@tutorhive.com or use the chat feature in the bottom right corner of the screen.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { BookCheck, CircleUserRound, ArrowLeftIcon } from 'lucide-vue-next';
import { HomeIcon, MailIcon, SettingsIcon, LockIcon, HelpCircleIcon, LogOutIcon, MenuIcon, XIcon, UserRoundSearch } from 'lucide-vue-next'
import FindATutor from './components/FindATutor.vue';
import appointments from './components/appointments.vue';
import dashboardhome from './components/dashboardhome.vue';
import email from './components/email.vue';
import StudentProfile from './components/StudentProfile.vue';

const Studentimg = '/img/bernielat.jpg';
const isProfileOpen = ref(false)
const isMobileMenuOpen = ref(false)
const currentTab = ref('Upcoming Sessions')
const currentSection = ref('dashboard')

const isChangePasswordOpen = ref(false)
const isHelpSupportOpen = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const navItems = [
  { name: 'Dashboard', section: 'dashboard', icon: HomeIcon },
  { name: 'Profile', section: 'profile', icon: CircleUserRound},
  { name: 'Appointments', section: 'appointments', icon: BookCheck },
  { name: 'Find a Tutor', section: 'findatutor', icon: UserRoundSearch}
]


const openChangePassword = () => {
  isChangePasswordOpen.value = true
  isProfileOpen.value = false
}

const openHelpSupport = () => {
  isHelpSupportOpen.value = true
  isProfileOpen.value = false
}

const saveProfile = () => {
  // Implement save profile logic here
  console.log('Saving profile:', profile.value)
  isEditProfileOpen.value = false
}

const changePassword = () => {
  // Implement change password logic here
  console.log('Changing password:', passwordForm.value)
  isChangePasswordOpen.value = false
}

const logOut = () => {
  // Implement logout logic here
  console.log('Logging out')
}
</script>

