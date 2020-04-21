<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import shop from "@/api/shop";
export default {
  name: "ProductList",
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    shop.getProducts((products) => {
      this.$store.commit('setProducts', products)
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  list-style-type: none;
}
</style>
