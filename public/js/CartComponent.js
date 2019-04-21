Vue.component('cart', {
  data() {
    return {
      cartUrl: 'userCart.json',
      itemsList: [],
      isVisible: false,
    };
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
            <cart-item v-for="item in itemsList"
                       :item="item"
                       :key="item.id_product"
            ></cart-item>
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
  },
  mounted() {
    this.$parent.getJSON(`${API + this.cartUrl}`)
      .then(data => {
        for (const item of data) {
          this.itemsList.push(item);
        }
      })
  },
});

Vue.component('cartItem', {
  props: ['item'],
  template: `
    <li class="cart__item">
      <a href="single.html">
        <img :src="'img/' + item.img" :alt="item.product_name"></a>
      <div class="cart__item-desc">
        <a href="single.html" class="cart__item-title">{{ item.product_name }}</a>
        <img src="img/rating_4-5.png" alt="rating_4-5_stars">
        <p class="cart__item-total">
          <span class="cart__item-qty">{{ item.quantity }}</span> x
          <span class="dollar cart__item-sum">{{ item.price }}</span>
        </p>
      </div>
      <a href="#" class="cart__item-remove"></a>
    </li>
  `,
});