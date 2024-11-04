import { mount } from "@vue/test-utils";
import ContactForm from "@/components/ContactForm.vue";

jest.mock("@/ApiClass");

describe("ContactForm.vue", () => {
  let wrapper: any;
  const propsData = {
    id: "1",
    name: "Name",
    email: "email@example.com",
    phone: "8 800 800 80 80",
    mode: "edit",
  };

  beforeEach(() => {
    wrapper = mount(ContactForm, { propsData });
  });

  it("matches snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should render with correct props", () => {
    expect(wrapper.find("input#name-input").element.value).toBe(propsData.name);
    expect(wrapper.find("input#email-input").element.value).toBe(
      propsData.email
    );
    expect(wrapper.find("input#phone-input").element.value).toBe(
      propsData.phone
    );
  });
});
