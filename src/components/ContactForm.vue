<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps({
  id: String,
  name: String,
  email: String,
  phone: String,
  mode: {
    type: String,
    required: true,
    validator: (value: string) => ["create", "edit", "delete"].includes(value),
  },
});

const name = ref(props.name || "");
const email = ref(props.email || "");
const phone = ref(props.phone || "");
</script>

<template>
  <div class="modal__background modal--hidden">
    <div class="create-contact-block">
      <div class="modal-header">
        <h3 class="title">Create contact</h3>
        <button class="cancel-button button">Cancel</button>
      </div>

      <div class="input-block">
        <input type="text" class="input" placeholder="name" v-model="name" />
        <input type="text" class="input" placeholder="email" v-model="email" />
        <input
          type="text"
          class="input"
          placeholder="phone number"
          v-model="phone"
        />
      </div>

      <div class="error-message">
        <p>error</p>
      </div>

      <div class="buttons-block">
        <button class="button">create</button>
        <button class="button delete--button">delete</button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.modal--hidden {
  display: none !important;
}
.modal__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0000005f;
}
.create-contact-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff;
  padding: 2rem;
  border: 1px solid #b1b1b1;
  border-radius: 1rem;

  .modal-header {
    width: 100%;
    position: relative;

    .title {
      text-align: center;
    }
    .cancel-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .input-block {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    .input {
      width: 28rem;
      height: 3rem;
      border: 1px solid #b1b1b1;
      border-radius: 1rem;
      padding-left: 1rem;
    }
  }

  .error-message {
    opacity: 1;
    position: relative;
    height: 1rem;
    width: 100%;

    p {
      position: absolute;
    }
  }

  .buttons-block {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 1rem;
    .button {
      background-color: transparent;
      border: 1px solid #b1b1b1;
      font-size: 1.2rem;
      cursor: pointer;
      width: 100%;
      height: 3rem;
      border-radius: 1rem;
    }

    .delete--button {
      width: 20%;
    }
  }
}
</style>
