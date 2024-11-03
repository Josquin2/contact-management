import { Contact } from "@/types/contact";
import { type Ref, ref } from "vue";

const modalMode = ref("");
const modalData: Ref<Contact> = ref({
  id: "null",
  name: "",
  phone: "",
  email: "",
});

const openModal = (
  mode: string,
  data: Contact = { id: "null", name: "", phone: "", email: "" }
) => {
  modalMode.value = mode;
  modalData.value = data;
  document.getElementById("contact-form")?.classList?.remove("modal--hidden");
};

const closeModal = () => {
  document.getElementById("contact-form")?.classList?.add("modal--hidden");
};

const useModal = () => {
  return {
    modalMode,
    modalData,
    openModal,
    closeModal,
  };
};

export default useModal;
