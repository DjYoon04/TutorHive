<template>
      <div class="bg-white rounded-xl overflow-hidden">
        <h2 class="text-2xl font-bold text-emerald-800 px-6 pb-6 pt-4 border-b border-emerald-100">Booking Status</h2>
        <div v-if="loading" class="p-6 text-center">
          <LoaderIcon class="inline-block w-8 h-8 text-emerald-500 animate-spin" />
          <p class="mt-2 text-emerald-600">Loading bookings...</p>
        </div>
        <div v-else-if="error" class="p-6 text-center">
          <AlertCircleIcon class="inline-block w-8 h-8 text-red-500 mb-2" />
          <p class="text-red-600">{{ error }}</p>
        </div>
        <ul v-else class="divide-y divide-emerald-100">
          <li v-for="booking in bookings" :key="booking.id" class="p-6 hover:bg-emerald-50 transition duration-300 ease-in-out">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-semibold text-emerald-800">{{ booking.tutor_name }}</p>
                <p class="text-sm text-emerald-600">{{ booking.subject }}</p>
                <div class="flex items-center mt-2">
                  <CalendarIcon class="w-4 h-4 text-emerald-500 mr-1" />
                  <p class="text-sm text-emerald-700">
                    {{ formatDate(booking.date) }}
                  </p>
                </div>
                <div class="flex items-center mt-1">
                  <ClockIcon class="w-4 h-4 text-emerald-500 mr-1" />
                  <p class="text-sm text-emerald-700">
                    {{ booking.start_time }} - {{ booking.end_time }}
                  </p>
                </div>
                <p :class="[
                  'inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full',
                  booking.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                ]">
                  {{ booking.status }}
                </p>
              </div>
              <div class="flex flex-col items-end">
                <p class="text-sm font-medium text-emerald-600 mb-2">
                  {{ getDaysRemaining(booking.date) }} days remaining
                </p>
                <button @click="viewDetails(booking)" class="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50">
                  View Details
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>

    <!-- Modal -->
    <TransitionRoot appear :show="showModal" as="template">
      <Dialog as="div" @close="closeModal" class="relative z-10">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-emerald-800">
                  Booking Details
                </DialogTitle>
                <div class="mt-4">
                  <p class="text-sm text-emerald-600">Tutor: {{ selectedBooking.tutor_name }}</p>
                  <p class="text-sm text-emerald-600 mt-1">Subject: {{ selectedBooking.subject }}</p>
                  <p class="text-sm text-emerald-600 mt-1">Date: {{ formatDate(selectedBooking.date) }}</p>
                  <p class="text-sm text-emerald-600 mt-1">Time: {{ selectedBooking.start_time }} - {{ selectedBooking.end_time }}</p>
                  <p class="text-sm text-emerald-600 mt-1">Status: {{ selectedBooking.status }}</p>
                </div>

                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    v-if="selectedBooking.status === 'Pending'"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    @click="acceptBooking"
                  >
                    Accept
                  </button>
                  <button
                    v-if="selectedBooking.status === 'Pending'"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    @click="declineBooking"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CalendarIcon, ClockIcon, LoaderIcon, AlertCircleIcon } from 'lucide-vue-next'

const bookings = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)
const selectedBooking = ref({})

const fetchBookings = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    bookings.value = [
      { id: 1, tutor_name: 'John Doe', subject: 'Mathematics', date: '2023-05-20', start_time: '14:00', end_time: '15:00', status: 'Pending' },
      { id: 2, tutor_name: 'Jane Smith', subject: 'Physics', date: '2023-05-22', start_time: '10:00', end_time: '11:00', status: 'Confirmed' },
      { id: 3, tutor_name: 'Alice Johnson', subject: 'Chemistry', date: '2023-05-25', start_time: '16:00', end_time: '17:00', status: 'Pending' },
    ]
    loading.value = false
  } catch (e) {
    error.value = 'Failed to load bookings. Please try again.'
    loading.value = false
  }
}

const viewDetails = (booking) => {
  selectedBooking.value = booking
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const acceptBooking = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const index = bookings.value.findIndex(b => b.id === selectedBooking.value.id)
    if (index !== -1) {
      bookings.value[index].status = 'Confirmed'
      selectedBooking.value.status = 'Confirmed'
    }
    // You would typically make an API call here to update the booking status
    closeModal()
  } catch (e) {
    error.value = 'Failed to accept booking. Please try again.'
  }
}

const declineBooking = async () => {
  try {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    const index = bookings.value.findIndex(b => b.id === selectedBooking.value.id)
    if (index !== -1) {
      bookings.value[index].status = 'Declined'
      selectedBooking.value.status = 'Declined'
    }
    // You would typically make an API call here to update the booking status
    closeModal()
  } catch (e) {
    error.value = 'Failed to decline booking. Please try again.'
  }
}

const getDaysRemaining = (date) => {
  const today = new Date()
  const sessionDate = new Date(date)
  const timeDiff = sessionDate.getTime() - today.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  fetchBookings()
})
</script>

