<template>
  <div>
    <!-- Call to Action (CTA) Section -->
    <section class="mb-6 text-center py-4 px-2">
      <h2 class="text-2xl md:text-3xl font-bold mb-2 text-emerald-900">
        Join TutorHive Today!
      </h2>
      <p class="text-sm md:text-base mb-2">
        Ready to take your learning to the next level? Sign up to find the perfect tutor!
      </p>
      <button class="text-sm md:text-base px-4 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-800">
        Get Started
      </button>
    </section>

    <!-- Newsletter Signup -->
    <section class="mb-6 bg-gray-100 p-4 rounded-lg text-center">
      <h2 class="text-xl md:text-2xl font-bold mb-2">Stay Updated!</h2>
      <p class="text-sm mb-2">
        Subscribe to our newsletter for the latest updates and special offers.
      </p>
      <form class="flex flex-col md:flex-row justify-center gap-2">
        <input 
          type="email" 
          placeholder="Your email" 
          class="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500 max-w-xs"
        />
        <button 
          type="submit" 
          class="mt-2 md:mt-0 px-4 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-800"
        >
          Subscribe
        </button>
      </form>
    </section>

    <!-- Footer Section -->
    <footer class="border-t pt-4 px-2 py-6 bg-gradient-to-br from-cyan-950 to-emerald-600 text-white">
      <div class="grid grid-cols-2 gap-4 text-center md:text-left">
        <!-- Column 1: Get in Touch -->
        <div>
          <h3 class="font-semibold mb-2">Get in Touch</h3>
          <ul class="space-y-1">
            <li><a href="/contact" class="hover:underline">Contact Us</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:underline">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="hover:underline">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:underline">LinkedIn</a></li>
          </ul>
        </div>

        <!-- Column 2: Explore More -->
        <div>
          <h3 class="font-semibold mb-2">Explore More</h3>
          <ul class="space-y-1">
            <li><a href="/about" class="hover:underline">About Us</a></li>
            <li><a href="/faq" class="hover:underline">FAQ</a></li>
            <li><a href="/privacy" class="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        <!-- Column 3: Quick Links -->
        <div>
          <h3 class="font-semibold mb-2">Quick Links</h3>
          <ul class="space-y-1">
            <li><a href="/find-tutors" class="hover:underline">Find Tutors</a></li>
            <li><a href="/pricing" class="hover:underline">Pricing</a></li>
            <li><a href="/become-tutor" class="hover:underline">Become a Tutor</a></li>
            <li><a href="/resources" class="hover:underline">Learning Resources</a></li>
          </ul>
        </div>

        <!-- Column 4: TutorHive Info -->
        <div>
          <h3 class="font-semibold mb-2">TutorHive</h3>
          <p class="text-xs text-gray-200 mb-2">
            Empowering students to achieve their academic goals through personalized tutoring.
          </p>
          <p class="text-xs text-gray-300">&copy; 2024 TutorHive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// You can add any setup code here if necessary
</script>

<style scoped>
/* Add any scoped styles if necessary */
</style>
