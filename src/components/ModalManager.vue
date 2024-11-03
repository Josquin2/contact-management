<template>
  <ContactForm
    :id="modalData.id"
    :name="modalData.name"
    :phone="modalData.phone"
    :email="modalData.email"
    :mode="modalMode"
    @update-contacts="(contact) => (updatedContact = contact)"
  />
</template>

<script setup lang="ts">
import { type Ref, ref, defineEmits, watch } from "vue";
import { Contact } from "@/types/contact";
import ContactForm from "./ContactForm.vue";
import useModal from "./modalManager";

// Extract modal mode and data from modal manager.ts
const { modalMode, modalData } = useModal();

// Define emits for events
const emit = defineEmits(["update-contacts"]);

// Reactive variable to store the updated contact
const updatedContact: Ref<Contact | null> = ref(null);

// Watcher to emit update-contacts event when updatedContact changes
watch(updatedContact, (newVal) => {
  emit("update-contacts", newVal);
});
</script>
