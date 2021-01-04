<template>
  <div class="modal-card" style="width: 640px">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit {{ bot.bot }}</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Title">
        <b-input type="text" v-model="title" placeholder="Your bot title">
        </b-input>
      </b-field>

      <b-field label="Text">
        <b-input type="text" v-model="text" placeholder="Your bot text">
        </b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="editBot">
        Save
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "botEditModal",
  props: {
    bot: {
      type: Object,
      required: true
    },
    priorities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: "",
      text: ""
    };
  },
  mounted() {
    this.title = this.bot.bot;
    this.text = this.bot.text;
  },
  methods: {
    editBot() {
      const payload = {
        id: this.bot.id,
        bot: this.title,
        text: this.text
      };
      this.$emit("edit-bot", payload);
    }
  }
};
</script>

<style scoped></style>
