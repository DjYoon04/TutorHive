<template>
  <div class="bg-white rounded-[30px] shadow-xl overflow-hidden h-full pb-16">
    <h1 class="text-3xl font-bold text-emerald-800 px-6 pb-6 pt-4 text-center">Profile</h1>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 max-h-full overflow-y-auto max-h-full overflow-y-auto [&::-webkit-scrollbar]:w-2">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Profile Info -->
        <div class="lg:col-span-1">
          <div class="flex flex-col items-center">
            <div class="w-32 h-32 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-600 relative mb-2">
              <img v-if="profile.picture" :src="profile.picture" alt="Profile Picture" class="w-full h-full object-cover rounded-full" />
              <User v-else size="64" />
            </div>
            <h2 class="text-2xl font-semibold text-emerald-800 flex items-center justify-center">
              {{ profile.name }}
              <button @click="openEditModal" class="ml-2 px-2 bg-white text-emerald-600 p-1 rounded-full hover:bg-gray-100 transition duration-200">
                ✎
              </button>
            </h2>
            <p class="text-emerald-600 mb-4">{{ profile.role }}</p>
            <div class="w-full">
              <h3 class="text-lg font-semibold text-emerald-800 mb-2">About Me</h3>
              <p class="text-gray-600 mb-4">{{ profile.about }}</p>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <h4 class="font-medium text-emerald-700">University</h4>
                  <p class="text-gray-600">{{ profile.university }}</p>
                </div>
                <div>
                  <h4 class="font-medium text-emerald-700">Specialization</h4>
                  <p class="text-gray-600">{{ profile.specialization }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- Contact and Interaction Options -->
          <section>
            <h3 class="text-md font-medium text-emerald-700 mt-4 my-1">Contact</h3>
            <div class="flex flex-wrap items-center gap-4">
              <a href="#" class="text-emerald-600 hover:text-emerald-800">
                <Linkedin class="w-6 h-6" />
              </a>
              <a href="#" class="text-emerald-600 hover:text-emerald-800">
                <Github class="w-6 h-6" />
              </a>
              <span class="text-gray-600 flex items-center">
                <Mail class="w-5 h-5 mr-2" />
                hakkdog@example.com
              </span>
            </div>
          </section>
        </div>

        <!-- Right Column: Skills, Courses, Reviews -->
        <div class="lg:col-span-2">
          <!-- Skills Section -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Skills</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills" :key="skill" class="bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 text-emerald-800 px-3 py-1 rounded-full text-sm shadow-md">
                {{ skill }}
              </span>
            </div>
          </section>

          <!-- Current Courses -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Current Courses</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="course in currentCourses" :key="course.name" class="bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 p-4 rounded-xl shadow-md">
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

        </div>
      </div>
    </div>

     <!-- Edit Profile Modal -->
     <TransitionRoot appear :show="isEditModalOpen" as="template">
        <Dialog as="div" @close="closeEditModal" class="relative z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-2xl font-semibold leading-6 text-emerald-800 mb-4">
                    Edit Profile
                  </DialogTitle>
                  <button @click="closeEditModal" class="absolute top-4 right-4 text-emerald-600 hover:text-emerald-800">
                    <XIcon class="h-6 w-6" />
                  </button>

                  <form @submit.prevent="saveProfile" class="space-y-6">
                    <!-- Profile Photo -->
                    <div class="flex flex-col items-center space-y-4 mb-6">
                      <div class="relative h-32 w-32 sm:h-44 sm:w-44">
                        <img 
                          :src="previewImage || profile.picture || '/placeholder.svg?height=300&width=300'" 
                          class="h-full w-full rounded-full object-cover border-4 border-emerald-200"
                          alt="Profile"
                        />
                      </div>
                      <div class="flex space-x-2">
                        <label 
                          class="px-4 py-2 bg-teal-600 text-white text-sm rounded-md cursor-pointer transition hover:bg-teal-700"
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
                          class="px-4 py-2 bg-red-600 text-white text-sm rounded-md transition hover:bg-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <!-- Basic Information Section -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <!-- Full Name -->
                      <div class="space-y-1">
                        <label for="fullName" class="block text-sm font-medium text-emerald-800">Full name</label>
                        <input
                          type="text"
                          id="fullName"
                          v-model="editedProfile.name"
                          class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <!-- Skills -->
                      <div class="space-y-1">
                        <label for="skills" class="block text-sm font-medium text-emerald-800">Skills</label>
                        <input
                          type="text"
                          id="skills"
                          v-model="editedProfile.skillsText"
                          class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="e.g. Web Development, UI/UX Design"
                        />
                      </div>

                      <!-- University -->
                      <div class="space-y-1">
                        <label for="university" class="block text-sm font-medium text-emerald-800">University</label>
                        <input
                          type="text"
                          id="university"
                          v-model="editedProfile.university"
                          class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter your university"
                        />
                      </div>

                      <!-- Specialization -->
                      <div class="space-y-1">
                        <label for="specialization" class="block text-sm font-medium text-emerald-800">Specialization</label>
                        <input
                          type="text"
                          id="specialization"
                          v-model="editedProfile.specialization"
                          class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter your specialization"
                        />
                      </div>

                      <!-- Email -->
                      <div class="space-y-1">
                        <label for="email" class="block text-sm font-medium text-emerald-800">Email</label>
                        <input
                          type="email"
                          id="email"
                          v-model="editedProfile.email"
                          class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <!-- About Me -->
                    <div class="space-y-1">
                      <label for="aboutMe" class="block text-sm font-medium text-emerald-800">About Me</label>
                      <textarea
                        id="aboutMe"
                        v-model="editedProfile.about"
                        rows="4"
                        class="w-full px-3 py-2 bg-white border border-emerald-300 rounded-md text-emerald-900 placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Tell us about yourself"
                      ></textarea>
                    </div>

                    <!-- Save Button -->
                    <button
                      type="submit"
                      class="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-md py-2 px-4 text-sm font-medium hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 ease-in-out"
                    >
                      Save Changes
                    </button>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { User, Star, Linkedin, Github, Mail, XIcon } from 'lucide-vue-next'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

const profile = ref({
  name: 'Djeah A. Tabada',
  role: 'Tutor',
  year: '3rd Year',
  major: 'Computer Science Major',
  picture: '', // Placeholder for profile picture
  about: 'Passionate mathematics tutor with 5 years of experience. I specialize in making complex concepts easy to understand and enjoy helping students build confidence in their math skills.',
  university: 'Caraga State University',
  specialization: 'Artificial Intelligence and Machine Learning',
  email: 'jane.doe@example.com',
})

const skills = ref(['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Problem Solving', 'Test Preparation'])

const reviews = ref([
  { id: 1, name: 'Alex M.', rating: 5, comment: 'Jane is an excellent tutor! She explained complex calculus concepts in a way that was easy to understand.' },
  { id: 2, name: 'Sarah L.', rating: 4, comment: 'Very patient and knowledgeable. Helped me improve my algebra skills significantly.' },
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
  }
  isEditModalOpen.value = true
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/tutor-profile')
    profile.value = response.data.profile
    skills.value = response.data.skills
    reviews.value = response.data.reviews
    currentCourses.value = response.data.currentCourses
  } catch (error) {
    console.error('Error fetching profile data:', error)
  }
})

const saveProfile = () => {
  profile.value = { ...editedProfile.value }
  skills.value = editedProfile.value.skillsText.split(',').map(skill => skill.trim()).filter(skill => skill !== '')
  isEditModalOpen.value = false
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
  profile.value.picture = ''
}
</script>

<style scoped>

</style>