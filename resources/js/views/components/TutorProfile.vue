<template>
    <div class="min-h-screen bg-emerald-50">
      <header class="bg-emerald-600 text-white py-4">
        <div class="container mx-auto px-4">
          <h1 class="text-2xl font-bold">TutorHive</h1>
        </div>
      </header>
  
      <main class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto px-8">
          <!-- Header Section -->
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
            <div class="w-32 h-32 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
              <User size="64" />
            </div>
            <div class="text-center md:text-left">
              <h2 class="text-2xl font-semibold text-emerald-800 mt-4">Jane Doe</h2>
              <p class="text-emerald-600">Mathematics Tutor</p>
              <div class="flex items-center justify-center md:justify-start mt-2">
                <Star v-for="i in 5" :key="i" :class="i <= 4 ? 'text-yellow-400' : 'text-gray-300'" class="w-5 h-5" />
                <span class="ml-2 text-gray-600">4.8 (42 reviews)</span>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-4 mx-1 my-6">
              <button class="font-medium bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg focus:ring-1">
                <MessageSquare class="w-5 h-5 inline-block mr-2" />
                Send Message
              </button> 
              <button class="font-medium hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold py-2 px-4 rounded-lg ring-1 ring-emerald-700 text-emerald-700">
                <Calendar class="w-5 h-5 inline-block mr-2" />
                Request Session
              </button>
            </div>
  
          <!-- About Section -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">About Me</h3>
            <p class="text-gray-600 mb-4">
              Passionate mathematics tutor with 5 years of experience. I specialize in making complex concepts easy to understand and enjoy helping students build confidence in their math skills.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-emerald-700">Educational Background</h4>
                <p class="text-gray-600">BSc in Mathematics, University of Example, 3rd Year</p>
              </div>
              <div>
                <h4 class="font-medium text-emerald-700">Expertise</h4>
                <p class="text-gray-600">Algebra, Calculus, Statistics, Geometry</p>
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
  
          <!-- Availability Schedule -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Weekly Availability</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr>
                    <th v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" :key="day" class="px-2 py-1 bg-emerald-100 text-emerald-800">
                      {{ day }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-for="day in availability" :key="day.name" class="px-2 py-1 text-center border">
                      {{ day.hours }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Tutoring Sessions -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Recent Tutoring Sessions</h3>
            <div class="space-y-4">
              <div v-for="session in tutoringSessions" :key="session.id" class="bg-gray-50 p-4 rounded">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-emerald-800">{{ session.subject }}</span>
                  <span class="text-gray-500">{{ session.date }}</span>
                </div>
                <p class="text-gray-600">Tutor: {{ session.tutor }}</p>
                <p class="text-gray-600">{{ session.notes }}</p>
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

          <!-- Upcoming Sessions -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Upcoming Sessions</h3>
            <div class="space-y-4">
              <div v-for="session in upcomingSessions" :key="session.name" class="bg-emerald-100 p-4 rounded flex items-start space-x-3">
                <Calendar class="w-6 h-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 class="font-medium text-emerald-800">{{ session.name }}</h4>
                  <p class="text-gray-600">{{ session.date }}</p>
                  <p class="text-gray-600">{{ session.description }}</p>
                </div>
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
  
        </div>
      </main>
    </div>
  </template>

  
  
  <script setup>
  import { ref } from 'vue'
  import { Star, MessageSquare, Calendar, Linkedin, Github, Mail, Trophy, BookOpen } from 'lucide-vue-next'
  
  const skills = ref(['Algebra', 'Calculus', 'Statistics', 'Geometry', 'Problem Solving', 'Test Preparation'])
  
  const availability = ref([
    { name: 'Mon', hours: '2PM - 6PM' },
    { name: 'Tue', hours: '3PM - 7PM' },
    { name: 'Wed', hours: '2PM - 6PM' },
    { name: 'Thu', hours: '3PM - 7PM' },
    { name: 'Fri', hours: '2PM - 6PM' },
    { name: 'Sat', hours: '10AM - 2PM' },
    { name: 'Sun', hours: 'Unavailable' },
  ])

  const tutoringSessions = ref([
    { id: 1, subject: 'Machine Learning', date: '2023-06-15', tutor: 'Dr. Emily Chen', notes: 'Discussed support vector machines and their applications.' },
    { id: 2, subject: 'Neural Networks', date: '2023-06-10', tutor: 'Prof. Michael Lee', notes: 'Worked on implementing a convolutional neural network.' },
  ])
  
  const reviews = ref([
    { id: 1, name: 'Alex M.', rating: 5, comment: 'Jane is an excellent tutor! She explained complex calculus concepts in a way that was easy to understand.' },
    { id: 2, name: 'Sarah L.', rating: 4, comment: 'Very patient and knowledgeable. Helped me improve my algebra skills significantly.' },
  ])

  const upcomingSessions = ref([
    { name: 'AI Research Symposium', date: 'July 15, 2023', description: 'Annual symposium showcasing cutting-edge AI research from leading universities.' },
    { name: 'Machine Learning Hackathon', date: 'August 5-7, 2023', description: '48-hour hackathon focused on solving real-world problems using ML.' },
    { name: 'Tech Industry Networking Event', date: 'September 1, 2023', description: 'Networking opportunity with AI professionals from top tech companies.' },
  ])

  </script>