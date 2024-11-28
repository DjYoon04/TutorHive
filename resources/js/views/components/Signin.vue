<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="bg-gradient-to-br from-teal-400 to-blue-500 p-1 rounded-3xl shadow-lg max-w-md w-full relative mt-20 z-10">
        <!-- Close Button -->
        <button @click="$emit('close')" class="absolute top-4 right-4 text-teal-600 hover:text-teal-900">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="bg-white rounded-3xl p-8">
          <h2 class="text-3xl font-bold text-center text-teal-600 mb-6">Sign In</h2>
          <form @submit.prevent="handleSignIn" class="space-y-4">
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
            <button 
              type="submit" 
              class="w-full py-3 px-4 bg-teal-600 text-white rounded-full hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-200"
            >
              LOGIN
            </button>
          </form>
          <div class="mt-6">
            <button 
              @click="signInWithGoogle" 
              class="w-full flex items-center justify-center px-4 py-3 border border-teal-300 rounded-full shadow-sm text-sm font-medium text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>
          </div>
          <div class="mt-4 flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="form-checkbox h-4 w-4 text-teal-600 transition duration-150 ease-in-out" />
              <span class="ml-2 text-sm text-teal-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-teal-600 hover:text-teal-500">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const email = ref('')
const password = ref('')

const handleSignIn = () => {
  console.log('Signing in:', email.value, password.value)
  // Implement sign-in logic here
}

const signInWithGoogle = () => {
  console.log('Signing in with Google')
  // Implement Google sign-in logic here
}

watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.classList.add('modal-open')
  } else {
    document.body.classList.remove('modal-open')
  }
})

defineEmits(['close'])
</script>

<style>
body.modal-open {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@supports (backdrop-filter: blur(4px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}
</style>