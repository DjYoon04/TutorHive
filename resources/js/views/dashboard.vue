<template>
  <div class="flex h-screen flex-col">
    <header class="flex items-center justify-between border-b bg-gradient-to-br from-cyan-700 to-emerald-500 text-white px-4 sm:px-6 py-3">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl sm:text-2xl font-bold text-white">TutorHive</h1>
      </div>
      <div class="flex items-center space-x-4">
        <form class="relative hidden sm:block">
          <SearchIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            class="w-96 rounded-xl bg-white pl-8 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-12 mr-12"
            placeholder="Search..."
            type="search"
          />
        </form>
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="sm:hidden text-white">
          <MenuIcon v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <XIcon v-else class="h-6 w-6" />
        </button>
      </div>
    </header>
    <div class="flex flex-1 overflow-hidden">
      <aside class="w-64 border-r bg-cyan-50/40 px-4 sm:px-8 py-6 flex flex-col hidden sm:flex">
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
        <div class="mt-auto">
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
        <nav v-if="isMobileMenuOpen" class="sm:hidden bg-gray-100/40 p-4">
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
          <template v-if="currentSection === 'dashboard'">
            <h2 class="mb-6 text-xl sm:text-2xl font-bold">Welcome Back, Bernie!</h2>
            <div class="space-y-4">
              <div class="border-b border-gray-200 overflow-x-auto">
                <nav class="-mb-px flex space-x-8">
                  <a
                    v-for="tab in tabs"
                    :key="tab.name"
                    :href="tab.href"
                    :class="[
                      tab.current
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                    ]"
                    @click.prevent="setCurrentTab(tab.name)"
                  >
                    {{ tab.name }}
                  </a>
                </nav>
              </div>

              <div v-if="currentTab === 'Upcoming Sessions'" class="space-y-4">
                <div class="bg-white shadow rounded-lg p-4 sm:p-6">
                  <h3 class="text-lg font-semibold mb-4">Today's Sessions</h3>
                  <div class="space-y-4">
                    <div v-for="session in upcomingSessions" :key="session.id" class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div class="mb-2 sm:mb-0">
                        <p class="font-medium">{{ session.tutor }}</p>
                        <p class="text-sm text-gray-500">{{ session.subject }}</p>
                        <p class="text-sm text-gray-500">{{ session.time }}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        <button className="inline-flex items-center justify-center p-3 py-1 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors">
                          View Details
                        </button>
                        <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                          <CheckCircleIcon className="w-2 h-2 mr-2" />
                        </button>
                        <button className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                          Cancel
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
                        Give Feedback
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentTab === 'My Tutors'" class="space-y-4">
                <div class="bg-white shadow rounded-lg p-4 sm:p-6">
                  <h3 class="text-lg font-semibold mb-4">Favorite Tutors</h3>
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
          </template>

          <template v-if="currentSection === 'schedule'">
            <h2 class="mb-6 text-xl sm:text-2xl font-bold">Your Schedule</h2>
            <div class="bg-white shadow rounded-lg p-4 sm:p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">October 2024</h3>
                <div class="flex space-x-2">
                  <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                    <ChevronLeftIcon class="h-5 w-5" />
                  </button>
                  <button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                    <ChevronRightIcon class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-2">
                <div v-for="day in calendarDays" :key="day.date" class="border rounded-lg p-2 h-24">
                  <p class="text-sm font-semibold" :class="{ 'text-emerald-600': day.isToday }">
                    {{ day.date }}
                  </p>
                  <div v-if="day.sessions.length > 0" class="mt-1">
                    <p v-for="session in day.sessions" :key="session.id" class="text-xs text-gray-600 truncate">
                      {{ session.time }} - {{ session.subject }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template v-if="currentSection === 'email'">
            <h2 class="mb-6 text-xl sm:text-2xl font-bold">Email</h2>
            <div class="space-y-6">
              <div class="bg-white shadow rounded-lg p-4 sm:p-6">
                <h3 class="text-lg font-semibold mb-4">New Email</h3>
                <form @submit.prevent="sendEmail" class="space-y-4">
                  <div>
                    <label for="to" class="block text-sm font-medium text-gray-700">To</label>
                    <input
                      v-model="newEmail.to"
                      id="to"
                      type="email"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      v-model="newEmail.subject"
                      id="subject"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      v-model="newEmail.message"
                      id="message"
                      rows="4"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <button type="submit" class="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors">
                    Send Email
                  </button>
                </form>
              </div>

              <div class="bg-white shadow rounded-lg p-4 sm:p-6">
                <h3 class="text-lg font-semibold mb-4">Recent Emails</h3>
                <div class="space-y-4">
                  <div v-for="email in emails" :key="email.id" class="border-b border-gray-200 pb-2">
                    <p class="font-semibold text-gray-800">{{ email.sender }}</p>
                    <p class="text-sm text-gray-500">To: {{ email.receiver }}</p>
                    <p class="mt-1 text-gray-700">{{ email.message }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </main>
      </div>
    </div>

    <div v-if="isProfileOpen" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isProfileOpen = false"></div>
        <section class="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl">
              <div class="flex-1 h-0 overflow-y-auto">
                <header class="p-6">
                  <h2 class="text-lg font-medium text-gray-900">Profile Settings</h2>
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
                  <p class="text-sm text-gray-500">Tutor</p>
                </div>
                <nav class="mt-6 px-6">
                  <ul class="space-y-2">
                    <li>
                      <a href="#" class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                        <UserIcon class="h-5 w-5" />
                        <span>Edit Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                        <LockIcon class="h-5 w-5" />
                        <span>Change Password</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                        <HelpCircleIcon class="h-5 w-5" />
                        <span>Help & Support</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" class="flex items-center space-x-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100">
                        <LogOutIcon class="h-5 w-5" />
                        <span>Log Out</span>
                      </a>
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
</template>

<script setup>
import { ref } from 'vue'
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next';
import { SearchIcon, HomeIcon, CalendarIcon, MailIcon, SettingsIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon, LockIcon, BellIcon, HelpCircleIcon, LogOutIcon, MenuIcon, XIcon } from 'lucide-vue-next'

const Studentimg = '/img/bernielat.jpg';
const isProfileOpen = ref(false)
const isMobileMenuOpen = ref(false)
const currentTab = ref('Upcoming Sessions')
const currentSection = ref('dashboard')

const navItems = [
  { name: 'Dashboard', section: 'dashboard', icon: HomeIcon },
  { name: 'Schedule', section: 'schedule', icon: CalendarIcon },
  { name: 'Email', section: 'email', icon: MailIcon },
]

const tabs = [
  { name: 'Upcoming Sessions', href: '#', current: true },
  { name: 'Session History', href: '#', current: false },
  { name: 'My Tutors', href: '#', current: false },
]

const upcomingSessions = [
  { id: 1, tutor: 'Jelli Uayan', subject: 'Chemistry', time: '2:00pm' },
  { id: 2, tutor: 'Jera Acero', subject: 'Calculus 1', time: '3:30pm' },
]

const pastSessions = [
  { id: 1, subject: 'Physics 1', tutor: 'Jelli Uayan', date: '2024-10-10' },
  { id: 2, subject: 'Algebra 2', tutor: 'Juan Dela Cruz', date: '2024-10-08' },
]

const favoriteTutors = [
  { id: 1, name: 'Jelli Uayan', subjects: ['Chemistry', 'Physics'], avatar: '' },
  { id: 2, name: 'Jera Acero', subjects: ['Calculus', 'Algebra'], avatar: '' },
]

const calendarDays = [
  { date: '1', isToday: false, sessions: [] },
  { date: '2', isToday: false, sessions: [] },
  { date: '3', isToday: false, sessions: [] },
  { date: '4', isToday: false, sessions: [] },
  { date: '5', isToday: false, sessions: [] },
  { date: '6', isToday: false, sessions: [] },
  { date: '7', isToday: false, sessions: [] },
  { date: '8', isToday: false, sessions: [] },
  { date: '9', isToday: false, sessions: [] },
  { date: '10', isToday: false, sessions: [] },
  { date: '11', isToday: false, sessions: [] },
  { date: '12', isToday: false, sessions: [] },
  { date: '13', isToday: false, sessions: [] },
  { date: '14', isToday: false, sessions: [] },
  { date: '15', isToday: true, sessions: [{ id: 1, time: '2:00pm', subject: 'Chemistry' }] },
  { date: '16', isToday: false, sessions: [] },
  { date: '17', isToday: false, sessions: [{ id: 2, time: '3:30pm', subject: 'Calculus' }] },
  { date: '18', isToday: false, sessions: [] },
  { date: '19', isToday: false, sessions: [] },
  { date: '20', isToday: false, sessions: [] },
  { date: '21', isToday: false, sessions: [] },
  { date: '22', isToday: false, sessions: [] },
  { date: '23', isToday: false, sessions: [] },
  { date: '24', isToday: false, sessions: [] },
  { date: '25', isToday: false, sessions: [] },
  { date: '26', isToday: false, sessions: [] },
  { date: '27', isToday: false, sessions: [] },
  { date: '28', isToday: false, sessions: [] },
  { date: '29', isToday: false, sessions: [] },
  { date: '30', isToday: false, sessions: [] },
  { date: '31', isToday: false, sessions: [] },
]

const emails = ref([
  { id: 1, sender: 'Jane Smith', receiver: 'bernie@example.com', message: 'Hello, how are you?' },
  { id: 2, sender: 'Bob Johnson', receiver: 'bernie@example.com', message: 'Meeting at 3 PM' },
])

const newEmail = ref({
  to: '',
  subject: '',
  message: ''
})

const setCurrentTab = (tabName) => {
  currentTab.value = tabName
  tabs.forEach(tab => tab.current = tab.name === tabName)
}

// Simulated EmailJS function
const emailjs = {
  send: (serviceId, templateId, params) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email sent:', params)
        resolve({ status: 200, text: 'OK' })
      }, 1000)
    })
  }
}

const sendEmail = async () => {
  try {
    await emailjs.send('service_id', 'template_id', {
      to_email: newEmail.value.to,
      subject: newEmail.value.subject,
      message: newEmail.value.message,
    })
    emails.value.unshift({
      id: emails.value.length + 1,
      sender: 'You',
      receiver: newEmail.value.to,
      message: newEmail.value.message
    })
    newEmail.value = { to: '', subject: '', message: '' }
  } catch (error) {
    console.error('Failed to send email:', error)
  }
}
</script>