<template>
  <div class="bg-white rounded-[30px] shadow-xl overflow-hidden h-full max-h-full pb-24">
    <h1 class="mt-4 text-2xl sm:text-3xl font-bold text-teal-700 text-center">
      Dashboard
    </h1>
    
    <!-- Header and Tabs -->
    <div class="mx-4 sm:mx-6 overflow-y-auto">
      <nav class="flex flex-wrap justify-center sm:justify-start space-x-0 sm:space-x-1 mt-2" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="setCurrentTab(tab.name)"
          :class="[ 
            currentTab === tab.name
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'group inline-flex items-center py-2 px-2 sm:py-4 sm:px-4 border-b-2 font-medium text-sm'
          ]"
          :aria-current="currentTab === tab.name ? 'page' : undefined"
        >
          <component
            :is="tab.icon"
            :class="[ 
              currentTab === tab.name ? 'text-emerald-500' : 'text-gray-400 group-hover:text-gray-500',
              'mr-2 h-4 w-4 sm:h-5 sm:w-5'
            ]"
            aria-hidden="true"
          />
          <span class="hidden sm:inline">{{ tab.name }}</span>
        </button>
      </nav>
    </div>

    <!-- Tab Contents -->
    <div class="p-4 sm:p-6 overflow-y-auto max-h-full [&::-webkit-scrollbar]:w-2">
      <!-- Upcoming Appointments -->
      <div v-if="currentTab === 'Upcoming Appointments'" class="space-y-4 sm:space-y-6">
        <div class="bg-white shadow sm:rounded-md">
          <ul role="list" class="divide-y divide-gray-200">
            <li
              v-for="appointment in upcomingAppointments"
              :key="appointment.id"
              class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
            >
              <div class="flex flex-wrap items-center justify-between">
                <div class="flex items-center space-x-4">
                  <img 
                    :src="getAvatarUrl(appointment.student)" 
                    :alt="appointment.student" 
                    class="h-12 w-12 rounded-full"
                  />
                  <div>
                    <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.student }}</p>
                    <p class="text-sm text-gray-500">{{ appointment.subject }}</p>
                  </div>
                </div>
                <div class="mt-2 sm:mt-0 flex items-center space-x-2">
                  <p class="flex items-center text-xs sm:text-sm font-semibold text-teal-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 rounded-full px-2 py-1 cursor-pointer shadow-sm">
                    <Clock class="h-4 w-4 sm:h-5 sm:w-5 text-teal-400 mr-1" />
                    {{ appointment.time }}
                  </p>
                  <button
                    @click="openDetailsModal(appointment)"
                    class="inline-flex items-center px-1 py-1 border text-sm rounded-full text-teal-700 bg-gray-100 shadow-sm hover:bg-emerald-200 transition ease-in-out hover:scale-110"
                  >
                    <InfoIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Appointment History -->
      <div v-if="currentTab === 'Appointment History'" class="space-y-4 sm:space-y-6">
        <div class="bg-white shadow sm:rounded-md">
          <ul role="list" class="divide-y divide-gray-200">
            <li
              v-for="appointment in pastAppointments"
              :key="appointment.id"
              class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-emerald-600 truncate">{{ appointment.subject }}</p>
                  <p class="text-sm text-gray-500">Student: {{ appointment.student }}</p>
                </div>
                <button
                  @click="openDetailsModal(appointment)"
                  class="inline-flex items-center px-1 py-1 border text-sm rounded-full text-teal-700 bg-gray-100 shadow-sm hover:bg-emerald-200 transition ease-in-out hover:scale-110"
                >
                  <InfoIcon class="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>

     <!-- Recent Students -->
     <div v-if="currentTab === 'Recent Students'" class="space-y-4 sm:space-y-6">
    <div class="bg-white shadow sm:rounded-md">
      <ul role="list" class="divide-y divide-gray-200">
        <li
          v-for="student in favoriteStudents"
          :key="student.id"
          class="px-4 py-4 sm:px-6 hover:bg-emerald-50 transition duration-150 ease-in-out"
        >
          <div class="flex flex-col sm:flex-row items-start">
            <!-- Image -->
            <img 
              :src="getAvatarUrl(student.student)"
              :alt="student.student"
              class="h-12 w-12 rounded-full flex-shrink-0 mb-4 sm:mb-0"
            />
            
            <!-- Name, Subjects, and Comments -->
            <div class="sm:ml-4 flex-grow w-full sm:w-auto">
              <p class="text-sm font-medium text-emerald-600 truncate">{{ student.student }}</p>
              <p class="text-sm text-gray-500">{{ student.subjects.join(', ') }}</p>
              
              <!-- Comments -->
              <div class="mt-2 space-y-2">
                <div
                  v-for="(comment, index) in student.comments"
                  :key="index"
                  class="flex items-center justify-between"
                >
                  <!-- Comment Text -->
                  <p class="text-sm text-gray-700 flex-grow">{{ comment }}</p>
                  
                  <!-- Edit Icon -->
                  <button
                    @click="openEditCommentModal(student.id, index)"
                    class="ml-2 text-xs text-teal-600 hover:text-teal-800 flex items-center"
                  >
                    <PencilIcon class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Comment Button -->
            <button
              @click="openCommentModal(student)"
              class="mt-4 sm:mt-0 sm:ml-4 px-3 py-2 text-sm rounded-lg text-cyan-700 bg-gradient-to-br from-emerald-100 via-teal-200 to-cyan-200 flex items-center justify-center font-medium transition ease-in-out hover:scale-105 shadow-md w-full sm:w-auto"
            >
              <MessageCircle class="h-4 w-4 mr-1" />
              <span class="hidden sm:inline">Comment</span>
              <span class="sm:hidden">Comment</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>

    </div> 
  </div>
  
  <!-- Appointment Details Modal -->
  <TransitionRoot appear :show="isAppointmentModalVisible" as="template">
    <Dialog as="div" @close="closeAppointmentModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex justify-between items-center">
                <DialogTitle as="h2" class="text-xl font-bold text-emerald-800">
                  Appointment Details
                </DialogTitle>
                <button @click="closeAppointmentModal" class="text-gray-500 hover:text-gray-700">
                  <span class="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div class="mt-4 space-y-2">
                <p><strong>Student:</strong> {{ selectedAppointment?.student }}</p>
                <p><strong>Subject:</strong> {{ selectedAppointment?.subject }}</p>
                <p><strong>Time:</strong> {{ selectedAppointment?.time }}</p>
                <p><strong>Location:</strong> {{ selectedAppointment?.location }}</p>
                <p><strong>Type:</strong> {{ selectedAppointment?.type }}</p>
                <p><strong>Date:</strong> {{ selectedAppointment?.date }}</p>
              </div>

              <div class="mt-6 flex justify-end space-x-4">
                <button
                  @click="closeAppointmentModal"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
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

  <!-- Comment Modal -->
  <TransitionRoot appear :show="isCommentModalVisible" as="template">
    <Dialog as="div" @close="closeCommentModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex justify-between items-center">
                <DialogTitle as="h2" class="text-xl font-bold text-emerald-800">
                  Add Comment for {{ selectedStudent?.student }}
                </DialogTitle>
                <button @click="closeCommentModal" class="text-gray-500 hover:text-gray-700">
                  <span class="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div class="mt-4">
                <label for="comment" class="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  id="comment"
                  v-model="newComment"
                  rows="4"
                  class="mt-1 pl-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  placeholder="Enter your comment here..."
                ></textarea>
              </div>

              <div class="mt-6 flex justify-end space-x-4">
                <button
                  @click="closeCommentModal"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  @click="submitComment"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                >
                  Submit
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Edit Comment Modal -->
  <TransitionRoot appear :show="isEditCommentModalVisible" as="template">
    <Dialog as="div" @close="closeEditCommentModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center ">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <div class="flex justify-between items-center">
                <DialogTitle as="h2" class="text-xl font-bold text-emerald-800">
                  Edit Comment
                </DialogTitle>
                <button @click="closeEditCommentModal" class="text-gray-500 hover:text-gray-700">
                  <span class="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div class="mt-4">
                <label for="editComment" class="block text-sm font-medium text-gray-700">Comment</label>
                <textarea
                  id="editComment"
                  v-model="editedComment"
                  rows="4"
                  class="pl-1 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 [&::-webkit-scrollbar]:w-2"
                  placeholder="Edit your comment here..."
                ></textarea>
              </div>

              <div class="mt-6 flex justify-end space-x-4">
                <button
                  @click="closeEditCommentModal"
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  @click="deleteComment"
                  class="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  @click="saveEditedComment"
                  class="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                >
                  Save
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
import { ref } from 'vue';
import { CalendarIcon, ClockIcon, UsersIcon, InfoIcon, MessageCircle, Clock, PencilIcon } from 'lucide-vue-next';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue';

