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
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "ShoppingCart",
  computed: {
    ...mapGetters(["cartProducts", "cartTotal"]),
    ...mapState(["checkoutStatus"]),
  },
  methods: {
    ...mapActions(["checkout"]),
  },
};
</script>

<style scoped></style>
