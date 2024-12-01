<template>
  <div class="container mx-auto px-4 pr-44">
    <div class="space-y-6">
      <div class="bg-white shadow-sm rounded-lg overflow-hidden">
        <h2 class="text-2xl font-semibold text-gray-800 p-6 border-b">Booking Status</h2>
        <ul class="divide-y divide-gray-200">
          <li v-for="booking in bookings" :key="booking.id" class="p-6 hover:bg-gray-50 transition duration-150 ease-in-out">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ booking.tutor_name }}</p>
                <p class="text-sm text-gray-500">{{ booking.subject }}</p>
                <p class="text-sm text-emerald-600 font-medium">
                  {{ getDaysRemaining(booking.date) }} days remaining
                </p>
              </div>
              <div class="relative" v-click-outside="closeDropdown">
                <button @click="toggleDropdown(booking.id)" class="text-gray-400 hover:text-gray-600">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div v-if="activeDropdown === booking.id" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <div class="py-1" role="none">
                    <button @click="viewDetails(booking)" class="text-gray-700 block px-4 py-2 text-sm w-full text-left hover:bg-gray-100" role="menuitem">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- Modal -->
        <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Booking Details
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">Tutor: {{ selectedBooking.tutor_name }}</p>
                  <p class="text-sm text-gray-500">Subject: {{ selectedBooking.subject }}</p>
                  <p class="text-sm text-gray-500">Date: {{ formatDate(selectedBooking.date) }}</p>
                  <p class="text-sm text-gray-500">Time: {{ selectedBooking.start_time }} - {{ selectedBooking.end_time }}</p>
                  <p class="text-sm text-gray-500">Status: {{ selectedBooking.status }}</p>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeModal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookings: [
        { id: 1, tutor_name: 'John Doe', subject: 'Mathematics', date: '2023-05-20', start_time: '14:00', end_time: '15:00', status: 'Pending' },
        { id: 2, tutor_name: 'Jane Smith', subject: 'Physics', date: '2023-05-22', start_time: '10:00', end_time: '11:00', status: 'Confirmed' },
        { id: 3, tutor_name: 'Alice Johnson', subject: 'Chemistry', date: '2023-05-25', start_time: '16:00', end_time: '17:00', status: 'Pending' },
      ],
      activeDropdown: null,
      showModal: false,
      selectedBooking: {},
    };
  },
  methods: {
    toggleDropdown(id) {
      this.activeDropdown = this.activeDropdown === id ? null : id;
    },
    closeDropdown() {
      this.activeDropdown = null;
    },
    viewDetails(booking) {
      this.selectedBooking = booking;
      this.showModal = true;
      this.closeDropdown();
    },
    closeModal() {
      this.showModal = false;
    },
    getDaysRemaining(date) {
      const today = new Date();
      const sessionDate = new Date(date);
      const timeDiff = sessionDate.getTime() - today.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    },
  },
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },
};
</script>