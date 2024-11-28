<template>
    <transition name="fade">
      <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50">
        <div class="modal-content bg-gradient-to-br from-teal-400 to-blue-500 p-1 rounded-3xl shadow-lg max-w-md w-full relative mt-12">
          <div class="bg-white rounded-3xl p-8">
            <h2 class="text-3xl font-bold text-center text-teal-600 mb-8">Sign Up</h2>
            <form @submit.prevent="handleSignUp" class="space-y-4">
              <div class="relative">
                <input 
                  v-model="name" 
                  type="text" 
                  required 
                  placeholder="Full Name"
                  class="w-full px-4 py-3 rounded-full bg-teal-50 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 pl-10"
                />
                <span class="absolute left-3 top-3 text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input 
                  v-model="email" 
                  type="email" 
                  required 
                  placeholder="Email"
                  class="w-full px-4 py-3 rounded-full bg-teal-50 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 pl-10"
                />
                <span class="absolute left-3 top-3 text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input 
                  v-model="password" 
                  type="password" 
                  required 
                  placeholder="Password"
                  class="w-full px-4 py-3 rounded-full bg-teal-50 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 pl-10"
                />
                <span class="absolute left-3 top-3 text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div class="relative">
                <input 
                  v-model="confirmPassword" 
                  type="password" 
                  required 
                  placeholder="Confirm Password"
                  class="w-full px-4 py-3 rounded-full bg-teal-50 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400 pl-10"
                />
                <span class="absolute left-3 top-3 text-teal-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <div class="flex space-x-4">
                <button 
                  type="button" 
                  @click="role = 'STUDENT'"
                  :class="['flex-1 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200', 
                           role === 'STUDENT' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600']"
                >
                  STUDENT
                </button>
                <button 
                  type="button" 
                  @click="role = 'TUTOR'"
                  :class="['flex-1 py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200', 
                           role === 'TUTOR' ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600']"
                >
                  TUTOR
                </button>
              </div>
              <button 
                type="submit" 
                class="w-full py-3 px-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200"
              >
                SIGN UP
              </button>
            </form>
            <div class="mt-6">
              <button 
                @click="signUpWithGoogle" 
                class="w-full flex items-center justify-center px-4 py-3 border border-teal-300 rounded-full shadow-sm text-sm font-medium text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </button>
            </div>
            <button @click="$emit('close')" class="absolute top-4 right-4 text-teal-500 hover:text-teal-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'STUDENT', 
      };
    },
    methods: {
      handleSignUp() {
        // Handle sign-up logic
      },
      signUpWithGoogle() {
        // Handle sign-up with Google logic
      },
    },
  };
  </script>
  