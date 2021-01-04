<template :width="640">
  <div class="modal-card" style="width: 640px">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Bot</p>
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

      <b-field label="Select a date">
        <b-datepicker
          v-model="date"
          :first-day-of-week="1"
          placeholder="Click to select..."
        >
          <button class="button is-primary" @click="date = new Date()">
            <b-icon icon="calendar-today"></b-icon>
            <span>Today</span>
          </button>

          <button class="button is-danger" @click="date = null">
            <b-icon icon="close"></b-icon>
            <span>Clear</span>
          </button>
        </b-datepicker>
      </b-field>

      <b-field class="file">
        <b-upload v-model="file" expanded>
          <a class="button is-primary is-fullwidth">
            <b-icon icon="upload"></b-icon>
            <span>{{ file.name || "Click to upload"}}</span>
          </a>
        </b-upload>
      </b-field>

      <b-field>
        <b-upload v-model="dropFiles" multiple drag-drop expanded>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"></b-icon>
              </p>
              <p>Drop your files here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags">
        <span v-for="(file, index) in dropFiles" :key="index" class="tag is-primary">
          {{file.name}}
          <button class="delete is-small" type="button" @click="deleteDropFile(index)"></button>
        </span>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
      <button class="button is-primary" @click="addBot">Save</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: "BotAddModal",
  props: {
    priorities: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      text: "",
      title: "",
      date: new Date(), // .toLocaleDateString()
      file: {},
      dropFiles: []
    };
  },
  methods: {
    addBot() {
      const payload = {
        text: this.text,
        title: this.title,
        date: this.date
      };
      this.$emit("add-bot", payload);
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    }
  }
};
</script>

<style scoped></style>
