<template>
    <nav class="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-4 ml-5">
        <span class="font-bold text-lg text-gray-700">TutorHive</span>
      </div>
  
      <!-- Navigation Links -->
      <div class="hidden lg:block">
          <ul class="mt-2 mb-4 flex font-bold flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:gap-6">
            <li v-for="item in navItems" :key="item.id" class="p-1 font-normal">
              <a @click="scrollToSection(item.id)" class="flex text-blue-gray-900 cursor-pointer font-medium text-emerald-700 hover:text-emerald-900">
                {{ item.name }}
              </a>
            </li>
          </ul>
        </div>
  
      <!-- Actions -->
      <div class="flex items-center space-x-4">
        <!-- User Avatar Dropdown -->
        <div class="relative mr-5">
          <button @click="toggleDropdown" class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
           
          </button>
          <div v-if="isDropdownOpen" class="absolute right-0 bg-white shadow-lg rounded-md mt-2 w-48 py-2">
            <a href="/profile" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Profile Settings</a>
            <a href="/support" class="block px-4 py-2 text-gray-600 hover:bg-gray-100">Help & Support</a>
            <button @click="logout" class="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { SearchIcon, HomeIcon, CalendarIcon, MailIcon, SettingsIcon, ChevronLeftIcon, ChevronRightIcon, UserIcon, LockIcon, BellIcon, HelpCircleIcon, LogOutIcon, MenuIcon, XIcon, UserRoundSearch } from 'lucide-vue-next'
  
  const userAvatar = '/path-to-user-avatar.png'; // Replace with dynamic user avatar
  const isDropdownOpen = ref(false);
  const navItems = [
  { id: 'Dashboard', name: 'Profile' },
  { id: 'Schedule', name: 'Settings' },
  { id: 'Email', name: 'Logout' },
];
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const logout = () => {
    // Add logic for user logout
    console.log('User logged out');
  };
  </script>
  
  <style scoped>
  /* Add any specific styles */
  </style>
  