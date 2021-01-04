import { shallowMount } from "@vue/test-utils";
import BotEditModal from "@/components/BotEditModal.vue";

describe("BotEditModal.vue", () => {
  it("renders todo title in modal header", () => {
    const bot = {
      id: 1,
      bot: "task",
      priority: "important"
    };
    const wrapper = shallowMount(BotEditModal, {
      propsData: { bot }
    });
    expect(wrapper.text()).toMatch(`Edit ${bot.bot}`);
  });
});
