<script setup lang="ts">
import { defineEmits } from "vue";
import PlusIcon from "./icons/PlusIcon.vue";
import SearchIcon from "./icons/SearchIcon.vue";
import useModal from "../ModalManager";

// Destructuring openModal function from modal manager
const { openModal } = useModal();

// Define emit events
const emit = defineEmits(["search"]);

// Function to update search term and emit search event
function updateSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    const value = target.value;
    console.log(value);
    emit("search", value);
  }
}

// Function to open create modal
function openCreateModal() {
  openModal("create");
}
</script>

<template>
  <div class="search-block">
    <div class="search--bar--icon"><SearchIcon /></div>

    <input
      type="text"
      @input="updateSearch($event)"
      placeholder="Search..."
      class="search__input"
    />
    <button class="search--bar--icon" @click="openCreateModal()">
      <PlusIcon />
    </button>
  </div>
</template>

<style lang="css">
.search-block {
  width: 100%;
  border: 1px solid #b1b1b1;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.search--bar--icon {
  display: flex;
  padding: 0rem 0.7rem;
}
.search-block .search__input {
  padding-left: 1rem;
  width: 100%;
  height: 3rem;
  background-color: #ffffff;
  border: none;
  border-right: 1px solid #b1b1b1;
  border-left: 1px solid #b1b1b1;
}
</style>
../modalManager../ModalManager
