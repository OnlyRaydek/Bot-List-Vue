<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "Bot List"
    }
  }
};
</script>

<style scoped></style>
