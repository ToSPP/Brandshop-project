import {cart, cartMain} from './CartComponent.js';
import catalog from './CatalogComponent.js';
import {products, productSingle} from './ProductsComponent.js';
import slider from './SliderComponent.js';

const app = {
  el: '#app',
  components: {
    cart,
    "cart-main": cartMain,
    catalog,
    products,
    "product-single": productSingle,
    slider,
  },
  methods: {
    getJSON(src) {
      return fetch(src)
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    postJSON(url, data) {
      return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    putJSON(url, data) {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .catch(err => console.log(err));
    },
    deleteJSON(url) {
      return fetch(url, {
        method: "DELETE",
      })
        .then(response => response.json())
        .catch(err => console.log(err));
    },
  },
};

export default app;