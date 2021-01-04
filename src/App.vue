<template>
  <div id="app">
    <bot-header></bot-header>
    <bot-table></bot-table>
  </div>
</template>

<script>
import BotTable from "@/components/BotTable.vue";
import BotHeader from "@/components/BotHeader.vue";

export default {
  name: "app",
  components: {
    BotTable,
    BotHeader
  }
};
</script>

<style lang="scss"></style>
