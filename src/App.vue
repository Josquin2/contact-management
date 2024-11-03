<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import ContactList from "./components/ContactList.vue";
import ModalManager from "./components/ModalManager.vue";
import { Contact } from "./types/contact";
import { type Ref, ref, onMounted } from "vue";
import { Api } from "./ApiClass";

// Function to fetch cached data from localStorage
function fetchCachedData() {
  const cachedContacts = localStorage.getItem("contacts");
  if (cachedContacts) {
    contacts.value = JSON.parse(cachedContacts);
  }
}

// Function to fetch remote data from the API and update local cache
async function fetchRemoteData() {
  const response = await ApiClass.getObjects("contacts");
  contacts.value = response;
  setCacheData();
}

// Function to cache data to localStorage
function setCacheData() {
  localStorage.setItem("contacts", JSON.stringify(contacts.value));
}

onMounted(() => {
  fetchCachedData();
  fetchRemoteData();
});
const ApiClass = new Api();

// Reactive variable to store contact list
const contacts: Ref<Contact[]> = ref([]);

// Reactive variable for search term
const search: Ref<string> = ref("");
</script>

<template>
  <div class="contact-management-page">
    <SearchBar @search="(value) => (search = value)" />
    <ContactList :contacts="contacts" :search="search" />
  </div>
  <div class="modal-block" id="modals">
    <ModalManager
      @update-contacts="
        (newContacts) => {
          contacts = newContacts;
          setCacheData();
        }
      "
    />
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

@media only screen and (max-width: 750px) {
  .contact-management-page {
    padding: 2rem 1rem;
  }
}
</style>
