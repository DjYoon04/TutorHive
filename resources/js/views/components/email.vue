<template>
    <div class="container mx-auto px-5">
      <h2 class="mt-4 mb-8  text-xl sm:text-2xl font-bold">Email</h2>
      <div class="space-y-6">
        <!-- New Email Form -->
        <div class="bg-white shadow rounded-lg p-4 sm:p-6">
          <h3 class="text-lg font-semibold mb-4">New Email</h3>
          <form @submit.prevent="sendEmail" class="space-y-4">
            <div>
              <label for="to" class="block text-sm font-medium text-gray-700">To</label>
              <input
                v-model="newEmail.to"
                id="to"
                type="email"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
              <input
                v-model="newEmail.subject"
                id="subject"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                v-model="newEmail.message"
                id="message"
                rows="4"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button type="submit" class="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors">
              Send Email
            </button>
          </form>
        </div>
  
        <!-- Recent Emails -->
        <div class="bg-white shadow rounded-lg p-4 sm:p-6">
          <h3 class="text-lg font-semibold mb-4">Recent Emails</h3>
          <div class="space-y-4">
            <div v-for="email in emails" :key="email.id" class="border-b border-gray-200 pb-2">
              <p class="font-semibold text-gray-800">{{ email.sender }}</p>
              <p class="text-sm text-gray-500">To: {{ email.receiver }}</p>
              <p class="mt-1 text-gray-700">{{ email.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emails = ref([
    { id: 1, sender: 'Jane Smith', receiver: 'bernie@example.com', message: 'Hello, how are you?' },
    { id: 2, sender: 'Bob Johnson', receiver: 'bernie@example.com', message: 'Meeting at 3 PM' },
  ]);
  
  const newEmail = ref({
    to: '',
    subject: '',
    message: ''
  });
  
  const sendEmail = async () => {
    try {
      console.log('Sending email with data:', newEmail.value);
  
      // Simulating email sending (replace with actual EmailJS implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // After sending, add new email to the recent list
      const newEmailData = {
        id: emails.value.length + 1,
        sender: 'You',
        receiver: newEmail.value.to,
        message: newEmail.value.message
      };
  
      emails.value.unshift(newEmailData);
      console.log('Email sent successfully');
      newEmail.value = { to: '', subject: '', message: '' };
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };
  </script>