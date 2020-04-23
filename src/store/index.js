import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null,
  },
  getters: {
    // availableProducts: (state) => {
    //   return state.products.filter((product) => product.inventory > 0);
    // },
    cartProducts: (state) => {
      return state.cart.map((cartItem) => {
        const product = state.products.find((item) => item.id === cartItem.id);
        return {
          title: product.title,
          price: product.price,
          quantity: cartItem.quantity,
        };
      });
    },
    cartTotal: (state, getters) => {
      return getters.cartProducts.reduce(
        (total, product) => (total = total + product.price * product.quantity),
        0
      );
    },
    productIsInStock() {
      return (product) => {
        return product.inventory > 0;
      };
    },
  },
  mutations: {
    setProducts: (state, products) => {
      state.products = products;
    },
    pushProductToCart: (state, productID) => {
      state.cart.push({
        id: productID,
        quantity: 1,
      });
    },
    incrementItemQuantity: (state, cartItem) => {
      cartItem.quantity++;
    },
    decrementProductInventory: (state, product) => {
      product.inventory--;
    },
    setCheckoutStatus: (state, status) => {
      state.checkoutStatus = status;
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
  actions,
});
