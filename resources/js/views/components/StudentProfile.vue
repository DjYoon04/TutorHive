<template>
  <div class="mx-5">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mt-5 mb-5">
            <div class="w-32 h-32 bg-emerald-200 rounded-full flex items-center justify-center text-emerald-600">
              <User size="64" />
            </div>
            <div class="text-center md:text-left pt-5">
              <h2 class="text-2xl font-semibold text-emerald-800">Bernie Cherry Rante</h2>
              <p class="text-emerald-600">University Student</p>
              <p class="text-gray-600">3rd Year • Computer Science Major</p>
            </div>
          </div>
  
          <!-- About Section -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">About Me</h3>
            <p class="text-gray-600 mb-4">
              Dedicated computer science student with a passion for artificial intelligence and machine learning. Seeking to expand my knowledge and practical skills in these areas.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-medium text-emerald-700">University</h4>
                <p class="text-gray-600">Tech State University</p>
              </div>
              <div>
                <h4 class="font-medium text-emerald-700">Specialization</h4>
                <p class="text-gray-600">Artificial Intelligence and Machine Learning</p>
              </div>
            </div>
          </section>
  
          <!-- Learning Goals -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Learning Goals</h3>
            <ul class="list-disc list-inside text-gray-600">
              <li>Master advanced machine learning algorithms</li>
              <li>Improve proficiency in Python and TensorFlow</li>
              <li>Understand and implement neural network architectures</li>
              <li>Prepare for AI research internships</li>
            </ul>
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

          <!-- Tutor's Comment -->
          <section class="mb-8">
            <h3 class="text-lg font-semibold text-emerald-800 mb-2">Tutor's Comment</h3>
            <div class="bg-emerald-100 p-4 rounded">
              <p class="text-gray-700 italic">
                "Alex is an exceptionally fast learner with a keen interest in AI. His ability to grasp complex concepts quickly is impressive. However, he sometimes rushes through foundational topics, which can lead to gaps in understanding. I recommend focusing on building a strong theoretical base alongside practical applications."
              </p>
              <p class="text-emerald-600 mt-2">- Dr. Emily Chen, AI Specialist</p>
            </div>
          </section>
  </div>        
</template>
  
  <script setup>
  import { ref } from 'vue'
  import { Calendar, User } from 'lucide-vue-next'
  
  const currentCourses = ref([
    { name: 'Advanced Machine Learning', description: 'In-depth study of machine learning algorithms and their applications.' },
    { name: 'Neural Networks and Deep Learning', description: 'Fundamentals of neural networks and deep learning architectures.' },
    { name: 'Big Data Analytics', description: 'Techniques for processing and analyzing large-scale datasets.' },
    { name: 'AI Ethics and Governance', description: 'Ethical considerations and governance frameworks in AI development.' },
  ])
  
  const tutoringSessions = ref([
    { id: 1, subject: 'Machine Learning', date: '2023-06-15', tutor: 'Dr. Emily Chen', notes: 'Discussed support vector machines and their applications.' },
    { id: 2, subject: 'Neural Networks', date: '2023-06-10', tutor: 'Prof. Michael Lee', notes: 'Worked on implementing a convolutional neural network.' },
  ])
  
  const upcomingSessions = ref([
    { name: 'AI Research Symposium', date: 'July 15, 2023', description: 'Annual symposium showcasing cutting-edge AI research from leading universities.' },
    { name: 'Machine Learning Hackathon', date: 'August 5-7, 2023', description: '48-hour hackathon focused on solving real-world problems using ML.' },
    { name: 'Tech Industry Networking Event', date: 'September 1, 2023', description: 'Networking opportunity with AI professionals from top tech companies.' },
  ])
  </script>