// State
const currentTab = ref("Upcoming Appointments");
const isAppointmentModalVisible = ref(false);
const isCommentModalVisible = ref(false);
const isEditCommentModalVisible = ref(false);
const selectedAppointment = ref(null);
const selectedStudent = ref(null);
const newComment = ref('');
const editedComment = ref('');
const editingStudentId = ref(null);
const editingCommentIndex = ref(null);

const upcomingAppointments = ref([
  { id: 1, student: "Bernie Cherry Rante", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 2, student: "Jeseca Ruelan", subject: "Calculus 1", time: "3:30 PM", location: "Library", type: "In-person", date: "2024-12-11"  },
  { id: 3, student: "Kurt Reserva", subject: "Mathematics", time: "5:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 4, student: "Runard Ramos", subject: "Physics", time: "1:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
  { id: 5, student: "Lawrence Sabrido", subject: "Advanced Physics", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 6, student: "Glomer Celestino", subject: "Science", time: "4:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
  { id: 7, student: "Mark Taglucop", subject: "English", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 8, student: "Marc Ybiernas", subject: "Physical Education", time: "1:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
  { id: 9, student: "Cyrel Rollo", subject: "Earth Science", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 10, student: "Drandreb Reyes", subject: "Calculus 2", time: "2:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
]);

const pastAppointments = ref([
  { id: 1, student: "Bernie Cherry Rante", subject: "Chemistry", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 2, student: "Jeseca Ruelan", subject: "Calculus 1", time: "3:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
  { id: 7, student: "Mark Taglucop", subject: "English", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 8, student: "Marc Ybiernas", subject: "Physical Education", time: "1:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
  { id: 9, student: "Cyrel Rollo", subject: "Earth Science", time: "2:00 PM", location: "Online", type: "Video Call", date: "2024-12-12" },
  { id: 10, student: "Drandreb Reyes", subject: "Calculus 2", time: "2:30 PM", location: "Library", type: "In-person", date: "2024-12-11" },
]);

const favoriteStudents = ref([
  { id: 1, student: "Bernie Cherry Rante", subjects: ["Chemistry", "Physics"], comments: [] },
  { id: 2, student: "Jeseca Ruelan", subjects: ["Calculus", "Algebra"], comments: [] },
  { id: 3, student: "Kurt Reserva", subjects: ["Mathematics", "Statistics"], comments: [] },
  { id: 4, student: "Runard Ramos", subjects: ["Physics", "Chemistry"], comments: [] },
  { id: 5, student: "Lawrence Sabrido", subjects: ["Advanced Physics", "Calculus"], comments: [] },
]);

// Tabs data
const tabs = [
  { name: 'Upcoming Appointments', icon: CalendarIcon },
  { name: 'Appointment History', icon: ClockIcon },
  { name: 'Recent Students', icon: UsersIcon },
];

// Methods
function setCurrentTab(tabName) {
  currentTab.value = tabName;
}

function getAvatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
}

function openDetailsModal(appointment) {
  selectedAppointment.value = appointment;
  isAppointmentModalVisible.value = true;
}

function closeAppointmentModal() {
  isAppointmentModalVisible.value = false;
  selectedAppointment.value = null;
}

function openCommentModal(student) {
  selectedStudent.value = student;
  isCommentModalVisible.value = true;
}

function closeCommentModal() {
  isCommentModalVisible.value = false;
  selectedStudent.value = null;
  newComment.value = '';
}

function submitComment() {
  if (selectedStudent.value && newComment.value.trim()) {
    const student = favoriteStudents.value.find(s => s.id === selectedStudent.value.id);
    if (student) {
      student.comments.push(newComment.value.trim());
    }
  }
  closeCommentModal();
}

function openEditCommentModal(studentId, commentIndex) {
  const student = favoriteStudents.value.find(s => s.id === studentId);
  if (student) {
    editingStudentId.value = studentId;
    editingCommentIndex.value = commentIndex;
    editedComment.value = student.comments[commentIndex];
    isEditCommentModalVisible.value = true;
  }
}

function closeEditCommentModal() {
  isEditCommentModalVisible.value = false;
  editingStudentId.value = null;
  editingCommentIndex.value = null;
  editedComment.value = '';
}

function saveEditedComment() {
  if (editingStudentId.value !== null && editingCommentIndex.value !== null) {
    const student = favoriteStudents.value.find(s => s.id === editingStudentId.value);
    if (student) {
      student.comments[editingCommentIndex.value] = editedComment.value.trim();
    }
  }
  closeEditCommentModal();
}

function deleteComment() {
  if (editingStudentId.value !== null && editingCommentIndex.value !== null) {
    const student = favoriteStudents.value.find(s => s.id === editingStudentId.value);
    if (student) {
      student.comments.splice(editingCommentIndex.value, 1);
    }
  }
  closeEditCommentModal();
}
</script>
