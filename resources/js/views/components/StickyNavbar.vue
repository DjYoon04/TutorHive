<template>
  <nav
    class="sticky top-0 z-10 py-2 px-5 lg:px-8 backdrop-filter backdrop-blur-lg transition-colors duration-300"
    :style="{ backgroundColor: `rgba(236, 253, 245, ${navbarOpacity})` }">
    <div class="flex items-center justify-between text-blue-gray-900">
      <h1 class="text-2xl md:text-2xl font-bold mr-4 cursor-pointer py-1 text-emerald-800">
        TutorHive
      </h1>
      <div class="flex items-center gap-4">
        <div class="hidden lg:block">
          <ul class="mt-2 mb-4 flex font-bold flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li v-for="item in navItems" :key="item.id" class="p-1 font-normal">
              <a @click="scrollToSection(item.id)" class="flex items-center text-blue-gray-900 cursor-pointer font-bold text-emerald-700 hover:text-emerald-900">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
        <div class="hidden sm:ml-2 sm:flex sm:items-center pr-3">
          <!-- Sign In / Sign Up buttons -->
          <router-link
            :to="{ name: 'Auth', query: { mode: 'signin' } }"
            class="mr-4 font-bold rounded-lg text-emerald-700 hover:text-emerald-900"
          >
            Log in
          </router-link>
          <router-link
            :to="{ name: 'Auth', query: { mode: 'signup' } }"
            class="mx-2 font-bold rounded-lg text-emerald-700 hover:text-emerald-900"
          >
            Sign up
          </router-link>
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
        <li v-for="item in navItems" :key="item.id" class="p-1 font-normal">
          <a @click="scrollToSection(item.id)" class="flex items-center text-blue-gray-900 cursor-pointer">
            {{ item.name }}
          </a>
        </li>
      </ul>
      <div class="flex flex-col gap-2 px-1">
        <router-link
            :to="{ name: 'Auth', query: { mode: 'signin' } }"
            class="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Log In
          </router-link>
          <router-link
            :to="{ name: 'Auth', query: { mode: 'signup' } }"
            class="block py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sign Up
          </router-link>
      </div>
    </div>

    <Signin :isVisible="showSignin" @close="showSignin = false" />
    <Signup :isVisible="showSignup" @close="showSignup = false" />
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Signin from './Signin.vue'; 
import Signup from './Signup.vue';

const openNav = ref(false);
const navbarOpacity = ref(1);
const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'tutors', name: 'Tutors' },
  { id: 'about', name: 'About' },
  { id: 'faq', name: 'FAQ' }
];

const showSignin = ref(false);
const showSignup = ref(false); 

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

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  openNav.value = false; // Close mobile menu after clicking
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
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background: #036e6e; /* Underline color */
  left: 50%;
  bottom: -4px;
  transition: width 0.3s ease, left 0.3s ease;
}

a:hover::after {
  width: 100%;
  left: 0;
}
</style>