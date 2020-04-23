<template>
  <div>
    <h2>Product List</h2>
    <img v-if="loading" src="https://i.imgur.com/JfPpwOA.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.inventory }} -
        {{ product.price | currency }}
        <button
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    productIsInStock() {
      return this.$store.getters.productIsInStock;
    },
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },
  created() {
    this.loading = true;
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
