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
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ProductList",
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    ...mapState(["products"]),
    ...mapGetters(["productIsInStock"]),
  },
  methods: {
    ...mapActions(["addProductToCart", "fetchProduct"]),
  },
  created() {
    this.loading = true;
    this.fetchProduct().then(() => (this.loading = false));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  list-style-type: none;
}
</style>
