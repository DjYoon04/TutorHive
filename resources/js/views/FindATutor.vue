<template>
  <div class="container mx-auto px-4 pb-8 pt-4">
    <h1 class="text-4xl font-bold mb-8 text-center text-emerald-800">Find a Tutor</h1>

    <!-- Search and Filters -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="relative flex-grow">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name, subject, or expertise"
            class="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            @input="filterTutors"
          />
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
        </div>
        <div class="relative">
          <select
            v-model="selectedSubject"
            class="w-full md:w-auto p-2 pl-10 pr-8 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            @change="filterTutors"
          >
            <option value="">All Subjects</option>
            <option v-for="subject in subjects" :key="subject" :value="subject">
              {{ subject }}
            </option>
          </select>
          <BookOpen class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
        </div>
        <div class="relative">
          <select
            v-model="selectedAvailability"
            class="w-full md:w-auto p-2 pl-10 pr-8 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            @change="filterTutors"
          >
            <option value="">All Availabilities</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
            <option value="available_now">Available Now</option>
          </select>
          <Calendar class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
        </div>
        <div class="relative">
          <select
            v-model="selectedRating"
            class="w-full md:w-auto p-2 pl-10 pr-8 border rounded-lg appearance-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            @change="filterTutors"
          >
            <option value="">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
          <Star class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
          <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size="20" />
        </div>
      </div>
    </div>

    <!-- Tutor Grid -->
    <div v-if="filteredTutors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tutor in filteredTutors"
        :key="tutor.id"
        class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 border border-emerald-100"
      >
        <img :src="tutor.profilePicture" :alt="tutor.name" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2 text-emerald-800">{{ tutor.name }}</h2>
          <p class="text-emerald-600 mb-2 flex items-center">
            <GraduationCap class="mr-2" size="16" />
            {{ tutor.expertise }}
          </p>
          <p class="text-sm text-gray-600 mb-2">{{ tutor.bio }}</p>
          <div class="flex items-center mb-2 text-yellow-500">
            <Star class="mr-1" size="16" fill="currentColor" />
            <span>{{ tutor.rating }} ({{ tutor.reviewCount }} reviews)</span>
          </div>
          <p class="text-sm text-gray-600 mb-2 flex items-center">
            <MapPin class="mr-2" size="16" />
            {{ tutor.location }}
          </p>
          <p class="text-sm text-emerald-600 mb-2 flex items-center">
            <Clock class="mr-2" size="16" />
            {{ tutor.availability }}
          </p>
          <p class="text-sm text-emerald-500 mb-4 flex items-center">
            <Clock class="mr-2" size="16" />
            Preferred Time: {{ tutor.preferredTime }}
          </p>
          <div class="flex space-x-2">
            <button
              @click="viewProfile(tutor.id)"
              class="flex-1 bg-emerald-100 text-emerald-700 py-2 px-4 rounded-lg hover:bg-emerald-200 transition-colors duration-300 flex items-center justify-center"
            >
              <User class="mr-2" size="20" />
              View Profile
            </button>
            <button
              @click="bookSession(tutor.id)"
              class="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center"
            >
              <CalendarPlus class="mr-2" size="20" />
              Book Session
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results Message -->
    <div v-else class="text-center text-gray-600 mt-8">
      <AlertCircle class="mx-auto mb-4" size="48" />
      <p>No tutors found. Try broadening your search or adjusting your filters.</p>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="currentPage = page"
        :class="[
          'mx-1 px-3 py-1 rounded-lg',
          currentPage === page ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
        ]"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Search, BookOpen, Calendar, ChevronDown, GraduationCap, Star, MapPin, DollarSign, Clock, CalendarPlus, AlertCircle, User } from 'lucide-vue-next'

// Mock data (replace with API calls in a real application)
const tutors = ref([])
const subjects = ['Math', 'Science', 'Languages', 'History', 'Arts']

// Reactive state
const searchQuery = ref('')
const selectedSubject = ref('')
const selectedAvailability = ref('')
const selectedRating = ref('')
const currentPage = ref(1)
const itemsPerPage = 9

// Fetch tutors (simulated API call)
const fetchTutors = async () => {
  // Simulating an API call with setTimeout
  await new Promise(resolve => setTimeout(resolve, 1000))
  tutors.value = [
  {
    id: 1,
    name: 'John Doe',
    expertise: 'Math Expert',
    bio: 'Passionate about making math easy and fun',
    rating: 4.8,
    reviewCount: 120,
    location: 'New York, NY',
    availability: 'Available Today',
    preferredTime: '2:00 PM - 4:00 PM',
    profilePicture: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 2,
    name: 'Jane Smith',
    expertise: 'Science Tutor',
    bio: 'PhD in Physics, specializing in quantum mechanics',
    rating: 4.9,
    reviewCount: 85,
    location: 'Online',
    availability: 'Weekend slots available',
    preferredTime: '10:00 AM - 12:00 PM',
    profilePicture: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    expertise: 'Language Instructor',
    bio: 'Multilingual expert in Spanish, French, and German',
    rating: 5.0,
    reviewCount: 150,
    location: 'Los Angeles, CA',
    availability: 'Evenings and weekends',
    preferredTime: '6:00 PM - 8:00 PM',
    profilePicture: '/placeholder.svg?height=200&width=200'
  },
  {
    id: 4,
    name: 'Deins Knows',
    expertise: 'Language Instructor',
    bio: 'Multilingual expert in Spanish, French, and German',
    rating: 5.0,
    reviewCount: 150,
    location: 'Los Angeles, CA',
    availability: 'Evenings and weekends',
    preferredTime: '6:00 PM - 8:00 PM',
    profilePicture: '/placeholder.svg?height=200&width=200'
  }
]
    // Add more mock tutors here...
}

// Filter tutors based on search query and selected filters
const filterTutors = () => {
  filteredTutors.value = tutors.value.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          tutor.expertise.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSubject = !selectedSubject.value || tutor.expertise.includes(selectedSubject.value)
    const matchesAvailability = !selectedAvailability.value || 
                                (selectedAvailability.value === 'online' && tutor.location === 'Online') ||
                                (selectedAvailability.value === 'offline' && tutor.location !== 'Online') ||
                                (selectedAvailability.value === 'available_now' && tutor.availability.includes('Available Today'))
    const matchesRating = !selectedRating.value || tutor.rating >= parseFloat(selectedRating.value)
    return matchesSearch && matchesSubject && matchesAvailability && matchesRating
  })
}

// Computed properties
const filteredTutors = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return tutors.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(tutors.value.length / itemsPerPage))

// Methods
const bookSession = (tutorId) => {
  // Implement booking logic here
  console.log(`Booking session with tutor ID: ${tutorId}`)
}

const viewProfile = (tutorId) => {
  // Implement view profile logic here
  console.log(`Viewing profile of tutor ID: ${tutorId}`)
}

// Lifecycle hooks
onMounted(async () => {
  await fetchTutors()
  filterTutors()
})
</script>