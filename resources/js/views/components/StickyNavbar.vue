<template>
    <nav
      class="sticky top-0 z-10 py-2 px-4 lg:px-8 lg:py-3 backdrop-filter backdrop-blur-lg transition-all duration-300"
      :style="{ backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})` }"
    >
      <div class="flex items-center justify-between text-blue-gray-900">
        <a href="#" class="text-2xl font-bold mr-4 cursor-pointer py-1 font-medium">
          TutorHive
        </a>
        <div class="flex items-center gap-4">
          <div class="mr-4 hidden lg:block">
            <ul class="mt-2 mb-4 flex font-bold flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li v-for="item in navItems" :key="item" class="p-1 font-normal">
                <a href="#" class="flex items-center text-blue-gray-900">
                  {{ item }}
                </a>
              </li>
            </ul>
          </div>
          <div class="flex items-center gap-x-1">
            <button
              class="hidden lg:inline-block px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
            >
              Log In
            </button>
            <button
              class="hidden lg:inline-block px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-800 focus:ring-4 focus:ring-blue-300"
            >
              Sign in
            </button>
          </div>
          <button
            class="lg:hidden p-2 text-gray-600 rounded-lg hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            @click="toggleNav"
          >
            <svg v-if="openNav" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      <div v-if="openNav" class="lg:hidden mt-2">
        <ul class="mt-2 mb-4 flex font-bold flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
          <li v-for="item in navItems" :key="item" class="p-1 font-normal">
            <a href="#" class="flex items-center text-blue-gray-900">
              {{ item }}
            </a>
          </li>
        </ul>
        <div class="flex flex-col gap-2">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            Log In
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
          >
            Sign in
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const openNav = ref(false);
  const navbarOpacity = ref(1);
  const navItems = ['Home', 'Tutors', 'About', 'Dashboard'];
  
  const toggleNav = () => {
    openNav.value = !openNav.value;
  };
  
  const handleScroll = () => {
    const scrollY = window.scrollY;
    navbarOpacity.value = scrollY > 50 ? 0.75 : 1;
  };
  
  const handleResize = () => {
    if (window.innerWidth >= 960) openNav.value = false;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style scoped>
  /* Add any necessary styles here */
  </style>
  