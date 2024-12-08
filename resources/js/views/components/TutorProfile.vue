<template>
  <div class="p-10 bg-white shadow-xl rounded-[30px] overflow-hidden h-full custom-scrollbar">
    <h1 class="text-2xl sm:text-3xl font-bold text-emerald-800 text-center">Profile</h1>

    <!-- Header Section -->
     <div>
      <div class="w-32 h-32 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-600 relative">
        <img v-if="profile.picture" :src="profile.picture" alt="Profile Picture" class="w-full h-full object-cover rounded-full" />
        <User v-else size="64" />
      </div>
      <div class="flex md:flex-row items-center md:space-y-0 md:space-x-6 mb-5 relative">
        <div class="text-center md:text-left pt-6">
          <h2 class="text-2xl font-semibold text-emerald-800 flex items-center justify-center">
            {{ profile.name }}
            <button @click="openEditModal" class="ml-2 px-2 bg-white text-emerald-600 p-1 rounded-full hover:bg-gray-100 transition duration-200">
              ✎
            </button>
          </h2>
          <p class="text-emerald-600">{{ profile.role }}</p>
        </div>
      </div>
    </div>
    <!-- About Section -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">About Me</h3>
      <p class="text-gray-600 mb-4">
        {{ profile.about }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 class="font-medium text-emerald-700">University</h4>
          <p class="text-gray-600">{{ profile.university }}</p>
        </div>
        <div>
          <h4 class="font-medium text-emerald-700">Specialization</h4>
          <p class="text-gray-600">{{ profile.specialization }}</p>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">Skills</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="skill in skills" :key="skill" class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                {{ skill }}
          </span>
        </div>
    </section>

    <!-- Current Courses -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">Current Courses</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="course in currentCourses" :key="course.name" class="bg-emerald-100 p-4 rounded">
          <h4 class="font-medium text-emerald-800">{{ course.name }}</h4>
          <p class="text-gray-600">{{ course.description }}</p>
        </div>
      </div>
    </section>

    <!-- Reviews and Testimonials -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">Reviews</h3>
        <div class="space-y-4">
          <div v-for="review in reviews" :key="review.id" class="bg-gray-50 p-4 rounded">
            <div class="flex items-center mb-2">
              <span class="font-medium text-emerald-800">{{ review.name }}</span>
              <div class="ml-2">
                <Star v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" class="w-4 h-4 inline-block" />
              </div>
            </div>
            <p class="text-gray-600">{{ review.comment }}</p>
          </div>
       </div>
    </section>

    <!-- Contact and Interaction Options -->
    <section class="mb-8">
      <h3 class="text-lg font-semibold text-emerald-800 mb-2">Contact</h3>
      <div class="mt-4 flex items-center space-x-4">
        <a href="#" class="text-emerald-600 hover:text-emerald-800">
          <Linkedin class="w-6 h-6" />
        </a>
        <a href="#" class="text-emerald-600 hover:text-emerald-800">
          <Github class="w-6 h-6" />
        </a>
        <span class="text-gray-600">
          <Mail class="w-5 h-5 inline-block mr-2" />
          jane.doe@example.com
        </span>
      </div>
    </section>

    <!-- Edit Profile Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div class="relative w-full max-w-5xl h-full bg-gradient-to-br from-emerald-400 to-teal-700 rounded-xl shadow-xl overflow-hidden">
          <div class="px-12 h-full overflow-y-auto custom-scrollbar">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-semibold text-white">Edit Profile</h2>
              <button @click="isEditModalOpen = false" class="text-white hover:text-gray-200">
                <XIcon class="h-6 w-6" />
              </button>
            </div>
            <!-- Form -->
            <form @submit.prevent="saveProfile" class="space-y-6 px-6">
              <!-- Profile Photo -->
              <div class="flex flex-col items-center space-y-4 mb-6">
                <div class="relative h-44 w-44">
                  <img 
                    :src="previewImage || '/placeholder.svg?height=300&width=300'" 
                    class="h-44 w-44 rounded-full object-cover border-4 border-white"
                    alt="Profile"
                  />
                </div>
                <div class="flex space-x-2">
                  <label 
                    class="px-4 py-2 bg-white text-emerald-600 text-sm rounded-md cursor-pointer transition hover:bg-gray-100"
                  >
                    Change
                    <input 
                      type="file" 
                      class="hidden" 
                      @change="handleFileUpload" 
                      accept="image/*"
                    />
                  </label>
                  <button 
                    type="button"
                    @click="removePhoto"
                    class="px-4 py-2 bg-white text-emerald-600 text-sm rounded-md transition hover:bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Basic Information Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div class="space-y-1">
                  <label for="fullName" class="block text-sm font-medium text-white">Full name</label>
                  <input
                    type="text"
                    id="fullName"
                    v-model="profile.fullName"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <!-- Skills -->
                <div class="space-y-1">
                  <label for="skills" class="block text-sm font-medium text-white">Skills</label>
                  <input
                    type="text"
                    id="skills"
                    v-model="profile.skills"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. Web Development, UI/UX Design"
                  />
                </div>

                <!-- University -->
                <div class="space-y-1">
                  <label for="university" class="block text-sm font-medium text-white">University</label>
                  <input
                    type="text"
                    id="university"
                    v-model="profile.university"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your university"
                  />
                </div>

                <!-- Specialization -->
                <div class="space-y-1">
                  <label for="specialization" class="block text-sm font-medium text-white">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    v-model="profile.specialization"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your specialization"
                  />
                </div>

                <!-- Current Courses -->
                <div class="space-y-1">
                  <label for="currentCourses" class="block text-sm font-medium text-white">Current Courses</label>
                  <input
                    type="text"
                    id="currentCourses"
                    v-model="profile.currentCourses"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your current courses"
                  />
                </div>

                <!-- Contacts (Email) -->
                <div class="space-y-1">
                  <label for="email" class="block text-sm font-medium text-white">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="profile.email"
                    class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <!-- About Me -->
              <div class="space-y-1">
                <label for="aboutMe" class="block text-sm font-medium text-white">About Me</label>
                <textarea
                  id="aboutMe"
                  v-model="profile.aboutMe"
                  rows="4"
                  class="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>

              <!-- Save Button -->
              <button
                type="submit"
                class="w-full bg-white text-emerald-600 rounded-md py-2 px-4 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    

  
</template>

<script setup>
import { ref, computed } from 'vue'
import { User, Star, Linkedin, Github, Mail, XIcon } from 'lucide-vue-next'

const profile = ref({
  name: 'Djeah A. Tabada',
  role: 'Tutor',
  year: '3rd Year',
  major: 'Computer Science Major',
  picture: '', // Placeholder for profile picture
  about: 'Passionate mathematics tutor with 5 years of experience. I specialize in making complex concepts easy to understand and enjoy helping students build confidence in their math skills.',
  university: 'Caraga State University',
  specialization: 'Artificial Intelligence and Machine Learning',
  learningGoals: [
    'Master advanced machine learning algorithms',
    'Improve proficiency in Python and TensorFlow',
    'Understand and implement neural network architectures',
    'Prepare for AI research internships'
  ]
})

const skills = ref(['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Problem Solving', 'Test Preparation'])

const reviews = ref([
  { id: 1, name: 'Alex M.', rating: 5, comment: 'Jane is an excellent tutor! She explained complex calculus concepts in a way that was easy to understand.' },
  { id: 2, name: 'Sarah L.', rating: 4, comment: 'Very patient and knowledgeable. Helped me improve my algebra skills significantly.' },
])

const currentCourses = ref([
  {
    name: 'Advanced Machine Learning',
    description: 'In-depth study of machine learning algorithms and their applications.'
  },
  {
    name: 'Neural Networks and Deep Learning',
    description: 'Fundamentals of neural networks and deep learning architectures.'
  },
  {
    name: 'Big Data Analytics',
    description: 'Techniques for processing and analyzing large-scale datasets.'
  },
  {
    name: 'AI Ethics and Governance',
    description: 'Ethical considerations and governance frameworks in AI development.'
  },
])

const isEditModalOpen = ref(false)
const editedProfile = ref({ ...profile.value })

const openEditModal = () => {
  editedProfile.value = { 
    ...profile.value,
    skillsText: skills.value.join(', '),
    learningGoalsText: profile.value.learningGoals.join('\n')
  }
  isEditModalOpen.value = true
}

const saveProfile = () => {
  profile.value = {
    ...editedProfile.value,
    learningGoals: editedProfile.value.learningGoalsText.split('\n').filter(goal => goal.trim() !== '')
  }
  skills.value = editedProfile.value.skillsText.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
  closeEditModal()
}

const previewImage = ref(null)

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = () => {
  previewImage.value = null
}

const closeModal = () => {
  // Implement close logic
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #057560 #e2e8f0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #e2e8f0;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #057560;
  border-radius: 20px;
  border: 2px solid #e2e8f0;
}
</style>