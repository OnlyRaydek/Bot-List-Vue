<template>
  <div>
    <section class="section">
      <div class="container">
        <div class="level">
          <b-button class="is-primary" @click="isAddModalActive = true">
            Add A Bot
          </b-button>
          <b-button class="is-warning" @click="deleteAllBots">
            Delete All Bots
          </b-button>
        </div>

        <b-table :data="Bots" default-sort="id">
          <template slot-scope="Bots">
            <b-table-column field="id" label="ID" width="40" sortable default-sort numeric>
              {{ Bots.row.id }}
            </b-table-column>

            <b-table-column field="bot" label="Bot" sortable>
              {{ Bots.row.bot }}
            </b-table-column>

            <b-table-column field="date" label="Date" sortable>
              {{ Bots.row.date }}
            </b-table-column>

            <b-table-column field="text" label="Text" sortable>
              {{ Bots.row.text }}
            </b-table-column>

            <b-table-column label="Edit">
              <b-button
                type="is-text"
                icon-left="settings-outline"
                @click="openEditModal(Bots.row)"
              ></b-button>
            </b-table-column>

            <b-table-column label="Delete">
              <b-button
                type="is-text"
                icon-left="delete"
                @click="deleteBot(Bots.row)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </section>

    <b-modal :active.sync="isEditModalActive" has-modal-card>
      <bot-edit-modal
        :bot="selectedBot"
        :priorities="priorities"
        @edit-bot="onEditBot"
      ></bot-edit-modal>
    </b-modal>

    <b-modal :active.sync="isAddModalActive" has-modal-card>
      <bot-add-modal
        @add-bot="onAddBot"
        :priorities="priorities"
      ></bot-add-modal>
    </b-modal>
  </div>
</template>

<script>
import BotEditModal from "@/components/BotEditModal";
import BotAddModal from "@/components/BotAddModal";

export default {
  name: "BotTable",
  components: { BotEditModal, BotAddModal },
  data() {
    return {
      initialBots: [
        {
          id: 1,
          bot: "Adam",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam voluptas ea, voluptatem quas magni provident eos in esse fugiat placeat nemo ducimus culpa recusandae sunt accusantium quos ratione iure."
        },
        {
          id: 2,
          bot: "Stefan",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam voluptas ea, voluptatem quas magni provident eos in esse fugiat placeat nemo ducimus culpa recusandae sunt accusantium quos ratione iure."
        },
        {
          id: 3,
          bot: "Panny",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam voluptas ea, voluptatem quas magni provident eos in esse fugiat placeat nemo ducimus culpa recusandae sunt accusantium quos ratione iure."
        },
        {
          id: 4,
          bot: "Garry",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam voluptas ea, voluptatem quas magni provident eos in esse fugiat placeat nemo ducimus culpa recusandae sunt accusantium quos ratione iure."
        },
        {
          id: 5,
          bot: "Smesh",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam voluptas ea, voluptatem quas magni provident eos in esse fugiat placeat nemo ducimus culpa recusandae sunt accusantium quos ratione iure."
        }
      ],
      Bots: [],
      isEditModalActive: false,
      selectedBot: {},
      isAddModalActive: false
    };
  },
  mounted() {
    if (localStorage.getItem("Bots")) {
      this.Bots = JSON.parse(localStorage.getItem("Bots"));
    } else {
      this.Bots = this.initialBots;
    }
  },
  methods: {
    openEditModal(bot) {
      this.selectedBot = bot;
      this.isEditModalActive = true;
    },
    onAddBot(item) {
      // get the highest number id to iterate on it
      const highestId = Math.max.apply(Math, this.Bots.map(item => item.id));
      // Add the item to the array
      this.Bots.push({
        id: highestId + 1,
        bot: item.title,
        text: item.text,
        date: item.date.toLocaleDateString()
      });
      // save the updated array in localstorage
      this.saveLocalStorageBots();
      this.isAddModalActive = false;
    },
    onEditBot(item) {
      const bot = this.findBot(item);
      // Apply the updated values
      bot.bot = item.bot;
      bot.text = item.text;
      // save the updated array in localstorage
      this.saveLocalStorageBots();
      // close the modal
      this.isEditModalActive = false;
    },
    deleteBot(item) {
      this.$buefy.dialog.confirm({
        title: `Deleting Bot`,
        confirmText: "Delete Bot",
        type: "is-danger",
        hasIcon: true,
        message: `Are you sure you want to delete this item? This cannot be undone.`,
        onConfirm: () => {
          // find in the array and remove
          const index = this.Bots.indexOf(item);
          this.Bots.splice(index, 1);
          // save the updated array in localstorage
          this.saveLocalStorageBots();
        }
      });
    },
    deleteAllBots() {
      this.$buefy.dialog.confirm({
        title: `Deleting Bots`,
        confirmText: "Delete Bots",
        type: "is-danger",
        hasIcon: true,
        message: `Are you sure you want to delete all the Bots on your list? This cannot be undone.`,
        onConfirm: () => {
          this.Bots = [];
          // save the updated array in localstorage
          this.saveLocalStorageBots();
        }
      });
    },
    findBot(item) {
      return this.Bots.find(bot => bot.id === item.id);
    },
    saveLocalStorageBots() {
      localStorage.setItem("Bots", JSON.stringify(this.Bots));
      this.Bots = JSON.parse(localStorage.getItem("Bots"));
    }
  }
};
</script>

<style lang="scss" scoped></style>
