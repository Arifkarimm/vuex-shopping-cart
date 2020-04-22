<template>
  <div>
    <h2>ShoppingCart</h2>
    <ul>
      <li v-for="cartProduct in cartProducts" :key="cartProduct.id">
        {{ cartProduct.title }} - {{ cartProduct.price | currency }} -
        {{ cartProduct.quantity }}
      </li>
    </ul>
    <p>Total: {{ cartTotal | currency }}</p>
    <button @click="$store.dispatch('checkout')">Checkout</button>
    <p v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</p>
  </div>
</template>

<script>
export default {
  name: "ShoppingCart",
  computed: {
    cartProducts() {
      return this.$store.getters.cartProducts;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style scoped></style>
