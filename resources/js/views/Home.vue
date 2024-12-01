<template>
  <div>
    <StickyNavbar :sections="sections" :scrollToSection="scrollToSection" />
    <main>
      <div>
        <HeroSection />
      </div>
      <FindYourTutor />
      <div class="bg-emerald-50 px-4 pb-12">
        <h3 class="text-3xl md:text-4xl text-center font-bold text-emerald-900 pt-12 pb-3">
        Featured Tutors
        </h3>
        <TutorList :tutors="tutors" />
      </div>
      <div>
        <HowItWorks />
      </div>
      <div>
        <CTAandFooter />
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';
import useEmblaCarousel from 'embla-carousel-vue';
import StickyNavbar from './components/StickyNavbar.vue';
import HeroSection from './components/HeroSection.vue';
import TutorList from './components/TutorList.vue';
import FindYourTutor from './components/FindYourTutor.vue';
import CTAandFooter from './components/CTAandFooter.vue';
import HowItWorks from './components/HowItWorks.vue';

// Import images for tutors
import jelatImage from '../views/img/jelat.jpg';
import jijiImage from '../views/img/jiji.jpg';
import jeraImage from '../views/img/jera.png';
import tinaImage from '../views/img/tina.png';
import { useRouter } from 'vue-router'


const router = useRouter()

const navigateToAuth = (mode) => {
  router.push({ name: 'Auth', query: { mode } })
}

export default {
  name: 'Home',
  components: {
    StickyNavbar,
    HeroSection,
    TutorList,
    FindYourTutor,
    CTAandFooter,
    HowItWorks,
  },
  setup() {
    // Use Embla Carousel
    const [emblaRef] = useEmblaCarousel({
      slidesToScroll: 1,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: true,
    });

    // Define the list of tutors
    const tutors = ref([
      { name: "Jelli Uayan", expertise: "Mathematics", rating: 4.8, reviews: 42, image: jelatImage },
      { name: "Jeseca Ruelan", expertise: "Physics", rating: 4.6, reviews: 38, image: jijiImage },
      { name: "Jera Acero", expertise: "Chemistry", rating: 4.9, reviews: 55, image: jeraImage },
      { name: "Cristina Repollo", expertise: "Biology", rating: 4.7, reviews: 31, image: tinaImage },
    ]);

    // Define the sections for the navbar
    const sections = ref([
      { id: 'home', label: 'Home' },
      { id: 'find-your-tutor', label: 'Find Your Tutor' },
      { id: 'tutors', label: 'Tutors' },
      { id: 'how-it-works', label: 'How It Works' },
      { id: 'contact', label: 'Contact' },
    ]);

    // Define the scrollToSection method
    const scrollToSection = (sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: 'smooth',
        });
      }
    };

    return {
      emblaRef,
      tutors,
      sections,
      scrollToSection,
    };
  },
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
