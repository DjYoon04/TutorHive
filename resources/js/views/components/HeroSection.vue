<template>
  <section id="home">
    <transition name="fade-slide">
      <div class="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-cyan-950 via-emerald-600 to-white-100 px-8">
        <!-- Image Section -->
        <div class="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
          <img :src="tutorImage" alt="Tutor illustration" class="w-full" />
        </div>
        
        <!-- Text Section -->
        <div class="md:w-1/2 order-1 md:order-2 text-center mx-auto mb mb-12">
          <h1 class="text-5xl font-bold text-white mb-4">Level Up Your Learning!</h1>
          <p class="text-2xl text-white italic mb-6">
            Connect with experienced university students for one-on-one support, anytime, anywhere. Let’s unlock your full potential together!
          </p>
          <div class="flex justify-center">
            <router-link
            :to="{ name: 'Auth', query: { mode: 'signin' } }"
            class="text-lg mr-4 rounded-xl font-bold text-white hover:text-emerald-900 border p-2 px-4 bg-teal-700 focus:ring-2 ring-emerald-70"
          >
            Get Started!
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </section>
  
</template>

<script setup>
import { ref } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'; // Importing the Heroicons search icon

// Importing the image
const tutorImage = '/img/tutor.PNG';
</script>

<style scoped>
/* Optional CSS for animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(50px);
}
</style>
