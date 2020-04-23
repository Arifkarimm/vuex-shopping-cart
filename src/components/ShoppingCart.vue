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
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
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
    checkoutStatus() {
      return this.$store.state.checkoutStatus;
    },
  },
  methods: {
    checkout() {
      this.$store.dispatch("checkout");
    },
  },
};
</script>

<style scoped></style>
