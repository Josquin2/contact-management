<script setup lang="ts">
import { type Ref, ref, defineProps, defineEmits, watch, computed } from "vue";
import { Api } from "@/ApiClass";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import DeleteIcon from "./icons/DeleteIcon.vue";
import CloseIcon from "./icons/CloseIcon.vue";

// Define component props with type checking
const props = defineProps<{
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  mode: string;
}>();

// Watch for changes in props and update ref values accordingly
watch(props, (newProps) => {
  contactName.value = newProps.name || "";
  contactEmail.value = newProps.email || "";
  contactPhone.value = newProps.phone || "";
});

// Save contact based on mode ('create' or 'edit')
function saveContact() {
  // Trigger validation
  v$.value.$touch();

  // If validation fails
  if (v$.value.$invalid) {
    // Log all error messages
    v$.value.$errors.forEach((error) => console.log(error.$message));

    // Get input elements
    const nameInput = document.getElementById("name-input") as HTMLInputElement;
    const emailInput = document.getElementById(
      "email-input"
    ) as HTMLInputElement;
    const phoneInput = document.getElementById(
      "phone-input"
    ) as HTMLInputElement;

    // Update placeholders if inputs exist
    if (nameInput) nameInput.placeholder = "Name is required!";
    if (emailInput) emailInput.placeholder = "Email is required!";
    if (phoneInput) phoneInput.placeholder = "Phone number is required!";

    // Check if email validation failed and send error
    if (v$.value.contactEmail.email.$invalid) {
      sendError(v$.value.contactEmail.email.$message);
    }

    console.log(v$.value.contactEmail.email.$invalid);
  } else {
    // Determine method based on mode and call respective function
    props.mode === "create" ? createContact() : updateContact();
  }
}

function sendError(message: string) {
  errorMessage.value = message;

  setTimeout(() => {
    errorMessage.value = "";
  }, 1500);
}

// Delete contact
async function deleteContact() {
  if (props?.id) {
    const response = await api.delete("contacts", { id: props.id });
    emit("update-contacts", response);
    closeModal();
  }
}

// Update existing contact
async function updateContact() {
  if (props?.id) {
    const response = await api.put("contacts", {
      id: props.id,
      name: contactName.value,
      email: contactEmail.value,
      phone: contactPhone.value,
    });
    emit("update-contacts", response);
    closeModal();
  }
}

// Create new contact
async function createContact() {
  const response = await api.post("contacts", {
    name: contactName.value,
    email: contactEmail.value,
    phone: contactPhone.value,
  });
  emit("update-contacts", response);
  closeModal();
}

// Close modal by adding hidden class
function closeModal() {
  document.getElementById("contact-form")?.classList.add("modal--hidden");
}

const emit = defineEmits(["update-contacts"]);

// Instantiate Api class
const api = new Api();

// Initialize ref variables
const contactName: Ref<string> = ref(props.name || "");
const contactEmail: Ref<string> = ref(props.email || "");
const contactPhone: Ref<string> = ref(props.phone || "");

const errorMessage: Ref<string> = ref("");

const rules = computed(() => ({
  contactName: { required },
  contactPhone: { required },
  contactEmail: { required, email },
}));

const v$ = useVuelidate(rules, { contactName, contactPhone, contactEmail });
</script>

<template>
  <div class="modal__background modal--hidden" id="contact-form">
    <div class="create-contact-block">
      <div class="modal-header">
        <h3 class="title">
          {{ props.mode === "create" ? "Create" : "Edit" }} contact
        </h3>
        <button class="cancel-button button" @click="closeModal">
          <CloseIcon />
        </button>
      </div>

      <div class="input-block">
        <input
          type="text"
          class="input"
          id="name-input"
          placeholder="Name"
          v-model="contactName"
        />
        <input
          type="text"
          class="input"
          id="email-input"
          placeholder="Email"
          v-model="contactEmail"
        />
        <input
          type="text"
          class="input"
          id="phone-input"
          placeholder="Phone Number"
          v-model="contactPhone"
        />
      </div>

      <div class="error-message">
        <p>{{ errorMessage }}</p>
      </div>

      <div class="buttons-block">
        <button class="button" @click="saveContact">
          {{ props.mode === "create" ? "Create" : "Save" }}
        </button>
        <button
          class="button delete--button"
          v-if="props.mode !== 'create'"
          @click="deleteContact()"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.modal--hidden {
  display: none !important;
}
.modal__background {
  position: fixed;
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
      margin-top: -0.7rem;
      margin-right: -0.7rem;
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
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18%;
    }
  }
}
</style>
