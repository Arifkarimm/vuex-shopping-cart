import shop from "@/api/shop";

const state = {
  products: [],
  cart: [],
  checkoutStatus: null,
};
const getters = {
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
};
const mutations = {
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
};
const actions = {
  fetchProduct: ({ commit }) => {
    return new Promise((resolve) => {
      shop.getProducts((products) => {
        commit("setProducts", products);
        resolve();
      });
    });
  },
  addProductToCart: ({ state, getters, commit }, product) => {
    if (getters.productIsInStock(product)) {
      const cartItem = state.cart.find((item) => item.id === product.id);
      if (!cartItem) {
        commit("pushProductToCart", product.id);
      } else {
        commit("incrementItemQuantity", cartItem);
      }
      commit("decrementProductInventory", product);
    }
  },
  checkout: ({ state, commit }) => {
    shop.buyProducts(
      state.cart,
      () => {
        commit("emptyCart");
        commit("setCheckoutStatus", "success");
      },
      () => {
        commit("setCheckoutStatus", "failed");
      }
    );
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
