<template>
  <div>
    <h2>Product List</h2>

    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },
  created() {
    this.$store.dispatch("fetchProduct").then(() => (this.loading = false));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  list-style-type: none;
}
</style>
