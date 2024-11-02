<script setup lang="ts">
import { computed } from "vue";
import ContactItem from "./ContactItem.vue";
import type { Contact } from "@/types/contact";
import { defineProps } from "vue";

const props = defineProps<{ contacts: Contact[]; search: string }>();

const filteredContacts = computed(() => {
  return props.contacts.filter((contact) => {
    const searchTerm = props.search.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm) ||
      contact.phone.toLowerCase().includes(searchTerm)
    );
  });
});
</script>
<template>
  <transition-group
    name="fade"
    tag="div"
    class="contact-list-block"
    v-if="filteredContacts && filteredContacts.length"
  >
    <ContactItem
      v-for="contact in filteredContacts"
      :key="contact.id"
      :contact="contact"
    />
  </transition-group>
</template>

<style lang="css">
.contact-list-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.fade-enter-from {
  height: 0rem;
  padding: 0rem 1rem;
}
.fade-enter-to {
  height: 7.5rem;
  padding: 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active в версиях до 2.1.8 */ {
  opacity: 0;
  margin-bottom: 0;
  border: 0;
  height: 0rem;
  padding: 0rem 1rem;
}
</style>
