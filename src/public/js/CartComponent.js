const cartItem = {
  props: ['item'],
  data() {
    return {
      tempImg: 'https://placehold.it/72x85',
    };
  },
  template: `
    <li class="cart__item">
      <a href="single.html">
        <img :src="tempImg" :alt="item.product_name"></a>
      <div class="cart__item-desc">
        <a href="single.html" class="cart__item-title">{{ item.product_name }}</a>
        <img src="img/rating_4-5.png" alt="rating_4-5_stars">
        <p class="cart__item-total">
          <span class="cart__item-qty">{{ item.quantity }}</span> x
          <span class="dollar cart__item-sum">{{ item.price }}</span>
        </p>
      </div>
      <a href="#" class="cart__item-remove" @click.prevent="$parent.removeProductItem(item)"></a>
    </li>
  `,
};

const cart = {
  data() {
    return {
      cartUrl: '/api/cart',
      itemsList: [],
      isVisible: false,
    };
  },
  components: {
    "cart-item": cartItem,
  },
  template: `
    <div class="cart cart__pos">
      <button type="button" class="cart__main-btn" @click="isVisible = !isVisible">
        <img src="img/cart.svg" alt="Cart">
        <span v-if="itemsList.length" class="cart__qty cart__qty_pos">{{ itemsList.length }}</span>
      </button>
      <div v-show="isVisible" class="cart__block cart__sub-menu">
        <span class="cart__block-arrow"></span>
        <div class="cart__column">
          <ul class="cart__list">
            <cart-item 
              v-for="item in itemsList"
              :item="item"
              :key="item.id_product"
             >
            </cart-item>
          </ul>
          <div v-if="itemsList.length" class="cart__total-block">
            <div>TOTAL</div>
            <div class="dollar cart__total-sum">{{ getTotalSum() }}</div>
          </div>
          <div v-else class="cart__empty">Cart Is Empty</div>
          <a href="checkout.html" class="btn btn__secondary cart__btn">Checkout</a>
          <a href="cart.html" class="btn btn__secondary cart__btn">Go to cart</a>
        </div>
      </div>
    </div>
  `,
  methods: {
    getTotalSum() {
      return this.itemsList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    addProductItem(product) {
      const item = this.itemsList.find(el => el.id_product === product.id_product);
      if (item) {
        this.$parent.putJSON(`/api/cart/${item.id_product}`, {quantity: 1})
          .then(data => {
            if (data.result) {
              item.quantity++;
            }
          })
      } else {
        const newItem = Object.assign({quantity: 1}, product);
        this.$parent.postJSON(`/api/cart`, newItem)
          .then(data => {
            if (data.result) {
              this.itemsList.push(newItem);
            }
          })
      }
    },
    setProductQty(product, newQuantity) {
      this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: newQuantity - product.quantity})
        .then(data => {
          if (data.result) {
            product.quantity = newQuantity;
          }
        })
    },
    removeProductItem(product) {
      if (product.quantity > 1) {
        this.$parent.putJSON(`/api/cart/${product.id_product}`, {quantity: -1})
          .then(data => {
            if (data.result) {
              product.quantity--;
            }
          })
      } else {
        this.removeProduct(product);
      }
    },
    removeProduct(product) {
      this.$parent.deleteJSON(`/api/cart/${product.id_product}`)
        .then(data => {
          if (data.result) {
            this.itemsList.splice(this.itemsList.indexOf(product), 1);
          }
        })
    },
    clearCart() {
      this.$parent.deleteJSON(`/api/cart`)
        .then(data => {
          if (data.result) {
            this.itemsList = [];
          }
        })
    },
  },
  mounted() {
    this.$parent.getJSON(`${this.cartUrl}`)
      .then(data => {
        for (const item of data) {
          this.itemsList.push(item);
        }
      })
  },
};

export default cart;