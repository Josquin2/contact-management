<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import ContactList from "./components/ContactList.vue";
import ContactForm from "./components/ContactForm.vue";
import { Contact } from "./types/contact";
import { type Ref, ref, onMounted } from "vue";

async function fetchData() {
  const cachedContacts = localStorage.getItem("contacts");
  if (cachedContacts) {
    contacts.value = JSON.parse(cachedContacts);
  }
  try {
    const response = await fetch("something");
    const data = await response.json();
    contacts.value = data;
    localStorage.setItem("contacts", JSON.stringify(data));
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
  }
  console.log(contacts.value);
}

onMounted(() => {
  fetchData();
});

const contacts: Ref<Contact[]> = ref([]);
const search = ref("");
</script>

<template>
  <div class="contact-management-page">
    <SearchBar @search="(value) => (search = value)" />
    <ContactList :contacts="contacts" :search="search" />
  </div>
  <div class="modal-block">
    <!-- all modals should go here -->
    <ContactForm />
  </div>
</template>

<style lang="css">
.contact-management-page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 45rem;
  margin: auto;
  padding-top: 3rem;
}
</style>
