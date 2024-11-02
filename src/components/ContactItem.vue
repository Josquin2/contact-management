<script setup lang="ts">
import { Contact } from "@/types/contact";
import { defineProps } from "vue";
import EditIcon from "./icons/EditIcon.vue";

defineProps<{ contact: Contact }>();
</script>

<template>
  <div class="contact-item-block">
    <div class="item__info">
      <h2>{{ contact?.name }}</h2>
      <h4>{{ contact?.email }}</h4>
      <h4>{{ contact?.phone }}</h4>
    </div>
    <button class="item__edit">
      <EditIcon />
    </button>
  </div>
</template>

<style lang="css">
.contact-item-block {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #b1b1b1;
  border-radius: 1rem;
  height: 7.5rem;
  overflow: hidden;
}

.contact-item-block .item__edit {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b1b1b1;
  border-radius: 1rem;
  padding: 0.5rem;
}
.contact-item-block h2 {
  color: #0a0a0a;
}
.contact-item-block h4 {
  color: #585858;
}
</style>
